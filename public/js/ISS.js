let container = document.getElementById("custom-container");
let sidebarContent = document.getElementById('sidebar-content');
let mainContent = document.getElementById('main-content');
let issStatsContainer = document.getElementById('iss-stats-container');

let requestReports = "https://www.spaceflightnewsapi.net/api/v2/reports"
let latitude;
let longitude;

let issDate = document.getElementById('iss-date');
let issAltitude = document.getElementById('iss-altitude');
let issLatitude = document.getElementById('iss-latitude');
let issLongitude = document.getElementById('iss-longitude');
let issLocation = document.getElementById('iss-location');
let issSpeed = document.getElementById('iss-speed');

function getReports () {
    
    fetch(requestReports)
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
        console.log(response);

        for (let i = 1; i < 3; i++) {
            let smallDiv = document.createElement("div");
            sidebarContent.appendChild(smallDiv);

            let image = document.createElement("img");
            image.setAttribute("src", response[i].imageUrl);
            image.setAttribute("style", "width: 100%; max-height: 400px; margin-top: 5%;");
            smallDiv.appendChild(image);
    
            let title = document.createElement("h3");
            title.textContent = response[i].title;
            smallDiv.appendChild(title);

            let summary = document.createElement('p');
            summary.textContent = response[i].summary;
            smallDiv.appendChild(summary);
    
            let link = document.createElement("a");
            link.setAttribute("href", response[i].url);
            link.textContent = "Click to learn more!";
            link.setAttribute("target", "_blank");
            smallDiv.appendChild(link);
        }
  })
}

getReports();

let requestISSLocation = 'https://api.wheretheiss.at/v1/satellites/25544';

function getISSLocation() {
    fetch(requestISSLocation)
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
        console.log(response);
        latitude = response.latitude;
        longitude = response.longitude;

        let formatTime = moment.unix(parseInt(response.timestamp)).format("MM/DD/YYYY h:mm:ss a");
        issDate.textContent = formatTime;

        issAltitude.textContent = response.altitude;
        issLatitude.textContent = response.latitude;
        issLongitude.textContent = response.longitude;
        issSpeed.textContent = response.velocity;

        findCountry();
    })

    function findCountry() {
        fetch(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`)
        .then(function(response) {
            return response.json();
        })
        .then (function(response) {
            let locationUrl = document.createElement("a");
            locationUrl.setAttribute("href", response.map_url);
            locationUrl.textContent = "Click here to find out!";
            locationUrl.setAttribute("target", "_blank");
            issLocation.appendChild(locationUrl);
        })

    }
}

getISSLocation();
