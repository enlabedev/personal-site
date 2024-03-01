 document.addEventListener('DOMContentLoaded', async () => {
  const blocks = document.querySelectorAll('.roles__item');
  let lastAnimationEnd = 0;
  const animationTime = .5;
  const animationSeconds = 1000;

  let powerSwitch = document.getElementById('power-switch');
  let body = document.querySelector('body');

  powerSwitch.addEventListener('click', function() {
    powerSwitch.classList.toggle('power-off');
    powerSwitch.classList.toggle('power-on');
    body.classList.toggle('dark');
    body.classList.toggle('light');
  });

  blocks.forEach((block, index) => {
    block.style.animationDelay = `${index + animationTime}s`;
    lastAnimationEnd = (index + 1) + animationTime;
  });

  const boxes = document.querySelectorAll('.roles__border').length;
  const totalAnimationTimeForBoxes = boxes + 1;

  const rolesText = document.getElementById('roles__text');
  const rolesLogo = document.getElementById('roles__logo');
  const roles = document.getElementById('roles');

  await new Promise(resolve => setTimeout(resolve, lastAnimationEnd * animationSeconds));

  rolesText.classList.add('animate__fadeOut');

  await new Promise(resolve => setTimeout(resolve, animationSeconds / 2));

  rolesText.classList.add('d-none');
  rolesLogo.classList.remove('d-none');
  rolesLogo.classList.add('animate__fadeInDown', 'animate__animated');

  await new Promise(resolve => setTimeout(resolve, totalAnimationTimeForBoxes * animationSeconds));

  rolesLogo.classList.add('animate__fadeOutUp');

  await new Promise(resolve => setTimeout(resolve, animationSeconds));

  roles.classList.add('d-none');
});