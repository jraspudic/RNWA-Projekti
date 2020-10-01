package com.juricaraspudic.soapservice;

import com.juricaraspudic.soapservice.hospital.GetAppointmentsRequest;
import com.juricaraspudic.soapservice.hospital.GetAppointmentsResponse;
import com.juricaraspudic.soapservice.hospital.GetUserAppointmentsRequest;
import com.juricaraspudic.soapservice.hospital.GetUserAppointmentsResponse;
import com.juricaraspudic.soapservice.hospital.models.*;
import com.juricaraspudic.soapservice.hospital.repositories.AppointmentRepository;
import com.juricaraspudic.soapservice.hospital.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import java.util.List;

@Endpoint
public class AppointmentEndpoints {
    private static final String NAMESPACE_URI = "http://juricaraspudic.com/soapservice/hospital";

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public AppointmentEndpoints(AppointmentRepository appointmentRepository, PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getAppointmentsRequest")
    @ResponsePayload
    public GetAppointmentsResponse getAppointments(@RequestPayload GetAppointmentsRequest request) {
        GetAppointmentsResponse response = new GetAppointmentsResponse();

        List<Appointment> appointments = appointmentRepository.findAll();

        for (Appointment appointment : appointments) {
            response.getAppointment().add(appointment.getSoapAppointment());
        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getUserAppointmentsRequest")
    @ResponsePayload
    public GetUserAppointmentsResponse getUserAppointments(@RequestPayload GetUserAppointmentsRequest request) {
        GetUserAppointmentsResponse response = new GetUserAppointmentsResponse();

        Assert.isTrue(isNumeric(request.getFilter()), "Nije valjan ssn pacijenta");

        List<Patient> patients = patientRepository.findBySsnCustom(
                Long.parseLong(request.getFilter())
        );

        List<Appointment> appointments = appointmentRepository.findAllByPatientIn(patients);

        for (Appointment appointment : appointments) {
            response.getAppointment().add(appointment.getSoapAppointment());
        }

        return response;
    }

    public static boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        try {
            double d = Double.parseDouble(strNum);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }
}
