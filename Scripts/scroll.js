
const btn = document.getElementById("backToTop");

// Show button when scrolling down
window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Scroll to top smoothly
btn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};