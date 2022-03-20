function handleCloseButton(event) {
  event.preventDefault();
  if (confirm('Do you want to close?')) {
    window.location = '/close_video';
  } else {
    return;
  }
}

function handleShutdownButton(event) {
  event.preventDefault();
  if (confirm('Do you want to close?')) {
    window.location = '/shutdown';
  } else {
    return;
  }
}
