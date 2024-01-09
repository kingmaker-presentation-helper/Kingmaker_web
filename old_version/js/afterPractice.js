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



// 전역 변수 설정
var finalScore = 100;

var speedStandard = 110;

var finalScoreHighStandard = 60;
var finalScoreMiddleStandard = 40;


var fillerwordHighStandard = 10;
var fillerwordMiddleStandard = 5;

var pronunciationHighStandard = 70;
var pronunciationMiddleStandard = 50;



var highlightedHighStandard = 70;
var highlightedMiddleStandard = 50;

var EmMiddleStandard = 0.005;
var EmHighStandard = 0.1;
// 새로 추가된 전역 변수들
var standardWordsPerSecond = 1.7; //초당 발화 수의 기준
var pronunciationScoreMultiplier = 20; //발음 평가 점수에 곱하는 상수 
var highlightedScoreMultiplier = 1500;//em평가 점수에 곱하는 상수


const sessionkey = localStorage.getItem("sessionkey")
// const sessionkey = "test"

window.onload = async function() {
    await Promise.all([
    updateSpeed(),
    updateFillerword(),
    updatePronunciation(),
    updateHighlighted(),
    updatePose(),
    updateKeywords(),
    updateTextContent(),
    updateInfo(),
    ]);
    updateFinalScore();
};


async function updateSpeed() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:9000/function/speech_speed/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return;
    }

    const SpeedElement = document.getElementById("Speed");


    if (data && SpeedElement) {
        const standardWordsPerSecond = 1.7;
        const percentage = (data.words_per_second / standardWordsPerSecond) * 100;

        var colorClass = 'bg-primary';
        var textContent = "말하는 속도가  적당해요. 청중과 잘 소통하고 있어요!";
        var progressValue = 100;
        if (percentage <= speedStandard - 10) {
            colorClass = 'bg-warning';
            textContent = "조금 느긋한 편이네요. 천천히 말하는 것도 좋지만, 조금만 속도를 높여보는 건 어떨까요?";
            progressValue = 50;
            finalScore -= 10;
        }
        
        if (percentage >= speedStandard + 10) {
            colorClass = 'bg-danger';
            textContent = "빠르게 말하고 있어요! 열정이 느껴지지만, 청중이 따라갈 수 있도록 속도를 조금 줄여보세요.";
            progressValue = 50;
            finalScore -= 10;
        }

        SpeedElement.className = `card text-white ${colorClass} h-100`;
        SpeedElement.querySelector('.card-title').innerText = `${percentage.toFixed(2)}%`;
        SpeedElement.querySelector('.card-text').innerText = textContent;
        SpeedElement.querySelector('.additional-info').innerText = `1초에 ${data.words_per_second.toFixed(2)}번의 단어를 발화했습니다`;

        const speedProgress = document.getElementById("speed-progress");
        const speedPercentage = document.getElementById("speed-percentage");
        // speedPercentage.innerText = `${percentage.toFixed(2)}%`;
        speedProgress.style.width = `${progressValue}%`;
        speedProgress.setAttribute("aria-valuenow", percentage);
        speedProgress.className = `progress-bar ${colorClass}`;
    }
}



async function updateFillerword() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:9000/function/fillerword/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return;
    }

    if (data) {
        let total = 0;
        for (const key in data) {
            total += data[key];
        }

        let details = "";
        for (const key in data) {
            details += `${key}: ${data[key]}번\n`;
        }

        const fillerwordElement = document.getElementById("fillerword");
        const fillerwordProgress = document.getElementById("fillerword-progress");
        const fillerwordPercentage = document.getElementById("fillerword-percentage");

        var colorClass, textContent, progressBarValue;
        if (total <= fillerwordMiddleStandard) {
            colorClass = 'bg-primary';
            textContent = "필러워드 사용이 적어요. 좋습니다!";
            progressValue = 100;
        } else if (total <= fillerwordHighStandard) {
            colorClass = 'bg-warning';
            textContent = "필러워드 사용이 보통입니다. 개선이 가능해요!";
            progressValue = 100 - total*6.5;
            finalScore -= 5;
        } else {
            colorClass = 'bg-danger';
            textContent = "필러워드 사용이 많습니다. 주의가 필요해요!";
            progressBarValue = 25;
            finalScore -= 10;
        }

        fillerwordElement.querySelector('.card-title').innerText = total + "개";
        fillerwordElement.querySelector('.card-text').innerText = textContent;
        fillerwordElement.querySelector('.additional-info').innerText = details.trim();

        fillerwordProgress.className = `progress-bar ${colorClass}`;
        fillerwordElement.className = `card text-white ${colorClass} h-100`;

        // fillerwordPercentage.innerText = `${progressBarValue.toFixed(2)}%`;
        fillerwordProgress.style.width = `${progressValue}%`;
        fillerwordProgress.setAttribute("aria-valuenow", progressBarValue);
    }
}



