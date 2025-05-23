const sports = [
   { icon: "⚽", name: "ΠΟΔΟΣΦΑΙΡΟ" },
   { icon: "🏀", name: "ΜΠΑΣΚΕΤ" },
   { icon: "🏒", name: "ΧΟΚΕΪ ΕΠΙ ΠΑΓΟΥ" },
   { icon: "🏀", name: "ΜΠΑΣΚΕΤ 3×3" },
   { icon: "🎾", name: "ΤΕΝΙΣ" },
   { icon: "🏐", name: "ΒΟΛΕΪ" },
   { icon: "🏓", name: "ΕΠΙΤΡΑΠΕΖΙΑ ΑΝΤΙΣΦΑΙΡΙΣΗ" },
   { icon: "🏸", name: "ΜΠΑΝΤΜΙΝΤΟΝ" },
   { icon: "🥋", name: "ΠΟΛΕΜΙΚΕΣ ΤΕΧΝΕΣ" },
   { icon: "🥊", name: "ΜΠΟΞ" },
   { icon: "🥊", name: "ΜΠΟΞ ΧΩΡΙΣ ΓΑΝΤΙΑ" },
   { icon: "🏏", name: "ΚΡΙΚΕΤ" },
   { icon: "🏈", name: "ΑΜΕΡΙΚΑΝΙΚΟ ΠΟΔΟΣΦΑΙΡΟ" },
   { icon: "🏉", name: "ΑΥΣΤΡΑΛΙΑΝΟ ΠΟΔΟΣΦΑΙΡΟ" },
   { icon: "⚾", name: "ΜΠΕΪΖΜΠΟΛ" },
   { icon: "🏖️", name: "ΠΑΡΑΛΙΑΚΟ ΒΟΛΕΪ" },
   { icon: "🏖️", name: "ΠΑΡΑΛΙΑΚΟ ΠΟΔΟΣΦΑΙΡΟ" },
   { icon: "🏎️", name: "ΦΟΡΜΟΥΛΑ 1" },
   { icon: "🎱", name: "ΜΠΙΛΙΑΡΔΟ" },
   { icon: "♟️", name: "ΣΚΑΚΙ" },
   { icon: "🎯", name: "ΒΕΛΑΚΙΑ" },
   { icon: "🏑", name: "ΦΛΟΡΜΠΟΛ" },
   { icon: "🥅", name: "ΦΟΥΤΣΑΛ" },
   { icon: "🏀", name: "Τ-BASKET" },
   { icon: "🥅", name: "Τ-KICK" },
   { icon: "🏉", name: "ΓΚΕΛΙΚΟ ΠΟΔΟΣΦΑΙΡΟ" },
   { icon: "🤾", name: "ΧΕΙΡΟΣΦΑΙΡΙΣΗ" },
   { icon: "🏑", name: "ΧΕΡΛΙΝΓΚ" },
   { icon: "🏉", name: "ΡΑΓΚΜΠΙ" },
   { icon: "🎾", name: "ΣΚΟΥΑΣ" },
   { icon: "🏓", name: "ΠΙΝΓΚ ΠΟΝΓΚ" },
   { icon: "🤽", name: "ΥΔΑΤΟΣΦΑΙΡΙΣΗ" },
   { icon: "🏒", name: "ΜΠΑΝΤΙ" },
   { icon: "🐎", name: "ΙΠΠΟΔΡΟΜΙΕΣ" },
   { icon: "🚗", name: "ΑΓΩΝΕΣ ΑΥΤΟΚΙΝΗΤΩΝ" },
   { icon: "🎮", name: "COUNTER-STRIKE" },
   { icon: "🧙", name: "DOTA 2" },
   { icon: "🧝", name: "LEAGUE OF LEGENDS" },
   { icon: "🗡️", name: "VALORANT" },
   { icon: "🚴", name: "ΠΟΔΗΛΑΣΙΑ" },
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

 