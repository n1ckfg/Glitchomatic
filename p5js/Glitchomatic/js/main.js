"use strict";

const numChanges = 40; // default 100 changes
let tempImage; // PImage
let counter=0;
let counterMax=100;
let snowFrameOdds = 0.5; //0 to 1
let delayTime = 100;
let armCanvasResize = false;
let armGlitch = false;
let dropImage;
let glitch;

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0);

    if (armDropResult) {
        dropImage = loadImage(dropResult);
        armDropResult = false;
        armCanvasResize = true;
    }

    if (armCanvasResize) {
        if (dropImage !== undefined && dropImage.width !== 1 && dropImage.height !== 1) {
            resizeCanvas(dropImage.width, dropImage.height);
            glitch = new JpegMaker(dropImage.width, dropImage.height);
            armCanvasResize = false;
            armGlitch = true;
        }
    }

    if (armGlitch) {

        armGlitch = false;
    }

    if (dropImage !== undefined) {
        image(dropImage, 0, 0);
    }
}


/*
function draw() {
    //create glitches
    for (let i = 0; i < imgNames.size(); i++) {
        byte[] data=loadBytes((String) imgNames.get(i));
        for (let j = 0; j < numChanges; j++) {
            let loc = parseInt(random(128, data.length));//guess at header being 128 bytes at most..
            data[loc] = (byte) random(255);
        }
        let target = targetDir + "/frame" + zeroPadding(i+1,imgNames.size()) + "." + fileType;
        if (random(1) < snowFrameOdds) {
            JpegMaker jpegMaker = new JpegMaker(width,height,target);
        } else {
            try {
                saveBytes(target, data);
                tempImage = loadImage(target);
                image(tempImage,0,0);
            } catch( e) {
                console.log("error");
            }
        }
        
        saveFrame(target); 
        glitchCounterHandler();
        console.log("output:    " + target);
    }
}

function glitchCounterHandler() {
    if (counter<counterMax) {
        counter++;
    } else if (counter>= counterMax) {
        numChanges++;
        counter=0;
    }
}
*/