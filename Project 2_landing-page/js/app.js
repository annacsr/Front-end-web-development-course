/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section');
let list = document.getElementById('navbar__list');
let timer = -1;
const hamburger = document.querySelector('.hamburger');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Help check whether an element is in the viewport
function isInViewport(elem) {
    const box = elem.getBoundingClientRect();
     return box.top >= 0 && box.left >= 0 && 
            box.right <= (window.innerWidth || document.documentElement.clientWidth) && 
            (box.bottom - 150) <= (window.innerHeight || document.documentElement.clientHeight);
}

// Help check if the user is in mobile view
function isInMobileView (){
    if(window.innerWidth <= 768) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function createNav() {
    for (let i = 1; i <= sections.length; i++) {
        let item = document.createElement('li');
        item.classList.add(`section${i}`);
        item.classList.add('nav-item');
        item.innerHTML = `<a href="#section${i}" class="nav-link">Section ${i}</a>`;
        list.appendChild(item);
    }
}

// creat the back to top button
let btn = document.createElement('button');
btn.innerHTML = 'TOP';
btn.setAttribute('id', 'btn');
document.body.appendChild(btn);
btn.style.display = 'none';

// Add class 'active' to section when near top of viewport
function changeToActive() {
    for(const section of sections) {
        if(isInViewport(section)) {
            section.classList.add('your-active-class');
            document.querySelector(`.${section.id}`).classList.add('active');
            // Apply active state on the current section and the corresponding Nav link.
        } else {
            section.classList.remove('your-active-class');
            document.querySelector(`.${section.id}`).classList.remove('active');
            // Remove active state from other section and corresponding Nav link.
        }
    }
}

// Scroll to anchor ID on link click
function scrollToSections(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    const destination = document.querySelector(target);
    destination.scrollIntoView({
        behavior: "smooth"
    });
    if(isInMobileView) {
        hamburger.classList.remove("active");
        list.classList.remove("active");
    }
}

// Show fixed navigation when scrolling
function Scrolling() {
    list.style.display = 'flex';
    if(timer !== -1) {
        clearTimeout(timer);
    } 
    if (!isInMobileView()) {
        timer = setTimeout(scrollStopped, 3000);
    }
}

// Hide fixed navigation when not scrolling
function scrollStopped() {
    list.style.display = 'none';
}


// show the back to top button when the user scrolls below the fold of the page
function showTopButton() {
    if(document.body.scrollTop >= 1000) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }

}
// go back to the top of the page
function backToTop() {
    document.body.scrollTop = 0;
}

// show mobile nav 
function mobileMenu() {
    hamburger.classList.toggle("active");
    list.classList.toggle("active");
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', createNav);
// Scroll to section on link click
document.querySelector('#navbar__list').addEventListener('click', scrollToSections);
// Set sections as active
document.addEventListener('scroll', changeToActive);

// Show fixed navigation bar while scrolling and hide while not scrolling 
document.addEventListener('scroll', Scrolling);

// Show back to top button when scrolling below the fold of the page
document.addEventListener('scroll', showTopButton)
// Goes back to top when clicking the 'top' button
document.getElementById('btn').addEventListener('click', backToTop);
// Toggle between active state of the hamburger menu when in mobile view
hamburger.addEventListener("click", mobileMenu);
