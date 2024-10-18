`index.html`이 result.png 이미지와 같이 출력될 수 있도록 모든 src 폴더 내의 모든 파일을 완성해야 합니다.

1. data 폴더
   data 폴더에는 data.js 파일이 존재합니다.
   해당 파일에는 각 학생의 과목별 점수를 담고 있는 객체 데이터가 있으며, 그러한 객체를 모아 담아둔 students라는 이름의 배열이 있습니다.

2. src 폴더 (문제 폴더)
   src 폴더 내부에는 stage1.js, stage2.js 두개의 파일이 존재합니다.

    1. stage1.js
       stage1.js에는 calculateAverage라는 이름의 함수가 존재합니다.
       해당 함수에서 리턴해주는 값은 stage2.js 파일 내의 함수, designateGrade에 작성되어 있는 score 상수에 담겨지게 됩니다.
       즉, stage1.js 파일에서 요구하는 로직을 모두 수행한 데이터를 리턴해주게 되면, stage2.js 파일에서 해당 데이터를 활용할 수 있습니다.

    2. stage2.js
       stage2.js에는 designateGrade라는 이름의 함수가 존재합니다.
       해당 함수 안에 작성되어 있는 score 상수에는, stage1.js 파일의 calculateAverage 함수가 리턴한 값이 담기게 됩니다.
       stage1.js에서 로직을 거친 데이터를 활용해 주어진 문제를 풀이 후, 리턴 해주어야 합니다.
       이때, 리턴된 데이터는 render.js 파일로 전달되어 화면에 출력되게 됩니다.

    각 파일에 작성되어 있는 주석을 꼼꼼히 확인하여 요구하는 형태의 데이터를 만들어 리턴해 주세요!
    요구대로 데이터가 작성되었다면, result.png 파일과 같은 형태가 브라우저에 출력될 것입니다.

-   render.js 파일은 stage2.js 파일에서 리턴한 데이터를 기반으로 화면에 데이터를 출력해주는 역할만을 합니다. 별도의 수정은 필요치 않습니다.
-   data 폴더 내부의 파일은 수정되어서는 안됩니다.
-   로직 작성에 대한 방향이 잡히지 않는다면, 파일의 실행 순서를 살펴 보세요!
    ( render.js => stage1.js => stage2.js )
