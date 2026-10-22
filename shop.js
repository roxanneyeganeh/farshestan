let products = [];
let selectedColorValue = 'all';
let selectedPriceValue = '9000';

const NUM_PRODUCTS = 49;

const productPrices = [
  2900, 7400, 6100, 3200, 4500, 8800, 5100, 3900, 2750, 6800,
  4200, 3600, 5400, 3100, 7300, 4900, 6050, 8300, 2750, 3500,
  7100, 4700, 5600, 2950, 6300, 3850, 5800, 4950, 3400, 7700,
  6200, 6650, 4150, 7250, 2900, 3150, 8450, 5350, 4550, 6950,
  3850, 5750, 6950, 4300, 5200, 7850, 6150, 4950, 6800
];

const productNames = [
  "Tabriz Rug, Floral Medallion",
  "Nain Rug, Classic Pattern",
  "Isfahan Rug, Garden Motif",
  "Kashan Rug, Herati Design",
  "Qom Rug, Silk Medallion",
  "Mashhad Rug, Geometric",
  "Kerman Rug, Rose Medallion",
  "Heriz Rug, Bold Medallion",
  "Bidjar Rug, Dense Knot",
  "Bakhtiari Rug, Tribal Pattern",
  "Sarouk Rug, Classic Floral",
  "Malayer Rug, Field Motif",
  "Yazd Rug, Geometric Medallion",
  "Afshar Rug, Tribal Weave",
  "Luri Rug, Nomadic Pattern",
  "Hamadan Rug, Floral Lattice",
  "Moud Rug, Sapphire Medallion",
  "Baluch Rug, Desert Motif",
  "Qashqai Rug, Tribal Design",
  "Kurdistan Rug, Natural Palette",
  "Ardabil Rug, Heritage Medallion",
  "Shiraz Rug, Ember Floral",
  "Zanjan Rug, Rustic Pattern",
  "Bijar Rug, Guard Design",
  "Ghom Rug, Golden Medallion",
  "Senneh Rug, Garden Pattern",
  "Kalat Rug, Silk Motif",
  "Khoy Rug, Border Detail",
  "Varamin Rug, Night Design",
  "Tafresh Rug, Sun Medallion",
  "Fars Rug, Nomadic Pattern",
  "Jozan Rug, Midnight Floral",
  "Kashmar Rug, Glory Design",
  "Tuiserkan Rug, Dust Pattern",
  "Dorokhsh Rug, Petal Motif",
  "Saveh Rug, Moonlight Medallion",
  "Ferahan Rug, Gold Pattern",
  "Nahavand Rug, Storm Design",
  "Tonekabon Rug, Cloud Motif",
  "Ravar Rug, Silk Detail",
  "Sultanabad Rug, Bloom Design",
  "Behbahan Rug, Starlit Pattern",
  "Khorasan Rug, Velvet Motif",
  "Chahar Mahal Rug, Radiance Pattern",
  "Maragheh Rug, Crimson Detail",
  "Neiriz Rug, Desert Motif",
  "Delijan Rug, Night Bloom",
  "Langarud Rug, Fire Motif",
  "Gonbad Rug, Horizon Medallion",
  "Abadeh Rug, Coral Design"
];


