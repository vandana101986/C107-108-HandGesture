prediction_1="";
prediction_2="";

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function wait()
{
setTimeout(function()
    { 
        take_snapshot(); 
        save();
    }, 2000);
}

function take_snapshot()
{
        Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'" />';
         });
}

console.log('ML5 Version : ',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_CcBpk2TB/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded..!!');
}

function speak(){
    
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction_1;
    speak_data_2="The second prediction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
    
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name1").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;

        prediction_1=results[0].label;
        prediction_2=results[1].label;

        speak();

        if(results[0].label=="hi")
        {
            document.getElementById("update_emoji1").innerHTML="&#128075;";
        }
        if(results[0].label=="superb")
        {
            document.getElementById("update_emoji1").innerHTML="&#128076;";
        }
        if(results[0].label=="thumbsUp")
        {
            document.getElementById("update_emoji1").innerHTML="&#128077;";
        }
        if(results[0].label=="thumbsDown")
        {
            document.getElementById("update_emoji1").innerHTML="&#128078;";
        }
        if(results[0].label=="applaud")
        {
            document.getElementById("update_emoji1").innerHTML="&#128079;";
        }
        if(results[0].label=="yo")
        {
            document.getElementById("update_emoji1").innerHTML="&#129304;";
        }


        if(results[1].label=="hi")
        {
            document.getElementById("update_emoji2").innerHTML="&#128075;";
        }
        if(results[1].label=="superb")
        {
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
        if(results[1].label=="thumbsUp")
        {
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if(results[1].label=="thumbsDown")
        {
            document.getElementById("update_emoji2").innerHTML="&#128078;";
        }
        if(results[1].label=="applaud")
        {
            document.getElementById("update_emoji2").innerHTML="&#128079;";
        }
        if(results[1].label=="yo")
        {
            document.getElementById("update_emoji2").innerHTML="&#129304;";
        }
    }
}