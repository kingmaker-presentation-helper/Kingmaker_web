// 전역 변수 설정
var durationStandard = 110;


var fillerwordHighStandard = 10;
var fillerwordMiddleStandard = 5;

var pronunciationHighStandard = 80;
var pronunciationMiddleStandard = 60;

var highlightedHighStandard = 0.01;
var highlightedMiddleStandard = 0.005;




// const sessionkey = localStorage.getItem("session_key")
const sessionkey = "test"

window.onload = function() {
    updateDuration();
    updateFillerword();
    updatePronunciation();
    updateHighlighted();
    updatePose();
    updateKeywords();
};

// async function updateDuration() {
//     let data; // 'data' 변수를 외부에 선언
//     try {
//         // 'sessionkey' 변수를 URL에 동적으로 삽입
//         const response = await fetch(`http://127.0.0.1:9000/data/duration/${sessionkey}?session_key=${sessionkey}`);
//         data = await response.json();
//     } catch (error) {
//         console.error('데이터를 가져오는데 실패했습니다.', error);
//         return; // 오류 발생 시 함수 실행 중단
//     }

//     const durationElement = document.getElementById("duration");

//     // 'data' 변수를 사용하여 요소의 텍스트 업데이트
//     if (data && durationElement) {

//         const speedPercentage = document.getElementById("speed-percentage");
//         const speedProgress = document.getElementById("speed-progress");
//         // 카드 
//         durationElement.querySelector('.card-title').innerText = data + "%";
//         durationElement.querySelector('.card-text').innerText = "평균보다 " + data + "% 빠르게 말해요";
//         durationElement.querySelector('.additional-info').innerText = "새로운 추가 정보";
//         // 프로그레스 바 
//         speedPercentage.innerText = data + "%";
//         speedProgress.style.width = data + "%";
//         speedProgress.setAttribute("aria-valuenow", data);



//         // 색상 업데이트
//         var colorClass = 'bg-danger';
//         if (data >= durationMiddleStandard) colorClass = 'bg-warning';
//         if (data >= durationHighStandard) colorClass = 'bg-primary';
//         speedProgress.className = `progress-bar ${colorClass}`;
//         durationElement.className =`card text-white bg-primary h-100 ${colorClass}`;
//     }
// }

