# Webclient
웹 클라이언트 컴퓨팅 학부 프로젝트

## 환경 설치 및 테스팅 (lap 6, lap 7, proj 2)
***

node.js 설치 -  운영체제별 LTS(안정화) 버전 다운로드/실행설치

    https://nodejs.org/ko/download

웹서버 모듈("express") 설치

    npm install --global express

프록시 서버 모듈("cors", "cors-anywhere") 설치

    npm install cors cors-anywhere

VS Code 확장모듈("code runner") 설치
   

프록시 서버 실행
   
   서버 프로그램(proxy.js) 실행



***


### 실습 6
(HTTP 통신과 JSON)  콜백함수, XMLHttpRequest()

### 실습 7 
(비동기 프로그래밍)  Promise(), fetch(), async()-await

### 프로젝트 2
(node.js 기반 서버 프로그래밍)  서버프로그램(movie-server.js) 

### 프로젝트 3
(카카오 주소정보 서비스: REST API 방식) 카카오 Local 서비스를 사용하여, 전통시장 주소에 해당하는 경도/위도 정보를 검색

### 프로젝트 4
(채팅-화이트보드 서비스)


라이브러리 설치

    npm install express socket.io

<상영영화> 서버 - 포트(52273)

    node movie-server.js 

화이트보드,채팅 서버 -  포트(52274)

    node app-whiteboard.js   

