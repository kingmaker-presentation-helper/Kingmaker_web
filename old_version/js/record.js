(function ($) {
    "use strict";   
    
    $(document).ready(function() {

        // 세션 키를 스토리지에서 가져오기
        const sessionkey = localStorage.getItem('sessionkey');

        // WaveSurfer 초기화
        let wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple',
            barWidth: 3,
            barHeight: 4,
        });

        // 필요한 변수 초기화
        let mediaRecorder;
        let combinedChunks = [];
        let timerInterval;
        let recordingStartTime;
        let videoPlayer = document.getElementById('videoPlayback');
        let liveVideoFeed = document.getElementById('liveVideoFeed');

        // 시간 포맷팅 함수
        function formatTime(time) {
            let minutes = Math.floor(time / 60);
            let seconds = Math.floor(time % 60);
            let milliseconds = Math.floor((time % 1) * 100);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
        }

        // 녹음 시간 업데이트 함수
        function updateRecordingTimer() {
            let currentTime = (Date.now() - recordingStartTime) / 1000;
            $('#timer').text(formatTime(currentTime));
        }
        

        // 재생 시간 업데이트 함수
        wavesurfer.on('audioprocess', function() {
            updatePlaybackTimer();
        });
        
        function updatePlaybackTimer() {
            let currentTime = wavesurfer.getCurrentTime();
            $('#timer').text(formatTime(currentTime));
        }
        
        
        // Waveform 클릭 이벤트 처리
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
        
        

        // 비디오 요소 표시 함수
        function showVideoElement(element) {
            element.style.display = 'block';
            element.style.width = '100%';
            element.style.height = '100%';
        }

        // 비디오 요소 숨김 함수
        function hideVideoElement(element) {
            element.style.display = 'none';
            element.style.width = '0';
            element.style.height = '0';
        }

        $('#playButton').click(function() {
            const isPlaying = wavesurfer.isPlaying();
            const isVideoPlaying = !videoPlayer.paused;
        
            if (isPlaying || isVideoPlaying) {
                wavesurfer.pause();
                videoPlayer.pause();
                // hideVideoElement 함수 호출 제거
                $(this).text('재생');  // 버튼 텍스트를 'Play'로 변경
            } else {
                if (videoPlayer.readyState !== 0) {
                    videoPlayer.play();
                }
                wavesurfer.play();
                $('#videoPlaceholder').hide();
                showVideoElement(liveVideoFeed); // 비디오 요소 표시
                showVideoElement(videoPlayer);   // 비디오 요소 표시
                $(this).text('정지');  // 버튼 텍스트를 'Stop'으로 변경
            }
        });
        

        // 비디오 종료 시 이벤트 처리
        videoPlayer.onended = function() {
            $('#playButton').text('재생');  // 버튼 텍스트 변경: 'Play'
        };

        // WaveSurfer 재생 종료 시 이벤트 처리
        wavesurfer.on('finish', function() {
            $('#playButton').text('재생');  // 버튼 텍스트 변경: 'Play'
        });

        // 연습 그만하기 버튼 클릭 이벤트 처리
        var imageCaptureInterval;
        $('#endButton').click(function() {
            clearInterval(timerInterval);
            clearInterval(imageCaptureInterval); // 클리어
            hideVideoElement(liveVideoFeed);
            hideVideoElement(videoPlayer);
            $('#videoPlaceholder').show();
            sendVideoToServer();
            alert("연습이 종료되었습니다. 메인화면으로 돌아갑니다. \n결과는 아래 세션 키를 사용하여 1~2분 내로 확인할 수 있습니다.\n세션키: " + sessionkey);
            
            location.href = "index.html";
            $.ajax({
                    url: "http://localhost:9000/function/all/" + sessionkey,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (request, status, error) {
                        console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                    }
                });
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                
                // // 비동기식으로 localhost:9000/function/pose/{sessionkey}를 get 방식으로 호출
            // Reset for the next recording
            combinedChunks = [];
        }
    });
        
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

        

        async function sendVideoToServer() {
            const recordingEndTime = Date.now();
            const durationInSeconds = (recordingEndTime - recordingStartTime) / 1000;
            const blob = new Blob(combinedChunks, { 'type' : 'video/mp4' });
        
            // Blob 데이터 로컬에서 재생하여 확인
            const url = URL.createObjectURL(blob);
            videoPlayer.src = url;
            showVideoElement(videoPlayer);
            hideVideoElement(liveVideoFeed);
            wavesurfer.load(url);
        
            if (!validateFile(new File([blob], 'video_recording.mp4', { type: 'video/mp4' }))) {
                console.error('Invalid file format or size.');
                return;
            }
        
            const formData = new FormData();
            const videoFilename = 'video_recording.mp4';
            formData.append('file', new File([blob], videoFilename, {type: 'video/mp4'}), videoFilename);
            formData.append('user_name', sessionkey);
            formData.append('duration', durationInSeconds.toString());
        
            console.log('Sending video to server...');
        
            $.ajax({
                type: 'POST',
                url: 'http://localhost:9000/function/audio/',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    console.log('Video and audio sent successfully:', response);
                },
                error: function(xhr, status, error) {
                    console.error('Error sending video and audio:', xhr.responseText, status, error);
                }
            });
        }

        $('#recordButton').click(function() {
            if (!mediaRecorder || mediaRecorder.state === 'inactive') {

                imageCaptureInterval = setInterval(function() {
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    canvas.width = 640;
                    canvas.height = 480;
                    ctx.drawImage(liveVideoFeed, 0, 0, canvas.width, canvas.height);
                    
                    // Convert canvas data to a Blob
                    canvas.toBlob(function(blob) {
                        var currentDatetime = new Date();
                        var formattedDatetime = currentDatetime.toISOString().replace(/[:.]/g, "-");
                        var filename = "captured_image_" + formattedDatetime + ".jpg";
                        var user_name = sessionkey;
                        console.log(user_name);

                        var formData = new FormData();
                        formData.append('file', blob, filename);
                        
                        formData.append('user_name', user_name);  // Add the user name
                        
                        // Send the image data to the server using AJAX
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:9000/function/files/",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function(response) {
                                console.log("Image sent successfully:", response);
                            },
                            error: function(error) {
                                console.error("Error sending image:", error);
                            }
                        });
                    }, 'image/jpeg');
                }, 1000);

                navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                    .then(stream => {
                        liveVideoFeed.srcObject = stream;
                        $('#videoPlaceholder').hide();
                        showVideoElement(liveVideoFeed);

                        mediaRecorder = new MediaRecorder(stream);
                        mediaRecorder.start();
                        recordingStartTime = Date.now();
                        timerInterval = setInterval(updateRecordingTimer, 100);

                        mediaRecorder.ondataavailable = event => {
                            combinedChunks.push(event.data);
                        };

                        mediaRecorder.onstop = () => {
                            clearInterval(timerInterval);
                            sendVideoToServer();
                            // sendAudioToServer();
                            
                        };
                        $(this).text('녹음 중지');  // 버튼 텍스트 변경: 'Stop Recording'
                    }).catch(error => {
                        console.error('Error accessing media devices:', error);
                    });
            } else {
                mediaRecorder.stop();
                clearInterval(timerInterval);
                clearInterval(imageCaptureInterval); // 클리어
                hideVideoElement(liveVideoFeed);
                hideVideoElement(videoPlayer);
                $('#videoPlaceholder').show();
                $(this).text('녹음 시작');  // 버튼 텍스트 변경: 'Start Recording'
            }
        });
    });
})(jQuery);
