<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('profiles')->insert([
            'id' => 1,
            'name' => 'Administrador',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('profiles')->insert([
            'id' => 2,
            'name' => 'Usuario Comum',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
