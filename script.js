/* =========================================================
   SRI MANGALAMBIGA CATERING SERVICES
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("nav-open");

        if (mainNav.classList.contains("nav-open")) {
            menuToggle.innerHTML = "✕";
        } else {
            menuToggle.innerHTML = "☰";
        }

    });

}


/* Close mobile menu after clicking a link */

const navLinks = document.querySelectorAll(".main-nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (mainNav) {
            mainNav.classList.remove("nav-open");
        }

        if (menuToggle) {
            menuToggle.innerHTML = "☰";
        }

    });

});


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================================================
   DIGITAL MENU BOOK
   ========================================================= */

const menuPage = document.getElementById("menuPage");
const menuBook = document.getElementById("menuBook");

const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");

const firstButton = document.getElementById("firstPage");
const lastButton = document.getElementById("lastPage");

const currentPageElement =
    document.getElementById("currentPage");


/* Total number of menu pages */

const totalPages = 12;


/* Current page */

let currentPage = 1;


/* Animation lock */

let isTurning = false;


/* =========================================================
   PAGE IMAGE
   ========================================================= */

function getPageImage(pageNumber) {

    return `assets/menu-pages/page-${String(pageNumber).padStart(2, "0")}.webp`;

}


/* =========================================================
   UPDATE PAGE
   ========================================================= */

function updatePage() {

    if (!menuPage) {
        return;
    }

    menuPage.src = getPageImage(currentPage);

    menuPage.alt =
        `Sri Mangalambiga Catering Services Menu Page ${currentPage}`;


    if (currentPageElement) {

        currentPageElement.textContent = currentPage;

    }


    updateButtons();

}


/* =========================================================
   UPDATE BUTTON STATES
   ========================================================= */

function updateButtons() {

    if (prevButton) {

        prevButton.disabled =
            currentPage === 1;

    }


    if (nextButton) {

        nextButton.disabled =
            currentPage === totalPages;

    }


    if (firstButton) {

        firstButton.disabled =
            currentPage === 1;

    }


    if (lastButton) {

        lastButton.disabled =
            currentPage === totalPages;

    }

}


/* =========================================================
   PAGE TURN SOUND
   ========================================================= */

let audioContext = null;


function playPageSound() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.type = "triangle";

        oscillator.frequency.setValueAtTime(
            420,
            audioContext.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            150,
            audioContext.currentTime + 0.12
        );


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.08,
            audioContext.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.14
        );


        oscillator.connect(gain);

        gain.connect(audioContext.destination);


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.15
        );

    }

    catch (error) {

        console.log(
            "Page sound is not available."
        );

    }

}


/* =========================================================
   PAGE ANIMATION
   ========================================================= */

function animatePage(direction) {

    if (!menuBook || isTurning) {
        return;
    }


    isTurning = true;


    menuBook.classList.remove(
        "turn-next",
        "turn-prev"
    );


    /* Force browser to restart animation */

    void menuBook.offsetWidth;


    if (direction === "next") {

        menuBook.classList.add("turn-next");

    } else {

        menuBook.classList.add("turn-prev");

    }


    playPageSound();


    setTimeout(() => {

        menuBook.classList.remove(
            "turn-next",
            "turn-prev"
        );

        isTurning = false;

    }, 650);

}


/* =========================================================
   NEXT PAGE
   ========================================================= */

function nextPage() {

    if (
        currentPage >= totalPages ||
        isTurning
    ) {
        return;
    }


    animatePage("next");


    setTimeout(() => {

        currentPage++;

        updatePage();

    }, 300);

}


/* =========================================================
   PREVIOUS PAGE
   ========================================================= */

function previousPage() {

    if (
        currentPage <= 1 ||
        isTurning
    ) {
        return;
    }


    animatePage("prev");


    setTimeout(() => {

        currentPage--;

        updatePage();

    }, 300);

}


/* =========================================================
   NEXT BUTTON
   ========================================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextPage
    );

}


/* =========================================================
   PREVIOUS BUTTON
   ========================================================= */

