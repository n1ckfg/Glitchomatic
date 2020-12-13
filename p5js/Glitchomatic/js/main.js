"use strict";

const numChanges = 40; // default 100 changes
const jpegHeader = "data:image/jpeg;base64,";
let counter=0;
let counterMax=100;
let snowFrameOdds = 0; //0 to 1
let delayTime = 100;
let armCanvasResize = false;
let armGlitch = false;
let dropImage;
let startUrl = "./images/blockbuster_mid.jpg";

function setup() {
    dropImage = loadImage(startUrl, function() {
        createCanvas(dropImage.width, dropImage.height);

        loadBytes(startUrl, function(result) {
            dropResult = jpegHeader + Uint8ToBase64(result.bytes);
            console.log(dropResult);
            armDropResult = true;
        });
    });
}

function draw() {
    background(0);

    if (armDropResult) {
        armDropResult = false;

        dropImage = loadImage(dropResult, function() {
            resizeCanvas(dropImage.width, dropImage.height);
            doGlitch();
        });
    }

    if (dropImage !== undefined) {
        image(dropImage, 0, 0);
    }
}

function doGlitch() {
    loadBytes(dropResult, function(result) {
        let data = result.bytes;
        
        if (random(1) < snowFrameOdds) {
            dropImage = loadImage(jpegHeader + Uint8ToBase64(new JpegMaker(dropImage, data).bytes));
        } else {
            for (let j = 0; j < numChanges; j++) {
                let loc = parseInt(random(128, data.length)); // guess at header being 128 bytes at most..
                data[loc] = byte(parseInt(random(255)));
            }
            
            dropImage = loadImage(jpegHeader + Uint8ToBase64(data));
        }
    });
}

function Uint8ToBase64(bytes) {
    let u8Arr = Uint8Array.from(bytes);
    let CHUNK_SIZE = 0x8000; //arbitrary number
    let index = 0;
    let length = u8Arr.length;
    let result = '';
    let slice;
    while (index < length) {
        slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length)); 
        result += String.fromCharCode.apply(null, slice);
        index += CHUNK_SIZE;
    }
    return btoa(result);
}

function keyPressed() {
    if (dropResult !== undefined) doGlitch();
}