const productDescriptions = [
  "Hand-knotted in Tabriz, this luxurious rug features an intricate central medallion, detailed floral motifs, and silk highlights that shimmer beautifully. Expertly crafted by master weavers, it embodies the pinnacle of Persian artistry and timeless elegance.",
  "Woven in Nain with a high knot count, this refined rug displays graceful floral motifs on a soft ivory field accented with delicate blues and golds. Its meticulous craftsmanship and regal palette make it a statement of sophistication.",
  "Silk threads bring to life the garden-inspired patterns of Isfahan, with cascading vines, blossoms, and delicate arabesques. The luminous silk pile adds depth and brilliance, creating a majestic centerpiece for formal interiors.",
  "An heirloom-quality Kashan rug rich in historical motifs and fine detail. Crafted with time-honored techniques and vibrant natural dyes, it exudes warmth, sophistication, and enduring charm.",
  "This Qom silk rug showcases delicate floral vines and a radiant sheen, representing the highest precision in Persian weaving. A masterpiece for collectors who seek exceptional beauty and artistry.",
  "With deep burgundy and navy tones, this Mashhad rug features a plush wool pile and classic floral symmetry. Its bold yet harmonious design brings grandeur to elegant interiors.",
  "Centered around a rose medallion, this Kerman rug blends romance and Persian tradition. Hand-knotted with exquisite precision, it infuses any space with timeless artistry.",
  "Renowned for bold geometry and enduring strength, this Heriz rug features vibrant reds and blues in a dynamic pattern—an expression of heritage and craftsmanship.",
  "Bidjar rugs, known as the 'Iron Rugs of Persia,' are exceptionally dense and durable. This piece combines tribal patterns with refined detail, ideal for elegant yet high-traffic spaces.",
  "A majestic Bakhtiari rug featuring stylized garden panels that symbolize paradise. Its symmetry, vibrant colors, and plush texture create a luxurious focal point.",
  "This Sarouk rug showcases classic floral sprays, a velvety pile, and subtle tonal variations that enhance its timeless elegance—perfect for refined interiors.",
  "Rustic and warm, this Malayer rug reflects the charm of Iranian mountain villages. Its earthy palette and organic motifs evoke comfort and authenticity.",
  "Traditional motifs and pastel accents harmonize in this finely knotted Yazd rug. Enriched with silk highlights, it offers delicate elegance for sophisticated spaces.",
  "This rare Afshar rug features geometric medallions and earthy tones, handwoven by nomadic artisans. Its authentic craftsmanship and natural dyes make it a true collector’s piece.",
  "Soft lines and muted colors define this Luri rug, inspired by nomadic life on the Iranian plateau. Its understated elegance and subtle tribal motifs bring warmth and character.",
  "Woven in Hamadan, this rug draws inspiration from lush river valleys. Gentle floral motifs and rich natural dyes create a serene and welcoming atmosphere.",
  "A Moud rug with a sapphire field and flowing garden-of-Eden motifs, hand-knotted with refined detail. Its soft wool and intricate design embody timeless Persian artistry.",
  "Woven by the Baluch tribes, this rug combines deep reds, natural wool, and traditional tribal motifs. Its organic textures and rich hues celebrate nomadic craftsmanship.",
  "Vibrant and lively, this Qashqai rug features playful medallions and bold color combinations. Hand-knotted in traditional style, it radiates energy and cultural charm.",
  "A Kurdish creation with opal-inspired hues, spun from natural wool and balanced with symmetrical knotting. It offers subtle sophistication and cultural depth.",
  "Inspired by the famed Ardabil shrine rugs, this piece brings sacred geometry and spiritual design into contemporary homes—where history meets luxury.",
  "This Shiraz rug features earthy tones and tribal vine patterns, a testament to skilled craftsmanship and Persian heritage. Its rich pile and detailed borders create visual harmony.",
  "Zanjan rugs are bold and expressive. This piece showcases strong medallions and tribal details, ideal for eclectic interiors that value heritage and artistry.",
  "Dense and resilient, this Bijar rug pairs noble patterns with meticulous detail. Its firm knotting ensures lasting beauty and refined comfort.",
  "Woven from Qom silk, this rug glows with golden arabesques and a luminous pile. Designed for collectors who value purity of form and unmatched craftsmanship.",
  "Graceful and balanced, this Senneh rug features delicate motifs and refined knotting that reflect timeless Persian elegance.",
  "A Kalat rug with a mirage-like glow, crafted from fine silk threads over a deep navy field. Its soft texture and subtle highlights bring understated luxury.",
  "Khoy rugs blend floral and geometric motifs in a style that balances tradition with modern decorative appeal. Hand-knotted for enduring sophistication.",
  "This Varamin rug tells a story through warm reds and intricate star motifs. Its rich palette and symbolic design elevate any interior.",
  "A radiant Tafresh rug featuring luminous medallions and hand-spun wool. Natural dyes enhance its brilliance, making it a vibrant centerpiece.",
  "This Fars tribal rug captures ancient migration routes through abstract medallions and an organic palette. Each knot reflects heritage and authenticity.",
  "From Jozan, this midnight-toned rug is adorned with delicate floral sprays and timeless borders, creating a sophisticated and elegant presence.",
  "An opulent Kashmar rug full of symbolic detail and grandeur, perfect for those who appreciate historic artistry and luxurious design.",
  "This Tuiserkan wool rug features soft, washed colors and minimalist patterns that bring quiet elegance to both modern and classic interiors.",
  "A Dorokhsh rug with jewel-tone petals and rare Eastern Iranian weaving—crafted for connoisseurs of exceptional Persian artistry.",
  "This Saveh rug features a bold, rhythmic design that blends mystery with refinement. Hand-knotted for durability and timeless appeal.",
  "An elegant Ferahan rug with soft cream borders and graceful vinework, echoing aristocratic Persian style in harmonious color and form.",
  "With bold central fields and geometric borders, this Nahavand rug reflects tribal spirit and striking visual identity, ideal for refined interiors.",
  "Tones of blue and grey swirl through this Tonekabon rug, inspired by dramatic Persian skies. Its intricate design brings calm sophistication.",
  "A Ravar carpet woven entirely from silk, renowned for its embroidery-like detail and luxurious finish—an exquisite piece for collectors.",
  "This Sultanabad rug continues a storied legacy with floral designs and refined weaving. Its rich colors and plush pile elevate any space.",
  "Celestial motifs shine in this Behbahan rug, where warm star medallions shimmer within a radiant field. Its intricate design makes it truly luminous.",
  "Crafted from fine Khorasan wool, this rug features intricate detailing and a balanced border that exudes subtle luxury.",
  "A vivid Chahar Mahal rug bursting with rich reds and floral lattice patterns—celebrating the height of Persian artistry and vibrancy.",
  "The Maragheh tradition comes alive in this deep crimson rug with layered medallions and a bold tribal character. Its intricate motifs reflect expert craftsmanship.",
  "Sandy tones and minimalist symbols evoke desert serenity in this elegant Neiriz tribal rug, perfect for both modern and classic spaces.",
  "This Delijan rug merges traditional patterns with a modern palette, creating a look that is regal, fresh, and enduring.",
  "Langarud craftsmanship shines in this ornate piece, where floral forms dance in a tapestry-like composition—vivid and full of life.",
  "This Gonbad rug features a balanced medallion and precise Persian geometry. Its luxurious texture and intricate borders radiate timeless sophistication.",
  "A coral-toned Abadeh rug with harmonious tribal and garden patterns. Hand-knotted with expert care, it beautifully blends color, form, and tradition."
];



