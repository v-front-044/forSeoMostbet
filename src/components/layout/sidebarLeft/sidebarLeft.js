const sports = [
   { icon: "⚽", name: "PIŁKA NOŻNA" },
   { icon: "🏀", name: "KOSZYKÓWKA" },
   { icon: "🏒", name: "HOKEJ NA LODZIE" },
   { icon: "🏀", name: "KOSZYKÓWKA 3×3" },
   { icon: "🎾", name: "TENIS" },
   { icon: "🏐", name: "SIATKÓWKA" },
   { icon: "🏓", name: "TENIS STOŁOWY" },
   { icon: "🏸", name: "BADMINTON" },
   { icon: "🥋", name: "SZTUKI WALKI" },
   { icon: "🥊", name: "BOKS" },
   { icon: "🥊", name: "BOKS BEZ RĘKAWIC" },
   { icon: "🏏", name: "KRYKIECIE" },
   { icon: "🏈", name: "FUTBOL AMERYKAŃSKI" },
   { icon: "🏉", name: "FUTBOL AUSTRALIJSKI" },
   { icon: "⚾", name: "BASEBALL" },
   { icon: "🏖️", name: "SIATKÓWKA PLAŻOWA" },
   { icon: "🏖️", name: "PIŁKA NOŻNA PLAŻOWA" },
   { icon: "🏎️", name: "FORMUŁA 1" },
   { icon: "🎱", name: "BILARD" },
   { icon: "♟️", name: "SZACHY" },
   { icon: "🎯", name: "RZUTKI" },
   { icon: "🏑", name: "UNIHOKEJ" },
   { icon: "🥅", name: "FUTSAL" },
   { icon: "🏀", name: "T-BASKET" },
   { icon: "🥅", name: "T-KICK" },
   { icon: "🏉", name: "FUTBOL GAELICKI" },
   { icon: "🤾", name: "PIŁKA RĘCZNA" },
   { icon: "🏑", name: "HURLING" },
   { icon: "🏉", name: "RUGBY" },
   { icon: "🎾", name: "SQUASH" },
   { icon: "🏓", name: "PESÄPALLO" },
   { icon: "🤽", name: "PIŁKA WODNA" },
   { icon: "🏒", name: "BANDY" },
   { icon: "🐎", name: "WYŚCIGI KONNE" },
   { icon: "🚗", name: "WYŚCIGI SAMOCHODOWE" },
   { icon: "🎮", name: "COUNTER-STRIKE" },
   { icon: "🧙", name: "DOTA 2" },
   { icon: "🧝", name: "LEAGUE OF LEGENDS" },
   { icon: "🗡️", name: "VALORANT" },
   { icon: "🚴", name: "KOLARSTWO" },
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

 