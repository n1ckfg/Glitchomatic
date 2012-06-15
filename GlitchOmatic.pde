//~~~~~~~~~~~~~~~~~~
int numFrames = 5010;  // number of frames
int numChanges = 40; // default 100 changes
String[] source = new String[numFrames];
String target;
String name = "frame";
String extensionLoad = "jpg";
String extensionSave = "png";
PImage tempImage;
int counter=0;
int counterMax=100;

void setup(){
  // init array
for(int i = 0; i<source.length; i++){
  source[i] = name + i;
}
tempImage = loadImage(source[0] + "." + extensionLoad);
size(tempImage.width,tempImage.height);
}

void draw(){
//create glitches
for(int i = 0; i<source.length; i++){
  byte[] data=loadBytes(source[i] + "." + extensionLoad);
  for(int j=0;j<numChanges;j++) {
    int loc=int(random(128,data.length));//guess at header being 128 bytes at most..
    data[loc]=(byte)random(255);
  }
   target = "render/glitched_" + source[i] + "." + extensionSave;
   saveBytes(target,data);
  tempImage = loadImage(target);
  image(tempImage,0,0);
 saveFrame(target); 
 counterHandler();
  println("output:  " + target);
}
println("DONE");
exit();
}

void counterHandler(){
if(counter<counterMax){
counter++;
} else if (counter>= counterMax){
numChanges++;
counter=0;
}
}

