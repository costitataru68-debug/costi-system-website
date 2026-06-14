/* ====================================================
   COSTI SYSTEM - Logică Globală
   ==================================================== */

// ====================================================
// CONFIGURARE - Date contact firmă
// ====================================================
const COMPANY = {
    email: 'office.costisystem@yahoo.com',
    phone1: '0758 271 007',
    phone2: '0756 824 792'
};

// ====================================================
// BANNER COOKIE-URI (consimțământ GDPR + Google Consent Mode)
// ====================================================
function initCookieBanner() {
    const KEY = 'costi-cookie-consent';
    const stored = localStorage.getItem(KEY);

    function applyConsent(state) {
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': state === 'granted' ? 'granted' : 'denied'
            });
        }
    }

    // Dacă utilizatorul a ales deja, aplică alegerea și nu mai afișa bannerul
    if (stored === 'granted' || stored === 'denied') {
        applyConsent(stored);
        return;
    }

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Consimțământ cookie-uri');
    banner.innerHTML =
        '<div class="cookie-banner-inner">' +
            '<p class="cookie-banner-text">' +
                'Folosim cookie-uri pentru funcționarea site-ului și pentru statistici anonime de trafic (Google Analytics). ' +
                'Poți accepta sau refuza cookie-urile analitice. Detalii în ' +
                '<a href="politica-cookies.html">Politica de Cookies</a>.' +
            '</p>' +
            '<div class="cookie-banner-actions">' +
                '<button type="button" class="cookie-btn cookie-btn-reject" data-cookie="denied">Refuz</button>' +
                '<button type="button" class="cookie-btn cookie-btn-accept" data-cookie="granted">Accept</button>' +
            '</div>' +
        '</div>';
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('show'));

    banner.querySelectorAll('[data-cookie]').forEach(btn => {
        btn.addEventListener('click', () => {
            const choice = btn.getAttribute('data-cookie');
            localStorage.setItem(KEY, choice);
            applyConsent(choice);
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        });
    });
}

// ====================================================
// MENIU MOBIL - Toggle hamburger
// ====================================================
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Închide meniul mobile când se dă click pe orice link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// ====================================================
// SIDEBAR NAVIGATOR "Produse" (2 coloane categorii/subcategorii)
// ====================================================
// Profil-familii reutilizabile (FERESTRE și BALCOANE folosesc același set)
const PVC_PROFILE_GROUPS = (page) => ([
    {
        title: 'SALAMANDER',
        items: [
            { label: 'Salamander proEvolution 72', href: `${page}#salamander-pro72` },
            { label: 'Salamander GreenEvolution 76', href: `${page}#salamander-green76` },
            { label: 'Salamander BluEvolution 82', href: `${page}#salamander-blu82` },
            { label: 'Salamander BluEvolution 92', href: `${page}#salamander-blu92` }
        ]
    },
    {
        title: 'RAMPLAST',
        items: [
            { label: 'Solid 400 (4 camere, 60mm)', href: `${page}#ramplast-400` },
            { label: 'Solid 500 (5 camere, 60mm)', href: `${page}#ramplast-500` },
            { label: 'Solid 700 (6 camere, 70mm)', href: `${page}#ramplast-700` },
            { label: 'Solid 800 (6 camere, 76mm)', href: `${page}#ramplast-800` }
        ]
    },
    {
        title: 'SIG PLAST',
        items: [
            { label: 'Sigplast 60mm (4 camere)', href: `${page}#sigplast-60` },
            { label: 'Sigplast 70mm (6 camere)', href: `${page}#sigplast-70` }
        ]
    }
]);

