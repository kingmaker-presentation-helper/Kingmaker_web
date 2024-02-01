(function ($) {
    "use strict";

    var sessionkey;

    async function getSessionKey() {
        try{
            const response = await $.ajax({
                url:"http://43.200.201.188:9000/function/sessionkey",
                type:"GET",
                dataType:"json",
            });
            console.log('sessionkey assign success');
            return response.sessionkey;
        } catch(error){
            console.log("Error getting session key:", error);
            throw error;
        }
    }

    async function execute_sessionkey() {
        try {
            const sessionkey = await getSessionKey();

            localStorage.setItem('sessionkey', sessionkey);
            console.log('sessionkey execute_sessionkey: ', sessionkey);

            return sessionkey;
        } catch (error){
            console.error('Error in execute_sessionkey:', error);
            throw error;
        }
    }
    

    $(document).ready(async function() {
        // 캘린더
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

        // execute_sessionkey();
        sessionkey = await execute_sessionkey();
        console.log('sessionkey localstorage.getitem:', sessionkey);
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

    // // 발표 시작하기 버튼: 발표 제목, 키워드, 발표 날짜 localStorage로 넘기기 및 발표 연습으로 넘어가기
    // $('#next').on('click', function(){
    function afterUpload() {
        // 다음 페이지로 넘겨줄 데이터 선언
        var userData;
        var selectedDate = $('#calender').datetimepicker('date');
        var month = selectedDate.format('M');
        var day = selectedDate.format('D');
        var title = $('#floatingInput').val();
        var keyword = $('#floatingTextarea').val();

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

    $('#pptUploadForm').submit(function(event) {
        
        var title = $('#floatingInput').val();
        var keyword = $('#floatingTextarea').val();

        if(title.trim() === "" || keyword.trim() === ""){
            alert("발표 제목, 주요 키워드를 입력해주세요.");
        }
        
        event.preventDefault();
    
        const formData = new FormData(this);

        formData.append('user_name', sessionkey);
        console.log("sessionkey formdata append: ", sessionkey);
    
        $.ajax({
            url: 'http://43.200.201.188:9000/function/upload_ppt',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log('Image sent successfully:', data);

                afterUpload();
            },
            error: function(error) {
                console.error('Error uploading PPT: ', error);
            }
        });
    });


})(jQuery);