const productMaterials = [
  "Silk & Wool – Soft, lustrous pile with natural sheen. Vacuum gently; professional cleaning recommended.",
  "Wool & Cotton – Durable with soft hand feel. Vacuum with care; professional cleaning advised.",
  "Pure Silk – Luxuriously smooth and radiant. Handle gently; professional silk cleaning only.",
  "Wool – Dense, resilient pile. Vacuum regularly; professional cleaning recommended.",
  "Silk – Soft, shimmering surface. Gentle vacuuming; professional cleaning recommended.",
  "Silk & Wool – Plush texture with subtle sheen. Vacuum carefully; professional care advised.",
  "Wool – Soft, durable fibers. Gentle vacuum; professional cleaning recommended.",
  "Wool – Resilient, dense weave. Vacuum regularly; professional care advised.",
  "Wool – Durable with a soft hand feel. Vacuum carefully; professional cleaning suggested.",
  "Wool – Dense and sturdy pile. Vacuum regularly; professional cleaning recommended.",
  "Wool – Soft yet tough fibers. Vacuum gently; professional cleaning advised.",
  "Wool – Plush, durable texture. Gentle vacuuming; occasional professional cleaning.",
  "Silk Blend – Smooth, delicate fibers with subtle sheen. Gentle vacuum; professional cleaning only.",
  "Wool – Dense, resilient pile. Vacuum carefully; professional care recommended.",
  "Wool – Soft, long-lasting fibers. Vacuum gently; professional cleaning advised.",
  "Wool – Plush and durable texture. Gentle vacuum; professional cleaning recommended.",
  "Wool & Cotton – Strong yet soft fibers. Vacuum carefully; professional cleaning advised.",
  "Wool – Dense, robust pile. Gentle vacuuming; professional care recommended.",
  "Wool – Soft, durable texture. Vacuum carefully; professional cleaning advised.",
  "Wool – Resilient, plush fibers. Gentle vacuum; professional cleaning recommended.",
  "Silk & Wool – Smooth, lustrous pile. Vacuum gently; professional care advised.",
  "Wool – Dense, strong texture. Vacuum regularly; professional cleaning recommended.",
  "Wool – Soft yet durable fibers. Vacuum gently; professional care advised.",
  "Wool – Plush, resilient pile. Gentle vacuum; professional cleaning recommended.",
  "Wool – Durable, dense weave. Vacuum regularly; professional care advised.",
  "Silk – Luxurious, luminous fibers. Gentle vacuuming; professional cleaning recommended.",
  "Wool – Soft, strong texture. Vacuum carefully; professional cleaning advised.",
  "Silk – Smooth, radiant surface. Gentle vacuum; professional cleaning recommended.",
  "Wool – Plush, resilient fibers. Vacuum gently; professional care advised.",
  "Wool – Soft, durable pile. Gentle vacuum; professional cleaning recommended.",
  "Wool – Dense, long-lasting texture. Vacuum regularly; professional care advised.",
  "Wool – Strong, plush fibers. Vacuum gently; professional cleaning recommended.",
  "Wool – Resilient, soft texture. Gentle vacuum; professional care advised.",
  "Wool – Dense, durable weave. Vacuum regularly; professional cleaning recommended.",
  "Wool – Plush, robust fibers. Vacuum carefully; professional care advised.",
  "Wool – Soft, resilient texture. Gentle vacuum; professional cleaning recommended.",
  "Wool – Dense, strong pile. Vacuum regularly; professional care advised.",
  "Wool – Plush, long-lasting fibers. Gentle vacuum; professional cleaning recommended.",
  "Silk – Smooth, luminous surface. Gentle vacuuming; professional cleaning recommended.",
  "Wool – Soft, resilient fibers. Vacuum carefully; professional care advised.",
  "Wool – Dense, durable texture. Vacuum regularly; professional cleaning recommended.",
  "Wool – Plush, strong pile. Vacuum gently; professional cleaning advised.",
  "Wool – Resilient, soft fibers. Gentle vacuum; professional care recommended.",
  "Wool – Dense, long-lasting texture. Vacuum regularly; professional cleaning recommended.",
  "Wool – Plush, robust fibers. Vacuum carefully; professional cleaning advised.",
  "Wool – Soft, resilient pile. Gentle vacuum; professional care recommended.",
  "Wool – Dense, durable fibers. Vacuum regularly; professional cleaning advised.",
  "Wool – Plush, strong texture. Gentle vacuum; professional cleaning recommended.",
  "Wool – Resilient, soft fibers. Vacuum carefully; professional care advised.",
  "Wool – Dense, long-lasting pile. Vacuum regularly; professional cleaning recommended."
]




