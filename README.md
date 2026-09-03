<p align="center">
  <strong>English</strong>
  ·
  <a href="./README.zh-CN.md">简体中文</a>
</p>

<p align="center">
  <img src="./Console/public/logo-mark.svg" width="72" height="72" alt="Laravel Scaffold logo">
</p>

<h1 align="center">Laravel Scaffold</h1>

<p align="center">
  A full-stack application scaffold built around one Laravel backend for web, mini programs, native apps, and administration.
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a>
  ·
  <a href="#project-structure">Project Structure</a>
  ·
  <a href="#quality-checks">Quality Checks</a>
</p>

## Overview

Laravel Scaffold connects multiple clients to a shared Laravel business core. The backend owns data models, authentication, authorization, APIs, and business rules, while every client uses a platform-appropriate UI stack and can evolve independently.

- PC / H5: Inertia.js + React + shadcn/ui
- Mini programs: uni-app + Vue + Weapp TailwindCSS
- Native apps: React Native + Expo + NativeWind
- Administration: FilamentPHP + Livewire
- Localization: Laravel Lang with Simplified Chinese, English, and Japanese
- Development guidance: dedicated Agent Skills for each technology stack

> Laravel Scaffold is an application foundation rather than a finished product. Replace the included demo authentication flow and review every production-readiness item before deploying a real application.

## Architecture

~~~mermaid
flowchart TB
    Laravel[Shared Laravel business core]
    Web[PC / H5<br/>Inertia.js + React + shadcn/ui]
    Mini[Mini programs<br/>uni-app + Weapp TailwindCSS]
    Native[Native apps<br/>React Native + NativeWind]
    Admin[Administration<br/>FilamentPHP + Livewire]
    Skills[Agent Skills<br/>Implementation and verification guidance]

    Laravel --> Web
    Laravel --> Mini
    Laravel --> Native
    Laravel --> Admin
    Skills -.Backend guidance.-> Laravel
    Skills -.UI guidance.-> Web
    Skills -.Client guidance.-> Mini
    Skills -.Client guidance.-> Native
    Skills -.Admin guidance.-> Admin
~~~

## Technology Stack

| Layer | Main technologies | Responsibilities |
| --- | --- | --- |
| Business backend | Laravel 13, PHP 8.4, Sanctum | Models, authentication, APIs, business rules, queues, and data access |
| PC / H5 | Inertia.js 3, React 19, shadcn/ui, Tailwind CSS 4 | Responsive web interfaces and component system |
| Administration | Filament 5, Livewire 4 | Data management, operational configuration, forms, tables, and dashboards |
| Mini programs | uni-app, Vue 3, Weapp TailwindCSS 5 | Cross-platform mini-program pages and styling |
| Native apps | Expo 56, React Native 0.85, NativeWind | Native iOS and Android experiences |
| Localization | Laravel Lang | Server-managed Simplified Chinese, English, and Japanese copy |
| Engineering quality | PHPUnit, Larastan, Laravel Pint, GitHub Actions | Tests, static analysis, formatting, and continuous integration |

## Included Capabilities

- A shared Laravel backend with standardized JSON API responses.
- Sanctum authentication with example sign-in and protected user endpoints.
- An Inertia.js + React landing page and responsive component system.
- Light, dark, and system-following appearance modes.
- Simplified Chinese, English, and Japanese language switching persisted in the session.
- A Filament administration panel with an example user resource.
- A uni-app foundation for mini-program development.
- An Expo / React Native foundation for native app development.
- Version-locked metadata for five specialized Agent Skills.

## Project Structure

~~~text
Scaffold/
├── composer.json             # Root installation, development, and check commands
├── scaffold.json             # Installation manifest for all applications
├── scripts/install.php       # Configuration-driven installer
├── Console/                  # Laravel backend, PC / H5, and Filament administration
│   ├── app/                  # Models, controllers, services, middleware, and Filament resources
│   ├── lang/                 # Laravel Lang: zh_CN, en, and ja
│   ├── resources/js/         # Inertia.js + React pages and components
│   ├── resources/css/        # Web and Filament styles
│   ├── routes/               # Web, API, and console routes
│   └── tests/                # Laravel automated tests
├── Applet/                   # uni-app + Vue + Weapp TailwindCSS
│   └── src/                  # Mini-program pages, entry points, and platform configuration
├── App/                      # Expo + React Native + NativeWind
│   ├── components/           # Native app components
│   └── assets/               # Icons, splash screens, and native assets
├── Docs/                     # Product and project documentation
├── skills-lock.json          # Agent Skill sources and version locks
├── README.md                 # English documentation
└── README.zh-CN.md           # Simplified Chinese documentation
~~~

## Requirements

- PHP 8.4+
- Composer 2
- Node.js 24.19.0 LTS (supported range: <code>&gt;=24.11.0 &lt;25</code>) and npm 12
- SQLite by default, or another database supported by Laravel
- The relevant platform developer tools for mini-program development
- Xcode or Android Studio for local iOS or Android builds

The repository includes a root <code>.nvmrc</code>. When using nvm, run the following before installing dependencies in any application:

~~~bash
nvm install
nvm use
node --version
npm --version
~~~

All three frontend applications enable npm <code>engine-strict</code>. Dependency installation stops when the active runtime does not satisfy the declared version, so switch to the version in <code>.nvmrc</code> first.

## Quick Start

### 1. Create and initialize the complete project

After the package is published to Packagist, create a complete multi-client application with:

~~~bash
composer create-project hnher/scaffold MyProject
cd MyProject
~~~

The installer reads the root <code>scaffold.json</code> manifest and then:

