URL = window.URL || window.webkitURL;
var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;
var recordButtonRecord = document.getElementById("recordButtonRecord");
var stopButtonRecord = document.getElementById("stopButtonRecord");
var pauseButtonRecord = document.getElementById("pauseButtonRecord");
recordButtonRecord.addEventListener("click", startRecording2);
stopButtonRecord.addEventListener("click", stopRecording2);
pauseButtonRecord.addEventListener("click", pauseRecording2);
function startRecording2() {
    var constraints = { audio: true, video: false }
    recordButtonRecord.disabled = true;
    stopButtonRecord.disabled = false;
    pauseButtonRecord.disabled = false;
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
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
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
    $("#spinModalRecordLoading").show();
    //navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    //    audioContext = new AudioContext();
    //    gumStream = stream;
    //    input = audioContext.createMediaStreamSource(stream);
    //    rec = new Recorder(input, { numChannels: 1 });
    //    rec.record();
    //}).catch(function (err) {
    //    recordButtonRecord.disabled = false;
    //    stopButtonRecord.disabled = true;
    //    pauseButtonRecord.disabled = true;
    //});
}
function pauseRecording2() {
    if (rec.recording) {
        //pause
        rec.stop();
        pauseButtonRecord.innerHTML = "ادامه";
        $("#spinModalRecordLoading i").removeClass("blink");
    } else {
        //resume
        rec.record();
        pauseButtonRecord.innerHTML = "مکث";
        $("#spinModalRecordLoading i").addClass("blink");
    }
}
function stopRecording2() {
    stopButtonRecord.disabled = true;
    recordButtonRecord.disabled = false;
    pauseButtonRecord.disabled = true;
    pauseButtonRecord.innerHTML = "مکث";
    rec.stop();
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(createDownloadLink2);
    $("#spinModalRecordLoading").hide();
}
function createDownloadLink2(blob) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var filename = new Date().toISOString();
    au.src = url;
    au.controls = true;
    var getName = $("#hidRecordType").val();
    var getHide = $("#hideAccidentGuid").val().replace(".jpg", "");
    //au.src = "/MediaUploader/Accident/" + getName + "-" + getHide + ".wav";
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
        xhr.open("POST", "/Handle/AccidentAudioHandle.ashx?GUID=" + getName + "-" + getHide + "&IsRemove=false&Id=" + $("#hidId").val(), true);
        xhr.send(fd);
        
        stopButtonRecord.disabled = recordButtonRecord.disabled = pauseButtonRecord.disabled = true;
        var deleteUpload = document.createElement('a');
        deleteUpload.className = "btn btn-danger";
        deleteUpload.href = "javascript:void(0)";
        deleteUpload.innerHTML = "حذف فایل صوتی";
        deleteUpload.setAttribute("onclick", "DeleteAudioModal();");
        li.appendChild(deleteUpload);
        upload.className = "hide";
        $("#divAudioMessage").html("فایل صوتی با موفقیت بارگذاری شد.");
    });
    li.appendChild(document.createTextNode(" "));
    li.appendChild(upload);
    var recordingsListRecord = document.getElementById("recordingsListRecord");
    if (recordingsListRecord.hasChildNodes()) recordingsListRecord.removeChild(recordingsListRecord.firstChild);
    recordingsListRecord.appendChild(li);
    //recordButtonRecord.disabled = true;
}