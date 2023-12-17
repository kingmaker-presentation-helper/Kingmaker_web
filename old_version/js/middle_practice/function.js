(function ($) {
    "use strict";
    var userDataString = localStorage.getItem('userData');
    var userData = JSON.parse(userDataString);
    // userData 내용물
    // userData = {
    //     month: 월,
    //     day: 일,
    //     title: 제목,
    //     keyword: 키워드
    //     ppt: ppt 유무
    // };
    if(userDataString){
        // ppt 업로드 안했으면 ppt 부분 삭제합니다.
        var isppt = userData.ppt;
        if(!isppt){$('#ppt').remove();}

        $("#title").text(userData.title);
        $('#date').text(userData.month+'월 '+userData.day+'일');
        localStorage.removeItem('userData');
        console.log('날짜: '+userData.month+'월 '+userData.day+'일\n제목: '
            +userData.title+' 키워드: '+userData.keyword+'\nppt 유무: '+isppt);
    }
    else{
        alert("발표 데이터가 없습니다!");
        window.history.back();
    }

    $('#endButton').on('click', function(){
        isppt = userData.ppt;
        // ppt 포함 여부를 다시 after practice로 보냅니다.
        localStorage.setItem('isppt', isppt.toString());
        window.location.href='after_practice.html';
    })


})(jQuery);