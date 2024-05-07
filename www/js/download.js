document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('download-button');
  const urlInput = document.getElementById('URL-input');
  const select = document.getElementById('resolution');
  const serverURL = 'https://alpine-almond-cross.glitch.me/';
  const alertMessage = document.getElementById('alert_message');

  btn.addEventListener('click', () => {
      const userInput = urlInput.value.trim();

      if (!userInput) {
          showAlert('Please enter a YouTube URL before downloading.');
      } else {
          const videoID = extractVideoID(userInput);
          if (!videoID) {
              showAlert('Invalid YouTube URL. Please check the format.');
          } else {
              if (select.value === 'mp3') {
                  redirectToMp3(videoID);
              } else if (select.value === 'mp4') {
                  redirectToMp4(videoID);
              }
          }
      }
  });

  function extractVideoID(url) {
      const videoIDMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/v\/|embed\/|shorts\/|watch\?v=))([^&?/\s]{11})/);
      return videoIDMatch ? videoIDMatch[1] : null; // Returns the video ID or null if not found
  }

  function redirectToMp3(videoID) {
      window.location.href = `${serverURL}downloadmp3?videoID=${encodeURIComponent(videoID)}`;
  }

  function redirectToMp4(videoID) {
      window.location.href = `${serverURL}downloadmp4?videoID=${encodeURIComponent(videoID)}`;
  }

  function showAlert(message) {
      alertMessage.textContent = message;
      alertMessage.style.color = 'red'; // Make the alert message red for error
  }
});
