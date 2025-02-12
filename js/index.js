// SVG Icon untuk toggle password
const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="2" viewBox="0 0 24 24">
  <path stroke="currentColor" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
  <circle cx="12" cy="12" r="3" stroke="currentColor"/>
</svg>`;
const eyeSlashIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="2" viewBox="0 0 24 24">
  <path stroke="currentColor" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
  <circle cx="12" cy="12" r="3" stroke="currentColor"/>
  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor"/>
</svg>`;

const togglePasswordBtn = document.getElementById('togglePassword');
togglePasswordBtn.innerHTML = eyeIcon;

// Toggle tampil/sembunyi password
togglePasswordBtn.addEventListener('click', function () {
  const passwordInput = document.getElementById('password');
  const currentType = passwordInput.getAttribute('type');
  if (currentType === 'password') {
    passwordInput.setAttribute('type', 'text');
    this.innerHTML = eyeSlashIcon;
  } else {
    passwordInput.setAttribute('type', 'password');
    this.innerHTML = eyeIcon;
  }
});

// Efek Ripple pada tombol Login
const btnLogin = document.querySelector('.btn-login');
btnLogin.addEventListener('click', function (e) {
  const rect = this.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.max(this.clientWidth, this.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');
  this.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
});

// Data akun yang didukung
const accounts = [
  { username: "user", password: "user", redirect: "pages/Home.html" },
  { username: "user2", password: "pass2", redirect: "pages/Home.html" },
  { username: "admin", password: "admin123", redirect: "pages/Home.html" }
];

// Validasi akun saat submit form
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const inputUsername = document.getElementById('username').value.trim();
  const inputPassword = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMessage');
  const account = accounts.find(acc => acc.username === inputUsername && acc.password === inputPassword);

  if (account) {
    btnLogin.textContent = 'Logging in...';
    btnLogin.style.background = 'var(--primary-dark)';
    errorMsg.style.display = 'none';
    setTimeout(() => window.location.href = account.redirect, 500);
  } else {
    errorMsg.textContent = "Username atau Password salah!";
    errorMsg.style.display = "block";
    setTimeout(() => errorMsg.style.display = "none", 3000);
  }
});