/* =========================================================
   SETUP (runs after every product image has loaded)
========================================================= */

function functionSetup() {
  // menu.js already builds the menu on DOMContentLoaded; only build it here if it's missing.
  if (!document.getElementById('menuBar') && typeof createMenuBar === 'function') {
    createMenuBar();
  }

  setupColourDropdown();
  setupPriceDropdown();
}


/* =========================================================
   DROPDOWN HELPERS
========================================================= */

function closeDropdowns(except) {
  document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
    if (w !== except) w.classList.remove('open');
  });
}

document.addEventListener('click', e => {
  document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
    if (!w.contains(e.target)) w.classList.remove('open');
  });
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeDropdowns();
  closeModal();
});


/* =========================================================
   COLOUR FILTER (multi-select)
========================================================= */

function setupColourDropdown() {
  const wrapper =
    document.querySelector('.colour-select-wrapper') ||
    document.querySelector('.custom-select-wrapper');

  const trigger = wrapper.querySelector('.custom-select');
  const options = wrapper.querySelectorAll('.color-option');
  const allOption = wrapper.querySelector('.color-option[data-value="all"]');
  const selectedText = wrapper.querySelector('.selected-text');
  const selectedSwatch = wrapper.querySelector('.selected .color-swatch');
  const countLabel = wrapper.querySelector('#selected-count');
  const resetButton = wrapper.querySelector('.reset-button');

  allOption.classList.add('selected');

  trigger.addEventListener('click', () => {
    closeDropdowns(wrapper);
    wrapper.classList.toggle('open');
  });

  wrapper.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === wrapper) {
      e.preventDefault();
      trigger.click();
    }
  });

  options.forEach(option => {
    option.addEventListener('click', e => {
      e.stopPropagation();

      if (option === allOption) {
        options.forEach(o => o.classList.remove('selected'));
      } else {
        option.classList.toggle('selected');
      }

      const anyColour = wrapper.querySelector('.color-option.selected:not([data-value="all"])');
      allOption.classList.toggle('selected', !anyColour);

      refreshLabel();
      applyFilters();
    });
  });

  resetButton.addEventListener('click', e => {
    e.stopPropagation();
    options.forEach(o => o.classList.remove('selected'));
    allOption.classList.add('selected');
    refreshLabel();
    applyFilters();
  });

  function refreshLabel() {
    const chosen = Array.from(
      wrapper.querySelectorAll('.color-option.selected:not([data-value="all"])')
    );

    countLabel.textContent = `${chosen.length} selected`;

    if (chosen.length === 1) {
      selectedText.textContent = chosen[0].textContent.trim();
      selectedSwatch.className = 'color-swatch';
      selectedSwatch.style.background = chosen[0].querySelector('.color-swatch').style.background;
    } else {
      selectedText.textContent = chosen.length ? `Colour · ${chosen.length}` : 'Colour';
      selectedSwatch.className = 'color-swatch swatch-all';
      selectedSwatch.style.background = '';
    }
  }

  refreshLabel();
}


