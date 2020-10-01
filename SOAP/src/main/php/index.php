<?php

try {
	$soap = new SoapClient("http://localhost:9090/ws/hospitals.wsdl", [
	    # This array and its values are optional
        'soap_version' => SOAP_1_1,
        'compression' => SOAP_COMPRESSION_ACCEPT | SOAP_COMPRESSION_GZIP,
        'cache_wsdl' => WSDL_CACHE_BOTH,
        # Helps with debugging
        'trace' => TRUE,
        'exceptions' => TRUE
    ]);

	$params = array('filter'=>1);

	$data = $soap->getUserAppointments($params);
	var_dump($data);
}
catch(Exception $e) {
	die($e->getMessage());
}
?>