// 폼 제출 시 이벤트 핸들러 등록
document
  .getElementById("building-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막음

    const buildingCount = parseInt(
      document.getElementById("building-count").value
    );
    // 빌딩 수를 입력받아 정수로 변환
    const buildingHeights = document
      .getElementById("building-heights")
      .value.split(" ")
      .map(Number);
    // 빌딩 높이를 공백으로 구분하여 배열로 변환

    // 두 빌딩이 서로 보일 수 있는지 여부를 판단하는 함수
    function canSee(a, b, buildings) {
      const [x1, y1] = a; // 빌딩 A의 좌표
      const [x2, y2] = b; // 빌딩 B의 좌표
      for (const [x, h] of buildings) {
        if (x === x1 || x === x2) continue; // 빌딩 A나 B 자신은 건너뜀
        if (Math.min(x1, x2) < x && x < Math.max(x1, x2)) {
          // 빌딩 x가 A와 B 사이에 위치하는지 확인
          const y = y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
          // 빌딩 x에서 A와 B를 잇는 선분 상의 y 좌표 계산
          if (y <= h) return false; // 다른 빌딩에 의해 가로막히면 false 반환
        }
      }
      return true; // 모든 조건을 통과하면 true 반환
    }

    // 각 빌딩에서 보이는 빌딩 수를 계산하는 함수
    function countVisible(buildings) {
      const n = buildings.length; // 빌딩의 수를 n에 저장
      let maxVisible = 0; // 최대 가시 빌딩 수를 저장할 변수 초기화
      let bestBuilding = -1; // 가장 많은 빌딩이 보이는 빌딩 번호를 저장할 변수 초기화

      for (let i = 0; i < n; i++) {
        // 각 빌딩을 기준으로 반복
        let visibleCount = 0; // 현재 빌딩에서 보이는 빌딩 수를 저장할 변수 초기화
        for (let j = 0; j < n; j++) {
          // 다른 모든 빌딩들과 비교
          if (
            i !== j &&
            canSee(
              [i + 1, buildings[i]],
              [j + 1, buildings[j]],
              buildings.map((h, index) => [index + 1, h])
            )
          ) {
            visibleCount += 1; // i번 빌딩에서 j번 빌딩이 보이면 카운트 증가
          }
        }
        if (visibleCount > maxVisible) {
          maxVisible = visibleCount; // 현재 최대 가시 빌딩 수를 업데이트
          bestBuilding = i + 1; // 현재 가장 많은 빌딩이 보이는 빌딩 번호 업데이트
        }
      }
      return { bestBuilding, maxVisible }; // 가장 많은 빌딩이 보이는 빌딩 번호와 그 수를 반환
    }

    const result = countVisible(buildingHeights);
    // 입력된 빌딩 높이 배열을 사용해 가시 빌딩 수 계산
    document.getElementById(
      "result"
    ).textContent = `가장 많은 빌딩이 보이는 빌딩 번호: ${result.bestBuilding}, 보이는 빌딩의 수: ${result.maxVisible}`;
    // 결과를 HTML 요소에 출력
  });

/*
폼 제출 시 이벤트 핸들러 등록
document.getElementById('building-form').addEventListener('submit', function(event) { ... });
폼이 제출될 때 실행되는 함수를 설정합니다.

기본 동작 방지
event.preventDefault();
폼의 기본 제출 동작을 막아 페이지 새로고침을 방지합니다.

입력값 처리
const buildingCount = parseInt(document.getElementById('building-count').value);
빌딩 수를 입력받아 정수로 변환합니다.
const buildingHeights = document.getElementById('building-heights').value.split(' ').map(Number);
빌딩 높이를 공백으로 구분하여 배열로 변환합니다.

canSee 함수
두 빌딩이 서로 보일 수 있는지 여부를 판단하는 함수입니다.
const [x1, y1] = a; const [x2, y2] = b;
빌딩 A와 B의 좌표를 각각 설정합니다.

for (const [x, h] of buildings) { ... }
모든 빌딩을 순회하며 가시성을 확인합니다.

if (Math.min(x1, x2) < x && x < Math.max(x1, x2)) { ... }
빌딩 x가 A와 B 사이에 위치하는지 확인합니다.

const y = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
빌딩 x에서 A와 B를 잇는 선분 상의 y 좌표를 계산합니다.

if (y <= h) return false;
다른 빌딩에 의해 가로막히면 false를 반환합니다.

countVisible 함수
각 빌딩에서 보이는 빌딩 수를 계산하는 함수입니다.

const n = buildings.length;
빌딩의 수를 가져옵니다.

let maxVisible = 0; let bestBuilding = -1;
최대 가시 빌딩 수와 가장 많은 빌딩이 보이는 빌딩 번호를 초기화합니다.

for (let i = 0; i < n; i++) { ... }
각 빌딩을 기준으로 반복합니다.

for (let j = 0; j < n; j++) { ... }
다른 모든 빌딩들과 비교합니다.

if (i !== j && canSee([i + 1, buildings[i]], [j + 1, buildings[j]], buildings.map((h, index) => [index + 1, h]))) {
현재 빌딩(i)와 비교할 빌딩(j)이 동일하지 않은지 확인하고, canSee 함수를 사용하여 보이는지 확인합니다.

visibleCount += 1;
보인다면 visibleCount를 1 증가시킵니다.

if (visibleCount > maxVisible) { ... }
현재 빌딩에서 보이는 빌딩 수가 최대 값보다 크다면, 이를 업데이트합니다.

return { bestBuilding, maxVisible };
가장 많은 빌딩이 보이는 빌딩 번호와 그 수를 반환합니다.

결과 출력
const result = countVisible(buildingHeights);
입력된 빌딩 높이 배열을 사용해 가시 빌딩 수를 계산합니다.

document.getElementById('result').textContent = ...;
계산 결과를 HTML 요소에 출력합니다.
*/
