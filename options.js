var initAutoVoice = function(){
    return chrome.extension.getBackgroundPage().initAutoVoice();
}
var isMicAvailable = function(callback){
    navigator.webkitGetUserMedia({
        audio: true,
    }, function(stream) {
        stream.stop();
        callback(true);
    }, function() {
        callback(false);
    });

}

isMicAvailable(function(available){
    if(!available){
        alert("You must give AutoVoice permission to use your microphone to use voice recognition. Please refresh the page to try again.");
    }
    initAutoVoice();
});