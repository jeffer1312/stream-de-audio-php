<?php
     function CheckOnline()
     {
         $ch = curl_init('http://191.37.227.127:5000/stream.aac');
         curl_setopt($ch, CURLOPT_TIMEOUT, 5);
         curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
         $data = curl_exec($ch);
         $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
         curl_close($ch);
         echo $httpcode;
     }
        
    CheckOnline();
