(function ($) {
    "use strict";
    var userData = localStorage.getItem('userData')
    if(userData){
        var userDataString = userData;
        console.log('userData: '+userDataString);
    }
    else{
        alert("발표 데이터가 없습니다!");
    }


})(jQuery);