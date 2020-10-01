package com.juricaraspudic.soapservice.hospital.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;


@Entity
@Table(name = "patient")
@Data
public class Patient extends com.juricaraspudic.soapservice.hospital.Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ssn", nullable = false)
    private int ssn;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "insuranceid", nullable = false)
    private int insuranceid;

    @Column(name = "pcp", nullable = false)
    private int pcp;
}
