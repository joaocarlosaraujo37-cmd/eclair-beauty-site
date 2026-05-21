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

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;
    filters.forEach((item) => item.classList.toggle("is-active", item === filter));
    cards.forEach((card) => {
      const show = selected === "todos" || card.dataset.category.includes(selected);
      card.hidden = !show;
    });
  });
});

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
