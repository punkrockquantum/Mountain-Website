const torch = document.getElementById('torchlight');
const sections = document.querySelectorAll('section');

document.addEventListener('mousemove', (e) => {
  torch.style.left = `${e.clientX}px`;
  torch.style.top = `${e.clientY}px`;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const inX = e.clientX >= rect.left && e.clientX <= rect.right;
    const inY = e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (inX && inY) {
      section.classList.add('visible');
    }
  });
});
