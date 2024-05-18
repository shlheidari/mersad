URL = window.URL || window.webkitURL;
var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");
var recordingsList = document.getElementById("recordingsList");
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);
function startRecording() {
    var constraints = { audio: true, video: false }
    recordButton.disabled = true;
    stopButton.disabled = false;
    pauseButton.disabled = false;
    navigator.getUserMedia = (
        navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
    );
    if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
        navigator.getUserMedia(constraints, function (stream) {
            audioContext = new AudioContext();
            gumStream = stream;
            input = audioContext.createMediaStreamSource(stream);
            rec = new Recorder(input, { numChannels: 1 });
            rec.record();
        }, function (err) {
            recordButton.disabled = false;
            stopButton.disabled = true;
            pauseButton.disabled = true;
        });
    } else {
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
            audioContext = new AudioContext();
            gumStream = stream;
            input = audioContext.createMediaStreamSource(stream);
            rec = new Recorder(input, { numChannels: 1 });
            rec.record();
        }).catch(function (err) {
            recordButton.disabled = false;
            stopButton.disabled = true;
            pauseButton.disabled = true;
        });
    }
    $("#spinRecordLoading").show();
    //navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    //    audioContext = new AudioContext();
    //    gumStream = stream;
    //    input = audioContext.createMediaStreamSource(stream);
    //    rec = new Recorder(input, { numChannels: 1 });
    //    rec.record();
    //}).catch(function (err) {
    //    recordButton.disabled = false;
    //    stopButton.disabled = true;
    //    pauseButton.disabled = true;
    //});
}
function pauseRecording() {
    if (rec.recording) {
        //pause
        rec.stop();
        pauseButton.innerHTML = "ادامه";
        $("#spinRecordLoading i").removeClass("blink");
    } else {
        //resume
        rec.record();
        pauseButton.innerHTML = "مکث";
        $("#spinRecordLoading i").addClass("blink");
    }
}
function stopRecording() {
    stopButton.disabled = true;
    recordButton.disabled = false;
    pauseButton.disabled = true;
    pauseButton.innerHTML = "مکث";
    rec.stop();
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(createDownloadLink);
    $("#spinRecordLoading").hide();
}
function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var filename = new Date().toISOString();
    au.src = url;
    au.controls = true;
    var getHide = $("#hideAccidentGuid").val().replace(".jpg", "");
    //au.src = "/MediaUploader/Accident/" + getHide + ".wav";
    li.appendChild(au);
    li.appendChild(document.createElement('br'));
    var upload = document.createElement('a');
    upload.className = "btn btn-success";
    upload.href = "javascript:void(0)";
    upload.innerHTML = "ذخیره فایل صوتی";
    upload.addEventListener("click", function (event) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            if (this.readyState === 4) {
                //console.log("Server returned: ", e.target.responseText);
            }
        };
        var fd = new FormData();
        fd.append("audio_data", blob, filename);
        xhr.open("POST", "/Handle/AccidentAudioHandle.ashx?GUID=" + getHide + "&IsRemove=false&Id=" + $("#hidId").val(), true);
        xhr.send(fd);
        
        //
        stopButton.disabled = recordButton.disabled = pauseButton.disabled = true;
        var deleteUpload = document.createElement('a');
        deleteUpload.className = "btn btn-danger";
        deleteUpload.href = "javascript:void(0)";
        deleteUpload.innerHTML = "حذف فایل صوتی";
        deleteUpload.setAttribute("onclick", "DeleteAudio();");
        li.appendChild(deleteUpload);
        upload.className = "hide";
        $("#lblMessage").html(CreateModal("فایل صوتی کروکی با موفقیت بارگذاری شد."));
        $('#MessageModal').modal();
    });
    li.appendChild(document.createTextNode(" "));
    li.appendChild(upload);
    if (recordingsList.hasChildNodes()) recordingsList.removeChild(recordingsList.firstChild);
    recordingsList.appendChild(li);
    //recordButton.disabled = true;
}