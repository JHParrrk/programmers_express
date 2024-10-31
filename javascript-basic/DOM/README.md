1.basic 폴더 내부의 `index.html`이
result.png 이미지와 같이 출력될 수 있도록 `index.js`를 완성해야 합니다.

1. index.html을 live server로 열어주세요.
2. index.js 파일에 주석으로 작성되어 있는 요구사항을 확인하고 함수를 완성해 주세요.

! 1.basic 난이도를 해결하셨다면, 2.advanced에 도전해 보세요!
! 2.advanced는 재귀함수에 대한 이해가 필요합니다 !

- **document.getElementById()**
  ⇒ Element Node의 id 속성을 체크해서 해당하는 Element를 참조해온다.
- **document.getElementByClass()**
  ⇒ Element Node의 class 속성을 체크해서 해당하는 Element를 참조해온다.
- **document.querySelector()**
  ⇒ 소괄호 안에 입력한 값에 해당하는 Element를 참조해온다. id(”#”)를 입력하는 경우 id를 기반으로, class(”.”)를 입력하는 경우 class를 기반으로 참조
- **document.querySelectorAll()**
  ⇒ 소괄호 안에 입력한 값에 해당하는 Element를 참조해온다. querySelector와 다르게 배열 형태로 모든 요소를 참조해온다.
- **document.createElement()**
  ⇒ 새로운 Node를 생성합니다. Node의 형태는 생성되지만 DOM에 직접 추가해주는 과정을 거치치 않으면 DOM에 속하지 않습니다.
- **document.appendChild()**
  ⇒ Element Node를 현재 DOM에 추가합니다. 이때의 document는 다른 Element가 될 수도 있습니다.
