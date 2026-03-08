function copyToClipboard(el) {
  // Copy the URL to clipboard
  navigator.clipboard.writeText(window.location.href).then(function () {
    // Change icon to check mark
    const icon = el.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-link-horizontal');
      icon.classList.add('fa-circle-check');
    }
    // Optionally, revert back to link icon after 1.5s
    setTimeout(function () {
      if (icon) {
        icon.classList.remove('fa-circle-check');
        icon.classList.add('fa-link-horizontal');
      }
    }, 1500);
  });
  // Prevent default link behavior
  return false;
}