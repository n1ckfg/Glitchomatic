"use strict";

const numChanges = 40; // default 100 changes
let counter=0;
let counterMax=100;
let snowFrameOdds = 0.5; //0 to 1
let delayTime = 100;
let armCanvasResize = false;
let armGlitch = false;
let dropImage;
let dropBytes;

function setup() {
    createCanvas(512, 512);
}

function draw() {
    background(0);

    if (armDropResult) {
        armDropResult = false;

        dropImage = loadImage(dropResult);

        armCanvasResize = true;
    }

    if (armCanvasResize && dropImage.width !== 1 && dropImage.height !== 1) {
        armCanvasResize = false;

        resizeCanvas(dropImage.width, dropImage.height);

        armGlitch = true;
    }

    if (armGlitch) {
        if (random(1) < snowFrameOdds) {
            dropImage = loadImage("data:image/jpeg;base64," + Uint8ToBase64(new JpegMaker(dropImage).bytes));
        } else {
            dropBytes = loadBytes(dropResult, function(result) {
                let data = result.bytes;
                
                for (let j = 0; j < numChanges; j++) {
                    let loc = parseInt(random(128, data.length));//guess at header being 128 bytes at most..
                    data[loc] = byte(parseInt(random(255)));
                }
                
                dropImage = loadImage("data:image/jpeg;base64," + Uint8ToBase64(data));
            });
        }

        armGlitch = false;
    }

    if (dropImage !== undefined) {
        image(dropImage, 0, 0);
    }
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
