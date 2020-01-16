<div class="online">
<?php
        include('checkOnline.php')
    ?>
</div>

<!DOCTYPE html>
<html>
<style>
   .online{
       display:none;
   }
   h1{
       text-align:center;
       
   }
   iframe{
       
       margin: 0 auto;
   }
</style>
<head>
    <meta charset="UTF-8">
    <title>Exemplo</title>
</head>

<body>
    
    <h1>Radio Regional Fm</h1>
    
    <iframe src="http://191.37.227.127:9000/stream.aac" allow="autoplay" style="display:block" id="iframeAudio">
</iframe> 

    <!-- <audio controls loop autoplay>
        <source src="http://191.37.227.127:9000/stream.aac" type="audio/aac">
    </audio>  -->



    <script src="./js/vendor/jquery.js"></script>
    <script src="reload.js"></script>

    


</body>

</html>

</html>