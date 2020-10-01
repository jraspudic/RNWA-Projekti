package com.juricaraspudic.soapservice.hospital.repositories;

import com.juricaraspudic.soapservice.hospital.models.Appointment;
import com.juricaraspudic.soapservice.hospital.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {
    List<Appointment> findAllByPatientIn(List<Patient> patients);
}