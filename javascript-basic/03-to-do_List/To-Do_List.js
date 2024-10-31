const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));
// localStorage.getItem("saved-items")은 문자열이다. savedTodoList는 우리가 객체형태로 사용할
// 계획이기 때문에 JSON.parse()을 통해 원본객체로 다시 변환
// JSON.stringify()는 객체(데이터)를 문자열로 변환 JSON.parse()는 문자열로 변환된 데이터가
// JSON 데이터 포맷을 가지고 있다면 원본데이터 형태로 다시 변환
// localStorage.setItem("saved-items", JSON.stringify(saveItems))

// if (savedTodoList) {
//   for (let i = 0; i < savedTodoList.length; i++) {
//     createTodo(savedTodoList[i]);
//   }
// }

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }
  // storageData가 있으면 todoContents에 storageData.contents를 넣어라

  // li, span, button 태그 생성
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    // newLi에 클래스를 조작해주는 메소드, 여기선 complete 클래스 속성 추가
    // toggle은 클래스의 유무를 체크해서 없으면 add, 있으면 remove를 자동으로 시켜준다.
    saveItemsFn();
  });
  // 버튼클릭하면 토글을 완료상태로 저장

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });
  // 더블클릭하면 삭제
  // 콜백함수 함수를 등록하기만 하고 어떤 이벤트가 발생했거나
  // 특정 시점에 도달했을 때 시스템에서 호출하는 함수

  if (storageData?.complete) {
    // = (storageData && storageData.complete)
    // 옵셔널체이닝
    // 새로 인풋 데이터를 입력할 떄 인풋데이터에는 storageData가 undefined거나 null이어서
    // 매개변수를 받아오지 않게 된다. undefined인 값에 complete를 시도를 하려고 하니까
    // 에러를 뱉어낸다. 여기서 사용하는 것이 옵셔널체이닝 뒤에다가 물음표 하나를 붙이게
    // 되면 이 스토리지 객체가 undefined이거나 다른 값인 경우에는 뒤에 complete를
    // 참조하려고 시도하지 않는다.
    // storageData의 complete라는 키를 가진 프로퍼티 확인
    // 프로퍼티 값이 true라면
    newLi.classList.add("complete");
  }

  // 밸류값 넣어주기
  // appendChild li태그 하위속성으로 어떠한 태그 하나 더 추가
  // newSpan.textContent = todoInput.value;
  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  // const todoList = document.querySelector("#todo-list");
  // html 투두리스트에 newBtn과 newSpan이 추가된 newLi추가
  todoInput.value = "";
  // 채우고 나서 빈박스로 만들기
  saveItemsFn();
};

const keyCodeCheck = function () {
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    // trim()은 문자열의 양쪽 공백을 없애준다. 이것을 안쓸 경우 스페이스바를 누른다 같은
    // 입력값을 넣었을때 추가되어버리는데 이러한 경우를 방지
    createTodo();
  }
};

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  // querySelectorAll("li") li태그를 모두 선택하는 함수를 liList 배열로 만듦
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn();
};

const saveItemsFn = function () {
  // 로컬스토리지랑 소통 세이브파일 저장
  const saveItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      // span에 있는 텍스트를 가져올수 있다. textContent 중요한듯 contents는 키값
      complete: todoList.children[i].classList.contains("complete"),
      // classList를 활용하여 클래스에 complete가 존재 유무 체크 있으면 true
      // complete의 존재 유무를 체크하고 저장하는 과정
    };
    // 배열 안에 객체 추가
    // 만약 deleteAll해서 li태그가 없으면 빈배열이 추가가 된다 이를 밑에서 처리한다
    saveItems.push(todoObj);
  }

  saveItems.length === 0 //조건식
    ? localStorage.removeItem("saved-items") // true조건식
    : localStorage.setItem("saved-items", JSON.stringify(saveItems)); // false조건식
  // 빈 배열(필요없는 데이터) 삭제 해주는것
  // saveItems의 길이가 0이라면 saved-items라는 프로퍼티를 삭제해주겠다.
  // 로컬스토리지에는 문자열만 저장이 된다. JSON.stringify(saveItems) 이걸로 문자열로 저장
  // 배열은 문자열로 저장이 불가 그냥 String()으로는 안된다는 말
  // JSON 문자텍스트형 데이터 포멧
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const weatherDataActive = function ({ location, weather }) {
  const weatherMainList = [
    "Clear",
    "Clouds",
    "Drizzle",
    "Rain",
    "Snow",
    "Thunderstorm",
  ];
  weather = weatherMainList.includes(weather) ? weather : "Fog";
  // weather로 들어온 데이터 체크 true면 weather로 그대로 할당 false라면 "Fog"로 할당
  const locationNameTag = document.querySelector("#location-name-tag");

  locationNameTag.textContent = location;
  // 이거 켜는 위치로 대문 이름 바꾸기
  document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;
  // 날씨에 따라 그림 바꾸기

  if (
    !savedWeatherData ||
    savedWeatherData?.location !== location ||
    savedWeatherData?.weather !== weather
    //옵셔널체인지 savedWeatherData 자체가 존재하지 않을때 뒤에 참조하려고 시도X
    // savedWeatherData가 없으면, location이 다르다면, weather가 다르다면
  ) {
    localStorage.setItem(
      "saved-weather",
      JSON.stringify({ location, weather })
    );
  }
};

const weatherSearch = function ({ latitude, longitude }) {
  // 매개변수 구조분해할당
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cae546a99b63035eb475b65b1f7a0468`
  )
    // 비동기 처리
    .then((res) => {
      //Fulfilled 상태일때 then을 실행한다
      return res.json();
      // header가 존재하는 응답 객체를 받으려면 이렇게 받아야한다.
      // console.log(res)로 받으면 오류
      // then에서 return을 받으면 또다시 then을 붙여 쓸 수 있다.
    })
    .then((json) => {
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
        // console.log(json.name), console.log(son.weather[0].main)
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

const accessToGeo = function ({ coords }) {
  // 구조분해할당 함수의 매개변수로도 활용가능
  // 소괄호 안에 중괄호 넣어주면 position.coords를 바로 뽑아와서 매개변수로 사용할수있음
  const { latitude, longitude } = coords;
  // 구조분해할당 const { name, gender } = obj; 같이
  // coords 쿠어디에스라 부르네 현재 위치, 위도 경도가 담겨져 있다
  // shorthand(속기) property
  const positionObj = {
    // shorthand property
    latitude, // 위도 latitude: latitude
    longitude, // 경도 longitude: longitude
  };
  // console.log(latitude, longitude);
  // 진짜 정확하게 나옴;;

  weatherSearch(positionObj);
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    console.log(err);
  });
};
askForLocation();
if (savedWeatherData) {
  weatherDataActive(savedWeatherData);
}
