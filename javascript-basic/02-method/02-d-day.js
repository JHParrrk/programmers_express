const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date");

const intervalIdArr = [];

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;
  // 템플릿 리터럴

  return dateFormat;
};

const counterMaker = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;
  if (remaining <= 0) {
    // 만약, remaining이 0이라면, 타이머가 종료되었습니다. 출력
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    // 만약, 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    // 전체 초를 3600(한시간 단위로)으로 나누면 시간이 나오고 그것을 24(하루)로나누면 일수가 나옴
    remainingHours: Math.floor(remaining / 3600) % 24,
    // 전체 초를 3600(한시간 단위로)으로 나눈 시간을 하루를 넘어가는 단위를 없애고 남은 시간을 내놓음
    remainingMin: Math.floor(remaining / 60) % 60,
    // 전체 초를 60초단위(분)로 나누고 분을 넘어가는 단위를 없애고 남은 분을 내놓음
    remainingSec: Math.floor(remaining) % 60,
    // 전체 초를 초를 넘어가는 단위를 없애고 남은 초를 내놓음
  };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
};

const starter = function (targetDateInput) {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  counterMaker(targetDateInput);
  const intervalId = setInterval(() => {
    counterMaker(targetDateInput);
  }, 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
  messageContainer.style.display = "flex";
  localStorage.removeItem("saved-date");
  document.getElementById("target-year-input").value = null;
  document.getElementById("target-month-input").value = null;
  document.getElementById("target-date-input").value = null;
  setClearInterval();
};

if (savedDate) {
  starter(savedDate);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
}

const changeCal1 = function () {
  const year = document.getElementById("target-year-input").value;
  if (year.length === 4) {
    document.getElementById("target-month-input").focus();
  }
  if (year === "0000") {
    document.getElementById("target-year-input").value = "2024";
  }
};

const changeCal2 = function () {
  const month = document.getElementById("target-month-input").value;
  if (month.length === 2) {
    document.getElementById("target-date-input").focus();
  }
  if (month > 12) {
    document.getElementById("target-month-input").value = "12";
  }
  if (month === "00") {
    document.getElementById("target-month-input").value = "01";
  }
};

const changeCal3 = function () {
  const year = document.getElementById("target-year-input").value;
  const month = document.getElementById("target-month-input").value;
  const day = document.getElementById("target-date-input").value;
  if (!((year % 4 === 0 && year % 100 != 0) || year % 400 === 0)) {
    if (day > 28) {
      alert(year + "년은 평년이라 29일이 없음");
      document.getElementById("target-date-input").value = "28";
    }
  }
  if (day == "00") {
    document.getElementById("target-date-input").value = "01";
  }
};

// function oninputTest() {
//     this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
// }
