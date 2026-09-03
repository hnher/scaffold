#!/usr/bin/env php
<?php

declare(strict_types=1);

final readonly class InstallerOptions
{
    public function __construct(
        public bool $dryRun,
        public bool $installNodeDependencies,
        public bool $runMigrations,
        public bool $showHelp,
    ) {}

    /**
     * @param  array<int, string>  $arguments
     */
    public static function fromArguments(array $arguments): self
    {
        return new self(
            dryRun: in_array('--dry-run', $arguments, true) || self::environmentFlagEnabled('SCAFFOLD_INSTALLER_DRY_RUN'),
            installNodeDependencies: ! in_array('--no-node', $arguments, true) && ! self::environmentFlagEnabled('SCAFFOLD_INSTALLER_NO_NODE'),
            runMigrations: ! in_array('--no-migrate', $arguments, true) && ! self::environmentFlagEnabled('SCAFFOLD_INSTALLER_NO_MIGRATE'),
            showHelp: in_array('--help', $arguments, true) || in_array('-h', $arguments, true),
        );
    }

    private static function environmentFlagEnabled(string $name): bool
    {
        $value = getenv($name);

        return is_string($value) && in_array(strtolower($value), ['1', 'true', 'yes', 'on'], true);
    }
}

final class CommandRunner
{
    public function __construct(private readonly bool $dryRun) {}

    /**
     * @param  array<int, string>  $command
     */
    public function run(array $command, string $workingDirectory, string $label): bool
    {
        $this->writeStep($label, $command, $workingDirectory);

        if ($this->dryRun) {
            return true;
        }

        $process = proc_open(
            $command,
            [
                0 => ['file', 'php://stdin', 'r'],
                1 => ['file', 'php://stdout', 'w'],
                2 => ['file', 'php://stderr', 'w'],
            ],
            $pipes,
            $workingDirectory,
        );

        if (! is_resource($process)) {
            fwrite(STDERR, "无法启动安装命令：{$label}".PHP_EOL);

            return false;
        }

        $exitCode = proc_close($process);

        if ($exitCode !== 0) {
            fwrite(STDERR, "安装步骤失败：{$label}（退出码 {$exitCode}）".PHP_EOL);

            return false;
        }

        return true;
    }

    /**
     * @param  array<int, string>  $command
     */
    private function writeStep(string $label, array $command, string $workingDirectory): void
    {
        $displayCommand = implode(' ', array_map(
            static fn (string $argument): string => escapeshellarg($argument),
            $command,
        ));

        fwrite(STDOUT, PHP_EOL."→ {$label}".PHP_EOL);
        fwrite(STDOUT, "  目录：{$workingDirectory}".PHP_EOL);
        fwrite(STDOUT, "  命令：{$displayCommand}".PHP_EOL);
    }
}

final class ScaffoldInstaller
{
    private const MANIFEST_VERSION = 1;

    /** @var array<string, mixed> */
    private array $manifest = [];

    private readonly CommandRunner $commandRunner;

    public function __construct(
        private readonly string $rootPath,
        private readonly InstallerOptions $options,
    ) {
        $this->commandRunner = new CommandRunner($options->dryRun);
    }

    public function run(): int
    {
        if ($this->options->showHelp) {
            $this->writeHelp();

            return 0;
        }

        if (! $this->loadManifest()) {
            return 1;
        }

        $mode = $this->options->dryRun ? '安装检查' : '项目初始化';
        fwrite(STDOUT, "Laravel Scaffold {$mode}".PHP_EOL);
        fwrite(STDOUT, str_repeat('=', 48).PHP_EOL);

        if (! $this->prepareApplications()) {
            return 1;
        }

        if (! $this->installComposerDependencies()) {
            return 1;
        }

        if (! $this->initializeLaravelApplications()) {
            return 1;
        }

        if ($this->options->installNodeDependencies && ! $this->installNodeDependencies()) {
            return 1;
        }

        if (! $this->options->dryRun) {
            fwrite(STDOUT, PHP_EOL.'安装完成。'.PHP_EOL);
        } else {
            fwrite(STDOUT, PHP_EOL.'安装清单检查通过。'.PHP_EOL);
        }

        $this->writeManualConfiguration();

        return 0;
    }

