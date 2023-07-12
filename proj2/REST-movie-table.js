var command = document.querySelector("#send");
command.onclick = REST_command;
var result = document.querySelector("#result");

function REST_command() {
  var val = document.querySelector('.sel:checked');
  console.log(val);
  if(!val) return;
  val = val.value;
  var id = document.querySelector("#id").value;
  var title = document.querySelector("#title").value;
  var genre = document.querySelector("#genre").value;
  var rating = document.querySelector("#rating").value;
  var actor = document.querySelector("#actor").value;
  var poster = document.querySelector("#poster").value;

  result.value="";
  switch(val) {
    case "get_all":
      fetch("http://127.0.0.1:52273/user")
        .then(response => response.json())
        .then(users => {display(users);console.log(users);});
      break;
    case "get_id":
      fetch(`http://127.0.0.1:52273/user/${id}`)
        .then(response => response.json())
        .then(users => {display(users);console.log(users);});
      break;
    case "post":
      fetch("http://127.0.0.1:52273/user", {
        method: "POST",
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },    
        body: new URLSearchParams({
          title: `${title}`,
          genre: `${genre}`,
          rating: `${rating}`,
          actor: `${actor}`,
          poster: `${poster}`,
        }),
      })
      .then(response => response.json())
      .then(users => {display(users);console.log(users);});
      break;
    case "put":
      fetch(`http://127.0.0.1:52273/user/${id}`, {
        method: "PUT",
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },    
        body: new URLSearchParams({
          title: `${title}`,
          genre: `${genre}`,
          rating: `${rating}`,
          actor: `${actor}`,
          poster: `${poster}`,
        }),
      })
      .then(response => response.json())
      .then(users => {display(users);console.log(users);});
      break;
    case "delete":
      fetch(`http://127.0.0.1:52273/user/${id}`, {
        method: "DELETE",
      })
      .then(response => response.json())
      .then(users => {display(users);console.log(users);});
      break;
    }
}

function display(users) {
  let string = '';
  if(!Array.isArray(users)) users = [users];
  if(!Object.keys(users[0]).includes('status'))
    users.forEach((user) => {
      string += `<table>
                  <tr>
                    <th>ID</th><td width="300">${user.id}</td>
                    <td rowspan="5" width="100"><img width="100" height="150" src="${user.poster}"></td>
                  </tr>
                  <tr><th>제목</th><td>${user.title}</td></tr>
                  <tr><th>장르</th><td>${user.genre}</td></tr>
                  <tr><th>평점</th><td>${user.rating}</td></tr>
                  <tr><th>출연</th><td>${user.actor}</td></tr>
                </table>`;
    });
  else
    string += `<table><tr><th>status</th><td>${users[0].status}</td></tr></table>`;
  result.innerHTML = string;
}
