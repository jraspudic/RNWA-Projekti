package com.juricaraspudic.soapservice.hospital.repositories;

import com.juricaraspudic.soapservice.hospital.models.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface NurseRepository extends JpaRepository<Nurse, Long>, JpaSpecificationExecutor<Nurse> {

}