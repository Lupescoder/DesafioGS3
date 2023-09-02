<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = [
            'name' => [
                'required',
                'max:255'
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users'
            ],
            'password' => [
                'required',
                'max:100'
            ],
            'profile_id' => [
                'required',
                'max:1'
            ]
        ];

        if($this->method() == 'PUT'){
            $rules['email'] = [
                'nullable',
                'email',
                'max:255',
                "unique:users,email, {$this->id},id"
            ];

            $rules['password'] = [
                'nullable',
                'max:100'
            ];
        }

        return $rules;
    }
}
