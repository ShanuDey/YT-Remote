function handleCloseButton(event) {
  event.preventDefault();
  if (confirm('Do you want to close?')) {
    window.location = '/close';
  } else {
    return;
  }
}
