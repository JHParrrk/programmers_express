function popId() {
  let useEmail = document.getElementById("email").value;

  if (!useEmail) {
    alert("이메일을 입력해주세요.");
    return;
  }
}

function popPw() {
  let usePw = document.getElementById("password").value;
  if (!usePw) {
    alert("비밀번호를 입력해주세요.");
    return;
  }
}

function myFunction() {
  let useEmail = document.getElementById("email").value;
  let usePw = document.getElementById("password").value;

  if (!useEmail) {
    alert("아이디를 입력해주세요.");
    return;
  } else if (!usePw) {
    alert("비밀번호를 입력해주세요.");
    return;
  } else {
    alert(
      "입력받은 아이디는 " +
        useEmail +
        "입니다. \n입력받은 비밀번호는 " +
        usePw +
        "입니다."
    );
  }
}
