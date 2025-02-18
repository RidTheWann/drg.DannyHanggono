document.addEventListener("DOMContentLoaded", () => {
  // Toggle menu mobile dengan update aria-expanded
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");

  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
    const isExpanded = mobileMenuToggle.classList.contains("active");
    mobileMenuToggle.setAttribute("aria-expanded", isExpanded);
  });

  // Fungsi animasi ketik
  const typeText = (element, text, delay, callback) => {
    let index = 0;
    element.textContent = "";
    const timer = setInterval(() => {
      element.textContent += text[index];
      index++;
      if (index === text.length) {
        clearInterval(timer);
        if (callback) callback();
      }
    }, delay);
  };

  const welcomeSection = document.getElementById("welcomeSection");
  const h1Element = welcomeSection.querySelector("h1");
  const pElement = welcomeSection.querySelector("p");
  const cardsContainer = document.getElementById("cardsContainer");

  const h1Text = "Selamat Datang";
  const pText = "Login sukses";

  if (sessionStorage.getItem("welcomeShown")) {
    welcomeSection.style.display = "none";
    cardsContainer.classList.add("show");
  } else {
    typeText(h1Element, h1Text, 50, () => {
      typeText(pElement, pText, 40, () => {
        setTimeout(() => {
          welcomeSection.style.opacity = "0";
          setTimeout(() => {
            welcomeSection.style.display = "none";
            cardsContainer.classList.add("show");
            sessionStorage.setItem("welcomeShown", "true");
          }, 500);
        }, 500);
      });
    });
  }

  // Hapus flag welcome saat logout
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("welcomeShown");
  });

  // Animasi footer khusus untuk mobile
  if (window.innerWidth <= 768) {
    const footer = document.querySelector("footer");
    let footerFixed = true;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 10 && footerFixed) {
        footer.style.transition = "opacity 0.5s, margin-top 0.5s";
        footer.style.opacity = "0";
        setTimeout(() => {
          footer.style.transition = "none";
          footer.style.position = "static";
          footer.style.marginTop = "-20px";
          footer.style.opacity = "1";
          footerFixed = false;
        }, 500);
      } else if (window.scrollY <= 10 && !footerFixed) {
        footer.style.transition = "opacity 0.5s";
        footer.style.position = "fixed";
        footer.style.bottom = "0";
        footer.style.left = "0";
        footer.style.marginTop = "0";
        footer.style.opacity = "1";
        footerFixed = true;
      }
    });
  }
});