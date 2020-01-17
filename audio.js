var audioContext = null;
var meter = null;
var received = null;
//var meters = null;
var canvasContext = null;
var WIDTH = 1000;
var HEIGHT = 20;
var rafID = null;

window.onload = function() {

    // grab our canvas
    canvasContext = document.getElementById("meter").getContext("2d");

    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.mediaDevices.getUserMedia;

        // ask for an audio input
        navigator.getUserMedia({
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}

function didntGetStream() {
    alert('Placa de áudio Desativada ou Ocupada.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
    console.log(rafID);

    // kick off the visual updating
    drawLoop();
}

function drawLoop(time) {
    // clear the background
    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

    // check if we're currently clipping
    if (meter.checkClipping())
        canvasContext.fillStyle = "red";
    else
        canvasContext.fillStyle = "blue";

    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);
    //document.getElementById("received").innerHTML = meter.volume*WIDTH*1.4;

    // set up the next visual callback
    rafID = window.requestAnimationFrame(drawLoop);
}


function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
    var processor = audioContext.createScriptProcessor(512);
    processor.onaudioprocess = volumeAudioProcess;
    processor.clipping = false;
    processor.lastClip = 0;
    processor.volume = 0;
    processor.clipLevel = clipLevel || 0.98;
    processor.averaging = averaging || 0.95;
    processor.clipLag = clipLag || 750;

    // this will have no effect, since we don't copy the input to the output,
    // but works around a current Chrome bug.
    processor.connect(audioContext.destination);

    processor.checkClipping =
        function() {
            if (!this.clipping)
                return false;
            if ((this.lastClip + this.clipLag) < window.performance.now())
                this.clipping = false;
            return this.clipping;
        };

    processor.shutdown =
        function() {
            this.disconnect();
            this.onaudioprocess = null;
        };

    return processor;
}

function volumeAudioProcess(event) {
    var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
    var sum = 0;
    var x;

    // Do a root-mean-square on the samples: sum up the squares...
    for (var i = 0; i < bufLength; i++) {
        x = buf[i];
        if (Math.abs(x) >= this.clipLevel) {
            this.clipping = true;
            this.lastClip = window.performance.now();
        }
        sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms = Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume * this.averaging);
}







/*let shouldStop = false;
let stopped = false;
const downloadLink = document.getElementById('download');
const stopButton = document.getElementById('stop');

stopButton.addEventListener('click', function() {
    shouldStop = true;
})

var handleSuccess = function(stream) {
    var context = new AudioContext();
    var input = context.createMediaStreamSource(stream)
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
    console.log(meter);
    var processor = context.createScriptProcessor(1024, 1, 1);

    processor.connect(context.destination);

    processor.onaudioprocess = function(e) {

        // Do something with the data, i.e Convert this to WAV
        //console.log(e);
        return

    };

    const options = { mimeType: 'audio/webm;codecs=Opus' };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
        console.log('data');
        if (e.data.size > 0) {
            recordedChunks.push(e.data);

        }

        if (shouldStop === true && stopped === false) {
            mediaRecorder.stop();

            stopped = true;
        }
    });

    mediaRecorder.addEventListener('stop', function() {
        downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
        downloadLink.download = 'acetest.ogg';
    });

    mediaRecorder.start();

    return
};



navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(handleSuccess);

/*var handleSuccess = function(stream) {
    var context = new AudioContext();
    var input = context.createMediaStreamSource(stream)
    var processor = context.createScriptProcessor(1024, 1, 1);

    processor.connect(context.destination);

    processor.onaudioprocess = function(e) {
        // Do something with the data, i.e Convert this to WAV
        console.log(e);
    };
};



navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(handleSuccess)

    */