<?php
     function CheckOnline()
     {
         $ch = curl_init('http://170.81.93.32:9000/stream.aac');
         curl_setopt($ch, CURLOPT_TIMEOUT, 5);
         curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
         $data = curl_exec($ch);
         $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
         curl_close($ch);
         echo $httpcode;
     }
        
    CheckOnline();
