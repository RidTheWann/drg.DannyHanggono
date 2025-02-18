'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Toggle visibilitas password
  const togglePassword = document.getElementById('togglePassword');
  if (togglePassword) {
    togglePassword.addEventListener('click', () => {
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        togglePassword.innerHTML = isPassword
          ? '<i class="fas fa-eye-slash"></i>'
          : '<i class="fas fa-eye"></i>';
      }
    });
  }

  // Handling submit form dengan validasi kredensial
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const errorMessage = document.getElementById('errorMessage');
      if (errorMessage) errorMessage.textContent = "";

      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
      if (usernameInput && passwordInput) {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Validasi: pastikan kedua field tidak kosong
        if (!username || !password) {
          if (errorMessage) errorMessage.textContent = "Username dan Password harus diisi!";
          loginForm.classList.add('shake');
          setTimeout(() => {
            loginForm.classList.remove('shake');
          }, 500);
          return;
        }

        // Simulasi validasi kredensial (ganti dengan autentikasi sesungguhnya)
        const validUsername = "user";
        const validPassword = "user";

        if (username === validUsername && password === validPassword) {
          // Jika kredensial benar, redirect ke halaman Home
          window.location.href = "pages/Home.html";
        } else {
          // Jika kredensial salah, tampilkan pesan error dan animasi shake
          if (errorMessage) errorMessage.textContent = "Username atau Password salah!";
          loginForm.classList.add('shake');
          setTimeout(() => {
            loginForm.classList.remove('shake');
          }, 500);
        }
      }
    });
  }
});