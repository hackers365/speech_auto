var recognition = null;
var stopSpeechRecognition = function(){
    if(recognition){
        console.log("Stopping speech recognition");
        recognition.stop();
    }
}
var startSpeechRecognition = function(){
    if(recognition == null){
        recognition = new webkitSpeechRecognition();
    }
    recognition.stop();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onstart = function(){
        console.log("Speech Start");
    }
    recognition.onresult = function(event) {
        var wakeup = getWakeUp();
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            var command = event.results[i][0].transcript.trim().toLowerCase();
            console.log("get command:" + command);
            /*if (event.results[i].isFinal) {
                console.log("command: " + command);
                if(woken){
                    if(wakeup){
                        command = command.replace(wakeup,"");
                    }
                    if(command){
                        clearTimeout(timeoutWakeup);
                        sendAutoVoiceCommand(command);
                        woken = false;
                        if(!recognition.continuous){
                            stopSpeechRecognition();
                        }
                    }
                }
            }else{
                if(!woken){
                    if(!wakeup){
                        woken = true;
                    }else{
                        woken = command.toLowerCase().indexOf(wakeup.toLowerCase()) >= 0;
                        if(woken){
                            showListeningNotification();
                            if(!getWakeUpResponseAfterCommand()){
                                sayWakeUpResponse();
                            }
                            setSpeechRecognitionTimeout();
                            console.log("Awake!");
                        }
                    }
                }else{
                    setSpeechRecognitionTimeout();
                }
            }*/
        }
    }
    recognition.onerror = function(event) {
        console.log("Speech Error: ");
        console.log(event)
        /*chrome.tabs.create({
            'url': "chrome-extension://hglmpnnkhfjpnoheioijdpleijlmfcfb/options.html"
        });*/
    }
    recognition.onend = function(){
        console.log("Speech End");
        //recognition.start();
    }
    recognition.lang = 'cmn-Hans-CN';

    try {
        recognition.start();
        console.log("started recognition with language " + recognition.lang);
    }catch(err){
        console.log("Recognition already started");
    }
}
var isMicAvailable = function(callback){
    navigator.webkitGetUserMedia({
        audio: true,
    }, function(stream) {
        callback(true);
    }, function() {
        callback(false);
    });

}

var initAutoVoice = function(){
    isMicAvailable(function(available){
        if(!available && !localStorage["micnotavailable"]){
            localStorage["micnotavailable"] = "done";
            console.log("mic not available, opening options");
        }else{
            console.log("mic available!");
            startSpeechRecognition();
        }
    });
}

initAutoVoice();
