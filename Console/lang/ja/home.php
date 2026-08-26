<?php

declare(strict_types=1);

return [
    'meta' => [
        'title' => 'Laravel Scaffold',
        'description' => 'Laravel Scaffold は、Laravel を統合バックエンドとして、PC、モバイルWeb、ミニプログラム、React Native アプリ、Filament 管理画面、専門 Skills をカバーするフルスタック基盤です。',
    ],
    'brand' => [
        'tagline' => 'フルスタック基盤',
    ],
    'controls' => [
        'skip_to_content' => 'メインコンテンツへ移動',
        'home_label' => 'Laravel Scaffold ホーム',
        'settings_label' => '設定を開く',
        'settings_title' => '表示設定',
        'settings_description' => '表示テーマとページの言語を選択します。',
        'theme' => '表示テーマ',
        'theme_light' => 'ライト',
        'theme_dark' => 'ダーク',
        'theme_system' => 'システム',
        'language' => 'ページの言語',
        'changing_language' => '言語を切り替えています',
    ],
    'nav' => [
        'main_label' => 'メインナビゲーション',
        'open_menu' => 'ナビゲーションメニューを開く',
        'close_menu' => 'ナビゲーションメニューを閉じる',
        'menu_description' => 'ページ内のセクションを選択して移動します。',
        'architecture' => 'アーキテクチャ',
        'solutions' => '各端末の構成',
        'skills' => 'Skills',
        'engineering' => '開発上の価値',
        'delivery' => 'リリース',
    ],
    'hero' => [
        'badge' => 'Laravel ファースト · マルチプラットフォーム',
        'title_first' => 'Laravel',
        'title_accent' => 'Scaffold',
        'lead' => '実運用を見据えたフルスタック・アプリケーション基盤',
        'description' => 'Laravel を統合バックエンドとし、1つのプロジェクト内で PC、モバイルWeb、ミニプログラム、ネイティブアプリ、管理画面に最適なUI技術を選択します。',
        'primary_cta' => '構成を見る',
        'secondary_cta' => '専門 Skills を見る',
        'checks' => [
            'ビジネスロジックとデータを統合',
            '各プラットフォームを個別に提供',
            '専門 Skills による支援',
        ],
    ],
    'workspace' => [
        'title' => 'laravel-scaffold/',
        'subtitle' => 'マルチプラットフォーム・ワークスペース',
        'ready' => '構成準備済み',
        'layers' => [
            [
                'directory' => 'Console/',
                'description' => 'Laravel コア、PC / モバイルWeb、管理画面',
                'technology' => 'Laravel 13',
            ],
            [
                'directory' => 'Applet/',
                'description' => 'マルチプラットフォームのミニプログラムとユーティリティスタイル',
                'technology' => 'uni-app',
            ],
            [
                'directory' => 'App/',
                'description' => 'iOS / Android 向けネイティブ体験',
                'technology' => 'React Native',
            ],
            [
                'directory' => '.agents/skills/',
                'description' => '各技術レイヤーに専門的な実装ルールを提供',
                'technology' => '5 Skills',
            ],
        ],
        'core_title' => 'Laravel のビジネスコアへ統合',
        'core_description' => 'データ、認証、API 契約を共有し、各クライアントは独立したペースで開発・リリースできます。',
    ],
    'architecture' => [
        'badge' => '技術アーキテクチャ',
        'title' => '1つの Laravel バックエンドで、4種類のUIを支える',
        'description' => 'バックエンドは安定したビジネス機能を担い、各クライアントはプラットフォームに適した操作体験を担当します。明確な境界により、チームは並行して安全に開発できます。',
        'map_title' => 'サービスを統合し、各端末に最適なUIを提供',
        'map_description' => 'クライアントは明確な契約を通じてバックエンド機能を共有し、他端末のUI制約を持ち込みません。',
        'map_badge' => '構成図',
        'map_label' => 'Laravel ビジネスバックエンドが PC、モバイルWeb、ミニプログラム、ネイティブアプリ、Filament 管理画面に接続する構成',
        'core_eyebrow' => 'ビジネスコア',
        'core_title' => 'Laravel バックエンド',
        'api' => 'API',
        'nodes' => [
            ['label' => 'PC / モバイルWeb', 'technology' => 'Inertia + React'],
            ['label' => 'ミニプログラム', 'technology' => 'uni-app'],
            ['label' => 'ネイティブアプリ', 'technology' => 'React Native'],
            ['label' => '管理画面', 'technology' => 'FilamentPHP'],
        ],
    ],
    'solutions' => [
        'badge' => '各端末の実装',
        'title' => '5つの明確なレイヤーで、完全なアプリケーション構成を実現',
        'description' => '各レイヤーは対象プラットフォームに適した技術を使い、Laravel がデータ、認証、ビジネスルールの一貫性を保ちます。',
        'items' => [
            [
                'number' => '01',
                'category' => 'コアバックエンド',
                'title' => 'Laravel による統合バックエンド',
                'description' => 'Laravel をシステムの中心に置き、ビジネスルール、データモデル、認証、API、キュー処理を集約します。',
                'technologies' => ['Laravel 13', 'PHP 8.4', 'Sanctum'],
            ],
            [
                'number' => '02',
                'category' => 'PC・モバイルWeb',
                'title' => 'Inertia.js + React + shadcn/ui',
                'description' => 'Inertia で Laravel と React を接続し、shadcn/ui の保守しやすいコンポーネントとレスポンシブ設計で PC とモバイルWebをカバーします。',
                'technologies' => ['Inertia.js', 'React 19', 'shadcn/ui'],
            ],
            [
                'number' => '03',
                'category' => 'ミニプログラム',
                'title' => 'uni-app + Weapp TailwindCSS',
                'description' => 'uni-app でクロスプラットフォームの画面を構成し、Weapp TailwindCSS で効率的かつ一貫したスタイル開発を行います。',
                'technologies' => ['uni-app', 'Vue 3', 'weapp-tailwindcss'],
            ],
            [
                'number' => '04',
                'category' => 'ネイティブアプリ',
                'title' => 'React Native + NativeWind',
                'description' => 'React Native で iOS / Android アプリを構築し、NativeWind で使い慣れたユーティリティスタイルの開発フローを利用します。',
                'technologies' => ['React Native', 'Expo', 'NativeWind'],
            ],
            [
                'number' => '05',
                'category' => '管理画面',
                'title' => 'FilamentPHP 管理画面',
                'description' => 'Filament の Resource、Form、Table、Widget で、データ管理、運用設定、社内業務画面を素早く構築します。',
                'technologies' => ['Filament v5', 'Livewire 4', 'Tailwind CSS'],
            ],
        ],
    ],
    'skills' => [
        'badge' => 'Agent Skills',
        'title' => 'ディレクトリだけでなく、専門的な開発コンテキストも提供',
        'description' => '5つの再利用可能な Skills により、コーディング支援は実装前に各技術スタックのルール、境界、検証方法を理解できます。',
        'path' => '.agents/skills/',
        'path_description' => 'skills-lock.json で取得元とバージョンを固定',
        'items' => [
            [
                'name' => 'laravel-specialist',
                'scope' => 'Laravel バックエンド',
                'description' => 'モデル関連、API、認証、キュー、自動テストを一貫したバックエンド規約に沿ってガイドします。',
                'capabilities' => ['Eloquent', 'Sanctum', 'Testing'],
            ],
            [
                'name' => 'shadcn',
                'scope' => 'PC / モバイルWeb',
                'description' => 'コンポーネント構成、セマンティックトークン、アクセシビリティをガイドし、保守しやすい React UI を実現します。',
                'capabilities' => ['Components', 'Tokens', 'A11y'],
            ],
            [
                'name' => 'filament-pro',
                'scope' => '管理画面',
                'description' => 'Resource、Form、Table、Action、Widget を網羅し、信頼できる管理画面の実装を効率化します。',
                'capabilities' => ['Resources', 'Tables', 'Widgets'],
            ],
            [
                'name' => 'uni-app',
                'scope' => 'ミニプログラム',
                'description' => 'クロスプラットフォームのコンポーネント、API、条件付きコンパイル、互換性情報を提供します。',
                'capabilities' => ['Cross-platform', 'APIs', 'Config'],
            ],
            [
                'name' => 'ui-ux-pro-max',
                'scope' => 'UI / UX デザイン',
                'description' => 'UI実装前に配色、レスポンシブ、インタラクション、アクセシビリティの指針を追加します。',
                'capabilities' => ['Responsive', 'Color', 'UX'],
            ],
        ],
    ],
    'engineering' => [
        'badge' => '開発上の価値',
        'title' => 'UIではなく、ビジネス基盤を統合する',
        'description' => 'すべてのプラットフォームに同じUI技術を強制せず、重要な境界を統一しながら各クライアントの強みを保ちます。',
        'items' => [
            [
                'title' => '1つのビジネスコア',
                'description' => 'モデル、権限、バリデーション、ビジネスルールを Laravel に集約し、各端末での重複実装を避けます。',
            ],
            [
                'title' => '端末ごとに最適な技術',
                'description' => 'Web、ミニプログラム、アプリ、管理画面ごとに、目的に合った成熟したエコシステムを採用します。',
            ],
            [
                'title' => '一貫した開発境界',
                'description' => '共通の API、認証、データ契約により、各クライアントは独立して進化しながら安定して連携できます。',
            ],
        ],
        'metrics_title' => '構成範囲をひと目で把握',
        'metrics_description' => 'Scaffold が接続するビジネスコア、クライアント、言語、専門的な開発支援を明確な数値で示します。',
        'metrics' => [
            [
                'value' => '1',
                'label' => 'ビジネスコア',
                'description' => 'Laravel がモデル、権限、ルールを一元管理します。',
            ],
            [
                'value' => '4',
                'label' => 'UIレイヤー',
                'description' => 'Web、ミニプログラム、ネイティブアプリ、管理画面。',
            ],
            [
                'value' => '3',
                'label' => '表示言語',
                'description' => '中国語、英語、日本語を Laravel Lang で管理します。',
            ],
            [
                'value' => '5',
                'label' => '専門 Skills',
                'description' => 'バックエンド、UI、管理画面、ミニプログラムを支援します。',
            ],
        ],
        'process' => [
            'title' => '契約からリリースまでの明確な流れ',
            'description' => '各クライアントは独立して進みながら、同じビジネス契約に基づいて実装と検証を行います。',
            'items' => [
                [
                    'title' => '共通契約を定義',
                    'description' => 'データ、認証、権限、API の境界を先に決めます。',
                ],
                [
                    'title' => 'Laravel コアを実装',
                    'description' => 'モデル、検証、ルール、非同期処理を集約します。',
                ],
                [
                    'title' => '各クライアントを並行開発',
                    'description' => 'Web、ミニプログラム、アプリ、管理画面を個別に実装します。',
                ],
                [
                    'title' => '品質ゲートを統一',
                    'description' => 'ビルド、静的解析、自動テストで品質を確認します。',
                ],
            ],
        ],
    ],
    'delivery' => [
        'badge' => '継続的デリバリー',
        'title' => '1回の Git コミットから、2つのアプリストアへ',
        'description' => 'コードをプッシュすると GitLab CI がビルドを準備・起動し、Expo EAS がクラウドで署名とパッケージ化を行い、各成果物を Apple App Store と Google Play へ届けます。',
        'flow_label' => 'Git コミットから GitLab CI と Expo EAS を経由し、Apple App Store と Google Play へ公開するフロー',
        'stages' => [
            [
                'eyebrow' => 'ソース管理',
                'title' => 'Git でコミット・プッシュ',
                'description' => 'バージョン管理されたコードを GitLab リポジトリへプッシュし、追跡可能なリリースの起点を作ります。',
                'meta' => 'Commit / Push',
            ],
            [
                'eyebrow' => '自動化',
                'title' => 'GitLab CI',
                'description' => '.gitlab-ci.yml が固定済み依存関係と本番設定を準備し、iOS と Android の独立したビルドジョブを起動します。',
                'meta' => 'Pipeline Jobs',
            ],
            [
                'eyebrow' => 'クラウドビルド',
                'title' => 'Expo EAS',
                'description' => 'EAS がリモート認証情報、バージョン更新、署名、クラウドビルドを管理し、両ストア向け成果物を生成します。',
                'meta' => 'Signed Builds',
            ],
        ],
        'distribution_title' => '1つのパイプライン、独立した2つの公開先',
        'distribution_description' => 'プラットフォームごとに証明書、バージョン、成果物形式、ストア公開経路を分け、審査とリリースを独立して進めます。',
        'stores' => [
            [
                'platform' => 'iOS',
                'title' => 'Apple App Store',
                'description' => '署名済み IPA を App Store Connect へ提出し、TestFlight、アプリ審査、本番公開へ進めます。',
                'artifact' => 'IPA · App Store Connect',
            ],
            [
                'platform' => 'Android',
                'title' => 'Google Play',
                'description' => '生成した AAB を Google Play Console へアップロードし、テストまたは本番トラックで段階的に公開します。',
                'artifact' => 'AAB · Play Console',
            ],
        ],
    ],
    'cta' => [
        'badge' => '業務開発の準備完了',
        'title' => '安定した構成から始め、プロダクト開発に集中',
        'description' => 'バックエンド、Web、ミニプログラム、アプリ、管理画面、専門 Skills が連携できる開発基盤として整い、価値ある業務機能に集中できます。',
        'button' => '専門 Skills を見る',
        'note' => 'Scaffold は安定した技術境界を提供し、プロダクトの形を制限しません。どのクライアントからでも始め、事業のペースに合わせて拡張できます。',
        'modules_title' => '準備済みの4つの基盤',
        'modules_description' => '統合バックエンドからマルチプラットフォーム配信まで、各モジュールは明確な責任と独立した拡張性を持ちます。',
        'modules' => [
            [
                'title' => 'Laravel ビジネスコア',
                'description' => '認証、モデル、API、キュー、統一された例外レスポンス。',
                'technologies' => ['Laravel', 'Sanctum', 'Eloquent'],
            ],
            [
                'title' => 'レスポンシブ Web',
                'description' => '1つのコンポーネントシステムで PC とモバイルWebをカバーします。',
                'technologies' => ['Inertia', 'React', 'shadcn/ui'],
            ],
            [
                'title' => 'モバイルワークスペース',
                'description' => 'ミニプログラムと iOS / Android 専用の基盤です。',
                'technologies' => ['uni-app', 'React Native', 'NativeWind'],
            ],
            [
                'title' => '管理と品質',
                'description' => '管理リソース、専門 Skills、自動品質チェックを提供します。',
                'technologies' => ['Filament', 'Skills', 'Testing'],
            ],
        ],
    ],
    'footer' => [
        'copyright' => 'Laravel Scaffold',
        'summary' => 'Laravel 駆動 · Skills 支援 · マルチプラットフォーム',
    ],
];
