const root = document.querySelector(":root");

const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

// Responsive Toggle
navToggle.addEventListener("click", () => {
  let linksHeight = links.getBoundingClientRect().height;
  let containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// Fixed Navbar
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  let scrollHeight = window.pageYOffset;
  let navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
    topLink.classList.add("show-link");
  } else {
    navbar.classList.remove("fixed-nav");
    topLink.classList.remove("show-link");
  }

  // // Parallex Scrolling
  // const target = document.querySelectorAll(".scroll");
  // for (let index = 0; index < target.length; index++) {
  //   var pos = window.pageYOffset * target[index].dataset.ratex;
  //   console.log("POSITION : " + pos);
  //   if (target[index].dataset.direction === "vertical") {
  //     target[index].style.transform = "translate3d(0px," + pos + "px, 0px)";
  //   } else {
  //     var posX = window.pageYOffset * target[index].dataset.ratex;
  //     console.log(posX);
  //     target[index].style.transform =
  //       "translate3d(" + posX + "px, " + "0px, 0px)";
  //   }
  // }
});

// Scrolling Offset
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    let id = e.currentTarget.getAttribute("href").slice(1); // remove the "#" character
    let element = document.getElementById(id);

    let navHeight = navbar.getBoundingClientRect().height;
    let linksContainerHeight = linksContainer.getBoundingClientRect().height;
    let fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (linksContainerHeight > 50) {
      position = position + linksContainerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });

    // Close after it's done scrolling to desired place
    linksContainer.style.height = 0;
  });
});

// Slideshow
let slideIndex = [0, 0, 0, 0]; // Keep track of all slideshows current index
let slideShows = ["mySlides1", "mySlides2", "mySlides3", "mySlides4"];
showSlides(0, 0);

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideShows[no]);
  console.log(x);
  if (n > x.length - 1) {
    slideIndex[no] = 0;
  }
  if (n < 0) {
    slideIndex[no] = x.length - 1;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no]].style.display = "block";
}
function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

let rightSlide = document.querySelectorAll(".next");
let leftSlide = document.querySelectorAll(".prev");
let currentSlideshow = 0;

rightSlide.forEach((rightArrow) => {
  rightArrow.addEventListener("click", () => {
    plusSlides(1, currentSlideshow);
  });
});
leftSlide.forEach((leftArrow) => {
  leftArrow.addEventListener("click", () => {
    plusSlides(-1, currentSlideshow);
  });
});

let enlargeBtn = document.querySelectorAll(".enlarge");
let imgContainer = document.querySelectorAll(".img-box");
enlargeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    imgContainer.forEach((container) => {
      container.classList.toggle("toggle-size");
    });
  });
});

// Contact Modal
let modal = document.querySelector(".modal-overlay");
let closeBtn = document.querySelector(".close-btn ");
let openStickyBtn = document.querySelector("#contact-btn");
let openContactNav = document.querySelector(".open-modal");

closeBtn.addEventListener("click", () => {
  modal.classList.remove("open-modal");
});
openContactNav.addEventListener("click", () => {
  modal.classList.add("open-modal");
});
openStickyBtn.addEventListener("click", () => {
  modal.classList.add("open-modal");
});

// Projects
let projectContainer = document.querySelector(".content-container");
let projectBtns = document.querySelectorAll(".tab-btn");
let projectContents = document.querySelectorAll(".content");

function updateContainerBackground(id) {
  switch (id) {
    case "react":
      root.style.setProperty(
        "--background-picture",
        'url("../images/projects/helpbot/background.png")'
      );
      currentSlideshow = 0;
      break;
    case "ruby":
      root.style.setProperty(
        "--background-picture",
        'url("../images/projects/libmanage/background.jpg")'
      );
      currentSlideshow = 1;
      break;
    case "c":
      root.style.setProperty(
        "--background-picture",
        'url("../images/projects/c-webserver/c-background.png")'
      );
      currentSlideshow = 2;
      break;
    case "ai":
      root.style.setProperty(
        "--background-picture",
        'url("../images/projects/covid19/background.png")'
      );
      currentSlideshow = 3;
      break;
  }
}
function updateSlideShow(id) {
  switch (id) {
    case "react":
      showSlides(1, 0);
      break;
    case "ruby":
      showSlides(1, 1);
      break;
    case "c":
      showSlides(1, 2);
      break;
    case "ai":
      showSlides(1, 3);
      break;
  }
}
projectContainer.addEventListener("click", (e) => {
  let id = e.target.dataset.id;
  if (id) {
    projectBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    // make this the active tab
    e.target.classList.add("active");
    //remove the content
    projectContents.forEach((content) => {
      content.classList.remove("active");
    });

    let desired = document.getElementById(id);
    desired.classList.add("active");
    updateSlideShow(id);
    updateContainerBackground(id);
    imgContainer.forEach((container) => {
      container.classList.remove("toggle-size");
    });
  }
});
