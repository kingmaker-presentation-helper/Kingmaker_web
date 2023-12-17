(function ($) {
    "use strict";

    // Calender
    $(document).ready(function() {
        $('#calender').datetimepicker({
            inline: true,
            format: 'L',
            defaultDate: new Date()
        });

        var initialDate = $('#calender').data('datetimepicker').date();

        // 화면 로드시 오늘 날짜를 선택
        if (initialDate) {
            setDate(initialDate);
        }
        // 달력에서 날짜 선택하면 해당 날짜 출력
        $('#calender').on('change.datetimepicker', function(e) {
            setDate(e.date);
        })
    });
    // 선택한 날짜 저장하고 출력
    function setDate(date){
        $('#date').text('발표 예정일: '+date.format('M월 D일'));
        console.log('선택한 발표일: '+date.format('M월 D일'));
    }

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 3000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });
    var isppt = false;

    $('#pptFile').change(function(){
        var selectedFile = $(this).prop('files')[0];
        if(selectedFile){
            isppt = true;
            console.log("선택된 파일: "+selectedFile.name, isppt);
        } else{
            isppt = false;
            console.log("파일 선택하지 않음", isppt);
        }
    });

    // 발표 시작하기 버튼: 발표 제목, 키워드, 발표 날짜 localStorage로 넘기기 및 발표 연습으로 넘어가기
    $('#next').on('click', function(){

        // 다음 페이지로 넘겨줄 데이터 선언
        var userData;
        var selectedDate = $('#calender').datetimepicker('date');
        var month = selectedDate.format('M');
        var day = selectedDate.format('D');
        var title = $('#floatingInput').val();
        var keyword = $('#floatingTextarea').val();

        if(title.trim() === "" || keyword.trim() === ""){
            alert("발표 제목, 주요 키워드를 입력해주세요.");
        }
        else{
            userData = {
                month: month,
                day: day,
                title: title,
                keyword: keyword,
                ppt: isppt,
            };
            var jsonString = JSON.stringify(userData);
            localStorage.setItem('userData', jsonString);
            window.location.href='middle_practice.html';
        }
    });


})(jQuery);