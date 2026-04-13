const logo = document.querySelector('.header-menu-logo');

function atualizarLogo() {
    if (window.innerWidth < 1000) {
        logo.innerHTML = '<a href="index.html">NJ</a>';
    } else {
        logo.innerHTML = '<a href="index.html">Nicoly Jang</a>';
    }
}

atualizarLogo();
window.addEventListener('resize', atualizarLogo);