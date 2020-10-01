@extends('layouts.app')

@section('content')
    <div class="container">
        <div>
            <h1>Roles</h1>
            <h4 class="text-center">{{ session('mssg') }}</h4>
        </div>
        <hr>

        <div>
            <form method="POST" action="/roles">
                @csrf
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" name="name">
                </div>
                <div class="text-right mb-2">
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
            </form>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($roles as $role)
                    <tr>
                        <th scope="row">{{ $role->id }}</th>
                        <td>{{ $role->name }}</td>
                        <td>
                            <form action="/roles/{{ $role->id }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
