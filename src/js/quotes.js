$(document).ready(function () {
  quotes();
})

function quotes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };
  xhttp.open("GET", "https://quotes.rest/qod?category=inspire", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("X-Theysaidso-Api-Secret", "YOUR API HERE");
  xhttp.send();

  console.log(xhttp);
}