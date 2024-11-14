let tempList = "";
for (let i = 0; i < result.length; i++) {
  // 가게 정보를 배열의 길이만큼 출력
  tempList +=
    // 변수에 html정보를 저장
    `
        <div class="store${i} base">
            <div class="storeName">
            <p>${result[i].place_name}</p>
            <div class="distance">${result[i].distance}M</div>
            </div>
            <p class="phone">${result[i].phone}</p>
            <p class="address">${result[i].road_address_name}</p>
            <a href=${result[i].place_url} class="placeURL">${result[i].place_url}</a>
        </div>`;
  store.innerHTML = tempList; // 저장된 변수를 innerHTML로 HTML에 추가
}
