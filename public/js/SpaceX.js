let container = document.getElementById("container");

let launchesBtn = document.getElementById("launches-btn");
launchesBtn.setAttribute("style", "margin-bottom: 7%;");

// All launches do have a name of the ship and the date
// Some launches have pictures; some do not
// Some launches have relevant links; some do not
// Dates currently range from April 2021 - September 2021 at time of testing (6 months)

let requestLaunches = "https://api.spacexdata.com/v4/launches/upcoming";

// const getUpcomingLaunches = async (event) => {
//   const response = await fetch(`/api/events`, {
//     method: 'POST',
//     body: JSON.stringify({ apiresponse }),
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   })
// };

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

        
        // for (let i = 0; i < response.length; i++) {
        //     console.log(response[i].name);
        //     console.log(response[i].date_unix);

            // Formatted dates that correlate with a calendar
            // console.log(response[i].date_unix);
            // console.log(moment.unix(parseInt(response[i].date_unix)).format("MM/DD/YYYY"));

            // Elements created on the front end to see the API information
            // let smallDiv = document.createElement("div");
            // container.appendChild(smallDiv);

            // let h3 = document.createElement("h3");
            // h3.textContent = response[i].name;
            // smallDiv.appendChild(h3);

            // let p = document.createElement("p");
            // p.textContent = moment.unix(parseInt(response[i].date_unix)).format("MM/DD/YYYY");
            // smallDiv.appendChild(p);

        // }
  // })
}

launchesBtn.addEventListener("click", getLaunches);
