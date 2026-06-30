/* ================================================================
   TAHWISSA – Logique JavaScript principale
   Fichier : app.js
   Description : Toute l'interactivité du site en JavaScript pur
   (Vanilla JS, aucune dépendance externe).
   Sommaire des modules :
   1.  Données statiques (villes, patrimoine, logements)
   2.  Gestion de la Navbar (scroll, hamburger)
   3.  Switch Voyageur / Hôte
   4.  Barre de recherche & mise à jour dynamique
   5.  Rendu du patrimoine
   6.  Rendu des hébergements (avec filtres)
   7.  Compteur animé (statistiques)
   8.  Carousel de témoignages
   9.  Widget Chat IA
   10. Formulaire Hôte (validation + revenus estimés)
   11. Modal de confirmation
   12. Bouton retour en haut
   13. Animations d'entrée (Intersection Observer)
   14. Initialisation globale
================================================================ */
'use strict';
/* ================================================================
   1. BASE DE DONNÉES STATIQUE PAR VILLE
   Chaque ville contient ses lieux de patrimoine et ses hébergements.
================================================================ */
/**
 * Objet principal contenant toutes les données par ville.
 * Clé = valeur de l'option dans le <select> de la barre de recherche.
 */
const VILLES_DATA = {
  /* ---- ALGER ---- */
  alger: {
    nomAffiche: 'Alger',
    description: 'La Blanche, capitale millénaire entre Méditerranée et Sahara.',
    patrimoine: [
      {
        id: 'alger-casbah',
        titre: 'La Casbah d\'Alger',
        tag: 'Patrimoine UNESCO',
        emoji: '🏛️',
        couleur: 'linear-gradient(135deg, #8B4513, #A0522D)',
        description: 'Classée patrimoine mondial de l\'UNESCO, la Casbah est un labyrinthe de ruelles médiévales, de palais ottomans et de mosquées historiques datant du XVIe siècle.',
        distance: 'Centre-ville',
        unesco: true,
      },
      {
        id: 'alger-basilique',
        titre: 'Basilique Notre-Dame d\'Afrique',
        tag: 'Monument historique',
        emoji: '⛪',
        couleur: 'linear-gradient(135deg, #5C8A9B, #3a6275)',
        description: 'Dominant la baie d\'Alger depuis 1872, cette basilique romano-byzantine offre une vue panoramique exceptionnelle sur toute la Méditerranée.',
        distance: 'Notre-Dame d\'Afrique',
        unesco: false,
      },
      {
        id: 'alger-jardin',
        titre: 'Jardin d\'Essai du Hamma',
        tag: 'Parc botanique',
        emoji: '🌿',
        couleur: 'linear-gradient(135deg, #2A9D8F, #1d7a6e)',
        description: 'L\'un des plus beaux jardins botaniques d\'Afrique du Nord, créé au XIXe siècle. Abritant plus de 3 000 espèces végétales exotiques.',
        distance: 'El Hamma',
        unesco: false,
      },
    ],
    logements: [
      {
        id: 'alger-riad',
        type: 'habitant',
        titre: 'Riad El Kebir – Cœur de la Casbah',
        lieu: 'Casbah, Alger',
        emoji: '🏠',
        couleur: 'linear-gradient(135deg, #E07A5F, #c4614a)',
        description: 'Magnifique riad ottoman rénové avec patio à fontaine et terrasse panoramique.',
        commodites: ['WiFi', 'Petit-déj', 'Terrasse'],
        rating: '★★★★★',
        avis: 150,
        prix: 95,
      },
      {
        id: 'alger-appart',
        type: 'habitant',
        titre: 'Appartement Vue Mer – Bab El Oued',
        lieu: 'Bab El Oued, Alger',
        emoji: '🌊',
        couleur: 'linear-gradient(135deg, #457B9D, #2d5a7a)',
        description: 'Appartement moderne avec vue imprenable sur la Méditerranée, à 5 min de la plage.',
        commodites: ['WiFi', 'Parking', 'Clim'],
        rating: '★★★★☆',
        avis: 87,
        prix: 70,
      },
      {
        id: 'alger-hotel',
        type: 'hotel',
        titre: 'Hôtel El Djazaïr – Grand Standing',
        lieu: 'Telemly, Alger',
        emoji: '🏨',
        couleur: 'linear-gradient(135deg, #E9C46A, #c9a84a)',
        description: 'Hôtel 5 étoiles historique dans un cadre colonial magnifiquement préservé avec piscine et spa.',
        commodites: ['Piscine', 'Spa', 'Restaurant'],
        rating: '★★★★★',
        avis: 312,
        prix: 180,
      },
      {
        id: 'alger-gite',
        type: 'habitant',
        titre: 'Gîte Berbère – Tipaza Nord',
        lieu: 'Cherchell, Alger',
        emoji: '🌺',
        couleur: 'linear-gradient(135deg, #F4A261, #E76F51)',
        description: 'Maison de vacances au bord de la mer avec jardin arboré et accès direct à la plage privée.',
        commodites: ['WiFi', 'Jardin', 'Plage'],
        rating: '★★★★★',
        avis: 63,
        prix: 65,
      },
    ],
  },
  /* ---- TIPAZA ---- */
  tipaza: {
    nomAffiche: 'Tipaza',
    description: 'La cité des ruines, entre mer et montagnes — diamant de l\'Algérie antique.',
    patrimoine: [
      {
        id: 'tipaza-ruines',
        titre: 'Ruines Romaines de Tipaza',
        tag: 'Patrimoine UNESCO',
        emoji: '🏺',
        couleur: 'linear-gradient(135deg, #D4A574, #b8804e)',
        description: 'Site archéologique exceptionnel classé UNESCO : temples romains, thermes, basiliques paléochrétiennes face à une Méditerranée d\'un bleu éblouissant.',
        distance: 'Centre de Tipaza',
        unesco: true,
      },
      {
        id: 'tipaza-tombeau',
        titre: 'Tombeau de la Chrétienne',
        tag: 'Monument antique',
        emoji: '⚱️',
        couleur: 'linear-gradient(135deg, #8B7355, #5C4A32)',
        description: 'Mausolée royal massif de 60 mètres de diamètre érigé au 1er siècle av. J.-C. pour les rois berbères Juba II et Cléopâtre Séléné.',
        distance: '20 km de Tipaza',
        unesco: false,
      },
      {
        id: 'tipaza-plage',
        titre: 'Plage de Rastoma',
        tag: 'Nature & Détente',
        emoji: '🏖️',
        couleur: 'linear-gradient(135deg, #2A9D8F, #457B9D)',
        description: 'L\'une des plus belles plages d\'Algérie, connue pour ses eaux cristallines turquoise et ses rochers pittoresques façonnés par la Méditerranée.',
        distance: 'Tipaza Ouest',
        unesco: false,
      },
    ],
    logements: [
      {
        id: 'tipaza-maison-pecheur',
        type: 'habitant',
        titre: 'Maison de Pêcheur face aux Ruines',
        lieu: 'Bord de mer, Tipaza',
        emoji: '⚓',
        couleur: 'linear-gradient(135deg, #2A9D8F, #457B9D)',
        description: 'Charmante maison de pêcheur à 50m des ruines romaines. Réveillez-vous au son des vagues.',
        commodites: ['Vue mer', 'Terrasse', 'Vélos'],
        rating: '★★★★☆',
        avis: 88,
        prix: 75,
      },
      {
        id: 'tipaza-villa',
        type: 'habitant',
        titre: 'Villa Méditerranéenne avec Piscine',
        lieu: 'Tipaza centre',
        emoji: '🌊',
        couleur: 'linear-gradient(135deg, #F4A261, #E07A5F)',
        description: 'Spacieuse villa avec piscine à débordement, jardin d\'oliviers et barbecue. Vue sur les ruines.',
        commodites: ['Piscine', 'WiFi', 'Jardin'],
        rating: '★★★★★',
        avis: 44,
        prix: 130,
      },
      {
        id: 'tipaza-hotel',
        type: 'hotel',
        titre: 'Hôtel La Corne d\'Or',
        lieu: 'Tipaza bord de mer',
        emoji: '🏨',
        couleur: 'linear-gradient(135deg, #E9C46A, #c9a84a)',
        description: 'Hôtel 4 étoiles avec accès direct à la plage, restaurant de fruits de mer et spa.',
        commodites: ['Restaurant', 'Plage', 'Spa'],
        rating: '★★★★☆',
        avis: 195,
        prix: 110,
      },
    ],
  },
  /* ---- GHARDAÏA ---- */
  ghardaia: {
    nomAffiche: 'Ghardaïa',
    description: 'La perle du M\'Zab, joyau de l\'architecture mozabite au cœur du Sahara.',
    patrimoine: [
      {
        id: 'ghardaia-pentapole',
        titre: 'La Pentapole du M\'Zab',
        tag: 'Patrimoine UNESCO',
        emoji: '🕌',
        couleur: 'linear-gradient(135deg, #F4A261, #E07A5F)',
        description: 'Ensemble unique de cinq cités mozabites fondées au Xe siècle. Architecture organelle remarquable adaptée au désert, classée UNESCO depuis 1982.',
        distance: 'Ghardaïa centre',
        unesco: true,
      },
      {
        id: 'ghardaia-marche',
        titre: 'Marché Traditionnel de Ghardaïa',
        tag: 'Culture vivante',
        emoji: '🛒',
        couleur: 'linear-gradient(135deg, #E9C46A, #D4A017)',
        description: 'L\'un des marchés les plus colorés du Sahara. Tapis berbères, dattes, poteries et épices dans une ambiance authentique millénaire.',
        distance: 'Médina de Ghardaïa',
        unesco: false,
      },
      {
        id: 'ghardaia-oued-mzab',
        titre: 'Oued M\'Zab et Palmeraies',
        tag: 'Paysage naturel',
        emoji: '🌴',
        couleur: 'linear-gradient(135deg, #2A9D8F, #1d7a6e)',
        description: 'Les palmeraies verdoyantes de l\'Oued M\'Zab forment une oasis spectaculaire au pied des cités mozabites. Un contraste saisissant avec le désert.',
        distance: 'Beni Isguen',
        unesco: false,
      },
    ],
    logements: [
      {
        id: 'ghardaia-maison-mozabite',
        type: 'habitant',
        titre: 'Maison Mozabite Traditionnelle',
        lieu: 'Beni Isguen, Ghardaïa',
        emoji: '🏡',
        couleur: 'linear-gradient(135deg, #F4A261, #E07A5F)',
        description: 'Authentique maison mozabite à l\'architecture millénaire. Patios intérieurs frais et hospitalité légendaire.',
        commodites: ['Petit-déj', 'Patio', 'Clim'],
        rating: '★★★★★',
        avis: 56,
        prix: 55,
      },
      {
        id: 'ghardaia-riad-sahara',
        type: 'habitant',
        titre: 'Riad Sahara – Vue sur la Palmeraie',
        lieu: 'Ghardaïa centre',
        emoji: '🌴',
        couleur: 'linear-gradient(135deg, #E9C46A, #D4A017)',
        description: 'Magnifique riad avec vue panoramique sur les palmeraies et la pentapole mozabite. Cuisine du Sud incluse.',
        commodites: ['WiFi', 'Cuisine', 'Terrasse'],
        rating: '★★★★☆',
        avis: 38,
        prix: 60,
      },
      {
        id: 'ghardaia-hotel',
        type: 'hotel',
        titre: 'Hôtel Rostémides – Ghardaïa',
        lieu: 'Ghardaïa',
        emoji: '🏨',
        couleur: 'linear-gradient(135deg, #8B7355, #5C4A32)',
        description: 'Hôtel 3 étoiles bien placé avec piscine, restaurant local et excursions organisées dans le M\'Zab.',
        commodites: ['Piscine', 'Restaurant', 'Excursions'],
        rating: '★★★☆☆',
        avis: 142,
        prix: 75,
      },
    ],
  },
  /* ---- TLEMCEN ---- */
  tlemcen: {
    nomAffiche: 'Tlemcen',
    description: 'La perle du Maghreb, capitale historique du Royaume de Tlemcen.',
    patrimoine: [
      {
        id: 'tlemcen-grande-mosquee',
        titre: 'Grande Mosquée de Tlemcen',
        tag: 'Monument historique',
        emoji: '🕌',
        couleur: 'linear-gradient(135deg, #2A9D8F, #1d7a6e)',
        description: 'Fondée en 1082, cette mosquée almoravide est un chef-d\'œuvre de l\'architecture arabo-andalouse avec son minaret octogonal unique.',
        distance: 'Centre de Tlemcen',
        unesco: false,
      },
      {
        id: 'tlemcen-mansourah',
        titre: 'Ruines de Mansourah',
        tag: 'Site archéologique',
        emoji: '🏰',
        couleur: 'linear-gradient(135deg, #D4A574, #b8804e)',
        description: 'Les ruines de la ville mérinide de Mansourah offrent un panorama grandiose sur Tlemcen. Le minaret intact témoigne de la splendeur passée.',
        distance: '2 km du centre',
        unesco: false,
      },
      {
        id: 'tlemcen-foret',
        titre: 'Forêt de Tlemcen',
        tag: 'Nature',
        emoji: '🌲',
        couleur: 'linear-gradient(135deg, #52b788, #2A9D8F)',
        description: 'Vaste forêt de cèdres et de chênes-lièges au climat doux, ponctuée de cascades et de sources naturelles. Idéale pour la randonnée.',
        distance: 'Périphérie de Tlemcen',
        unesco: false,
      },
    ],
    logements: [
      {
        id: 'tlemcen-palais',
        type: 'habitant',
        titre: 'Palais Andalou – Suite Historique',
        lieu: 'Médina, Tlemcen',
        emoji: '🕌',
        couleur: 'linear-gradient(135deg, #2A9D8F, #E9C46A)',
        description: 'Séjour dans un palais arabo-andalou restauré avec zelliges, stuc et bois sculpté. Époustouflant.',
        commodites: ['WiFi', 'Hammam', 'Petit-déj'],
        rating: '★★★★★',
        avis: 72,
        prix: 100,
      },
      {
        id: 'tlemcen-hotel',
        type: 'hotel',
        titre: 'Hôtel Les Zianides',
        lieu: 'Centre, Tlemcen',
        emoji: '🏨',
        couleur: 'linear-gradient(135deg, #E9C46A, #c9a84a)',
        description: 'Hôtel 4 étoiles au cœur de Tlemcen. Décoration hispano-mauresque, piscine et restaurant gastronomique.',
        commodites: ['Piscine', 'Restaurant', 'Parking'],
        rating: '★★★★☆',
        avis: 221,
        prix: 95,
      },
    ],
  },
  /* ---- CONSTANTINE ---- */
  constantine: {
    nomAffiche: 'Constantine',
    description: 'La Ville des Ponts, suspendue sur les gorges du Rhumel depuis l\'Antiquité.',
    patrimoine: [
      {
        id: 'constantine-gorges',
        titre: 'Gorges du Rhumel & Ponts Suspendus',
        tag: 'Site naturel unique',
        emoji: '🌉',
        couleur: 'linear-gradient(135deg, #457B9D, #2d5a7a)',
        description: 'Constantine est construite sur un rocher escarpé traversé par les gorges profondes du Rhumel. Ses ponts suspendus vertigineux offrent des vues à couper le souffle.',
        distance: 'Centre de Constantine',
        unesco: false,
      },
      {
        id: 'constantine-palais',
        titre: 'Palais du Bey Ahmed',
        tag: 'Architecture ottomane',
        emoji: '🏯',
        couleur: 'linear-gradient(135deg, #E9C46A, #D4A017)',
        description: 'Construit au XIXe siècle, ce palais ottoman est un trésor d\'art décoratif mêlant influences turques, italiennes et mauresques.',
        distance: 'Vieille ville',
        unesco: false,
      },
    ],
    logements: [
      {
        id: 'constantine-hotel',
        type: 'hotel',
        titre: 'Hôtel Cirta – Vue sur les Gorges',
        lieu: 'Plateau du Mansourah, Constantine',
        emoji: '🌉',
        couleur: 'linear-gradient(135deg, #457B9D, #2d5a7a)',
        description: 'Hôtel panoramique avec vue directe sur les gorges du Rhumel et les ponts suspendus emblématiques.',
        commodites: ['WiFi', 'Restaurant', 'Vue panoramique'],
        rating: '★★★★☆',
        avis: 187,
        prix: 85,
      },
      {
        id: 'constantine-maison',
        type: 'habitant',
        titre: 'Maison Traditionnelle au Cœur de la Médina',
        lieu: 'Vieille Médina, Constantine',
        emoji: '🏛️',
        couleur: 'linear-gradient(135deg, #E07A5F, #c4614a)',
        description: 'Maison familiale authentique dans la vieille médina. Cuisine maison et immersion culturelle garanties.',
        commodites: ['Petit-déj', 'Cuisine partagée', 'WiFi'],
        rating: '★★★★★',
        avis: 29,
        prix: 45,
      },
    ],
  },
  /* ---- TASSILI ---- */
  tassili: {
    nomAffiche: 'Tassili n\'Ajjer',
    description: 'Le Musée à Ciel Ouvert du Sahara — sanctuaire préhistorique et paysage martien.',
    patrimoine: [
      {
        id: 'tassili-gravures',
        titre: 'Gravures Rupestres Préhistoriques',
        tag: 'Patrimoine UNESCO',
        emoji: '🦣',
        couleur: 'linear-gradient(135deg, #D4A574, #8B4513)',
        description: 'Plus de 15 000 gravures et peintures rupestres datant de 10 000 ans avant J.-C. témoignent d\'une époque où le Sahara était verdoyant. Un trésor de l\'humanité.',
        distance: 'Djanet (point d\'entrée)',
        unesco: true,
      },
      {
        id: 'tassili-erosion',
        titre: 'Forêt de Rochers Sculptés',
        tag: 'Géologie spectaculaire',
        emoji: '🏜️',
        couleur: 'linear-gradient(135deg, #E9C46A, #c9a84a)',
        description: 'Des millions d\'années d\'érosion éolienne ont façonné des formations rocheuses monumentales : arches, champignons de pierre et labyrinthes minéraux.',
        distance: 'Djanet – 3h en 4x4',
        unesco: false,
      },
      {
        id: 'tassili-coucher',
        titre: 'Coucher de Soleil sur l\'Erg',
        tag: 'Expérience unique',
        emoji: '🌅',
        couleur: 'linear-gradient(135deg, #E07A5F, #E9C46A)',
        description: 'Quand le soleil touche les dunes de sable doré du Tassili, le ciel se teinte d\'orange, de rose et de violet. Un spectacle inoubliable dans le silence du Sahara.',
        distance: 'Erg Admer',
        unesco: false,
      },
    ],
    logements: [
      {
        id: 'tassili-campement',
        type: 'habitant',
        titre: 'Campement Touareg Traditionnel',
        lieu: 'Désert Tassili, Djanet',
        emoji: '⛺',
        couleur: 'linear-gradient(135deg, #E9C46A, #E07A5F)',
        description: 'Nuit dans un campement nomade authentique sous un ciel étoilé exceptionnel. Thé touareg et musique berbère inclus.',
        commodites: ['Repas inclus', 'Guide', 'Étoiles'],
        rating: '★★★★★',
        avis: 41,
        prix: 80,
      },
      {
        id: 'tassili-hotel',
        type: 'hotel',
        titre: 'Hôtel Tidikelt – Djanet',
        lieu: 'Djanet, Tassili',
        emoji: '🏨',
        couleur: 'linear-gradient(135deg, #D4A574, #b8804e)',
        description: 'Hôtel confortable à Djanet, point de départ idéal pour vos excursions dans le Tassili n\'Ajjer.',
        commodites: ['WiFi', 'Restaurant', 'Excursions'],
        rating: '★★★★☆',
        avis: 98,
        prix: 65,
      },
    ],
  },
}; /* Fin VILLES_DATA */
/* ================================================================
   2. GESTION DE LA NAVBAR
================================================================ */
/**
 * Ajoute la classe "scrolled" à la navbar lors du défilement,
 * pour accentuer l'ombre et le fond.
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}
/**
 * Gère l'ouverture / fermeture du menu hamburger sur mobile.
 */
