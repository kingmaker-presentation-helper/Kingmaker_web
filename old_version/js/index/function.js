(function ($) {
    "use strict";

    var session_key
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
        session_key = $('#session').val();
        if(session_key.trim() === ""){
            alert("세션 키를 입력해주세요.");
        } else {
            localStorage.setItem('session_key', session_key);
            window.location.href = 'expected_question.html';
        }
    });

    

})(jQuery);