const PRODUCT_CATEGORIES = [
    {
        key: 'ferestre-pvc',
        label: 'FERESTRE PVC',
        href: 'ferestre-pvc.html',
        groups: PVC_PROFILE_GROUPS('ferestre-pvc.html')
    },
    {
        key: 'balcoane-pvc',
        label: 'BALCOANE PVC',
        href: 'balcoane-pvc.html',
        groups: PVC_PROFILE_GROUPS('balcoane-pvc.html')
    },
    {
        key: 'usi-pvc',
        label: 'UȘI PVC',
        href: 'usi-pvc.html',
        groups: PVC_PROFILE_GROUPS('usi-pvc.html')
    },
    {
        key: 'culisante-aluminiu',
        label: 'CULISANTE DIN ALUMINIU',
        href: 'culisante-aluminiu.html',
        groups: [
            {
                items: [
                    { label: 'Culisante cu sticlă simplă', href: 'culisante-aluminiu.html#sticla-simpla' },
                    { label: 'Culisante cu sticlă termopan', href: 'culisante-aluminiu.html#sticla-termopan' }
                ]
            }
        ]
    },
    {
        key: 'plase-insecte',
        label: 'PLASE INSECTE',
        href: 'plase-insecte.html',
        groups: [
            {
                items: [
                    { label: 'Plase insecte cu balamă și ramă metalică', href: 'plase-insecte.html#balama' },
                    { label: 'Plase insecte tip rulou', href: 'plase-insecte.html#rulou' },
                    { label: 'Plase insecte plisee', href: 'plase-insecte.html#plisee' }
                ]
            }
        ]
    },
    {
        key: 'rulouri-exterioare',
        label: 'RULOURI EXTERIOARE ALUMINIU ȘI SISTEME DE UMBRIRE',
        href: 'rulouri-exterioare.html',
        groups: [
            {
                items: [
                    { label: 'Rulouri aluminiu acționare manuală — lamele 39mm', href: 'rulouri-exterioare.html#manuale' },
                    { label: 'Rulouri acționare motorizată prin telecomandă — lamele 39mm', href: 'rulouri-exterioare.html#motorizate' },
                    { label: 'Jaluzele verticale (toate culorile)', href: 'rulouri-exterioare.html#jaluzele-verticale' },
                    { label: 'Jaluzele tip rulou (toate culorile)', href: 'rulouri-exterioare.html#jaluzele-rulou' }
                ]
            }
        ]
    },
    {
        key: 'usi-garaj',
        label: 'UȘI GARAJ TIP RULOU',
        href: 'usi-garaj.html',
        groups: [
            {
                title: 'ACȚIONARE MANUALĂ',
                items: [
                    { label: 'Lamele subțiri 55mm', href: 'usi-garaj.html#manual-55' },
                    { label: 'Lamele intermediare 75mm', href: 'usi-garaj.html#manual-75' },
                    { label: 'Lamele groase 100mm', href: 'usi-garaj.html#manual-100' }
                ]
            },
            {
                title: 'ACȚIONARE AUTOMATĂ PRIN TELECOMANDĂ',
                items: [
                    { label: 'Lamele subțiri 55mm', href: 'usi-garaj.html#auto-55' },
                    { label: 'Lamele intermediare 75mm', href: 'usi-garaj.html#auto-75' },
                    { label: 'Lamele groase 100mm', href: 'usi-garaj.html#auto-100' }
                ]
            }
        ]
    },
    {
        key: 'sticla-ornamentala',
        label: 'STICLĂ ORNAMENTALĂ',
        href: 'sticla-ornamentala.html',
        groups: [
            {
                items: [
                    { label: 'Sticlă Simplă', href: 'sticla-ornamentala.html#sticla-simpla' },
                    { label: 'Sticlă Bronz', href: 'sticla-ornamentala.html#sticla-bronz' }
                ]
            }
        ]
    }
];

const CAT_IMG = {
    'ferestre-pvc':'ferestre.png','balcoane-pvc':'balcoane.png','usi-pvc':'usi-pvc.png',
    'culisante-aluminiu':'culisante.png','plase-insecte':'plase.png',
    'rulouri-exterioare':'rulouri.png','usi-garaj':'usi-garaj.png','sticla-ornamentala':'sticla.png'
};
const CAT_ICON_PATHS = {
    'ferestre-pvc':'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 12h18M12 3v18"/>',
    'balcoane-pvc':'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    'usi-pvc':'<rect x="5" y="3" width="14" height="18" rx="1"/><circle cx="15" cy="12" r="1"/>',
    'culisante-aluminiu':'<rect x="2" y="4" width="20" height="16" rx="1"/><path d="M12 4v16M7 9l-2 3 2 3M17 9l2 3-2 3"/>',
    'plase-insecte':'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    'rulouri-exterioare':'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 8h18M3 12h18M3 16h18"/>',
    'usi-garaj':'<path d="M3 21V8l9-5 9 5v13"/><path d="M6 21v-8h12v8M6 16h12"/>',
    'sticla-ornamentala':'<path d="M5 3h14l-1 13a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3L5 3z"/><path d="M9 8h6"/>'
};
function catIconSvg(key){
    const p = CAT_ICON_PATHS[key] || CAT_ICON_PATHS['ferestre-pvc'];
    return '<svg viewBox="0 0 24 24">' + p + '</svg>';
}

