@extends('layouts.app')

@section('content')
    <div class="container">
        <div>
            <h1>Patients</h1>
            <h4 class="text-center">{{ session('mssg') }}</h4>
        </div>
        <hr>

        <div>
            <form method="POST" action="/patients">
                @csrf
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" name="name">
                    <input type="hidden" name="user_id" value="{{ Auth::user()->id }}">
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
                    <th scope="col">Doctor</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($patients as $patient)
                    <tr>
                        <th scope="row">{{ $patient->id }}</th>
                        <td>{{ $patient->name }}</td>
                        <td>{{ $patient->user->name }}</td>
                        <td>
                            @if (Auth::user()->id == $patient->user_id || Auth::user()->role_id == 1)
                                <form action="/patients/{{ $patient->id }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-danger">Delete</button>
                                </form>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
