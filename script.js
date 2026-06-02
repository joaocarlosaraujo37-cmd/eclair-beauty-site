const phone = "5511920935904";

function whatsappUrl(message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-procedure]").forEach((button) => {
  button.addEventListener("click", () => {
    const procedure = button.dataset.procedure;
    window.open(
      whatsappUrl(`Olá, gostaria de saber mais sobre ${procedure} na Eclair Beauty.`),
      "_blank",
      "noopener,noreferrer"
    );
  });
});

const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");
const protocolTrack = document.querySelector("[data-protocol-track]");
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");

function visibleProtocolCards() {
  if (!protocolTrack) return [];
  return Array.from(protocolTrack.querySelectorAll(".protocol-card")).filter((card) => !card.hidden);
}

function moveCarousel(direction) {
  if (!protocolTrack) return;

  const visibleCards = visibleProtocolCards();
  if (!visibleCards.length) return;

  const currentLeft = protocolTrack.scrollLeft;
  const gap = 18;
  const fallbackStep = visibleCards[0].getBoundingClientRect().width + gap;
  let targetCard;

  if (direction > 0) {
    targetCard = visibleCards.find((card) => card.offsetLeft > currentLeft + 8);
  } else {
    for (let index = visibleCards.length - 1; index >= 0; index -= 1) {
      if (visibleCards[index].offsetLeft < currentLeft - 8) {
        targetCard = visibleCards[index];
        break;
      }
    }
  }

  const targetLeft = targetCard
    ? targetCard.offsetLeft
    : currentLeft + fallbackStep * direction;

  protocolTrack.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: "smooth"
  });
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;
    filters.forEach((item) => item.classList.toggle("is-active", item === filter));
    cards.forEach((card) => {
      const show = selected === "todos" || card.dataset.category.includes(selected);
      card.hidden = !show;
    });
    protocolTrack?.scrollTo({ left: 0, behavior: "smooth" });
  });
});

carouselPrev?.addEventListener("click", () => moveCarousel(-1));

carouselNext?.addEventListener("click", () => moveCarousel(1));

const form = document.querySelector("[data-form]");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("nome")?.toString().trim();
  const objective = data.get("objetivo")?.toString();
  const intro = name ? `Olá, meu nome é ${name}.` : "Olá.";
  window.open(
    whatsappUrl(`${intro} Gostaria de agendar uma avaliação na Eclair Beauty. Meu principal objetivo é: ${objective}.`),
    "_blank",
    "noopener,noreferrer"
  );
});
