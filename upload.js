var fileInput = document.getElementById('fileInput');
var fileSubmit = document.getElementById('fileSubmit');
var fileCancel = document.getElementById('fileCancel');

var imageURL = "";

// 배경화면 적용
fileSubmit.addEventListener('click', function(){
	var photoFrame = opener.document.querySelector("body");
	photoFrame.style = `background : url(${imageURL}); background-size : cover; background-repeat : no-repeat`;
	localStorage.setItem('back', imageURL);
})

// 배경화면 적용취소
fileCancel.addEventListener('click', function(){
	opener.parent.location.reload();
	self.close();
})

fileInput.addEventListener('change', function(e){
	console.log(e.target.files);

	var file = e.target.files[0]; //선택된 파일
	var reader = new FileReader();
	reader.readAsDataURL(file); //파일을 읽는 메서드 
	
	// 읽어온 파일 미리 적용된 화면 보여줌.
	reader.onload = function(){
		var photoFrame = opener.document.querySelector("body");
		photoFrame.style = `background : url(${reader.result}); background-size : cover; background-repeat : no-repeat`;
		imageURL = reader.result;
	}
})	  