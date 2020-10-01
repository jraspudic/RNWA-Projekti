package com.juricaraspudic.soapservice.hospital.repositories;

import com.juricaraspudic.soapservice.hospital.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PatientRepository extends JpaRepository<Patient, Long>, JpaSpecificationExecutor<Patient> {
    @Query(value = "SELECT p FROM Patient p WHERE CAST(p.ssn as string) LIKE '%' || :ssn || '%'")
    List<Patient> findBySsnCustom(@Param("ssn") Long ssn);
}