"use strict";

/**
 * Represents a website.
 * @namespace Site
 */
var Site = function () {
  var animationTime = .5;
  var animationSeconds = 1000;
  var lastAnimationEnd = 0;
  /**
   * Initializes the website.
   * @memberof Site
   * @function init
   */

  var init = function init() {
    powerSwitch();
    document.addEventListener('DOMContentLoaded', function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(roles());

            case 2:
              brands();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  };
  /**
   * Animates the roles on the website.
   * @memberof Site
   * @function roles
   * @async
   */


  var roles = function roles() {
    var blocks, boxes, totalAnimationTimeForBoxes, rolesText, rolesLogo, roles;
    return regeneratorRuntime.async(function roles$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            blocks = document.querySelectorAll('.roles__item');

            if (!(blocks.length === 0)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            blocks.forEach(function (block, index) {
              block.style.animationDelay = "".concat(index + animationTime, "s");
              lastAnimationEnd = index + 1 + animationTime;
            });
            boxes = document.querySelectorAll('.roles__border').length;
            totalAnimationTimeForBoxes = boxes + 1;
            rolesText = document.getElementById('roles__text');
            rolesLogo = document.getElementById('roles__logo');
            roles = document.getElementById('roles');
            _context2.next = 11;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              return setTimeout(resolve, lastAnimationEnd * animationSeconds);
            }));

          case 11:
            rolesText.classList.add('animate__fadeOut');
            _context2.next = 14;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              return setTimeout(resolve, animationSeconds / 2);
            }));

          case 14:
            rolesText.classList.add('d-none');
            rolesLogo.classList.remove('d-none');
            rolesLogo.classList.add('animate__fadeInDown', 'animate__animated');
            _context2.next = 19;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              return setTimeout(resolve, totalAnimationTimeForBoxes * animationSeconds);
            }));

          case 19:
            rolesLogo.classList.add('animate__fadeOutUp');
            _context2.next = 22;
            return regeneratorRuntime.awrap(new Promise(function (resolve) {
              return setTimeout(resolve, animationSeconds);
            }));

          case 22:
            roles.classList.add('d-none');

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
  /**
   * Toggles the power switch and changes the class of the power switch element and all page elements.
   * @memberof Site
   * @function powerSwitch
   */


  var powerSwitch = function powerSwitch() {
    var powerSwitch = document.getElementById('power-switch');
    powerSwitch.addEventListener('click', function () {
      powerSwitch.classList.toggle('power-off');
      powerSwitch.classList.toggle('power-on');
      var page = document.querySelectorAll('.page');
      page.forEach(function (page, index) {
        page.classList.toggle('light');
      });
    });
  };
  /**
   * Fetches brand data from 'brands.json' and populates the 'brands' element with the retrieved data.
   * @memberof Site
   * @function brands
   */


  var brands = function brands() {
    var ibrands = document.getElementById('brands');
    fetch('brands.json').then(function (response) {
      return response.json();
    }).then(function (brands) {
      var html = "\n          ".concat(brands.map(function (brand) {
        return "\n            <li class=\"brand\">\n              <img loading=\"lazy\" src=\"images/".concat(brand.src, "\" width=\"").concat(brand.width, "\"  height=\"").concat(brand.width, "\" alt=\"").concat(brand.alt, "\" />\n            </li>\n          ");
      }).join(''), "\n        ");
      ibrands.innerHTML = html;
    })["catch"](function (error) {
      console.log(error);
      var html = "\n            <li class=\"brand text-center\">\n              Las marcas no fueron cargadas\n            </li>\n        ";
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


  var animateScroll = function animateScroll(element, target) {
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


  var readMore = function readMore(element, target) {
    element.preventDefault();
    target.querySelectorAll('.fa-solid')[0].classList.toggle('active');
    var parent = target.closest('.parent');
    var read_more = parent.querySelectorAll('.read-more');
    read_more.forEach(function (read, index) {
      read.classList.toggle('active');
    });
  };

  return {
    init: init,
    animateScroll: animateScroll,
    readMore: readMore
  };
}();

Site.init();