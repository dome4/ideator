<?php

namespace App\Http\Controllers;

use App\Idea;
use Illuminate\Http\Request;

class IdeaController extends Controller
{

    public function showAllIdeas()
    {
        return response()->json(Idea::all());
    }

    public function showOneIdea($id)
    {
        return response()->json(Idea::find($id));
    }

    public function create(Request $request)
    {

        // ToDo validation
        // $this->validate($request, [
        //     'name' => 'required',
        //     'email' => 'required|email|unique:users',
        //     'location' => 'required|alpha'
        // ]);

        $idea = Idea::create($request->all());

        return response()->json($idea, 201);
    }

    public function update($id, Request $request)
    {
        $idea = Idea::findOrFail($id);
        $idea->update($request->all());

        return response()->json($idea, 200);
    }

    public function delete($id)
    {
        Idea::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}