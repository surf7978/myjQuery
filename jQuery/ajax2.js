$(function () { 
    $.ajax({
        url: '../data/MOCK_DATA.json', 
        dataType: 'json', 
        success: showContent,
        error: function (url) {
            console.log('error '+url.status+' '+url.statusText); //에러뜬거 콘솔에서 경로 확인후 이거 뜨게 하기
        }
    });
    //button 클릭한 것 삭제 이벤트
    $('#btn').on('click', function(){
        //헤드 체크박스는 삭제안되게 하기
        // if($('input:checked').attr('id','all_check')){
        // }else{
        // }
        $('input:checked').parent().parent().remove();
    });
    //all_check 클릭 이벤트
    $('body').on('click', '#all_check', function(){ //이렇게 하기 싫으면 걍 showContent 안에다가 넣으면 됨
        //console.log('checked'); //위치 $.ajax() 안에 하면 안됨 되게하려면 앞에$(document).해야함

        //헤드에 있는 체크박스로 전체 체크 한번에 하기
        //방법1
        $('td>input').prop('checked', $('#all_check').is(":checked")); //참,거짓값은 prop써야함(html아님)

        //방법2
        // if($('#all_check').is(":checked")){
        //     $('td>input').prop('checked', true);
        // }else {
        //     $('td>input').prop('checked', false);
        // }

    });
    //역으로 컨텐츠에 있는거 다 체크되면 헤드체크박스 체크 되게 하기
    //+ 만약 하나라도 체크해제 되면 헤드체크박스 해제되게 하기
    $('body').on('click', function(){
        console.log('클릭됨');
        console.log($('td>input'));
        if($('td>input:checked').length == $('td>input').length){
            $('#all_check').prop('checked', true);
        }else{
            $('#all_check').prop('checked', false);
        }
    });
});


function showContent(url) {
    console.log('success', url);
    let data = url;
    let table = $('<table id="tbl" style="text-align: center"/>').attr(
        'border',
        '2px'
    );

    //테이블헤드
    let headers = ['chkbox', 'id', 'first_name', 'last_name', 'email'];
    let tr = $('<tr />');
    for (field of headers) {
        let th = $('<th />').attr('style', 'padding:10px');
        if(field == 'chkbox'){
            let checkbox = $('<input />').attr('type', 'checkbox').attr('id','all_check');
            th.append(checkbox);
        }else{
            th.html(field.replace('_', ' ').toUpperCase());
        }
        tr.append(th);
    }
    table.append(tr);

    //테이블 콘텐츠
    $(data).each(function (idx, obj) {
        if (idx < 5) {
            let tr = $('<tr />');
            $(tr).attr('id', obj.id);
            $(tr).mouseover(function () {
                $(this).css('background-color', 'yellow');
            });
            $(tr).mouseout(function () {
                $(this).css('background-color', '');
            });
            for (field of headers) {
                let td = $('<td />');
                if (field == 'chkbox') {
                    let checkbox = $('<input />')
                        .attr('type', 'checkbox')
                        .attr('id', field+idx); //chkbox 콜름에 id값 넣어줌
                    td.append(checkbox);
                } else {
                    td.html(obj[field]);
                }
                tr.append(td);
            }
            table.append(tr);
        }
    });
    $('#show').append(table);

    //all_check 클릭 이벤트
    // $('#all_check').on('click', function(){
    //     console.log('checked'); //위치 $.ajax() 안에 하면 안됨 되게하려면 $('#all_check')보다 상위인 body나 document에 해야함
    // });
}