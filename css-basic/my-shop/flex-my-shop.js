const productsList = document.querySelector("product-list");

let products = [
  {
    name: "탁상용 조명",
    price: 260000,
    seller: "조던",
    imageUrl: "./img/item1.jpeg",
  },
  {
    name: "머그컵",
    price: 32000,
    seller: "메시",
    imageUrl: "./img/item2.png",
  },
  {
    name: "거실용 슬리퍼",
    price: 28000,
    seller: "그랩",
    imageUrl: "./img/item3.jpeg",
  },
  {
    name: "거실용 슬리퍼2",
    price: 12300,
    seller: "test",
    imageUrl: "./img/item3.jpeg",
  },
];

let productsHtml = "";
for (let i = 0; i < products.length; i++) {
  // 상품 정보를 배열의 길이만큼 출력
  productsHtml +=
    // 변수에 html정보를 저장

    `<div class="item">
            <div class="imgBox">
              <img src=${products[i].imageUrl} alt="탁상용 조명" />
            </div>
            <div class="textBox">
              <p class="textBox__name">${products[i].name}</p>
              <p class="textBox__price">${products[i].price} 원</p>
              <p class="textBox__seller"></p>
            </div>
          </div>`;

  document.querySelector("#product-list").innerHTML = productsHtml; // 저장된 변수를 innerHTML로 HTML에 추가
}

// const menuRegistration = () => {
//
// };

const regiProduct = function () {
  console.log("asdf");
};
