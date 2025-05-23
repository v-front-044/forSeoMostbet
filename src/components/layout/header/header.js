import './header.scss'


const menuBtn = document.getElementById("menuToggleBtn");
const menuCloseBtn = document.getElementById("menuCloseBtn");
const overlayMenu = document.getElementById("overlayMenu");

menuBtn.addEventListener("click", () => {
   overlayMenu.style.display = "flex";
   document.body.style.overflow = "hidden";
});

menuCloseBtn.addEventListener("click", () => {
   overlayMenu.style.display = "none";
   document.body.style.overflow = "";
});

overlayMenu.addEventListener("click", (e) => {
   if (e.target === overlayMenu) {
      overlayMenu.style.display = "none";
      document.body.style.overflow = "";
   }
});


function updateClock() {
   const clockEl = document.querySelector('.header__clock');
   if (!clockEl) return;

   const now = new Date();
   const hours = String(now.getHours()).padStart(2, '0');
   const minutes = String(now.getMinutes()).padStart(2, '0');
   const seconds = String(now.getSeconds()).padStart(2, '0');

   clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);