- Creates local environment files for <code>Console</code>, <code>App</code>, and <code>Applet</code> without replacing existing configuration.
- Installs Laravel Composer dependencies, creates the SQLite database, generates the application key, and runs migrations.
- Installs Node.js dependencies from each lockfile and builds the Laravel web assets.

When cloning the repository directly, run the same initialization flow from the root:

~~~bash
composer setup
~~~

Use <code>composer setup:no-node</code> to install only PHP dependencies. The installer also supports <code>--no-migrate</code> and <code>--dry-run</code>:

~~~bash
php scripts/install.php --no-migrate
php scripts/install.php --dry-run
~~~

### 2. Start Laravel, PC / H5, and the administration panel

~~~bash
composer dev
~~~

The root command delegates to <code>Console</code> and starts the Laravel and web development services.

Default URLs:

- Web: <code>http://localhost:8000</code>
- Filament administration: <code>http://localhost:8000/console</code>
- Health check: <code>http://localhost:8000/up</code>

### 3. Start the mini-program application

~~~bash
cd Applet
npm run dev:mp-weixin
~~~

Other common commands:

~~~bash
npm run dev:h5
npm run build:mp-weixin
npm run build:h5
~~~

Before the first run, add the target platform application details to <code>Applet/src/manifest.json</code>.

### 4. Start the native application

~~~bash
cd App
npm start
~~~

You can also start a specific platform directly:

~~~bash
npm run ios
npm run android
npm run web
~~~

Before release, update the application name, identifiers, icons, and native platform settings in <code>App/app.json</code>.

## Localization and Appearance

The Laravel Lang files provide the web landing-page copy instead of maintaining a separate language package inside the React components:

~~~text
Console/lang/zh_CN/home.php
Console/lang/en/home.php
Console/lang/ja/home.php
~~~

Configure supported languages through <code>supported_locales</code> in <code>Console/config/app.php</code>. The language selector sends <code>POST /locale</code> to persist the choice in the session, and the <code>SetLocale</code> middleware applies the active Laravel locale.

The UI supports light, dark, and system-following modes. The browser stores the user's appearance preference locally.

## API Foundation

The scaffold currently includes these authentication and user endpoints:

~~~text
POST /api/auth/login
POST /api/auth/logout     # auth:sanctum
GET  /api/user/profile    # auth:sanctum
GET  /api/user/getList    # auth:sanctum
~~~

The current sign-in endpoint is intentionally a demo: it issues a token for the first user in the database without validating an email address or password. The native and mini-program home screens provide one-tap demo sign-in, then automatically load the current user's profile and support refresh, session restoration, and sign-out.

API exceptions are normalized into JSON responses containing <code>code</code>, <code>message</code>, <code>datetime</code>, <code>data</code>, and optional <code>errors</code>. New endpoints should follow the existing authentication, validation, and response conventions.

### Client HTTP Layers

All three clients support GET, POST, Bearer tokens, locale headers, a 15-second timeout, normalized response unwrapping, and automatic error toasts:

~~~javascript
// Web / H5
import { userApi } from '@/services/api'

const profile = await userApi.profile()
~~~

~~~typescript
// React Native
import { userApi } from './services/api'

const profile = await userApi.profile()
~~~

~~~javascript
// uni-app / mini program
import { userApi } from '@/services/api'

const profile = await userApi.profile()
~~~

Each client displays server errors through its own toast implementation by default. For forms that display field-level errors, pass <code>{ showErrorToast: false }</code> and read validation details from the thrown <code>ApiError.errors</code>.

- Web / H5 uses the same-origin <code>/api</code> endpoint by default. Override it with <code>VITE_API_BASE_URL</code> in <code>Console/.env</code>.
- The native app uses <code>EXPO_PUBLIC_API_BASE_URL</code> and persists tokens in the operating system's secure storage.
- Mini programs use <code>VITE_API_BASE_URL</code> and require an allowed request domain in the platform console.
- A physical device cannot reach the Laravel service through <code>127.0.0.1</code>. Use a LAN address or an HTTPS development domain.

## Production Readiness and Security

- Replace the demo sign-in endpoint with real credential validation, rate limiting, token lifecycle rules, and account-state checks.
- Define explicit authorization for the Filament panel, API operations, models, and business data.
- Keep application keys, signing credentials, platform secrets, and production environment files outside version control.
- Replace the example bundle IDs, package names, mini-program IDs, domains, icons, and application metadata.
- Configure HTTPS, CORS, trusted hosts, platform request domains, queues, logs, backups, and monitoring for the target environment.

## Agent Skills

<code>skills-lock.json</code> records the sources and locked versions of the specialized Skills used by this project:

| Skill | Scope |
| --- | --- |
| <code>laravel-specialist</code> | Laravel models, APIs, authentication, queues, and tests |
| <code>shadcn</code> | React components, design tokens, and accessibility |
| <code>filament-pro</code> | Filament resources, forms, tables, and widgets |
| <code>uni-app</code> | Cross-platform mini-program development and compatibility |
| <code>ui-ux-pro-max</code> | Color, responsive layout, interaction, and UX review |

## Quality Checks

### Laravel / Web

~~~bash
cd Console
composer lint:check
composer types:check
php artisan test
npm run build
~~~

Run the complete backend check suite with:

~~~bash
composer test
~~~

### React Native

~~~bash
cd App
npm run lint
~~~

Continuous integration should also read the root <code>.nvmrc</code> so local and CI environments use the same Node.js version.

## Development Principles

- Keep business rules, authorization, and data consistency in the Laravel backend.
- Share authentication, API, and data contracts across clients, but keep platform-specific UI implementations independent.
- Manage user-facing copy through Laravel Lang whenever practical.
- Validate responsive layout, dark mode, and reduced-motion preferences for every new interface.
- Before committing, run the relevant build, formatting, static analysis, and automated tests.
