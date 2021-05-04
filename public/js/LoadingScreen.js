let loadingBar = document.getElementById("loading-bar");
let secondsRemaining = 5;

function setTime() {
  let timerInterval = setInterval(function() {
    secondsRemaining--;

    if(secondsRemaining === 4) {
        console.log(secondsRemaining);
        loadingBar.setAttribute("aria-valuenow", "25");
        loadingBar.setAttribute("style", "width: 25%;");

    } else if (secondsRemaining === 3) {
        console.log(secondsRemaining);
        loadingBar.setAttribute("aria-valuenow", "50");
        loadingBar.setAttribute("style", "width: 50%;");

    } else if (secondsRemaining === 2) {
        console.log(secondsRemaining);
        loadingBar.setAttribute("aria-valuenow", "75");
        loadingBar.setAttribute("style", "width: 75%;");

    } else if (secondsRemaining === 1) {
        console.log(secondsRemaining);
        loadingBar.setAttribute("aria-valuenow", "100");
        loadingBar.setAttribute("style", "width: 100%;");

    } else if (secondsRemaining === 0) {
        console.log(secondsRemaining);
        clearInterval(timerInterval);
        // At this point, redirect to the home page
        window.location.href = '/home'
    }

  }, 1000);
}

setTime();
