<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $open = Status::updateOrCreate(['slug' => 'open'], [
            'name' => 'Open',
        ]);

        $pending = Status::updateOrCreate(['slug' => 'pending'], [
            'name' => 'Pending',
        ]);

        $completed = Status::updateOrCreate(['slug' => 'completed'], [
            'name' => 'Completed',
        ]);

        Task::factory(12)->create([
            'status_id' => $open->id,
            'completed' => false,
        ]);

        Task::factory(4)->create([
            'status_id' => $pending->id,
            'completed' => false,
        ]);

        Task::factory(4)->create([
            'status_id' => $completed->id,
            'completed' => true,
        ]);
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
