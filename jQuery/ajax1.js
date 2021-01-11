$(/*document).ready(*/function () { //ready써주면 밑에 body 다 실행된 다음에 이거 실행됨
    $.ajax({
        url: '../data/MOCK_DATA.json', 
            dataType: 'json', //'text', 데이터타입 바꾸는 명령문
            success: //function (result) {
        //console.log('success', result),
            showContent //(result)
        //}
        ,
        error: function (result) {
            console.log('error '+result.status+' '+result.statusText); //에러뜬거 콘솔에서 경로 확인후 이거 뜨게 하기
        }
    });
    //버튼 클릭시 입력칸에 내용 나오는 이벤트
    $('#btn').click(addRow);

    //찾기 이벤트
    $('#findBtn').on('click', findRow); // .click = .on('click', ) 
});

//찾기 기능
function findRow(){ //jQ의 on.('click') = JS의 onclick()
        let findId = $('#find_id').val();
        let findRow = $('#'+findId).css('background-color','silver');
        //신규 row생성
        let tr = makeNewTr();
        findRow.before(tr); //before = 전에 추가
}

function makeNewTr(){
    console.log($('.input_val'));
    let inputs = $('.input_val');
    let tr = $('<tr style="background-color:gold" />');
    $(tr).hover(function(){ //mouseover+mouseout=hover
        $(this).css('background-color','violet');
    }, function(){
        $(this).css('background-color','');
     });

    for(let i =0; i<inputs.length; i++){
        let td = $('<td />').html(inputs[i].value);
        tr.append(td);
        $(td).hover(function(){ //mouseover+mouseout=hover
            $(this).css('background-color','purple');
        }, function(){
            $(this).css('background-color','');
         });
    }
    //정보추가 펑션 따로 빼놓음
    $(tr).click(trToInputFunc);

    //정보삭제 펑션 따로 빼놓음
    $(tr).click(delFunc(tr));

    //리턴해줘야 여기 적용된 값을 밖에서 사용함
    return tr;
}

//열 추가 기능
function addRow(){
    let tr = makeNewTr();
    $('#tbl').append(tr);
}

//정보삭제 버튼추가 및 기능
function delFunc(tr){
    let btnTag= $('<td />');
    let btn = $('<button />').html('삭제');
    $(btn).click(function(){ 
        $(this).parent().parent().remove();
    }); 
    btnTag.append(btn);
    tr.append(btnTag);

    $(btn).mouseover(btnColor(btn));
}

function btnFunc(){
    console.log($(this));
    let id = $('#id').val();
    let fName = $('#first_name').val();
    let lName = $('#last_name').val();

    let tr = $('<tr />');
    let tdId = $('<td />').html(id);
    let tdFirst = $('<td />').html(fName);
    let tdLast = $('<td />').html(lName);
    let tdEmail = $('<td />').html($('#email').val()); //위에 변수 선언 안하고 걍 이렇게 한번에 써줘도 됨

    $('#tbl').append($(tr).append(tdId,tdFirst,tdLast,tdEmail));
}

function showContent(result) { //result = url의 결과값
    console.log('success', result);
    let data = result;
    let table = $('<table id="tbl" style="text-align: center"/>').attr('border','2px');

    //테이블헤드 만드는 방법
    let headers = ['id','first_name','last_name','email'];//, 'gender', 'address']; //ip_address안나오게하는법 2 배열을 사용하면 출력되는거 위치도 바꿀 수 있음
    let tr = $('<tr />');
    for (field of headers) {
        let th = $('<th />').html(field.replace('_',' ').toUpperCase());
        tr.append(th);
    }
    //삭제버튼 헤드
    let btnTagHeader = $('<th />').html('처리').attr('id', 'delHeader');
    tr.append(btnTagHeader);

    table.append(tr);


    $(data).each(function (idx, obj) {
        
        if(idx < 5 ){ //데이터 너무 많으니까 idx값만큼만 출력
            let tr = $('<tr />');
            $(tr).attr('id',obj.id);
        
            $(tr).click(trToInputFunc); // tr클릭시 정보생성 trToInputFunc로 따로 뺌
            //$(tr).mouseover(trColor(tr));
            $(tr).on({'click': trToInputFunc,
                'mouseover': function(){$(this).css('background-color','yellow');},
                'mouseout': function(){$(this).css('background-color','');}
            });

            for (field of headers) {

                let td = $('<td />').html(obj[field]);//field가 headers 따라가니까 headers 배열 바꿔주면 같이 열 바뀜
                tr.append(td);
                table.append(tr); //if문안에 안넣으면 each 출력이라 tr 인덱스값만큼 계속 생성함
                
                $(td).mouseover(tdColor(td));
            }

            //컨텐츠 삭제버튼 추가
            $(tr).click(delFunc(tr));
        }
    });
    $('#show').append(table);

        
    //내가 한 것 테이블헤드
    // for(field in data[0]){
    //     if(field != 'gender' && field != 'ip_address'){ //ip_address, gender안나오게하기
    //         let th = $('<th />').html(field.replace('_',' ').toUpperCase());
    //         table.append(th);
    //     }
    // }

    //내가 한 것 테이블컨텐츠
    // for (DT of data) {
    //     let tr = $('<tr / >');
    //     for (dt in DT) {
    //         let td = $('<td />').html(DT[dt]);
    //     }
    //     table.append(tr);
    // }
    // $('body').append(table);
}

function trToInputFunc(){
    console.log($(this).children().eq(0).html()); //eq(0)=첫번째요소
    $('#id').val($(this).children().eq(0).html());
    $('#first_name').val($(this).children().eq(1).html());
    $('#last_name').val($(this).children().eq(2).html());
    $('#email').val($(this).children().eq(3).html());

    //테이블헤드 '처리'의 id값이 delHeader임
    $('#delHeader').val();
}

function trColor(tr){
        $(tr).mouseover(function(){
            $(this).css('background-color','yellow');
        });
        $(tr).mouseout(function(){
            $(this).css('background-color','');
        });

}

function tdColor(td){
    $(td).mouseover(function(){
        $(this).css('background-color','gold');
    });
    $(td).mouseout(function(){
        $(this).css('background-color','');
    });
}

function btnColor(btn){
    $(btn).mouseover(function(){
        $(this).css('background-color','red');
    });
    $(btn).mouseout(function(){
        $(this).css('background-color','lightgray');
    });
}