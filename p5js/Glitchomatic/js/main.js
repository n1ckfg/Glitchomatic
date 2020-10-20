"use strict";

let numChanges = 40; // default 100 changes
let targetDir = "render";
let fileType = "png";
let tempImage; // PImage
let counter=0;
let counterMax=100;
let snowFrameOdds = 0.5; //0 to 1
let delayTime = 100;

function setup() {
    size(50,50);
    Settings settings = new Settings("settings.txt");
    //chooseFolderDialog();
    loadFiles();
    try {
        tempImage = loadImage((String) imgNames.get(0));
        surface.setSize(tempImage.width,tempImage.height);
    } catch (e) {
        console.log("No image files loaded. Exiting...");
        exit();
    }
}

function draw() {
    //create glitches
    for (let i = 0; i<imgNames.size(); i++) {
        byte[] data=loadBytes((String) imgNames.get(i));
        for (let j=0;j<numChanges;j++) {
            let loc=int(random(128,data.length));//guess at header being 128 bytes at most..
            data[loc]=(byte)random(255);
        }
        let target = targetDir + "/frame" + zeroPadding(i+1,imgNames.size()) + "." + fileType;
        if (random(1)<snowFrameOdds) {
            JpegMaker jpegMaker = new JpegMaker(width,height,target);
        }else{
            try{
                saveBytes(target,data);
                tempImage = loadImage(target);
                image(tempImage,0,0);
            }catch(e) {
                console.log("error");
            }
        }
        saveFrame(target); 
        glitchCounterHandler();
        console.log("output:    " + target);
    }
    exit();
}

function glitchCounterHandler() {
    if (counter<counterMax) {
        counter++;
    } else if (counter>= counterMax) {
        numChanges++;
        counter=0;
    }
}