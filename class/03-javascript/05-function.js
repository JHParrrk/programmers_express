let isStarted = false;

let random = () => {

    if(isStarted === false) {
        //타이머가 작동중이 아닐때
        isStarted = true
        document.getElementById('target_btn').disabled = false
        const number = Math.random()                 // 0.77621523...
        const token = Math.floor(number * 1000000)   // 776215
        const paddedToken = String(token).padStart(6, "0")
        document.getElementById("target").innerText = paddedToken
    
        document.getElementById("target").style.color = "#" + token

        let time = 10
        let timer

        

        timer = setInterval(function () {
            if (time >= 0) {
                const minutes = Math.floor(time / 60)
                const seconds = String(time - minutes * 60).padStart(2, "0")
                document.getElementById("time").innerText = minutes + ":" + seconds
                // console.log(minutes + ":" + seconds)
                time -= 1;
            } else {
                document.getElementById('target_btn').disabled = true
                isStarted = false
                clearInterval(timer)
            }
        }, 1000)
    } else {
        //타이머가 작동중일때

    }

    //alert("휴대폰 인증번호: " + token)
}