// index.js
document.addEventListener("DOMContentLoaded", () => {
  const scrollLinks = document.querySelectorAll(".scroll-link");
  scrollLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.dataset.target;
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
  });

  // Hamburger Toggle
  const hamburger = document.querySelector(".hamburger");
  const navUL = document.querySelector(".top-nav ul");
  hamburger.addEventListener("click", () => {
    navUL.classList.toggle("active");
  });
});
