<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'businessIdea', 'usp', 'customers', 'businessModel', 'competitors', 'team', 'marketBarriers'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}