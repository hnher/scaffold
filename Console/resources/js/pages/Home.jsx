import { Head, router } from '@inertiajs/react';
import {
    AppWindow,
    Apple,
    ArrowRight,
    Blocks,
    Bot,
    Braces,
    Check,
    ChevronDown,
    ChevronRight,
    CloudCog,
    Database,
    FolderCode,
    GitBranch,
    GitCommitHorizontal,
    Layers3,
    Languages,
    LayoutDashboard,
    Monitor,
    MonitorSmartphone,
    Moon,
    PackageCheck,
    Palette,
    Play,
    Rocket,
    ServerCog,
    Settings2,
    ShieldCheck,
    Smartphone,
    Sun,
    Workflow,
    Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

const projectLayers = [
    {
        directory: 'Console/',
        description: 'Laravel 核心、PC / H5 与管理后台',
        technology: 'Laravel 13',
        icon: ServerCog,
    },
    {
        directory: 'Applet/',
        description: '多平台小程序应用与原子化样式',
        technology: 'uni-app',
        icon: Blocks,
    },
    {
        directory: 'App/',
        description: 'iOS / Android 原生应用体验',
        technology: 'React Native',
        icon: Smartphone,
    },
    {
        directory: '.agents/skills/',
        description: '为各技术栈提供专业化编码约束',
        technology: '5 Skills',
        icon: Bot,
    },
];

const platformSolutions = [
    {
        number: '01',
        category: 'CORE BACKEND',
        title: 'Laravel 统一业务后端',
        description: '以 Laravel 作为整个系统的核心，集中承载业务规则、数据模型、身份认证、接口与队列任务。',
        technologies: ['Laravel 13', 'PHP 8.4', 'Sanctum'],
        icon: ServerCog,
    },
    {
        number: '02',
        category: 'PC & H5',
        title: 'Inertia.js + React + shadcn/ui',
        description: '用 Inertia 连接 Laravel 与 React，以 shadcn/ui 构建可维护的组件系统，并通过响应式布局同时覆盖 PC 与 H5。',
        technologies: ['Inertia.js', 'React 19', 'shadcn/ui'],
        icon: MonitorSmartphone,
    },
    {
        number: '03',
        category: 'MINI PROGRAM',
        title: 'uni-app + Weapp TailwindCSS',
        description: '使用 uni-app 组织小程序页面和跨平台能力，通过 Weapp TailwindCSS 保持高效、统一的样式开发体验。',
        technologies: ['uni-app', 'Vue 3', 'weapp-tailwindcss'],
        icon: AppWindow,
    },
    {
        number: '04',
        category: 'NATIVE APP',
        title: 'React Native + NativeWind',
        description: '使用 React Native 构建 iOS 与 Android 应用，配合 NativeWind 复用熟悉的原子化样式工作流。',
        technologies: ['React Native', 'Expo', 'NativeWind'],
        icon: Smartphone,
    },
    {
        number: '05',
        category: 'ADMIN CONSOLE',
        title: 'FilamentPHP 管理后台',
        description: '通过 Filament 的 Resource、Form、Table 与 Widget 快速搭建数据管理、运营配置和内部业务界面。',
        technologies: ['Filament v5', 'Livewire 4', 'Tailwind CSS'],
        icon: LayoutDashboard,
        className: 'md:col-span-2 xl:col-span-1',
    },
];

const architectureNodes = [
    { label: 'PC / H5', technology: 'Inertia + React', icon: MonitorSmartphone },
    { label: '小程序', technology: 'uni-app', icon: Blocks },
    { label: '原生 App', technology: 'React Native', icon: Smartphone },
    { label: '管理后台', technology: 'FilamentPHP', icon: LayoutDashboard },
];

const engineeringValues = [
    {
        icon: Database,
        title: '一套业务核心',
        description: '模型、权限、验证与业务规则集中在 Laravel，避免多端重复实现核心逻辑。',
    },
    {
        icon: Layers3,
        title: '各端选择合适技术',
        description: 'Web、小程序、App 与管理端各自使用成熟生态，兼顾开发效率与平台体验。',
    },
    {
        icon: ShieldCheck,
        title: '一致的工程边界',
        description: '统一接口、认证和数据约定，让不同客户端可以独立演进，也能稳定协作。',
    },
];

const engineeringMetricIcons = [Database, MonitorSmartphone, Languages, Bot];
const engineeringProcessIcons = [Braces, ServerCog, Workflow, ShieldCheck];
const deliveryStageIcons = [GitCommitHorizontal, Workflow, CloudCog];
const deliveryStoreIcons = [Apple, Play];
const ctaModuleIcons = [ServerCog, MonitorSmartphone, Smartphone, LayoutDashboard];

const agentSkills = [
    {
        name: 'laravel-specialist',
        scope: 'Laravel 后端',
        description: '指导模型关系、API、认证、队列与自动化测试，让后端实现遵循一致的工程约束。',
        capabilities: ['Eloquent', 'Sanctum', 'Testing'],
        icon: ServerCog,
    },
    {
        name: 'shadcn',
        scope: 'PC / H5 界面',
        description: '约束组件组合、语义设计令牌与无障碍实现，保持 React 界面开放且可维护。',
        capabilities: ['Components', 'Tokens', 'A11y'],
        icon: Blocks,
    },
    {
        name: 'filament-pro',
        scope: '管理后台',
        description: '覆盖 Resource、Form、Table、Action 与 Widget，提升后台页面的实现与测试效率。',
        capabilities: ['Resources', 'Tables', 'Widgets'],
        icon: LayoutDashboard,
    },
    {
        name: 'uni-app',
        scope: '小程序端',
        description: '提供跨平台组件、API、条件编译和平台兼容性参考，减少多小程序平台差异。',
        capabilities: ['Cross-platform', 'APIs', 'Config'],
        icon: Smartphone,
    },
    {
        name: 'ui-ux-pro-max',
        scope: '体验与设计',
        description: '在页面实现前补充配色、响应式、交互和可访问性规则，让各端体验保持一致。',
        capabilities: ['Responsive', 'Color', 'UX'],
        icon: Palette,
        className: 'sm:col-span-2',
    },
];

const PARTICLE_GRID_SIZE = 40;
const DESKTOP_PARTICLE_COUNT = 24;
const MOBILE_PARTICLE_COUNT = 12;

function GridParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }

        let animationFrame;
        let width = 0;
        let height = 0;
        let particles = [];
        let primaryColor = '';

        const syncPrimaryColor = () => {
            primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        };

        const resizeCanvas = () => {
            const bounds = canvas.getBoundingClientRect();
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

            width = bounds.width;
            height = bounds.height;
            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        };

        const createParticle = () => {
            const movesHorizontally = Math.random() > 0.5;
            const columns = Math.max(1, Math.floor(width / PARTICLE_GRID_SIZE));
            const rows = Math.max(1, Math.floor(height / PARTICLE_GRID_SIZE));

            return {
                x: Math.floor(Math.random() * (columns + 1)) * PARTICLE_GRID_SIZE,
                y: Math.floor(Math.random() * (rows + 1)) * PARTICLE_GRID_SIZE,
                directionX: movesHorizontally ? (Math.random() > 0.5 ? 1 : -1) : 0,
                directionY: movesHorizontally ? 0 : Math.random() > 0.5 ? 1 : -1,
                speed: 0.55 + Math.random() * 0.7,
                length: 16 + Math.random() * 24,
                opacity: 0,
                maxOpacity: 0.5 + Math.random() * 0.45,
                size: 1.5 + Math.random() * 1.5,
                life: 0,
                maxLife: 240 + Math.random() * 240,
            };
        };

        const initializeParticles = () => {
            const count = width < 640 ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;

            particles = Array.from({ length: count }, () => {
                const particle = createParticle();
                particle.life = Math.random() * particle.maxLife;

                return particle;
            });
        };

        const updateParticle = (particle) => {
            particle.life += 1;

            const progress = particle.life / particle.maxLife;
            particle.opacity =
                progress < 0.15
                    ? (progress / 0.15) * particle.maxOpacity
                    : progress > 0.8
                        ? ((1 - progress) / 0.2) * particle.maxOpacity
                        : particle.maxOpacity;

            const previousX = particle.x;
            const previousY = particle.y;

            particle.x += particle.directionX * particle.speed;
            particle.y += particle.directionY * particle.speed;

            if (particle.directionX === 0) {
                const crossedNode =
                    particle.directionY !== 0 &&
                    Math.floor(previousY / PARTICLE_GRID_SIZE) !== Math.floor(particle.y / PARTICLE_GRID_SIZE);

                if (crossedNode && Math.random() < 0.25) {
                    particle.y =
                        (particle.directionY > 0
                            ? Math.floor(particle.y / PARTICLE_GRID_SIZE)
                            : Math.ceil(particle.y / PARTICLE_GRID_SIZE)) * PARTICLE_GRID_SIZE;
                    particle.directionY = 0;
                    particle.directionX = Math.random() > 0.5 ? 1 : -1;
                }
            } else {
                const crossedNode =
                    Math.floor(previousX / PARTICLE_GRID_SIZE) !== Math.floor(particle.x / PARTICLE_GRID_SIZE);

                if (crossedNode && Math.random() < 0.25) {
                    particle.x =
                        (particle.directionX > 0
                            ? Math.floor(particle.x / PARTICLE_GRID_SIZE)
                            : Math.ceil(particle.x / PARTICLE_GRID_SIZE)) * PARTICLE_GRID_SIZE;
                    particle.directionX = 0;
                    particle.directionY = Math.random() > 0.5 ? 1 : -1;
                }
            }

            const isOutside =
                particle.x < -50 ||
                particle.x > width + 50 ||
                particle.y < -50 ||
                particle.y > height + 50;

            if (particle.life >= particle.maxLife || isOutside) {
                Object.assign(particle, createParticle());
            }
        };

        const drawParticles = () => {
            context.clearRect(0, 0, width, height);

            particles.forEach((particle) => {
                if (particle.opacity <= 0.01) {
                    return;
                }

                const tailX = particle.x - particle.directionX * particle.length;
                const tailY = particle.y - particle.directionY * particle.length;
                const gradient = context.createLinearGradient(tailX, tailY, particle.x, particle.y);

                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(1, primaryColor);

                context.save();
                context.globalAlpha = particle.opacity;
                context.beginPath();
                context.moveTo(tailX, tailY);
                context.lineTo(particle.x, particle.y);
                context.strokeStyle = gradient;
                context.lineWidth = Math.max(1, particle.size * 0.8);
                context.lineCap = 'round';
                context.stroke();

                context.beginPath();
                context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                context.fillStyle = primaryColor;
                context.fill();
                context.restore();
            });
        };

        const animate = () => {
            particles.forEach(updateParticle);
            drawParticles();
            animationFrame = window.requestAnimationFrame(animate);
        };

        syncPrimaryColor();
        resizeCanvas();
        initializeParticles();
        animate();

        const resizeObserver = new ResizeObserver(resizeCanvas);
        const themeObserver = new MutationObserver(syncPrimaryColor);

        resizeObserver.observe(canvas);
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        window.addEventListener('resize', resizeCanvas, { passive: true });

        return () => {
            window.cancelAnimationFrame(animationFrame);
            resizeObserver.disconnect();
            themeObserver.disconnect();
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="hero-particles pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <canvas ref={canvasRef} className="size-full" />
        </div>
    );
}

