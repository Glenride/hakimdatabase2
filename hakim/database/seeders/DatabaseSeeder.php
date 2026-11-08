<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Collection;
use App\Models\ShippingProfile;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin
        User::firstOrCreate(
            ['email' => 'hakim@example.com'],
            [
                'name' => 'Hakim',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Create Staff
        User::firstOrCreate(
            ['email' => 'staff@example.com'],
            [
                'name' => 'Staff Member',
                'password' => bcrypt('password'),
                'role' => 'staff',
                'email_verified_at' => now(),
            ]
        );

        // Seed Categories
        $categories = ['Fall', 'Spring', 'Summer', 'Winter'];
        foreach ($categories as $cat) {
            Category::firstOrCreate(
                ['slug' => strtolower($cat)],
                ['name' => $cat]
            );
        }

        // Seed Collections
        $collections = [
            [
                'name' => 'Crossings',
                'slug' => 'crossings',
                'description' => 'Sculptural gowns for women who have moved through change and become more themselves.',
            ],
            [
                'name' => 'Origins',
                'slug' => 'origins',
                'description' => 'Timeless silhouettes honoring heritage, ancestry, and the roots that shape us.',
            ],
            [
                'name' => 'Heritage',
                'slug' => 'heritage',
                'description' => 'Gowns that weave cultural heritage into contemporary bridal design.',
            ],
        ];
        foreach ($collections as $col) {
            Collection::firstOrCreate(
                ['slug' => $col['slug']],
                ['name' => $col['name'], 'description' => $col['description']]
            );
        }

        // Seed Shipping Profile
        $profile = ShippingProfile::firstOrCreate(
            ['name' => 'Default Shipping'],
            []
        );

        // Seed Rates
        $countries = ['US', 'CA', 'GB', 'EU', 'AU', 'NZ']; // GB for UK
        foreach ($countries as $code) {
            $profile->rates()->firstOrCreate(
                ['country_code' => $code],
                [
                    'amount_cents' => 6500,
                    'currency' => 'USD'
                ]
            );
        }

        $this->call(ProductSeeder::class);
    }
}
