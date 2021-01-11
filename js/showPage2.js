/**
 * showPage2.js
 */

function showPage() {
	let doc = xhtp.responseXML;
	let data = doc.getElementsByTagName('record');
	console.log(data);
	let tableTag = document.createElement('table');
	tableTag.setAttribute('border', '1');
	tableTag.setAttribute('id', 'tbl'); //insert용 id값

	// title tr
	// data tr => [배열]
	let headerTr = titleRow(data);
	let dataTrs = contentRow(data);
	tableTag.appendChild(headerTr);
	for (let i = 0; i < dataTrs.length; i++) {
		tableTag.appendChild(addDelBtn(dataTrs[i], delFunc));
		tableTag.appendChild(addUpdBtn(dataTrs[i], updateFunc));//수정버튼 추가하는것
	}
	document.getElementById('show').appendChild(tableTag);
}

function updateFunc() {
	
}

function delFunc() {
	console.log(this);//this 펑션을 불러오는 주체
	this.parentNode.parentNode.remove(); //이건 HTML창에서만 지움(데이터는 안지워서 새로고침하면 다시 나옴)
	let id = this.parentNode.parentNode.childNodes[0].childNodes[0].nodeValue;
	console.log(id);
	let req = new XMLHttpRequest();
	req.open('get', '../DeleteEmpServlet?empId=' + id);//servlet파일에 구현해주는게 데이터상으로 지우는거
	req.send();
	req.onload = function() {
		console.log(req.responseText);
	}
}

function addUpdBtn(tr, callBackFunc) {
	// 추가 버튼 코드 + 이벤트 등록
	let butn = document.createElement('button');
	butn.onclick = callBackFunc;
	butn.innerHTML = '수정';
	let tdTag = document.createElement('td');
	butn.setAttribute('style', 'padding:10px; text-align: center;');
	tdTag.appendChild(butn);
	tr.appendChild(tdTag);

	return tr;
}

function addDelBtn(tr, callBackFunc) {
	// 추가 버튼 코드 + 이벤트 등록
	let butn = document.createElement('button');
	butn.onclick = callBackFunc;
	butn.innerHTML = '삭제';
	let tdTag = document.createElement('td');
	butn.setAttribute('style', 'padding:10px; text-align: center;');
	tdTag.appendChild(butn);
	tr.appendChild(tdTag);

	return tr;
}

function titleRow(result) {
	console.log(result[0].childNodes[0].nodeName);
	let trTag = document.createElement('tr');
	for (let i = 0; i < result[0].childNodes.length; i++) {
		let thTag = document.createElement('th');
		thTag.setAttribute('style', 'padding:10px; color:white; background-color: grey; text-align: center;');
		thTag.setAttribute('id', 'TableHeader' + i);
		let textNode = document.createTextNode(result[0].childNodes[i].nodeName.toUpperCase());
		thTag.appendChild(textNode);
		trTag.appendChild(thTag);
	}

	let thTag = document.createElement('th');
	thTag.setAttribute('style', 'padding:10px; color:white; background-color: grey; text-align: center;');
	thTag.setAttribute('id', 'TableHeaderEnd');
	thTag.setAttribute('colspan', '2');
	thTag.innerHTML = "처리";
	trTag.appendChild(thTag);

	return trTag;
}

function contentRow(result) {
	let trTags = [];
	for (let i = 0; i < result.length; i++) {
		let trTag = document.createElement('tr');
		trTag.setAttribute('id', 'result' + i);

		for (let j = 0; j < result[i].childNodes.length; j++) {
			let tdTag = document.createElement('td');
			tdTag.setAttribute('style', 'padding:10px; text-align: center;');
			tdTag.setAttribute('id', 'result' + i + 'childNodes' + j);
			tdTag.onmouseover = function() {
				tdTag.style.fontSize = '20px';
				tdTag.style.backgroundColor = 'gold';
			}
			tdTag.onmouseout = function() {
				tdTag.style.fontSize = '16px';
				tdTag.style.background = 'none';
				//tdTag.style.opacity = 0.5;//투명률(0~1) = .5 로적어야함 0.5아님 = 50%
			}
			let textNode = document.createTextNode(result[i].childNodes[j].childNodes[0].nodeValue);
			tdTag.appendChild(textNode);
			trTag.appendChild(tdTag);
		}
		trTags.push(trTag);
		trTag.onmouseover = function() {
			trTag.style.backgroundColor = 'yellow';

			let showEmpId = document.getElementById('clickEmpId');
			showEmpId.innerHTML = result[i].childNodes[0].childNodes[0].nodeValue;
			let showfName = document.getElementById('clickfName');
			showfName.innerHTML = result[i].childNodes[1].childNodes[0].nodeValue;
			let showlName = document.getElementById('clicklName');
			showlName.innerHTML = result[i].childNodes[2].childNodes[0].nodeValue;
			let showemail = document.getElementById('clickemail');
			showemail.innerHTML = result[i].childNodes[3].childNodes[0].nodeValue;
			let showpNumber = document.getElementById('clickpNumber');
			showpNumber.innerHTML = result[i].childNodes[4].childNodes[0].nodeValue;
			let showhireDate = document.getElementById('clickhireDate');
			showhireDate.innerHTML = result[i].childNodes[5].childNodes[0].nodeValue;
			let showjId = document.getElementById('clickjId');
			showjId.innerHTML = result[i].childNodes[6].childNodes[0].nodeValue;
			let showsalary = document.getElementById('clicksalary');
			showsalary.innerHTML = result[i].childNodes[7].childNodes[0].nodeValue;

			//let showfName2 = document.getElementById('showfName');
			//showfName2.innerHTML = result[i].childNodes[1].childNodes[0].nodeValue;
			//let showlName2 = document.getElementById('showlName');
			//showlName2.innerHTML = result[i].childNodes[2].childNodes[0].nodeValue;
			//let showemail2 = document.getElementById('showemail');
			//showemail2.innerHTML = result[i].childNodes[3].childNodes[0].nodeValue;
			//let showpNumber2 = document.getElementById('showpNumber');
			//showpNumber2.innerHTML = result[i].childNodes[4].childNodes[0].nodeValue;
			//let showhireDate2 = document.getElementById('showhireDate');
			//showhireDate2.innerHTML = result[i].childNodes[5].childNodes[0].nodeValue;
			//let showjId2 = document.getElementById('showjId');
			//showjId2.innerHTML = result[i].childNodes[6].childNodes[0].nodeValue;
			//let showsalary2 = document.getElementById('showsalary');
			//showsalary2.innerHTML = result[i].childNodes[7].childNodes[0].nodeValue;
		}
		trTag.onmouseout = function() {
			trTag.style.background = 'none';
		}
	}
	return trTags;
}

