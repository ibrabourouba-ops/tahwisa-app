const translations = {
  en: { emailLabel: 'Email Address', passwordLabel: 'Password', enterOasis: 'Enter the Oasis' },
  fr: { emailLabel: 'Adresse E-mail', passwordLabel: 'Mot de passe', enterOasis: 'Entrez l\'Oasis' },
  ar: { emailLabel: 'عنوان بريد إلكتروني', passwordLabel: 'كلمة المرور', enterOasis: 'ادخل الواحة' }
};

let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('tahwisaLang') || 'en';
  setLanguage(savedLang);

  document.getElementById('langEn')?.addEventListener('click', () => setLanguage('en'));
  document.getElementById('langFr')?.addEventListener('click', () => setLanguage('fr'));
  document.getElementById('langAr')?.addEventListener('click', () => setLanguage('ar'));

  document.getElementById('enterOasisBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../index.html';
  });

  document.getElementById('loginFormEl')?.addEventListener('submit', handleLoginSubmit);
  document.getElementById('signupFormEl')?.addEventListener('submit', handleSignupSubmit);
});

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('tahwisaLang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`lang${lang.toUpperCase()}`)?.classList.add('active');
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  if (email) {
    alert('Welcome back! Redirecting...');
    window.location.href = '../index.html';
  }
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  if (firstName) {
    alert('Account created! Entering the Oasis...');
    window.location.href = '../index.html';
  }
}
