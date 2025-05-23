const sports = [
   { icon: "⚽", name: "LABDARÚGÁS" },
   { icon: "🏀", name: "KOSÁRLABDA" },
   { icon: "🏒", name: "JÉGKORONG" },
   { icon: "🏀", name: "3×3 KOSÁRLABDA" },
   { icon: "🎾", name: "TENISZ" },
   { icon: "🏐", name: "RÖPLABDA" },
   { icon: "🏓", name: "ASZTALITENISZ" },
   { icon: "🏸", name: "TOLLASLABDA" },
   { icon: "🥋", name: "HARCMŰVÉSZETEK" },
   { icon: "🥊", name: "BOX" },
   { icon: "🥊", name: "KÉZNÉLKÜLI BOX" },
   { icon: "🏏", name: "KRIKETT" },
   { icon: "🏈", name: "AMERIKAI FUTBALL" },
   { icon: "🏉", name: "AUSZTRÁL FUTBALL" },
   { icon: "⚾", name: "BASEBALL" },
   { icon: "🏖️", name: "STRANDRÖPLABDA" },
   { icon: "🏖️", name: "STRANDFOCI" },
   { icon: "🏎️", name: "FORMA–1" },
   { icon: "🎱", name: "BILIÁRD" },
   { icon: "♟️", name: "SAKK" },
   { icon: "🎯", name: "DARTS" },
   { icon: "🏑", name: "FLOORBALL" },
   { icon: "🥅", name: "FUTSAL" },
   { icon: "🏀", name: "T-BASKET" },
   { icon: "🥅", name: "T-KICK" },
   { icon: "🏉", name: "GAEL FUTBALL" },
   { icon: "🤾", name: "KÉZILABDA" },
   { icon: "🏑", name: "HURLING" },
   { icon: "🏉", name: "RÖGBI" },
   { icon: "🎾", name: "FALLABDA" },
   { icon: "🏓", name: "PESÄPALLO" },
   { icon: "🤽", name: "VÍZILABDA" },
   { icon: "🏒", name: "BANDY" },
   { icon: "🐎", name: "LOVERSENY" },
   { icon: "🚗", name: "AUTÓVERSENY" },
   { icon: "🎮", name: "COUNTER-STRIKE" },
   { icon: "🧙", name: "DOTA 2" },
   { icon: "🧝", name: "LEAGUE OF LEGENDS" },
   { icon: "🗡️", name: "VALORANT" },
   { icon: "🚴", name: "KERÉKPÁROZÁS" },
]; 


const sidebarContainer = document.getElementById("sidebar-sports-list");

sports.forEach(sport => {
   const li = document.createElement("li");
   li.className = "sidebar__item";

   const a = document.createElement("a");
   a.href = "#";
   a.className = "sidebar__link";
   a.innerHTML = `<span class="sidebar__emoji">${sport.icon}</span> ${sport.name}`;

   li.appendChild(a);
   sidebarContainer.appendChild(li);
});

 