/* =========================================================
   PRICE FILTER
========================================================= */

const PRICE_MIN = 0;
const PRICE_MAX = 9000;

const gbp = n => '£' + Number(n).toLocaleString('en-GB');

function setupPriceDropdown() {
  const wrapper = document.querySelector('.price-select-wrapper');
  const trigger = wrapper.querySelector('.custom-select');
  const selectedText = wrapper.querySelector('.selected-text');
  const resetButton = wrapper.querySelector('.reset-button');
  const minRange = document.getElementById('minRange');
  const maxRange = document.getElementById('maxRange');
  const label = document.getElementById('priceRangeLabel');
  const track = wrapper.querySelector('.slider-track');

  trigger.addEventListener('click', () => {
    closeDropdowns(wrapper);
    wrapper.classList.toggle('open');
  });

  wrapper.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === wrapper) {
      e.preventDefault();
      trigger.click();
    }
  });

  function update() {
    let min = parseInt(minRange.value, 10);
    let max = parseInt(maxRange.value, 10);

    if (min > max) {
      [min, max] = [max, min];
      minRange.value = min;
      maxRange.value = max;
    }

    label.textContent = `${gbp(min)} – ${gbp(max)}`;

    const isDefault = min === PRICE_MIN && max === PRICE_MAX;
    selectedText.textContent = isDefault ? 'Price' : `${gbp(min)} – ${gbp(max)}`;

    const span = PRICE_MAX - PRICE_MIN;
    const a = ((min - PRICE_MIN) / span) * 100;
    const b = ((max - PRICE_MIN) / span) * 100;
    track.style.background =
      `linear-gradient(to right, #d8cfc3 ${a}%, #000 ${a}%, #000 ${b}%, #d8cfc3 ${b}%)`;

    applyFilters();
  }

  resetButton.addEventListener('click', e => {
    e.stopPropagation();
    minRange.value = PRICE_MIN;
    maxRange.value = PRICE_MAX;
    update();
  });

  minRange.addEventListener('input', update);
  maxRange.addEventListener('input', update);

  update();
}


/* =========================================================
   LOAD PRODUCTS (p5)
========================================================= */

function setup() {
  noCanvas();
  let loadedCount = 0;

  const done = () => {
    loadedCount++;
    if (loadedCount === NUM_PRODUCTS) {
      // Images finish loading in random order — put them back in catalogue order.
      products.sort((a, b) => a.id - b.id);
      renderGrid(products);
      functionSetup();
    }
  };

  for (let i = 1; i <= NUM_PRODUCTS; i++) {
    // Shown on the site: the rug with its white background removed
    const imgPath = `assets/rugs/rug-${i}.webp`;
    // Used for the colour filter: the original photo (file names start with a space),
    // so the colour groups stay exactly as they were
    const photoPath = `assets/ ${i}.jpg`;

    loadImage(photoPath, img => {
      img.loadPixels();

      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      for (let x = 0; x < img.width; x += 10) {
        for (let y = 0; y < img.height; y += 10) {
          const c = img.get(x, y);
          rSum += c[0]; gSum += c[1]; bSum += c[2];
          count++;
        }
      }

      const avgColor = [rSum / count, gSum / count, bSum / count];

      products.push({
        id: i,
        price: productPrices[i - 1],
        imgPath,
        color: avgColor,
        dominantColor: getDominantColorName(avgColor),
        name: productNames[i - 1],
        description: productDescriptions[i - 1],
        material: productMaterials[i - 1]
      });

      done();
    }, err => {
      console.error(`Failed to load image: ${photoPath}`, err);
      done();
    });
  }
}

