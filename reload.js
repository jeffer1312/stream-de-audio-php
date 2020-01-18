function time() {
    var delay = 15000;


    setInterval(function() {
        var volume = meter.volume.toFixed(8);
        //console.log(volume);
        if (volume == 0.00000000) {

            // console.log('sem audio');
            window.location.reload();
        } else {
            // console.log(volume)
            //console.log('com audio');
        }
    }, delay);
}

time();


function http() {
    return $.get("./CheckOnline.php", function(data) {
        let httpcode = data;
        //console.log('http primeiro', httpcode);

        setTimeout(function Reloader() {

            if (httpcode >= 200 && httpcode < 300) {
                // console.log('site online!');
                $('.iframe').fadeIn(2000);

            } else {
                //console.log('site offine!');
                $('.iframe').fadeOut();
                document.location.reload();
            }
        }, 8000)

        //Reloader();



    });

}

http();

var tmp = setInterval(http, 15000);