function initProductsSidebar() {
    const sidebar = document.getElementById('products-sidebar');
    const backdrop = document.getElementById('products-backdrop');
    if (!sidebar || !backdrop) return;

    const catList = sidebar.querySelector('.products-cat-list');
    const subCol = sidebar.querySelector('.products-sidebar-col2');

    // Coloana 1 — categorii cu iconițe
    catList.innerHTML = '';
    PRODUCT_CATEGORIES.forEach(cat => {
        const li = document.createElement('li');
        li.innerHTML = '<button type="button" class="products-cat-btn" data-cat="' + cat.key + '">'
            + '<span class="cat-ic">' + catIconSvg(cat.key) + '</span>'
            + '<span class="cat-name">' + cat.label + '</span>'
            + '<span class="arrow">\u203A</span></button>';
        catList.appendChild(li);
    });

    function renderPlaceholder() {
        subCol.innerHTML = '<div class="products-sub-placeholder">Selectează o categorie</div>';
    }

    function buildGroups(cat, host) {
        if (!cat.groups || cat.groups.length === 0) return;
        cat.groups.forEach(group => {
            const groupEl = document.createElement('div');
            groupEl.className = 'products-sub-group';
            if (group.title) {
                const h = document.createElement('div');
                h.className = 'products-sub-group-title';
                h.textContent = group.title;
                groupEl.appendChild(h);
            }
            const ul = document.createElement('ul');
            ul.className = 'products-sub-list';
            group.items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = '<a class="products-sub-link" href="' + item.href + '">' + item.label + '</a>';
                ul.appendChild(li);
            });
            groupEl.appendChild(ul);
            if (group.note) {
                const n = document.createElement('div');
                n.className = 'products-sub-note';
                n.textContent = group.note;
                groupEl.appendChild(n);
            }
            host.appendChild(groupEl);
        });
    }

    function renderSubs(cat) {
        subCol.innerHTML = '';
        const wrap = document.createElement('div');
        wrap.className = 'products-preview';

        const bg = document.createElement('div');
        bg.className = 'products-preview-bg';
        const img = CAT_IMG[cat.key];
        if (img) {
            const rid = 'cat_' + cat.key.replace(/-/g, '_');
            const resolved = (window.__resources && window.__resources[rid]) || ('assets/images/categorii/' + img);
            bg.style.backgroundImage = "url('" + resolved + "')";
        }

        const inner = document.createElement('div');
        inner.className = 'products-preview-inner';
        const head = document.createElement('div');
        head.innerHTML = '<div class="products-preview-eyebrow">Categorie</div>'
            + '<h3 class="products-preview-title">' + cat.label + '</h3>'
            + '<a class="products-preview-cta" href="' + cat.href + '">Vezi pagina'
            + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>';
        inner.appendChild(head);
        buildGroups(cat, inner);

        wrap.appendChild(bg);
        wrap.appendChild(inner);
        subCol.appendChild(wrap);

        subCol.querySelectorAll('.products-sub-link, .products-preview-cta').forEach(link => {
            link.addEventListener('click', () => closeSidebar());
        });
    }

    function selectCat(btn) {
        const cat = PRODUCT_CATEGORIES.find(c => c.key === btn.dataset.cat);
        if (!cat) return;
        sidebar.querySelectorAll('.products-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSubs(cat);
    }

    function openSidebar() {
        sidebar.classList.add('open');
        backdrop.classList.add('open');
        document.body.classList.add('no-scroll');
        const active = sidebar.querySelector('.products-cat-btn.active');
        const first = sidebar.querySelector('.products-cat-btn');
        if (!active && first) selectCat(first);
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }

    document.querySelectorAll('[data-products-open]').forEach(el => {
        el.addEventListener('click', (e) => { e.preventDefault(); openSidebar(); });
    });

    sidebar.querySelectorAll('[data-products-close]').forEach(el => {
        el.addEventListener('click', closeSidebar);
    });
    backdrop.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
    });

    // Click selectează categoria (preview se schimbă smooth)
    sidebar.querySelectorAll('.products-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => selectCat(btn));
    });

    renderPlaceholder();
}

