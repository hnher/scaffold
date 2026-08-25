<?php

declare(strict_types=1);

return [
    'meta' => [
        'title' => 'Laravel Scaffold',
        'description' => 'Laravel Scaffold is a full-stack application foundation with a unified Laravel backend for PC, mobile web, mini programs, React Native apps, Filament administration, and expert Skills.',
    ],
    'brand' => [
        'tagline' => 'Full-stack foundation',
    ],
    'controls' => [
        'skip_to_content' => 'Skip to main content',
        'home_label' => 'Laravel Scaffold home',
        'settings_label' => 'Open settings',
        'settings_title' => 'Interface settings',
        'settings_description' => 'Choose the display theme and page language.',
        'theme' => 'Display theme',
        'theme_light' => 'Light',
        'theme_dark' => 'Dark',
        'theme_system' => 'System',
        'language' => 'Page language',
        'changing_language' => 'Changing language',
    ],
    'nav' => [
        'main_label' => 'Primary navigation',
        'architecture' => 'Architecture',
        'solutions' => 'Platforms',
        'skills' => 'Skills',
        'engineering' => 'Engineering',
        'delivery' => 'Delivery',
    ],
    'hero' => [
        'badge' => 'Laravel-first · Multi-platform',
        'title_first' => 'Laravel',
        'title_accent' => 'Scaffold',
        'lead' => 'A full-stack foundation built for real products',
        'description' => 'Use Laravel as the unified backend while choosing the right interface technology for PC, mobile web, mini programs, native apps, and administration within one project.',
        'primary_cta' => 'Explore the architecture',
        'secondary_cta' => 'Discover expert Skills',
        'checks' => [
            'Unified business and data',
            'Independent delivery by platform',
            'Expert Skills included',
        ],
    ],
    'workspace' => [
        'title' => 'laravel-scaffold/',
        'subtitle' => 'Multi-platform workspace',
        'ready' => 'Architecture ready',
        'layers' => [
            [
                'directory' => 'Console/',
                'description' => 'Laravel core, PC / mobile web, and administration',
                'technology' => 'Laravel 13',
            ],
            [
                'directory' => 'Applet/',
                'description' => 'Cross-platform mini programs and utility-first styling',
                'technology' => 'uni-app',
            ],
            [
                'directory' => 'App/',
                'description' => 'Native experiences for iOS and Android',
                'technology' => 'React Native',
            ],
            [
                'directory' => '.agents/skills/',
                'description' => 'Expert coding guidance for every technology layer',
                'technology' => '5 Skills',
            ],
        ],
        'core_title' => 'One Laravel business core',
        'core_description' => 'Share data, authentication, and API contracts while each client develops and ships independently.',
    ],
    'architecture' => [
        'badge' => 'Architecture',
        'title' => 'One Laravel backend, four interface layers',
        'description' => 'The backend owns stable business capabilities while every client focuses on the interaction model of its platform. Clear boundaries let teams work in parallel and evolve safely.',
        'map_title' => 'Unified services, platform-native interfaces',
        'map_description' => 'Clients share backend capabilities through clear contracts without inheriting each other’s UI constraints.',
        'map_badge' => 'Architecture map',
        'map_label' => 'A Laravel business backend connected to PC, mobile web, mini programs, native apps, and Filament administration',
        'core_eyebrow' => 'Business core',
        'core_title' => 'Laravel backend',
        'api' => 'API',
        'nodes' => [
            ['label' => 'PC / Mobile web', 'technology' => 'Inertia + React'],
            ['label' => 'Mini programs', 'technology' => 'uni-app'],
            ['label' => 'Native apps', 'technology' => 'React Native'],
            ['label' => 'Administration', 'technology' => 'FilamentPHP'],
        ],
    ],
    'solutions' => [
        'badge' => 'Platform implementation',
        'title' => 'Five clear layers, one complete architecture',
        'description' => 'Each layer uses an approach suited to its platform while Laravel keeps data, identity, and business rules consistent.',
        'items' => [
            [
                'number' => '01',
                'category' => 'Core backend',
                'title' => 'Unified Laravel backend',
                'description' => 'Laravel sits at the center of the system and owns business rules, data models, authentication, APIs, and queued work.',
                'technologies' => ['Laravel 13', 'PHP 8.4', 'Sanctum'],
            ],
            [
                'number' => '02',
                'category' => 'PC & mobile web',
                'title' => 'Inertia.js + React + shadcn/ui',
                'description' => 'Inertia connects Laravel and React, shadcn/ui provides an open component system, and responsive layouts cover both PC and mobile web.',
                'technologies' => ['Inertia.js', 'React 19', 'shadcn/ui'],
            ],
            [
                'number' => '03',
                'category' => 'Mini programs',
                'title' => 'uni-app + Weapp TailwindCSS',
                'description' => 'uni-app structures cross-platform mini program pages while Weapp TailwindCSS keeps utility-first styling fast and consistent.',
                'technologies' => ['uni-app', 'Vue 3', 'weapp-tailwindcss'],
            ],
            [
                'number' => '04',
                'category' => 'Native apps',
                'title' => 'React Native + NativeWind',
                'description' => 'React Native delivers iOS and Android apps, with NativeWind bringing the familiar utility-first styling workflow.',
                'technologies' => ['React Native', 'Expo', 'NativeWind'],
            ],
            [
                'number' => '05',
                'category' => 'Administration',
                'title' => 'FilamentPHP administration',
                'description' => 'Filament Resources, Forms, Tables, and Widgets accelerate data management, operations, and internal business interfaces.',
                'technologies' => ['Filament v5', 'Livewire 4', 'Tailwind CSS'],
            ],
        ],
    ],
    'skills' => [
        'badge' => 'Agent Skills',
        'title' => 'More than directories: expert development context',
        'description' => 'Five reusable Skills help the coding assistant understand each stack’s rules, boundaries, and verification workflow before implementation begins.',
        'path' => '.agents/skills/',
        'path_description' => 'Sources and versions are locked by skills-lock.json',
        'items' => [
            [
                'name' => 'laravel-specialist',
                'scope' => 'Laravel backend',
                'description' => 'Guides model relationships, APIs, authentication, queues, and automated testing with consistent backend conventions.',
                'capabilities' => ['Eloquent', 'Sanctum', 'Testing'],
            ],
            [
                'name' => 'shadcn',
                'scope' => 'PC / mobile web',
                'description' => 'Guides component composition, semantic design tokens, and accessibility for maintainable React interfaces.',
                'capabilities' => ['Components', 'Tokens', 'A11y'],
            ],
            [
                'name' => 'filament-pro',
                'scope' => 'Administration',
                'description' => 'Covers Resources, Forms, Tables, Actions, and Widgets to accelerate reliable admin interface development.',
                'capabilities' => ['Resources', 'Tables', 'Widgets'],
            ],
            [
                'name' => 'uni-app',
                'scope' => 'Mini programs',
                'description' => 'Provides cross-platform components, APIs, conditional compilation, and compatibility guidance for mini program targets.',
                'capabilities' => ['Cross-platform', 'APIs', 'Config'],
            ],
            [
                'name' => 'ui-ux-pro-max',
                'scope' => 'Experience design',
                'description' => 'Adds color, responsive layout, interaction, and accessibility guidance before interface implementation.',
                'capabilities' => ['Responsive', 'Color', 'UX'],
            ],
        ],
    ],
    'engineering' => [
        'badge' => 'Engineering value',
        'title' => 'Unify the business foundation, not every interface',
        'description' => 'Scaffold does not force every platform onto one UI technology. It standardizes critical boundaries while preserving each client’s strengths.',
        'items' => [
            [
                'title' => 'One business core',
                'description' => 'Models, authorization, validation, and business rules stay in Laravel instead of being reimplemented across clients.',
            ],
            [
                'title' => 'The right technology per platform',
                'description' => 'Web, mini programs, apps, and administration each use a mature ecosystem suited to their delivery context.',
            ],
            [
                'title' => 'Consistent engineering boundaries',
                'description' => 'Shared APIs, authentication, and data contracts let clients evolve independently while collaborating reliably.',
            ],
        ],
        'metrics_title' => 'Architecture coverage at a glance',
        'metrics_description' => 'A clear view of the business core, client surfaces, languages, and expert development guidance already connected by Scaffold.',
        'metrics' => [
            [
                'value' => '1',
                'label' => 'Business core',
                'description' => 'Laravel owns models, authorization, and rules.',
            ],
            [
                'value' => '4',
                'label' => 'Interface layers',
                'description' => 'Web, mini programs, native apps, and administration.',
            ],
            [
                'value' => '3',
                'label' => 'Interface languages',
                'description' => 'Chinese, English, and Japanese through Laravel Lang.',
            ],
            [
                'value' => '5',
                'label' => 'Expert Skills',
                'description' => 'Backend, interface, admin, and mini program guidance.',
            ],
        ],
        'process' => [
            'title' => 'A clear path from contract to delivery',
            'description' => 'Every client can move independently while implementing and validating against the same business contracts.',
            'items' => [
                [
                    'title' => 'Define shared contracts',
                    'description' => 'Establish data, authentication, authorization, and API boundaries.',
                ],
                [
                    'title' => 'Build the Laravel core',
                    'description' => 'Centralize models, validation, rules, and asynchronous work.',
                ],
                [
                    'title' => 'Deliver clients in parallel',
                    'description' => 'Implement Web, mini program, app, and admin experiences independently.',
                ],
                [
                    'title' => 'Enforce quality gates',
                    'description' => 'Validate with builds, static analysis, and automated tests.',
                ],
            ],
        ],
    ],
    'delivery' => [
        'badge' => 'Continuous delivery',
        'title' => 'From one Git commit to both app stores',
        'description' => 'After code is pushed, GitLab CI prepares and triggers the builds, Expo EAS signs and packages them in the cloud, and each platform artifact continues to Apple App Store or Google Play.',
        'flow_label' => 'Application delivery from a Git commit through GitLab CI and Expo EAS to Apple App Store and Google Play',
        'stages' => [
            [
                'eyebrow' => 'Source',
                'title' => 'Commit and push with Git',
                'description' => 'Versioned code is pushed to the GitLab repository, creating a traceable starting point for every release.',
                'meta' => 'Commit / Push',
            ],
            [
                'eyebrow' => 'Automation',
                'title' => 'GitLab CI',
                'description' => '.gitlab-ci.yml installs locked dependencies, prepares production configuration, and launches independent iOS and Android build jobs.',
                'meta' => 'Pipeline Jobs',
            ],
            [
                'eyebrow' => 'Cloud build',
                'title' => 'Expo EAS',
                'description' => 'EAS manages remote credentials, version increments, signing, and cloud builds for both store-ready platform artifacts.',
                'meta' => 'Signed Builds',
            ],
        ],
        'distribution_title' => 'One pipeline, two independent release targets',
        'distribution_description' => 'Each platform keeps its own credentials, version, artifact format, and store release path, so review and rollout can progress independently.',
        'stores' => [
            [
                'platform' => 'iOS',
                'title' => 'Apple App Store',
                'description' => 'The signed IPA is submitted to App Store Connect, ready for TestFlight, app review, and production release.',
                'artifact' => 'IPA · App Store Connect',
            ],
            [
                'platform' => 'Android',
                'title' => 'Google Play',
                'description' => 'The generated AAB can be uploaded to Google Play Console and promoted through testing or production tracks.',
                'artifact' => 'AAB · Play Console',
            ],
        ],
    ],
    'cta' => [
        'badge' => 'Ready for business',
        'title' => 'Start from a stable architecture and focus on the product',
        'description' => 'Backend, web, mini programs, apps, administration, and expert Skills now form a collaborative engineering foundation, so teams can invest their time in valuable product features.',
        'button' => 'Explore expert Skills',
        'note' => 'Scaffold establishes stable technical boundaries without limiting the product shape. Start with any client and expand at the pace of the business.',
        'modules_title' => 'Four foundations already in place',
        'modules_description' => 'From a unified backend to multi-platform delivery, every module has a clear responsibility and room to evolve independently.',
        'modules' => [
            [
                'title' => 'Laravel business core',
                'description' => 'Authentication, models, APIs, queues, and consistent error responses.',
                'technologies' => ['Laravel', 'Sanctum', 'Eloquent'],
            ],
            [
                'title' => 'Responsive Web',
                'description' => 'One component system covering both PC and mobile web.',
                'technologies' => ['Inertia', 'React', 'shadcn/ui'],
            ],
            [
                'title' => 'Mobile workspaces',
                'description' => 'Dedicated foundations for mini programs and iOS / Android.',
                'technologies' => ['uni-app', 'React Native', 'NativeWind'],
            ],
            [
                'title' => 'Administration and quality',
                'description' => 'Admin resources, expert Skills, and automated quality checks.',
                'technologies' => ['Filament', 'Skills', 'Testing'],
            ],
        ],
    ],
    'footer' => [
        'copyright' => 'Laravel Scaffold',
        'summary' => 'Laravel powered · Skills guided · Multi-platform',
    ],
];
