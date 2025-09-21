// express 모듈을 불러옵니다.
const express = require("express");
// express 애플리케이션 객체를 생성합니다.
const app = express();
// 사용할 포트 번호를 지정합니다.
const port = 3000;

// 유튜버 정보 객체들
let youtuber1 = {
  name: "허수아비",
  subscribers: 2000000,
  description: "취미와 일상을 공유하는 유튜버입니다.",
};
let youtuber2 = {
  name: "코딩하는 누나",
  subscribers: 1500000,
  description: "프로그래밍과 IT 정보를 쉽게 알려줍니다.",
};
let youtuber3 = {
  name: "여행작가",
  subscribers: 800000,
  description: "세계 여행 브이로그와 꿀팁을 소개합니다.",
};
let youtuber4 = {
  name: "먹방킹",
  subscribers: 3000000,
  description: "다양한 음식을 먹는 먹방 유튜버입니다.",
};
let youtuber5 = {
  name: "게임천재",
  subscribers: 1200000,
  description: "신작 게임 리뷰와 공략을 제공합니다.",
};
let youtuber6 = {
  name: "책읽는소년",
  subscribers: 500000,
  description: "책 소개와 리뷰, 독서법을 알려줍니다.",
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 유튜버 정보를 저장할 Map 객체 생성
let db = new Map();
db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);
db.set(4, youtuber4);
db.set(5, youtuber5);
db.set(6, youtuber6);

// "/youtubers/:id" 경로로 GET 요청이 들어왔을 때 실행되는 라우터를 정의합니다.
app.get("/youtubers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const youtuber = db.get(id);
  if (youtuber) {
    res.json({
      youtuberId: id,
      youtuberName: youtuber.name,
      subscribers: youtuber.subscribers,
      description: youtuber.description,
    });
  } else {
    res.status(404).send("Youtuber not found");
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
