async function init() {
  const response = await fetch('http://localhost:8090/https://search.naver.com/search.naver?where=nexearch&sm=top_sug.pre&fbm=1&acr=2&acq=%EC%83%81%EC%98%81&qdt=0&ie=utf8&query=%EC%83%81%EC%98%81%EC%98%81%ED%99%94', {
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }

});

const body = response.text().then(function(html){
  var html_dom = new DOMParser().parseFromString(html,'text/html');
  var Movie = html_dom.querySelectorAll(".data_area");
  if (Movie) {
    display(Movie);
  }
  
});
}


function display(Movies) {
  const result = document.querySelector('#result');
  let string = '';
  Movies.forEach((Movie) => {
    var title = Movie.querySelector(".area_text_box a").innerText;
    var Dlist = Movie.querySelectorAll(".info_group");
    var jangr = Dlist[0].querySelectorAll('dd')[0].innerText;
    var time = Dlist[0].querySelectorAll('dd')[1].innerText;
    var openday = Dlist[1].querySelector('dd').innerText;
    var score = Movie.querySelector(".num").innerText;
    var peoples = Movie.querySelector('span._text');
    if (peoples !== null) {
      var people = peoples.innerText;
    } else {
      var people = " ";
    }
    var Image = Movie.querySelector(".img_box > img").src;

    // var poster = Movie.querySelector("#m_dss_movie_img2").innerText;

    string += `<table><tr><th>제목</th><td>${title}</td></tr>
                <tr><th>장르</th><td>${jangr}</td></tr>
                <tr><th>상영시간</th><td>${time}</td></tr>
                <tr><th>개봉일</th><td>${openday}</td></tr>
                <tr><th>평점</th><td>${score}</td></tr>
                <tr><th>출연</th><td>${people}</td></tr>
                <tr><th>포스터</th><td><img width="178" height="260" src="${Image}"></td></tr>
                </table>`;
  });            
  result.innerHTML = string;
}

init();


// 