// ====================================================
// VALIDARE FORMULAR
// ====================================================
function validateField(field) {
    const wrapper = field.closest('.input-wrapper');
    if (!wrapper) return true;

    const value = field.value.trim();
    let isValid = true;
    let errorMsg = '';

    if (field.required && !value) {
        isValid = false;
        errorMsg = 'Acest câmp este obligatoriu';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMsg = 'Adresa de email nu este validă';
        }
    } else if (field.type === 'tel' && value) {
        // Validare telefon românesc (acceptă format 07XX XXX XXX sau +40...)
        const phoneRegex = /^(\+4|)?(07[0-9]{8}|07[0-9]{2}\s?[0-9]{3}\s?[0-9]{3})$/;
        const cleaned = value.replace(/\s/g, '');
        if (!phoneRegex.test(cleaned)) {
            isValid = false;
            errorMsg = 'Număr de telefon invalid (ex: 0758271007)';
        }
    }

    if (isValid) {
        wrapper.classList.remove('has-error');
    } else {
        wrapper.classList.add('has-error');
        const msgEl = wrapper.querySelector('.error-msg');
        if (msgEl) msgEl.textContent = errorMsg;
    }

    return isValid;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    fields.forEach(field => {
        if (!validateField(field)) isValid = false;
    });
    return isValid;
}

// ====================================================
// SIMULARE TRIMITERE EMAIL & SMS
// ====================================================
function simulateNotification(formData, formType) {
    // Pregătește datele pentru "trimitere"
    const subject = `[${formType}] Cerere nouă de la ${formData.nume || 'Client'}`;

    console.log('========================================');
    console.log('📧 EMAIL TRIMIS CĂTRE:', COMPANY.email);
    console.log('SUBIECT:', subject);
    console.log('CONȚINUT:');
    Object.entries(formData).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
    });
    console.log('----------------------------------------');
    console.log(`📱 SMS trimis la ${COMPANY.phone1} și ${COMPANY.phone2}`);
    console.log(`   "Cerere nouă pe site de la ${formData.nume || 'client'} - ${formData.telefon || 'N/A'}"`);
    console.log('----------------------------------------');
    console.log(`📧 EMAIL CONFIRMARE TRIMIS CLIENTULUI: ${formData.email || 'N/A'}`);
    console.log('   "Oferta ta a fost primită. Te vom contacta în maximum 24 de ore."');
    console.log('========================================');

    // Returnează un obiect cu rezumatul
    return {
        success: true,
        message: 'Cererea ta a fost trimisă cu succes! Te vom contacta în maximum 24 de ore.'
    };
}

// ====================================================
// AFIȘARE MESAJ SUCCES ÎN FORMULAR
// ====================================================
function showSuccessMessage(form, message) {
    let msgEl = form.querySelector('.success-message');
    if (!msgEl) {
        msgEl = document.createElement('div');
        msgEl.className = 'success-message';
        form.appendChild(msgEl);
    }
    msgEl.textContent = '✓ ' + message;
    msgEl.classList.add('show');
    setTimeout(() => msgEl.classList.remove('show'), 8000);
}

// ====================================================
// CALCULATOR PREȚ FERESTRE
// ====================================================
// Prețuri de bază pe m² (Profil + Camere + Geam simplu)
const BASE_PRICES = {
    'salamander': { 4: 100, 5: 120, 6: 130, 7: 140 },
    'ramplast': { 4: 110, 5: 130, 6: 140, 7: 150 },
    'sigplast': { 4: 95, 5: 115, 6: 125, 7: 135 }
};

// Adaos preț pentru tip geam
const GLASS_PRICE = {
    'simplu': 0,
    'dublu': 40,
    'triplu': 80
};

// Multiplicatori
const COLOR_MULT = {
    'alb': 1.00,
    'stejar': 1.10,
    'nuc': 1.10,
    'mahon': 1.10,
    'venhe': 1.10,
    'antracit': 1.10
};

const OPENING_MULT = {
    'oscilobatant': 1.00,
    'batant': 1.00,
    'glisant': 1.05,
    'culisant': 1.05
};

const THRESHOLD_MULT = {
    'cu-prag': 1.00,
    'fara-prag': 0.95
};

