const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navLinks = [...nav.querySelectorAll("a")];
const header = document.getElementById("header");
const heroSection = document.getElementById("home");

const slides = [...document.querySelectorAll(".hero-slide")];
const dotsWrap = document.getElementById("heroDots");
let currentSlide = 0;
let autoPlayTimer;

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");
const formMsg = document.getElementById("formMsg");
const comingTrack = document.querySelector(".coming-track");
const sections = [...document.querySelectorAll("section[id]")];

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  [...dotsWrap.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function startAutoPlay() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 4500);
}

function startComingAutoScroll() {
  if (!comingTrack) return;

  let direction = 1;
  const step = 1;

  setInterval(() => {
    const maxScroll = comingTrack.scrollWidth - comingTrack.clientWidth;

    if (comingTrack.scrollLeft >= maxScroll - 1) direction = -1;
    if (comingTrack.scrollLeft <= 0) direction = 1;

    comingTrack.scrollLeft += step * direction;
  }, 18);
}

function updateHeaderState() {
  if (!header || !heroSection) return;

  const triggerPoint = heroSection.offsetHeight - header.offsetHeight - 10;
  header.classList.toggle("scrolled", window.scrollY > triggerPoint);
}

function updateActiveNavLink() {
  if (!sections.length || !navLinks.length) return;

  const marker = window.scrollY + header.offsetHeight + 80;
  let currentSectionId = sections[0].id;

  sections.forEach((section) => {
    if (marker >= section.offsetTop) currentSectionId = section.id;
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSectionId}`;
    link.classList.toggle("active", isActive);
  });
}

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    nav.classList.remove("open");
  });
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!emailInput.value.trim()) {
    formMsg.textContent = "Please enter your email address.";
    formMsg.style.color = "#ff9d9d";
    return;
  }

  formMsg.textContent = "Thanks for subscribing. You are on the list!";
  formMsg.style.color = "#a6f8c5";
  newsletterForm.reset();
});

if (dotsWrap) {
  [...dotsWrap.children].forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoPlay();
    });
  });
}

window.addEventListener("scroll", () => {
  updateHeaderState();
  updateActiveNavLink();
});

window.addEventListener("resize", () => {
  updateHeaderState();
  updateActiveNavLink();
});

showSlide(0);
startAutoPlay();
startComingAutoScroll();
updateHeaderState();
updateActiveNavLink();