function initHamburger() {
  const btnHamburger = document.getElementById('btn-hamburger');
  const mobileMenu   = document.getElementById('mobile-menu');
  if (!btnHamburger || !mobileMenu) return;
  btnHamburger.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      btnHamburger.classList.remove('open');
      btnHamburger.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.remove('hidden');
      btnHamburger.classList.add('open');
      btnHamburger.setAttribute('aria-expanded', 'true');
    }
  });
  /* Ferme le menu si on clique en dehors */
  document.addEventListener('click', (e) => {
    if (!btnHamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      btnHamburger.classList.remove('open');
    }
  });
}
/* ================================================================
   3. SWITCH VOYAGEUR / HÔTE
================================================================ */
/** État courant du mode (false = Voyageur, true = Hôte) */
let modeHote = false;
/**
 * Initialise le bouton de basculement Voyageur ⇄ Hôte.
 * Gère également le bouton "Devenir Hôte" dans la section CTA.
 */
function initSwitchMode() {
  const btnSwitch   = document.getElementById('btn-switch-mode');
  const switchLabel = document.getElementById('switch-label');
  const switchIcon  = document.getElementById('switch-icon');
  const viewVoyageur = document.getElementById('view-voyageur');
  const viewHote     = document.getElementById('view-hote');
  const navVoyageur  = document.getElementById('nav-voyageur-links');
  const navHote      = document.getElementById('nav-hote-links');
  const btnDevenirHote = document.getElementById('btn-devenir-hote');
  if (!btnSwitch) return;
  /**
   * Bascule entre les deux vues et met à jour l'UI.
   */
  function toggleMode() {
    modeHote = !modeHote;
    if (modeHote) {
      /* === Passage en mode HÔTE === */
      viewVoyageur.classList.add('hidden');
      viewHote.classList.remove('hidden');
      navVoyageur.classList.add('hidden');
      navHote.classList.remove('hidden');
      switchLabel.textContent = 'Mode Voyageur';
      btnSwitch.classList.add('hote-mode');
      /* Changement d'icône */
      switchIcon.setAttribute('data-feather', 'map');
      feather.replace();
      /* Scroll vers le haut */
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      /* === Retour en mode VOYAGEUR === */
      viewVoyageur.classList.remove('hidden');
      viewHote.classList.add('hidden');
      navVoyageur.classList.remove('hidden');
      navHote.classList.add('hidden');
      switchLabel.textContent = 'Passer en Mode Hôte';
      btnSwitch.classList.remove('hote-mode');
      switchIcon.setAttribute('data-feather', 'home');
      feather.replace();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  btnSwitch.addEventListener('click', toggleMode);
  /* Bouton "Devenir Hôte" dans la section CTA */
  if (btnDevenirHote) {
    btnDevenirHote.addEventListener('click', () => {
      if (!modeHote) toggleMode();
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
/* ================================================================
   4. BARRE DE RECHERCHE & MISE À JOUR DYNAMIQUE
================================================================ */
/**
 * Ville actuellement sélectionnée (synchronisée avec le <select>).
 */
let villeActuelle = 'alger';
/**
 * Initialise tous les événements de la barre de recherche :
 * - changement de ville dans le <select>
 * - bouton "Explorer"
 * - tags de recherche rapide
 * - champs date et voyageurs (comportement simple)
 */
function initSearchBar() {
  const selectCity    = document.getElementById('select-city');
  const btnExplorer   = document.getElementById('btn-explorer');
  const quickTags     = document.querySelectorAll('.quick-tag');
  const inputDates    = document.getElementById('input-dates');
  const inputVoyageurs = document.getElementById('input-voyageurs');
  /* Valeurs par défaut */
  if (inputDates) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 3);
    const depart  = new Date(tomorrow);
    depart.setDate(tomorrow.getDate() + 7);
    const fmt = (d) => `${d.getDate()} ${d.toLocaleDateString('fr-FR', { month: 'short' })}`;
    inputDates.value = `${fmt(tomorrow)} – ${fmt(depart)}`;
  }
  if (inputVoyageurs) {
    inputVoyageurs.value = '2 Adultes';
  }
  /* Changer de ville via le select */
  if (selectCity) {
    selectCity.addEventListener('change', () => {
      villeActuelle = selectCity.value;
      updateContenuDynamique(villeActuelle);
    });
  }
  /* Bouton Explorer */
  if (btnExplorer) {
    btnExplorer.addEventListener('click', () => {
      if (selectCity) villeActuelle = selectCity.value;
      updateContenuDynamique(villeActuelle);
      /* Scroll doux vers la section patrimoine */
      const sectionPatrimoine = document.getElementById('section-patrimoine');
      if (sectionPatrimoine) {
        sectionPatrimoine.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
  /* Tags de recherche rapide */
  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const city = tag.dataset.city;
      if (!city) return;
      villeActuelle = city;
      if (selectCity) selectCity.value = city;
      updateContenuDynamique(city);
      /* Scroll vers le patrimoine */
      setTimeout(() => {
        const sectionPatrimoine = document.getElementById('section-patrimoine');
        if (sectionPatrimoine) {
          sectionPatrimoine.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  });
}
/**
 * Met à jour tous les contenus dynamiques pour une ville donnée :
 * - Titre de la section patrimoine
 * - Grille des lieux patrimoniaux
 * - Titre de la section hébergements
 * - Grille des hébergements
 *
 * @param {string} villeKey - Clé de la ville dans VILLES_DATA
 */
function updateContenuDynamique(villeKey) {
  const data = VILLES_DATA[villeKey];
  if (!data) {
    console.warn(`[Tahwissa] Aucune donnée pour la ville : ${villeKey}`);
    return;
  }
  /* Mise à jour des noms de ville dans les titres */
  const patrimoineCity = document.getElementById('patrimoine-city-name');
  const logementsCityEl = document.getElementById('logements-city-name');
  if (patrimoineCity) patrimoineCity.textContent = data.nomAffiche;
  if (logementsCityEl)  logementsCityEl.textContent = data.nomAffiche;
  /* Rendu des cartes */
  rendrePatrimoine(data.patrimoine);
  rendreLogements(data.logements, 'all');
  /* Réinitialiser le filtre actif sur "Tous" */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  const filterAll = document.getElementById('filter-all');
  if (filterAll) filterAll.classList.add('active');
}
/* ================================================================
   5. RENDU DU PATRIMOINE
================================================================ */
/**
 * Génère et injecte les cartes de lieux patrimoniaux dans la grille.
 *
 * @param {Array} lieux - Tableau de lieux patrimoniaux
 */
function rendrePatrimoine(lieux) {
  const grid = document.getElementById('patrimoine-grid');
  if (!grid) return;
  /* Vider la grille existante */
  grid.innerHTML = '';
  if (!lieux || lieux.length === 0) {
    grid.innerHTML = '<p style="color: var(--color-text-muted); text-align:center; padding: 2rem;">Aucun lieu patrimonial disponible pour cette ville.</p>';
    return;
  }
  /* Créer une carte pour chaque lieu */
  lieux.forEach((lieu, index) => {
    const carte = document.createElement('article');
    carte.classList.add('patrimoine-card', 'animate-in');
    carte.id = `patrimoine-card-${lieu.id}`;
    carte.style.animationDelay = `${index * 0.1}s`;
    carte.innerHTML = `
      <div class="patrimoine-card__img" style="background: ${lieu.couleur};">
        <span style="font-size: 4.5rem; z-index:1; position:relative;">${lieu.emoji}</span>
      </div>
      <div class="patrimoine-card__body">
        <span class="patrimoine-card__tag patrimoine-card__tag--patrimoine">
          ${lieu.unesco ? '🏅 ' : ''}${lieu.tag}
        </span>
        <h3 class="patrimoine-card__title">${lieu.titre}</h3>
        <p class="patrimoine-card__desc">${lieu.description}</p>
        <div class="patrimoine-card__footer">
          <span class="patrimoine-card__distance">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${lieu.distance}
          </span>
          ${lieu.unesco ? '<span class="patrimoine-card__unesco">🌍 Classé UNESCO</span>' : ''}
        </div>
      </div>
    `;
    grid.appendChild(carte);
  });
  /* Déclencher les animations d'entrée */
  setTimeout(() => observerAnimation(), 100);
}
/* ================================================================
   6. RENDU DES HÉBERGEMENTS & FILTRES
================================================================ */
/**
 * Liste interne des logements pour la ville courante,
 * permettant de refiltrer sans rechargement.
 */
let logementsCourants = [];
/**
 * Génère et injecte les cartes d'hébergements dans la grille.
 *
 * @param {Array}  logements - Tableau de logements
 * @param {string} filtre    - 'all' | 'hotel' | 'habitant'
 */
function rendreLogements(logements, filtre) {
  const grid = document.getElementById('logements-grid');
  if (!grid) return;
  /* Stocker pour le filtrage ultérieur */
  if (filtre === 'all') {
    logementsCourants = logements || [];
  }
  /* Filtrage */
  const listes = filtre === 'all'
    ? logementsCourants
    : logementsCourants.filter(l => l.type === filtre);
  /* Vider la grille */
  grid.innerHTML = '';
  if (!listes || listes.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 3rem; color: var(--color-text-muted);">
        <p style="font-size: 2rem; margin-bottom: 1rem;">🏡</p>
        <p>Aucun hébergement disponible avec ce filtre pour le moment.</p>
      </div>`;
    return;
  }
  listes.forEach((logement, index) => {
    const carte = document.createElement('article');
    carte.classList.add('logement-card', 'animate-in');
    carte.id = `logement-card-${logement.id}`;
    carte.dataset.type = logement.type;
    /* Labels des types */
    const typeLabel  = logement.type === 'hotel' ? '🏨 Hôtel Classique' : '🏠 Chez l\'Habitant';
    const typeCss    = logement.type === 'hotel' ? 'badge-type--hotel' : 'badge-type--habitant';
    /* Tags de commodités */
    const tagsHTML = logement.commodites
      .map(c => `<span class="logement-tag">${c}</span>`)
      .join('');
    carte.innerHTML = `
      <div class="logement-card__img" style="background: ${logement.couleur}; position: relative;">
        <span style="font-size: 4rem; z-index: 1; position: relative;">${logement.emoji}</span>
        <span class="badge-type ${typeCss}">${typeLabel}</span>
        <button class="logement-card__fav" aria-label="Ajouter aux favoris" data-id="${logement.id}">♡</button>
      </div>
      <div class="logement-card__body">
        <p class="logement-card__location">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${logement.lieu}
        </p>
        <h3 class="logement-card__title">${logement.titre}</h3>
        <p class="logement-card__desc">${logement.description}</p>
        <div class="logement-card__tags">${tagsHTML}</div>
        <div class="logement-card__footer">
          <div class="logement-card__rating">
            <span class="stars">${logement.rating}</span>
            <span class="avis-count">${logement.avis} avis</span>
          </div>
          <div class="logement-card__price">
            <span class="price">€${logement.prix} <small>/ nuit</small></span>
          </div>
        </div>
      </div>
      <button class="logement-card__btn" data-id="${logement.id}">Voir le logement</button>
    `;
    grid.appendChild(carte);
  });
  /* Attacher les événements favoris sur les nouvelles cartes */
  initFavoris();
  /* Animations d'entrée */
  setTimeout(() => observerAnimation(), 100);
}
/**
 * Initialise les boutons favoris sur les cartes de logements.
 */
function initFavoris() {
  const favorisSet = new Set();
  document.querySelectorAll('.logement-card__fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      if (favorisSet.has(id)) {
        favorisSet.delete(id);
        btn.textContent = '♡';
        btn.classList.remove('favoris');
        btn.setAttribute('aria-label', 'Ajouter aux favoris');
      } else {
        favorisSet.add(id);
        btn.textContent = '♥';
        btn.classList.add('favoris');
        btn.setAttribute('aria-label', 'Retirer des favoris');
        /* Petite animation */
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => { btn.style.transform = ''; }, 200);
      }
    });
  });
}
/**
 * Initialise les boutons de filtre de la section hébergements.
 */
function initFiltresLogements() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Supprimer la classe active de tous */
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      /* Appliquer le filtre */
      const filtre = btn.dataset.filter;
      rendreLogements(logementsCourants, filtre);
    });
  });
}
/* ================================================================
   7. COMPTEUR ANIMÉ (section statistiques)
================================================================ */
/**
 * Anime les chiffres des statistiques de 0 vers leur valeur cible.
 * Utilise requestAnimationFrame pour une animation fluide.
 */
function animerCompteurs() {
  const compteurs = document.querySelectorAll('.stat-item__number');
  compteurs.forEach(el => {
    const cible = parseFloat(el.dataset.target);
    const isDecimal = cible % 1 !== 0;
    const duree = 1800; // ms
    let depart = null;
    function step(timestamp) {
      if (!depart) depart = timestamp;
      const progress = Math.min((timestamp - depart) / duree, 1);
      /* Courbe d'accélération ease-out */
      const eased = 1 - Math.pow(1 - progress, 3);
      const courant = eased * cible;
      el.textContent = isDecimal
        ? courant.toFixed(1)
        : Math.floor(courant).toLocaleString('fr-FR');
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = isDecimal
          ? cible.toFixed(1)
          : cible.toLocaleString('fr-FR');
      }
    }
    requestAnimationFrame(step);
  });
}
/**
 * Lance l'animation des compteurs une seule fois,
 * lorsque la section des statistiques entre dans le viewport.
 */
function initCompteurs() {
  const statsBand = document.getElementById('stats-band');
  if (!statsBand) return;
  let animeLancee = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animeLancee) {
        animeLancee = true;
        animerCompteurs();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsBand);
}
/* ================================================================
   8. CAROUSEL DE TÉMOIGNAGES
================================================================ */
/** Index du témoignage actuellement affiché */
let indexTemoignage = 0;
/**
 * Initialise le carousel de témoignages :
 * - Navigation via les boutons dots
 * - Rotation automatique toutes les 6 secondes
 * - Pause au survol
 */
function initCarousel() {
  const temoignages  = document.querySelectorAll('.temoignage-card');
  const dots         = document.querySelectorAll('.carousel-dot');
  const carousel     = document.getElementById('temoignages-carousel');
  if (!temoignages.length || !dots.length) return;
  let intervalCarousel = null;
  /**
   * Affiche le témoignage à l'index donné.
   * @param {number} idx - Index cible
   */
  function afficherTemoignage(idx) {
    /* Masquer tous les témoignages */
    temoignages.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    /* Afficher le sélectionné */
    temoignages[idx].classList.add('active');
    dots[idx].classList.add('active');
    indexTemoignage = idx;
  }
  /* Clic sur les dots */
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      afficherTemoignage(idx);
      relancerTimer();
    });
  });
  /* Rotation automatique */
  function demarrerTimer() {
    intervalCarousel = setInterval(() => {
      const next = (indexTemoignage + 1) % temoignages.length;
      afficherTemoignage(next);
    }, 6000);
  }
  function relancerTimer() {
    clearInterval(intervalCarousel);
    demarrerTimer();
  }
  /* Pause au survol */
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(intervalCarousel));
    carousel.addEventListener('mouseleave', demarrerTimer);
  }
  demarrerTimer();
}
/* ================================================================
   9. WIDGET CHAT IA
================================================================ */
/**
 * Base de connaissances du chatbot Tawel.
 * Chaque entrée contient des mots-clés et une réponse associée.
 */
const CHAT_REPONSES = [
  {
    mots: ['alger', 'casbah', 'capitale'],
    reponse: `🏛️ **Itinéraire 3 jours à Alger :**\n\n**Jour 1 – La Casbah**\nMatinée : balade dans les ruelles de la Casbah UNESCO, visite du Palais des Raïs.\nAprès-midi : Musée des Beaux-Arts d'Alger.\nSoir : dîner sur le front de mer à Ain Benian.\n\n**Jour 2 – Alger la Blanche**\nBasilique Notre-Dame d'Afrique, Grande Poste, Jardin d'Essai.\n\n**Jour 3 – Excursion Tipaza**\nRuines romaines, plage de Rastoma, retour au coucher du soleil. 🌅`,
  },
  {
    mots: ['tipaza', 'ruines', 'romaine', 'antique'],
    reponse: `🏺 **Itinéraire Tipaza :**\n\n• Matin : Ruines romaines classées UNESCO (prévoir 2h)\n• Midi : Déjeuner de fruits de mer au bord de mer\n• Après-midi : Plage de Rastoma, eaux turquoise\n• Coucher de soleil : Tombeau de la Chrétienne\n\n💡 Conseil : venez tôt le matin pour éviter la chaleur et avoir les ruines pour vous seul !`,
  },
  {
    mots: ['tassili', 'sahara', 'désert', 'djanet', 'nomade'],
    reponse: `🏜️ **Explorer le Tassili n'Ajjer :**\n\n**J1 :** Arrivée Djanet, rencontre du guide touareg\n**J2-J4 :** Trek dans les gorges, gravures rupestres (10 000 ans !)\n**J5 :** Erg Admer – dunes d'or au coucher de soleil\n**J6 :** Retour et cérémonie du thé nomade\n\n⚠️ Réservez un guide local agréé obligatoire. Meilleure période : octobre à mars.`,
  },
  {
    mots: ['ghardaia', 'mzab', 'mozabite', 'désert'],
    reponse: `🕌 **Ghardaïa & la Pentapole du M'Zab :**\n\n• Visite guidée des 5 cités mozabites (UNESCO)\n• Marché traditionnel : tapis, dattes, épices\n• Promenade dans les palmeraies de l'Oued M'Zab\n• Coucher de soleil depuis la colline de Beni Isguen\n\n💡 Respectez les règles locales : tenue sobre et réservée recommandée.`,
  },
  {
    mots: ['tlemcen', 'mosquée', 'andalou', 'mauresque'],
    reponse: `🌺 **Tlemcen la Perle du Maghreb :**\n\n• Grande Mosquée (1082) : chef-d'œuvre almoravide\n• Ruines de Mansourah + minaret intact\n• Forêt de Tlemcen : randonnées et cascades\n• Artisanat : tapis et broderies Tlemcénois\n\n🎭 Ne manquez pas le Festival Culturel de Tlemcen en été !`,
  },
  {
    mots: ['constantine', 'pont', 'gorges', 'rhumel'],
    reponse: `🌉 **Constantine – La Ville des Ponts :**\n\nIncontournables :\n• Traversée des ponts suspendus au lever du soleil\n• Palais du Bey Ahmed (art ottoman magistral)\n• Musée Cirta\n• Marché couvert El Kantara\n• Vue sur les gorges du Rhumel depuis le Monument aux Morts\n\n💡 Partez tôt : la lumière du matin sur les gorges est magique !`,
  },
  {
    mots: ['restaurant', 'manger', 'cuisine', 'gastronomie', 'nourriture', 'food'],
    reponse: `🍽️ **Cuisine Algérienne à découvrir :**\n\n• **Couscous au poulet** : le classique incontournable\n• **Chorba frik** : soupe de blé concassé et mouton\n• **Bourak** : feuilletés croustillants à la viande\n• **Makroud** : gâteau de semoule à la datte\n• **Lben** : lait fermenté rafraîchissant\n\n📍 Demandez toujours la cuisine "chez l'habitant" via Tahwissa pour l'authenticité garantie !`,
  },
  {
    mots: ['activité', 'faire', 'divertissement', 'loisir', 'sortie'],
    reponse: `🎯 **Activités uniques en Algérie :**\n\n🏄 Plongée sous-marine à Annaba\n🧗 Escalade à Tikjda (Kabylie)\n🐪 Randonnée à dos de dromadaire dans l'Erg\n🎨 Cours de poterie berbère à Kabylie\n🎵 Concert de musique chaabi à Alger\n🏊 Thermes de Hammam Meskhoutine\n🍳 Cours de cuisine chez l'habitant\n\n💡 Réservez vos expériences sur Tahwissa pour profiter de guides locaux certifiés !`,
  },
  {
    mots: ['prix', 'budget', 'combien', 'coût', 'tarif'],
    reponse: `💰 **Budget voyage en Algérie :**\n\n**Économique :** ~30-50€/jour\n• Logement chez l'habitant : 30-60€/nuit\n• Repas locaux : 5-15€\n• Transport : 5-10€\n\n**Confort :** ~80-150€/jour\n• Hôtel 4* : 80-150€/nuit\n• Restaurant mid-range : 20-35€\n\n💡 Tahwissa vous garantit les meilleurs tarifs sans frais cachés !`,
  },
  {
    mots: ['bonjour', 'salut', 'hello', 'salam', 'bonsoir'],
    reponse: `🌿 Assalamu Alaikum et bienvenue sur Tahwissa ! Je suis Tawel, votre assistant de voyage.\n\nJe peux vous aider à :\n• 🗺️ Planifier votre itinéraire\n• 🏠 Trouver le logement idéal\n• 🍽️ Découvrir la gastronomie locale\n• 🎯 Réserver des activités uniques\n\nQuelle région d'Algérie souhaitez-vous explorer ?`,
  },
  {
    mots: ['merci', 'super', 'génial', 'parfait', 'excellent', 'top'],
    reponse: `🌟 Avec plaisir ! C'est exactement pour cela que nous existons.\n\nAvez-vous besoin d'autres informations sur :\n• Un autre itinéraire ?\n• Des logements chez l'habitant ?\n• Les meilleures expériences locales ?\n\nN'hésitez pas, je suis là ! 🌿`,
  },
  {
    mots: ['itinéraire', 'voyage', 'circuit', 'tour', 'planifier'],
    reponse: `🗺️ **Circuits populaires en Algérie :**\n\n**Circuit Nord (7j) :** Alger → Tipaza → Cherchell → Béjaïa → Kabylie\n**Circuit Sahara (10j) :** Ghardaïa → Tamanrasset → Djanet → Tassili\n**Circuit Ouest (5j) :** Tlemcen → Sidi Bel Abbès → Oran → Mostaganem\n**Circuit Est (6j) :** Constantine → Annaba → Skikda → Guelma\n\nQuel circuit vous intéresse ? Je peux vous donner plus de détails ! 🚗`,
  },
];
/**
 * Trouve la meilleure réponse du chatbot pour un message donné.
 * Compare les mots-clés du message avec la base de connaissances.
 *
 * @param {string} message - Message de l'utilisateur
 * @returns {string} - Réponse du bot
 */
function trouverReponseBot(message) {
  const msgLower = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  /* Cherche la meilleure correspondance par nombre de mots-clés trouvés */
  let meilleureReponse = null;
  let scoreMax = 0;
  CHAT_REPONSES.forEach(entry => {
    const score = entry.mots.filter(mot =>
      msgLower.includes(mot.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    ).length;
    if (score > scoreMax) {
      scoreMax = score;
      meilleureReponse = entry.reponse;
    }
  });
  /* Réponse par défaut si aucune correspondance */
  if (!meilleureReponse || scoreMax === 0) {
    meilleureReponse = `🤔 Je n'ai pas tout à fait compris votre demande.\n\nEssayez de me poser des questions sur :\n• **Alger**, **Tipaza**, **Ghardaïa**, **Tlemcen**, **Constantine**, **Tassili**\n• Des **restaurants** et la **gastronomie** locale\n• Des **activités** et divertissements\n• Votre **budget** de voyage\n• Des **itinéraires** et circuits\n\nJe suis là pour vous aider ! 🌿`;
  }
  return meilleureReponse;
}
/**
 * Formate et affiche un message dans le corps du chat.
 *
 * @param {string}  texte    - Contenu du message
 * @param {'bot'|'user'} type - Type d'expéditeur
 */
function afficherMessageChat(texte, type) {
  const chatBody = document.getElementById('chat-body');
  if (!chatBody) return;
  const msgEl = document.createElement('div');
  msgEl.classList.add('chat-msg', `chat-msg--${type}`);
  /* Formatage basique du markdown : **gras**, \n → <br> */
  const textFormate = texte
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  if (type === 'bot') {
    msgEl.innerHTML = `
      <div class="chat-msg__avatar" aria-hidden="true">🌿</div>
      <div class="chat-msg__bubble">${textFormate}</div>
    `;
  } else {
    msgEl.innerHTML = `
      <div class="chat-msg__bubble">${textFormate}</div>
    `;
  }
  chatBody.appendChild(msgEl);
  /* Scroll automatique vers le bas */
  chatBody.scrollTop = chatBody.scrollHeight;
}
/**
 * Affiche l'indicateur "Tawel est en train d'écrire..."
 * et le retire après un délai, puis affiche la vraie réponse.
 *
 * @param {string} reponse - Texte de la réponse à afficher après délai
 */
function afficherTypingEtReponse(reponse) {
  const chatBody = document.getElementById('chat-body');
  if (!chatBody) return;
  /* Créer l'indicateur de frappe */
  const typingEl = document.createElement('div');
  typingEl.classList.add('chat-msg', 'chat-msg--bot');
  typingEl.id = 'typing-indicator-msg';
  typingEl.innerHTML = `
    <div class="chat-msg__avatar" aria-hidden="true">🌿</div>
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatBody.appendChild(typingEl);
  chatBody.scrollTop = chatBody.scrollHeight;
  /* Délai simulé (1.2 à 2 secondes selon longueur) */
  const delai = Math.min(1200 + reponse.length * 10, 2200);
  setTimeout(() => {
    /* Supprimer l'indicateur */
    const indicateur = document.getElementById('typing-indicator-msg');
    if (indicateur) indicateur.remove();
    /* Afficher la vraie réponse */
    afficherMessageChat(reponse, 'bot');
  }, delai);
}
/**
 * Initialise le widget chat IA complet :
 * - Ouverture/fermeture de la fenêtre
 * - Envoi de messages
 * - Suggestions rapides
 * - Message de bienvenue initial
 */
function initChat() {
  const chatBubble    = document.getElementById('chat-bubble');
  const chatWindow    = document.getElementById('chat-window');
  const chatCloseBtn  = document.getElementById('chat-close-btn');
  const chatInput     = document.getElementById('chat-input');
  const chatSendBtn   = document.getElementById('chat-send-btn');
  const chatNotifDot  = document.getElementById('chat-notif-dot');
  const chatTooltip   = document.getElementById('chat-tooltip');
  const suggestions   = document.querySelectorAll('.chat-suggestion-btn');
  if (!chatBubble || !chatWindow) return;
  let chatOuvert = false;
  let messagesBienvenueAffiches = false;
  /**
   * Ouvre ou ferme la fenêtre de chat.
   */
  function toggleChat() {
    chatOuvert = !chatOuvert;
    if (chatOuvert) {
      chatWindow.classList.add('open');
      chatBubble.setAttribute('aria-expanded', 'true');
      chatTooltip.classList.add('hidden-tooltip');
      /* Masquer le badge de notification */
      if (chatNotifDot) chatNotifDot.style.display = 'none';
      /* Afficher les messages de bienvenue la première fois */
      if (!messagesBienvenueAffiches) {
        messagesBienvenueAffiches = true;
        setTimeout(() => {
          afficherMessageChat(
            '🌿 Assalamu Alaikum ! Je suis **Tawel**, votre assistant de voyage Tahwissa.\n\nJe peux vous aider à planifier vos itinéraires, découvrir des hébergements authentiques et les meilleures expériences locales en Algérie.\n\nOù souhaitez-vous aller ?',
            'bot'
          );
        }, 300);
      }
      /* Focus sur le champ de saisie */
      setTimeout(() => {
        if (chatInput) chatInput.focus();
      }, 400);
    } else {
      chatWindow.classList.remove('open');
      chatBubble.setAttribute('aria-expanded', 'false');
    }
  }
  /* Événements d'ouverture */
  chatBubble.addEventListener('click', toggleChat);
  chatBubble.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleChat();
    }
  });
  /* Fermeture */
  if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', () => {
      chatOuvert = true; // force le toggle vers fermeture
      toggleChat();
    });
  }
  /**
   * Envoie le message de l'utilisateur et obtient une réponse.
   */
  function envoyerMessage() {
    const msg = chatInput ? chatInput.value.trim() : '';
    if (!msg) return;
    /* Afficher le message utilisateur */
    afficherMessageChat(msg, 'user');
    chatInput.value = '';
    /* Trouver et afficher la réponse du bot avec délai */
    const reponse = trouverReponseBot(msg);
    afficherTypingEtReponse(reponse);
  }
  /* Envoi par bouton */
  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', envoyerMessage);
  }
  /* Envoi par touche Entrée */
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        envoyerMessage();
      }
    });
  }
  /* Boutons de suggestions rapides */
  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.msg;
      if (!msg) return;
      if (!chatOuvert) toggleChat();
      setTimeout(() => {
        afficherMessageChat(msg, 'user');
        const reponse = trouverReponseBot(msg);
        afficherTypingEtReponse(reponse);
      }, chatOuvert ? 0 : 400);
    });
  });
  /* Tooltip auto-masqué après 5 secondes */
  setTimeout(() => {
    if (chatTooltip && !chatOuvert) {
      chatTooltip.classList.add('hidden-tooltip');
    }
  }, 5000);
}
/* ================================================================
   10. FORMULAIRE HÔTE (Validation + Revenus estimés)
================================================================ */
/**
 * Initialise la validation du formulaire de proposition de logement
 * et le calcul dynamique des revenus estimés.
 */
function initFormulaireHote() {
  const form         = document.getElementById('hote-form');
  const inputPrix    = document.getElementById('input-prix');
  const revPrixEl    = document.getElementById('rev-prix');
  const revMensuelEl = document.getElementById('rev-mensuel');
  const descTextarea = document.getElementById('textarea-description');
  const descCounter  = document.getElementById('desc-counter');
  /* ---- Compteur de caractères de la description ---- */
  if (descTextarea && descCounter) {
    descTextarea.addEventListener('input', () => {
      const count = descTextarea.value.length;
      descCounter.textContent = count;
      /* Changer la couleur quand on approche de la limite */
      if (count > 450) {
        descCounter.style.color = 'var(--color-danger)';
      } else if (count > 350) {
        descCounter.style.color = 'var(--color-terracotta)';
      } else {
        descCounter.style.color = '';
      }
    });
  }
  /* ---- Calcul des revenus estimés en temps réel ---- */
  if (inputPrix) {
    inputPrix.addEventListener('input', () => {
      const prix = parseFloat(inputPrix.value) || 0;
      const tauxOccupation = 0.65;    // 65%
      const fraisPlateforme = 0.08;   // 8%
      const joursParMois = 30;
      const revenuBrut    = prix * tauxOccupation * joursParMois;
      const revenuNet     = revenuBrut * (1 - fraisPlateforme);
      if (revPrixEl)    revPrixEl.textContent    = `€${prix} / nuit`;
      if (revMensuelEl) revMensuelEl.textContent = `€${Math.round(revenuNet)} / mois`;
    });
  }
  /* ---- Validation du formulaire ---- */
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valide = true;
    /* Règles de validation */
    const validations = [
      {
        champ: document.getElementById('input-titre'),
        erreurId: 'error-titre',
        regles: [
          { test: v => v.trim().length >= 10, msg: 'Le titre doit contenir au moins 10 caractères.' },
          { test: v => v.trim().length <= 80,  msg: 'Le titre ne peut pas dépasser 80 caractères.' },
        ],
      },
      {
        champ: document.getElementById('input-localisation'),
        erreurId: 'error-localisation',
        regles: [
          { test: v => v.trim().length >= 5, msg: 'Veuillez indiquer une localisation précise.' },
        ],
      },
      {
        champ: document.getElementById('select-type'),
        erreurId: 'error-type',
        regles: [
          { test: v => v !== '', msg: 'Veuillez choisir un type de logement.' },
        ],
      },
      {
        champ: document.getElementById('input-prix'),
        erreurId: 'error-prix',
        regles: [
          { test: v => v && parseFloat(v) >= 5,    msg: 'Le prix minimum est de 5€ / nuit.' },
          { test: v => v && parseFloat(v) <= 5000, msg: 'Le prix maximum est de 5 000€ / nuit.' },
        ],
      },
      {
        champ: document.getElementById('textarea-description'),
        erreurId: 'error-description',
        regles: [
          { test: v => v.trim().length >= 50, msg: 'La description doit contenir au moins 50 caractères.' },
        ],
      },
    ];
    /* Appliquer chaque règle */
    validations.forEach(({ champ, erreurId, regles }) => {
      if (!champ) return;
      const erreurEl = document.getElementById(erreurId);
      let erreurMsg = '';
      /* Tester toutes les règles pour ce champ */
      for (const regle of regles) {
        if (!regle.test(champ.value)) {
          erreurMsg = regle.msg;
          break;
        }
      }
      if (erreurMsg) {
        valide = false;
        champ.classList.add('error');
        if (erreurEl) {
          erreurEl.textContent = erreurMsg;
          erreurEl.classList.add('visible');
        }
      } else {
        champ.classList.remove('error');
        if (erreurEl) {
          erreurEl.textContent = '';
          erreurEl.classList.remove('visible');
        }
      }
    });
    /* Si valide : afficher la modal de confirmation */
    if (valide) {
      afficherModal(
        '✅',
        'Annonce soumise avec succès !',
        'Notre équipe va examiner votre annonce dans les prochaines 24–48 heures. Vous recevrez une notification par e-mail dès validation.'
      );
      /* Réinitialiser le formulaire */
      form.reset();
      if (descCounter) descCounter.textContent = '0';
      if (revPrixEl)    revPrixEl.textContent    = '€0 / nuit';
      if (revMensuelEl) revMensuelEl.textContent = '€0 / mois';
    } else {
      /* Scroll vers la première erreur */
      const premierErreur = form.querySelector('.form-input.error');
      if (premierErreur) {
        premierErreur.scrollIntoView({ behavior: 'smooth', block: 'center' });
        premierErreur.focus();
      }
    }
  });
  /* Effacer les erreurs à la saisie */
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errId = input.id.replace('input-', 'error-')
                            .replace('select-', 'error-')
                            .replace('textarea-', 'error-');
      const errEl = document.getElementById(errId);
      if (errEl) {
        errEl.textContent = '';
        errEl.classList.remove('visible');
      }
    });
  });
}
/* ================================================================
   11. MODAL DE CONFIRMATION
================================================================ */
/**
 * Affiche la modal de confirmation avec icône, titre et description.
 *
 * @param {string} icone       - Emoji / icône à afficher
 * @param {string} titre       - Titre du message
 * @param {string} description - Texte descriptif
 */
function afficherModal(icone, titre, description) {
  const overlay  = document.getElementById('modal-overlay');
  const modalIcon  = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc  = document.getElementById('modal-desc');
  if (!overlay) return;
  if (modalIcon)  modalIcon.textContent  = icone;
  if (modalTitle) modalTitle.textContent = titre;
  if (modalDesc)  modalDesc.textContent  = description;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Empêcher le scroll du fond
}
/**
 * Ferme la modal de confirmation.
 */
function fermerModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.add('hidden');
  document.body.style.overflow = '';
}
/**
 * Initialise les événements de la modal.
 */
function initModal() {
  const closeBtn = document.getElementById('modal-close-btn');
  const overlay  = document.getElementById('modal-overlay');
  if (closeBtn) closeBtn.addEventListener('click', fermerModal);
  /* Fermer en cliquant sur l'overlay */
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) fermerModal();
    });
  }
  /* Fermer avec la touche Echap */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fermerModal();
  });
}
/* ================================================================
   12. BOUTON RETOUR EN HAUT
================================================================ */
/**
 * Initialise le bouton "Retour en haut de page" :
 * - Apparaît après 300px de défilement
 * - Scroll doux vers le haut au clic
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
/* ================================================================
   13. ANIMATIONS D'ENTRÉE (Intersection Observer)
================================================================ */
/**
 * Observe les éléments avec la classe "animate-in" et les anime
 * dès qu'ils entrent dans le viewport.
 * Appelée après chaque rendu dynamique.
 */
function observerAnimation() {
  const elements = document.querySelectorAll('.animate-in:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });
  elements.forEach(el => observer.observe(el));
}
/**
 * Applique la classe "animate-in" aux sections principales
 * pour qu'elles s'animent à l'entrée dans le viewport.
 */
function initAnimations() {
  /* Animer les sections d'expériences et témoignages */
  const selecteurs = [
    '.experience-card',
    '.temoignage-card',
    '.cta-hote-card',
    '.section__header',
    '.stats-band',
  ];
  selecteurs.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('animate-in')) {
        el.classList.add('animate-in');
      }
    });
  });
  observerAnimation();
}
/* ================================================================
   14. INITIALISATION GLOBALE
================================================================ */
/**
 * Point d'entrée principal.
 * Appelé au chargement du DOM.
 */
function init() {
  /* Charger le contenu dynamique initial (ville par défaut : Alger) */
  const dataInitiale = VILLES_DATA[villeActuelle];
  if (dataInitiale) {
    rendrePatrimoine(dataInitiale.patrimoine);
    rendreLogements(dataInitiale.logements, 'all');
  }
  /* Initialiser tous les modules */
  initNavbar();
  initHamburger();
  initSwitchMode();
  initSearchBar();
  initFiltresLogements();
  initCompteurs();
  initCarousel();
  initChat();
  initFormulaireHote();
  initModal();
  initBackToTop();
  initAnimations();
  console.log('✅ Tahwissa – Application initialisée avec succès !');
}
/* Lancer l'initialisation après chargement complet du DOM */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  /* Le DOM est déjà chargé (cas où le script est en bas du body) */
  init();
}
