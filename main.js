// loader-----------------------------------------------------
// window.onload = () => {
//   const loader = document.getElementById("loader");
//   function unlockScroll() {
//     document.body.style.overflow = "auto";
//   }
//   setTimeout(() => {
//     loader.style.display = "none";
//     unlockScroll();
//   }, 1000);
// };
// document.body.style.overflow = "hidden";

function load() {
  const loader = document.getElementById("loader");
  function unlockScroll() {
    document.body.style.overflow = "auto";
  }
  setTimeout(() => {
    loader.style.display = "none";
    unlockScroll();
  }, 500);
};
document.body.style.overflow = "hidden";
load();


// navbar when scroll>10--------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navItems = document.querySelectorAll(".nav-item");
  const navImg = document.querySelector(".nav-img img");

  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 10) {
      navbar.style.height = "70px";
      navbar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      navItems.forEach((navItem) => {
        navItem.style.padding = "10px";
      });
      navImg.style.width = "30%";
      navImg.style.height = "30%";
      navItems.forEach((navItem) => {
        const navItemA = navItem.querySelector("a");
        if (navItemA) {
          navItemA.style.fontSize = "1rem";
        }
      });
    } else {
      navbar.style.height = "115px";
      navbar.style.boxShadow = "none";
      navItems.forEach((navItem) => {
        navItem.style.padding = "20px";
      });
      navImg.style.width = "40%";
      navImg.style.height = "40%";
      navItems.forEach((navItem) => {
        const navItemA = navItem.querySelector("a");
        if (navItemA) {
          navItemA.style.fontSize = "1.1rem";
        }
      });
    }
  }

  function checkScreenWidth() {
    const minWidth = 769;
    if (window.innerWidth >= minWidth) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
  }
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});


// navbar drop down-------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const pasteButton = document.querySelector(".paste-button");
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownContentchat = document.querySelector(".dropdown-content-chat");

  function countryDropdown() {
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  }

  function chatDropdown() {
    if (dropdownContentchat.style.display === "block") {
      dropdownContentchat.style.display = "none";
    } else {
      dropdownContentchat.style.display = "block";
    }
  }

  function hideDropdown(event) {
    if (
      !dropdownContent.contains(event.target) &&
      !pasteButton.contains(event.target) &&
      !dropdownContentchat.contains(event.target)
    ) {
      dropdownContent.style.display = "none";
      dropdownContentchat.style.display = "none";
    }
  }

  function handleScroll() {
    if (window.innerWidth > 768) {
      if (window.scrollY < 10) {
        dropdownContent.style.top = "100px";
        dropdownContentchat.style.top = "100px";
        dropdownContentchat.style.right = "60px";
      } else {
        dropdownContent.style.top = "70px";
        dropdownContentchat.style.top = "70px";
        dropdownContentchat.style.right = "100px";
      }
    }
  }

  pasteButton.addEventListener("click", countryDropdown);
  document.addEventListener("click", hideDropdown);
  window.addEventListener("scroll", handleScroll);
});


// menu------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("checkbox");
  const navbar = document.getElementById("navbar");

  hamburger.addEventListener("click", function () {
    navbar.classList.toggle("active");
  });
});


//back to top------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(".button");
  var wbutton = document.querySelector(".w-button");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      button.style.display = "flex";
      wbutton.style.bottom = "90px";
    } else {
      button.style.display = "none";
      wbutton.style.bottom = "20px";
    }
  });
  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});


// splide slider----------------------------------
document.addEventListener("DOMContentLoaded", function () {
  var perPageCount = window.innerWidth >= 480 ? 4 : 1;
  var splides = document.querySelectorAll(".splide");

  splides.forEach(function (splideElement) {
    var splide = new Splide(splideElement, {
      type: "loop",
      drag: "free",
      focus: "center",
      perPage: perPageCount,
      autoScroll: {
        pauseOnHover: false,
        speed: 1,
      },
      arrows: false,
      pagination: false,
    });

    splide.mount({ AutoScroll: window.splide.Extensions.AutoScroll });
  });
});


// counting numbers js --------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".number");

  const resetCounters = () => {
    counters.forEach((counter) => {
      counter.innerText = "0";
    });
  };

  const animateCounters = () => {
    counters.forEach((counter) => {
      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / 200; // Change this value to control speed

        if (count < target) {
          counter.innerText = `${Math.ceil(count + increment)}`;
          setTimeout(updateCounter, 10); // Change this value to control speed
        } else {
          counter.innerText = `${target}+`;
        }
      };

      updateCounter();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        resetCounters();
        animateCounters();
      }
    });
  });

  observer.observe(document.querySelector("#stats-section"));
});