function calculatePrice() {
    // Citește toate datele din formular
    const tipProdus = document.querySelector('input[name="tip-produs"]:checked');
    const profil = document.getElementById('profil').value;
    const culoare = document.getElementById('culoare').value;
    const camere = parseInt(document.getElementById('camere').value);
    const geam = document.getElementById('geam').value;
    const latime = parseFloat(document.getElementById('latime').value);
    const inaltime = parseFloat(document.getElementById('inaltime').value);
    const deschidere = document.getElementById('deschidere').value;
    const prag = document.getElementById('prag').value;

    const resultDiv = document.getElementById('calculator-result');

    // Verifică dacă toate datele sunt completate
    if (!tipProdus || !profil || !culoare || !camere || !geam || !latime || !inaltime || !deschidere || !prag) {
        resultDiv.style.display = 'none';
        return null;
    }

    // Suprafață în m²
    const suprafata = (latime * inaltime) / 10000;

    // Preț de bază
    let pretBaza = BASE_PRICES[profil][camere];

    // Adaugă preț pentru geam
    pretBaza += GLASS_PRICE[geam];

    // Aplică multiplicatori
    pretBaza *= COLOR_MULT[culoare];
    pretBaza *= OPENING_MULT[deschidere];
    pretBaza *= THRESHOLD_MULT[prag];

    // Preț total
    const pretTotal = pretBaza * suprafata;

    // Afișează rezultatul
    resultDiv.style.display = 'block';
    document.getElementById('price-value').textContent = Math.round(pretTotal).toLocaleString('ro-RO') + ' lei';
    document.getElementById('price-per-sqm').textContent = Math.round(pretBaza) + ' lei/m²';
    document.getElementById('price-suprafata').textContent = suprafata.toFixed(2) + ' m²';

    return {
        tipProdus: tipProdus.value,
        profil,
        culoare,
        camere,
        geam,
        latime,
        inaltime,
        suprafata: suprafata.toFixed(2),
        deschidere,
        prag,
        pretTotal: Math.round(pretTotal)
    };
}

function initCalculator() {
    const form = document.getElementById('calculator-form');
    if (!form) return;

    // Recalculează la orice schimbare
    form.addEventListener('input', () => calculatePrice());
    form.addEventListener('change', () => calculatePrice());

    // Submit formular ofertă
    const offerForm = document.getElementById('offer-form');
    if (offerForm) {
        offerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!validateForm(offerForm)) return;

            const priceData = calculatePrice();
            const formData = {
                nume: document.getElementById('nume').value,
                telefon: document.getElementById('telefon').value,
                email: document.getElementById('email').value,
                mesaj: document.getElementById('mesaj').value || '(fără mesaj)',
                'Tip produs': priceData ? priceData.tipProdus : 'nespecificat',
                'Profil': priceData ? priceData.profil : 'nespecificat',
                'Culoare': priceData ? priceData.culoare : 'nespecificat',
                'Camere': priceData ? priceData.camere : 'nespecificat',
                'Geam': priceData ? priceData.geam : 'nespecificat',
                'Dimensiuni': priceData ? `${priceData.latime}cm x ${priceData.inaltime}cm (${priceData.suprafata} m²)` : 'nespecificat',
                'Deschidere': priceData ? priceData.deschidere : 'nespecificat',
                'Prag': priceData ? priceData.prag : 'nespecificat',
                'Preț estimat': priceData ? `${priceData.pretTotal} lei` : 'nespecificat'
            };

            const result = simulateNotification(formData, 'Ofertă Ferestre');
            showSuccessMessage(offerForm, result.message);
            offerForm.reset();
        });
    }

    // Inițializează rezultatul ascuns
    const resultDiv = document.getElementById('calculator-result');
    if (resultDiv) resultDiv.style.display = 'none';
}

// ====================================================
// GALERIE UȘI - MODAL
// ====================================================
const DOOR_MODELS = [
    { id: 1, name: 'Model Classic', desc: 'Design tradițional cu detalii fine, perfect pentru orice tip de locuință.' },
    { id: 2, name: 'Model Modern', desc: 'Linii curate și forme contemporane pentru un aspect elegant.' },
    { id: 3, name: 'Model Premium', desc: 'Calitate superioară și finisaje premium pentru locuințele de lux.' },
    { id: 4, name: 'Model Rustic', desc: 'Stil rustic cu accente naturale și textură caldă.' },
    { id: 5, name: 'Model Minimalist', desc: 'Aspect simplu și rafinat, ideal pentru arhitectura modernă.' },
    { id: 6, name: 'Model Elegance', desc: 'Eleganță și prestanță cu detalii decorative atent realizate.' },
    { id: 7, name: 'Model Solid', desc: 'Robustețe și securitate maximă cu design impunător.' },
    { id: 8, name: 'Model Glasstech', desc: 'Combinație inovatoare între PVC și sticlă pentru aspect luminos.' },
    { id: 9, name: 'Model Geometric', desc: 'Forme geometrice și panouri decorative cu impact vizual.' }
];

