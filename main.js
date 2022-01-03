img="";
status="";
objects=[];

function preload()
{
img=loadImage('dog_cat.jpg');
}

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw()
{
    image(video,0,0,380,380);
    if(status!=""){
        objectdetector.detect(video,gotresult);
        r=random(255);
        g=random(255);
        b=random(255);
    for(i=0; i<objects.length;i++)
    {
    document.getElementById("status").innerHTML="Status: Objects Detected";
    document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are: "+objects.length;
    fill(r,g,b);
    percent=floor(objects[i].confidence*100);
    stroke(r,g,b);
    text(objects[i].label+" "+percent+ "%", objects[i].x, objects[i].y);
    noFill();
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}  
}
}
function modelLoaded()
{
    console.log("Model has been Loaded");
    status=true;
}

function gotresult(error,result)
{
if(error){
    console.log(error);
}
else{
    console.log(result);
    objects=result;
}

}