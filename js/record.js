(function ($) {
    "use strict";

    $(document).ready(function() {
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
            $('#playbackTimer').text(formatTime(currentTime));
        }
        
        // Waveform 클릭 이벤트 처리
        wavesurfer.on('ready', function() {
            const waveformContainer = document.querySelector('#waveform');
        
            waveformContainer.addEventListener('click', function(event) {
                const clickPosition = (event.clientX - waveformContainer.getBoundingClientRect().left) / waveformContainer.clientWidth;
                const time = clickPosition * videoPlayer.duration;
                
                videoPlayer.currentTime = time;
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

        // 녹음 버튼 클릭 이벤트 처리
        $('#recordButton').click(function() {
            if (!mediaRecorder || mediaRecorder.state === 'inactive') {
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
                            const blob = new Blob(combinedChunks, { 'type' : 'video/mp4' });
                            const url = URL.createObjectURL(blob);
                            videoPlayer.src = url;
                            showVideoElement(videoPlayer);
                            hideVideoElement(liveVideoFeed);
                            wavesurfer.load(url);
                            combinedChunks = [];
                        };
                        $(this).text('녹음 중지');  // 버튼 텍스트 변경: 'Stop Recording'
                    }).catch(error => {
                        console.error('Error accessing media devices:', error);
                    });
            } else {
                mediaRecorder.stop();
                clearInterval(timerInterval);
                hideVideoElement(liveVideoFeed);
                hideVideoElement(videoPlayer);
                $('#videoPlaceholder').show();
                $(this).text('녹음 시작');  // 버튼 텍스트 변경: 'Start Recording'
            }
        });
    });
})(jQuery);
