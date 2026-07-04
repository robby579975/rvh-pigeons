// RVH Pigeons - website script

// Mobiel menu openen/sluiten
const body = document.body;
const menuButton = document.querySelector("[data-menu]");

menuButton?.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

// Actieve navigatielink aanduiden
document.querySelectorAll(".nav a").forEach((link) => {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }

  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
  });
});

// Filters op de pagina Kweekbasis
const searchInput = document.getElementById("pigeonSearch");
const familyFilter = document.getElementById("familyFilter");
const cards = [...document.querySelectorAll(".pigeon-card")];

function filterPigeons() {
  const searchValue = (searchInput?.value || "").toLowerCase();
  const selectedFamily = familyFilter?.value || "";

  cards.forEach((card) => {
    const cardSearchText = card.dataset.search || "";

    // Eén duif kan in meerdere families zitten.
    // Voorbeeld:
    // data-family="Elite Collection|Kittel / Van den Bulck"
    const cardFamilies = (card.dataset.family || "")
      .split("|")
      .map((family) => family.trim());

    const matchesText = cardSearchText.includes(searchValue);
    const matchesFamily =
      !selectedFamily || cardFamilies.includes(selectedFamily);

    card.classList.toggle("hidden", !(matchesText && matchesFamily));
  });
}

searchInput?.addEventListener("input", filterPigeons);
familyFilter?.addEventListener("input", filterPigeons);

// Filter automatisch instellen via URL.
// Voorbeeld:
// collection.html?family=Kittel%20%2F%20Van%20den%20Bulck
const params = new URLSearchParams(window.location.search);
const familyFromUrl = params.get("family");

if (familyFromUrl && familyFilter) {
  familyFilter.value = familyFromUrl;
  filterPigeons();
}
