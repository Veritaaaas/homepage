const titles = ["Computer Science Student", "Aspiring Software Engineer"];
let index = 0;
let subIndex = 0;
let currentTitle = "";
let isBackspacing = false;

const titleElement = document.querySelector('.job-title');

const type = () => {
    const typingSpeed = 5000 / (titles[index].length * 2 + 20); // Adjust this value
    const backspacingSpeed = typingSpeed;

    if (isBackspacing && subIndex > 0) {
        subIndex--;
        currentTitle = currentTitle.substring(0, subIndex);
    } else if (!isBackspacing && subIndex < titles[index].length) {
        currentTitle += titles[index].charAt(subIndex);
        subIndex++;
    }

    titleElement.textContent = currentTitle;

    if (!isBackspacing && subIndex === titles[index].length) {
        setTimeout(() => isBackspacing = true, 20 * typingSpeed); // Adjust this value
    } else if (isBackspacing && subIndex === 0) {
        isBackspacing = false;
        index = index < titles.length - 1 ? index + 1 : 0;
    }

    setTimeout(type, isBackspacing ? backspacingSpeed : typingSpeed);
};

// Select all sections and nav links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav button');

// Function to activate the nav link
const activateNavLink = (id) => {
    // Remove 'active' class from all nav links
    navLinks.forEach(link => link.classList.remove('active'));

    // Find the nav link that matches the section id and add 'active' class
    const navLink = document.querySelector(`nav button[data-id=${id}]`);
    if (navLink) {
        navLink.classList.add('active');
    }
};

// Create an Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Get the id of the section that is in view
            const id = entry.target.getAttribute('id');
            // Activate the corresponding nav link
            activateNavLink(id);
        }
    });
}, { threshold: 0.5, rootMargin: '-50px 0px -50px 0px' }); // Adjust the threshold value as needed

// Use the observer to watch each section
sections.forEach((section) => observer.observe(section));

// Initially activate the first nav link
activateNavLink(sections[0].getAttribute('id'));
  

type();