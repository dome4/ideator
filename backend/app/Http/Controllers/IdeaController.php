<?php

namespace App\Http\Controllers;

use App\Idea;
use Illuminate\Http\Request;

class IdeaController extends Controller
{

    /**
     * properties of the model User that should be editable via request
     * @var array
     */
    static $ideaModelProps = ['title', 'businessIdea', 'usp', 'customers', 'businessModel', 'competitors', 'team', 'marketBarriers'];
    // ToDo: possibly duplicate, because only these properties can be edited anyway -> $fillable in Idea

    public function showAllIdeas(Request $request)
    {

        $ideas = $this->getUserIdeas($request)->get();

        // check if any ideas have been found
        if($ideas->isEmpty()) {
            return response()->json([
                'error' => 'No matching ideas found.'
            ], 404);
        }

        return response()->json($ideas);
    }

    public function showOneIdea(Request $request, $id)
    {

        $ideas = $this->getUserIdeas($request)
            ->where('id', $id)
            ->firstOrFail();

        return response()->json($ideas);
    }

    public function create(Request $request)
    {

        // validation
         $this->validate($request, [
             'title' => 'required',
         ]);

        // if user id is missing in request
        if(!$request->auth->id) {
            return response()->json([
                'error' => 'An internal error occured.'
            ], 500);
        }

        // create new idea
        $idea = new Idea;

        // only set received params
        $params = $request->only(self::$ideaModelProps);
        $idea->fill($params);

        // set user id
        $idea->userId = $request->auth->id; // received from auth middleware

        // save new idea
        $idea->save();

        return response()->json($idea, 201);
    }

    public function update($id, Request $request)
    {

        // if user id is missing in request
        if(!$request->auth->id) {
            return response()->json([
                'error' => 'An internal error occured.'
            ], 500);
        }

        // find idea
        $idea = $this->getUserIdeas($request)
            ->findOrFail($id);

        // only update received params
        $params = $request->only(self::$ideaModelProps);

        // update idea
        $idea->update($params);

        return response()->json($idea, 200);
    }

    public function delete($id, Request $request)
    {
        $this->getUserIdeas($request)
            ->findOrFail($id)
            ->delete();
        return response('Deleted Successfully', 200);
    }

    /**
     * method returns all ideas the user has access to
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse | \Illuminate\Database\Eloquent\Builder
     */
    public function getUserIdeas(Request $request) {

        // if user id is missing in request
        if(!$request->auth->id) {
            return response()->json([
                'error' => 'An internal error occured.'
            ], 500);
        }

        // only get the ideas of the authenticated user
        $ideasQueryBuilder = Idea::where('userId', $request->auth->id);


        return $ideasQueryBuilder;
    }
}