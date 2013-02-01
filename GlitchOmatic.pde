int numChanges = 40; // default 100 changes
String targetDir = "render";
String fileType = "png";
ArrayList imgNames;
PImage tempImage;
int counter=0;
int counterMax=100;
String folderPath;
File dataFolder;
float snowFrameOdds = 0.5; //0 to 1
int delayTime = 100;

void setup(){
  Settings settings = new Settings("settings.txt");
  chooseFolderDialog();
  try{
    tempImage = loadImage((String) imgNames.get(0));
    size(tempImage.width,tempImage.height);
  }catch(Exception e){
    println("No image files loaded. Exiting...");
    exit();
  }
}

void draw(){
  //create glitches
  for(int i = 0; i<imgNames.size(); i++){
    byte[] data=loadBytes((String) imgNames.get(i));
    for(int j=0;j<numChanges;j++) {
      int loc=int(random(128,data.length));//guess at header being 128 bytes at most..
      data[loc]=(byte)random(255);
    }
    String target = targetDir + "/frame" + zeroPadding(i+1,imgNames.size()) + "." + fileType;
    if(random(1)<snowFrameOdds){
      JpegMaker jpegMaker = new JpegMaker(width,height,target);
    }else{
      try{
        saveBytes(target,data);
        tempImage = loadImage(target);
        image(tempImage,0,0);
      }catch(Exception e){
        println("error");
      }
    }
    saveFrame(target); 
    glitchCounterHandler();
    println("output:  " + target);
  }
  exit();
}

void glitchCounterHandler(){
  if(counter<counterMax){
    counter++;
  } else if (counter>= counterMax){
    numChanges++;
    counter=0;
  }
}

String zeroPadding(int _val, int _maxVal){
  String q = ""+_maxVal;
  return nf(_val,q.length());
}