function SettingsControl({ locale, locales, copy }) {
    const [isChangingLanguage, setIsChangingLanguage] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') {
            return 'system';
        }

        try {
            const storedTheme = localStorage.getItem('scaffold-theme');

            return ['light', 'dark', 'system'].includes(storedTheme) ? storedTheme : 'system';
        } catch {
            return 'system';
        }
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const syncTheme = () => {
            document.documentElement.classList.toggle(
                'dark',
                theme === 'dark' || (theme === 'system' && mediaQuery.matches),
            );
        };

        syncTheme();

        if (theme === 'system') {
            mediaQuery.addEventListener('change', syncTheme);
        }

        return () => mediaQuery.removeEventListener('change', syncTheme);
    }, [theme]);

    const changeTheme = (nextTheme) => {
        if (!nextTheme) {
            return;
        }

        try {
            localStorage.setItem('scaffold-theme', nextTheme);
        } catch {
            // Theme switching still works when persistent storage is unavailable.
        }

        setTheme(nextTheme);
    };

    const changeLocale = (event) => {
        const nextLocale = event.target.value;

        if (nextLocale === locale) {
            return;
        }

        router.post('/locale', { locale: nextLocale }, {
            preserveScroll: true,
            onStart: () => setIsChangingLanguage(true),
            onFinish: () => setIsChangingLanguage(false),
        });
    };

    const themeOptions = [
        { value: 'light', label: copy.theme_light, icon: Sun },
        { value: 'dark', label: copy.theme_dark, icon: Moon },
        { value: 'system', label: copy.theme_system, icon: Monitor },
    ];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button type="button" variant="outline" size="icon" aria-label={copy.settings_label} className="border-border/60 bg-background/50 backdrop-blur-md transition-colors hover:bg-background/80">
                    <Settings2 aria-hidden="true" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[min(22rem,calc(100vw-2rem))] border-border/60 bg-popover/80 shadow-2xl shadow-black/10 backdrop-blur-2xl">
                <PopoverHeader>
                    <PopoverTitle>{copy.settings_title}</PopoverTitle>
                    <PopoverDescription>{copy.settings_description}</PopoverDescription>
                </PopoverHeader>

                <div className="mt-5 flex flex-col gap-5">
                    <div>
                        <p className="mb-2 text-sm font-medium">{copy.theme}</p>
                        <ToggleGroup
                            type="single"
                            value={theme}
                            onValueChange={changeTheme}
                            variant="outline"
                            size="lg"
                            className="grid w-full grid-cols-3"
                            aria-label={copy.theme}
                        >
                            {themeOptions.map(({ value, label, icon: Icon }) => (
                                <ToggleGroupItem key={value} value={value} aria-label={label} className="min-h-11 px-2 border-border/50 bg-background/40 backdrop-blur-sm transition-colors hover:bg-background/70 data-[state=on]:bg-background/90">
                                    <Icon aria-hidden="true" />
                                    <span className="hidden sm:inline">{label}</span>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>

                    <div>
                        <label htmlFor="homepage-locale" className="mb-2 block text-sm font-medium">
                            {copy.language}
                        </label>
                        <div className="relative">
                            <Languages className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                            <select
                                id="homepage-locale"
                                value={locale}
                                onChange={changeLocale}
                                disabled={isChangingLanguage}
                                aria-busy={isChangingLanguage}
                                aria-label={isChangingLanguage ? copy.changing_language : copy.language}
                                className="h-11 w-full appearance-none rounded-md border border-border/60 bg-background/60 pl-10 pr-9 text-sm font-medium shadow-xs outline-none backdrop-blur-md transition-[color,box-shadow,border-color] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:cursor-wait disabled:opacity-60"
                            >
                                {locales.map(({ value, label }) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

function Brand({ compact = false, tagline }) {
    return (
        <span className="flex items-center gap-3">
            <img
                src="/logo-mark.svg"
                alt=""
                className="size-9 shrink-0 rounded-xl shadow-sm"
                width="36"
                height="36"
            />
            {!compact && (
                <span className="hidden flex-col sm:flex">
                    <span className="text-sm font-semibold leading-none tracking-tight">Laravel Scaffold</span>
                    <span className="mt-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {tagline}
                    </span>
                </span>
            )}
        </span>
    );
}

function WorkspacePreview({ copy }) {
    const layers = projectLayers.map((layer, index) => ({
        ...layer,
        ...copy.layers[index],
    }));

    return (
        <Card className="home-reveal-delayed overflow-hidden rounded-2xl border border-border/60 bg-card/60 py-0 shadow-2xl shadow-primary/10 backdrop-blur-2xl transition-all duration-300 hover:border-primary/30 hover:shadow-primary/15">
            <CardHeader className="border-b border-border/50 bg-muted/30 py-4 backdrop-blur-md">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/70 text-primary backdrop-blur-sm shadow-xs">
                        <FolderCode className="size-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                        <CardTitle className="truncate text-sm">{copy.title}</CardTitle>
                        <CardDescription className="mt-1 text-xs">{copy.subtitle}</CardDescription>
                    </div>
                </div>
                <CardAction>
                    <Badge variant="secondary" className="border border-primary/20 bg-secondary/80 backdrop-blur-sm text-primary">{copy.ready}</Badge>
                </CardAction>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 py-5">
                {layers.map(({ directory, description, technology, icon: Icon }) => (
                    <div
                        key={directory}
                        className="group flex items-center gap-4 rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-background/80 hover:shadow-md"
                    >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs">
                            <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                            <code className="text-sm font-semibold">{directory}</code>
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span>
                        </span>
                        <Badge variant="outline" className="hidden sm:inline-flex border-border/60 bg-background/60 backdrop-blur-xs">{technology}</Badge>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </div>
                ))}

                <div className="mt-1 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/90 p-4 text-primary-foreground shadow-lg shadow-primary/20 backdrop-blur-md">
                    <Workflow className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                    <div>
                        <p className="text-sm font-semibold">{copy.core_title}</p>
                        <p className="mt-1 text-xs leading-5 text-primary-foreground/80">
                            {copy.core_description}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ArchitectureDiagram({ copy }) {
    const nodes = architectureNodes.map((node, index) => ({
        ...node,
        ...copy.nodes[index],
    }));

    return (
        <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-xl shadow-foreground/5 backdrop-blur-2xl">
            <CardHeader className="border-b border-border/50 bg-muted/25 backdrop-blur-md">
                <div>
                    <CardTitle>
                        <h3 className="text-lg">{copy.map_title}</h3>
                    </CardTitle>
                    <CardDescription className="mt-2">{copy.map_description}</CardDescription>
                </div>
                <CardAction>
                    <Badge variant="outline" className="hidden border-primary/30 bg-primary/10 text-primary backdrop-blur-xs sm:inline-flex">{copy.map_badge}</Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="p-5 sm:p-7">
                <div className="architecture-flow" role="img" aria-label={copy.map_label}>
                    <Card className="architecture-core mx-auto max-w-md border border-primary/40 bg-primary/90 py-5 text-primary-foreground shadow-xl shadow-primary/20 backdrop-blur-xl">
                        <CardContent className="flex items-center gap-4 px-5">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                                <ServerCog className="size-6" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">{copy.core_eyebrow}</span>
                                <span className="mt-1 block text-lg font-semibold">{copy.core_title}</span>
                            </span>
                            <Badge className="hidden bg-primary-foreground/15 text-primary-foreground backdrop-blur-xs sm:inline-flex">{copy.api}</Badge>
                        </CardContent>
                    </Card>

                    <div className="architecture-nodes mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {nodes.map(({ label, technology, icon: Icon }) => (
                            <Card key={label} className="architecture-node gap-4 rounded-xl border border-border/60 bg-background/60 py-5 shadow-xs backdrop-blur-lg transition-all duration-200 hover:border-primary/40 hover:bg-background/85 hover:shadow-md hover:-translate-y-0.5">
                                <CardContent className="flex items-center gap-3 px-4 lg:flex-col lg:items-start">
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs">
                                        <Icon className="size-4" aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block text-sm font-semibold">{label}</span>
                                        <span className="mt-1 block text-xs text-muted-foreground">{technology}</span>
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function SolutionsOrbit({ solutions, activeIndex, onSelect }) {
    // 5-position radial ring coordinates for desktop
    const desktopPositions = [
        'lg:top-0 lg:left-1/2 lg:-translate-x-1/2',
        'lg:top-[22%] lg:right-0 lg:translate-x-0',
        'lg:bottom-[4%] lg:right-[4%] lg:translate-x-0',
        'lg:bottom-[4%] lg:left-[4%] lg:translate-x-0',
        'lg:top-[22%] lg:left-0 lg:translate-x-0',
    ];

    return (
        <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
            {/* Ambient orbital background glow */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-linear-to-tr from-primary/20 via-chart-2/15 to-transparent blur-3xl opacity-70" aria-hidden="true" />

            {/* Orbital display area for desktop */}
            <div className="relative hidden size-136 items-center justify-center lg:flex">
                {/* Concentric rings */}
                <div className="orbital-ring size-128 opacity-60" />
                <div className="orbital-ring-outer size-88 opacity-40" />
                <div className="orbital-ring size-52 opacity-50" />

                {/* Center Core Hub */}
                <div className="orbital-pulse z-10 flex size-28 flex-col items-center justify-center rounded-3xl border border-primary/40 bg-card/70 p-3 text-center shadow-xl shadow-primary/20 backdrop-blur-2xl transition-all">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                        <ServerCog className="size-5" aria-hidden="true" />
                    </span>
                    <span className="mt-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-primary">Core Hub</span>
                    <span className="text-[0.625rem] text-muted-foreground">Scaffold</span>
                </div>

                {/* Orbiting Satellite Cards */}
                {solutions.map((solution, index) => {
                    const Icon = solution.icon;
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={solution.number}
                            className={cn(
                                'absolute w-60 transition-all duration-300',
                                desktopPositions[index],
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => onSelect(index)}
                                onMouseEnter={() => onSelect(index)}
                                className={cn(
                                    'group relative flex w-full flex-col rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1',
                                    isActive
                                        ? 'border-primary/60 bg-card/85 shadow-xl shadow-primary/15 ring-2 ring-primary/25'
                                        : 'border-border/60 bg-card/50 shadow-md hover:border-primary/40 hover:bg-card/70',
                                )}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className={cn(
                                        'flex size-9 items-center justify-center rounded-lg transition-colors',
                                        isActive ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-secondary/80 text-primary',
                                    )}>
                                        <Icon className="size-4" aria-hidden="true" />
                                    </span>
                                    <span className="font-mono text-xs font-semibold text-primary/70">{solution.number}</span>
                                </div>
                                <h4 className="mt-2.5 line-clamp-1 text-sm font-semibold text-foreground">{solution.title}</h4>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {solution.technologies.slice(0, 2).map((tech) => (
                                        <Badge key={tech} variant="secondary" className="px-1.5 py-0 text-[0.625rem]">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Mobile / Tablet Responsive Fallback Grid */}
            <div className="grid w-full gap-3 sm:grid-cols-2 lg:hidden">
                {solutions.map((solution, index) => {
                    const Icon = solution.icon;
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={solution.number}
                            onClick={() => onSelect(index)}
                            className={cn(
                                'group flex flex-col rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200',
                                isActive
                                    ? 'border-primary/50 bg-card/80 shadow-lg shadow-primary/10'
                                    : 'border-border/60 bg-card/50',
                            )}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-secondary/80 text-primary">
                                    <Icon className="size-4" aria-hidden="true" />
                                </span>
                                <Badge variant="outline" className="text-[0.625rem] text-primary">{solution.number}</Badge>
                            </div>
                            <h4 className="mt-2 text-sm font-semibold text-foreground">{solution.title}</h4>
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{solution.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {solution.technologies.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="px-1.5 py-0 text-[0.625rem]">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function SkillsOrbit({ skills, activeIndex, onSelect }) {
    // 5-position radial ring coordinates for desktop
    const desktopPositions = [
        'lg:top-0 lg:left-1/2 lg:-translate-x-1/2',
        'lg:top-[22%] lg:right-0 lg:translate-x-0',
        'lg:bottom-[4%] lg:right-[4%] lg:translate-x-0',
        'lg:bottom-[4%] lg:left-[4%] lg:translate-x-0',
        'lg:top-[22%] lg:left-0 lg:translate-x-0',
    ];

    return (
        <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
            {/* Ambient orbital background glow */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-linear-to-tr from-chart-2/20 via-primary/15 to-transparent blur-3xl opacity-70" aria-hidden="true" />

            {/* Orbital display area for desktop */}
            <div className="relative hidden size-136 items-center justify-center lg:flex">
                {/* Concentric rings */}
                <div className="orbital-ring size-128 opacity-60" />
                <div className="orbital-ring-outer size-88 opacity-40" />
                <div className="orbital-ring size-52 opacity-50" />

                {/* Center Core Hub */}
                <div className="orbital-pulse z-10 flex size-28 flex-col items-center justify-center rounded-3xl border border-primary/40 bg-card/70 p-3 text-center shadow-xl shadow-primary/20 backdrop-blur-2xl transition-all">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                        <Bot className="size-5" aria-hidden="true" />
                    </span>
                    <span className="mt-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-primary">AI Skills</span>
                    <span className="text-[0.625rem] text-muted-foreground">Agents</span>
                </div>

                {/* Orbiting Satellite Cards */}
                {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={skill.name}
                            className={cn(
                                'absolute w-60 transition-all duration-300',
                                desktopPositions[index],
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => onSelect(index)}
                                onMouseEnter={() => onSelect(index)}
                                className={cn(
                                    'group relative flex w-full flex-col rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1',
                                    isActive
                                        ? 'border-primary/60 bg-card/85 shadow-xl shadow-primary/15 ring-2 ring-primary/25'
                                        : 'border-border/60 bg-card/50 shadow-md hover:border-primary/40 hover:bg-card/70',
                                )}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className={cn(
                                        'flex size-9 items-center justify-center rounded-lg transition-colors',
                                        isActive ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-secondary/80 text-primary',
                                    )}>
                                        <Icon className="size-4" aria-hidden="true" />
                                    </span>
                                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-[0.625rem] text-primary">
                                        {skill.scope}
                                    </Badge>
                                </div>
                                <h4 className="mt-2.5 line-clamp-1 font-mono text-sm font-semibold text-foreground">{skill.name}</h4>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {skill.capabilities.slice(0, 2).map((cap) => (
                                        <Badge key={cap} variant="secondary" className="px-1.5 py-0 text-[0.625rem]">
                                            {cap}
                                        </Badge>
                                    ))}
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Mobile / Tablet Responsive Fallback Grid */}
            <div className="grid w-full gap-3 sm:grid-cols-2 lg:hidden">
                {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={skill.name}
                            onClick={() => onSelect(index)}
                            className={cn(
                                'group flex flex-col rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200',
                                isActive
                                    ? 'border-primary/50 bg-card/80 shadow-lg shadow-primary/10'
                                    : 'border-border/60 bg-card/50',
                            )}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-secondary/80 text-primary">
                                    <Icon className="size-4" aria-hidden="true" />
                                </span>
                                <Badge variant="outline" className="text-[0.625rem] text-primary">{skill.scope}</Badge>
                            </div>
                            <h4 className="mt-2 font-mono text-sm font-semibold text-foreground">{skill.name}</h4>
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{skill.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {skill.capabilities.map((cap) => (
                                    <Badge key={cap} variant="secondary" className="px-1.5 py-0 text-[0.625rem]">
                                        {cap}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function Home({ locale, locales, translations: copy }) {
    const [isHeaderFloating, setIsHeaderFloating] = useState(false);
    const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);
    const [activeSkillIndex, setActiveSkillIndex] = useState(0);

    useEffect(() => {
        document.documentElement.lang = locale.replace('_', '-');
    }, [locale]);

    useEffect(() => {
        let animationFrame = null;

        const syncHeader = () => {
            if (animationFrame !== null) {
                return;
            }

            animationFrame = window.requestAnimationFrame(() => {
                setIsHeaderFloating(window.scrollY > 24);
                animationFrame = null;
            });
        };

        syncHeader();
        window.addEventListener('scroll', syncHeader, { passive: true });

        return () => {
            window.removeEventListener('scroll', syncHeader);

            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    const solutions = platformSolutions.map((solution, index) => ({
        ...solution,
        ...copy.solutions.items[index],
    }));
    const skills = agentSkills.map((skill, index) => ({
        ...skill,
        ...copy.skills.items[index],
    }));
    const engineering = engineeringValues.map((value, index) => ({
        ...value,
        ...copy.engineering.items[index],
    }));
    const engineeringMetrics = copy.engineering.metrics.map((metric, index) => ({
        ...metric,
        icon: engineeringMetricIcons[index],
    }));
    const engineeringProcess = copy.engineering.process.items.map((step, index) => ({
        ...step,
        icon: engineeringProcessIcons[index],
    }));
    const deliveryStages = copy.delivery.stages.map((stage, index) => ({
        ...stage,
        icon: deliveryStageIcons[index],
    }));
    const deliveryStores = copy.delivery.stores.map((store, index) => ({
        ...store,
        icon: deliveryStoreIcons[index],
    }));
    const ctaModules = copy.cta.modules.map((module, index) => ({
        ...module,
        icon: ctaModuleIcons[index],
    }));

    const activeSolution = solutions[activeSolutionIndex] || solutions[0];
    const activeSkill = skills[activeSkillIndex] || skills[0];

    return (
        <>
            <Head>
                <title>{copy.meta.title}</title>
                <meta name="description" content={copy.meta.description} />
                <link rel="canonical" href="https://scaffold.example.com" />
            </Head>

            <a
                href="#main-content"
                className="fixed left-4 top-4 z-50 -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
            >
                {copy.controls.skip_to_content}
            </a>

            <div className="page-shell min-h-dvh overflow-hidden">
                <header
                    className={cn(
                        'fixed inset-x-0 top-0 z-40 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        isHeaderFloating ? 'px-3 pt-3 sm:px-5' : 'px-0 pt-0',
                    )}
                >
                    <div
                        className={cn(
                            'mx-auto flex items-center justify-between gap-3 border transition-[height,max-width,border-radius,border-color,background-color,box-shadow,padding,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-4',
                            isHeaderFloating
                                ? 'h-16 max-w-5xl rounded-2xl border-border/60 bg-background/65 px-3 shadow-xl shadow-foreground/5 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 sm:px-5'
                                : 'h-18 max-w-7xl rounded-none border-transparent bg-transparent px-4 shadow-none sm:px-6 lg:px-8',
                        )}
                    >
                        <a
                            href="/"
                            aria-label={copy.controls.home_label}
                            className="flex min-h-11 items-center rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
                        >
                            <Brand tagline={copy.brand.tagline} />
                        </a>

                        <nav aria-label={copy.nav.main_label} className="hidden items-center gap-1 md:flex">
                            <Button variant="ghost" className="hover:bg-background/60 hover:backdrop-blur-sm" asChild><a href="#architecture">{copy.nav.architecture}</a></Button>
                            <Button variant="ghost" className="hover:bg-background/60 hover:backdrop-blur-sm" asChild><a href="#solutions">{copy.nav.solutions}</a></Button>
                            <Button variant="ghost" className="hover:bg-background/60 hover:backdrop-blur-sm" asChild><a href="#skills">{copy.nav.skills}</a></Button>
                            <Button variant="ghost" className="hover:bg-background/60 hover:backdrop-blur-sm" asChild><a href="#engineering">{copy.nav.engineering}</a></Button>
                            <Button variant="ghost" className="hover:bg-background/60 hover:backdrop-blur-sm" asChild><a href="#delivery">{copy.nav.delivery}</a></Button>
                        </nav>

                        <div className="flex items-center gap-1 sm:gap-2">
                            <SettingsControl locale={locale} locales={locales} copy={copy.controls} />
                        </div>
                    </div>
                </header>

                <main id="main-content">
                    {/* Screen 1: Hero (Left text, Right Workspace Preview) */}
                    <section className="home-section relative py-24 sm:py-28 lg:py-32">
                        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                        <GridParticles />
                        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
                            <div className="home-reveal max-w-3xl">
                                <Badge variant="secondary" className="mb-6 border border-primary/20 bg-secondary/70 backdrop-blur-md text-primary shadow-xs">
                                    <Zap aria-hidden="true" />
                                    {copy.hero.badge}
                                </Badge>
                                <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl lg:leading-[0.98]">
                                    {copy.hero.title_first}
                                    <span className="block text-primary">{copy.hero.title_accent}</span>
                                </h1>
                                <p className="mt-7 max-w-2xl text-balance text-xl font-medium leading-8 sm:text-2xl sm:leading-9">
                                    {copy.hero.lead}
                                </p>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                                    {copy.hero.description}
                                </p>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Button size="lg" className="shadow-lg shadow-primary/20" asChild>
                                        <a href="#architecture">
                                            {copy.hero.primary_cta}
                                            <ArrowRight data-icon="inline-end" aria-hidden="true" />
                                        </a>
                                    </Button>
                                    <Button size="lg" variant="outline" className="border-border/60 bg-background/50 backdrop-blur-md hover:bg-background/80" asChild>
                                        <a href="#skills">{copy.hero.secondary_cta}</a>
                                    </Button>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                                    {copy.hero.checks.map((item) => (
                                        <span key={item} className="flex items-center gap-2">
                                            <Check className="size-4 text-primary" aria-hidden="true" />
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
                                <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-linear-to-tr from-primary/25 via-chart-2/15 to-transparent blur-3xl opacity-80" aria-hidden="true" />
                                <WorkspacePreview copy={copy.workspace} />
                            </div>
                        </div>
                    </section>

                    {/* Screen 2: Architecture (Left Diagram, Right Text + Engineering Principles) */}
                    <section id="architecture" className="home-section border-y border-border/50 bg-muted/15 py-20 sm:py-24 backdrop-blur-[2px]">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                                {/* Left: Diagram */}
                                <div className="order-2 lg:order-1">
                                    <ArchitectureDiagram copy={copy.architecture} />
                                </div>

                                {/* Right: Text + Values */}
                                <div className="order-1 flex flex-col justify-center lg:order-2">
                                    <Badge variant="outline" className="mb-4 w-fit border-primary/30 bg-primary/10 text-primary backdrop-blur-xs">{copy.architecture.badge}</Badge>
                                    <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                                        {copy.architecture.title}
                                    </h2>
                                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                                        {copy.architecture.description}
                                    </p>

                                    <div className="mt-8 flex flex-col gap-3">
                                        {engineering.map(({ icon: Icon, title, description }) => (
                                            <div key={title} className="flex items-start gap-3.5 rounded-xl border border-border/50 bg-card/40 p-3.5 backdrop-blur-md transition-colors hover:border-primary/30">
                                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs">
                                                    <Icon className="size-4" aria-hidden="true" />
                                                </span>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                                                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Screen 3: Solutions (Left Text + Active Details, Right Radial Orbit) */}
                    <section id="solutions" className="home-section py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
                                {/* Left: Text + Active Solution Details */}
                                <div className="flex flex-col justify-center">
                                    <Badge variant="outline" className="mb-4 w-fit border-primary/30 bg-primary/10 text-primary backdrop-blur-xs">{copy.solutions.badge}</Badge>
                                    <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                                        {copy.solutions.title}
                                    </h2>
                                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                                        {copy.solutions.description}
                                    </p>

                                    {/* Active Solution Focus Card */}
                                    <Card className="mt-8 rounded-2xl border border-primary/30 bg-card/60 p-6 shadow-xl shadow-primary/5 backdrop-blur-2xl transition-all">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                                                    {activeSolution.icon && <activeSolution.icon className="size-5" aria-hidden="true" />}
                                                </span>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{activeSolution.category}</span>
                                                    <h3 className="text-lg font-semibold text-foreground">{activeSolution.title}</h3>
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="font-mono text-xs">{activeSolution.number}</Badge>
                                        </div>
                                        <p className="mt-4 text-sm leading-6 text-muted-foreground">{activeSolution.description}</p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {activeSolution.technologies.map((tech) => (
                                                <Badge key={tech} variant="outline" className="border-border/60 bg-background/60 backdrop-blur-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card>
                                </div>

                                {/* Right: Solutions Radial Orbit */}
                                <div className="flex justify-center">
                                    <SolutionsOrbit
                                        solutions={solutions}
                                        activeIndex={activeSolutionIndex}
                                        onSelect={setActiveSolutionIndex}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Screen 4: Skills (Left Radial Orbit, Right Text + Path Details) */}
                    <section id="skills" className="home-section border-y border-border/50 bg-muted/15 py-20 sm:py-24 backdrop-blur-[2px]">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                                {/* Left: Skills Radial Orbit */}
                                <div className="order-2 flex justify-center lg:order-1">
                                    <SkillsOrbit
                                        skills={skills}
                                        activeIndex={activeSkillIndex}
                                        onSelect={setActiveSkillIndex}
                                    />
                                </div>

                                {/* Right: Text + Active Skill Focus + Path Card */}
                                <div className="order-1 flex flex-col justify-center lg:order-2">
                                    <Badge variant="outline" className="mb-4 w-fit border-primary/30 bg-primary/10 text-primary backdrop-blur-xs">
                                        <Bot aria-hidden="true" />
                                        {copy.skills.badge}
                                    </Badge>
                                    <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                                        {copy.skills.title}
                                    </h2>
                                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                                        {copy.skills.description}
                                    </p>

                                    {/* Active Skill Focus Card */}
                                    <Card className="mt-8 rounded-2xl border border-primary/30 bg-card/60 p-6 shadow-xl shadow-primary/5 backdrop-blur-2xl transition-all">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                                                    {activeSkill.icon && <activeSkill.icon className="size-5" aria-hidden="true" />}
                                                </span>
                                                <div>
                                                    <h3 className="font-mono text-base font-semibold text-foreground">{activeSkill.name}</h3>
                                                    <Badge variant="outline" className="mt-1 border-primary/30 text-xs text-primary">{activeSkill.scope}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm leading-6 text-muted-foreground">{activeSkill.description}</p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {activeSkill.capabilities.map((cap) => (
                                                <Badge key={cap} variant="secondary" className="border border-border/40 bg-secondary/70 backdrop-blur-xs">
                                                    {cap}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card>

                                    {/* Path Info Card */}
                                    <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-border/50 bg-background/50 p-3.5 backdrop-blur-md">
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                            <FolderCode className="size-4" aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0">
                                            <code className="text-xs font-semibold">{copy.skills.path}</code>
                                            <p className="mt-0.5 text-[0.6875rem] text-muted-foreground">{copy.skills.path_description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Screen 5: Engineering (Left Text + Metrics, Right Process Steps) */}
                    <section id="engineering" className="home-section py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
                                {/* Left: Text + Metrics Card */}
                                <div className="flex flex-col justify-center">
                                    <Badge variant="outline" className="mb-4 w-fit border-primary/30 bg-primary/10 text-primary backdrop-blur-xs">{copy.engineering.badge}</Badge>
                                    <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                                        {copy.engineering.title}
                                    </h2>
                                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                                        {copy.engineering.description}
                                    </p>

                                    <Card className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-none backdrop-blur-xl">
                                        <CardHeader className="p-0 pb-5">
                                            <CardTitle className="text-lg"><h3>{copy.engineering.metrics_title}</h3></CardTitle>
                                            <CardDescription className="text-xs leading-5">{copy.engineering.metrics_description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                                                {engineeringMetrics.map(({ icon: Icon, value, label, description }) => (
                                                    <div key={label} className="min-w-0 border-l border-primary/30 pl-3">
                                                        <dt className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                                            <Icon className="size-3.5 text-primary" aria-hidden="true" />
                                                            {label}
                                                        </dt>
                                                        <dd className="mt-1.5 text-2xl font-semibold tracking-tight">{value}</dd>
                                                        <dd className="mt-0.5 text-[0.6875rem] leading-4 text-muted-foreground">{description}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Right: Process Steps Flow */}
                                <div className="flex flex-col justify-center">
                                    <Card className="rounded-2xl border border-border/60 bg-card/40 p-6 shadow-none backdrop-blur-xl">
                                        <CardHeader className="p-0 pb-6">
                                            <CardTitle className="text-xl"><h3>{copy.engineering.process.title}</h3></CardTitle>
                                            <CardDescription className="leading-6">{copy.engineering.process.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <ol className="grid gap-4 sm:grid-cols-2">
                                                {engineeringProcess.map(({ icon: Icon, title, description }, index) => (
                                                    <li key={title} className="flex flex-col gap-2 rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-md transition-colors hover:border-primary/30">
                                                        <div className="flex items-center justify-between">
                                                            <span className="flex size-8 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs">
                                                                <Icon className="size-4" aria-hidden="true" />
                                                            </span>
                                                            <Badge variant="secondary" className="border border-border/40 bg-secondary/70 text-[0.625rem]">{String(index + 1).padStart(2, '0')}</Badge>
                                                        </div>
                                                        <h4 className="mt-1 text-sm font-semibold text-foreground">{title}</h4>
                                                        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
                                                    </li>
                                                ))}
                                            </ol>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Screen 6: Delivery Pipeline (Git to CI to EAS to Stores) */}
                    <section id="delivery" aria-labelledby="delivery-title" className="home-section border-y border-border/50 bg-muted/15 py-20 backdrop-blur-[2px] sm:py-24">
                        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                                <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 text-primary backdrop-blur-xs">
                                    <GitBranch data-icon="inline-start" aria-hidden="true" />
                                    {copy.delivery.badge}
                                </Badge>
                                <h2 id="delivery-title" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                                    {copy.delivery.title}
                                </h2>
                                <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                                    {copy.delivery.description}
                                </p>
                            </div>

                            <ol aria-label={copy.delivery.flow_label} className="delivery-steps mt-12 grid gap-4 lg:grid-cols-3">
                                {deliveryStages.map(({ icon: Icon, eyebrow, title, description, meta }, index) => (
                                    <li key={title} className="delivery-stage">
                                        <Card className="h-full gap-4 rounded-2xl border border-border/60 bg-card/60 py-5 shadow-xs backdrop-blur-xl transition-all duration-200 hover:border-primary/40 hover:bg-card/80 hover:shadow-md">
                                            <CardHeader className="gap-4 px-5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/80 text-primary shadow-xs">
                                                        <Icon className="size-5" aria-hidden="true" />
                                                    </span>
                                                    <Badge variant="secondary" className="border border-border/40 bg-secondary/70 font-mono text-[0.625rem]">
                                                        {String(index + 1).padStart(2, '0')} · {eyebrow}
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg leading-6"><h3>{title}</h3></CardTitle>
                                                    <CardDescription className="mt-2 leading-6">{description}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="mt-auto px-5">
                                                <Badge variant="outline" className="border-border/60 bg-background/60 font-mono text-[0.6875rem] text-muted-foreground">
                                                    {meta}
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    </li>
                                ))}
                            </ol>

                            <div className="mt-8 rounded-3xl border border-border/60 bg-background/50 p-5 shadow-xl shadow-foreground/5 backdrop-blur-xl sm:p-7 lg:p-8">
                                <div className="mx-auto mb-6 flex max-w-2xl flex-col items-center text-center">
                                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                        <GitBranch className="size-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="mt-4 text-xl font-semibold text-foreground">{copy.delivery.distribution_title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.delivery.distribution_description}</p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {deliveryStores.map(({ icon: Icon, platform, title, description, artifact }) => (
                                        <Card key={title} className="h-full gap-4 rounded-2xl border border-border/60 bg-card/60 py-5 shadow-xs backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-card/85 hover:shadow-md">
                                            <CardHeader className="gap-4 px-5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/80 text-primary shadow-xs">
                                                        <Icon className="size-5" aria-hidden="true" />
                                                    </span>
                                                    <Badge variant="outline" className="border-primary/25 bg-primary/10 text-primary">{platform}</Badge>
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg leading-6"><h4>{title}</h4></CardTitle>
                                                    <CardDescription className="mt-2 leading-6">{description}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="mt-auto px-5">
                                                <Badge variant="secondary" className="border border-border/40 bg-secondary/70 font-mono text-[0.6875rem]">
                                                    <PackageCheck data-icon="inline-start" aria-hidden="true" />
                                                    {artifact}
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Screen 7: CTA Section (Left Action, Right 4 Modules) */}
                    <section className="home-section py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 px-6 py-10 text-foreground shadow-2xl backdrop-blur-2xl sm:px-10 sm:py-12 lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12 lg:px-14 lg:py-14">
                                <div className="cta-grid pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-20" aria-hidden="true" />
                                <div className="absolute right-0 top-0 size-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20 dark:bg-primary/35 blur-3xl" aria-hidden="true" />
                                <div className="relative max-w-xl">
                                    <Badge variant="outline" className="mb-5 border-primary/30 bg-primary/10 text-primary backdrop-blur-xs">
                                        <Rocket aria-hidden="true" />
                                        {copy.cta.badge}
                                    </Badge>
                                    <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                        {copy.cta.title}
                                    </h2>
                                    <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                                        {copy.cta.description}
                                    </p>

                                    <div className="mt-8">
                                        <Button size="lg" className="shadow-lg shadow-primary/20" asChild>
                                            <a href="#skills">
                                                {copy.cta.button}
                                                <ArrowRight data-icon="inline-end" aria-hidden="true" />
                                            </a>
                                        </Button>
                                    </div>

                                    <p className="mt-7 border-l border-primary/60 pl-4 text-sm leading-6 text-muted-foreground">
                                        {copy.cta.note}
                                    </p>
                                </div>

                                <div className="relative mt-10 lg:mt-0">
                                    <div className="mb-5 max-w-2xl">
                                        <h3 className="text-xl font-semibold text-foreground">{copy.cta.modules_title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.cta.modules_description}</p>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {ctaModules.map(({ icon: Icon, title, description, technologies }) => (
                                            <Card key={title} size="sm" className="rounded-xl border border-border/60 bg-background/50 text-foreground shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-background/80 hover:border-primary/40 hover:shadow-md">
                                                <CardHeader>
                                                    <span className="flex size-9 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs">
                                                        <Icon className="size-4" aria-hidden="true" />
                                                    </span>
                                                    <CardTitle className="mt-2 text-sm font-semibold text-foreground"><h4>{title}</h4></CardTitle>
                                                    <CardDescription className="text-xs leading-5 text-muted-foreground">
                                                        {description}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex flex-wrap gap-2">
                                                    {technologies.map((technology) => (
                                                        <Badge key={technology} variant="outline" className="border-border/60 bg-background/60 text-muted-foreground backdrop-blur-xs">
                                                            {technology}
                                                        </Badge>
                                                    ))}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-border/50 bg-background/60 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <Brand compact />
                            <span>© {new Date().getFullYear()} {copy.footer.copyright}</span>
                        </div>
                        <p className="flex items-center gap-2">
                            <Braces className="size-4" aria-hidden="true" />
                            {copy.footer.summary}
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
