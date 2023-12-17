(function ($) {
    "use strict";

    $(document).ready(function() {
        // 영상 및 오디오 로딩 시작 시 로딩 인디케이터 표시
        $('#loadingIndicator').show();
        // WaveSurfer 초기화
        let wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple',
            barWidth: 3,
            barHeight: 4,
        });

        let videoPlayer = document.getElementById('videoPlayback');

        // 파일 경로 (미리 정의된 경로 또는 서버에서 받아온 경로)
        const filePath = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

        // 영상과 웨이브폼 로드
        videoPlayer.src = filePath;
        wavesurfer.load(filePath);

        // 시간 포맷팅 함수
        function formatTime(time) {
            let minutes = Math.floor(time / 60);
            let seconds = Math.floor(time % 60);
            let milliseconds = Math.floor((time % 1) * 100);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
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

            $('#loadingIndicator').hide();


            waveformContainer.addEventListener('click', function(event) {
                const clickPosition = (event.clientX - waveformContainer.getBoundingClientRect().left) / waveformContainer.clientWidth;
                const time = clickPosition * videoPlayer.duration;

                if (isFinite(time) && videoPlayer.readyState >= 2) {
                    videoPlayer.currentTime = time;
                }
            });
        });

        // 비디오 재생 버튼 클릭 이벤트 처리
        $('#playButton').click(function() {
            const isPlaying = wavesurfer.isPlaying();
            const isVideoPlaying = !videoPlayer.paused;

            if (isPlaying || isVideoPlaying) {
                wavesurfer.pause();
                videoPlayer.pause();
                $(this).text('재생');  // 버튼 텍스트를 'Play'로 변경
            } else {
                if (videoPlayer.readyState !== 0) {
                    videoPlayer.play();
                }
                wavesurfer.play();
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

    });
})(jQuery);
