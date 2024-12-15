document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  // 폼의 기본 제출 동작을 막아서 페이지 새로고침을 방지합니다.

  const inputValues = document
    .getElementById("input")
    .value.split(" ")
    .map(Number);
  // 입력된 값을 공백으로 구분하여 배열로 변환한 후 숫자로 변환합니다.
  const m = inputValues[0];
  // 배열의 첫 번째 값은 M(최소 값)입니다.
  const n = inputValues[1];
  // 배열의 두 번째 값은 N(최대 값)입니다.

  function sieveOfEratosthenes(m, n) {
    const isPrime = Array(n + 1).fill(true);
    // N+1 크기의 배열을 생성하고 모두 true로 초기화합니다.
    isPrime[0] = isPrime[1] = false;
    // 0과 1은 소수가 아니므로 false로 설정합니다.

    for (let i = 2; i * i <= n; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j <= n; j += i) {
          isPrime[j] = false;
        }
      }
    }
    // 에라토스테네스의 체 알고리즘을 사용하여 소수를 판별합니다.
    // i의 배수들은 소수가 아니므로 false로 설정합니다.

    const primes = [];
    for (let i = m; i <= n; i++) {
      if (isPrime[i]) {
        primes.push(i);
      }
    }
    // M 이상 N 이하의 소수들을 배열에 저장합니다.
    return primes;
  }

  const primes = sieveOfEratosthenes(m, n);
  // M 이상 N 이하의 소수를 계산합니다.
  const output = primes.map((prime) => `<p>${prime}</p>`).join("");
  // 소수 배열을 HTML 요소로 변환합니다.
  document.getElementById("output").innerHTML = output;
  // 계산 결과를 HTML 요소에 출력합니다.
});
