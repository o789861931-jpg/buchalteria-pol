# Buchalteria Polska — strona firmowa

Statyczna strona internetowa biura rachunkowego Buchalteria Polska Sp. z o.o.
Jednoplikowa aplikacja (`index.html`) — HTML, CSS i JavaScript w jednym pliku,
bez etapu budowania (build step) i bez zależności serwerowych.

## Struktura projektu

```
.
├── index.html            # Cała strona: markup, style, logika, tłumaczenia PL/RU
├── favicon.svg            # Ikona strony (wektorowa)
├── apple-touch-icon.png   # Ikona dla iOS / Add to Home Screen (180×180)
├── icon-192.png           # Ikona PWA / manifest (192×192)
├── icon-512.png           # Ikona PWA / manifest (512×512)
├── site.webmanifest       # Web App Manifest (Add to Home Screen)
├── og-image.png           # Obraz Open Graph / Twitter Card (1200×630)
├── robots.txt             # Dyrektywy dla robotów wyszukiwarek
├── sitemap.xml            # Mapa strony dla wyszukiwarek
└── README.md              # Ten plik
```

## Języki

Strona ma przełącznik językowy PL / RU (przycisk w nawigacji). Wszystkie
teksty znajdują się w dwóch słownikach JavaScript wewnątrz `index.html`
(obiekt `T = { pl: {...}, ru: {...} }`) i są podmieniane dynamicznie
przez atrybuty `data-i18n`.

## Formularz kontaktowy

Formularz na stronie `/konsultacja` wysyła zgłoszenia przez zewnętrzny,
bezpłatny serwis [Web3Forms](https://web3forms.com) (`access_key` w kodzie
JS jest kluczem publicznym tego serwisu — nie jest to sekret i nie wymaga
przechowywania w zmiennych środowiskowych). Powiadomienia trafiają na adres
e-mail skonfigurowany w panelu Web3Forms.

## Wdrożenie (Deployment)

Strona jest w pełni statyczna — wystarczy wgrać zawartość tego folderu
na dowolny hosting statyczny.

**GitHub Pages:**
1. Wypchnij zawartość repozytorium do gałęzi `main` (lub `gh-pages`).
2. W ustawieniach repozytorium: *Settings → Pages → Source* → wybierz gałąź.
3. Strona będzie dostępna pod `https://<user>.github.io/<repo>/`.

**Vercel:**
1. Zaimportuj repozytorium w panelu Vercel.
2. Framework Preset: **Other** (brak build stepu — Vercel po prostu
   serwuje pliki statyczne).
3. Output directory: pozostaw puste / `.` (katalog główny).

Przy wdrożeniu pod własną domeną (np. `buchalteria-polska.pl`) upewnij się,
że adresy w `sitemap.xml`, `robots.txt` oraz meta-tagach Open Graph
(`og:url`, `og:image`, `canonical`) w `index.html` odpowiadają rzeczywistej
domenie produkcyjnej.

## SEO

- `robots.txt` i `sitemap.xml` są gotowe do indeksowania.
- Zaimplementowano dane strukturalne Schema.org (`AccountingService`).
- Meta Open Graph i Twitter Card są skonfigurowane wraz z obrazem
  podglądu (`og-image.png`, 1200×630).

Po każdej istotnej zmianie treści (np. zmiana danych firmowych, liczby lat
doświadczenia itp.) zaktualizuj również `<lastmod>` w `sitemap.xml`.

## Wymagania przeglądarki

Strona korzysta wyłącznie ze standardowych API webowych (CSS Grid/Flexbox,
`IntersectionObserver`, `fetch`) — działa we wszystkich nowoczesnych
przeglądarkach (Chrome, Firefox, Safari, Edge, najnowsze dwie wersje).
