// at top of script.js, after grabbing the torch & lightSwitch elements:
const lightSwitch = document.getElementById('light-switch');

// update your existing mousemove handler to include button visibility:
document.addEventListener('mousemove', e => {
  torch.style.left = e.pageX + 'px';
  torch.style.top  = e.pageY + 'px';

  // check if cursor falls within the switch's bounds
  const rect = lightSwitch.getBoundingClientRect();
  const withinX = e.clientX >= rect.left && e.clientX <= rect.right;
  const withinY = e.clientY >= rect.top && e.clientY <= rect.bottom;

  if (withinX && withinY) {
    lightSwitch.classList.add('visible');
  } else {
    lightSwitch.classList.remove('visible');
  }
});

// remove any initial lightSwitch.style.display = 'none' here,
// since we’re handling visibility via opacity & pointer-events.
// Keep the onclick handler, it will fire once it’s visible:
lightSwitch.onclick = () => {
  lightSwitch.style.display = 'none';
  blackoutPanel.style.display = 'block';
  startCountdown();
};
