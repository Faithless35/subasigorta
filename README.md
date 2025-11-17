# Suba Sigorta Web Sitesi - Production Build

## 📦 İçerik

Bu klasör, Suba Sigorta web sitesinin production-ready versiyonunu içerir.

### Dosya Yapısı

```
dist/
├── index.html                      # Ana sayfa
├── kasko-trafik.html              # Kasko & Trafik detay sayfası
├── yabanci-saglik.html            # Yabancı Sağlık detay sayfası
├── konut-dask.html                # Konut & DASK detay sayfası
├── tamamlayici-saglik.html        # Tamamlayıcı Sağlık detay sayfası
├── seyahat-egitim.html            # Seyahat & Eğitim detay sayfası
├── bireysel-emeklilik.html        # Bireysel Emeklilik detay sayfası
└── assets/
    ├── css/
    │   └── style.css              # Ana stil dosyası
    ├── js/
    │   └── main.js                # Ana JavaScript dosyası
    └── images/
        ├── logosuba.png           # Şirket logosu
        ├── hero.png               # Hero section arka plan
        ├── logo.svg               # SVG logo (yedek)
        └── favicon.svg            # Favicon
```

## 🚀 Deployment

### 1. Web Sunucusuna Yükleme

Tüm dosyaları web sunucunuzun root dizinine yükleyin:

```bash
# FTP/SFTP ile
- dist/ klasöründeki tüm dosyaları sunucuya yükleyin
- Dosya yapısını koruyun

# cPanel File Manager ile
- dist/ içeriğini public_html/ klasörüne yükleyin
```

### 2. Gereksinimler

- **Web Sunucu**: Apache, Nginx, IIS veya herhangi bir static hosting
- **PHP**: Gerekli değil (static HTML)
- **SSL**: HTTPS için SSL sertifikası önerilir
- **Tarayıcı Desteği**: 
  - Chrome (son 2 versiyon)
  - Firefox (son 2 versiyon)
  - Safari (son 2 versiyon)
  - Edge (son 2 versiyon)

### 3. Önerilen Sunucu Ayarları

#### Apache (.htaccess)
```apache
# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

#### Nginx
```nginx
# Gzip compression
gzip on;
gzip_types text/css application/javascript image/svg+xml;

# Browser caching
location ~* \.(png|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(css|js)$ {
    expires 1M;
    add_header Cache-Control "public";
}
```

## 🔧 Özelleştirme

### İletişim Bilgilerini Güncelleme

Tüm HTML dosyalarında aşağıdaki bilgileri güncelleyin:

- **Telefon**: `+90-232-278-9828`
- **Mobil 1**: `+90-530-771-2996` (Umut Timisi)
- **Mobil 2**: `+90-542-475-4493` (Eren Barış Timisi)
- **E-posta**: `umut.timisi@subasigorta.com`, `btimisi@subasigorta.com`
- **Adres**: Onur Mah. Mithatpaşa Cad. 63-65, Tan Apt. No:1, Balçova/İZMİR

### Logo Değiştirme

`assets/images/logosuba.png` dosyasını kendi logonuzla değiştirin.

### Renk Teması Değiştirme

`assets/css/style.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --primary-blue: #0000FF;
    --dark-blue: #000080;
    --light-blue: #4169E1;
    /* ... */
}
```

## 📱 Responsive Tasarım

Site tüm cihazlarda responsive olarak çalışır:

- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: > 992px

## 🔒 Güvenlik

- Tüm formlar client-side validation içerir
- XSS koruması için input sanitization uygulanmıştır
- HTTPS kullanımı önerilir

## 📊 Analytics Entegrasyonu

Google Analytics eklemek için tüm HTML dosyalarının `</head>` etiketinden önce:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Sorun Giderme

### Görseller Görünmüyor
- Dosya yollarını kontrol edin
- Sunucuda dosya izinlerini kontrol edin (644 veya 755)

### CSS/JS Yüklenmiyor
- Tarayıcı cache'ini temizleyin
- Dosya yollarının doğru olduğundan emin olun

### Form Çalışmıyor
- JavaScript'in aktif olduğundan emin olun
- Tarayıcı console'unda hata kontrolü yapın

## 📞 Destek

Teknik destek için:
- **E-posta**: umut.timisi@subasigorta.com
- **Telefon**: +90-232-278-9828

## 📝 Versiyon

- **Versiyon**: 1.0.0
- **Tarih**: 17 Kasım 2024
- **Durum**: Production Ready ✅

## ✅ Checklist

Deployment öncesi kontrol listesi:

- [ ] Tüm iletişim bilgileri güncellendi
- [ ] Logo dosyası yüklendi
- [ ] Tüm sayfalar test edildi
- [ ] Responsive tasarım kontrol edildi
- [ ] Form validasyonu test edildi
- [ ] SSL sertifikası kuruldu
- [ ] Analytics kodu eklendi
- [ ] Sitemap.xml oluşturuldu
- [ ] robots.txt oluşturuldu
- [ ] Favicon görünüyor

---

**© 2024 Suba Sigorta Aracılık Hizmetleri Ltd. Şti.**
