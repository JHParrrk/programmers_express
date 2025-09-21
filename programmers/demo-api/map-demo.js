// express 모듈을 불러옵니다.
const express = require("express");
// express 애플리케이션 객체를 생성합니다.
const app = express();
// 사용할 포트 번호를 지정합니다.
const port = 3000;

let Laptop = { name: "Laptop", price: 1000, des: "A high performance laptop" };
let Phone = {
  name: "Phone",
  price: 500,
  des: "A smartphone with great features",
};
let Tablet = { name: "Tablet", price: 300, des: "A lightweight tablet" };
let Monitor = { name: "Monitor", price: 200, des: "A 24-inch monitor" };
let Keyboard = { name: "Keyboard", price: 50, des: "A mechanical keyboard" };
let Mouse = { name: "Mouse", price: 30, des: "A wireless mouse" };

// 상품 정보를 저장할 Map 객체를 생성합니다.
let db = new Map();
// 상품 id n에 대한 객체(상품 정보)를 Map에 저장합니다.
db.set(1, Laptop);
db.set(2, Phone);
db.set(3, Tablet);
db.set(4, Monitor);
db.set(5, Keyboard);
db.set(6, Mouse);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// "/products/:id" 경로로 GET 요청이 들어왔을 때 실행되는 라우터를 정의합니다.
app.get("/products/:id", (req, res) => {
  // 요청 파라미터에서 id 값을 정수로 변환하여 가져옵니다.
  const id = parseInt(req.params.id);
  // Map에서 해당 id에 해당하는 상품 정보를 가져옵니다.
  const product = db.get(id);
  if (product) {
    // 상품 정보가 존재하면, 상품 정보를 JSON 형식으로 응답합니다.
    res.json({
      productId: id,
      productName: product.name,
      productPrice: product.price,
      productDescription: product.des,
    });
  } else {
    // 상품 정보가 없으면 404 상태 코드와 함께 에러 메시지를 응답합니다.
    res.status(404).send("Product not found");
  }
});

// 서버를 지정한 포트에서 실행하고, 실행되면 콘솔에 메시지를 출력합니다.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
