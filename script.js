/* =========================================================
   SRI MANGALAMBIGA CATERING SERVICES
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("open");

            if (mainNav.classList.contains("open")) {
                menuToggle.innerHTML = "✕";
                menuToggle.setAttribute("aria-expanded", "true");
            } else {
                menuToggle.innerHTML = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }

        });


        /* Close menu after clicking a link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("open");

                menuToggle.innerHTML = "☰";

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       DIGITAL MENU BOOK
    ===================================================== */

    const menuBook =
        document.getElementById("menuBook");

    const menuPage =
        document.querySelector(".book-page img");

    const prevButton =
        document.getElementById("prevPage");

    const nextButton =
        document.getElementById("nextPage");

    const firstButton =
        document.getElementById("firstPage");

    const lastButton =
        document.getElementById("lastPage");

    const currentPageElement =
        document.getElementById("currentPage");


    /* Total number of pages */

    const totalPages = 12;


    /* Current page */

    let currentPage = 1;


    /* Animation lock */

    let isTurning = false;


    /* =====================================================
       PAGE IMAGE PATH
    ===================================================== */

    function getPageImage(pageNumber) {

        return "images/pages/page-" +
            String(pageNumber).padStart(2, "0") +
            ".webp";

    }


    /* =====================================================
       UPDATE PAGE
    ===================================================== */

    function updatePage() {

        if (!menuPage) {
            return;
        }


        menuPage.src =
            getPageImage(currentPage);


        menuPage.alt =
            "Sri Mangalambiga Catering Services Menu - Page " +
            currentPage;


        if (currentPageElement) {

            currentPageElement.textContent =
                currentPage;

        }


        updateButtons();

    }


    /* =====================================================
       UPDATE BUTTONS
    ===================================================== */

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


    /* =====================================================
       PAGE TURN SOUND
    ===================================================== */

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


            if (audioContext.state === "suspended") {

                audioContext.resume();

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

            gain.connect(
                audioContext.destination
            );


            oscillator.start();

            oscillator.stop(
                audioContext.currentTime + 0.15
            );

        }

        catch (error) {

            console.log(
                "Page sound unavailable."
            );

        }

    }


    /* =====================================================
       PAGE TURN ANIMATION
    ===================================================== */

    function animatePage(direction) {

        if (!menuBook || isTurning) {
            return;
        }


        isTurning = true;


        menuBook.classList.remove(
            "turn-next",
            "turn-prev"
        );


        /* Restart animation */

        void menuBook.offsetWidth;


        if (direction === "next") {

            menuBook.classList.add(
                "turn-next"
            );

        } else {

            menuBook.classList.add(
                "turn-prev"
            );

        }


        playPageSound();


        setTimeout(function () {

            menuBook.classList.remove(
                "turn-next",
                "turn-prev"
            );

            isTurning = false;

        }, 650);

    }


    /* =====================================================
       NEXT PAGE
    ===================================================== */

    function nextPage() {

        if (
            currentPage >= totalPages ||
            isTurning
        ) {

            return;

        }


        animatePage("next");


        setTimeout(function () {

            currentPage++;

            updatePage();

        }, 300);

    }


    /* =====================================================
       PREVIOUS PAGE
    ===================================================== */

    function previousPage() {

        if (
            currentPage <= 1 ||
            isTurning
        ) {

            return;

        }


        animatePage("prev");


        setTimeout(function () {

            currentPage--;

            updatePage();

        }, 300);

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextPage
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            previousPage
        );

    }


    /* =====================================================
       FIRST PAGE
    ===================================================== */

    if (firstButton) {

        firstButton.addEventListener(
            "click",
            function () {

                if (currentPage === 1) {
                    return;
                }


                currentPage = 1;

                updatePage();

                playPageSound();

            }
        );

    }


    /* =====================================================
       LAST PAGE
    ===================================================== */

    if (lastButton) {

        lastButton.addEventListener(
            "click",
            function () {

                if (currentPage === totalPages) {
                    return;
                }


                currentPage = totalPages;

                updatePage();

                playPageSound();

            }
        );

    }


    /* =====================================================
       MOBILE SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchStartY = 0;


    if (menuBook) {

        menuBook.addEventListener(
            "touchstart",
            function (event) {

                const touch =
                    event.changedTouches[0];

                touchStartX =
                    touch.screenX;

                touchStartY =
                    touch.screenY;

            },
            { passive: true }
        );


        menuBook.addEventListener(
            "touchend",
            function (event) {

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


                /* Ignore vertical swipes */

                if (
                    Math.abs(differenceX) <
                    Math.abs(differenceY)
                ) {

                    return;

                }


                /* Minimum swipe distance */

                if (
                    Math.abs(differenceX) < 50
                ) {

                    return;

                }


                /* Swipe LEFT = Next */

                if (differenceX < 0) {

                    nextPage();

                }


                /* Swipe RIGHT = Previous */

                else {

                    previousPage();

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

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


    /* =====================================================
       PRELOAD ALL MENU PAGES
    ===================================================== */

    function preloadMenuPages() {

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const image =
                new Image();

            image.src =
                getPageImage(page);

        }

    }


    /* =====================================================
       INITIALIZE MENU
    ===================================================== */

    if (menuPage) {

        updatePage();

        preloadMenuPages();

    }

});
