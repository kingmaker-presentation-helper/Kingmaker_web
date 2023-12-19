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
- [fast api](https://fastapi.tiangolo.com/ko/)
- [uvicorn](https://www.uvicorn.org/)
- [librosa](https://librosa.org/doc/latest/index.html)
- [Kiwi](https://github.com/bab2min/Kiwi)
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
2. 시스템 구조
3. 사용한 기술


## 페이지별 가이드

# 메인페이지

<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/e9dc33ff-5e6e-4917-a850-43af28913ced">
1) 사용자의 기록을 보여준다. (미구현)
2) 발표에 도움이 되는 유튜브 영상을 추천한다.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/8d3c5476-e9b3-442e-ae57-b7e8bc368d63">
3) 일정 알림과 달력을 통해 사용자의 발표 일정을 확인한다. (미구현)
4) '발표 연습하러 가기', 혹은 좌측의 '연습 시작'을 눌러 준비페이지로 넘어간다.
5) '결과 확인하기'에서 세션키를 입력하고 '연습결과 확인하기' 버튼을 눌러 질문페이지로 넘어간다.

# 준비페이지

<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/3817a8b3-3764-4e83-bbf2-ef424814b9bb">
1) '발표 제목', '주요 키워드'에 연습할 발표에서 해당하는 정보를 입력한다.
2) '달력'에서 발표 날짜를 선택하면 하단의 '발표 예정일'에서 확인할 수 있다.
3) 발표 시 보여줄 자료나 대본이 있는 경우 파일을 선택해 업로드할 수 있다.
4) '발표연습 시작하기' 버튼을 눌러 세션키를 생성하고 입력한 정보를 저장한다. 이후 연습 페이지로 넘어간다.

# 연습페이지
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/c4d2d54e-8ee6-4b29-bf7f-4a28029c7a91">
1) 준비페이지에서 입력한 발표의 제목과 예정일을 확인할 수 있다.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/86f993f3-b0d0-4299-aacf-b63b3c0aafbf">
2) '녹화 시작' 버튼을 눌러 녹화를 시작하며, 발표가 끝나면 '녹음 중지' 버튼을 눌러 녹화를 종료할 수 있다. 이후 '재생' 버튼을 눌러 녹화한 영상을 볼 수 있다.
3) '연습 종료' 버튼을 눌러 결과를 확인할 수 있는 세션키를 발급받고 메인페이지로 복귀한다.

# 질문페이지
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/a6ebd375-8bde-4cca-ad9e-8edefedbe981">
1) 발표에서의 발언을 분석해 실제 발표에서 받을 수 있는 질문을 생성한다.
2) 실제 질문을 받듯이 질문은 커서를 통해 하나씩 확인할 수 있다.

# 분석페이지
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/18b02842-6e52-425a-8745-13e7002f1bd8">
1) '발표 정보'에서는 발표 제목과 발표 예정 날짜, 주요 키워드, 발표자료 사용 여부 등을 확인한다.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/63a6e10b-ffba-4b33-af91-cc1d07a80669">
2) '최종점수'에서는 각각의 기준에 따라 평가한 4가지 항목을 종합적으로 판단하여 점수를 계산한다.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/021ae924-e05e-4f8e-adae-003f77c4b4a6">
3) 'Progress Tracker'에서 각 항목의 점수를 직관적으로 확인할 수 있게 한다.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/91008feb-1ac0-4c58-8578-9eaededd0dfc">
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/1546d251-0e28-4618-9c9e-b646b6c395d2">
4) '발표영상 다시보기'에서 연습 영상을 다시 볼 수 있으며, 다운로드할 수 있다.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/54d55ade-b6f4-48a2-870a-2651badd340d">
5) '키워드 강조 확인'에서는 연습한 발표의 키워드를 찾아내고, 얼마나 언급했는지 알린다.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/3ece9973-f258-4c31-b18e-66825bd5014e">
6) '제스쳐 다시보기'에서는 청중의 주목을 끄는 동작을 찾아내 나열한다.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/0a816633-0565-4951-867f-5511630d6425">
7) '발표 문장 다시보기'에서는 어떤 말을 했는지 적혀 있으며, 다운로드 가능하다.


## 시스템 구조
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/5e9db717-dfde-429c-9fc8-0c8c931ea826">


## 사용한 기술

<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/6699046f-4aa2-4694-a778-d5dc66460666">

- github: 코드의 버전 관리, 협업 등 개발자의 편의를 지원한다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/0912061f-3474-40ae-8d8d-3d41977c2d4a)

- Amazon Lightsail: 아마존에서 제공하는 클라우드 컴퓨팅 서비스이다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/e53e69ef-ae3a-444f-9bf1-799d5566f25b)

- Jenkins: github push를 이벤트로 받아 프런트, 백엔드의 코드를 수정한다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/b6a23b8e-5544-4188-94c0-63eb179292e0)

- NGINX: 클라이언트에게 웹페이지를 제공하는 프런트를 담당한다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/6bdb5bd8-3f78-4ed1-9187-21110e12a9e2)

- uvicorn: 프런트에서 요청할 수 있도록 여러 api를 제공하는 백엔드를 담당한다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/9d8f0551-b51d-4565-adcd-7c7acad94551)

- FastAPI: 백엔드의 기능을 api화 하여 프런트의 요청을 쉽게 처리한다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/885d2672-a5c6-4c8c-a974-f3761266e3cb)

- librosa: 오디오를 분석해 파형 분석, 시간 축 조정 등을 구현한다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/c47fee7c-a999-49ea-9636-4310e2b096a2)

- ETRI api: 한국 전자 통신 연구기관에서 제공하는 api로 음성을 분석하고 글 형태로 변환할 수 있다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/70ebf166-7caa-4b93-9c05-b6e2294fd003)

- Kiwi: 한국어 형태소 분석, 명사 추출 등의 기능을 수행한다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/f6a2b411-80bc-4325-9e25-e61f41f9cac0)

- GPT api: openai에서 제공하는 api로 질문, 총평 등을 생성한다.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/f2c3534d-9a7a-4d94-86c1-7f10b06b1206)

- Mediapipe api: 영상에서 사람의 포즈를 인식한다.
