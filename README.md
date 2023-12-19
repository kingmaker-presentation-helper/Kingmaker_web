# Kingmaker Web


## Project Introduction

This presentation practice website was designed to assist individuals seeking feedback in their presentation rehearsals.

### Key Features

1. Presentation Recording: Upload recorded files to the server for analysis
2. Question Generation: Generate questions based on the content of the presentation.
4. Speech analysis: Analyze speech speed, filler words, pronunciation accuracy, and emphasized keywords.
5. Gesture Analysis: Analyze presentation gestures to select engaging movements for capturing the audience's attention.
6. Presentation Review: View or save recorded video and transcribed speech.

### Project Inception

Existing presentation rehearsal tools lacked comprehensive feedback features, offering only video recording or basic transcription. To enhance presentation practice efficiency, the goal is to create a tool that not only records and transcribes but also analyzes and provides feedback on the presentation.

### How to Use this website
Refer to the wiki page for detailed instructions.

## Technologies Used and Team Introduction

### Technologies Used
1. backend
- [etri api](https://aiopen.etri.re.kr/)
- [gpt api](https://openai.com/blog/openai-api)
- [mideapipe api](https://developers.google.com/mediapipe/api/solutions)
2. frontend
- [DASHMIN template](https://themewagon.com/themes/dashmin-responsive-free-bootstrap-5-html5-admin-dashboard-template/)
- [Bootstrap 5 framework](https://getbootstrap.kr/docs/5.0/getting-started/introduction/)
- [Font Awesome framework](https://fontawesome.com/)

### Team Introduction
1. 김세중 rlatpwnd0049@naver.com
2. 송윤수 harry7292@gachon.ac.kr
3. 이지해 haeye2014@gachon.ac.kr


# wiki
github wiki는 private repository에서 생성 불가
repository를 public으로 수정한 다음에 복붙하기

# Kingmaker Web
wiki

## 목차
1. 페이지별 가이드
2. 기능별 사용한 기술


## 페이지별 가이드

# 메인페이지

1) 사용자의 기록을 보여준다. (미구현)
2) 발표에 도움이 되는 유튜브 영상을 추천한다.
3) 일정 알림과 달력을 통해 사용자의 발표 일정을 확인한다. (미구현)
4) '발표 연습하러 가기', 혹은 좌측의 '연습 시작'을 눌러 준비페이지로 넘어간다.
5) '결과 확인하기'에서 세션키를 입력하고 '연습결과 확인하기' 버튼을 눌러 질문페이지로 넘어간다.

# 준비페이지

1) '발표 제목', '주요 키워드'에 연습할 발표에서 해당하는 정보를 입력한다.
2) '달력'에서 발표 날짜를 선택하면 하단의 '발표 예정일'에서 확인할 수 있다.
3) 발표 시 보여줄 자료나 대본이 있는 경우 파일을 선택해 업로드할 수 있다.
4) '발표연습 시작하기' 버튼을 눌러 세션키를 생성하고 입력한 정보를 저장한다. 이후 연습 페이지로 넘어간다.

# 연습페이지

1) 준비페이지에서 입력한 발표의 제목과 예정일을 확인할 수 있다.
2) '녹화 시작' 버튼을 눌러 녹화를 시작하며, 발표가 끝나면 '녹음 중지' 버튼을 눌러 녹화를 종료할 수 있다. 이후 '재생' 버튼을 눌러 녹화한 영상을 볼 수 있다.
3) '연습 종료' 버튼을 눌러 결과를 확인할 수 있는 세션키를 발급받고 메인페이지로 복귀한다.

# 질문페이지

1) 발표에서의 발언을 분석해 실제 발표에서 받을 수 있는 질문을 생성한다.
2) 실제 질문을 받듯이 질문은 커서를 통해 하나씩 확인할 수 있다.

# 분석페이지

1) '발표 정보'에서는 발표 제목과 발표 예정 날짜, 주요 키워드, 발표자료 사용 여부 등을 확인한다.
2) '최종점수'에서는 각각의 기준에 따라 평가한 4가지 항목을 종합적으로 판단하여 점수를 계산한다.
3) 'Progress Tracker'에서 각 항목의 점수를 직관적으로 확인할 수 있게 한다.
4) '발표영상 다시보기'에서 연습 영상을 다시 볼 수 있으며, 다운로드할 수 있다.
5) '키워드 강조 확인'에서는 연습한 발표의 키워드를 찾아내고, 얼마나 언급했는지 알린다.
6) '제스쳐 다시보기'에서는 청중의 주목을 끄는 동작을 찾아내 나열한다.
7) '발표 문장 다시보기'에서는 어떤 말을 했는지 적혀 있으며, 다운로드 가능하다.


## 기능별 사용한 기술

