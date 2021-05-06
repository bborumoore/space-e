let container = document.getElementById("container");

// All launches do have a name of the ship and the date
// Dates currently range from April 2021 - September 2021 at time of testing (6 months)

let requestLaunches = "https://api.spacexdata.com/v4/launches/upcoming";

function getLaunches () {
    container.innerHTML = "";

    fetch(requestLaunches)
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
        console.log(response);

        for (let i = 0; i < response.length; i++) {
          fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({'launch_name': response[i].name, 'launch_start': response[i].date_local, 'launch_link': response[i].links.wikipedia}),
            headers: {
              "Content-type": "application/json",
            }
          })
        }
      })
}

