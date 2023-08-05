# DOGDAZE
- 반려견을 키우는 반려인들을 위한 훈련정보 공유기능과 개 용품 구매 기능을 제공하는 웹서비스



## 기술 스택
- 프론트엔드
<div align="center">
  <img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> 
  <img alt="Css" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/> 
  <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScriipt-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> 
 <img alt="React" src ="https://img.shields.io/badge/react-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/> 
  <img alt="redux" src ="https://img.shields.io/badge/redux-764ABC.svg?&style=for-the-badge&logo=redux&logoColor=white"/> 
  <img alt="scss" src="https://img.shields.io/badge/sass-ff69b4.svg?style=for-the-badge&logo=sass&logoColor=white"/>  
</div>

- 백엔드
<div align="center">
   <img alt="Node.js" src ="https://img.shields.io/badge/Node.js-brightgreen.svg?&style=for-the-badge&logo=Node.js&logoColor=white"/>      
  <img alt="express" src ="https://img.shields.io/badge/express-lightgrey.svg?&style=for-the-badge&logo=express&logoColor=white"/>      
  <img alt="sequelize" src ="https://img.shields.io/badge/sequelize-blue.svg?&style=for-the-badge&logo=sequelize&logoColor=white"/>    
  <img alt="mysql" src ="https://img.shields.io/badge/MySQL-orange.svg?&style=for-the-badge&logo=MySQL&logoColor=white"/> 
<img alt="Amazon AWS" src ="https://img.shields.io/badge/Amazon AWS-232F3E.svg?&style=for-the-badge&logo=Amazon AWS&logoColor=white"/>
<img alt="NGINX" src ="https://img.shields.io/badge/NGINX-009639.svg?&style=for-the-badge&logo=NGINX&logoColor=white"/>

</div>


## 1. 프로젝트 소개
### 목표
***초보 반려인의 지식을 함양***을 시키는 서비스를 제공한다. 
- 종류별 개에 대한 정보를 제공한다. 
- 성향에 맞는 종류의 개를 추천한다. 
- 회원의 등급에 따라 게시판의 글쓰기 권한과 쇼핑몰의 할인율을 달리 둔다. 
- 개 훈련 퀴즈를 통과하면 회원의 등급이 올라간다. 
- 회원기능에서 CRUD를 구현한다. 
- 게시판 기능에서 CRUD를 구현한다. 
- 주변의 동물병원의 위치를 알려준다. 
- 간단한 챗봇으로 고객센터의 역할을 대신한다. 



## 2. 역할분담
| 이름   | 역할               | 내용                                                |
| ----- | ------------------ | ---------------------------------------------------- |
| 이효리 | 백엔드             |  1. DB 설계 및 개발 <br> 2. 회원, 쇼핑몰 API 설계 및 구현<br> 3. API 문서화        |
| 정세희 | 프론트엔드          |                                                      |
| 한진수 | 프론트엔드         | 1.퀴즈 페이지 구현 <br> 2. 강아지 추천 페이지 구현 <br> 3. 쇼핑몰 페이지 구현 <br> 4.메인 페이지 일부 구현 <br> 5. 전반적인 페이지 반응형 구현|
| 홍준범 | 백엔드             | 1. AWS S3 연동 및 관리<br> 2. 서버 배포 <br>3. 게시판, 메인 API 설계 및 구현<br> 4. open API dataset 연동 <br>5. 챗봇 개발 |


## 3. 실행 방법
- 배포 링크 : [dogdaze.xyz](dogdaze.xyz)
- 백엔드
```
cd server
npm i

// dog_inf_mall.sql 파일 전체 실행 (ctrl + enter)

cd storeData
node shopDataToDB.js (open API 정보 DB에 저장하기

cd ../
node app.js
```
- 프론트엔드
```
cd client
npm i
npm start
```
