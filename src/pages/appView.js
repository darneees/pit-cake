//  open and close menu
document.addEventListener("DOMContentLoaded", function () {
    const open = document.getElementById("openMenu");
    const menu = document.querySelector(".menu");

    open.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});

// close menu when clicking outside
document.addEventListener("click", function (e) {
    const open = document.getElementById("openMenu");
    const menu = document.querySelector(".menu");

    if (e.target !== open && !open.contains(e.target) && e.target !== menu && !menu.contains(e.target)) {
        menu.classList.remove("active");
    }
});