if (prevButton) {

    prevButton.addEventListener(
        "click",
        previousPage
    );

}


/* =========================================================
   FIRST PAGE
   ========================================================= */

if (firstButton) {

    firstButton.addEventListener(
        "click",
        () => {

            if (currentPage === 1) {
                return;
            }


            currentPage = 1;

            updatePage();

            playPageSound();

        }
    );

}


/* =========================================================
   LAST PAGE
   ========================================================= */

if (lastButton) {

    lastButton.addEventListener(
        "click",
        () => {

            if (currentPage === totalPages) {
                return;
            }


            currentPage = totalPages;

            updatePage();

            playPageSound();

        }
    );

}


/* =========================================================
   MOBILE SWIPE SUPPORT
   ========================================================= */

let touchStartX = 0;
let touchStartY = 0;


if (menuBook) {

    menuBook.addEventListener(
        "touchstart",
        (event) => {

            const touch =
                event.changedTouches[0];

            touchStartX = touch.screenX;
            touchStartY = touch.screenY;

        },
        { passive: true }
    );


    menuBook.addEventListener(
        "touchend",
        (event) => {

            const touch =
                event.changedTouches[0];

            const touchEndX =
                touch.screenX;

            const touchEndY =
                touch.screenY;


            const differenceX =
                touchEndX - touchStartX;

            const differenceY =
                touchEndY - touchStartY;


            /*
             * Ignore mostly vertical swipes
             */

            if (
                Math.abs(differenceX) <
                Math.abs(differenceY)
            ) {

                return;

            }


            /*
             * Minimum swipe distance
             */

            if (Math.abs(differenceX) < 50) {

                return;

            }


            /*
             * Swipe LEFT = Next page
             */

            if (differenceX < 0) {

                nextPage();

            }


            /*
             * Swipe RIGHT = Previous page
             */

            else {

                previousPage();

            }

        },
        { passive: true }
    );

}


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Only activate keyboard controls
         * when menu book exists.
         */

        if (!menuBook) {
            return;
        }


        if (event.key === "ArrowRight") {

            nextPage();

        }


        if (event.key === "ArrowLeft") {

            previousPage();

        }


        if (event.key === "Home") {

            currentPage = 1;

            updatePage();

        }


        if (event.key === "End") {

            currentPage = totalPages;

            updatePage();

        }

    }
);


/* =========================================================
   PRELOAD MENU PAGES
   ========================================================= */

function preloadMenuPages() {

    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        const image = new Image();

        image.src =
            getPageImage(page);

    }

}


/* =========================================================
   INITIALIZE MENU
   ========================================================= */