// validation of the form-----------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Reset previous error messages
    const errorFields = document.querySelectorAll(".error");
    errorFields.forEach(function (error) {
      error.textContent = "";
    });

    // Submission rate limiting
    const lastSubmission = localStorage.getItem('lastSubmission');
    if (lastSubmission && (Date.now() - lastSubmission < 120000)) { // 2 minutes
      alert('You have submitted the form recently. Please wait a moment before submitting again.');
      return;
    }

    let isValid = true;

    // Name validation
    const nameField = document.getElementById("name");
    const nameValue = nameField.value.trim();
    if (nameValue === "") {
      document.getElementById("name-error").textContent = "Please enter your name";
      isValid = false;
    } else if (nameValue.length < 2 || nameValue.length > 50) {
      document.getElementById("name-error").textContent = "Name must be between 2 and 50 characters";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
      document.getElementById("name-error").textContent = "Name can only contain letters and spaces";
      isValid = false;
    } else if (/(.)\1{2,}/.test(nameValue)) {
      document.getElementById("name-error").textContent = "Name contains gibberish patterns";
      isValid = false;
    }

    // Mobile number validation
    const mobileField = document.getElementById("mobile");
    const mobileValue = mobileField.value.trim();
    if (mobileValue === "") {
      document.getElementById("mobile-error").textContent = "Please enter your mobile number";
      isValid = false;
    } else if (!/^[+\d()\s-]{10,15}$/.test(mobileValue)) {
      document.getElementById("mobile-error").textContent = "Please enter a valid mobile number (10-15 digits)";
      isValid = false;
    }

    // Email validation
    const emailField = document.getElementById("email");
    const emailValue = emailField.value.trim();
    const disposableDomains = ["mailinator.com", "temp-mail.org", "10minutemail.com"];
    if (emailValue === "") {
      document.getElementById("email-error").textContent = "Please enter your email address";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue)) {
      document.getElementById("email-error").textContent = "Please enter a valid email address";
      isValid = false;
    } else {
      const domain = emailValue.split('@')[1];
      if (disposableDomains.includes(domain)) {
        document.getElementById("email-error").textContent = "Disposable email addresses are not allowed";
        isValid = false;
      }
    }

    // Passport number validation
    const passportField = document.getElementById("passport");
    const passportValue = passportField.value.trim();
    if (passportValue !== "" && !/^[a-zA-Z0-9]{6,12}$/.test(passportValue)) {
      document.getElementById("passport-error").textContent = "Passport number must be 6-12 alphanumeric characters";
      isValid = false;
    }

    // Level of study validation
    const levelField = document.getElementById("level");
    if (levelField.value === "") {
      document.getElementById("level-error").textContent = "Please select your level of study";
      isValid = false;
    }

    // Country to study validation
    const countryField = document.getElementById("country-to-study");
    if (countryField.value === "") {
      document.getElementById("country-error").textContent = "Please select a country you prefer";
      isValid = false;
    }

    // If form is valid, get reCAPTCHA token and submit
    if (isValid) {
      grecaptcha.ready(function() {
        grecaptcha.execute('6LeotPUrAAAAAN4PNirt60gm49LwuF0K2Fo6_kfx', {action: 'submit'}).then(function(token) {
          document.getElementById('recaptchaResponse').value = token;
          localStorage.setItem('lastSubmission', Date.now());
          form.submit();
        });
      });
    }
  });
});


// show more button------------------------------------------------------------------------
function toggleList(button) {
  const card = button.closest(".university-card");
  const extras = card.querySelectorAll(".university-card-bottom .extra");

  extras.forEach((item) => {
    if (item.style.display === "none" || item.style.display === "") {
      item.style.display = "list-item";
      button.textContent = "See Less";
    } else {
      item.style.display = "none";
      button.textContent = "See More";
    }
  });
}

function toggleListol(button) {
  const bottomDiv = button.previousElementSibling;
  const extraLists = bottomDiv.querySelectorAll(".extra-list");
  const extras = bottomDiv.querySelectorAll(".extra");
  const buttonText = button.innerText;

  extraLists.forEach((extraList) => {
    if (extraList.style.display === "none") {
      extraList.style.display = "block";
      extras.forEach((extra) => {
        extra.style.display = "list-item";
      });
      button.innerText = "See Less";
    } else {
      extraList.style.display = "none";
      extras.forEach((extra) => {
        extra.style.display = "none";
      });
      button.innerText = "See More";
    }
  });
}


// review carousel------------------------------------------------------------------------
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

// Function to show two testimonials at the same time
function showTestimonials(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.remove('active');
  });

  // Calculate indices of two active testimonials
  testimonialCards[index].classList.add('active');
  let nextIndex = (index + 1) % testimonialCards.length;
  testimonialCards[nextIndex].classList.add('active');
}

// Show the next two testimonials
document.getElementById('next').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 2) % testimonialCards.length;
  showTestimonials(currentTestimonial);
});

// Show the previous two testimonials
document.getElementById('prev').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 2 + testimonialCards.length) % testimonialCards.length;
  showTestimonials(currentTestimonial);
});

// Automatically switch testimonials every 5 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 2) % testimonialCards.length;
  showTestimonials(currentTestimonial);
}, 5000);

// Initialize by showing the first two testimonials
showTestimonials(currentTestimonial);






// German page selectors --------------------------------------------------------------------------------------
function change(num){
  var asu=document.getElementById('asu');
  var fsj=document.getElementById('fsj');
  var aup=document.getElementById('aup');
  var asu_select=document.getElementById('asu-select');
  var fsj_select=document.getElementById('fsj-select');
  var aup_select=document.getElementById('aup-select');

  if(num==1){
    asu.style.display='flex';
    fsj.style.display='none';
    aup.style.display='none';
    asu_select.classList.add('select-active');
    fsj_select.classList.remove('select-active');
    aup_select.classList.remove('select-active');
  }else if(num==2){
    fsj.style.display='flex';
    asu.style.display='none';
    aup.style.display='none';
    fsj_select.classList.add('select-active');
    asu_select.classList.remove('select-active');
    aup_select.classList.remove('select-active');
  }else if(num==3){
    aup.style.display='flex';
    asu.style.display='none';
    fsj.style.display='none';
    aup_select.classList.add('select-active');
    fsj_select.classList.remove('select-active');
    asu_select.classList.remove('select-active');
  }
}