// Set iframe src saat load (misalnya untuk menampilkan map.html)
window.addEventListener('load', function () {
  document.getElementById('previewFrame');
})

// Event listener untuk tombol kembali
document.getElementById('backButton').addEventListener('click', function() {
  window.history.back();
});
