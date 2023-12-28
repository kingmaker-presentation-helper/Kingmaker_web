// Use strict mode
"use strict";   

document.addEventListener('DOMContentLoaded', function() {

    // Get session key from storage
    const sessionkey = sessionStorage.getItem('sessionkey');

    // Initialize WaveSurfer
    let wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        barWidth: 3,
        barHeight: 4,
    });

    // Initialize necessary variables
    let mediaRecorder;
    let combinedChunks = [];
    let timerInterval;
    let recordingStartTime;
    let videoPlayer = document.getElementById('videoPlayback');
    let liveVideoFeed = document.getElementById('liveVideoFeed');

    // Time formatting function
    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        let milliseconds = Math.floor((time % 1) * 100);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    }

    // Update recording time function
    function updateRecordingTimer() {
        let currentTime = (Date.now() - recordingStartTime) / 1000;
        document.getElementById('timer').textContent = formatTime(currentTime);
    }

    // Update playback time function
    wavesurfer.on('audioprocess', function() {
        updatePlaybackTimer();
    });

    function updatePlaybackTimer() {
        let currentTime = wavesurfer.getCurrentTime();
        document.getElementById('timer').textContent = formatTime(currentTime);
    }

    // Waveform click event handling
    wavesurfer.on('ready', function() {
        const waveformContainer = document.querySelector('#waveform');

        waveformContainer.addEventListener('click', function(event) {
            const clickPosition = (event.clientX - waveformContainer.getBoundingClientRect().left) / waveformContainer.clientWidth;
            const time = clickPosition * videoPlayer.duration;

            if (isFinite(time) && videoPlayer.readyState >= 2) {
                videoPlayer.currentTime = time;
            }
        });
    });

    // Show video element function
    function showVideoElement(element) {
        element.style.display = 'block';
        element.style.width = '100%';
        element.style.height = '100%';
    }

    // Hide video element function
    function hideVideoElement(element) {
        element.style.display = 'none';
        element.style.width = '0';
        element.style.height = '0';
    }

    document.getElementById('playButton').addEventListener('click', function() {
        const isPlaying = wavesurfer.isPlaying();
        const isVideoPlaying = !videoPlayer.paused;

        if (isPlaying || isVideoPlaying) {
            wavesurfer.pause();
            videoPlayer.pause();
            this.textContent = '재생';  // Change button text to 'Play'
        } else {
            if (videoPlayer.readyState !== 0) {
                videoPlayer.play();
            }
            wavesurfer.play();
            document.getElementById('videoPlaceholder').style.display = 'none';
            showVideoElement(liveVideoFeed); // Show video element
            showVideoElement(videoPlayer);   // Show video element
            this.textContent = '정지';  // Change button text to 'Stop'
        }
    });

    // Video end event handling
    videoPlayer.onended = function() {
        document.getElementById('playButton').textContent = '재생';  // Change button text to 'Play'
    };

    // WaveSurfer finish event handling
    wavesurfer.on('finish', function() {
        document.getElementById('playButton').textContent = '재생';  // Change button text to 'Play'
    });

    // Handling the click event of the 'end practice' button
    document.getElementById('endButton').addEventListener('click', function() {
        clearInterval(timerInterval);
        hideVideoElement(liveVideoFeed);
        hideVideoElement(videoPlayer);
        document.getElementById('videoPlaceholder').style.display = 'block';
        alert("연습이 종료되었습니다. 메인화면으로 돌아갑니다. \n결과는 아래 세션 키를 사용하여 1~2분 내로 확인할 수 있습니다.\n세션키: " + sessionkey);

        location.href = "index.html";
        fetch("http://localhost:9000/function/all/" + sessionkey, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));

        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            // Reset for the next recording
            combinedChunks = [];
        }
    });

    // File validation function
    function validateFile(file) {
        const allowedExtensions = ['mp4'];
        const maxSizeInBytes = 100 * 1024 * 1024; // 100 MB

        // Check if the file has a valid extension
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            console.error('Invalid file extension. Allowed extensions: ' + allowedExtensions.join(', '));
            return false;
        }

        // Check if the file size is within the allowed limit
        if (file.size > maxSizeInBytes) {
            console.error('File size exceeds the allowed limit of ' + maxSizeInBytes + ' bytes.');
            return false;
        }

        return true;
    }

    // Send video to server function
    async function sendVideoToServer() {
        const recordingEndTime = Date.now();
        const durationInSeconds = (recordingEndTime - recordingStartTime) / 1000;
        const blob = new Blob(combinedChunks, { 'type' : 'video/mp4' });

        if (!validateFile(new File([blob], 'video_recording.mp4', { type: 'video/mp4' }))) {
            return;
        }
        const url = URL.createObjectURL(blob);
        videoPlayer.src = url;
        showVideoElement(videoPlayer);
        hideVideoElement(liveVideoFeed);
        wavesurfer.load(url);

        // Create a new FormData object
        const formData = new FormData();
        const videoFilename = `video_recording.mp4`;
        const audioFile = new File([blob], videoFilename, {type: "video/mp4"});
        formData.append('file', audioFile, videoFilename);

        // Append user_name to the FormData object
        const user_name = sessionkey;
        formData.append('user_name', user_name);

        // Append additional data (if needed)
        formData.append('duration', durationInSeconds.toString());

        // Send the video and audio data to the server using fetch API
        fetch("http://localhost:9000/function/audio/", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log("Video and audio sent successfully:", data))
        .catch(error => console.error("Error sending video and audio:", error));

        // Reset for the next recording
        combinedChunks = [];
    }

    // Record button click event
    document.getElementById('recordButton').addEventListener('click', function() {
        if (!mediaRecorder || mediaRecorder.state === 'inactive') {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                .then(stream => {
                    liveVideoFeed.srcObject = stream;
                    document.getElementById('videoPlaceholder').style.display = 'none';
                    showVideoElement(liveVideoFeed);

                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    recordingStartTime = Date.now();
                    timerInterval = setInterval(updateRecordingTimer, 100);

                    mediaRecorder.ondataavailable = event => {
                        combinedChunks.push(event.data);
                    };

                    mediaRecorder.onstop = () => {
                        sendVideoToServer();
                    };
                    this.textContent = '녹음 중지';  // Change button text to 'Stop Recording'
                }).catch(error => {
                    console.error('Error accessing media devices:', error);
                });
        } else {
            mediaRecorder.stop();
            this.textContent = '녹음 시작';  // Change button text to 'Start Recording'
        }
    });
});
