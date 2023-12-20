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

## Table of Contents
1. Page Guides
2. System Architecture
3. Technologies Used


## Page Guides

# Main Page

<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/e9dc33ff-5e6e-4917-a850-43af28913ced">
1) Display user records (not implemented).
2) Recommends Youtube videos to assist with presentations.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/8d3c5476-e9b3-442e-ae57-b7e8bc368d63">
3) Display schedule remainders and calendar to check presentation dates.
4) Click on _Practice for Presentation_ or _Start Practice_ on the left to go to the preparation page.
5) In _Check Results_, enter the session key and click _Check Practice Results_ to go to the question page.

# Preparation Page

<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/3817a8b3-3764-4e83-bbf2-ef424814b9bb">
1) Enter information for the presentation _title_ and _keywords_.
2) Choose the _Scheduled Presentation Date_ in calendar.
3) Upload files if user has materials or a script for the presentation.
4) Click the _Start Practice_ button to generate a session key and save the entered information. Then proceed to the practice page.

# Practice Page
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/c4d2d54e-8ee6-4b29-bf7f-4a28029c7a91">
1) View the _title_ and _scheduled presentation date_ entered on the preparation page.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/86f993f3-b0d0-4299-aacf-b63b3c0aafbf">
2) Click _Start Recording_ button to begin recording, and after the presentation, click _Stop Recording_ to end it. Then, click _Play_ to watch the recorded video.
3) Click _End Practice_ to receive a session key for result checking and return to the main page.

# Question Page
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/a6ebd375-8bde-4cca-ad9e-8edefedbe981">
1) Analyze speech from the presentation to generate questions similar to those received during an actual presentation.
2) Cursor through questions one by one as if receiving them during a presentation.

# Analysis Page
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/18b02842-6e52-425a-8745-13e7002f1bd8">
1) _Presentation Information_ displays details such as presentation title, scheduled date, keywords, and whether presentation materials were used.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/63a6e10b-ffba-4b33-af91-cc1d07a80669">
2) _Final Score_ calculates scores based on four criteria, providing an overall evaluation.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/021ae924-e05e-4f8e-adae-003f77c4b4a6">
3) _Progress Tracker_ visually shows scores for each criterion.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/91008feb-1ac0-4c58-8578-9eaededd0dfc">
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/1546d251-0e28-4618-9c9e-b646b6c395d2">
4) _Review Presentation Again_ allows reviewing and downloading the practice video.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/54d55ade-b6f4-48a2-870a-2651badd340d">
5) _Check Keyword Emphasis_ identifies and notifies how often keywords were mentioned in the practice presentation.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/3ece9973-f258-4c31-b18e-66825bd5014e">
6) _Review Gestures_ lists gestures that captured the audience's attention.
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/0a816633-0565-4951-867f-5511630d6425">
7) _Review Presentation Sentences_ lists spoken sentences and allows for download.


## System Architecture
<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/5e9db717-dfde-429c-9fc8-0c8c931ea826">


## Technologies Used

<img src="https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/6699046f-4aa2-4694-a778-d5dc66460666">

- github: Version control, collaboration, and code management.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/0912061f-3474-40ae-8d8d-3d41977c2d4a)

- Amazon Lightsail: Cloud computing service provided by Amazon.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/e53e69ef-ae3a-444f-9bf1-799d5566f25b)

- Jenkins: Automation tool for modifying frontend and backend code in response to github push events.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/b6a23b8e-5544-4188-94c0-63eb179292e0)

- NGINX: Frontend responsible for providing webpages to clients.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/6bdb5bd8-3f78-4ed1-9187-21110e12a9e2)

- uvicorn: Backend providing various APIs accessible from frontend.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/9d8f0551-b51d-4565-adcd-7c7acad94551)

- FastAPI: Make backend's functionality API-ized to make it easy to process frontend requests.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/885d2672-a5c6-4c8c-a974-f3761266e3cb)

- librosa: Implements audio analysis, waveform analysis, and time axis adjustment.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/c47fee7c-a999-49ea-9636-4310e2b096a2)

- ETRI api: Analyze speech and convert into text using the API provided by a South Korean telecommunications research institution

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/70ebf166-7caa-4b93-9c05-b6e2294fd003)

- Kiwi: Perform Korean morphological analysis, extract nouns, etc.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/f6a2b411-80bc-4325-9e25-e61f41f9cac0)

- GPT api: OpenAI's api for generating questions, summarizing evaluations, etc.

![image](https://github.com/kingmaker-presentation-helper/Kingmaker_web/assets/57437648/f2c3534d-9a7a-4d94-86c1-7f10b06b1206)

- Mediapipe api: Recognizes human poses in videos.
