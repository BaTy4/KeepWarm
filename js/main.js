// ===== PRODUCT DATA =====
const products = [
    {
        id: 's811',
        name: 'S811',
        price: '72 000 ₸',
        desc: 'Для офиса и межкомнатных дверей',
        tag: 'Офис',
        features: ['Отпечаток', 'PIN', 'TTLock'],
        img: 'images/S811.png'
    },
    {
        id: 's608',
        name: 'S608',
        price: '85 000 ₸',
        desc: 'Для алюминиевых и узкопрофильных дверей',
        tag: 'Алюминий',
        features: ['Отпечаток', 'PIN', 'TTLock'],
        img: 'images/S608.png'
    },
    {
        id: 's819',
        name: 'S819-2',
        price: '85 000 ₸',
        desc: 'Для аренды / субаренды',
        tag: 'Аренда',
        features: ['Wi-Fi', 'Временные пароли', 'Журнал'],
        img: 'images/S819-2.png'
    },
    {
        id: 's819c',
        name: 'S819-2 Camera',
        price: '105 000 ₸',
        desc: 'Для квартир / частных домов',
        tag: 'Дом',
        features: ['Видеодомофон', 'Tuya', 'Камера'],
        img: 'images/S819-2camera.png'
    },
    {
        id: 's958',
        name: 'S958 MAX',
        price: '135 000 ₸',
        desc: 'Камера, Wi-Fi, Face ID',
        tag: 'Premium',
        features: ['Камера', 'Wi-Fi', 'Face ID'],
        img: 'images/S958max.png'
    },
    {
        id: 's940',
        name: 'S940 MAX',
        price: '150 000 ₸',
        desc: 'Максимальная комплектация',
        tag: 'Flagship',
        features: ['Камера', 'Face ID', 'Сканер ладони'],
        img: 'images/S940max.png'
    }

];

// ===== QUIZ STATE =====
const quizState = {
    use: null,
    camera: null,
    wifi: null
};

// ===== QUIZ RESULT DATA =====
const quizResults = {
    home: {
        name: 'S819-2 Camera',
        price: '105 000 ₸',
        desc: 'Видеодомофон, звонок, Tuya, журнал открываний, автозапирание и сигнализация при взломе.',
        features: ['Видеодомофон', 'Tuya', 'Отпечаток', 'PIN', 'Автозапирание'],
        img: 'images/S819-2camera.png'
    },
    office: {
        name: 'S811',
        price: '72 000 ₸',
        desc: 'Для офиса и межкомнатных дверей. Отпечаток, PIN, карта, приложение TTLock и автоматическое запирание.',
        features: ['Отпечаток', 'PIN', 'TTLock', 'Автозапирание'],
        img: 'images/S811.png'
    },
    rent: {
        name: 'S819-2',
        price: '85 000 ₸',
        desc: 'Встроенный Wi-Fi, временные пароли и журнал открываний — удобно для аренды и посуточного жилья.',
        features: ['Wi-Fi', 'Временные пароли', 'Журнал', 'Автозапирание'],
        img: 'images/S819-2.png'
    },
    aluminum: {
        name: 'S608',
        price: '85 000 ₸',
        desc: 'Для алюминиевых и узкопрофильных дверей. Отпечаток, PIN, карта, приложение TTLock.',
        features: ['Отпечаток', 'PIN', 'TTLock'],
        img: 'images/S608.png'
    },
    homeCamera: {
        name: 'S958 MAX',
        price: '135 000 ₸',
        desc: 'Камера, Face ID, отпечаток, PIN, Tuya и встроенный Wi-Fi.',
        features: ['Камера', 'Wi-Fi', 'Face ID', 'Tuya'],
        img: 'images/S958max.png'
    },
    homeCameraWifi: {
        name: 'S940 MAX',
        price: '150 000 ₸',
        desc: 'Камера и видеозвонок, Face ID, скрытый сканер отпечатка, Wi-Fi и сканирование ладони.',
        features: ['Камера', 'Видеозвонок', 'Face ID', 'Wi-Fi', 'Сканер ладони'],
        img: 'images/S940max.png'
    }
};

