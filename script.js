document.getElementById('submit').addEventListener('click', () => {
  if (document.getElementById('user').value) {
    document.getElementById('welcomeUser').innerHTML = `Hello, ${
      document.getElementById('user').value
    }!`;
  } else {
    document.getElementById('welcomeUser').innerHTML = `Hello, Guest!`;
  }
});
