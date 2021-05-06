let container = document.getElementById("snapi-container");

// Fetches 10 articles related to the latest news about space

let requestArticles = "https://www.spaceflightnewsapi.net/api/v2/articles";

function getArticles () {

    container.innerHTML = "";

    fetch(requestArticles)
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
        console.log(response);

        for (let i = 0; i < response.length; i++) {
            let smallDiv = document.createElement("div");
            smallDiv.classList.add('small-div');
            smallDiv.setAttribute('style', 'padding: 10px;')
            container.appendChild(smallDiv);

            let image = document.createElement("img");
            image.setAttribute("src", response[i].imageUrl);
            image.setAttribute("style", "max-width: 100%; max-height: 400px; margin-top: 5%;");
            smallDiv.appendChild(image);
    
            let title = document.createElement("h3");
            title.textContent = response[i].title;
            smallDiv.appendChild(title);

            let summary = document.createElement('p');
            summary.textContent = response[i].summary;
            smallDiv.appendChild(summary);
    
            let link = document.createElement("a");
            link.setAttribute("href", response[i].url);
            link.textContent = "Click here to read more!";
            link.setAttribute("target", "_blank");
            smallDiv.appendChild(link);
        }
  })
}

getArticles();