const GLASS_MODELS = ['Clara', 'Oglindă', 'Castelano', 'Crosfield', 'Delta', 'Krizet', 'Nisip', 'Spic', 'Bambus', 'Kura'];

function initGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    // Generează cardurile galerie
    DOOR_MODELS.forEach(model => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.modelId = model.id;
        item.innerHTML = `
            <div class="gallery-thumb">
                <span class="gallery-thumb-icon">🚪</span>
            </div>
            <div class="gallery-info">
                <h3>${model.name}</h3>
                <p>Click pentru detalii</p>
            </div>
        `;
        item.addEventListener('click', () => openDoorModal(model));
        grid.appendChild(item);
    });

    // Închidere modal
    const modal = document.getElementById('door-modal');
    if (modal) {
        modal.querySelector('.modal-close').addEventListener('click', closeDoorModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeDoorModal();
        });
    }

    // Taburi în modal
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });

    // Submit formular ușă
    const doorForm = document.getElementById('door-form');
    if (doorForm) {
        doorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm(doorForm)) return;

            const formData = {
                nume: document.getElementById('door-nume').value,
                telefon: document.getElementById('door-telefon').value,
                email: document.getElementById('door-email').value,
                'Model Ușă': document.getElementById('door-model').value,
                'Model Geam': document.getElementById('door-glass').value,
                mesaj: document.getElementById('door-mesaj').value || '(fără mesaj)'
            };

            const result = simulateNotification(formData, 'Cerere Ofertă Uși');
            showSuccessMessage(doorForm, result.message);
            doorForm.reset();
        });
    }
}

function openDoorModal(model) {
    const modal = document.getElementById('door-modal');
    if (!modal) return;

    document.getElementById('modal-title').textContent = model.name;
    document.getElementById('modal-desc').textContent = model.desc;

    // Pre-populează formularul cu modelul selectat
    const modelInput = document.getElementById('door-model');
    if (modelInput) modelInput.value = model.name;

    // Activează primul tab
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="door"]').classList.add('active');
    document.getElementById('tab-door').classList.add('active');

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDoorModal() {
    const modal = document.getElementById('door-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Funcție apelată din butonul modal pentru a comuta la formular
function scrollToDoorForm() {
    closeDoorModal();
    setTimeout(() => {
        const form = document.getElementById('door-form');
        if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

// ====================================================
// FORMULAR CONTACT GENERAL (pentru pagini fără calculator)
// ====================================================
function initContactForms() {
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm(form)) return;

            const formData = {};
            new FormData(form).forEach((value, key) => {
                formData[key] = value;
            });

            const result = simulateNotification(formData, 'Contact');
            showSuccessMessage(form, result.message);
            form.reset();
        });
    });
}

// ====================================================
// PAGINI CATEGORII - taburi subcategorii
// ====================================================
function initSubcatTabs() {
    document.querySelectorAll('.subcat-tabs').forEach(group => {
        const tabs = group.querySelectorAll('.subcat-tab');
        const panels = document.querySelectorAll(`.subcat-panel[data-group="${group.dataset.group}"]`);

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const key = tab.dataset.panel;
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const target = document.querySelector(`.subcat-panel[data-group="${group.dataset.group}"][data-panel="${key}"]`);
                if (target) target.classList.add('active');
                // scroll la ancoră dacă există
                if (target && target.id) {
                    history.replaceState(null, '', '#' + target.id);
                }
            });
        });
    });

    // Dacă URL-ul are #ancoră, activează tab-ul corespunzător
    if (window.location.hash) {
        const id = window.location.hash.slice(1);
        const tab = document.querySelector(`.subcat-tab[data-panel="${id}"]`);
        if (tab) tab.click();
    }
}

