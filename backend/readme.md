# Ideator Backend API

## Installation

- rename `.env.example` to `.env`
- fill out `.env`
- get an `APP_KEY` and the `JWT_SECRET` from the `/key` route

## Run

- run `php artisan migrate` to execute the database migrations
- run `php artisan db:seed` to seed some dummy data

## Development

- Run dev server with `php -S localhost:8000 -t public`
- If something does not work run `composer dump-autoload`

## Based on the following Tutorials

- [Developing RESTful APIs with Lumen](https://auth0.com/blog/developing-restful-apis-with-lumen/)
- [JWT authentication for Lumen 5.6](https://medium.com/tech-tajawal/jwt-authentication-for-lumen-5-6-2376fd38d454)

## Lumen Official Documentation

Documentation for the framework can be found on the [Lumen website](http://lumen.laravel.com/docs).
