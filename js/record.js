(function ($) {
    "use strict";

    $(document).ready(function() {


        /***************** AWS 설정 *****************/
        AWS.config.update({
            accessKeyId: '',
            secretAccessKey: ''
        });
        AWS.config.region = 'ap-northeast-2'; // 원하는 리전 설정

        // S3 인스턴스 생성
        var s3 = new AWS.S3({apiVersion: '2006-03-01'});

        // 사용자 ID 설정 (임시로 'king'으로 설정)
        const userId = 'king';

        // 파일 업로드 함수
        function uploadFileToS3(file, userId) {
            // 폴더 내 파일 수 확인
            s3.listObjects({Bucket: 'kingmaker-s3-bucket', Prefix: `${userId}/`}, function(err, data) {
                if (err) {
                    console.log("Error", err);
                    return;
                }

                // 새 파일 ID 생성
                const fileNumber = data.Contents.length + 1;

                // 파일 경로 설정
                var filePath = `${userId}/${fileNumber}_example.mp4`;

                var params = {
                    Bucket: 'kingmaker-s3-bucket', 
                    Key: filePath, 
                    Body: file
                };

                // 파일 업로드
                s3.upload(params, function(uploadErr, uploadData) {
                    if (uploadErr) {
                        console.log("Error", uploadErr);
                    } if (uploadData) {
                        console.log("Upload Success", uploadData.Location);
                    }
                });
            });
        }





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


                            // Blob을 파일로 변환하여 S3에 업로드
                            const audioFile = new File([blob], "audio_recording.mp4", {type: "video/mp4"});
                            uploadFileToS3(audioFile, userId);
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
