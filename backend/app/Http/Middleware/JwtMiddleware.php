<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use App\User;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;

class JwtMiddleware
{
    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if(!$request->hasHeader('Authorization')) {
            return response()->json([
                'error' => 'Authorization Header not found'
            ], 401);
        }

        // use bearer token for authentication
        $token = $request->bearerToken();

        // Unauthorized response if token not there
        if($request->header('Authorization') == null || $token == null) {
            return response()->json([
                'error' => 'No token provided'
            ], 401);
          }

        try {
            $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
        } catch(ExpiredException $e) {
            return response()->json([
                'error' => 'Provided token is expired.'
            ], 400);
        } catch(Exception $e) {
            return response()->json([
                'error' => 'An error while decoding token.'
            ], 400);
        }

        return $next($request);
    }
}