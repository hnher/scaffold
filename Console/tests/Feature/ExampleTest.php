<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Lang;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_uses_laravel_language_lines(): void
    {
        $response = $this->withSession(['locale' => 'zh_CN'])->get('/');

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page): Assert => $page
                ->component('Home')
                ->has('appName')
                ->where('locale', 'zh_CN')
                ->has('locales', 3)
                ->where('translations.nav.open_menu', '打开导航菜单')
                ->where('translations.nav.close_menu', '关闭导航菜单')
                ->where('translations.nav.menu_description', '选择页面栏目并快速跳转。')
                ->where('translations.hero.lead', '一套面向真实业务的全端应用脚手架')
                ->has('translations.delivery.stages', 3)
                ->has('translations.delivery.stores', 2)
                ->missing('consoleUrl'));
    }

    public function test_delivery_pipeline_is_available_in_every_supported_locale(): void
    {
        foreach (['zh_CN', 'en', 'ja'] as $locale) {
            $delivery = Lang::get('home.delivery', locale: $locale);

            $this->assertIsArray($delivery);
            $this->assertCount(3, $delivery['stages']);
            $this->assertCount(2, $delivery['stores']);
            $this->assertSame('GitLab CI', $delivery['stages'][1]['title']);
            $this->assertSame('Expo EAS', $delivery['stages'][2]['title']);
        }
    }

    public function test_locale_can_be_changed_and_is_kept_in_the_session(): void
    {
        $this
            ->from('/')
            ->post('/locale', ['locale' => 'ja'])
            ->assertRedirect('/');

        $this->assertSame('ja', session('locale'));

        $this
            ->get('/')
            ->assertInertia(fn (Assert $page): Assert => $page
                ->where('locale', 'ja')
                ->where('translations.controls.settings_title', '表示設定'));
    }

    public function test_unsupported_locale_is_rejected(): void
    {
        $this
            ->postJson('/locale', ['locale' => 'fr'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('locale');
    }
}
