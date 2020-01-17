/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
<script type="text/javascript">
var myCanvas = document.getElementById("myCanvas");
var canvas =  myCanvas.getContext("2d");
canvas.fill#FF0000";
canvas.fillRect(0,0,100,100);             
*/
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

    // kick off the visual updating
    drawLoop();
}

function drawLoop(time) {
    // clear the background
    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

    // check if we're currently clipping
    if (meter.checkClipping()) {

        canvasContext.fillStyle = "#e32441";
    } else {

        canvasContext.fillStyle = "#9e54ff";
    }
    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);



    //document.getElementById("received").innerHTML = meter.volume*WIDTH*1.4;

    // set up the next visual callback
    rafID = window.requestAnimationFrame(drawLoop);
}