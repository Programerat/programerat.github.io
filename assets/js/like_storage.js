var myHeaders = new Headers();
let totalLikes = 0;
myHeaders.append("Content-Type", "application/json");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

function updateLikeNumbers(likes) {
    let element = document.getElementById('like_counter');
    element.innerHTML = likes;
    totalLikes = likes;
}

function sendNewLike() {
    totalLikes++;
    let raw = JSON.stringify({
        "counter": totalLikes
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

    window.fetch("https://getpantry.cloud/apiv1/pantry/15efcf15-d11d-4d34-9f7f-f0bd2c8a8680/basket/1", requestOptions)
      .then(response => parseResponseData(response))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

async function parseResponseData(response) {
    let data = await response.text();
    let jsonData = JSON.parse(data);

    updateLikeNumbers(jsonData.counter ?? 0);
}

async function fetchText() {
    let response = await fetch('https://getpantry.cloud/apiv1/pantry/15efcf15-d11d-4d34-9f7f-f0bd2c8a8680/basket/1');

    if (response.status === 200) {
       parseResponseData(response);
    }
}
 
fetchText();
