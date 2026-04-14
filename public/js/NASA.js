const imgContainer = document.getElementById('img-container');
const contentContainer = document.getElementById('content-container');
const apodStatus = document.getElementById('apod-status');
const refreshButton = document.getElementById('refresh-apod');

const primaryRequest = 'https://apodapi.herokuapp.com/api';
const fallbackRequest = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

function clearContent() {
  imgContainer.innerHTML = '';
  contentContainer.innerHTML = '';
}

function renderApod(response) {
  clearContent();

  const mediaType = response.media_type || 'image';
  const mediaUrl = response.hdurl || response.url;

  if (mediaType === 'video') {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', mediaUrl);
    iframe.setAttribute('style', 'width: 100%; min-height: 360px; border: 0;');
    iframe.setAttribute('title', response.title || 'NASA Astronomy Picture of the Day');
    iframe.setAttribute('allowfullscreen', 'true');
    imgContainer.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.setAttribute('src', mediaUrl);
    img.setAttribute('style', 'width: min(100%, 700px); max-height: 100%;');
    img.setAttribute('alt', response.title || 'NASA Astronomy Picture of the Day');
    imgContainer.appendChild(img);
  }

  const title = document.createElement('h2');
  title.textContent = response.title || 'Astronomy Picture of the Day';
  contentContainer.appendChild(title);

  if (response.copyright) {
    const copyright = document.createElement('p');
    copyright.textContent = response.copyright;
    contentContainer.appendChild(copyright);
  }

  if (response.date) {
    const date = document.createElement('p');
    date.textContent = moment(response.date).format('MMMM Do YYYY');
    contentContainer.appendChild(date);
  }

  const explanation = document.createElement('p');
  explanation.textContent = response.explanation || response.description || 'No description available.';
  contentContainer.appendChild(explanation);

  const sourceLink = response.apod_site || response.url;
  if (sourceLink) {
    const link = document.createElement('a');
    link.setAttribute('href', sourceLink);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.textContent = 'Open the original NASA media';
    contentContainer.appendChild(link);
  }
}

async function requestApod(url) {
  const apiResponse = await fetch(url);
  if (!apiResponse.ok) {
    throw new Error(`Request failed with status ${apiResponse.status}`);
  }
  return apiResponse.json();
}

async function getPictures() {
  apodStatus.textContent = 'Loading NASA photo of the day...';

  try {
    const response = await requestApod(primaryRequest);
    renderApod(response);
    apodStatus.textContent = 'Latest APOD loaded.';
  } catch (primaryError) {
    try {
      const fallbackResponse = await requestApod(fallbackRequest);
      renderApod(fallbackResponse);
      apodStatus.textContent = 'Loaded APOD using fallback endpoint.';
    } catch (fallbackError) {
      clearContent();
      apodStatus.textContent = 'Unable to load APOD right now. Please try again shortly.';
      console.error('APOD primary and fallback requests failed.', primaryError, fallbackError);
    }
  }
}

refreshButton.addEventListener('click', getPictures);
getPictures();
