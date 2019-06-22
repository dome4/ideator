<?php

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

$router->get('/', function () use ($router) {
    // ToDo repond angular app
    return $router->app->version();
});

// api routes
$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('ideas',  ['uses' => 'IdeaController@showAllIdeas']);
  
    $router->get('ideas/{id}', ['uses' => 'IdeaController@showOneIdea']);
  
    $router->post('ideas', ['uses' => 'IdeaController@create']);
  
    $router->delete('ideas/{id}', ['uses' => 'IdeaController@delete']);
  
    $router->put('ideas/{id}', ['uses' => 'IdeaController@update']);
  });

// get random app key
$router->get('/key', function() {
    return str_random(32);
});
