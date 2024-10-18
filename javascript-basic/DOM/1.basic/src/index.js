const lowerFolder = document.querySelectorAll(".lower-folder");
if (lowerFolder) {
  lowerFolder.forEach((n) => {
    n.style.display = "none";
  });
}

// ! 위의 코드는 참고만 하시고 수정하지 마세요 ! //

// index.html에는 화면에 보여질 폴더 구조가 이미 완성되어 있으나, click 이벤트와
// 관련한 기능이 완성되지 않았습니다.
// 브라우저에 보이는 폴더 아이콘 혹은 폴더명을 클릭했을 때, 하위에 존재하는 파일과
// 폴더가 보여지도록 index.html 파일을 참고하여 folderList 내부에 있는 각각의 html
// 태그에 click event를 추가해주세요.

/*
 * "isOpen" class를 지닌 태그는 열린 폴더 아이콘이 적용됩니다.
 * "isOpen" class를 지니지 않은 태그는 닫힌 폴더 아이콘이 적용됩니다.
 * style.display 속성이 "block"인 태그는 화면에 보여집니다.
 * style.display 속성이 "none"인 태그는 화면에서 사라집니다.
 */

// @ addEventListener()를 사용하면 화살표 함수( () => {} )의 매개변수로 event를
// 받아올 수 있습니다.
// @ 해당 event 안에 존재하는 target, 그리고 DOM 요소 선택자에 대해 알아보세요.
// (부모 노드를 선택하는 방법이 존재합니다!)
// @ click 이벤트를 통해 isOpen class 속성을 추가 혹은 제거해야 하는 태그와 그 방법,
// @ display 속성을 "none" 혹은 "block"으로 변경하는 방법에 대해 잘 생각해 보세요.
// @ "isOpen" class는 'toggle'이라는 class 명을 가진 태그에 추가, 삭제 되어야 합니다.
// @ display 속성은 'lower-folder'라는 class 명을 가진 태그에서 변경되어야 합니다.

const folderList = document.querySelectorAll(".folder");
// querySelectorAll(".folder") .folder 태그를 모두 선택하는 함수를 folderList 배열로 만듦
const completeFolderTree = function (folderList) {
  for (let i = 0; i < folderList.length; i++) {
    folderList[i].addEventListener("click", (event) => {
      // 여기에서 작업하세요.
      const visibleTarget = event.target.parentNode; // 결과적으로 .toggle 선택
      // 마우스를 클릭했을 떄 이벤트가 일어나는 것 event.target === .folder(여기선)
      // 토글 뜻:  한번만 눌러도 그 기능이 계속 지속되는 방식으로 기능하는 키
      // 클릭하면 마우스으로 .folder를 타겟으로 선택하게 되고 이의 부모 노드(.toggle)
      // 를 선택하여 변수로 저장, visibleTarget = .toggle
      // 우리는 folder 위에 toggle이라는 클래스를 만들어 놨는데 이를 사용해서
      // isOpen을 추가 혹은 제거하여 트리를 보이게하거나 보이지 않게 조작할 것이다.
      // 코드들을 보면 folder 위에는 꼭 toggle이 부모노드가 있다.

      const lowerFile = visibleTarget.querySelector(".lower-folder");
      // 선택한 visibleTarget(.toggle)의 하위 .lower-folder들을 선택
      // 자주보았던 document.querySelector를 쓰면 문서내부 전체의
      // .lower-folder를 쓰니까 안됨
      const visible = lowerFile.style.display;
      // display속성 변환할 수 있게 만든 변수
      visibleTarget.classList.toggle("isOpen");
      //.toggle의 isOpen이 없으면 add, 있으면 remove
      if (visible === "block") {
        lowerFile.style.display = "none";
      } else {
        lowerFile.style.display = "block";
      }
      // 디스플레이 속성이 블럭이면 none으로 none이면 block으로
    });
  }
};
completeFolderTree(folderList);

// 구현에 성공했다면 advanced 과제에 도전해 보세요!
