//let f1 = document.getElementById('food_1');
// console.log(f1); console.log(f1.childNodes[1]);
// console.log(f1.childNodes[1].nodeValue);
//console.log(f1.childNodes[1].firstChild.nodeValue); //차이점 구분하기

$(document).ready(function () {
    console.log($('#food_1').children().eq(1).html());
    // $('#food_1').children().eq(1).html(); jQuery사용문 : id가 food_1의 자식들 요소 중 1번째의
    // html요소
    $('#food_1 > ul > li')
        .eq(0)
        .css('background', 'red'); //jQuery 스타일 주는 법
    $('#food_1 > ul > li')
        .eq(1)
        .html('bulgogi'); //jQuery로 innerHTML하는 법
}); //jQuery로 ($) document라는 안의 내용을 다 로딩시킨 다음(ready) 기능실행(function)