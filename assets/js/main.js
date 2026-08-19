/* ==========================================================================
   Aezziphotography — behaviour.
   Vanilla, no dependencies. Every block bails out quietly if the elements it
   needs are absent, so one script can serve every page.
   ========================================================================== */
(function () {
  "use strict";

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Escape anything interpolated into innerHTML. Content comes from
     site-data.js rather than a user, but quotes contain apostrophes and
     ampersands that must not be parsed as markup. */
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ------------------------------------------------------------- Header -- */
  function initNav() {
    const toggle = $(".nav-toggle");
    const nav = $("#primary-nav");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("is-locked", open);
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    // The drawer only exists below 900px; leaving it "open" while resizing up
    // would strand the scroll lock.
    window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });

    // Mark the current page in the nav without hand-editing every file.
    const here = location.pathname.split("/").pop() || "index.html";
    $$(".nav__link", nav).forEach((link) => {
      const target = link.getAttribute("href");
      if (target === here || (here === "index.html" && target === "./")) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------------------------------------------------------- Slideshow -- */
  function initSlideshow() {
    const root = $("[data-slideshow]");
    if (!root || typeof SLIDESHOW === "undefined" || !SLIDESHOW.length) return;

    root.innerHTML = SLIDESHOW.map((slide, i) => `
      <div class="slideshow__slide${i === 0 ? " is-active" : ""}">
        <img src="${esc(slide.src)}" alt="${esc(slide.alt)}"
             ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
      </div>`).join("");

    const slides = $$(".slideshow__slide", root);
    const dotsWrap = $("[data-slideshow-dots]");
    let index = 0;
    let timer = null;

    const show = (next) => {
      slides[index].classList.remove("is-active");
      dots[index] && dots[index].classList.remove("is-active");
      index = (next + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      dots[index] && dots[index].classList.add("is-active");
    };

    let dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map((_, i) => `
        <button class="slideshow__dot${i === 0 ? " is-active" : ""}" type="button"
                aria-label="Show slide ${i + 1} of ${slides.length}"></button>`).join("");
      dots = $$(".slideshow__dot", dotsWrap);
      dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); restart(); }));
    }

    const restart = () => {
      if (prefersReducedMotion || slides.length < 2) return;
      clearInterval(timer);
      timer = setInterval(() => show(index + 1), 6000);
    };

    // Pausing off-screen and on hidden tabs keeps the timer honest.
    document.addEventListener("visibilitychange", () => {
      document.hidden ? clearInterval(timer) : restart();
    });

    restart();
  }

  /* ----------------------------------------------------------- Services -- */
  function initServices() {
    const grid = $("[data-services]");
    if (!grid || typeof SERVICES === "undefined") return;

    const featuredOnly = grid.dataset.services === "featured";
    const list = featuredOnly ? SERVICES.filter((s) => s.featured) : SERVICES;

    grid.innerHTML = list.map((service, i) => `
      <article class="service reveal">
        <span class="service__num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${esc(service.title)}</h3>
        <p>${esc(service.blurb)}</p>
        ${service.items && service.items.length ? `
        <ul class="service__list">
          ${service.items.map((item) => `<li>${esc(item)}</li>`).join("")}
        </ul>` : ""}
      </article>`).join("");
  }

  /* ------------------------------------------------------ Category grid -- */
  function initCategories() {
    const grid = $("[data-categories]");
    if (!grid || typeof GALLERIES === "undefined") return;

    grid.innerHTML = GALLERIES.map((set) => {
      const cover = set.images && set.images[0];
      if (!cover) {
        // No photograph in this set yet — the tile still earns its place by
        // pointing at the enquiry form rather than sitting there empty.
        return `
          <a class="cat cat--empty reveal" href="contact.html">
            <div>
              <span class="cat__label" style="position:static;padding:0;align-items:center">
                <span>${esc(set.tagline)}</span>
                <strong>${esc(set.title)}</strong>
              </span>
              <p>This archive is being rebuilt.</p>
              <span class="link-arrow">Ask to see recent work &rarr;</span>
            </div>
          </a>`;
      }
      return `
        <a class="cat reveal" href="portfolio.html#${esc(set.id)}">
          <img src="${esc(cover.src)}" alt="${esc(cover.alt)}" loading="lazy" decoding="async">
          <span class="cat__label">
            <span>${esc(set.tagline)}</span>
            <strong>${esc(set.title)}</strong>
          </span>
        </a>`;
    }).join("");
  }

  /* ---------------------------------------------------------- Galleries -- */
  function initGalleries() {
    const root = $("[data-galleries]");
    if (!root || typeof GALLERIES === "undefined") return;

    const populated = GALLERIES.filter((set) => set.images && set.images.length);
    const empty = GALLERIES.filter((set) => !set.images || !set.images.length);

    root.innerHTML = populated.map((set) => `
      <section class="gallery-set" id="${esc(set.id)}">
        <header class="gallery-set__head">
          <h2>${esc(set.title)}</h2>
          <p>${esc(set.blurb)}</p>
        </header>
        <div class="masonry">
          ${set.images.map((img, i) => `
            <button class="masonry__item" type="button"
                    data-set="${esc(set.id)}" data-index="${i}"
                    aria-label="Open ${esc(img.caption || img.alt)} at full size">
              <img src="${esc(img.src)}" alt="${esc(img.alt)}"
                   ${img.w && img.h ? `width="${esc(img.w)}" height="${esc(img.h)}"` : ""}
                   loading="lazy" decoding="async">
            </button>`).join("")}
        </div>
      </section>`).join("");

    // Fade each frame in as it decodes, so the column layout does not flash.
    $$(".masonry__item img", root).forEach((img) => {
      if (img.complete) img.classList.add("is-loaded");
      else img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
    });

    const filters = $("[data-gallery-filters]");
    if (filters) {
      filters.innerHTML = [{ id: "all", title: "All work" }].concat(populated)
        .map((set, i) => `
          <button class="gallery-nav__btn${i === 0 ? " is-active" : ""}" type="button"
                  data-filter="${esc(set.id)}">${esc(set.title)}</button>`).join("");

      filters.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filter]");
        if (!btn) return;
        $$(".gallery-nav__btn", filters).forEach((b) => b.classList.toggle("is-active", b === btn));
        const wanted = btn.dataset.filter;
        $$(".gallery-set", root).forEach((section) => {
          section.hidden = wanted !== "all" && section.id !== wanted;
        });
      });
    }

    const note = $("[data-gallery-note]");
    if (note && empty.length) {
      note.innerHTML = `Also shooting ${empty.map((s) => esc(s.title.toLowerCase())).join(", ")} —
        those archives are being rebuilt. <a class="link-arrow" href="contact.html">Ask to see recent work</a>`;
      note.hidden = false;
    }

    // Deep links like portfolio.html#product should land on the section.
    if (location.hash) {
      const target = root.querySelector(location.hash);
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "auto", block: "start" }));
    }
  }

  /* ----------------------------------------------------------- Lightbox -- */
  function initLightbox() {
    const box = $("#lightbox");
    if (!box || typeof GALLERIES === "undefined") return;

    const img = $(".lightbox__img", box);
    const caption = $(".lightbox__caption", box);
    let current = { images: [], index: 0 };
    let lastFocus = null;

    const render = () => {
      const item = current.images[current.index];
      if (!item) return;
      img.src = item.src;
      img.alt = item.alt || "";
      caption.textContent = item.caption
        ? `${item.caption} — ${current.index + 1} / ${current.images.length}`
        : `${current.index + 1} / ${current.images.length}`;
    };

    const open = (setId, index) => {
      const set = GALLERIES.find((s) => s.id === setId);
      if (!set) return;
      lastFocus = document.activeElement;
      current = { images: set.images, index: index };
      render();
      box.classList.add("is-open");
      box.removeAttribute("aria-hidden");
      document.body.classList.add("is-locked");
      $(".lightbox__btn--close", box).focus();
    };

    const close = () => {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
      img.removeAttribute("src");
      if (lastFocus) lastFocus.focus();
    };

    const step = (delta) => {
      current.index = (current.index + delta + current.images.length) % current.images.length;
      render();
    };

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".masonry__item");
      if (trigger) open(trigger.dataset.set, Number(trigger.dataset.index));
    });

    box.addEventListener("click", (e) => {
      if (e.target.closest(".lightbox__btn--close")) return close();
      if (e.target.closest(".lightbox__btn--prev")) return step(-1);
      if (e.target.closest(".lightbox__btn--next")) return step(1);
      // A click on the backdrop itself (not the photograph) dismisses.
      if (!e.target.closest(".lightbox__figure")) close();
    });

    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    // Swipe between frames on touch devices.
    let startX = null;
    box.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
      startX = null;
    }, { passive: true });
  }

  /* ------------------------------------------------------- Testimonials -- */
  function initTestimonials() {
    const grid = $("[data-testimonials]");
    if (!grid || typeof TESTIMONIALS === "undefined") return;

    const limit = Number(grid.dataset.limit) || TESTIMONIALS.length;
    const list = TESTIMONIALS.slice(0, limit);

    grid.innerHTML = list.map((t) => `
      <figure class="quote reveal">
        <blockquote class="quote__text">${esc(t.quote)}</blockquote>
        <figcaption class="quote__cite">${esc(t.author)}${t.category ? ` · ${esc(t.category)}` : ""}</figcaption>
      </figure>`).join("");

    const filters = $("[data-testimonial-filters]");
    if (!filters) return;

    const categories = ["All", ...new Set(TESTIMONIALS.map((t) => t.category))];
    filters.innerHTML = categories.map((cat, i) => `
      <button class="gallery-nav__btn${i === 0 ? " is-active" : ""}" type="button"
              data-cat="${esc(cat)}">${esc(cat)}</button>`).join("");

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      $$(".gallery-nav__btn", filters).forEach((b) => b.classList.toggle("is-active", b === btn));
      const wanted = btn.dataset.cat;
      $$(".quote", grid).forEach((card, i) => {
        card.hidden = wanted !== "All" && list[i].category !== wanted;
      });
    });
  }

  /* ------------------------------------------------- Contact details/form -- */
  function initContactDetails() {
    if (typeof SITE === "undefined") return;

    // data-href="<key>" points a link at a contact channel…
    $$("[data-href]").forEach((el) => {
      const key = el.dataset.href;
      const value = SITE[key];
      if (!value) return;
      el.href = key === "email" ? `mailto:${value}`
              : key === "phone" ? SITE.phoneHref
              : value;
    });

    // …and data-site="<key>" prints the value as text.
    $$("[data-site]").forEach((el) => {
      const value = SITE[el.dataset.site];
      if (value) el.textContent = value;
    });
  }

  function initForm() {
    const form = $("[data-contact-form]");
    if (!form) return;

    const status = $("[data-form-status]", form);
    const say = (message, ok) => {
      if (!status) return;
      status.hidden = false;
      status.textContent = message;
      status.classList.toggle("is-ok", !!ok);
      status.classList.toggle("is-error", !ok);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form.querySelector('[name="_gotcha"]').value) return; // honeypot tripped

      const data = new FormData(form);
      const endpoint = (typeof SITE !== "undefined" && SITE.formEndpoint) || "";

      if (!endpoint) {
        // No backend configured: hand the message to the visitor's mail client
        // with everything already typed out.
        const body = [
          `Name: ${data.get("name")}`,
          `Email: ${data.get("email")}`,
          `Phone: ${data.get("phone") || "—"}`,
          `Service: ${data.get("service") || "—"}`,
          `Date: ${data.get("date") || "—"}`,
          "",
          data.get("message")
        ].join("\n");
        const subject = `Enquiry — ${data.get("service") || "Photography"} — ${data.get("name")}`;
        window.location.href =
          `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        say("Opening your email app with the message ready to send. If nothing happens, write to " + SITE.email + ".", true);
        return;
      }

      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      say("Sending…", true);

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        say("Thank you — your message is on its way. I usually reply within a day.", true);
      } catch (err) {
        say(`That didn't go through. Please email ${SITE.email} or message me on WhatsApp.`, false);
      } finally {
        submit.disabled = false;
      }
    });
  }

  /* ------------------------------------------------------ Scroll reveal -- */
  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    items.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------- Boot -- */
  function boot() {
    initNav();
    initSlideshow();
    initServices();
    initCategories();
    initGalleries();
    initLightbox();
    initTestimonials();
    initContactDetails();
    initForm();
    initReveal(); // last: picks up nodes the renderers just inserted

    const year = $("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
