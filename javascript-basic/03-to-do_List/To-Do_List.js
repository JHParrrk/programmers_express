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

  if (storageData?.complete) {
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
    saveItems.push(todoObj);
  }

  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));
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
  const locationNameTag = document.querySelector("#location-name-tag");

  locationNameTag.textContent = location;
  document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;

  if (
    !savedWeatherData ||
    savedWeatherData?.location !== location ||
    savedWeatherData?.weather !== weather
  ) {
    localStorage.setItem(
      "saved-weather",
      JSON.stringify({ location, weather })
    );
  }
};

const weatherSearch = function ({ latitude, longitude }) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={API Key}`
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

const accessToGeo = function ({ coords }) {
  const { latitude, longitude } = coords;
  // shorthand property
  const positionObj = {
    latitude,
    longitude,
  };

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
