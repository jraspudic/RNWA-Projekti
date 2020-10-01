package com.juricaraspudic.soapservice.hospital.repositories;

import com.juricaraspudic.soapservice.hospital.models.Physician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PhysicianRepository extends JpaRepository<Physician, Long>, JpaSpecificationExecutor<Physician> {

}