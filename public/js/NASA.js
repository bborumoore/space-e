let imgContainer = document.getElementById('img-container');
let contentContainer = document.getElementById('content-container');

let requestPictures = "https://apodapi.herokuapp.com/api";

function getPictures () {

    fetch(requestPictures)
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
        let img = document.createElement('img');
        imgContainer.appendChild(img);
        img.setAttribute('src', response.hdurl);
        img.setAttribute('style', 'width: 500px; max-height: 100%;');
        img.setAttribute('alt', 'NASA Astronomy Image of the Day');

        let h2 = document.createElement('h2');
        contentContainer.appendChild(h2);
        h2.textContent = response.title;

        let p1 = document.createElement('p');
        contentContainer.appendChild(p1);
        p1.textContent = response.copyright;

        let p2 = document.createElement('p');
        contentContainer.appendChild(p2);
        p2.textContent = moment(response.date).format('MMMM Do YYYY');

        let p3 = document.createElement('p');
        contentContainer.appendChild(p3);
        p3.textContent = response.description;

        let link = document.createElement("a");
        link.setAttribute("href", response.apod_site);
        link.textContent = "Click here to learn more!";
        link.setAttribute("target", "_blank");
        contentContainer.appendChild(link);
  })
}

getPictures();
