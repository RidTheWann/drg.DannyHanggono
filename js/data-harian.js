// Atur tanggal default ke hari ini untuk input kalender
document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("tanggal-kunjungan");

  // Cek apakah sudah ada tanggal yang tersimpan di localStorage
  let savedDate = localStorage.getItem("tanggalKunjungan");
  if (!savedDate) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    savedDate = `${yyyy}-${mm}-${dd}`;
    localStorage.setItem("tanggalKunjungan", savedDate);
  }

  // Set nilai input dengan tanggal yang sudah tersimpan
  dateInput.value = savedDate;

  // Update localStorage ketika nilai input berubah
  dateInput.addEventListener("change", function () {
    localStorage.setItem("tanggalKunjungan", this.value);
  });
});

// Fungsi untuk menampilkan pesan status dengan overlay blur dan spinner jika loading
function showMessage(text, statusClass) {
  const messageEl = document.getElementById("message");
  const overlay = document.getElementById("blur-overlay");

  // Tampilkan overlay blur
  overlay.style.display = 'block';

  // Jika status loading, tampilkan teks status terlebih dahulu, kemudian spinner di bawahnya
  if (statusClass === "loading") {
    messageEl.innerHTML = text + '<br><div class="ios-spinner"></div>';
  } else {
    messageEl.textContent = text;
  }
  messageEl.className = `status-message ${statusClass} show`;

  // Sembunyikan pesan dan overlay setelah 3 detik
  setTimeout(() => {
    messageEl.classList.remove("show");
    setTimeout(() => {
      messageEl.className = "status-message";
      messageEl.innerHTML = "";
      overlay.style.display = 'none';
    }, 300);
  }, 3000);
}


// Submit form dengan AJAX menggunakan Fetch API
document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const submitBtn = document.getElementById("submit-button");

  // Ubah tampilan tombol submit: hanya spinner saja tanpa teks
  submitBtn.innerHTML = '<div class="ios-spinner"></div>';
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";

  const formData = new FormData(this);
  const formObject = {};
  formData.forEach((value, key) => { formObject[key] = value; });

  // Tampilkan pesan status loading (dengan spinner)
  showMessage("Mengirim data", "loading");

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyleypCzMFhUpmPt0_htQXF85iY1mkeogLdARuEkGysZFkqCn1zgJDnrZYTNu_vr0Vt/exec",
      {
        method: "POST",
        body: new URLSearchParams(formObject),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    );
    const data = await response.json();
    if (data.result === "success") {
      showMessage("Data berhasil dikirim!", "success");
      this.reset();
      // Restore nilai input tanggal dari localStorage setelah reset form
      document.getElementById("tanggal-kunjungan").value = localStorage.getItem("tanggalKunjungan");
    } else {
      throw new Error(data.message || "Gagal mengirim data.");
    }
  } catch (error) {
    console.error(error);
    showMessage("Terjadi kesalahan saat mengirim data!", "error");
  } finally {
    setTimeout(() => {
      submitBtn.innerHTML = "Kirim data";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }, 3000);
  }
});

// Tombol Batal: kembali ke halaman sebelumnya
document.getElementById("cancel-button").addEventListener("click", function () {
  window.history.back();
});

// Jika ada tombol "Kembali" lain, tambahkan event listener
const backButton = document.getElementById("back-button");
if (backButton) {
  backButton.addEventListener("click", function () {
    window.history.back();
  });
}
