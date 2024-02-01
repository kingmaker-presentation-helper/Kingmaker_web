(function ($) {
    "use strict";

    // 툴팁용 HTML 요소 생성
    $('body').append('<div id="tooltip" style="position: absolute; display: none; background: #fff; border: 1px solid #000; padding: 5px;"></div>');

    $('#waveform').mousemove(function(e) {
        // 마우스 위치에 따른 주파수 정보 계산 (여기서는 단순 예시)
        let frequencyInfo = '주파수: ' + Math.random().toFixed(2) + ' Hz'; // 실제로는 해당 위치의 주파수 정보를 계산해야 함

        // 툴팁 위치 업데이트 및 표시
        $('#tooltip').css({ top: e.pageY + 5, left: e.pageX + 5 }).show().text(frequencyInfo);
    }).mouseout(function() {
        // 마우스가 벗어나면 툴팁 숨기기
        $('#tooltip').hide();
    });





    async function updateVideo() {
        let data;
        try {
            const response = await fetch(`http://0.0.0.0:9000/data/download/video/${sessionkey}?session_key=${sessionkey}`);
            data = await response.blob(); // Blob 객체로 변환
        } catch (error) {
            console.error('데이터를 가져오는데 실패했습니다.', error);
            return;
        }

        if (data) {
            return URL.createObjectURL(data);
        }
    }

    $(document).ready(async function() {
        // 영상 및 오디오 로딩 시작 시 로딩 인디케이터 표시
        $('#loadingIndicator').show();
        // WaveSurfer 초기화
        let wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            
            progressColor: 'purple',
            barWidth: 3,
            barHeight: 5,
            //아래부터 주파수 정밀도 관련 
            minPxPerSec: 50, //시각화 해상도
            backend: 'MediaElementWebAudio',
            fftSize: 1024 // 예시 값, 필요에 따라 조정 가능
            

        });

        let videoPlayer = document.getElementById('videoPlayback');
        videoPlayer.muted = true; // 비디오 플레이어의 오디오 뮤트
        
        // 파일 경로 (미리 정의된 경로 또는 서버에서 받아온 경로)
        // const filePath = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        // const filePath = localStorage.getItem("videoPath");
        // Object URL 사용
        const filePath = await updateVideo();

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
            console.log("WaveSurfer is ready."); 
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
    // 다운로드 버튼 클릭 이벤트 리스너
    $('#downloadButton').click(function() {
        const videoPath = filePath; // 실제 비디오 파일 경로를 여기에 입력하세요.
        const fileName = videoPath.split('/').pop(); // URL에서 파일 이름 추출

        // 다운로드를 위한 a 태그 생성 및 클릭 이벤트 발생
        let a = document.createElement('a');
        a.href = videoPath;
        a.download = fileName || 'download.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
    });
})(jQuery);
