$.ajax({
    url: '../data/MOCK_DATA.json', 
        dataType: 'json', 
        success: showContent ,
    error: function (result) {
        console.log('error '+result.status+' '+result.statusText); //에러뜬거 콘솔에서 경로 확인후 이거 뜨게 하기
    }
});

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
    table.append(tr);

    $(data).each(function (idx, obj) {
        
        if(idx < 5 ){ //데이터 너무 많으니까 idx값만큼만 출력
            let tr = $('<tr />');
            $(tr).attr('id',obj.id);
            for (field of headers) {

                let td = $('<td />').html(obj[field]);//field가 headers 따라가니까 headers 배열 바꿔주면 같이 열 바뀜
                tr.append(td);
                table.append(tr); //if문안에 안넣으면 each 출력이라 tr 인덱스값만큼 계속 생성함
            }
        }
    });
    $('#show').append(table);
}