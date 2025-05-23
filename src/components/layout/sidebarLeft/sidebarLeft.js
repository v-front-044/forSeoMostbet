const sports = [
   { icon: "⚽", name: "FUTEBOL" },
   { icon: "🏀", name: "BASQUETEBOL" },
   { icon: "🏒", name: "HÓQUEI NO GELO" },
   { icon: "🏀", name: "BASQUETEBOL 3×3" },
   { icon: "🎾", name: "TÉNIS" },
   { icon: "🏐", name: "VOLEIBOL" },
   { icon: "🏓", name: "TÉNIS DE MESA" },
   { icon: "🏸", name: "BADMINTON" },
   { icon: "🥋", name: "ARTES MARCIAIS" },
   { icon: "🥊", name: "BOXE" },
   { icon: "🥊", name: "BOXE SEM LUVAS" },
   { icon: "🏏", name: "CRÍQUETE" },
   { icon: "🏈", name: "FUTEBOL AMERICANO" },
   { icon: "🏉", name: "FUTEBOL AUSTRALIANO" },
   { icon: "⚾", name: "BASEBOL" },
   { icon: "🏖️", name: "VÓLEI DE PRAIA" },
   { icon: "🏖️", name: "FUTEBOL DE PRAIA" },
   { icon: "🏎️", name: "FÓRMULA 1" },
   { icon: "🎱", name: "BILHAR" },
   { icon: "♟️", name: "XADREZ" },
   { icon: "🎯", name: "DARDOS" },
   { icon: "🏑", name: "FLOORBALL" },
   { icon: "🥅", name: "FUTSAL" },
   { icon: "🏀", name: "T-BASKET" },
   { icon: "🥅", name: "T-KICK" },
   { icon: "🏉", name: "FUTEBOL GAÉLICO" },
   { icon: "🤾", name: "ANDEBOL" },
   { icon: "🏑", name: "HURLING" },
   { icon: "🏉", name: "RÂGUEBI" },
   { icon: "🎾", name: "SQUASH" },
   { icon: "🏓", name: "PESÄPALLO" },
   { icon: "🤽", name: "PÓLO AQUÁTICO" },
   { icon: "🏒", name: "BANDY" },
   { icon: "🐎", name: "CORRIDAS DE CAVALOS" },
   { icon: "🚗", name: "CORRIDAS DE CARROS" },
   { icon: "🎮", name: "COUNTER-STRIKE" },
   { icon: "🧙", name: "DOTA 2" },
   { icon: "🧝", name: "LEAGUE OF LEGENDS" },
   { icon: "🗡️", name: "VALORANT" },
   { icon: "🚴", name: "CICLISMO" },
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

 