function getDominantColorName(rgb) {
  const [r, g, b] = rgb;
  const isClose = (a, b, tolerance) => Math.abs(a - b) < tolerance;

  if (r > 100 && r > g + 30 && r > b + 30) return 'red';
  if (g > 100 && g > r + 30 && g > b + 30) return 'green';
  if (b >= 80 && b >= r - 30 && b >= g - 20) return 'blue';
  if (r >= 90 && g >= 90 && b <= 150 && Math.abs(r - g) <= 110) return 'yellow';
  if (isClose(r, g, 50) && isClose(g, b, 50) && r >= 20 && r <= 235) return 'gray';

  const maxChannel = Math.max(r, g, b);
  if (maxChannel === r) return 'red';
  if (maxChannel === g) return 'green';
  if (maxChannel === b) return 'blue';
  return 'gray';
}


/* =========================================================
   GRID
========================================================= */

function renderGrid(items) {
  const container = document.getElementById('image-grid');
  container.innerHTML = '';

  const counter = document.getElementById('result-count');
  if (counter) {
    counter.textContent = `${items.length} ${items.length === 1 ? 'rug' : 'rugs'}`;
  }

  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'grid-message';
    empty.innerHTML = `
      <h2>No rugs match these filters</h2>
      <p>Try a different colour or widen the price range.</p>
      <button class="cta-button" type="button">Clear filters</button>
    `;
    empty.querySelector('button').addEventListener('click', () => {
      document.querySelectorAll('#filter-controls .reset-button').forEach(b => b.click());
    });
    container.appendChild(empty);
    return;
  }

  items.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'image-item';
    card.tabIndex = 0;

    const frame = document.createElement('div');
    frame.className = 'image-frame';

    const img = document.createElement('img');
    img.src = item.imgPath;
    img.alt = item.name;
    img.loading = 'lazy';
    frame.appendChild(img);

    // "Tabriz Rug, Floral Medallion" -> town above, design below
    const title = document.createElement('p');
    title.className = 'caption-title';
    const comma = item.name.indexOf(',');
    const town = document.createElement('span');
    town.className = 't-town';
    town.textContent = comma > -1 ? item.name.slice(0, comma) : item.name;
    title.append(town);
    if (comma > -1) {
      const design = document.createElement('span');
      design.className = 't-design';
      design.textContent = item.name.slice(comma + 1).trim();
      title.append(design);
    }

    const price = document.createElement('p');
    price.className = 'caption-subtitle';
    price.textContent = gbp(item.price);

    const caption = document.createElement('div');
    caption.className = 'image-caption';
    caption.append(title, price);

    card.append(frame, caption);

    card.addEventListener('click', () => openModal(item));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(item);
      }
    });

    container.appendChild(card);
  });
}

function applyFilters() {
  const selectedColors = Array.from(
    document.querySelectorAll('.color-option.selected')
  ).map(el => el.dataset.value);

  const minPrice = parseInt(document.getElementById('minRange').value, 10);
  const maxPrice = parseInt(document.getElementById('maxRange').value, 10);

  let filtered = products;

  if (selectedColors.length > 0 && !selectedColors.includes('all')) {
    filtered = filtered.filter(p => selectedColors.includes(p.dominantColor));
  }

  filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

  renderGrid(filtered);
}


/* =========================================================
   PRODUCT MODAL
========================================================= */

let lastFocused = null;

