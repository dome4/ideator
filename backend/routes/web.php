<?php

use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


// api routes
$router->group(['prefix' => 'api', 'middleware' => 'jwt.auth'], function () use ($router) {
    $router->get('ideas',  ['uses' => 'IdeaController@showAllIdeas']);
  
    $router->get('ideas/{id}', ['uses' => 'IdeaController@showOneIdea']);
  
    $router->post('ideas', ['uses' => 'IdeaController@create']);
  
    $router->delete('ideas/{id}', ['uses' => 'IdeaController@delete']);
  
    $router->put('ideas/{id}', ['uses' => 'IdeaController@update']);
  });

// auth routes
$router->group(['prefix' => 'auth'], function () use ($router) {
    $router->post('login', ['uses' => 'AuthController@authenticate']);
});

// get random app key
$router->get('/key', function() {
    return str_random(32);
});

// return angular app -> catches all requests so that angular router can handle them
$router->get('{all:.*}', function() {
    return File::get(app()->basePath('public').'/index.html');  
});
