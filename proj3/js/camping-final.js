async function drawMap() {
  const lat = 37.55684;
  const lng = 126.91404;

  var mapContainer = document.querySelector('#map'), // 지도를 표시할 div 
      mapOption = { 
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표 - 이지스퍼블리싱
        level: 14 // 지도의 확대 레벨
      };

  // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption); 

  // 마커 클러스터러를 생성합니다 
  var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    minLevel: 10 // 클러스터 할 최소 지도 레벨 
  });

  // 오픈 데이터 서버에서 캠핑장 정보 가져오기
  const campingSite = await getCampingSite();
  console.log(campingSite);
  
  // 마커들을 모아놓을 변수
  var markers = [];
  for(let i = 0; i < campingSite.length; i++) { 
    // 마커를 생성합니다
    if (campingSite[i] === undefined){
      continue;
    }
    var arr = campingSite[i].area;
    var arr2 = campingSite[i].address;
    var conc = arr.concat(arr2);
  
    console.log(campingSite[i].address);

    var string = "";
    var query = encodeURI(conc);
    const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${query}`, {
      headers:  {
                  "Authorization": "KakaoAK 66a412f018a534a969db617e1f51a861"
                }
    });
    if( response === undefined){
      continue;
    }
    // console.log(response);
    const data = await response.json();
    const locations = data.documents;
    // console.log(locations);

    if (locations.length > 0){
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(locations[0].address.y, locations[0].address.x),
        
      });
      markers.push(marker);   // 마커를 배열에 추가합니다
      
      let Content = `<div style="width: 240px; padding: 10px; font-size: 15px;">${campingSite[i].title} ${campingSite[i].openday}<br>${campingSite[i].area} ${campingSite[i].address}<br>위도: ${locations[0].address.y}<br>경도: ${locations[0].address.x}</div>`;
      var infowindow = new kakao.maps.InfoWindow( {
        content : Content   // 인포윈도우에 표시할 내용
      });
      
        // 마커에 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        // 마커에 마우스오버하면 makeOverListener() 실행
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));  
      // 마커에서 마우스아웃하면 makeOutListener() 실행
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));   
    }
  }

  clusterer.addMarkers(markers);
}



async function getCampingSite() {
  const url = 'http://apis.data.go.kr/6480000/gyeongnammarket/gyeongnammarketList?serviceKey=XxNP2yi6IsCApaUkBgBS7b5bfevXhR2s9nJrIutTd%2FlsYzZw19AmAzdCkm96U%2FcX5uCgJcTwJcfuYosLBbghYQ%3D%3D&numOfRows=78&pageNo=1&resultType=json';

  let res = await fetch(url);
  let json = await res.json();
  const campingSite = json.gyeongnammarketList.body.items.item;

  return campingSite;
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
  return function() {
    infowindow.open(map, marker);          
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
  return function() {
    infowindow.close();
  };
}

var mapdraw = document.querySelector("#mapdraw");
mapdraw.onclick = drawMap;
