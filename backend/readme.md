# Ideator Backend API

## Installation

- rename `.env.example` to `.env`
- fill out `.env`
- get the `APP_KEY` and the `JWT_SECRET` from the `/key` route

## Initialization

- run `php artisan migrate` to execute the database migrations and create the database schema
- run `php artisan db:seed` to seed some dummy data

## Development

- Run dev server with `php -S localhost:8000 -t public`
- If something does not work run `composer dump-autoload`

## Routes

### Open Endpoints

Open endpoints require no authentication.

* `POST /auth/login/` -> authenticate user
* `POST /key` -> get random string for .env-file

### Endpoints that require Authentication

Closed endpoints require a valid JWT-token to be included in the header of the
request with `Authorization: Bearer <token>`. A token can be acquired from the login route above.

#### Idea related

Endpoints for viewing and manipulating the ideas that the authenticated User
has permissions to access.

* `GET /api/ideas/` -> show accessible ideas
* `GET /api/ideas/:id/` -> show an idea
* `POST /api/ideas/` -> create idea
* `DELETE /api/ideas/:id/` -> delete an idea
* `PUT /api/ideas/:id/` -> update an idea

## Based on the following Tutorials

- [Developing RESTful APIs with Lumen](https://auth0.com/blog/developing-restful-apis-with-lumen/)
- [JWT authentication for Lumen 5.6](https://medium.com/tech-tajawal/jwt-authentication-for-lumen-5-6-2376fd38d454)

## Lumen Official Documentation

Documentation for the framework can be found on the [Lumen website](http://lumen.laravel.com/docs).
