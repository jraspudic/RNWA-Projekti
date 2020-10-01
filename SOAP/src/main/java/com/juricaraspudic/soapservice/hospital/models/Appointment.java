package com.juricaraspudic.soapservice.hospital.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "appointment")
@Data
public class Appointment extends com.juricaraspudic.soapservice.hospital.Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "appointmentid", nullable = false)
    private int appointmentid;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "patient", referencedColumnName = "ssn")
    private Patient patient;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "prepnurse", referencedColumnName = "employeeid")
    private Nurse prepnurse;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "physician", referencedColumnName = "employeeid")
    private Physician physician;

    @Column(name = "startdatetime", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startdatetimeDate;

    @Column(name = "enddatetime", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date enddatetimeDate;

    @Column(name = "examinationroom", nullable = false)
    private String examinationroom;
    
    public com.juricaraspudic.soapservice.hospital.Appointment getSoapAppointment(){
        com.juricaraspudic.soapservice.hospital.Appointment soapAppointment = new com.juricaraspudic.soapservice.hospital.Appointment();

        soapAppointment.setAppointmentid(this.appointmentid);
        soapAppointment.setExaminationroom(this.examinationroom);

        com.juricaraspudic.soapservice.hospital.Patient patient = new com.juricaraspudic.soapservice.hospital.Patient();

        patient.setAddress(this.patient.getAddress());
        patient.setInsuranceid(this.patient.getInsuranceid());
        patient.setName(this.patient.getName());
        patient.setPcp(this.patient.getPcp());
        patient.setPhone(this.patient.getPhone());
        patient.setSsn(this.patient.getSsn());

        soapAppointment.setPatient(patient);

        com.juricaraspudic.soapservice.hospital.Physician physician = new com.juricaraspudic.soapservice.hospital.Physician();

        physician.setEmployeeid(this.physician.getEmployeeid());
        physician.setName(this.physician.getName());
        physician.setPosition(this.physician.getPosition());
        physician.setSsn(this.physician.getSsn());

        soapAppointment.setPhysician(physician);

        if (this.prepnurse != null) {
            com.juricaraspudic.soapservice.hospital.Nurse prepnurse = new com.juricaraspudic.soapservice.hospital.Nurse();

            prepnurse.setEmployeeid(this.prepnurse.getEmployeeid());
            prepnurse.setName(this.prepnurse.getName());
            prepnurse.setPosition(this.prepnurse.getPosition());
            prepnurse.setSsn(this.prepnurse.getSsn());
            prepnurse.setRegistered(this.prepnurse.isRegistered());

            soapAppointment.setPrepnurse(prepnurse);
        }
        
        return soapAppointment;
    }
}
