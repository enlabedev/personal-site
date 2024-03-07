/**
 * Represents a website.
 * @namespace Site
 */
const Site = (() => {
  const animationTime = .5;
  const animationSeconds = 1000;
  let lastAnimationEnd = 0;

  /**
   * Initializes the website.
   * @memberof Site
   * @function init
   */
  const init = () => {
    powerSwitch();
    document.addEventListener('DOMContentLoaded', async () => {
      await roles();
      brands();
    });
  };

  /**
   * Animates the roles on the website.
   * @memberof Site
   * @function roles
   * @async
   */
  const roles = async () => {
    const blocks = document.querySelectorAll('.roles__item');
    if (blocks.length === 0) return;
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
    const body = document.getElementById('body');
    body.classList.remove('overflow-hidden');
    if ('loading' in HTMLIFrameElement.prototype) {
      const iframes = document.querySelectorAll('iframe[loading="lazy"]');
  
      iframes.forEach(iframe => {
        iframe.src = iframe.dataset.src;
      });
  
    }
    
  };

  /**
   * Toggles the power switch and changes the class of the power switch element and all page elements.
   * @memberof Site
   * @function powerSwitch
   */
  const powerSwitch = () => {
    let powerSwitch = document.getElementById('power-switch');
    powerSwitch.addEventListener('click', function() {
      powerSwitch.classList.toggle('power-off');
      powerSwitch.classList.toggle('power-on');
      const page = document.querySelectorAll('.page');
      page.forEach((page, index) => {
        page.classList.toggle('light');
      })
    });
  };

  /**
   * Fetches brand data from 'brands.json' and populates the 'brands' element with the retrieved data.
   * @memberof Site
   * @function brands
   */
  const brands = () => {
    let ibrands = document.getElementById('brands')
    fetch('brands.json')
      .then(response => response.json())
      .then(brands => {
        let html = `
          ${brands.map(brand => `
            <li class="brand">
              <img loading="lazy" src="images/${brand.src}" width="${brand.width}"  height="${brand.width}" alt="${brand.alt}" />
            </li>
          `).join('')}
        `;
        
        ibrands.innerHTML = html;
      })
      .catch(error => {
        console.log(error)
        let html = `
            <li class="brand text-center">
              Las marcas no fueron cargadas
            </li>
        `;
        
        ibrands.innerHTML = html;
      });
  };

  /**
   * Animates the scroll to a target element.
   * @memberof Site
   * @function animateScroll
   * @param {Event} element - The event object.
   * @param {string} target - The ID of the target element to scroll to.
   */
  const animateScroll = (element, target) => {
    element.preventDefault();
    var target = document.getElementById(target);
    var start = window.scrollY;
    var end = target.getBoundingClientRect().top;
    var distance = end - start;

    function step(timestamp) {
      var time = timestamp;
      var progress = Math.min(time / animationSeconds, 1);
      window.scroll(0, start + distance * progress);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  };

  /**
   * Toggles the visibility of the read more content.
   * @memberof Site
   * @function readMore
   * @param {Event} element - The event object triggered by the click event.
   * @param {HTMLElement} target - The target element containing the read more content.
   */
  const readMore = (element, target) => {
    element.preventDefault();
    target.querySelectorAll('.fa-solid')[0].classList.toggle('active');
    const parent = target.closest('.parent');
    const read_more = parent.querySelectorAll('.read-more');
    read_more.forEach((read, index) => {
      read.classList.toggle('active');
    });
  };

  return {
    init,
    animateScroll,
    readMore
  };
})();

Site.init();