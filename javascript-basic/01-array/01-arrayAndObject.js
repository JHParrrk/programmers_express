let makeArr = ["이것","하나하나를","요소라고","합니다"];
document.write(makeArr[1], "<br>");
//하나하나를

let ranking = ["정훈","주은","시윤"]
ranking.push("원두")
document.write(ranking, "<br>");
//정훈,주은,시윤,원두
ranking.pop();
document.write(ranking, "<br>");
//정훈,주은,시윤


document.write(ranking.includes("정훈"), "<br>");
//true

document.write(ranking.indexOf("시윤"), "<br>");
//2
document.write(ranking.indexOf("휘운"), "<br>");
//-1

let userData = {
	name:"이정훈",
	age:30,
	height:180,
	company:"코드공장"
}

document.write(userData.name, "<br>");
//이정훈
document.write(userData["age"], "<br>");
//30

document.write(Object.keys(userData), "<br>");
//name,age,height,company
document.write(Object.values(userData), "<br>");
//이정훈,30,180,코드공장

var age = 20;
var nickname = "코린이";
document.write("제 나이는" + age, "<br>");
document.write(nickname , " 코인아님", "<br>");
document.write(`제 나이는${age} <br> ${nickname} 코인아님`, "<br>");

//printf같은거, `는 문자열을 쓸 때 쓰는 따옴표 ' 
//가 아니라키보드의 1 왼쪽에 물결 누를 때 쓰는 그 것이다!