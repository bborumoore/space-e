const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert('Unable to log out. Please try again.');
  }
};

const logoutButton = document.querySelector('#logout');
if (logoutButton) {
  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });
}
  