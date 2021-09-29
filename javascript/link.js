// 로컬저장소에 저장된 이미지 불러와서 배경화면 설정 및 major 설정

var getMajor = '';

window.onload = function(){
	getImage = localStorage.getItem('back');
	if(localStorage.getItem('major') != ''){
		getMajor = localStorage.getItem('major');
	}

	document.querySelector('body').style = `background : url(${getImage}); background-size : cover; background-repeat : no-repeat;`;
	startClock();
}

// 자주 방문한 사이트 객체
function topSite(){}
var sites = [];

//크롬 자주 방문한 사이트 추출 최대 10개
chrome.topSites.get(function(info){
	for(var i=0;i<info.length;i++) {
		sites[i] = new topSite();
		sites[i].title = info[i].title;
		sites[i].url = info[i].url;
		sites[i].tile_id = "tile_"+i;
		sites[i].img_id = "top_img_"+i;
		sites[i].title_id = "top_title_"+i;
		setSites(sites[i]);
		// alert(info[i].url);
	}
});

// 요소에 각각 자주 방문한 사이트 적용
function setSites(site){
	var tile_element = document.getElementById(site.tile_id);
	var img_element = document.getElementById(site.img_id);
	var title_element = document.getElementById(site.title_id);
	
	var regex = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
	var result_url = site.url.match(regex);

	img_element.src = result_url+'/favicon.ico';

	img_element.addEventListener('click', function(){
		location.href = site.url;
	})
	img_element.addEventListener('error', function(){
		this.src = 'favicon.png';
	})

	tile_element.href = site.url;
	title_element.innerText = site.title;
}

//tile에 대한 마우스 over, out 이벤트 설정
var tiles = document.querySelectorAll(".tile");
var tilesLength = tiles.length;

for(var i=0; i < tilesLength; i++){
	tiles[i].addEventListener("mouseover",function(){
		this.style.opacity = 0.5;
	});
	tiles[i].addEventListener('mouseout', function(){
		this.style.opacity = 1;
	});
}

// 버튼 클릭 이벤트 리스너 설정
var jButton = document.getElementById('noticebtn');
jButton.addEventListener('click', function(){
	show('notice');
})

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

var portalButton = document.getElementById('hiportalbtn');
portalButton.addEventListener('click', function(){
	location.href = "http://my.hnu.kr/"
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
	else if (click === 'notice'){
		getLink(click);
	}
	else{
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
	var countBoxes = document.querySelectorAll('.count-box');
	for(i=0; i<countBoxes.length; i++){
		countBoxes[i].style.display='none';
	}
	
	document.getElementById('websites').style.display = "none";
	document.querySelector('iframe').style.display = "block";
	document.querySelector('iframe').style.visibility = "visible";
	if(click == 'janghak'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTEw";
	}else if(click == 'notice'){
		document.querySelector('iframe').src = "http://www.hannam.ac.kr/kor/community/community_01_1.html";	
	}else if(click == 'haksa'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NzQ1";
	}else if(click == 'major'){
		if(getMajor != ''){
			setMajor();
		}else{
			document.querySelector('iframe').src = "info.html";
		}
	}
}

function setMajor(){
	if(getMajor == '국어국문∙창작학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTI3Mg==";
	}else if(getMajor == '영어영문학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTAxOQ==";
	}else if(getMajor == '일어일문학'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=ODA=";
	}else if(getMajor == '프랑스어문학전공'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=OTE=";
	}else if(getMajor == '문헌정보학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NjI=";
	}else if(getMajor == '사학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTEwNQ==";
	}else if(getMajor == '기독교학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NTU=";
	}else if(getMajor == '국어교육과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NTE=";
	}else if(getMajor == '영어교육과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?p_bdseq=77";
	}else if(getMajor == '교육학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NTA=";
	}else if(getMajor == '역사교육과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NzY=";
	}else if(getMajor == '미술교육과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NjM=";
	}else if(getMajor == '수학교육과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NzE=";
	}else if(getMajor == '정보통신공학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTc2Mw==";
	}else if(getMajor == '전기전자공학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?p_bdseq=81";
	}else if(getMajor == '멀티미디어공학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NTk=";
	}else if(getMajor == '건축학과(5년제)'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTEzNQ==";
	}else if(getMajor == '건축공학전공'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTM4MQ==";
	}else if(getMajor == '토목환경공학전공'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=ODk=";
	}else if(getMajor == '기계공학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NTQ=";
	}else if(getMajor == '화학공학과'){
		document.querySelector('iframe').src = "http://chem-eng.hannam.ac.kr/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/";
	}else if(getMajor == '신소재공학과'){
		document.querySelector('iframe').src = "http://polymer.hannam.ac.kr/%ed%95%99%ea%b3%bc%ec%86%8c%ec%8b%9d/";
	}else if(getMajor == '컴퓨터통신무인기술학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTIyNg==";
	}else if(getMajor == '멀티미디어학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTIyOA==";
	}else if(getMajor == '컴퓨터공학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NTY5";
	}else if(getMajor == '산업경영공학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=Njc=";
	}else if(getMajor == 'AI융합학과'){
		document.querySelector('iframe').src = "http://smart.hannam.ac.kr/%ed%95%99%ea%b3%bc%ea%b3%b5%ec%a7%80/";
	}else if(getMajor == '수학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?p_bdseq=731";
	}else if(getMajor == '빅데이터응용학과'){
		document.querySelector('iframe').src = "http://bigdata.hannam.ac.kr/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/";
	}else if(getMajor == '경영학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NDc=";
	}else if(getMajor == '회계학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=OTQ=";
	}else if(getMajor == '무역학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=OTEx";
	}else if(getMajor == '경제학전공'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MjMx";
	}else if(getMajor == '중국경제통상학전공'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTAxMQ==";
	}else if(getMajor == '호텔항공경영학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=ODc=";
	}else if(getMajor == '글로벌IT경영'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTM5MA==";
	}else if(getMajor == '법학부'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NjQ=";
	}else if(getMajor == '행정학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=OTI=";
	}else if(getMajor == '경찰학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NDg=";
	}else if(getMajor == '정치∙언론학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=ODQ=";
	}else if(getMajor == '생명시스템과학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=Njg=" ;
	}else if(getMajor == '식품영양학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?p_bdseq=72";
	}else if(getMajor == '화학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NzMw";
	}else if(getMajor == '간호학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NjI2";
	}else if(getMajor == '스포츠과학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=Njk=";
	}else if(getMajor == '바이오제약공학과'){
		document.querySelector('iframe').src = "http://biopharm.hannam.ac.kr/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/";
	}else if(getMajor == '사회복지학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NjY=";
	}else if(getMajor == '아동복지학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NzQ=";
	}else if(getMajor == '상담심리학과'){
		document.querySelector('iframe').src = "http://counselpsy.hannam.ac.kr/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/";
	}else if(getMajor == '사회적경제기업학과'){
		document.querySelector('iframe').src = "http://seb.hannam.ac.kr/%ea%b3%b5%ec%a7%80%ec%82%ac%ed%95%ad/";
	}else if(getMajor == '글로벌비즈니스'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=ODYz";
	}else if(getMajor == '융합디자인학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NTg=";
	}else if(getMajor == '회화과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=NzEy";
	}else if(getMajor == '의류학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTQx";
	}else if(getMajor == '미디어영상학과'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTU0NA==";
	}else if(getMajor == '자유전공학부'){
		document.querySelector('iframe').src = "http://uniboard.hannam.ac.kr/servlet/controller.helpdesk.UniboardServlet?seq=MTUzMA==";
	}
}