    private function loadManifest(): bool
    {
        $manifestPath = $this->rootPath.'/scaffold.json';

        if (! is_file($manifestPath)) {
            fwrite(STDERR, "缺少安装清单：{$manifestPath}".PHP_EOL);

            return false;
        }

        $contents = file_get_contents($manifestPath);
        $manifest = is_string($contents) ? json_decode($contents, true) : null;

        if (! is_array($manifest)) {
            fwrite(STDERR, "安装清单不是有效的 JSON：{$manifestPath}".PHP_EOL);

            return false;
        }

        if (($manifest['version'] ?? null) !== self::MANIFEST_VERSION) {
            fwrite(STDERR, '不支持的安装清单版本。'.PHP_EOL);

            return false;
        }

        if (! isset($manifest['applications']) || ! is_array($manifest['applications']) || $manifest['applications'] === []) {
            fwrite(STDERR, '安装清单必须至少声明一个应用。'.PHP_EOL);

            return false;
        }

        foreach ($manifest['applications'] as $application) {
            if (! $this->applicationIsValid($application)) {
                return false;
            }
        }

        $this->manifest = $manifest;

        return true;
    }

    private function applicationIsValid(mixed $application): bool
    {
        if (! is_array($application)) {
            fwrite(STDERR, '应用配置必须是对象。'.PHP_EOL);

            return false;
        }

        foreach (['id', 'label', 'path'] as $requiredKey) {
            if (! isset($application[$requiredKey]) || ! is_string($application[$requiredKey]) || $application[$requiredKey] === '') {
                fwrite(STDERR, "应用配置缺少有效字段：{$requiredKey}".PHP_EOL);

                return false;
            }
        }

        $applicationPath = $this->applicationPath($application);

        if (! is_dir($applicationPath)) {
            fwrite(STDERR, "应用目录不存在：{$applicationPath}".PHP_EOL);

            return false;
        }

        return true;
    }

    private function prepareApplications(): bool
    {
        foreach ($this->applications() as $application) {
            if (! $this->prepareEnvironment($application)) {
                return false;
            }

            if (! $this->prepareDatabase($application)) {
                return false;
            }
        }

        return true;
    }

    /** @param array<string, mixed> $application */
    private function prepareEnvironment(array $application): bool
    {
        $environment = $application['environment'] ?? null;

        if (! is_array($environment)) {
            return true;
        }

        $source = $environment['source'] ?? null;
        $target = $environment['target'] ?? null;

        if (! is_string($source) || ! is_string($target)) {
            fwrite(STDERR, "{$application['label']} 的环境文件配置无效。".PHP_EOL);

            return false;
        }

        $applicationPath = $this->applicationPath($application);
        $sourcePath = $applicationPath.'/'.$source;
        $targetPath = $applicationPath.'/'.$target;

        if (! is_file($sourcePath)) {
            fwrite(STDERR, "环境模板不存在：{$sourcePath}".PHP_EOL);

            return false;
        }

        if (is_file($targetPath)) {
            fwrite(STDOUT, "✓ 保留已有环境文件：{$targetPath}".PHP_EOL);

            return true;
        }

        fwrite(STDOUT, "→ 创建环境文件：{$targetPath}".PHP_EOL);

        if ($this->options->dryRun || copy($sourcePath, $targetPath)) {
            return true;
        }

        fwrite(STDERR, "无法创建环境文件：{$targetPath}".PHP_EOL);

        return false;
    }

    /** @param array<string, mixed> $application */
    private function prepareDatabase(array $application): bool
    {
        $laravel = $application['laravel'] ?? null;

        if (! is_array($laravel) || ! isset($laravel['database']) || ! is_string($laravel['database'])) {
            return true;
        }

        $applicationPath = $this->applicationPath($application);
        $environmentPath = $applicationPath.'/.env';
        $environment = $application['environment'] ?? null;

        if ($this->options->dryRun && ! is_file($environmentPath) && is_array($environment)) {
            $environmentSource = $environment['source'] ?? null;

            if (is_string($environmentSource)) {
                $environmentPath = $applicationPath.'/'.$environmentSource;
            }
        }

        if ($this->environmentValue($environmentPath, 'DB_CONNECTION') !== 'sqlite') {
            return true;
        }

        $databasePath = $applicationPath.'/'.$laravel['database'];

        if (is_file($databasePath)) {
            fwrite(STDOUT, "✓ 保留已有数据库：{$databasePath}".PHP_EOL);

            return true;
        }

        fwrite(STDOUT, "→ 创建 SQLite 数据库：{$databasePath}".PHP_EOL);

        if ($this->options->dryRun || touch($databasePath)) {
            return true;
        }

        fwrite(STDERR, "无法创建 SQLite 数据库：{$databasePath}".PHP_EOL);

        return false;
    }

    private function installComposerDependencies(): bool
    {
        foreach ($this->applications() as $application) {
            if (($application['composer'] ?? false) !== true) {
                continue;
            }

            $command = [...$this->composerCommand(), 'install', '--no-interaction', '--prefer-dist'];

            if (! $this->commandRunner->run(
                $command,
                $this->applicationPath($application),
                "安装 {$application['label']} 的 Composer 依赖",
            )) {
                return false;
            }
        }

        return true;
    }

