<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateUserRequest;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function is_admin(){
        if(auth()->check() && auth()->user()->is_admin == 1){
            return true;
        }
        return false;
    }

    public function index()
    {
        $users = User::all();
       return UserResource::collection($users);
    }

    public function login(Request $request)
    {
        if(!$token = auth()->attempt(['email' => $request->email, 'password' => $request->password])){
            abort(401, 'Unauthorized');
        }
        return response()->json(['token'=>$token], 200);
    }


    public function store(StoreUpdateUserRequest $request)
    {
        if($this->is_admin()){
            $data = $request->validated();
            $data['password'] = bcrypt($request->password);

            $user = User::create($data);

            return new UserResource($user);
        }

        abort(401, 'Unauthorized');



    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    public function update(StoreUpdateUserRequest $request,$id)
    {
        $user = User::findOrFail($id);
        $data = $request->validated();
        if(!$request->password){
            $data['password'] = bcrypt($request->password);
        }
        $user->update($data);

        return new UserResource(($user));
    }

    public function destroy($id)
    {
        if($this->is_admin()){
            $user = User::findOrFail($id)->delete();

            return response()->json([], 204);
        }

        abort(401, 'Unauthorized');


    }
}
