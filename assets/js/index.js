// variables
// Sid Bar
var settingsToggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var fontButtons = document.querySelectorAll('.font-option');
var colorButtons = document.querySelectorAll('#theme-colors-grid button');

// navbar & button up
var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll(".nav-link");
var scrollToTop = document.getElementById("scroll-to-top");
var heroSection = document.getElementById("hero-section");
// navtab
var webCategory = document.querySelectorAll('[data-category="web"]');
var appCategory = document.querySelectorAll('[data-category="app"]');
var designCategory = document.querySelectorAll('[data-category="design"]');
var ecommerceCategory = document.querySelectorAll('[data-category="ecommerce"]');
var webButton = document.querySelector('[data-filter="web"]');
var appButton = document.querySelector('[data-filter="app"]');
var designButton = document.querySelector('[data-filter="design"]');
var ecommerceButton = document.querySelector('[data-filter="ecommerce"]');
var allButton = document.querySelector('[data-filter="all"]');
var filterButtons = document.querySelectorAll(".portfolio-filter");
// slider
var carousel = document.getElementById("testimonials-carousel");
var cards = document.querySelectorAll(".testimonial-card");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var indicators = document.querySelectorAll(".carousel-indicator");

var currentIndex = 0;

var index;

// defaults
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
}

const savedFont = localStorage.getItem('fonts');
if (savedFont) {
    document.body.style.fontFamily = savedFont;
    fontButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.font === savedFont));
}

//------------------------EventListener--------------------------//

//-------Navbar-------//

window.addEventListener("scroll", function () {
    let currentSecId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (this.scrollY >= sectionTop - 100) {
            currentSecId = section.getAttribute("id");
        }
    });

    navLinks.forEach((navLink) => {
        navLink.classList.remove("active");

        if (navLink.getAttribute("href") === "#" + currentSecId) {
            navLink.classList.add("active");
        }
    });

    //-------scroll-to-top Button -------//
    if (scrollY >= heroSection.clientHeight - 100) {
        scrollToTop.classList.remove("opacity-0", "invisible");
        scrollToTop.classList.add("visible");
    } else {
        scrollToTop.classList.remove("visible");
        scrollToTop.classList.add("opacity-0", "invisible");
    }
});

scrollToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});




//-------light & dark Mode-------//

document.getElementById("theme-toggle-button").addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");

        if (document.documentElement.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });


// Side Bar 

//-------open side bar-------//
settingsToggle.addEventListener("click", function () {
    console.log("settingsToggle clicked");
    settingsSidebar.classList.toggle("translate-x-full");
    settingsToggle.classList.add("translate-x-full");
});

//-------close side bar with X button --------//
document.getElementById("close-settings").addEventListener("click", function () {
        settingsSidebar.classList.add("translate-x-full");
        settingsToggle.classList.remove("translate-x-full");
    });


//-------Fonts-------//
fontButtons.forEach(button => {
    button.addEventListener('click', () => {

        fontButtons.forEach((btn) => {
            btn.classList.remove('active')
        });
    
        button.classList.add('active');

        const selectedFont = button.dataset.font; 
        document.body.style.fontFamily = selectedFont; 
        localStorage.setItem('fonts',selectedFont);
    });
});


//-------Colors-------//
colorButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        let primary = btn.dataset.primary;
        let secondary = btn.dataset.secondary;
        let accent = btn.dataset.accent;
        document.documentElement.style.setProperty('--color-primary', primary)
        document.documentElement.style.setProperty('--color-secondary', secondary)
        document.documentElement.style.setProperty('--color-accent', accent)
        localStorage.setItem('primary', primary)
        localStorage.setItem('secondary', secondary)
        localStorage.setItem('accent', accent)


        colorButtons.forEach(function (colorBtn) {
            colorBtn.classList.remove('active-color')
        })
        btn.classList.add('active-color')
    })

})

const primarySaved = localStorage.getItem('primary');
const secondarySaved = localStorage.getItem('secondary');
const accentSaved = localStorage.getItem('accent');

if (primarySaved && secondarySaved && accentSaved) {
    document.documentElement.style.setProperty('--color-primary', primarySaved)
    document.documentElement.style.setProperty('--color-secondary', secondarySaved)
    document.documentElement.style.setProperty('--color-accent', accentSaved)

    colorButtons.forEach(function (colorBtn) {
        if (colorBtn.dataset.primary == primarySaved && colorBtn.dataset.secondary == secondarySaved && colorBtn.dataset.accent == accentSaved) {
            colorBtn.classList.add('active=color')
        }
        else {
            colorBtn.classList.remove('active=color')
        }
    })
}


