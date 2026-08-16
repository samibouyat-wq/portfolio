// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("menu-open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
document.getElementById("navLinks").addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("menu-open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => io.observe(el));

// Language switch (FR / EN)
const translatable = document.querySelectorAll("[data-en]");
translatable.forEach((el) => { el.dataset.fr = el.innerHTML; });

const langButtons = document.querySelectorAll(".lang-btn");
const pageMeta = {
  fr: {
    title: "Sami Bouyat — Tech Lead Java & Angular",
    description: "Portfolio de Sami Bouyat, Tech Lead Java & Angular avec 8 ans d'expérience sur des projets pour CNAV, Ministère de la Justice, Ministère de l'Intérieur."
  },
  en: {
    title: "Sami Bouyat — Tech Lead Java & Angular",
    description: "Portfolio of Sami Bouyat, Tech Lead Java & Angular with 8 years of experience on projects for CNAV, the Ministry of Justice, and the Ministry of the Interior."
  }
};

const cvLinks = {
  fr: "assets/cv/Sami_Bouyat_CV_FR.pdf",
  en: "assets/cv/Sami_Bouyat_CV_EN.pdf"
};
const cvDownload = document.getElementById("cvDownload");

function setLang(lang) {
  translatable.forEach((el) => {
    el.innerHTML = lang === "en" ? el.dataset.en : el.dataset.fr;
  });
  document.documentElement.lang = lang;
  document.title = pageMeta[lang].title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", pageMeta[lang].description);
  if (cvDownload) cvDownload.setAttribute("href", cvLinks[lang]);
  langButtons.forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

let savedLang = "fr";
try { savedLang = localStorage.getItem("lang") || "fr"; } catch (e) {}
if (savedLang === "en") setLang("en");
