package com.juricaraspudic.soapservice.hospital.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;


@Table(name = "physician")
@Entity
@Data
public class Physician extends com.juricaraspudic.soapservice.hospital.Physician implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "employeeid", nullable = false)
    private int employeeid;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "position", nullable = false)
    private String position;

    @Column(name = "ssn", nullable = false)
    private int ssn;
}
