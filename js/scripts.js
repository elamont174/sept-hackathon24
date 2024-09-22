/*!
 * Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// ---------- PIANO ---------- //

const whiteKeys = document.querySelectorAll(".white-key");
const blackKeys = document.querySelectorAll(".black-key");

blackKeys.forEach((black, index) => {
  black.addEventListener("click", () => {
    let sound = new Audio(`assets/sounds/black-keys/${index}.mp3`);
    playSound(sound);
  });
});

whiteKeys.forEach((white, index) => {
  white.addEventListener("click", () => {
    let sound = new Audio(`assets/sounds/white-keys/${index}.mp3`);
    playSound(sound);
  });
});

function playSound(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

// ---------- START RANDOM GAME BUTTON ---------- //

const startRandomGameBtn = document.getElementById("start-random-game");

// function to start a random game after user clicks on button in navbar
startRandomGameBtn.addEventListener("click", () => {
  const randomIntegerNumber = Math.floor(Math.random() * 3);

  switch (randomIntegerNumber) {
    case 0:
      document.location.href = "piano.html";
      break;
    case 1:
      document.location.href = "game.html";
      break;
    case 2:
      document.location.href = "quiz.html";
      break;
  }
});