async function updateDuration() {
    let data; // 'data' 변수를 외부에 선언
    try {
        // 'sessionkey' 변수를 URL에 동적으로 삽입
        const response = await fetch(`http://127.0.0.1:9000/function/speech_speed/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return; // 오류 발생 시 함수 실행 중단
    }

    const durationElement = document.getElementById("duration");

    // 'data' 변수를 사용하여 요소의 텍스트 업데이트
    if (data && durationElement) {
        // 초당 단어 수에 따른 백분율 계산
        const standardWordsPerSecond = 1.7;
        const percentage = (data.words_per_second / standardWordsPerSecond) * 100;

        // 카드 및 프로그레스 바 업데이트
        durationElement.querySelector('.card-title').innerText = `${percentage.toFixed(2)}%`;
        durationElement.querySelector('.card-text').innerText = "빠르게 말해요";
        durationElement.querySelector('.additional-info').innerText = `1초에 ${data.words_per_second.toFixed(2)}번의 단어를 발화했습니다`;

        const speedProgress = document.getElementById("speed-progress");
        speedProgress.style.width = `${percentage}%`;
        speedProgress.setAttribute("aria-valuenow", percentage);

        // 색상 업데이트(90~110 평균, 90이하 느림, 110이상 빠름. 기준 초당 단어 1.7번)
        var colorClass = 'bg-primary';
        var textContent = "평균적인 속도로 발화해요.";
        if (percentage <= durationStandard - 10) 
        {
            colorClass = 'bg-warning';
            textContent = "평균보다 느리게 발화해요.";}

        if (percentage >= durationStandard + 10){
            colorClass = 'bg-danger';
            textContent = "평균보다 빠르게 발화해요.";
        } 



        speedProgress.className = `progress-bar ${colorClass}`;
        durationElement.className =`card text-white ${colorClass} h-100`;

        durationElement.querySelector('.card-title').innerText = `${percentage.toFixed(2)}%`;
        durationElement.querySelector('.card-text').innerText = textContent;
        durationElement.querySelector('.additional-info').innerText = `1초에 ${data.words_per_second.toFixed(2)}번의 단어를 발화했습니다`;
    }
}



async function updateFillerword() {
    let data; // 'data' 변수를 외부에 선언
    try {
        // 'sessionkey' 변수를 URL에 동적으로 삽입
        const response = await fetch(`http://127.0.0.1:9000/function/fillerword/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return; // 오류 발생 시 함수 실행 중단
    }

    if (data) {
        // 총합을 계산
        let total = 0;
        for (const key in data) {
            total += data[key];
        }
    
        // 개별 항목의 문자열을 생성
        let details = "";
        for (const key in data) {
            details += `${key}: ${data[key]}번\n`;
        }
    
        // 요소의 텍스트 업데이트
        const fillerwordElement = document.getElementById("fillerword");
        fillerwordElement.querySelector('.card-title').innerText = total + "개";
        fillerwordElement.querySelector('.card-text').innerText = "평균보다 필러워드를 자주 사용해요";
        fillerwordElement.querySelector('.additional-info').innerText = details.trim();
        // 필러워드 프로그레스 바 업데이트
        const fillerwordPercentage = document.getElementById("fillerword-percentage");
        const fillerwordProgress = document.getElementById("fillerword-progress");

        fillerwordPercentage.innerText = total + "%";
        fillerwordProgress.style.width = total + "%";
        fillerwordProgress.setAttribute("aria-valuenow", total);

        // 색상 업데이트
        var colorClass = 'bg-danger';
        if (total >= fillerwordMiddleStandard) colorClass = 'bg-warning';
        if (total >= fillerwordHighStandard) colorClass = 'bg-primary';
        fillerwordProgress.className = `progress-bar ${colorClass}`;
        fillerwordElement.className =`card text-white bg-primary h-100 ${colorClass}`;
    }
    
}


async function updatePronunciation() {
    let data; // 'data' 변수를 외부에 선언
    try {
        // 'sessionkey' 변수를 URL에 동적으로 삽입
        const response = await fetch(`http://127.0.0.1:9000/data/pronunciation/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return; // 오류 발생 시 함수 실행 중단
    }




    if (data) {
        /************************************************************* */
        const score = data * 20; // 점수 계산 예시
        /************************************************************* */

        // 'data' 변수를 사용하여 요소의 텍스트 업데이트
        const pronunciationElement = document.getElementById("pronunciation");
        pronunciationElement.querySelector('.card-title').innerText = score + "점";
        pronunciationElement.querySelector('.card-text').innerText = "평균보다 " + data + "% 빠르게 말해요";
        pronunciationElement.querySelector('.additional-info').innerText = "평균점수는 50점 이에요";

        // 발음점수 프로그레스 바 업데이트
        const pronunciationPercentage = document.getElementById("pronunciation-percentage");
        const pronunciationProgress = document.getElementById("pronunciation-progress");
        pronunciationPercentage.innerText = score + "%";
        pronunciationProgress.style.width = score + "%";
        pronunciationProgress.setAttribute("aria-valuenow", score);


         // 색상 업데이트
        var colorClass = 'bg-danger';
        if (score >= pronunciationMiddleStandard) colorClass = 'bg-warning';
        if (score >= pronunciationHighStandard) colorClass = 'bg-primary';
        pronunciationProgress.className = `progress-bar ${colorClass}`;
        pronunciationElement.className =`card text-white bg-primary h-100 ${colorClass}`;
    }
}

async function updateHighlighted() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:9000/data/highlight/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
        // console.log("받은 데이터:", data);
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return;
    }

    const highlightedElement = document.getElementById("highlighted");

    if (data && highlightedElement) {
        // em_score가 0이 아닌 항목 필터링
        const filteredWords = data.comparison_words.filter(word => word.em_score > 0);

        // 평균 em_score 계산
        const averageEmScore = filteredWords.reduce((sum, word) => sum + word.em_score, 0) / filteredWords.length;

        // em_score가 0이 아닌 단어들 목록 생성
        const wordsList = filteredWords.map(word => word.word).join(", ");

        /************************************************************* */
        const score = averageEmScore.toFixed(4) * 1000;
        /************************************************************* */

        // 요소의 텍스트 업데이트
        highlightedElement.querySelector('.card-title').innerText = score+ "점";
        highlightedElement.querySelector('.card-text').innerText = "키워드를 잘 강조했어요!";
        highlightedElement.querySelector('.additional-info').innerText = `${wordsList} 키워드를 위주로 발표했어요!`;



        // 키워드강조 프로그레스 바 업데이트
        const highlightedPercentage = document.getElementById("highlighted-percentage");
        const highlightedProgress = document.getElementById("highlighted-progress");
        highlightedPercentage.innerText = score + "%";
        highlightedProgress.style.width = score + "%";
        highlightedProgress.setAttribute("aria-valuenow", score);


        // 색상 업데이트
        var colorClass = 'bg-danger';
        if (score >= highlightedMiddleStandard) colorClass = 'bg-warning';
        if (score >= highlightedHighStandard) colorClass = 'bg-primary';
        highlightedProgress.className = `progress-bar ${colorClass}`;
        highlightedElement.className =`card text-white bg-primary h-100 ${colorClass}`;
    }

}


async function updatePose() {
    let images;
    try {
        const response = await fetch(`http://127.0.0.1:9000/data/pose/${sessionkey}?session_key=${sessionkey}`);
        images = await response.json();
        console.log("받은 데이터:", images);
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
            caption.innerHTML = `
                <h5>Slide ${index + 1}</h5>
                <p>Some representative placeholder content for slide ${index + 1}.</p>
            `;
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
                if (item.em_score > 0.005) {
                    cardClass = 'bg-warning'; // 중간 em_score
                } 
                if (item.em_score > 0.01) {
                    cardClass = 'bg-primary'; // 높은 em_score
                }

                // 기존 클래스를 제거하고 새 클래스를 추가
                card.className = `card text-white ${cardClass} h-100`;

                // 추가 정보 설정
                card.querySelector('.additional-info').innerText = `발표하면서 ${item.match_count}번 언급했어요!`;

            }
        });
    }
}