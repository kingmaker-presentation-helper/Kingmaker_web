(function ($) {
    "use strict";
    
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

    // Calender
    $(document).ready(function() {
        $('#calender').datetimepicker({
            inline: true,
            format: 'L'
        });

        $('#calender').on('change.datetimepicker', function(e) {
            console.log(e.date.format('YYYY-MM-DD'));
        })
    });



    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });

    // 연습 끝 (분석) 키워드 분석
    $(".slideKeyword").owlCarousel({
        autoplay: false,
        items: 1,
        smartSpeed: 1000,
        dots: true,
        loop: false,
        nav : false
    });

    // Pie Chart 사투리
    var dial = $("#dial").get(0).getContext("2d");
    var myChart5 = new Chart(dial, {
        type: "pie",
        data: {
            labels: ["경기", "충청", "강원", "전라", "경상"],
            datasets: [{
                backgroundColor: [
                    "rgba(0, 156, 255, .7)",
                    "rgba(0, 156, 255, .6)",
                    "rgba(0, 156, 255, .5)",
                    "rgba(0, 156, 255, .4)",
                    "rgba(0, 156, 255, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });

    // Pie Chart 발음
    var pron = $("#pron").get(0).getContext("2d");
    var myChart5 = new Chart(pron, {
        type: "pie",
        data: {
            labels: ["정확","부정확"],
            datasets: [{
                backgroundColor: [
                    "rgba(0, 156, 255, .7)",
                    "rgba(0, 156, 255, .6)",
                    "rgba(0, 156, 255, .5)",
                    "rgba(0, 156, 255, .4)",
                    "rgba(0, 156, 255, .3)"
                ],
                data: [78, 22]
            }]
        },
        options: {
            responsive: true
        }
    });



    async function fetchData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/items');
            const data = await response.json();
            updateUI(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    function updateUI(data) {

        const fastCheckElement = document.querySelector('#fastCheck h3');
        const DurationElement = document.querySelector('#wholeTime h3');
        const stopWordElement = document.querySelector('#stopWord h3');

        // 예를 들어, 'uid'가 '1'인 아이템의 'SpeechSpeed' 값을 찾기
        const item = data.items.find(item => item.uid === '1');
        if (item.SpeechSpeed) {
            fastCheckElement.textContent = `+${item.SpeechSpeed}%`;
        } else {
            fastCheckElement.textContent = '데이터 없음';
        }
        if (item.Duration) {
            DurationElement.textContent = `${item.Duration}초`;
        } else {
            DurationElement.textContent = '데이터 없음';
        }
        if (item.StopWord) {
            stopWordElement.textContent = `${item.StopWord}`;
        } else {
            stopWordElement.textContent = '데이터 없음';
        }
    }
    

    
    // 페이지 로드 시 데이터 가져오기
    window.onload = fetchData;

    
})(jQuery);