if (menuPage) {

    updatePage();

    preloadMenuPages();

}
/* =========================================================
   SRI MANGALAMBIGA CATERING SERVICES
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {
            mainNav.classList.toggle("active");

            const expanded = mainNav.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", expanded);
        });

        // Close mobile menu after clicking a navigation link
        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                mainNav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================================
       FOOTER YEAR
       ===================================================== */

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       DIGITAL MENU BOOK
       ===================================================== */

    const menuBook = document.querySelector(".menu-book");
    const menuPage = document.querySelector(".book-page img");

    const prevButton = document.querySelector(".book-prev");
    const nextButton = document.querySelector(".book-next");
    const firstButton = document.querySelector(".book-first");
    const lastButton = document.querySelector(".book-last");

    const currentPageElement = document.querySelector(".current-page");
    const totalPagesElement = document.querySelector(".total-pages");

    let currentMenuPage = 1;

    const totalMenuPages = 12;

    // Menu page image path
    function getPageImage(pageNumber) {
        return "assets/menu-pages/page-" +
            String(pageNumber).padStart(2, "0") +
            ".webp";
    }


    // Update menu page
    function updateMenuPage() {

        if (!menuPage) {
            return;
        }

        menuPage.src = getPageImage(currentMenuPage);

        menuPage.alt =
            "Sri Mangalambiga Catering Services Menu - Page " +
            currentMenuPage;

        if (currentPageElement) {
            currentPageElement.textContent = currentMenuPage;
        }

        if (totalPagesElement) {
            totalPagesElement.textContent = totalMenuPages;
        }

        updateMenuButtons();
    }


    // Enable / disable buttons
    function updateMenuButtons() {

        if (prevButton) {
            prevButton.disabled = currentMenuPage <= 1;
        }

        if (firstButton) {
            firstButton.disabled = currentMenuPage <= 1;
        }

        if (nextButton) {
            nextButton.disabled =
                currentMenuPage >= totalMenuPages;
        }

        if (lastButton) {
            lastButton.disabled =
                currentMenuPage >= totalMenuPages;
        }
    }


    /* =====================================================
       PAGE TURN SOUND
       ===================================================== */

    let audioContext = null;

    function playPageSound() {

        try {

            if (!audioContext) {
                audioContext =
                    new (window.AudioContext ||
                        window.webkitAudioContext)();
            }

            if (audioContext.state === "suspended") {
                audioContext.resume();
            }

            const oscillator =
                audioContext.createOscillator();

            const gainNode =
                audioContext.createGain();

            oscillator.type = "triangle";

            oscillator.frequency.setValueAtTime(
                150,
                audioContext.currentTime
            );

            oscillator.frequency.exponentialRampToValueAtTime(
                80,
                audioContext.currentTime + 0.08
            );

            gainNode.gain.setValueAtTime(
                0.0001,
                audioContext.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.08,
                audioContext.currentTime + 0.01
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.0001,
                audioContext.currentTime + 0.12
            );

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();

            oscillator.stop(
                audioContext.currentTime + 0.13
            );

        } catch (error) {
            // Audio is optional. Ignore unsupported browsers.
        }
    }


    /* =====================================================
       MENU PAGE ANIMATION
       ===================================================== */

    function animateMenuPage(direction) {

        if (!menuBook) {
            return;
        }

        menuBook.classList.remove(
            "turn-next",
            "turn-prev"
        );

        // Force browser reflow
        void menuBook.offsetWidth;

        if (direction === "next") {
            menuBook.classList.add("turn-next");
        }

        if (direction === "prev") {
            menuBook.classList.add("turn-prev");
        }

        setTimeout(function () {

            menuBook.classList.remove(
                "turn-next",
                "turn-prev"
            );

        }, 650);
    }


    // Next page
    function nextMenuPage() {

        if (currentMenuPage >= totalMenuPages) {
            return;
        }

        currentMenuPage++;

        playPageSound();
        animateMenuPage("next");
        updateMenuPage();
    }


    // Previous page
    function previousMenuPage() {

        if (currentMenuPage <= 1) {
            return;
        }

        currentMenuPage--;

        playPageSound();
        animateMenuPage("prev");
        updateMenuPage();
    }


    // First page
    function goToFirstMenuPage() {

        if (currentMenuPage === 1) {
            return;
        }

        currentMenuPage = 1;

        playPageSound();
        animateMenuPage("prev");
        updateMenuPage();
    }


    // Last page
    function goToLastMenuPage() {

        if (currentMenuPage === totalMenuPages) {
            return;
        }

        currentMenuPage = totalMenuPages;

        playPageSound();
        animateMenuPage("next");
        updateMenuPage();
    }


    // Button events
    if (nextButton) {
        nextButton.addEventListener(
            "click",
            nextMenuPage
        );
    }

    if (prevButton) {
        prevButton.addEventListener(
            "click",
            previousMenuPage
        );
    }

    if (firstButton) {
        firstButton.addEventListener(
            "click",
            goToFirstMenuPage
        );
    }

    if (lastButton) {
        lastButton.addEventListener(
            "click",
            goToLastMenuPage
        );
    }


    /* =====================================================
       MENU BOOK MOBILE SWIPE
       ===================================================== */

    let menuTouchStartX = 0;
    let menuTouchEndX = 0;

    if (menuBook) {

        menuBook.addEventListener(
            "touchstart",
            function (event) {

                menuTouchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        menuBook.addEventListener(
            "touchend",
            function (event) {

                menuTouchEndX =
                    event.changedTouches[0].screenX;

                const swipeDistance =
                    menuTouchStartX - menuTouchEndX;

                const minimumSwipe = 50;

                if (Math.abs(swipeDistance) < minimumSwipe) {
                    return;
                }

                if (swipeDistance > 0) {
                    // Swipe left = next page
                    nextMenuPage();
                } else {
                    // Swipe right = previous page
                    previousMenuPage();
                }

            },
            { passive: true }
        );
    }


    /* =====================================================
       MENU BOOK KEYBOARD CONTROLS
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            // Only activate keyboard controls
            // when menu book exists
            if (!menuBook) {
                return;
            }

            // Do not interfere with form fields
            const activeElement =
                document.activeElement;

            if (
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.tagName === "SELECT"
                )
            ) {
                return;
            }

            if (event.key === "ArrowRight") {

                event.preventDefault();
                nextMenuPage();

            } else if (event.key === "ArrowLeft") {

                event.preventDefault();
                previousMenuPage();

            } else if (event.key === "Home") {

                event.preventDefault();
                goToFirstMenuPage();

            } else if (event.key === "End") {

                event.preventDefault();
                goToLastMenuPage();
            }
        }
    );


    /* =====================================================
       PRELOAD MENU PAGES
       ===================================================== */

    function preloadMenuPages() {

        for (let page = 1; page <= totalMenuPages; page++) {

            const image = new Image();

            image.src = getPageImage(page);
        }
    }


    if (menuBook) {

        updateMenuPage();

        // Start preloading after the page has loaded
        setTimeout(
            preloadMenuPages,
            500
        );
    }


    /* =====================================================
       GALLERY LIGHTBOX
       ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const lightbox =
        document.querySelector(".gallery-lightbox");

    const lightboxImage =
        document.querySelector(".lightbox-content img");

    const lightboxCaption =
        document.querySelector(".lightbox-caption");

    const lightboxClose =
        document.querySelector(".lightbox-close");

    const lightboxPrev =
        document.querySelector(".lightbox-prev");

    const lightboxNext =
        document.querySelector(".lightbox-next");

    let currentGalleryIndex = 0;


    // Open gallery image
    function openGallery(index) {

        if (
            !lightbox ||
            !lightboxImage ||
            galleryItems.length === 0
        ) {
            return;
        }

        currentGalleryIndex = index;

        const item =
            galleryItems[currentGalleryIndex];

        const image =
            item.querySelector("img");

        if (!image) {
            return;
        }

        lightboxImage.src = image.src;

        lightboxImage.alt =
            image.alt || "Gallery image";

        if (lightboxCaption) {

            const caption =
                item.querySelector(".gallery-caption");

            if (caption) {
                lightboxCaption.textContent =
                    caption.textContent;
            } else {
                lightboxCaption.textContent =
                    image.alt || "";
            }
        }

        lightbox.classList.add("active");

        document.body.classList.add(
            "lightbox-open"
        );

        // Accessibility
        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    // Close gallery
    function closeGallery() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("active");

        document.body.classList.remove(
            "lightbox-open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    // Previous gallery image
    function previousGalleryImage() {

        if (galleryItems.length === 0) {
            return;
        }

        currentGalleryIndex--;

        if (currentGalleryIndex < 0) {
            currentGalleryIndex =
                galleryItems.length - 1;
        }

        openGallery(currentGalleryIndex);
    }


    // Next gallery image
    function nextGalleryImage() {

        if (galleryItems.length === 0) {
            return;
        }

        currentGalleryIndex++;

        if (
            currentGalleryIndex >=
            galleryItems.length
        ) {
            currentGalleryIndex = 0;
        }

        openGallery(currentGalleryIndex);
    }


    // Attach click events to gallery images
    galleryItems.forEach(function (item, index) {

        item.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openGallery(index);
            }
        );

        // Keyboard accessibility
        item.setAttribute(
            "tabindex",
            "0"
        );

        item.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openGallery(index);
                }
            }
        );
    });


    // Close button
    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeGallery
        );
    }


    // Previous button
    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                previousGalleryImage();
            }
        );
    }


    // Next button
    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                nextGalleryImage();
            }
        );
    }


    // Click outside image = close
    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox
                ) {
                    closeGallery();
                }
            }
        );
    }


    /* =====================================================
       GALLERY KEYBOARD CONTROLS
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }

            if (event.key === "Escape") {

                event.preventDefault();

                closeGallery();

            } else if (event.key === "ArrowLeft") {

                event.preventDefault();

                previousGalleryImage();

            } else if (event.key === "ArrowRight") {

                event.preventDefault();

                nextGalleryImage();
            }
        }
    );


    /* =====================================================
       GALLERY MOBILE SWIPE
       ===================================================== */

    let galleryTouchStartX = 0;
    let galleryTouchEndX = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            function (event) {

                galleryTouchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        lightbox.addEventListener(
            "touchend",
            function (event) {

                galleryTouchEndX =
                    event.changedTouches[0].screenX;

                const distance =
                    galleryTouchStartX -
                    galleryTouchEndX;

                const minimumSwipe = 50;

                if (
                    Math.abs(distance) <
                    minimumSwipe
                ) {
                    return;
                }

                if (distance > 0) {

                    nextGalleryImage();

                } else {

                    previousGalleryImage();
                }

            },
            { passive: true }
        );
    }


    /* =====================================================
       CONTACT ENQUIRY FORM
       ===================================================== */

    const enquiryForm =
        document.querySelector("#enquiryForm");


    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // Get form values
                const name =
                    document.querySelector("#name")?.value.trim() || "";

                const phone =
                    document.querySelector("#phone")?.value.trim() || "";

                const email =
                    document.querySelector("#email")?.value.trim() || "";

                const eventType =
                    document.querySelector("#eventType")?.value.trim() || "";

                const eventDate =
                    document.querySelector("#eventDate")?.value || "";

                const guests =
                    document.querySelector("#guests")?.value.trim() || "";

                const message =
                    document.querySelector("#message")?.value.trim() || "";


                // Basic validation
                if (!name || !phone || !eventType) {

                    alert(
                        "Please fill in all required fields."
                    );

                    return;
                }


                // Email subject
                const subject =
                    "Catering Enquiry - " + name;


                // Email body
                const body =
                    "Sri Mangalambiga Catering Services - Catering Enquiry\n\n" +

                    "Name: " + name + "\n" +

                    "Phone: " + phone + "\n" +

                    "Email: " +
                    (email || "Not provided") +
                    "\n" +

                    "Event Type: " +
                    eventType +
                    "\n" +

                    "Event Date: " +
                    (eventDate || "Not specified") +
                    "\n" +

                    "Approximate Guests: " +
                    (guests || "Not specified") +
                    "\n\n" +

                    "Message:\n" +
                    (message || "No additional message.") +
                    "\n\n" +

                    "Sent through the Sri Mangalambiga Catering Services website.";


                // Create mailto link
                const mailtoLink =
                    "mailto:mangalambigacatering@gmail.com" +
                    "?subject=" +
                    encodeURIComponent(subject) +
                    "&body=" +
                    encodeURIComponent(body);


                // Open user's email application
                window.location.href =
                    mailtoLink;
            }
        );
    }


    /* =====================================================
       CONTACT FORM DATE
       Prevent selecting past dates
       ===================================================== */

    const eventDateInput =
        document.querySelector("#eventDate");

    if (eventDateInput) {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(today.getDate())
                .padStart(2, "0");

        eventDateInput.min =
            year + "-" + month + "-" + day;
    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const smoothLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    smoothLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    const allImages =
        document.querySelectorAll("img");

    allImages.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                this.classList.add(
                    "image-load-error"
                );

            }
        );
    });

});
