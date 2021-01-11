/**
 * showPage.js
 */

function showPage(){
	let doc = xhtp.responseXML;
	let data = doc.getElementsByTagName('record');
	console.log(data);
	let tableTag = document.createElement('table');
	tableTag.setAttribute('border','1');
	
	// title tr
	// data tr => [배열]
	let headerTr = titleRow(data);
	let dataTrs = contentRow(data);
	tableTag.appendChild(headerTr);
	for(let i=0; i<dataTrs.length; i++){
		tableTag.appendChild(dataTrs[i]);
	}
	document.getElementById('show').appendChild(tableTag);
}

function titleRow(result){
	console.log(result[0].childNodes[0].nodeName);
	let trTag = document.createElement('tr');
	for(let i=0; i<result[0].childNodes.length; i++){
		let thTag = document.createElement('th');
		thTag.setAttribute('style', 'padding:10px; color:white; background-color: grey; text-align: center;');
		let textNode = document.createTextNode(result[0].childNodes[i].nodeName.toUpperCase());
		thTag.appendChild(textNode);
		trTag.appendChild(thTag);
	}
	//삭제 헤드
	let thTag = document.createElement('th');
	thTag.setAttribute('style', 'padding:10px; color:white; background-color: grey; text-align: center;');
	let textNode = document.createTextNode("처리");
	thTag.appendChild(textNode);
	trTag.appendChild(thTag);
		
		
	return trTag;
}

function contentRow(result){
	let trTags=[];
	for(let i=0; i<result.length; i++){
		let trTag = document.createElement('tr');
		trTag.onmouseover=function(){
			trTag.style.backgroundColor='yellow';
		};
		trTag.onmouseout=function(){
			trTag.style.backgroundColor='white';
		};
		for(let j=0; j<result[i].childNodes.length; j++){
			let tdTag = document.createElement('td');
			tdTag.setAttribute('style', 'padding:10px; text-align: center;');
			//tdTag.onmouseover=function(){
			//	tdTag.style.backgroundColor='gold';
			//};
			//tdTag.onmouseout=function(){
			//	tdTag.style.backgroundColor='white';
			//};
			let textNode = document.createTextNode(result[i].childNodes[j].childNodes[0].nodeValue);
			//let textNode = document.createTextNode(result[i].childNodes[j].firstChild.nodeValue);
			//let textNode = document.createTextNode(result[i].childNodes[j].lastChild.nodeValue);
			//다 같은 말이지만 콘솔에서 copy path하는게 더 좋음
			tdTag.appendChild(textNode);
			trTag.appendChild(tdTag);
		}
		//삭제 버튼 추가
		
		//삭제 내용
		let button = document.createElement('button');
		button.setAttribute('style', 'padding:10px; text-align: center;');
		button.innerHTML = '삭제';
		
		button.onclick = function(){
			console.log(this.parentNode.parentNode.remove()); //this=buttonTag + parentNode=trTag + parentNode=tdTag + remove()=삭제
			let id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
			let req = new XMLHttpRequest();
			req.open('get', '../DeleteEmpServlet?empId='+id); //이거 html연동된 위치따라 수정해줘야함
			req.send();
			req.onload = function(){
				console.log(req.responseText);
			}
		}
		
		let tdTag = document.createElement('td');
		tdTag.appendChild(button);
		trTag.appendChild(tdTag);
		
		
		trTags.push(trTag);
	}
	return trTags;	
}
