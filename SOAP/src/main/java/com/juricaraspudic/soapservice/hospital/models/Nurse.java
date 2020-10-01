package com.juricaraspudic.soapservice.hospital.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;


@Entity
@Table(name = "nurse")
@Data
public class Nurse extends com.juricaraspudic.soapservice.hospital.Nurse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "employeeid", nullable = false)
    private int employeeid;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "position", nullable = false)
    private String position;

    @Column(name = "registered", nullable = false)
    private String registered;

    @Column(name = "ssn", nullable = false)
    private int ssn;
}
