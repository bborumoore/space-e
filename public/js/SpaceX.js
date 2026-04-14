const upcomingLaunchesContainer = document.getElementById('upcoming-launches-container');
const launchesStatus = document.getElementById('launches-status');
const refreshButton = document.getElementById('refresh-launches');
const requestLaunches = 'https://api.spacexdata.com/v4/launches/upcoming';

const formatLaunchDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return 'TBD';
  }

  return date.toLocaleString();
};

const setStatus = (message, className = '') => {
  if (!launchesStatus) {
    return;
  }

  launchesStatus.textContent = message;
  launchesStatus.className = className;
};

const renderLaunch = (launch) => {
  const card = document.createElement('article');
  card.className = 'card bg-dark text-white mb-3';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = launch.name || 'Unnamed mission';

  const date = document.createElement('p');
  date.className = 'card-text';
  date.textContent = `Launch: ${formatLaunchDate(launch.date_utc || launch.date_local)}`;

  cardBody.appendChild(title);
  cardBody.appendChild(date);

  if (launch.links && launch.links.wikipedia) {
    const link = document.createElement('a');
    link.href = launch.links.wikipedia;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'btn btn-outline-light btn-sm';
    link.textContent = 'Mission details';
    cardBody.appendChild(link);
  }

  card.appendChild(cardBody);
  upcomingLaunchesContainer.appendChild(card);
};

const getLaunches = async () => {
  if (!upcomingLaunchesContainer) {
    return;
  }

  upcomingLaunchesContainer.innerHTML = '';
  setStatus('Loading upcoming launches...', 'text-info');

  try {
    const response = await fetch(requestLaunches);
    if (!response.ok) {
      throw new Error(`SpaceX API responded with ${response.status}`);
    }

    const launches = await response.json();
    const upcoming = launches
      .filter((launch) => launch.upcoming)
      .sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc))
      .slice(0, 8);

    if (!upcoming.length) {
      setStatus('No upcoming launches were returned right now. Try refreshing shortly.', 'text-warning');
      return;
    }

    upcoming.forEach(renderLaunch);
    setStatus(`Showing ${upcoming.length} upcoming launches.`, 'text-success');
  } catch (error) {
    setStatus('Unable to load live launches right now. Please try again.', 'text-danger');
  }
};

if (refreshButton) {
  refreshButton.addEventListener('click', getLaunches);
}

getLaunches();

