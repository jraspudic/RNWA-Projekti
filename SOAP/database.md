# BAZA:

Postavke za bazu su u src/main/java/resources/application.properties

# PG_DUMP:

```
--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-09-26 16:39:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 25086)
-- Name: affiliated_with; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.affiliated_with (
    physician integer NOT NULL,
    department integer NOT NULL,
    primaryaffiliation boolean NOT NULL
);


--
-- TOC entry 210 (class 1259 OID 25145)
-- Name: appointment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointment (
    appointmentid integer NOT NULL,
    patient integer NOT NULL,
    prepnurse integer,
    physician integer NOT NULL,
    startdatetime timestamp without time zone NOT NULL,
    enddatetime timestamp without time zone NOT NULL,
    examinationroom text NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 25204)
-- Name: block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.block (
    floor integer NOT NULL,
    code integer NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 25073)
-- Name: department; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.department (
    departmentid integer NOT NULL,
    name text NOT NULL,
    head integer NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 25168)
-- Name: medication; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medication (
    code integer NOT NULL,
    name text NOT NULL,
    brand text NOT NULL,
    description text NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 25137)
-- Name: nurse; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.nurse (
    employeeid integer NOT NULL,
    name text NOT NULL,
    "position" text NOT NULL,
    registered boolean NOT NULL,
    ssn integer NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 25222)
-- Name: on_call; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.on_call (
    nurse integer NOT NULL,
    blockfloor integer NOT NULL,
    blockcode integer NOT NULL,
    startdatetime timestamp without time zone NOT NULL,
    enddatetime timestamp without time zone NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 25124)
-- Name: patient; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patient (
    ssn integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    phone text NOT NULL,
    insuranceid integer NOT NULL,
    pcp integer NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 25065)
-- Name: physician; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.physician (
    employeeid integer NOT NULL,
    name text NOT NULL,
    "position" text NOT NULL,
    ssn integer NOT NULL
);


--
-- TOC entry 212 (class 1259 OID 25176)
-- Name: prescribes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prescribes (
    physician integer NOT NULL,
    patient integer NOT NULL,
    medication integer NOT NULL,
    date timestamp without time zone NOT NULL,
    appointment integer,
    dose text NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 25101)
-- Name: procedure; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.procedure (
    code integer NOT NULL,
    name text NOT NULL,
    cost real NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 25209)
-- Name: room; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.room (
    number integer NOT NULL,
    type text NOT NULL,
    blockfloor integer NOT NULL,
    blockcode integer NOT NULL,
    unavailable boolean NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 25237)
-- Name: stay; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stay (
    stayid integer NOT NULL,
    patient integer NOT NULL,
    room integer NOT NULL,
    startdatetime timestamp without time zone NOT NULL,
    enddatetime timestamp without time zone NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 25109)
-- Name: trained_in; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.trained_in (
    physician integer NOT NULL,
    treatment integer NOT NULL,
    certificationdate timestamp without time zone NOT NULL,
    certificationexpires timestamp without time zone NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 25252)
-- Name: undergoes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.undergoes (
    patient integer NOT NULL,
    procedure integer NOT NULL,
    stay integer NOT NULL,
    date timestamp without time zone NOT NULL,
    physician integer NOT NULL,
    assistingnurse integer
);


--
-- TOC entry 2932 (class 0 OID 25086)
-- Dependencies: 205
-- Data for Name: affiliated_with; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.affiliated_with (physician, department, primaryaffiliation) FROM stdin;
1	1	t
2	1	t
3	1	f
3	2	t
4	1	t
5	1	t
6	2	t
7	1	f
7	2	t
8	1	t
9	3	t
\.


--
-- TOC entry 2937 (class 0 OID 25145)
-- Dependencies: 210
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.appointment (appointmentid, patient, prepnurse, physician, startdatetime, enddatetime, examinationroom) FROM stdin;
13216584	100000001	101	1	2008-04-24 10:00:00	2008-04-24 11:00:00	A
26548913	100000002	101	2	2008-04-24 10:00:00	2008-04-24 11:00:00	B
36549879	100000001	102	1	2008-04-25 10:00:00	2008-04-25 11:00:00	A
46846589	100000004	103	4	2008-04-25 10:00:00	2008-04-25 11:00:00	B
59871321	100000004	\N	4	2008-04-26 10:00:00	2008-04-26 11:00:00	C
69879231	100000003	103	2	2008-04-26 11:00:00	2008-04-26 12:00:00	C
76983231	100000001	\N	3	2008-04-26 12:00:00	2008-04-26 13:00:00	C
86213939	100000004	102	9	2008-04-27 10:00:00	2008-04-21 11:00:00	A
93216548	100000002	101	2	2008-04-27 10:00:00	2008-04-27 11:00:00	B
\.


--
-- TOC entry 2940 (class 0 OID 25204)
-- Dependencies: 213
-- Data for Name: block; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.block (floor, code) FROM stdin;
1	1
1	2
1	3
2	1
2	2
2	3
3	1
3	2
3	3
4	1
4	2
4	3
\.


--
-- TOC entry 2931 (class 0 OID 25073)
-- Dependencies: 204
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.department (departmentid, name, head) FROM stdin;
1	General Medicine	4
2	Surgery	7
3	Psychiatry	9
\.


--
-- TOC entry 2938 (class 0 OID 25168)
-- Dependencies: 211
-- Data for Name: medication; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.medication (code, name, brand, description) FROM stdin;
1	Procrastin-X	X	N/A
2	Thesisin	Foo Labs	N/A
3	Awakin	Bar Laboratories	N/A
4	Crescavitin	Baz Industries	N/A
5	Melioraurin	Snafu Pharmaceuticals	N/A
\.


--
-- TOC entry 2936 (class 0 OID 25137)
-- Dependencies: 209
-- Data for Name: nurse; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.nurse (employeeid, name, "position", registered, ssn) FROM stdin;
101	Carla Espinosa	Head Nurse	t	111111110
102	Laverne Roberts	Nurse	t	222222220
103	Paul Flowers	Nurse	f	333333330
\.


--
-- TOC entry 2942 (class 0 OID 25222)
-- Dependencies: 215
-- Data for Name: on_call; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.on_call (nurse, blockfloor, blockcode, startdatetime, enddatetime) FROM stdin;
101	1	1	2008-11-04 11:00:00	2008-11-04 19:00:00
101	1	2	2008-11-04 11:00:00	2008-11-04 19:00:00
102	1	3	2008-11-04 11:00:00	2008-11-04 19:00:00
103	1	1	2008-11-04 19:00:00	2008-11-05 03:00:00
103	1	2	2008-11-04 19:00:00	2008-11-05 03:00:00
103	1	3	2008-11-04 19:00:00	2008-11-05 03:00:00
\.


--
-- TOC entry 2935 (class 0 OID 25124)
-- Dependencies: 208
-- Data for Name: patient; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.patient (ssn, name, address, phone, insuranceid, pcp) FROM stdin;
100000001	John Smith	42 Foobar Lane	555-0256	68476213	1
100000002	Grace Ritchie	37 Snafu Drive	555-0512	36546321	2
100000003	Random J. Patient	101 Omgbbq Street	555-1204	65465421	2
100000004	Dennis Doe	1100 Foobaz Avenue	555-2048	68421879	3
\.


--
-- TOC entry 2930 (class 0 OID 25065)
-- Dependencies: 203
-- Data for Name: physician; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.physician (employeeid, name, "position", ssn) FROM stdin;
1	John Dorian	Staff Internist	111111111
2	Elliot Reid	Attending Physician	222222222
3	Christopher Turk	Surgical Attending Physician	333333333
4	Percival Cox	Senior Attending Physician	444444444
5	Bob Kelso	Head Chief of Medicine	555555555
6	Todd Quinlan	Surgical Attending Physician	666666666
7	John Wen	Surgical Attending Physician	777777777
8	Keith Dudemeister	MD Resident	888888888
9	Molly Clock	Attending Psychiatrist	999999999
\.


--
-- TOC entry 2939 (class 0 OID 25176)
-- Dependencies: 212
-- Data for Name: prescribes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.prescribes (physician, patient, medication, date, appointment, dose) FROM stdin;
1	100000001	1	2008-04-24 10:47:00	13216584	5
9	100000004	2	2008-04-27 10:53:00	86213939	10
9	100000004	2	2008-04-30 16:53:00	\N	5
\.


--
-- TOC entry 2933 (class 0 OID 25101)
-- Dependencies: 206
-- Data for Name: procedure; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.procedure (code, name, cost) FROM stdin;
1	Reverse Rhinopodoplasty	1500
2	Obtuse Pyloric Recombobulation	3750
3	Folded Demiophtalmectomy	4500
4	Complete Walletectomy	10000
5	Obfuscated Dermogastrotomy	4899
6	Reversible Pancreomyoplasty	5600
7	Follicular Demiectomy	25
\.


--
-- TOC entry 2941 (class 0 OID 25209)
-- Dependencies: 214
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.room (number, type, blockfloor, blockcode, unavailable) FROM stdin;
101	Single	1	1	f
102	Single	1	1	f
103	Single	1	1	f
111	Single	1	2	f
112	Single	1	2	t
113	Single	1	2	f
121	Single	1	3	f
122	Single	1	3	f
123	Single	1	3	f
201	Single	2	1	t
202	Single	2	1	f
203	Single	2	1	f
211	Single	2	2	f
212	Single	2	2	f
213	Single	2	2	t
221	Single	2	3	f
222	Single	2	3	f
223	Single	2	3	f
301	Single	3	1	f
302	Single	3	1	t
303	Single	3	1	f
311	Single	3	2	f
312	Single	3	2	f
313	Single	3	2	f
321	Single	3	3	t
322	Single	3	3	f
323	Single	3	3	f
401	Single	4	1	f
402	Single	4	1	t
403	Single	4	1	f
411	Single	4	2	f
412	Single	4	2	f
413	Single	4	2	f
421	Single	4	3	t
422	Single	4	3	f
423	Single	4	3	f
\.


--
-- TOC entry 2943 (class 0 OID 25237)
-- Dependencies: 216
-- Data for Name: stay; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stay (stayid, patient, room, startdatetime, enddatetime) FROM stdin;
3215	100000001	111	2008-05-01 00:00:00	2008-05-04 00:00:00
3216	100000003	123	2008-05-03 00:00:00	2008-05-14 00:00:00
3217	100000004	112	2008-05-02 00:00:00	2008-05-03 00:00:00
\.


--
-- TOC entry 2934 (class 0 OID 25109)
-- Dependencies: 207
-- Data for Name: trained_in; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.trained_in (physician, treatment, certificationdate, certificationexpires) FROM stdin;
3	1	2008-01-01 00:00:00	2008-12-31 00:00:00
3	2	2008-01-01 00:00:00	2008-12-31 00:00:00
3	5	2008-01-01 00:00:00	2008-12-31 00:00:00
3	6	2008-01-01 00:00:00	2008-12-31 00:00:00
3	7	2008-01-01 00:00:00	2008-12-31 00:00:00
6	2	2008-01-01 00:00:00	2008-12-31 00:00:00
6	5	2007-01-01 00:00:00	2007-12-31 00:00:00
6	6	2008-01-01 00:00:00	2008-12-31 00:00:00
7	1	2008-01-01 00:00:00	2008-12-31 00:00:00
7	2	2008-01-01 00:00:00	2008-12-31 00:00:00
7	3	2008-01-01 00:00:00	2008-12-31 00:00:00
7	4	2008-01-01 00:00:00	2008-12-31 00:00:00
7	5	2008-01-01 00:00:00	2008-12-31 00:00:00
7	6	2008-01-01 00:00:00	2008-12-31 00:00:00
7	7	2008-01-01 00:00:00	2008-12-31 00:00:00
\.


--
-- TOC entry 2944 (class 0 OID 25252)
-- Dependencies: 217
-- Data for Name: undergoes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.undergoes (patient, procedure, stay, date, physician, assistingnurse) FROM stdin;
100000001	6	3215	2008-05-02 00:00:00	3	101
100000001	2	3215	2008-05-03 00:00:00	7	101
100000004	1	3217	2008-05-07 00:00:00	3	102
100000004	5	3217	2008-05-09 00:00:00	6	\N
100000001	7	3217	2008-05-10 00:00:00	7	101
100000004	4	3217	2008-05-13 00:00:00	3	103
\.


--
-- TOC entry 2756 (class 2606 OID 25090)
-- Name: affiliated_with affiliated_with_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.affiliated_with
    ADD CONSTRAINT affiliated_with_pkey PRIMARY KEY (physician, department);


--
-- TOC entry 2766 (class 2606 OID 25152)
-- Name: appointment appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (appointmentid);


--
-- TOC entry 2772 (class 2606 OID 25208)
-- Name: block block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.block
    ADD CONSTRAINT block_pkey PRIMARY KEY (floor, code);


--
-- TOC entry 2754 (class 2606 OID 25080)
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (departmentid);


--
-- TOC entry 2768 (class 2606 OID 25175)
-- Name: medication medication_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medication
    ADD CONSTRAINT medication_pkey PRIMARY KEY (code);


--
-- TOC entry 2764 (class 2606 OID 25144)
-- Name: nurse nurse_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nurse
    ADD CONSTRAINT nurse_pkey PRIMARY KEY (employeeid);


--
-- TOC entry 2776 (class 2606 OID 25226)
-- Name: on_call on_call_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.on_call
    ADD CONSTRAINT on_call_pkey PRIMARY KEY (nurse, blockfloor, blockcode, startdatetime, enddatetime);


--
-- TOC entry 2762 (class 2606 OID 25131)
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (ssn);


--
-- TOC entry 2752 (class 2606 OID 25072)
-- Name: physician physician_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.physician
    ADD CONSTRAINT physician_pkey PRIMARY KEY (employeeid);


--
-- TOC entry 2770 (class 2606 OID 25183)
-- Name: prescribes prescribes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prescribes
    ADD CONSTRAINT prescribes_pkey PRIMARY KEY (physician, patient, medication, date);


--
-- TOC entry 2758 (class 2606 OID 25108)
-- Name: procedure procedure_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procedure
    ADD CONSTRAINT procedure_pkey PRIMARY KEY (code);


--
-- TOC entry 2774 (class 2606 OID 25216)
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (number);


--
-- TOC entry 2778 (class 2606 OID 25241)
-- Name: stay stay_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stay
    ADD CONSTRAINT stay_pkey PRIMARY KEY (stayid);


--
-- TOC entry 2760 (class 2606 OID 25113)
-- Name: trained_in trained_in_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trained_in
    ADD CONSTRAINT trained_in_pkey PRIMARY KEY (physician, treatment);


--
-- TOC entry 2780 (class 2606 OID 25256)
-- Name: undergoes undergoes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.undergoes
    ADD CONSTRAINT undergoes_pkey PRIMARY KEY (patient, procedure, stay, date);


--
-- TOC entry 2793 (class 2606 OID 25199)
-- Name: prescribes fk_appointment_appointmentid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prescribes
    ADD CONSTRAINT fk_appointment_appointmentid FOREIGN KEY (appointment) REFERENCES public.appointment(appointmentid);


--
-- TOC entry 2783 (class 2606 OID 25096)
-- Name: affiliated_with fk_department_departmentid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.affiliated_with
    ADD CONSTRAINT fk_department_departmentid FOREIGN KEY (department) REFERENCES public.department(departmentid);


--
-- TOC entry 2792 (class 2606 OID 25194)
-- Name: prescribes fk_medication_code; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prescribes
    ADD CONSTRAINT fk_medication_code FOREIGN KEY (medication) REFERENCES public.medication(code);


--
-- TOC entry 2788 (class 2606 OID 25158)
-- Name: appointment fk_nurse_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT fk_nurse_employeeid FOREIGN KEY (prepnurse) REFERENCES public.nurse(employeeid);


--
-- TOC entry 2795 (class 2606 OID 25227)
-- Name: on_call fk_nurse_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.on_call
    ADD CONSTRAINT fk_nurse_employeeid FOREIGN KEY (nurse) REFERENCES public.nurse(employeeid);


--
-- TOC entry 2803 (class 2606 OID 25277)
-- Name: undergoes fk_nurse_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.undergoes
    ADD CONSTRAINT fk_nurse_employeeid FOREIGN KEY (assistingnurse) REFERENCES public.nurse(employeeid);


--
-- TOC entry 2787 (class 2606 OID 25153)
-- Name: appointment fk_patient_ssn; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT fk_patient_ssn FOREIGN KEY (patient) REFERENCES public.patient(ssn);


--
-- TOC entry 2791 (class 2606 OID 25189)
-- Name: prescribes fk_patient_ssn; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prescribes
    ADD CONSTRAINT fk_patient_ssn FOREIGN KEY (patient) REFERENCES public.patient(ssn);


--
-- TOC entry 2797 (class 2606 OID 25242)
-- Name: stay fk_patient_ssn; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stay
    ADD CONSTRAINT fk_patient_ssn FOREIGN KEY (patient) REFERENCES public.patient(ssn);


--
-- TOC entry 2799 (class 2606 OID 25257)
-- Name: undergoes fk_patient_ssn; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.undergoes
    ADD CONSTRAINT fk_patient_ssn FOREIGN KEY (patient) REFERENCES public.patient(ssn);


--
-- TOC entry 2781 (class 2606 OID 25081)
-- Name: department fk_physician_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT fk_physician_employeeid FOREIGN KEY (head) REFERENCES public.physician(employeeid);


--
-- TOC entry 2782 (class 2606 OID 25091)
-- Name: affiliated_with fk_physician_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.affiliated_with
    ADD CONSTRAINT fk_physician_employeeid FOREIGN KEY (physician) REFERENCES public.physician(employeeid);


--
-- TOC entry 2784 (class 2606 OID 25114)
-- Name: trained_in fk_physician_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trained_in
    ADD CONSTRAINT fk_physician_employeeid FOREIGN KEY (physician) REFERENCES public.physician(employeeid);


--
-- TOC entry 2786 (class 2606 OID 25132)
-- Name: patient fk_physician_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT fk_physician_employeeid FOREIGN KEY (pcp) REFERENCES public.physician(employeeid);


--
-- TOC entry 2789 (class 2606 OID 25163)
-- Name: appointment fk_physician_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT fk_physician_employeeid FOREIGN KEY (physician) REFERENCES public.physician(employeeid);


--
-- TOC entry 2790 (class 2606 OID 25184)
-- Name: prescribes fk_physician_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prescribes
    ADD CONSTRAINT fk_physician_employeeid FOREIGN KEY (physician) REFERENCES public.physician(employeeid);


--
-- TOC entry 2802 (class 2606 OID 25272)
-- Name: undergoes fk_physician_employeeid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.undergoes
    ADD CONSTRAINT fk_physician_employeeid FOREIGN KEY (physician) REFERENCES public.physician(employeeid);


--
-- TOC entry 2785 (class 2606 OID 25119)
-- Name: trained_in fk_procedure_code; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trained_in
    ADD CONSTRAINT fk_procedure_code FOREIGN KEY (treatment) REFERENCES public.procedure(code);


--
-- TOC entry 2800 (class 2606 OID 25262)
-- Name: undergoes fk_procedure_code; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.undergoes
    ADD CONSTRAINT fk_procedure_code FOREIGN KEY (procedure) REFERENCES public.procedure(code);


--
-- TOC entry 2798 (class 2606 OID 25247)
-- Name: stay fk_room_number; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stay
    ADD CONSTRAINT fk_room_number FOREIGN KEY (room) REFERENCES public.room(number);


--
-- TOC entry 2801 (class 2606 OID 25267)
-- Name: undergoes fk_stay_stayid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.undergoes
    ADD CONSTRAINT fk_stay_stayid FOREIGN KEY (stay) REFERENCES public.stay(stayid);


--
-- TOC entry 2796 (class 2606 OID 25232)
-- Name: on_call on_call_blockfloor_blockcode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.on_call
    ADD CONSTRAINT on_call_blockfloor_blockcode_fkey FOREIGN KEY (blockfloor, blockcode) REFERENCES public.block(floor, code);


--
-- TOC entry 2794 (class 2606 OID 25217)
-- Name: room room_blockfloor_blockcode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_blockfloor_blockcode_fkey FOREIGN KEY (blockfloor, blockcode) REFERENCES public.block(floor, code);


-- Completed on 2020-09-26 16:39:07

--
-- PostgreSQL database dump complete
--
```