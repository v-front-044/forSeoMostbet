const sports = [
   { icon: "⚽", name: "ФУТБОЛ" },
   { icon: "🏀", name: "БАСКЕТБОЛ" },
   { icon: "🏒", name: "ХОККЕЙ НА ЛЬДУ" },
   { icon: "🏀", name: "БАСКЕТБОЛ 3×3" },
   { icon: "🎾", name: "ТЕННИС" },
   { icon: "🏐", name: "ВОЛЕЙБОЛ" },
   { icon: "🏓", name: "НАСТОЛЬНЫЙ ТЕННИС" },
   { icon: "🏸", name: "БАДМИНТОН" },
   { icon: "🥋", name: "БОЕВЫЕ ИСКУССТВА" },
   { icon: "🥊", name: "БОКС" },
   { icon: "🥊", name: "БОКС БЕЗ ПЕРЧАТОК" },
   { icon: "🏏", name: "КРИКЕТ" },
   { icon: "🏈", name: "АМЕРИКАНСКИЙ ФУТБОЛ" },
   { icon: "🏉", name: "АВСТРАЛИЙСКИЙ ФУТБОЛ" },
   { icon: "⚾", name: "БЕЙСБОЛ" },
   { icon: "🏖️", name: "ПЛЯЖНЫЙ ВОЛЕЙБОЛ" },
   { icon: "🏖️", name: "ПЛЯЖНЫЙ ФУТБОЛ" },
   { icon: "🏎️", name: "ФОРМУЛА 1" },
   { icon: "🎱", name: "БИЛЬЯРД" },
   { icon: "♟️", name: "ШАХМАТЫ" },
   { icon: "🎯", name: "ДАРТС" },
   { icon: "🏑", name: "ФЛОРБОЛ" },
   { icon: "🥅", name: "ФУТЗАЛ" },
   { icon: "🏀", name: "Т-БАСКЕТ" },
   { icon: "🥅", name: "Т-КИК" },
   { icon: "🏉", name: "ГЭЛЬСКИЙ ФУТБОЛ" },
   { icon: "🤾", name: "ГАНДБОЛ" },
   { icon: "🏑", name: "ХЕРЛИНГ" },
   { icon: "🏉", name: "РЕГБИ" },
   { icon: "🎾", name: "СКВОШ" },
   { icon: "🏓", name: "ПИНГ-ПОНГ" },
   { icon: "🤽", name: "ВОДНОЕ ПОЛО" },
   { icon: "🏒", name: "БАНДИ" },
   { icon: "🐎", name: "СКАЧКИ" },
   { icon: "🚗", name: "АВТОГОНКИ" },
   { icon: "🎮", name: "COUNTER-STRIKE" },
   { icon: "🧙", name: "DOTA 2" },
   { icon: "🧝", name: "LEAGUE OF LEGENDS" },
   { icon: "🗡️", name: "VALORANT" },
   { icon: "🚴", name: "ВЕЛОСПОРТ" },
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

 