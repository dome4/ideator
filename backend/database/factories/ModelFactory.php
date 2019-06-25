<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

use Illuminate\Hashing\BcryptHasher;
use App\User;

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => (new BcryptHasher)->make('12345'),

    ];
});

$factory->define(App\Idea::class, function (Faker\Generator $faker) {

    // get all users for foreign key
    $users = User::all()->pluck('id')->toArray();

    return [
        'title' => $faker->text($maxNbChars = 200),
        'businessIdea' => $faker->text($maxNbChars = 200),
        'usp' => $faker->text($maxNbChars = 200),
        'customers' => $faker->text($maxNbChars = 200),
        'businessModel' => $faker->text($maxNbChars = 200),
        'competitors' => $faker->text($maxNbChars = 200),
        'team' => $faker->text($maxNbChars = 200),
        'marketBarriers' => $faker->text($maxNbChars = 200),
        'userId' => $faker->randomElement($users),

    ];
});
