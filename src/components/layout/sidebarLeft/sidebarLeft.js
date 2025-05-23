const sports = [
   { icon: "⚽", name: "FOTBAL" },
   { icon: "🏀", name: "BASKETBAL" },
   { icon: "🏒", name: "LEDNÍ HOKEJ" },
   { icon: "🏀", name: "BASKETBAL 3×3" },
   { icon: "🎾", name: "TENIS" },
   { icon: "🏐", name: "VOLEJBAL" },
   { icon: "🏓", name: "STOLNÍ TENIS" },
   { icon: "🏸", name: "BADMINTON" },
   { icon: "🥋", name: "BOJOVÁ UMĚNÍ" },
   { icon: "🥊", name: "BOX" },
   { icon: "🥊", name: "BOX BEZ RUKAVIC" },
   { icon: "🏏", name: "KRIKET" },
   { icon: "🏈", name: "AMERICKÝ FOTBAL" },
   { icon: "🏉", name: "AUSTRALSKÁ PRAVIDLA" },
   { icon: "⚾", name: "BASEBALL" },
   { icon: "🏖️", name: "PLÁŽOVÝ VOLEJBAL" },
   { icon: "🏖️", name: "PLÁŽOVÝ FOTBAL" },
   { icon: "🏎️", name: "FORMULE 1" },
   { icon: "🎱", name: "BILLIARD" },
   { icon: "♟️", name: "ŠACHY" },
   { icon: "🎯", name: "ŠIPKY" },
   { icon: "🏑", name: "FLORBAL" },
   { icon: "🥅", name: "FUTSAL" },
   { icon: "🏀", name: "T-BASKET" },
   { icon: "🥅", name: "T-KICK" },
   { icon: "🏉", name: "GALSKÝ FOTBAL" },
   { icon: "🤾", name: "HÁZENÁ" },
   { icon: "🏑", name: "HURLING" },
   { icon: "🏉", name: "RAGBY" },
   { icon: "🎾", name: "SQUASH" },
   { icon: "🏓", name: "PEŠÁPALLO" },
   { icon: "🤽", name: "VODNÍ PÓLO" },
   { icon: "🏒", name: "BANDY HOKEJ" },
   { icon: "🐎", name: "KOŇSKÉ DOSTIHY" },
   { icon: "🚗", name: "ZÁVODY VOZŮ" },
   { icon: "🎮", name: "COUNTER-STRIKE" },
   { icon: "🧙", name: "DOTA 2" },
   { icon: "🧝", name: "LEAGUE OF LEGENDS" },
   { icon: "🗡️", name: "VALORANT" },
   { icon: "🚴", name: "CYKLISTIKA" },
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

 