// (function ($) {
//     var sessionkey = "";
//         $.ajax({
//             url: "http://localhost:9000/function/sessionkey",
//             type: "GET",
//             dataType: "json",
//             success: function(data) {
//                 sessionkey = data.sessionkey;
//                 console.log(sessionkey);
//             },
//             error: function(request, status, error) {
//                 console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
//             }
//         });
    
//     "use strict";
//     var userDataString = localStorage.getItem('userData');
//     var userData = JSON.parse(userDataString);
    
//     userData.sessionKey = sessionkey;
//     console.log(userData)
//     // userData 내용물
//     // userData = {
//     //     month: 월,
//     //     day: 일,
//     //     title: 제목,
//     //     keyword: 키워드
//     //     ppt: ppt 유무
//     // };
    
//     if(userDataString){
//         // ppt 업로드 안했으면 ppt 부분 삭제합니다.
//         var isppt = userData.ppt;
//         if(!isppt){$('#ppt').remove();}

//         $("#title").text(userData.title);
//         $('#date').text(userData.month+'월 '+userData.day+'일');
//         // localStorage.removeItem('userData');
//         console.log('날짜: '+userData.month+'월 '+userData.day+'일\n제목: '
//             +userData.title+' 키워드: '+userData.keyword+'\nppt 유무: '+isppt);
//         console.log(userDataString)
//         // userDataString의 타입 log
//         console.log(typeof(userDataString));
//         // localhost:9000/function/info로 post로 정보 전송
//         $.ajax({
//             url: 'http://localhost:9000/function/info/',  
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(userData), // userData를 JSON 문자열로 변환
//             success: function(data){
//                 console.log(data);
//             },
//             error: function(err){
//                 console.log(err);
//             }
//         });
//     }
//     else{
//         alert("발표 데이터가 없습니다!");
//         window.history.back();
//     }


    
// })(jQuery);

"use strict";

async function getSessionKey() {
    try {
        const response = await $.ajax({
            url: "http://localhost:9000/function/sessionkey",
            type: "GET",
            dataType: "json",
        });

        return response.sessionkey;
    } catch (error) {
        console.log("Error getting session key:", error);
        throw error; // 예외 처리를 원하는 방식으로 진행하거나 상위로 던집니다.
    }
}

async function main() {
    var sessionkey = await getSessionKey();
    console.log(sessionkey);

    var userDataString = localStorage.getItem('userData');
    var userData = JSON.parse(userDataString);

    userData.sessionKey = sessionkey;
    console.log(userData);

    // 이후에 userData를 사용하여 다른 작업 수행
    if(userDataString){
        // ppt 업로드 안했으면 ppt 부분 삭제합니다.
        var isppt = userData.ppt;
        if(!isppt){$('#ppt').remove();}

        $("#title").text(userData.title);
        $('#date').text(userData.month+'월 '+userData.day+'일');
        // localStorage.removeItem('userData');
        console.log('날짜: '+userData.month+'월 '+userData.day+'일\n제목: '
            +userData.title+' 키워드: '+userData.keyword+'\nppt 유무: '+isppt);
        console.log(userDataString)
        // userDataString의 타입 log
        console.log(typeof(userDataString));
        // localhost:9000/function/info로 post로 정보 전송
        $.ajax({
            url: 'http://localhost:9000/function/info/',  
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData), // userData를 JSON 문자열로 변환
            success: function(data){
                console.log(data);
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    else{
        alert("발표 데이터가 없습니다!");
        window.history.back();
    }
}


// main 함수 호출
main();