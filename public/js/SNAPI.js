let container = document.getElementById("container");

let articlesBtn = document.getElementById("articles-btn");
articlesBtn.setAttribute("style", "margin-bottom: 7%;");

let blogsBtn = document.getElementById("blogs-btn");
blogsBtn.setAttribute("style", "margin-bottom: 7%;");

let reportsBtn = document.getElementById("reports-btn");
blogsBtn.setAttribute("style", "margin-bottom: 7%;");

// let carousel1 = document.getElementById("item1");
// let carousel2 = document.getElementById("item2");
// let carousel3 = document.getElementById("item3");

// let carousel = document.querySelector(".carousel");
// carousel.setAttribute("style", "width: 50%; height: 400px; margin: 0 auto;");


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
            container.appendChild(smallDiv);

            let image = document.createElement("img");
            image.setAttribute("src", response[i].imageUrl);
            image.setAttribute("style", "max-width: 50%; height: 400px; margin-top: 5%;");
            smallDiv.appendChild(image);
    
            let title = document.createElement("h3");
            title.textContent = response[i].title;
            smallDiv.appendChild(title);
    
            let link = document.createElement("a");
            link.setAttribute("href", response[i].url);
            link.textContent = "Click to learn more!";
            link.setAttribute("target", "_blank");
            smallDiv.appendChild(link);
        }
  })
}

articlesBtn.addEventListener("click", getArticles);

// Fetches 9 blogs related to news about space (first one is a test item)

let requestBlogs = "https://www.spaceflightnewsapi.net/api/v2/blogs"

function getBlogs () {
    container.innerHTML = "";
    
    fetch(requestBlogs)
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
        console.log(response);

        for (let i = 1; i < response.length; i++) {
            let smallDiv = document.createElement("div");
            container.appendChild(smallDiv);

            let image = document.createElement("img");
            image.setAttribute("src", response[i].imageUrl);
            image.setAttribute("style", "max-width: 50%; max-height: 400px; margin-top: 5%;");
            smallDiv.appendChild(image);
    
            let title = document.createElement("h3");
            title.textContent = response[i].title;
            smallDiv.appendChild(title);
    
            let link = document.createElement("a");
            link.setAttribute("href", response[i].url);
            link.textContent = "Click to learn more!";
            link.setAttribute("target", "_blank");
            smallDiv.appendChild(link);
        }
  })
}

blogsBtn.addEventListener("click", getBlogs);

// Fetches 10 ISS Daily Summary Reports; each title does have a date in the MM/DD/YYYY format
// First item in the response array is the most current
let requestReports = "https://www.spaceflightnewsapi.net/api/v2/reports"

function getReports () {
    container.innerHTML = "";
    
    fetch(requestReports)
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
        console.log(response);

        for (let i = 1; i < response.length; i++) {
            let smallDiv = document.createElement("div");
            container.appendChild(smallDiv);

            let image = document.createElement("img");
            image.setAttribute("src", response[i].imageUrl);
            image.setAttribute("style", "max-width: 50%; max-height: 400px; margin-top: 5%;");
            smallDiv.appendChild(image);
    
            let title = document.createElement("h3");
            title.textContent = response[i].title;
            smallDiv.appendChild(title);
    
            let link = document.createElement("a");
            link.setAttribute("href", response[i].url);
            link.textContent = "Click to learn more!";
            link.setAttribute("target", "_blank");
            smallDiv.appendChild(link);
        }
  })
}

reportsBtn.addEventListener("click", getReports);

// function init () {
//     fetch(requestArticles)
//     .then(function(response) {
//       return response.json();
//     })

//     .then(function(response) {
//         console.log(response);

//         for (let i = 0; i < 3; i++) {

//             carousel1.setAttribute("src", response[0].imageUrl);
//             carousel2.setAttribute("src", response[1].imageUrl);
//             carousel3.setAttribute("src", response[2].imageUrl);

//             carousel1.setAttribute("style", "height: 400px;");
//             carousel2.setAttribute("style", "height: 400px;");
//             carousel3.setAttribute("style", "height: 400px;");
//         }
//   })
// }

// init();

