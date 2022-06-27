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
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


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
        item.innerHTML = `<a href="#section${i}">Section ${i}</a>`;
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
        let box = section.getBoundingClientRect();
        if(box.top <= 150 && box.bottom >= 150) {
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
    destination.scrollIntoView();
}

// Show fixed navigation when scrolling
function Scrolling() {
    document.getElementById('navbar__list').style.display = 'flex';
    if(timer !== -1) {
        clearTimeout(timer);
    }
    timer = setTimeout(scrollStopped, 2000);
}

// Hide fixed navigation when not scrolling
function scrollStopped() {
    document.getElementById('navbar__list').style.display = 'none';
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


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', function() {createNav();});
// Scroll to section on link click
document.querySelector('#navbar__list').addEventListener('click', function(event) {scrollToSections();});
// Set sections as active
document.addEventListener('scroll', function(){changeToActive();});

// Show fixed navigation bar while scrolling and hide while not scrolling 
document.addEventListener('scroll', Scrolling);

// Show back to top button when scrolling below the fold of the page
document.addEventListener('scroll', showTopButton)
// Goes back to top when clicking the 'top' button
document.getElementById('btn').addEventListener('click', backToTop);