<?php

declare(strict_types=1);

namespace Tests\Feature\Filament;

use App\Filament\Resources\Users\Pages\ListUsers;
use App\Filament\Resources\Users\UserResource;
use App\Models\User;
use Filament\Facades\Filament;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Livewire\Livewire;
use Tests\TestCase;

final class UserResourceTest extends TestCase
{
    use DatabaseMigrations;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        Filament::setCurrentPanel(Filament::getPanel('console'));
    }

    public function test_guests_cannot_access_users_but_can_open_the_panel_login(): void
    {
        $this->get(UserResource::getUrl())
            ->assertUnauthorized()
            ->assertJsonPath('code', 401);

        $this->get(Filament::getLoginUrl())->assertOk();
    }

    public function test_authenticated_users_can_open_the_dashboard_and_resource_pages(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->get(Filament::getUrl())->assertOk();
        $this->get(UserResource::getUrl())->assertOk();
        $this->get(UserResource::getUrl('create'))->assertOk();
        $this->get(UserResource::getUrl('view', ['record' => $user]))
            ->assertOk()
            ->assertSee($user->email);
        $this->get(UserResource::getUrl('edit', ['record' => $user]))->assertOk();
    }

    public function test_user_table_search_updates_through_livewire(): void
    {
        $admin = User::factory()->create(['name' => 'Panel Operator']);
        $matchingUser = User::factory()->create(['name' => 'Searchable Member']);
        $this->actingAs($admin);

        Livewire::test(ListUsers::class)
            ->assertOk()
            ->assertCanSeeTableRecords([$admin, $matchingUser])
            ->searchTable('Searchable Member')
            ->assertCanSeeTableRecords([$matchingUser])
            ->assertCanNotSeeTableRecords([$admin]);
    }
}