// ====================================================
// PAGINA LUCRĂRI - Modal galerie (lightbox)
// ====================================================
function initLucrariModal() {
    const masonry = document.getElementById('lucrari-masonry');
    const modal = document.getElementById('lucrare-modal');
    if (!masonry || !modal) return;

    const modalImg = document.getElementById('lucrare-modal-image');
    const modalPh = document.getElementById('lucrare-modal-ph');
    const closeBtn = modal.querySelector('.modal-close');

    function openModal(item) {
        const img = item.querySelector('img');
        const label = item.querySelector('.lucrari-ph-label');

        if (img && item.classList.contains('has-img')) {
            // Poza reală există → o afișăm în modal
            modalImg.src = img.currentSrc || img.src;
            modalImg.alt = img.alt || 'Proiect COSTI SYSTEM';
            modalImg.style.display = 'block';
            modalPh.style.display = 'none';
        } else {
            // Încă placeholder → arătăm eticheta corespunzătoare
            modalImg.removeAttribute('src');
            modalImg.style.display = 'none';
            modalPh.textContent = label ? label.textContent : 'Imagine';
            modalPh.style.display = 'flex';
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    masonry.querySelectorAll('.lucrari-item').forEach(item => {
        item.addEventListener('click', () => openModal(item));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });
}

// ====================================================
// STATISTICI - counter animat la scroll
// ====================================================
function initStatsCounter() {
    const numbers = document.querySelectorAll('.stats-section .stat-number');
    if (!numbers.length) return;

    function animate(el) {
        const target = parseInt(el.dataset.target, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 2000; // 2 secunde
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value.toLocaleString('ro-RO') + suffix;
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target.toLocaleString('ro-RO') + suffix;
            }
        }
        requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                obs.unobserve(entry.target); // animează o singură dată
            }
        });
    }, { threshold: 0.4 });

    numbers.forEach(el => observer.observe(el));
}

// ====================================================
// EVIDENȚIAZĂ LINK ACTIV ÎN MENIU
// ====================================================
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// ====================================================
// SCROLL REVEAL GLOBAL — text, imagini, carduri
// Auto-detectează elementele pe orice pagină. Respectă
// prefers-reduced-motion. Curăță clasele după animație,
// ca hover-urile existente să rămână intacte.
// ====================================================
function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // ---------- HERO: cascadă la încărcare ----------
    const heroContent = document.querySelector('.hs-content, .hero-content');
    if (heroContent) {
        [...heroContent.children].forEach((el, i) => {
            el.style.setProperty('--reveal-delay', (140 + i * 115) + 'ms');
            el.classList.add('hero-rise');
            el.addEventListener('animationend', () => {
                el.classList.remove('hero-rise');
                el.style.removeProperty('--reveal-delay');
            }, { once: true });
        });
    }
    document.querySelectorAll('.hs-media img, .hero-media img').forEach(img => {
        img.classList.add('hero-media-in');
        img.addEventListener('animationend', () => img.classList.remove('hero-media-in'), { once: true });
    });

    // ---------- SCROLL REVEAL ----------
    const CLEAN = ['reveal', 'reveal-left', 'reveal-right', 'reveal-zoom', 'reveal-rise', 'is-visible'];
    function cleanup(el) {
        CLEAN.forEach(c => el.classList.remove(c));
        el.style.removeProperty('--reveal-delay');
        el.style.removeProperty('will-change');
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            io.unobserve(el);
            el.classList.add('is-visible');
            let done = false;
            const finish = () => { if (done) return; done = true; cleanup(el); };
            el.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'transform' || e.propertyName === 'opacity') finish();
            }, { once: true });
            setTimeout(finish, 1700); // plasă de siguranță dacă transitionend nu se declanșează
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    function mark(el, variant, delay) {
        if (!el || el.classList.contains('reveal')) return;
        el.classList.add('reveal');
        if (variant) el.classList.add(variant);
        if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
        io.observe(el);
    }

    // Titluri, subtitluri și benzile de jos (CTA + social)
    document.querySelectorAll(
        '.section-title, .section-subtitle, .sticla-section-header, .why-head, ' +
        '.cta-section h2, .cta-section p, .cta-section .call-btn, ' +
        '.social-band h3, .social-band p, .social-band .social-buttons, ' +
        // Pagina Despre — text și blocuri
        '.about-eyebrow, .about-lead, .about-text, .about-h2, .about-mission, ' +
        '.about-cols > div, .values-title, ' +
        // Pagina Contact — bloc WhatsApp
        '.wa-block-title, .wa-block-sub, .wa-cta'
    ).forEach(el => mark(el, 'reveal-rise'));

    // Rânduri de produs alternante — textul dintr-o parte, imaginea din cealaltă
    document.querySelectorAll('.profile-row-inner').forEach(row => {
        const reverse = row.classList.contains('reverse');
        mark(row.querySelector('.profile-text'), reverse ? 'reveal-right' : 'reveal-left');
        mark(row.querySelector('.profile-media'), reverse ? 'reveal-left' : 'reveal-right', 120);
    });

    // Carduri și elemente de grilă — apar în cascadă, unul după altul
    const cardSel = '.card, .product-card, .nav-card, .why-item, .gallery-item, ' +
                    '.cat-card, .service-card-large, .color-swatch, ' +
                    '.stat-item, .subcat-card, ' +
                    '.why-card, .contact-card, .c-item, .c-map';
    document.querySelectorAll(cardSel).forEach(el => {
        const parent = el.parentElement;
        const idx = parent ? [...parent.children].indexOf(el) : 0;
        mark(el, 'reveal-zoom', Math.min(idx, 6) * 85);
    });
}

