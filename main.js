var prediction = "";

Webcam.set({
    width:350,
    height: 300,
    image_format:'png',
    png_quality:90
});

camera= document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/img>';
    });
}

console.log('ml5 version', ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6Hlks9lkk/model.json', modelLoded);

function modelLoded(){
    console.log("model loded");
}

function speak(){
    var synth= window.speechSynthesis;
    var speak_data_1= "My prediction is"+prediction;
    var utterthis= new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}

function check(){
    img= document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction= results[0].label;
        speak();
        if(results[0].label== "victory"){
            document.getElementById("update_gesture").innerHTML= "&#9996;";
        }
        else if(results[0].label== "great"){
            document.getElementById("update_gesture").innerHTML= "&#128077;";
        }
        else if(results[0].label== "amazing"){
            document.getElementById("update_gesture").innerHTML= "&#128076;";
        }
    }
}