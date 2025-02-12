(function() {
  document.addEventListener("DOMContentLoaded", function() {
    // Toggle mobile menu
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const navMenu = document.getElementById("navMenu");
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });

    // Fungsi animasi ketikan (typing effect)
    function typeText(element, text, delay, callback) {
      let index = 0;
      element.textContent = "";
      function type() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, delay);
        } else if (callback) {
          callback();
        }
      }
      type();
    }

    // Animasi welcome section dengan pengecekan localStorage
    const welcomeSection = document.getElementById("welcomeSection");
    const h1Element = welcomeSection.querySelector("h1");
    const pElement = welcomeSection.querySelector("p");
    const h1Text = "Selamat Datang";
    const pText = "Login sukses";
    const cardsContainer = document.getElementById("cardsContainer");

    // Ganti pengecekan localStorage dengan sessionStorage
if (sessionStorage.getItem("welcomeShown")) {
welcomeSection.style.display = "none";
cardsContainer.classList.add("show");
} else {
typeText(h1Element, h1Text, 50, function() {
  typeText(pElement, pText, 40, function() {
    setTimeout(function() {
      welcomeSection.style.opacity = "0";
      setTimeout(function() {
        welcomeSection.style.display = "none";
        cardsContainer.classList.add("show");
        // Set flag di sessionStorage
        sessionStorage.setItem("welcomeShown", "true");
      }, 500);
    }, 500);
  });
});
}

// Saat logout, pastikan flag dihapus
logoutBtn.addEventListener("click", function() {
sessionStorage.removeItem("welcomeShown");
});

  });
})();
