(function($){
    "use strict";

    var sessionkey = localStorage.getItem('sessionkey');
    if(sessionkey === null) {
        alert("세션이 만료되었습니다.");
        window.history.back();
    }
    // localStorage.removeItem('sessionkey');
    console.log('sessionkey: '+sessionkey);

    // 분석 결과 보러가기 버튼
    $('#result').on('click', function(){
        localStorage.setItem('sessionkey', sessionkey);
        window.location.href="after_practice.html";
    });

    // 반복문으로 질문 1부터 15까지 자동으로 넣습니다.
    for (var i=1;i<=15;i++){
        $('#q'+i).text(i+"번째 질문");
    }

})(jQuery);