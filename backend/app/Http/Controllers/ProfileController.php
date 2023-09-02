<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function is_admin(){
        if(auth()->check() && auth()->user()->is_admin == 1){
            return true;
        }
        return false;
    }


    public function index()
    {
        $profiles = Profile::all();
        return ProfileResource::collection($profiles);

    }

    public function store(StoreUpdateProfileRequest $request)
    {
        if($this->is_admin()){
            $data = $request->validated();
            $profile = Profile::create($data);

            return new ProfileResource($profile);
        }
        abort(401, 'Unauthorized');

    }


    public function show($id)
    {
        $profile = Profile::findOrFail($id);
        return new ProfileResource($profile);
    }

    public function update(StoreUpdateProfileRequest $request, $id)
    {
        if($this->is_admin()){
            $profile = Profile::findOrFail($id);
            $data = $request->validated();
            $profile->update($data);

            return new ProfileResource(($profile));
        }
        abort(401, 'Unauthorized');
    }

    public function destroy($id)
    {
        if($this->is_admin()){
            $profile = Profile::findOrFail($id)->delete();

            return response()->json([], 204);
        }
        abort(401, 'Unauthorized');
    }
}
