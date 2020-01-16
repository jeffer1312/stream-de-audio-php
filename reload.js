function http() {
    return $.get("./CheckOnline.php", function(data) {
        let httpcode = data;

        function Reloader() {

            if (httpcode >= 200 && httpcode < 300) {
                console.log('site online!');
            } else {
                console.log('site offile!');
                document.location.reload(true);
            }
        }

        Reloader()



    });

}

http();

var tmp = setInterval(http, 10000);











/*
if( $httpcode >= 200 && $httpcode < 300 ){  
    echo 'site online!';
} else {
    echo 'site offline.';
}*/