/*==========================================
        Phomar Systems
        script.js (modern redesign)
==========================================*/

(function () {

    "use strict";

    const navbar = document.getElementById("mainNav");
    const topBtn = document.getElementById("topBtn");
    const navCollapse = document.getElementById("navbar");


    // ===============================
    // Navbar shadow + scroll-to-top button
    // ===============================

    const onScroll = () => {
        const y = window.scrollY;
        if (navbar) navbar.classList.toggle("scrolled", y > 40);
        if (topBtn) topBtn.classList.toggle("show", y > 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    // ===============================
    // Smooth scroll for in-page links
    // (also closes the mobile menu)
    // ===============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const id = this.getAttribute("href");
            if (!id || id.length < 2) return;

            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            history.replaceState(null, "", id);

            if (navCollapse && navCollapse.classList.contains("show") && window.bootstrap) {
                window.bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
            }
        });

    });


    // ===============================
    // Active nav link while scrolling
    // ===============================

    const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
    const linkById = {};

    navLinks.forEach(link => {
        linkById[link.getAttribute("href").slice(1)] = link;
    });

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const link = linkById[entry.target.id];
                if (!link) return;
                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            });
        }, { rootMargin: "-45% 0px -50% 0px" });

        document.querySelectorAll("section[id]").forEach(section => sectionObserver.observe(section));
    }


    // ===============================
    // Reveal-on-scroll animation
    // ===============================

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        revealItems.forEach((item, i) => {
            // small stagger for items in the same row
            item.style.transitionDelay = (i % 3) * 0.08 + "s";
            revealObserver.observe(item);
        });

    } else {
        revealItems.forEach(item => item.classList.add("is-visible"));
    }


    // ===============================
    // Counter animation (starts when visible)
    // ===============================

    const counters = document.querySelectorAll("#counter [data-target]");

    const animateCounter = (el) => {
        const target = Number(el.dataset.target) || 0;
        const suffix = el.dataset.suffix || "";
        const duration = 1600;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window && counters.length) {

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }


    // ===============================
    // Get Quote toggle
    // ===============================

    const quoteButton = document.getElementById("quoteButton");
    const quoteMessage = document.getElementById("quoteMessage");

    if (quoteButton && quoteMessage) {

        quoteButton.addEventListener("click", () => {
            const isOpen = !quoteMessage.hidden;
            quoteMessage.hidden = isOpen;
            quoteButton.setAttribute("aria-expanded", String(!isOpen));
            quoteButton.textContent = isOpen ? "Get Quote" : "Hide Quote";
        });

    }


    // ===============================
    // AI Assistant
    // ===============================

    const aiAssistantToggle = document.getElementById("aiAssistantToggle");
    const aiAssistantPanel = document.getElementById("aiAssistantPanel");
    const aiAssistantClose = document.getElementById("aiAssistantClose");
    const aiAssistantForm = document.getElementById("aiAssistantForm");
    const aiAssistantInput = document.getElementById("aiAssistantInput");
    const aiAssistantMessages = document.getElementById("aiAssistantMessages");

    const addAssistantMessage = (message, type) => {
        const element = document.createElement("div");
        element.className = `ai-message ai-message-${type}`;
        element.textContent = message;
        aiAssistantMessages.appendChild(element);
        aiAssistantMessages.scrollTop = aiAssistantMessages.scrollHeight;
        return element;
    };

    if (aiAssistantToggle && aiAssistantPanel && aiAssistantClose) {

        const setAssistantOpen = (isOpen) => {
            aiAssistantPanel.hidden = !isOpen;
            aiAssistantToggle.setAttribute("aria-expanded", String(isOpen));
            if (isOpen && aiAssistantInput) aiAssistantInput.focus();
        };

        aiAssistantToggle.addEventListener("click", () => setAssistantOpen(aiAssistantPanel.hidden));
        aiAssistantClose.addEventListener("click", () => setAssistantOpen(false));

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !aiAssistantPanel.hidden) setAssistantOpen(false);
        });
    }

    if (aiAssistantForm && aiAssistantInput && aiAssistantMessages) {

        aiAssistantForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const question = aiAssistantInput.value.trim();
            if (!question) return;

            addAssistantMessage(question, "user");
            aiAssistantInput.value = "";
            const loadingMessage = addAssistantMessage("Thinking...", "bot");

            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: question })
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Assistant request failed");
                }

                loadingMessage.textContent = data.reply;
            }
            catch (error) {
                loadingMessage.textContent = "AI assistant is unavailable right now. Please email phomarinfo@gmail.com or use Connect.";
                console.error(error);
            }
        });

    }


    // ===============================
    // Footer year
    // ===============================

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    console.log("Phomar Systems Website Loaded Successfully");

})();
