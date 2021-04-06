var fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function(e){
	console.log(e.target.files);

	var file = e.target.files[0]; //선택된 파일
	var reader = new FileReader();
	reader.readAsDataURL(file); //파일을 읽는 메서드 
	
	reader.onload = function(){
		var photoFrame = opener.document.querySelector("body");
		photoFrame.style = `background : url(${reader.result}); background-size : cover; background-repeat : no-repeat`;
		localStorage.setItem('back', reader.result);
	  }
})	  