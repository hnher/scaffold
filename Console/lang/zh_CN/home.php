<?php

declare(strict_types=1);

return [
    'meta' => [
        'title' => 'Laravel Scaffold',
        'description' => 'Laravel Scaffold 是一套以 Laravel 为统一后端，覆盖 PC、H5、小程序、React Native App、Filament 管理后台和专业 Skills 的全端应用脚手架。',
    ],
    'brand' => [
        'tagline' => '全端应用基础',
    ],
    'controls' => [
        'skip_to_content' => '跳到主要内容',
        'home_label' => 'Laravel Scaffold 首页',
        'settings_label' => '打开设置',
        'settings_title' => '界面设置',
        'settings_description' => '选择显示主题与页面语言。',
        'theme' => '显示主题',
        'theme_light' => '浅色',
        'theme_dark' => '深色',
        'theme_system' => '跟随系统',
        'language' => '页面语言',
        'changing_language' => '正在切换语言',
    ],
    'nav' => [
        'main_label' => '主要导航',
        'open_menu' => '打开导航菜单',
        'close_menu' => '关闭导航菜单',
        'menu_description' => '选择页面栏目并快速跳转。',
        'architecture' => '技术架构',
        'solutions' => '端侧方案',
        'skills' => 'Skills',
        'engineering' => '工程价值',
        'delivery' => '持续交付',
    ],
    'hero' => [
        'badge' => 'Laravel 优先 · 多端覆盖',
        'title_first' => 'Laravel',
        'title_accent' => 'Scaffold',
        'lead' => '一套面向真实业务的全端应用脚手架',
        'description' => '以 Laravel 作为统一后端，在同一项目内为 PC、H5、小程序、原生 App 和管理后台选择更合适的界面技术。',
        'primary_cta' => '查看架构方案',
        'secondary_cta' => '了解专业 Skills',
        'checks' => [
            '统一业务与数据',
            '多端独立交付',
            '专业 Skills 辅助',
        ],
    ],
    'workspace' => [
        'title' => 'laravel-scaffold/',
        'subtitle' => '多端应用工作区',
        'ready' => '架构就绪',
        'layers' => [
            [
                'directory' => 'Console/',
                'description' => 'Laravel 核心、PC / H5 与管理后台',
                'technology' => 'Laravel 13',
            ],
            [
                'directory' => 'Applet/',
                'description' => '多平台小程序应用与原子化样式',
                'technology' => 'uni-app',
            ],
            [
                'directory' => 'App/',
                'description' => 'iOS / Android 原生应用体验',
                'technology' => 'React Native',
            ],
            [
                'directory' => '.agents/skills/',
                'description' => '为各技术栈提供专业化编码约束',
                'technology' => '5 Skills',
            ],
        ],
        'core_title' => '统一连接 Laravel 业务核心',
        'core_description' => '共享数据、认证与接口约定，各客户端按自身节奏开发和发布。',
    ],
    'architecture' => [
        'badge' => '技术架构',
        'title' => '一个 Laravel 后端，衔接四类界面',
        'description' => '后端负责稳定的业务能力，端侧负责贴合场景的交互体验。边界清晰，团队可以并行开发，产品也更容易持续扩展。',
        'map_title' => '统一服务，多端呈现',
        'map_description' => '客户端通过清晰边界共享后端能力，不共享界面负担。',
        'map_badge' => '架构图',
        'map_label' => 'Laravel 统一业务后端连接 PC、H5、小程序、原生 App 和 Filament 管理后台',
        'core_eyebrow' => '业务核心',
        'core_title' => 'Laravel 业务后端',
        'api' => 'API',
        'nodes' => [
            ['label' => 'PC / H5', 'technology' => 'Inertia + React'],
            ['label' => '小程序', 'technology' => 'uni-app'],
            ['label' => '原生 App', 'technology' => 'React Native'],
            ['label' => '管理后台', 'technology' => 'FilamentPHP'],
        ],
    ],
    'solutions' => [
        'badge' => '端侧实现方案',
        'title' => '五个清晰层次，组成完整应用架构',
        'description' => '每一层都选择与目标平台匹配的开发方式，同时通过 Laravel 保持数据、身份和业务规则的一致。',
        'items' => [
            [
                'number' => '01',
                'category' => '核心后端',
                'title' => 'Laravel 统一业务后端',
                'description' => '以 Laravel 作为整个系统的核心，集中承载业务规则、数据模型、身份认证、接口与队列任务。',
                'technologies' => ['Laravel 13', 'PHP 8.4', 'Sanctum'],
            ],
            [
                'number' => '02',
                'category' => 'PC 与 H5',
                'title' => 'Inertia.js + React + shadcn/ui',
                'description' => '用 Inertia 连接 Laravel 与 React，以 shadcn/ui 构建可维护的组件系统，并通过响应式布局同时覆盖 PC 与 H5。',
                'technologies' => ['Inertia.js', 'React 19', 'shadcn/ui'],
            ],
            [
                'number' => '03',
                'category' => '小程序',
                'title' => 'uni-app + Weapp TailwindCSS',
                'description' => '使用 uni-app 组织小程序页面和跨平台能力，通过 Weapp TailwindCSS 保持高效、统一的样式开发体验。',
                'technologies' => ['uni-app', 'Vue 3', 'weapp-tailwindcss'],
            ],
            [
                'number' => '04',
                'category' => '原生 App',
                'title' => 'React Native + NativeWind',
                'description' => '使用 React Native 构建 iOS 与 Android 应用，配合 NativeWind 复用熟悉的原子化样式工作流。',
                'technologies' => ['React Native', 'Expo', 'NativeWind'],
            ],
            [
                'number' => '05',
                'category' => '管理后台',
                'title' => 'FilamentPHP 管理后台',
                'description' => '通过 Filament 的 Resource、Form、Table 与 Widget 快速搭建数据管理、运营配置和内部业务界面。',
                'technologies' => ['Filament v5', 'Livewire 4', 'Tailwind CSS'],
            ],
        ],
    ],
    'skills' => [
        'badge' => 'Agent Skills',
        'title' => '不只提供目录，也提供专业开发上下文',
        'description' => '项目内置五项可复用 Skills。它们让编码助手在处理具体任务时，先理解对应技术栈的规范、边界和验证方式，再进入实现。',
        'path' => '.agents/skills/',
        'path_description' => '由 skills-lock.json 锁定来源与版本',
        'items' => [
            [
                'name' => 'laravel-specialist',
                'scope' => 'Laravel 后端',
                'description' => '指导模型关系、API、认证、队列与自动化测试，让后端实现遵循一致的工程约束。',
                'capabilities' => ['Eloquent', 'Sanctum', 'Testing'],
            ],
            [
                'name' => 'shadcn',
                'scope' => 'PC / H5 界面',
                'description' => '约束组件组合、语义设计令牌与无障碍实现，保持 React 界面开放且可维护。',
                'capabilities' => ['Components', 'Tokens', 'A11y'],
            ],
            [
                'name' => 'filament-pro',
                'scope' => '管理后台',
                'description' => '覆盖 Resource、Form、Table、Action 与 Widget，提升后台页面的实现与测试效率。',
                'capabilities' => ['Resources', 'Tables', 'Widgets'],
            ],
            [
                'name' => 'uni-app',
                'scope' => '小程序端',
                'description' => '提供跨平台组件、API、条件编译和平台兼容性参考，减少多小程序平台差异。',
                'capabilities' => ['Cross-platform', 'APIs', 'Config'],
            ],
            [
                'name' => 'ui-ux-pro-max',
                'scope' => '体验与设计',
                'description' => '在页面实现前补充配色、响应式、交互和可访问性规则，让各端体验保持一致。',
                'capabilities' => ['Responsive', 'Color', 'UX'],
            ],
        ],
    ],
    'engineering' => [
        'badge' => '工程价值',
        'title' => '统一的不是界面，而是业务基础',
        'description' => '不强行让所有平台使用同一种 UI 技术。Scaffold 统一关键边界，同时保留每个终端的开发优势。',
        'items' => [
            [
                'title' => '一套业务核心',
                'description' => '模型、权限、验证与业务规则集中在 Laravel，避免多端重复实现核心逻辑。',
            ],
            [
                'title' => '各端选择合适技术',
                'description' => 'Web、小程序、App 与管理端各自使用成熟生态，兼顾开发效率与平台体验。',
            ],
            [
                'title' => '一致的工程边界',
                'description' => '统一接口、认证和数据约定，让不同客户端可以独立演进，也能稳定协作。',
            ],
        ],
        'metrics_title' => '架构覆盖一目了然',
        'metrics_description' => '用明确的数字呈现脚手架已经连接的业务核心、端侧形态、语言与专业开发能力。',
        'metrics' => [
            [
                'value' => '1',
                'label' => '业务核心',
                'description' => 'Laravel 统一承载模型、权限与规则。',
            ],
            [
                'value' => '4',
                'label' => '界面层',
                'description' => 'Web、小程序、原生 App 与管理后台。',
            ],
            [
                'value' => '3',
                'label' => '界面语言',
                'description' => '中文、英文、日文由 Laravel Lang 管理。',
            ],
            [
                'value' => '5',
                'label' => '专业 Skills',
                'description' => '覆盖后端、界面、后台与小程序开发。',
            ],
        ],
        'process' => [
            'title' => '从约定到交付的清晰路径',
            'description' => '每个终端可以独立推进，但始终围绕同一套业务契约完成实现与验证。',
            'items' => [
                [
                    'title' => '统一业务契约',
                    'description' => '先确定数据、认证、权限和 API 边界。',
                ],
                [
                    'title' => '实现 Laravel 核心',
                    'description' => '集中完成模型、验证、规则与异步任务。',
                ],
                [
                    'title' => '各端并行构建',
                    'description' => '按 Web、小程序、App 与后台体验独立实现。',
                ],
                [
                    'title' => '统一质量守门',
                    'description' => '通过构建、静态分析和自动化测试完成验证。',
                ],
            ],
        ],
    ],
    'delivery' => [
        'badge' => '持续交付',
        'title' => '从一次 Git 提交，到双端应用商店',
        'description' => '代码推送后，GitLab CI 负责准备并触发构建，Expo EAS 在云端完成签名打包，再将平台产物分别送往 Apple App Store 与 Google Play。',
        'flow_label' => '应用从 Git 提交，经 GitLab CI 和 Expo EAS，发布到 Apple App Store 与 Google Play 的流程',
        'stages' => [
            [
                'eyebrow' => '源代码',
                'title' => 'Git 提交与推送',
                'description' => '开发完成后提交受版本管理的代码并推送到 GitLab 仓库，为每次发布建立可追溯的起点。',
                'meta' => 'Commit / Push',
            ],
            [
                'eyebrow' => '自动化',
                'title' => 'GitLab CI',
                'description' => '.gitlab-ci.yml 安装锁定依赖、准备生产配置，并启动相互独立的 iOS 与 Android 构建任务。',
                'meta' => 'Pipeline Jobs',
            ],
            [
                'eyebrow' => '云端构建',
                'title' => 'Expo EAS',
                'description' => 'EAS 统一管理远程凭据、版本递增、应用签名与云端构建，生成两个平台可交付的商店产物。',
                'meta' => 'Signed Builds',
            ],
        ],
        'distribution_title' => '一条流水线，两个独立发布目标',
        'distribution_description' => '每个平台使用独立的证书、版本号、产物格式与商店发布通道，互不影响地推进审核和上线。',
        'stores' => [
            [
                'platform' => 'iOS',
                'title' => 'Apple App Store',
                'description' => '签名后的 IPA 提交到 App Store Connect，可继续进入 TestFlight、应用审核与正式发布。',
                'artifact' => 'IPA · App Store Connect',
            ],
            [
                'platform' => 'Android',
                'title' => 'Google Play',
                'description' => '生成的 AAB 可上传到 Google Play Console，并通过测试轨道或生产轨道逐步发布。',
                'artifact' => 'AAB · Play Console',
            ],
        ],
    ],
    'cta' => [
        'badge' => '业务开发就绪',
        'title' => '从稳定架构开始，专注实现业务',
        'description' => '后端、Web、小程序、App、管理后台与专业 Skills 已经形成可协作的工程基础，让团队把时间投入到真正有价值的业务功能。',
        'button' => '查看专业 Skills',
        'note' => 'Scaffold 负责稳定技术边界，不限制产品形态；你可以从任意终端开始，再按业务节奏逐步扩展。',
        'modules_title' => '已经准备好的四类基础',
        'modules_description' => '从统一后端到多端交付，每个模块都保留清晰职责和独立演进空间。',
        'modules' => [
            [
                'title' => 'Laravel 业务核心',
                'description' => '认证、模型、API、队列与统一异常响应。',
                'technologies' => ['Laravel', 'Sanctum', 'Eloquent'],
            ],
            [
                'title' => '响应式 Web',
                'description' => '同一套组件覆盖 PC 与 H5 使用场景。',
                'technologies' => ['Inertia', 'React', 'shadcn/ui'],
            ],
            [
                'title' => '移动端工作区',
                'description' => '分别承载小程序与 iOS / Android 体验。',
                'technologies' => ['uni-app', 'React Native', 'NativeWind'],
            ],
            [
                'title' => '管理与质量',
                'description' => '后台资源、专业 Skills 与自动化质量检查。',
                'technologies' => ['Filament', 'Skills', 'Testing'],
            ],
        ],
    ],
    'footer' => [
        'copyright' => 'Laravel Scaffold',
        'summary' => 'Laravel 驱动 · Skills 辅助 · 多端协作',
    ],
];