    private function initializeLaravelApplications(): bool
    {
        foreach ($this->applications() as $application) {
            $laravel = $application['laravel'] ?? null;

            if (! is_array($laravel) || ! isset($laravel['artisan']) || ! is_string($laravel['artisan'])) {
                continue;
            }

            $applicationPath = $this->applicationPath($application);
            $artisanPath = $applicationPath.'/'.$laravel['artisan'];

            if (! $this->environmentValueExists($applicationPath.'/.env', 'APP_KEY')) {
                if (! $this->commandRunner->run(
                    [PHP_BINARY, $artisanPath, 'key:generate', '--ansi'],
                    $applicationPath,
                    "生成 {$application['label']} 的应用密钥",
                )) {
                    return false;
                }
            } else {
                fwrite(STDOUT, "✓ 保留 {$application['label']} 已有的应用密钥".PHP_EOL);
            }

            if (
                $this->options->runMigrations
                && ($laravel['migrate'] ?? false) === true
                && ! $this->commandRunner->run(
                    [PHP_BINARY, $artisanPath, 'migrate', '--graceful', '--ansi', '--no-interaction'],
                    $applicationPath,
                    "迁移 {$application['label']} 的数据库",
                )
            ) {
                return false;
            }
        }

        return true;
    }

    private function installNodeDependencies(): bool
    {
        foreach ($this->applications() as $application) {
            if (($application['node'] ?? false) !== true) {
                continue;
            }

            $applicationPath = $this->applicationPath($application);

            if (! $this->commandRunner->run(
                [$this->npmBinary(), 'ci', '--no-audit', '--no-fund'],
                $applicationPath,
                "安装 {$application['label']} 的 Node.js 依赖",
            )) {
                return false;
            }

            $buildScript = $application['build'] ?? null;

            if (
                is_string($buildScript)
                && ! $this->commandRunner->run(
                    [$this->npmBinary(), 'run', $buildScript],
                    $applicationPath,
                    "构建 {$application['label']}",
                )
            ) {
                return false;
            }
        }

        return true;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function applications(): array
    {
        /** @var array<int, array<string, mixed>> $applications */
        $applications = $this->manifest['applications'];

        return $applications;
    }

    /**
     * @param  array<string, mixed>  $application
     */
    private function applicationPath(array $application): string
    {
        return $this->rootPath.'/'.$application['path'];
    }

    /**
     * @return array<int, string>
     */
    private function composerCommand(): array
    {
        $composerBinary = getenv('COMPOSER_BINARY');

        if (! is_string($composerBinary) || $composerBinary === '') {
            return ['composer'];
        }

        if (str_ends_with($composerBinary, '.phar')) {
            return [PHP_BINARY, $composerBinary];
        }

        return [$composerBinary];
    }

    private function npmBinary(): string
    {
        return PHP_OS_FAMILY === 'Windows' ? 'npm.cmd' : 'npm';
    }

    private function environmentValueExists(string $environmentPath, string $key): bool
    {
        $value = $this->environmentValue($environmentPath, $key);

        return is_string($value) && $value !== '';
    }

    private function environmentValue(string $environmentPath, string $key): ?string
    {
        if (! is_file($environmentPath)) {
            return null;
        }

        $contents = file_get_contents($environmentPath);

        if (! is_string($contents)) {
            return null;
        }

        $matched = preg_match('/^'.preg_quote($key, '/').'=(.*)$/m', $contents, $matches);

        if ($matched !== 1) {
            return null;
        }

        return trim($matches[1], " \t\n\r\0\x0B\"'");
    }

    private function writeManualConfiguration(): void
    {
        $items = $this->manifest['manualConfiguration'] ?? [];

        if (! is_array($items) || $items === []) {
            return;
        }

        fwrite(STDOUT, PHP_EOL.'发布前仍需配置：'.PHP_EOL);

        foreach ($items as $item) {
            if (is_string($item)) {
                fwrite(STDOUT, "  - {$item}".PHP_EOL);
            }
        }
    }

    private function writeHelp(): void
    {
        fwrite(STDOUT, <<<'HELP'
Laravel Scaffold 安装器

用法：
  php scripts/install.php [选项]

选项：
  --no-node      不安装 Node.js 依赖，也不构建 Web 资源
  --no-migrate   不执行 Laravel 数据库迁移
  --dry-run      仅验证安装清单并显示将执行的步骤
  -h, --help     显示帮助

环境变量：
  SCAFFOLD_INSTALLER_NO_NODE=1
  SCAFFOLD_INSTALLER_NO_MIGRATE=1
  SCAFFOLD_INSTALLER_DRY_RUN=1

HELP);
    }
}

$options = InstallerOptions::fromArguments(array_slice($argv, 1));
$installer = new ScaffoldInstaller(dirname(__DIR__), $options);

exit($installer->run());
