<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIdeasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ideas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('businessIdea');
            $table->string('usp');
            $table->string('customers');
            $table->string('businessModel');
            $table->string('competitors');
            $table->string('team');
            $table->string('marketBarriers');
            $table->integer('userId')->unsigned();
            $table->foreign('userId')
                    ->references('id')->on('users')
                    ->onDelete('cascade'); // if the user is deleted, all his ideas should be deleted as well
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ideas');
    }
}
