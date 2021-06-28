// 단과대학(college-select) 선택에 변화가 생기면 동작
var change_college = document.getElementById('college-select');
change_college.addEventListener('change', function(){
	select_view(this.value);
})

function select_view(selected){
    var selects = document.querySelectorAll(".major-select");
    for (var x = 0; x < selects.length; x++){
        selects[x].style.display = 'none';
    }

    if(selected == "공과대학"){
        document.getElementById("gong-select").style.display = "inline";
    }else if(selected == "스마트융합대학"){
        document.getElementById("smart-select").style.display = "inline";
    }else if(selected == "문과대학"){
        document.getElementById("moon-select").style.display = "inline";
    }else if(selected == "사범대학"){
        document.getElementById("sabum-select").style.display = "inline";
    }else if(selected == "경상대학"){
        document.getElementById("gyung-select").style.display = "inline";
    }else if(selected == "법정대학"){
        document.getElementById("bub-select").style.display = "inline";
    }else if(selected == "생명∙나노과학대학"){
        document.getElementById("saeng-select").style.display = "inline";
    }else if(selected == "사회적경제융합대학"){
        document.getElementById("social-select").style.display = "inline";
    }else if(selected == "린튼글로벌스쿨"){
        document.getElementById("linton-select").style.display = "inline";
    }else if(selected == "아트&디자인테크놀로지대학"){
        document.getElementById("art-select").style.display = "inline";
    }else if(selected == "자유전공학부"){
        document.getElementById("jayu-select").style.display = "inline";
    }
}

