(function ($) {
    "use strict";

    var sessionkey
    // Calender
    $(document).ready(function() {
        $('#calender').datetimepicker({
            inline: true,
            format: 'L',
        });
    });

    // 발표 연습 하러가기 버튼
    $('#goPractice').on('click', function(){
        window.location.href = 'before_practice.html';
    });
    
    // 연습결과 확인하기 버튼
    $('#checkPractice').on('click', function(){
        sessionkey = $('#session').val();
        if(sessionkey.trim() === ""){
            alert("세션 키를 입력해주세요.");
        } else {
            localStorage.setItem('sessionkey', sessionkey);
            window.location.href = 'expected_question.html';
        }
    });

    

})(jQuery);
