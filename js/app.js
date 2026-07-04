// RVH Pigeons - website script

const body = document.body;
const menuButton = document.querySelector("[data-menu]");

menuButton?.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }

  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
  });
});

const searchInput = document.getElementById("pigeonSearch");
const familyFilter = document.getElementById("familyFilter");
const sexButtons = [...document.querySelectorAll(".sex-filter")];
const cards = [...document.querySelectorAll(".pigeon-card")];

let selectedSex = "";

function filterPigeons() {
  const searchValue = (searchInput?.value || "").toLowerCase();
  const selectedFamily = familyFilter?.value || "";

  cards.forEach((card) => {
    const cardSearchText = (card.dataset.search || "").toLowerCase();
    const cardFamilies = (card.dataset.family || "")
      .split("|")
      .map((family) => family.trim());
    const cardSex = card.dataset.sex || "";

    const matchesText = cardSearchText.includes(searchValue);
    const matchesFamily = !selectedFamily || cardFamilies.includes(selectedFamily);
    const matchesSex = !selectedSex || cardSex === selectedSex;

    card.classList.toggle("hidden", !(matchesText && matchesFamily && matchesSex));
  });
}

searchInput?.addEventListener("input", filterPigeons);
familyFilter?.addEventListener("change", filterPigeons);

sexButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSex = button.dataset.sex || "";
    sexButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterPigeons();
  });
});

const params = new URLSearchParams(window.location.search);
const familyFromUrl = params.get("family");

if (familyFromUrl && familyFilter) {
  familyFilter.value = familyFromUrl;
}

filterPigeons();