async function updatePronunciation() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:9000/data/pronunciation/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return;
    }

    if (data) {
        const score = data * pronunciationScoreMultiplier;

        const pronunciationElement = document.getElementById("pronunciation");
        const pronunciationProgress = document.getElementById("pronunciation-progress");
        const pronunciationPercentage = document.getElementById("pronunciation-percentage");

        var colorClass, textContent, progressBarValue;
        if (score >= pronunciationHighStandard) {
            colorClass = 'bg-primary';
            textContent = "발음이 매우 좋아요!";
            progressBarValue = 100;
        } else if (score >= pronunciationMiddleStandard) {
            colorClass = 'bg-warning';
            textContent = "발음이 보통입니다. 개선가능해요!";
            progressBarValue = score;
            finalScore -= 5;
        } else {
            colorClass = 'bg-danger';
            textContent = "발음이 개선이 필요해요!";
            progressBarValue = 25;
            finalScore -= 10;
        }

        pronunciationElement.querySelector('.card-title').innerText = score.toFixed(2) + "점";
        pronunciationElement.querySelector('.card-text').innerText = textContent;
        pronunciationElement.querySelector('.additional-info').innerText = "평균점수는 50점 이에요";

        pronunciationProgress.className = `progress-bar ${colorClass}`;
        pronunciationElement.className =`card text-white ${colorClass} h-100`;

        // pronunciationPercentage.innerText = `${progressBarValue.toFixed(2)}%`;
        pronunciationProgress.style.width = `${progressBarValue}%`;
        pronunciationProgress.setAttribute("aria-valuenow", progressBarValue);
    }
}


async function updateHighlighted() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:9000/data/highlight/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return;
    }

    if (data) {
        const sortedWords = data.comparison_words.sort((a, b) => b.em_score - a.em_score);
        const topWords = sortedWords.slice(0, 3); // 상위 3개 단어 선택

        const averageEmScore = topWords.reduce((sum, word) => sum + word.em_score, 0) / topWords.length;
        const score = averageEmScore.toFixed(4) * highlightedScoreMultiplier;

        const wordsList = topWords.map(word => word.word).join(", ");

        const highlightedElement = document.getElementById("highlighted");
        const highlightedProgress = document.getElementById("highlighted-progress");
        const highlightedPercentage = document.getElementById("highlighted-percentage");

        var colorClass, textContent, progressBarValue;
        if (score >= highlightedHighStandard) {
            colorClass = 'bg-primary';
            textContent = "키워드를 매우 잘 강조했어요!";
            progressBarValue = 100;
        } else if (score >= highlightedMiddleStandard) {
            colorClass = 'bg-warning';
            textContent = "키워드를 적당히 강조했어요!";
            progressBarValue = score;
            finalScore -= 5;
        } else {
            colorClass = 'bg-danger';
            textContent = "키워드 강조가 부족해요. 개선이 필요합니다!";
            progressBarValue = 25;
            finalScore -= 10;
        }

        highlightedElement.querySelector('.card-title').innerText = score.toFixed(2) + "점";
        highlightedElement.querySelector('.card-text').innerText = textContent;
        
        // .additional-info에 부드럽게 업데이트
        highlightedElement.querySelector('.additional-info').innerText = `특히 '${wordsList}'에 대한 언급이 두드러졌어요. 관련 내용을 잘 전달하고 있네요!`;

        highlightedProgress.className = `progress-bar ${colorClass}`;
        highlightedElement.className = `card text-white ${colorClass} h-100`;

        // highlightedPercentage.innerText = `${progressBarValue.toFixed(2)}%`;
        highlightedProgress.style.width = `${progressBarValue.toFixed(2)}%`;
        highlightedProgress.setAttribute("aria-valuenow", progressBarValue);
    }
}



async function updatePose() {
    let images;
    try {
        const response = await fetch(`http://127.0.0.1:9000/data/pose/${sessionkey}?session_key=${sessionkey}`);
        images = await response.json();
        // console.log("받은 데이터:", images);
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return;
    }

    const carouselInner = document.querySelector('.carousel-inner');
    const carouselIndicators = document.querySelector('.carousel-indicators');

    if (images && images.length > 0) {
        images.forEach((image, index) => {
            const imageUrl = `http://127.0.0.1:9000/data/download/pose/${sessionkey}/${image}`;

            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            if (index === 0) carouselItem.classList.add('active');

            const img = document.createElement('img');
            img.src = imageUrl;
            img.className = 'd-block w-100';
            carouselItem.appendChild(img);

            // 캐러셀 캡션 추가
            const caption = document.createElement('div');
            caption.className = 'carousel-caption d-none d-md-block';
            // caption.innerHTML = `
            //     <h5>Slide ${index + 1}</h5>
            //     <p>Some representative placeholder content for slide ${index + 1}.</p>
            // `;
            carouselItem.appendChild(caption);

            const indicator = document.createElement('button');
            indicator.setAttribute('type', 'button');
            indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
            indicator.setAttribute('data-bs-slide-to', index);
            if (index === 0) indicator.classList.add('active');

            carouselInner.appendChild(carouselItem);
            carouselIndicators.appendChild(indicator);
        });
    }
}



