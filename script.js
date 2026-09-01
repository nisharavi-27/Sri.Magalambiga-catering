// =====================================================
// SRI MANGALAMBIGA CATERING
// WEBSITE JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =================================================
    // ACTIVE NAVIGATION
    // =================================================

    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    // =================================================
    // SCROLL REVEAL ANIMATION
    // =================================================

    const revealElements = document.querySelectorAll(
        ".food-card, .feature, .service-card, .event-card, .about-image, .about-content"
    );

    function revealOnScroll() {

        revealElements.forEach(function (element) {

            const elementTop =
                element.getBoundingClientRect().top;

            const windowHeight =
                window.innerHeight;

            if (elementTop < windowHeight - 80) {
                element.classList.add("show");
            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);

    // Run once when page loads
    revealOnScroll();


    // =================================================
    // SMOOTH BOOKING BUTTON
    // =================================================

    const bookingButtons = document.querySelectorAll(
        ".book-btn, .cta-btn, .secondary-btn"
    );

    bookingButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const target =
                this.getAttribute("href");

            if (target && target.startsWith("#")) {

                const section =
                    document.querySelector(target);

                if (section) {

                    event.preventDefault();

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    // =================================================
    // CONTACT FORM
    // =================================================

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                contactForm
                .querySelector('input[type="text"]')
                .value.trim();

            const phone =
                contactForm
                .querySelector('input[type="tel"]')
                .value.trim();

            if (name === "" || phone === "") {

                alert(
                    "Please enter your name and phone number."
                );

                return;
            }

            alert(
                "Thank you, " +
                name +
                "! Your catering enquiry has been received."
            );

            contactForm.reset();

        });

    }


    // =================================================
    // IMAGE ERROR HANDLING
    // =================================================

    const images =
        document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("error", function () {

            console.log(
                "Image not found: " +
                image.getAttribute("src")
            );

            image.style.display = "none";

        });

    });


    // =================================================
    // CURRENT YEAR
    // =================================================

    const copyright =
        document.querySelector(".copyright");

    if (copyright) {

        const currentYear =
            new Date().getFullYear();

        copyright.innerHTML =
            "© " +
            currentYear +
            " Sri Mangalambiga Catering. All Rights Reserved.";

    }


    // =================================================
    // ACTIVE NAVIGATION WHILE SCROLLING
    // =================================================

    const sections =
        document.querySelectorAll("section[id]");

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    });


    // =================================================
    // CARD HOVER EFFECT
    // =================================================

    const cards = document.querySelectorAll(
        ".service-card, .food-card, .event-card, .feature"
    );

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-8px)";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });

    });


    // =================================================
    // PAGE LOADED
    // =================================================

    console.log(
        "Sri Mangalambiga Catering website loaded successfully."
    );

});

 function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".navbar a");

    // Toggle dropdown menu on hamburger click
    if (hamburgerBtn && navbar) {
        hamburgerBtn.addEventListener("click", function () {
            hamburgerBtn.classList.toggle("active");
            navbar.classList.toggle("active");
        });
    }

    // Close navigation menu when any link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navbar && navbar.classList.contains("active")) {
                navbar.classList.remove("active");
            }
            if (hamburgerBtn && hamburgerBtn.classList.contains("active")) {
                hamburgerBtn.classList.remove("active");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    // Works for both click and mobile touch
    card.addEventListener("click", () => {
      // Remove active state from all cards
      cards.forEach((c) => c.classList.remove("active"));
      
      // Add active state to the selected card
      card.classList.add("active");
    });
  });
});
