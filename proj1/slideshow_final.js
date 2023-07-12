var slides = document.querySelectorAll("#slides > img");
var images = document.querySelector('#slides')
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var current = 0;
var image_number = document.querySelectorAll('.buttons');


showSlides(current);
prev.onclick = prevSlide;
next.onclick = nextSlide;

for (let i = 0; i < image_number.length; i++) {
  image_number[i].onclick = function() {
    current = i;
    showSlides(current);
  }
}

function showSlides(n) {
  let width = slides[0].width;
  images.style.transform = "translateX(" + (-width * n) + "px)";
  current = n;
}

function prevSlide() {
  if (current > 0) {
    current -= 1;
  } else {
    current = slides.length - 1;
  }
  showSlides(current);
}

function nextSlide() {
  if (current < slides.length - 1) {
    current += 1;
  } else {
    current = 0;
  }
  showSlides(current);  
}





// 할일 목록 
function newRegister() {
  var newItem = document.createElement("li");  // 요소 노드 추가
  var subject = document.querySelector("#subject");  // 폼의 텍스트 필드
  var newText = document.createTextNode(subject.value);  // 텍스트 필드의 값을 텍스트 노드로 만들기
  newItem.appendChild(newText);   // 텍스트 노드를 요소 노드의 자식 노드로 추가
  newItem.style.height = "30px";
  var trash = document.createElement('img');
  trash.src = 'images/trash.png';
  trash.style.width="25px";
  trash.style.float = "right";
  trash.style.marginRight = "10px"
  newItem.appendChild(trash);

  var itemList = document.querySelector("#itemList");  // 웹 문서에서 부모 노드 가져오기 
  itemList.insertBefore(newItem, itemList.childNodes[0]);  // 자식 노드중 첫번째 노드 앞에 추가
  // itemlist.appendChild(newItem);

  subject.value="";

  var items = document.querySelectorAll("li");
  for(i=0; i<items.length;i++){
    trash.addEventListener("click", function(){
      if(trash.parentNode.parentNode)  
        trash.parentNode.parentNode.removeChild(trash.parentNode);// 부모의 부모에서 삭제
    });
  }
}

// 사진에 마우스오버 -> 공 튀기기 
var ad= document.querySelector('.ad');
var box = document.querySelector('.box');
var container = document.querySelector("#container");

ad.addEventListener("mouseover", function() {
  box.style.display="none";
  void box.offsetWidth;
  box.style.display="flex";
});



