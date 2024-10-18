let titles = {};

// JSON dosyasından başlıkları yükleme
fetch('docs/note_titles.json')
    .then(response => response.json())
    .then(data => {
        titles = data;  // Başlıkları sakla
    })
    .catch(error => console.error('Başlıklar yüklenemedi:', error));

// Menü açma/kapatma fonksiyonu
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');  // 'open' sınıfı eklenip çıkarılarak aç/kapa işlevi yapılır
}

// Ana sayfa yükleme fonksiyonu
function loadHomePage() {
    document.getElementById('mainContent').innerHTML = `
        <h2>Hoş Geldiniz</h2>
        <p>Sol üstteki menüyü kullanarak notlar arasında geçiş yapabilirsiniz.</p>
    `;
    document.getElementById('notBaslik').innerText = 'Ana Ekran';  // Başlık Ana Ekran olarak değiştirildi
}

// Markdown dosyasını yükleme ve başlıkları JSON'dan gösterme
function loadMarkdownFile(file) {
    fetch(`docs/${file}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Dosya yüklenemedi: ${response.statusText}`);
            }
            return response.text();
        })
        .then(markdownText => {
            const htmlContent = marked.parse(markdownText); // Marked.js ile markdown'ı HTML'e çeviriyoruz
            document.getElementById('mainContent').innerHTML = htmlContent;

            // JSON dosyasından başlığı al
            const notBaslik = titles[file] ? titles[file] : file;
            document.getElementById('notBaslik').innerText = notBaslik;  // Başlığı göster
            toggleMenu();  // Menü kapanır
        })
        .catch(error => {
            console.error('Markdown dosyası yüklenirken bir hata oluştu:', error);
            document.getElementById('mainContent').innerHTML = `<p style="color: red;">Bir hata oluştu: ${error.message}</p>`;
        });
}
