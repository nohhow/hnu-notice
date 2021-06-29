// 로컬저장소에 저장된 이미지 불러와서 배경화면 설정 및 major 설정

var getMajor = 'info.html';

window.onload = function(){
	getImage = localStorage.getItem('back');
	if(localStorage.getItem('major') != ''){
		getMajor = localStorage.getItem('major');
	}

	document.querySelector('body').style = `background : url(${getImage}); background-size : cover; background-repeat : no-repeat;`;

}

// 버튼 클릭 이벤트 리스너 설정
var jButton = document.getElementById('janghakbtn');
jButton.addEventListener('click', function(){
	show('janghak');
})

var hButton = document.getElementById('haksabtn');
hButton.addEventListener('click', function(){
	show('haksa');
})

var cButton = document.getElementById('majorbtn');
cButton.addEventListener('click', function(){
	show('major');
})

var hiButton = document.getElementById('hiclassbtn');
hiButton.addEventListener('click', function(){
	location.href = "http://hiclass.hannam.ac.kr/"
})

var htButton = document.getElementById('htqmbtn');
htButton.addEventListener('click', function(){
	location.href = "https://htqm.hannam.ac.kr/"
})

var searchBtn = document.getElementById('searchbtn');
searchBtn.addEventListener('click', function(){
	searchonGoogle();
})

var searchText = document.getElementById('searchtext');
searchText.addEventListener('keypress', function(){
	enterkey();
})

var goHome = document.getElementById('home');
goHome.addEventListener('click', function(){
	location.href = 'index.html'
})

// var fileInput = document.getElementById('fileInput');
// fileInput.addEventListener('change', function(e){
// 	console.log(e.target.files);

// 	var file = e.target.files[0]; //선택된 파일
// 	var reader = new FileReader();
// 	reader.readAsDataURL(file); //파일을 읽는 메서드 
	
// 	reader.onload = function(){
// 		var photoFrame = document.querySelector("body");
// 		photoFrame.style = `background : url(${reader.result}); background-size : cover; background-repeat : no-repeat`;
// 		localStorage.setItem('back', reader.result);
// 	  }
// })	  

var gofileUpload = document.getElementById('bgSetBtn');
gofileUpload.addEventListener('click', function(){
	window.open('fileUpload.html', 'popup', 'width = 500, height = 500, top = 100, left = 200, location = no');
})



//iframe 각각 클릭 시 보여줄 파일지정
function show(click){
	if (click === 'janghak') {
		getLink(click);
	}
	else if (click === 'haksa') {
		getLink(click);
	}
	else{
		alert(getMajor);
		getLink(click);
	}
}

// 검색창 만들기
function getText(){
	text =document.getElementById('searchtext').value;
	return text;
}

function searchonGoogle(){
	word = getText();
	location.href = "http://www.google.com/search?q=" + word;
}

// text 창에서 enter키 입력시 구글 검색
function enterkey(){
	if (window.event.keyCode == 13) {
		searchonGoogle();
	}
}

// iframe 보이기 및 링크 설정
function getLink(click){
	document.querySelector('iframe').style.visibility = "visible";
	if(click == 'janghak'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTEw";
	}else if(click == 'haksa'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NzQ1";
	}else if(click == 'major'){
		if(getMajor == '' || getMajor == 'info.html'){
			document.querySelector('iframe').src = "info.html";
		}else{
			setMajor();
		}
	}
}

function setMajor(){
	if(getMajor == '국어국문∙창작학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTI3Mg==";
	}
}