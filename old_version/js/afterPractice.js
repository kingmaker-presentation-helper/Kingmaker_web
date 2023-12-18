// const sessionkey = localStorage.getItem("session_key")
const sessionkey = "test"

window.onload = function() {
    updateDuration();
    updateFillerword();
    updatePronunciation();
    updateHighlighted();

};

async function updateDuration() {
    let data; // 'data' 변수를 외부에 선언
    try {
        // 'sessionkey' 변수를 URL에 동적으로 삽입
        const response = await fetch(`http://127.0.0.1:9000/data/duration/${sessionkey}?session_key=${sessionkey}`);
        data = await response.json();
    } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
        return; // 오류 발생 시 함수 실행 중단
    }

    const durationElement = document.getElementById("duration");

    // 'data' 변수를 사용하여 요소의 텍스트 업데이트
    if (data && durationElement) {
        durationElement.querySelector('.card-title').innerText = data + "%";
        durationElement.querySelector('.card-text').innerText = "평균보다 " + data + "% 빠르게 말해요";
        durationElement.querySelector('.additional-info').innerText = "새로운 추가 정보";
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

    const fillerwordElement = document.getElementById("fillerword");
    if (data && fillerwordElement) {
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
        fillerwordElement.querySelector('.card-title').innerText = total + "개";
        fillerwordElement.querySelector('.card-text').innerText = "평균보다 필러워드를 자주 사용해요";
        fillerwordElement.querySelector('.additional-info').innerText = details.trim();
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

    const pronunciationElement = document.getElementById("pronunciation");

    // 'data' 변수를 사용하여 요소의 텍스트 업데이트
    if (data && pronunciationElement) {
        pronunciationElement.querySelector('.card-title').innerText = data * 20 + "점";
        pronunciationElement.querySelector('.card-text').innerText = "평균보다 " + data + "% 빠르게 말해요";
        pronunciationElement.querySelector('.additional-info').innerText = "평균점수는 50점 이에요";
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

        // 요소의 텍스트 업데이트
        highlightedElement.querySelector('.card-title').innerText = averageEmScore.toFixed(3)*100 + "점";
        highlightedElement.querySelector('.card-text').innerText = "키워드를 잘 강조했어요!";
        highlightedElement.querySelector('.additional-info').innerText = `${wordsList} 키워드를 위주로 발표했어요!`;
    }

}



