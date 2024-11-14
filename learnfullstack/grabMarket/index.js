axios
  .get("https://4adba5bb-db02-42b9-b7b8-dc0f544562b3.mock.pstmn.io/products")
  .then(function (result) {
    console.log("통신 결과 : ", result);
    const products = result.data.products;

    let productsHtml = "";
    products.forEach(function (product, index) {
      // 상품 정보를 배열의 길이만큼 출력
      productsHtml +=
        // 변수에 html정보를 저장
        `<div class="product-card">
        <div>
            <img class="product-img" src="${product.imageUrl}" alt="none" />
        </div>
        <div class="product-contents">
            <span class="product-name">${product.name}</span>
            <span class="product-price">${product.price}</span>
            <div class="product-seller">
            <img
                class="product-avatar"
                src="images/icons/avatar.png"
                alt="none"
            />
            <span>${product.seller}</span>
            </div>
        </div>
        </div>`;
      document.querySelector("#product-list").innerHTML = productsHtml;
      // 저장된 변수를 innerHTML로 HTML에 추가
    });
  })
  .catch(function (error) {
    console.error("error 발생 : ", error);
  });
// 위의 코드가 서버에서 받아오는 데이터
// let products = [
//   {
//     name: "농구공",
//     price: 100000,
//     seller: "조던",
//     imageUrl: "images/products/basketball1.jpeg",
//   },
//   {
//     name: "축구공",
//     price: 50000,
//     seller: "메시",
//     imageUrl: "images/products/soccerball1.jpg",
//   },
//   {
//     name: "키보드",
//     price: 10000,
//     seller: "그랩",
//     imageUrl: "images/products/keyboard1.jpg",
//   },
// ];