//-------reset-settings button-------//
document.getElementById('reset-settings').addEventListener('click',()=>{

        document.documentElement.style.setProperty('--color-primary', "#6366f1")
        document.documentElement.style.setProperty('--color-secondary', "#8b5cf6")
        document.documentElement.style.setProperty('--color-accent', "#a855f7")
        localStorage.setItem('primary', "#6366f1")
        localStorage.setItem('secondary', "#8b5cf6" )
        localStorage.setItem('accent', "#a855f7" )


        colorButtons.forEach(function (colorBtn) {
            colorBtn.classList.remove('active-color')
        })
        document.getElementById('reset-settings').classList.add('active-color')
});


//  navTab section
filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
        filterButtons.forEach((btn) => {
            btn.classList.remove(
                "active",
                "bg-linear-to-r",
                "from-primary",
                "to-secondary",
                "hover:shadow-lg",
                "hover:shadow-primary/50",
            );
        });

        this.classList.add(
            "active",
            "bg-linear-to-r",
            "from-primary",
            "to-secondary",
            "hover:shadow-lg",
            "hover:shadow-primary/50",
        );
    });
});

allButton.addEventListener("click", () => {
    [appCategory, designCategory, ecommerceCategory, webCategory].forEach(
        (category) => {
            category.forEach((item) => {
                item.classList.remove("hidden");

                setTimeout(() => {
                    item.classList.remove("opacity-0", "scale-95");
                }, 500);
            });
        },
    );
});

webButton.addEventListener("click", function () {
    [appCategory, designCategory, ecommerceCategory].forEach((category) => {
        category.forEach((item) => {
            item.classList.add("opacity-0", "scale-95");

            setTimeout(() => {
                item.classList.add("hidden");
            }, 400);
        });
    });

    webCategory.forEach((item) => {
        item.classList.remove("hidden");

        setTimeout(() => {
            item.classList.remove("opacity-0", "scale-95");
        }, 500);
    });
});

appButton.addEventListener("click", function () {
    [webCategory, designCategory, ecommerceCategory].forEach((category) => {
        category.forEach((item) => {
            item.classList.add("opacity-0", "scale-95");

            setTimeout(() => {
                item.classList.add("hidden");
            }, 400);
        });
    });

    appCategory.forEach((item) => {
        item.classList.remove("hidden");

        setTimeout(() => {
            item.classList.remove("opacity-0", "scale-95");
        }, 500);
    });
});

designButton.addEventListener("click", function () {
    [appCategory, webCategory, ecommerceCategory].forEach((category) => {
        category.forEach((item) => {
            item.classList.add("opacity-0", "scale-95");

            setTimeout(() => {
                item.classList.add("hidden");
            }, 400);
        });
    });

    designCategory.forEach((item) => {
        item.classList.remove("hidden");

        setTimeout(() => {
            item.classList.remove("opacity-0", "scale-95");
        }, 500);
    });
});

ecommerceButton.addEventListener("click", function () {
    [appCategory, webCategory, designCategory].forEach((category) => {
        category.forEach((item) => {
            item.classList.add("opacity-0", "scale-95");

            setTimeout(() => {
                item.classList.add("hidden");
            }, 400);
        });
    });

    ecommerceCategory.forEach((item) => {
        item.classList.remove("hidden");

        setTimeout(() => {
            item.classList.remove("opacity-0", "scale-95");
        }, 500);
    });
});



// slider

// next Slide
nextBtn.addEventListener('click', function () {

    let visibleCard = getVisibleCard();
    let maxIndex = cards.length - visibleCard;

    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    slideCards();
});

// prev Slide
prevBtn.addEventListener('click', function () {

    let visibleCard = getVisibleCard();
    let maxIndex = cards.length - visibleCard;

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex;
    }

    slideCards();
});

// indicators
indicators.forEach(function (btn) {
    btn.addEventListener('click', function () {
        currentIndex = btn.dataset.index;   // dataset => hat elqema el mawgoda f attribute mo3ayn
        slideCards();
        indicators.forEach(function (indicator) {
            indicator.classList.remove('bg-accent')
        })
        btn.classList.add('bg-accent');
    })
})
//------------------------Functions--------------------------//

function getVisibleCard() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

function slideCards() {
    cards[currentIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'start'
    });
}




