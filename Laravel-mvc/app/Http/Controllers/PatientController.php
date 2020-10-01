<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $patients = Patient::orderBy('name')->get();
        $users = User::orderBy('name')->get();

        return view('patients.index', ['patients' => $patients, 'users' => $users]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'user_id' => 'required'
        ]);

        Patient::create($request->all());

        return redirect('/patients')->with('mssg', 'Patient added!');
    }

    public function destroy($id)
    {
        $patient = Patient::findOrFail($id);

        $patient->delete();

        return redirect("/patients")->with('mssg', 'Patient deleted!');
    }
}