async function updateKeywords() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:9000/data/highlight/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
        // console.log("받은 데이터: " + data);
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return;
    }

    if (data && data.comparison_words) {
        data.comparison_words.forEach((item, index) => {
            // 각 카드에 대한 참조를 얻음
            const card = document.getElementById(`card${index + 1}`);
            if (card) {
                // 카드 제목 (단어) 설정
                card.querySelector('.card-title').innerText = item.word;

                // 카드 배경색 설정
                let cardClass = 'bg-danger'; // 낮은 em_score (기본값)
                finalScore -= 4;
                if (item.em_score > 0.005) {
                    cardClass = 'bg-warning'; // 중간 em_score
                    finalScore += 2;
                } 
                if (item.em_score > 0.01) {
                    cardClass = 'bg-primary'; // 높은 em_score
                    finalScore += 4;
                }

                // 기존 클래스를 제거하고 새 클래스를 추가
                card.className = `card text-white ${cardClass} h-100`;

                // 추가 정보 설정
                card.querySelector('.additional-info').innerText = `발표하면서 ${item.match_count}번 언급했어요!`;

            }
        });
    }
}
async function updateTextContent() {
    try {
        // 올바른 API 호출
        const response = await fetch(`http://127.0.0.1:9000/data/paragraph/${sessionkey}?session_key=${sessionkey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json(); // JS
        const obj = JSON.parse(data);

        console.log(data);
        console.log(data['결론']);
        // 서론, 본론, 결론의 텍스트를 각 섹션에 할당
        document.getElementById("intro").innerText = obj.서론 || '서론 내용이 없습니다.';
        document.getElementById("main_text").innerText = obj.본론 || '본론 내용이 없습니다.';
        document.getElementById("conclusion").innerText = obj.결론 || '결론 내용이 없습니다.';
    } catch (error) {
        console.error('텍스트 데이터를 가져오는데 실패했습니다.', error);
    }
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// 다운로드 버튼 이벤트 리스너
document.getElementById("download-btn").addEventListener("click", function() {
    // 서론, 본론, 결론 텍스트를 결합
    const textToDownload = document.getElementById("intro").innerText + "\n\n" + 
                           document.getElementById("main_text").innerText + "\n\n" + 
                           document.getElementById("conclusion").innerText;

    // 다운로드 함수 호출
    download("presentation.txt", textToDownload);
});



async function updateInfo() {
    try {
        const response = await fetch(`http://127.0.0.1:9000/data/info/${sessionkey}?session_key=${sessionkey}`);
        const userDataString = await response.text(); // 텍스트 형식으로 데이터 받기
        const userDataParsed = JSON.parse(userDataString); // 첫 번째 파싱
        const userData = JSON.parse(userDataParsed); // 두 번째 파싱

        // HTML 요소에 서버로부터 받은 데이터를 설정합니다.
        document.getElementById("presentation-title").innerText = userData.title || "제목 없음";
        document.getElementById("presentation-date").innerText = userData.month ? `${userData.month}월 ${userData.day}일` : "날짜 없음";
        document.getElementById("presentation-keywords").innerText = userData.keyword || "키워드 없음";
        document.getElementById("presentation-ppt").innerText = userData.ppt === 'True' ? "사용함" : "사용하지 않음";
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);

        // 오류 발생 시 기본 텍스트로 설정
        document.getElementById("presentation-title").innerText = "제목 없음";
        document.getElementById("presentation-date").innerText = "날짜 없음";
        document.getElementById("presentation-keywords").innerText = "키워드 없음";
        document.getElementById("presentation-ppt").innerText = "정보 없음";
    }
}

function updateFinalScore() {
    var finalScoreDisplay = document.getElementById("final-score-display");
    var finalScoreCardHeader = document.getElementById("final-score-header");
    var finalScoreMessage = document.querySelector('.card-body .lead');

    if (finalScoreDisplay && finalScoreCardHeader && finalScoreMessage) {
        finalScoreDisplay.innerHTML = finalScore + "<span class='score-unit'>점</span>"; // 숫자와 '점'을 각각 표시

        finalScoreCardHeader.classList.remove("bg-primary", "bg-warning", "bg-danger");

        if (finalScore >= finalScoreHighStandard) {
            finalScoreCardHeader.classList.add("bg-primary");
            finalScoreMessage.textContent = "훌륭합니다! 아주 잘 하셨어요!";
        } else if (finalScore >= finalScoreMiddleStandard) {
            finalScoreCardHeader.classList.add("bg-warning");
            finalScoreMessage.textContent = "좋은 시도였어요! 조금 더 연습하면 더 좋아질 거예요!";
        } else {
            finalScoreCardHeader.classList.add("bg-danger");
            finalScoreMessage.textContent = "노력한 흔적이 보여요! 계속 연습하면 더 좋아질 수 있습니다!";
        }
    }
}

  