function openModal(item) {
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-image');
  const modalContent = modal.querySelector('.modal-content');

  // Show the grid image straight away, then swap in the large one
  // (used for the popup and the zoom) as soon as it has loaded.
  modalImg.src = item.imgPath;
  modalImg.alt = item.name;
  const largePath = item.imgPath.replace('assets/rugs/', 'assets/rugs/large/');
  const large = new Image();
  large.onload = () => {
    if (modalImg.src.endsWith(item.imgPath)) modalImg.src = largePath;
  };
  large.src = largePath;

  const old = modalContent.querySelector('.modal-text');
  if (old) old.remove();

  const modalText = document.createElement('div');
  modalText.className = 'modal-text';

  modalText.innerHTML = `
    <p class="modal-origin fa" lang="fa" title="Handwoven in Iran">دست‌بافت ایران</p>
    <h2 class="modal-title"></h2>
    <p class="modal-price"></p>

    <div class="collapsible-section">
      <button class="collapsible-btn expanded" type="button" aria-expanded="true">
        Description <span class="arrow"></span>
      </button>
      <div class="collapsible-content">
        <p class="modal-description-text"></p>
      </div>
    </div>

    <div class="collapsible-section">
      <button class="collapsible-btn" type="button" aria-expanded="false">
        Material and care <span class="arrow"></span>
      </button>
      <div class="collapsible-content" hidden>
        <p class="modal-material"></p>
      </div>
    </div>

    <button class="add-to-cart" type="button">Add to Cart</button>
  `;

  modalText.querySelector('.modal-title').textContent = item.name;
  modalText.querySelector('.modal-price').textContent = gbp(item.price);
  modalText.querySelector('.modal-description-text').textContent = item.description;
  modalText.querySelector('.modal-material').textContent = item.material;

  modalText.querySelectorAll('.collapsible-btn').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const open = content.hidden;
      content.hidden = !open;
      button.classList.toggle('expanded', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });

  const addButton = modalText.querySelector('.add-to-cart');
  let resetTimer;

  addButton.addEventListener('click', () => {
    if (typeof addToCart === 'function') {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        imgPath: item.imgPath
      });
    }

    addButton.textContent = 'Added to Cart';
    addButton.classList.add('added');
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      addButton.textContent = 'Add to Cart';
      addButton.classList.remove('added');
    }, 1800);
  });

  modalContent.appendChild(modalText);
  modalContent.scrollTop = 0;

  lastFocused = document.activeElement;
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  modal.querySelector('.close-button').focus({ preventScroll: true });
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (!modal || modal.classList.contains('hidden')) return;

  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  modal.querySelector('.close-button').addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
});


/* =========================================================
   ZOOM LOUPE (product popup)
   A magnifying circle follows the cursor (or finger) over the rug.
========================================================= */

const LOUPE_ZOOM = 2.4;
const LOUPE_SIZE = 190;

function setupLoupe() {
  const media = document.querySelector('.modal-media');
  if (!media) return;
  const img = document.getElementById('modal-image');
  const lens = media.querySelector('.loupe-lens');
  const hint = media.querySelector('.loupe-hint');

  if (!window.matchMedia('(hover: hover)').matches) {
    hint.textContent = 'Touch the rug to look closer';
  }

  function move(e) {
    if (!img.naturalWidth) return;
    // the visible picture inside the padded, object-fit: contain image box
    const box = img.getBoundingClientRect();
    const cs = getComputedStyle(img);
    const padL = parseFloat(cs.paddingLeft), padR = parseFloat(cs.paddingRight);
    const padT = parseFloat(cs.paddingTop), padB = parseFloat(cs.paddingBottom);
    const innerW = box.width - padL - padR, innerH = box.height - padT - padB;
    const ratio = img.naturalWidth / img.naturalHeight;
    let w = innerW, h = innerW / ratio;
    if (h > innerH) { h = innerH; w = h * ratio; }
    const left = box.left + padL + (innerW - w) / 2;
    const top = box.top + padT + (innerH - h) / 2;
    const x = e.clientX - left, y = e.clientY - top;

    if (x < 0 || y < 0 || x > w || y > h) { lens.classList.remove('on'); return; }

    const m = media.getBoundingClientRect();
    lens.style.left = `${e.clientX - m.left}px`;
    lens.style.top = `${e.clientY - m.top}px`;
    lens.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
    lens.style.backgroundSize = `${w * LOUPE_ZOOM}px ${h * LOUPE_ZOOM}px`;
    lens.style.backgroundPosition = `${-(x * LOUPE_ZOOM - LOUPE_SIZE / 2)}px ${-(y * LOUPE_ZOOM - LOUPE_SIZE / 2)}px`;
    lens.classList.add('on');
  }

  img.addEventListener('pointermove', move);
  img.addEventListener('pointerdown', move);
  img.addEventListener('pointerleave', () => lens.classList.remove('on'));
  img.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') lens.classList.remove('on'); });
}

document.addEventListener('DOMContentLoaded', setupLoupe);
