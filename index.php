<div class="online">
    <?php
        include('checkOnline.php')
    ?>
</div>

<!DOCTYPE html>
<html>

<head>

    <link rel="stylesheet" href="getHTMLMediaElement.css">
    <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8">
    <title>Regional Fm 88,5</title>
</head>

<body>
    <!-- <img src="./background1080.jpg" alt="background"> -->


    <div class="container">
        <canvas id="meter"></canvas>
        <div class="all">
            <h2>Radio Regional Fm <b>88,5</b></h2>
            <div class="logo">
                <img src="radiologo1.png" alt="">
            </div>
            <div class="iframe" id="iframe">
                <img src="./audio-animação.gif">
            </div>
        </div>
    </div>

    <iframe src="http://170.81.93.32:9000/stream.aac" allow="autoplay" frameborder=’0′ e scrolling=’no’ id="iframeAudio"></iframe>


    <!-- <audio controls loop autoplay>
        <source src="http://191.37.227.127:9000/stream.aac" type="audio/aac">
    </audio>  -->



    <script src="./js/vendor/jquery.js"></script>
    <script src="getHTMLMediaElement.js"></script>

    <script src="volume-meter.js"></script>
    <script src="main.js"></script>
    <script src="reload.js"></script>
    <!-- <script src="./audio.js"></script> -->
</body>

</html>

</html>