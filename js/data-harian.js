// Atur tanggal default ke hari ini untuk input kalender
document.addEventListener('DOMContentLoaded', function () {
    const tanggalInput = document.getElementById('tanggal-kunjungan');
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedToday = `${yyyy}-${mm}-${dd}`;
    tanggalInput.value = formattedToday;
  });
  
  // Submit form dengan AJAX menggunakan Fetch API
  document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const messageEl = document.getElementById("message");
    const submitBtn = document.getElementById("submit-button");
    messageEl.textContent = "Mengirim data...";
    messageEl.className = "status-message loading";
    messageEl.style.display = "block";
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => { formObject[key] = value; });
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
        messageEl.textContent = "✅ Data berhasil dikirim!";
        messageEl.className = "status-message success";
        this.reset();
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Berhasil!';
        submitBtn.style.backgroundColor = "green";
      } else {
        throw new Error(data.message || "Gagal mengirim data.");
      }
    } catch (error) {
      console.error(error);
      messageEl.textContent = "❌ Terjadi kesalahan saat mengirim data!";
      messageEl.className = "status-message error";
    } finally {
      setTimeout(() => {
        messageEl.style.animation = "fadeOut 1s ease forwards";
        setTimeout(() => {
          messageEl.style.display = "none";
          messageEl.style.animation = "";
        }, 1000);
        submitBtn.innerHTML = "Kirim data";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.backgroundColor = "";
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
  