// ====================================================
// FADE-IN PE IMAGINI LA ÎNCĂRCARE
// Pozele lente apar lin în loc să „sară” brusc după încărcare.
// Sare peste pagina Lucrări (pozele rămân fixe — evită glitch-uri).
// ====================================================
function initImageFade() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const isLucrari = /lucrari/i.test(window.location.pathname) ||
                      !!document.querySelector('.lucrari-item, .lucrari-grid');
    if (isLucrari) return;

    const imgs = document.querySelectorAll(
        '.profile-media img, .photo-frame img, .subcat-card img, ' +
        '.card img, .why-icon img, .nav-card img, .cat-card img'
    );
    imgs.forEach(img => {
        if (img.complete && img.naturalWidth > 0) return; // deja încărcată — n-o ascunde
        img.classList.add('img-fade');
        const show = () => img.classList.add('img-loaded');
        img.addEventListener('load', show, { once: true });
        img.addEventListener('error', show, { once: true });
    });
    // plasă de siguranță: arată tot după 5s indiferent de evenimente
    setTimeout(() => {
        document.querySelectorAll('img.img-fade:not(.img-loaded)')
            .forEach(i => i.classList.add('img-loaded'));
    }, 5000);
}

// ====================================================
// DEEP-LINK la secțiuni (#ancoră din meniul Produse)
// Corectează poziția DUPĂ ce se încarcă imaginile: saltul
// nativ se face înainte ca pozele de deasupra să aibă înălțime,
// așa că ținta „fuge" în jos. Repoziționăm la load + un mic delay.
// Se oprește dacă utilizatorul începe să deruleze manual.
// ====================================================
function initHashScroll() {
    if (!location.hash || location.hash === '#') return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { id = location.hash.slice(1); }
    const el = document.getElementById(id);
    if (!el) return;

    let cancelled = false;
    const onKey = (e) => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].indexOf(e.key) !== -1) cancel();
    };
    const off = () => {
        window.removeEventListener('wheel', cancel);
        window.removeEventListener('touchmove', cancel);
        window.removeEventListener('keydown', onKey);
    };
    function cancel() { cancelled = true; off(); }
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchmove', cancel, { passive: true });
    window.addEventListener('keydown', onKey);

    const go = () => { if (!cancelled) el.scrollIntoView({ behavior: 'auto', block: 'start' }); };
    go();                                   // poziție aproximativă imediată
    requestAnimationFrame(go);              // după primul render
    window.addEventListener('load', () => { // după ce s-au încărcat pozele
        go();
        setTimeout(() => { go(); off(); }, 350);
    }, { once: true });
}

// ====================================================
// INIȚIALIZARE LA ÎNCĂRCARE PAGINĂ
// ====================================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initProductsSidebar();
    highlightActiveNav();
    initCalculator();
    initGallery();
    initContactForms();
    initSubcatTabs();
    initLucrariModal();
    initStatsCounter();
    initScrollReveal();
    initImageFade();
    initHashScroll();
    initCookieBanner();

    // Populează dropdown-ul de geam pentru uși (dacă există)
    const glassSelect = document.getElementById('door-glass');
    if (glassSelect) {
        GLASS_MODELS.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g;
            opt.textContent = g;
            glassSelect.appendChild(opt);
        });
    }
});