// ===== RENDER CATALOG =====
function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    grid.innerHTML = products.map((p, i) => `
        <div class="catalog-card fade-up stagger-${i % 4}">
            <div class="catalog-card-image">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
                <div class="catalog-card-tag">${p.tag}</div>
            </div>
            <div class="catalog-card-body">
                <div class="catalog-card-name">${p.name}</div>
                <div class="catalog-card-desc">${p.desc}</div>
                <div class="catalog-card-price">${p.price}</div>
                <div class="catalog-card-features">
                    ${p.features.map(f => `<span class="catalog-card-feature">${f}</span>`).join('')}
                </div>
                <div class="catalog-card-actions">
                    <a href="https://wa.me/77082705839?text=${encodeURIComponent('Здравствуйте! Интересует модель ' + p.name + ' (' + p.price + '). Хочу уточнить наличие и установку.')}" target="_blank" class="catalog-card-btn primary">Подобрать</a>
                    <a href="https://wa.me/77082705839?text=${encodeURIComponent('Здравствуйте! Хочу узнать подробнее о модели ' + p.name + '.')}" target="_blank" class="catalog-card-btn secondary">Подробнее</a>
                </div>
            </div>
        </div>
    `).join('');

    // Re-observe new elements
    observeFadeElements();
}

// ===== QUIZ LOGIC =====
function selectQuiz(key, value) {
    quizState[key] = value;
    updateProgress();

    if (key === 'use') {
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
    } else if (key === 'camera') {
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
    } else if (key === 'wifi') {
        document.getElementById('step3').classList.remove('active');
        showQuizResult();
    }
}

function updateProgress() {
    let completed = 0;
    if (quizState.use) completed++;
    if (quizState.camera !== null) completed++;
    if (quizState.wifi !== null) completed++;

    for (let i = 1; i <= 3; i++) {
        const fill = document.getElementById(`progress${i}`);
        if (fill) {
            fill.style.width = i <= completed ? '100%' : '0%';
        }
    }
}

function showQuizResult() {
    let result;

    if (quizState.use === 'office') {
        result = quizResults.office;
    } else if (quizState.use === 'aluminum') {
        result = quizResults.aluminum;
    } else if (quizState.use === 'rent') {
        result = quizResults.rent;
    } else if (quizState.use === 'home') {
        if (quizState.camera) {
            result = quizState.wifi ? quizResults.homeCameraWifi : quizResults.homeCamera;
        } else {
            result = quizResults.home;
        }
    }

    if (!result) result = quizResults.home;

    document.getElementById('resultImage').src = result.img;
    document.getElementById('resultName').textContent = result.name;
    document.getElementById('resultPrice').textContent = result.price;
    document.getElementById('resultDesc').textContent = result.desc + ' Бесплатная установка и 2 года гарантии.';

    const featuresContainer = document.getElementById('resultFeatures');
    featuresContainer.innerHTML = result.features.map(f =>
        `<span class="quiz-result-feature">${f}</span>`
    ).join('');

    const message = `Здравствуйте! Я прошёл подбор на сайте Keep Warm. Мне подходит модель ${result.name} (${result.price}). Хочу уточнить наличие и установку.`;
    document.getElementById('resultCta').href = `https://wa.me/77082705839?text=${encodeURIComponent(message)}`;

    const resultEl = document.getElementById('quizResult');
    resultEl.classList.add('visible');
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== FAQ TOGGLE =====
function toggleFaq(btn) {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));

    if (!isOpen) {
        item.classList.add('open');
    }
}

// ===== HEADER SCROLL =====
function handleScroll() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// ===== SCROLL ANIMATIONS =====
let observer;

function observeFadeElements() {
    if (!observer) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    observeFadeElements();

    // Trigger hero animations on load
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});

window.addEventListener('scroll', handleScroll, { passive: true });

// ===== SMOOTH SCROLL FOR ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});