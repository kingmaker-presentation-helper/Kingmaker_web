(function($){
    "use strict";

    var session = localStorage.getItem('session_key');
    if(session === null) {
        alert("세션이 만료되었습니다.");
        window.history.back();
    }
    localStorage.removeItem('session_key');
    console.log('session: '+session);

    // 분석 결과 보러가기 버튼
    $('#result').on('click', function(){
        localStorage.setItem('session_key', session);
        window.location.href="after_practice.html";
    })

})(jQuery);