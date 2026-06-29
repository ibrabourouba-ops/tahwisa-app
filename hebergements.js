// ================================================================
// TAHWISSA – Hébergements Page
// Fichier : hebergements.js
// Description : Gestion des filtres, pagination et cartes dynamiques
// ================================================================

// Données des hébergements
const hebergements = [
  {
    id: 1,
    name: "Riad Amira",
    host: "Amira Ben",
    wilaya: "Alger",
    region: "Casbah",
    type: "riad",
    price: 85,
    rating: 4.8,
    reviews: 156,
    guests: 4,
    image: "🏠",
    description: "Magnifique riad traditionnel avec patio d'eau",
    amenities: ["wifi", "kitchen", "ac"],
    amenitiesText: "Wi-Fi, Cuisine, Clim"
  },
  {
    id: 2,
    name: "Gîte de la Méditerranée",
    host: "Mohamed K.",
    wilaya: "Tipaza",
    region: "Côte",
    type: "gite",
    price: 65,
    rating: 4.6,
    reviews: 89,
    guests: 5,
    image: "🌊",
    description: "Maison côtière avec terrasse panoramique",
    amenities: ["wifi", "parking", "garden"],
    amenitiesText: "Wi-Fi, Parking, Jardin"
  },
  {
    id: 3,
    name: "Maison Traditionnelle Ghardaia",
    host: "Zahra H.",
    wilaya: "Ghardaïa",
    region: "Vallée du Mzab",
    type: "traditional",
    price: 55,
    rating: 4.9,
    reviews: 203,
    guests: 6,
    image: "🏜️",
    description: "Authentique maison traditionnelle mozabite",
    amenities: ["kitchen", "garden", "ac"],
    amenitiesText: "Cuisine, Jardin, Clim"
  },
  {
    id: 4,
    name: "Villa Oasis",
    host: "Rachid S.",
    wilaya: "Oran",
    region: "Plateau",
    type: "villa",
    price: 120,
    rating: 4.5,
    reviews: 67,
    guests: 8,
    image: "🌴",
    description: "Villa luxueuse avec piscine et vue dégagée",
    amenities: ["wifi", "pool", "parking", "kitchen"],
    amenitiesText: "Wi-Fi, Piscine, Parking, Cuisine"
  },
  {
    id: 5,
    name: "Appartement Constantine Historic",
    host: "Leila M.",
    wilaya: "Constantine",
    region: "Médina",
    type: "apartment",
    price: 75,
    rating: 4.7,
    reviews: 124,
    guests: 3,
    image: "🌉",
    description: "Appart moderne en plein cœur de la médina",
    amenities: ["wifi", "ac"],
    amenitiesText: "Wi-Fi, Climatisation"
  },
  {
    id: 6,
    name: "Maison Kabylie avec Vue",
    host: "Yacine T.",
    wilaya: "Kabylie",
    region: "Montagne",
    type: "maison",
    price: 60,
    rating: 4.8,
    reviews: 95,
    guests: 5,
    image: "⛰️",
    description: "Maison chaleureuse avec vue sur les montagnes",
    amenities: ["kitchen", "wifi", "garden"],
    amenitiesText: "Cuisine, Wi-Fi, Jardin"
  },
  {
    id: 7,
    name: "Riad Tlemcen El Andalus",
    host: "Fatima Z.",
    wilaya: "Tlemcen",
    region: "Médina",
    type: "riad",
    price: 90,
    rating: 4.6,
    reviews: 72,
    guests: 6,
    image: "🎨",
    description: "Riad andalous avec décoration authentique",
    amenities: ["wifi", "ac", "kitchen", "garden"],
    amenitiesText: "Wi-Fi, Clim, Cuisine, Jardin"
  },
  {
    id: 8,
    name: "Gîte Tassili Aventure",
    host: "Ali D.",
    wilaya: "Tassili n'Ajjer",
    region: "Plateau",
    type: "gite",
    price: 50,
    rating: 4.9,
    reviews: 187,
    guests: 4,
    image: "🏜️",
    description: "Point de départ idéal pour explorer Tassili",
    amenities: ["kitchen", "wifi"],
    amenitiesText: "Cuisine, Wi-Fi"
  },
  {
    id: 9,
    name: "Villa Senteurs d'Alger",
    host: "Samira K.",
    wilaya: "Alger",
    region: "Hydra",
    type: "villa",
    price: 150,
    rating: 4.9,
    reviews: 234,
    guests: 8,
    image: "🏛️",
    description: "Villa de prestige avec jardin aromatique",
    amenities: ["wifi", "pool", "ac", "kitchen", "parking"],
    amenitiesText: "Wi-Fi, Piscine, Clim, Cuisine, Parking"
  },
  {
    id: 10,
    name: "Gîte Côtier Tipaza",
    host: "Nabil R.",
    wilaya: "Tipaza",
    region: "Chenoua",
    type: "gite",
    price: 70,
    rating: 4.5,
    reviews: 91,
    guests: 4,
    image: "🌴",
    description: "Petit gîte douillet en bordure de mer",
    amenities: ["wifi", "ac", "garden"],
    amenitiesText: "Wi-Fi, Clim, Jardin"
  },
  {
    id: 11,
    name: "Maison Artisans Ghardaia",
    host: "Hadj M.",
    wilaya: "Ghardaïa",
    region: "Béniaoun",
    type: "maison",
    price: 45,
    rating: 4.7,
    reviews: 108,
    guests: 5,
    image: "🎭",
    description: "Maison chez un artisan traditionnel",
    amenities: ["kitchen", "garden"],
    amenitiesText: "Cuisine, Jardin"
  },
  {
    id: 12,
    name: "Riad Oran Ocean",
    host: "Latifa W.",
    wilaya: "Oran",
    region: "Centro",
    type: "riad",
    price: 95,
    rating: 4.6,
    reviews: 76,
    guests: 6,
    image: "🌊",
    description: "Riad avec vue sur la baie d'Oran",
    amenities: ["wifi", "ac", "kitchen"],
    amenitiesText: "Wi-Fi, Clim, Cuisine"
  },
  {
    id: 13,
    name: "Aparthotel Constantine",
    host: "Karim B.",
    wilaya: "Constantine",
    region: "Cité",
    type: "apartment",
    price: 68,
    rating: 4.4,
    reviews: 54,
    guests: 4,
    image: "🏢",
    description: "Logement avec services d'hôtel 3 étoiles",
    amenities: ["wifi", "ac", "parking"],
    amenitiesText: "Wi-Fi, Clim, Parking"
  },
  {
    id: 14,
    name: "Maison Kabylie Famille",
    host: "Nassira H.",
    wilaya: "Kabylie",
    region: "Tizi-Ouzou",
    type: "maison",
    price: 55,
    rating: 4.8,
    reviews: 142,
    guests: 6,
    image: "👨‍👩‍👧‍👦",
    description: "Maison familiale avec ambiance chaleureuse",
    amenities: ["wifi", "kitchen", "garden", "ac"],
    amenitiesText: "Wi-Fi, Cuisine, Jardin, Clim"
  },
  {
    id: 15,
    name: "Villa Tlemcen Prestige",
    host: "Djamila R.",
    wilaya: "Tlemcen",
    region: "El-Ourit",
    type: "villa",
    price: 140,
    rating: 4.7,
    reviews: 98,
    guests: 10,
    image: "👑",
    description: "Villa d'exception avec tous les équipements",
    amenities: ["wifi", "pool", "ac", "kitchen", "parking", "garden"],
    amenitiesText: "Wi-Fi, Piscine, Clim, Cuisine, Parking, Jardin"
  },
  {
    id: 16,
    name: "Gîte Tassili Nomade",
    host: "Ahmed M.",
    wilaya: "Tassili n'Ajjer",
    region: "Djanet",
    type: "gite",
    price: 55,
    rating: 4.9,
    reviews: 211,
    guests: 3,
    image: "🐪",
    description: "Gîte authentique dans les dunes",
    amenities: ["kitchen"],
    amenitiesText: "Cuisine"
  },
  {
    id: 17,
    name: "Riad Alger Luxury",
    host: "Nadia K.",
    wilaya: "Alger",
    region: "Bab El-Oued",
    type: "riad",
    price: 125,
    rating: 4.9,
    reviews: 289,
    guests: 7,
    image: "💎",
    description: "Riad luxe avec spa et restaurant",
    amenities: ["wifi", "pool", "ac", "kitchen", "parking"],
    amenitiesText: "Wi-Fi, Piscine, Clim, Cuisine, Parking"
  },
  {
    id: 18,
    name: "Maison Tipaza Bohème",
    host: "Souhila L.",
    wilaya: "Tipaza",
    region: "Sidi-Amar",
    type: "maison",
    price: 80,
    rating: 4.6,
    reviews: 76,
    guests: 4,
    image: "🎨",
    description: "Maison bohème avec studio d'art",
    amenities: ["wifi", "kitchen", "garden", "ac"],
    amenitiesText: "Wi-Fi, Cuisine, Jardin, Clim"
  },
  {
    id: 19,
    name: "Gîte Oran Familial",
    host: "Mohammed D.",
    wilaya: "Oran",
    region: "Sidi-El-Houari",
    type: "gite",
    price: 60,
    rating: 4.5,
    reviews: 84,
    guests: 5,
    image: "👨‍👩‍👧",
    description: "Petit gîte accueillant pour familles",
    amenities: ["wifi", "kitchen", "garden"],
    amenitiesText: "Wi-Fi, Cuisine, Jardin"
  },
  {
    id: 20,
    name: "Villa Constantine Moderne",
    host: "Zahra B.",
    wilaya: "Constantine",
    region: "Sidi-M'Cid",
    type: "villa",
    price: 130,
    rating: 4.7,
    reviews: 103,
    guests: 8,
    image: "🏗️",
    description: "Villa contemporaine avec vue sur les gorges",
    amenities: ["wifi", "pool", "ac", "kitchen", "parking"],
    amenitiesText: "Wi-Fi, Piscine, Clim, Cuisine, Parking"
  },
  {
    id: 21,
    name: "Riad Kabylie Montagne",
    host: "Massinissa T.",
    wilaya: "Kabylie",
    region: "Béjaïa",
    type: "riad",
    price: 70,
    rating: 4.8,
    reviews: 165,
    guests: 5,
    image: "⛰️",
    description: "Gîte d'altitude avec vue panoramique",
    amenities: ["wifi", "kitchen", "garden", "ac"],
    amenitiesText: "Wi-Fi, Cuisine, Jardin, Clim"
  },
  {
    id: 22,
    name: "Maison Ghardaia Oasis",
    host: "Faïza Y.",
    wilaya: "Ghardaïa",
    region: "Melika",
    type: "maison",
    price: 50,
    rating: 4.6,
    reviews: 67,
    guests: 4,
    image: "🌴",
    description: "Maison au cœur de l'oasis",
    amenities: ["kitchen", "garden"],
    amenitiesText: "Cuisine, Jardin"
  },
  {
    id: 23,
    name: "Appartement Tlemcen Boutique",
    host: "Hassan K.",
    wilaya: "Tlemcen",
    region: "Sidi-Boumediene",
    type: "apartment",
    price: 85,
    rating: 4.5,
    reviews: 71,
    guests: 3,
    image: "🏛️",
    description: "Petit appartement raffiné proche mosquée",
    amenities: ["wifi", "ac"],
    amenitiesText: "Wi-Fi, Climatisation"
  },
  {
    id: 24,
    name: "Gîte Tassili Expérience",
    host: "Ibrahim R.",
    wilaya: "Tassili n'Ajjer",
    region: "Tamanrasset",
    type: "gite",
    price: 65,
    rating: 4.8,
    reviews: 156,
    guests: 4,
    image: "🏜️",
    description: "Gîte avec guide excursions incluses",
    amenities: ["kitchen", "wifi"],
    amenitiesText: "Cuisine, Wi-Fi"
  },
  {
    id: 25,
    name: "Villa Alger Jardin",
    host: "Carolyne M.",
    wilaya: "Alger",
    region: "Cheraga",
    type: "villa",
    price: 110,
    rating: 4.6,
    reviews: 89,
    guests: 6,
    image: "🌺",
    description: "Villa avec grand jardin méditerranéen",
    amenities: ["wifi", "pool", "ac", "kitchen", "garden"],
    amenitiesText: "Wi-Fi, Piscine, Clim, Cuisine, Jardin"
  },
  {
    id: 26,
    name: "Riad Tipaza Patrimoine",
    host: "Salim Z.",
    wilaya: "Tipaza",
    region: "Ruins",
    type: "riad",
    price: 95,
    rating: 4.7,
    reviews: 112,
    guests: 5,
    image: "🏛️",
    description: "Riad près des ruines romaines",
    amenities: ["wifi", "kitchen", "ac"],
    amenitiesText: "Wi-Fi, Cuisine, Climatisation"
  },
  {
    id: 27,
    name: "Maison Oran Vue Mer",
    host: "Evelyne W.",
    wilaya: "Oran",
    region: "Les Andalouses",
    type: "maison",
    price: 100,
    rating: 4.8,
    reviews: 126,
    guests: 6,
    image: "🌊",
    description: "Maison avec vue directe sur la baie",
    amenities: ["wifi", "ac", "kitchen", "garden"],
    amenitiesText: "Wi-Fi, Clim, Cuisine, Jardin"
  },
  {
    id: 28,
    name: "Gîte Constantine Pont",
    host: "Lyes D.",
    wilaya: "Constantine",
    region: "Souika",
    type: "gite",
    price: 55,
    rating: 4.4,
    reviews: 48,
    guests: 3,
    image: "🌉",
    description: "Gîte avec vue sur le pont suspendu",
    amenities: ["wifi", "ac"],
    amenitiesText: "Wi-Fi, Climatisation"
  },
  {
    id: 29,
    name: "Villa Kabylie Etoilée",
    host: "Khadija H.",
    wilaya: "Kabylie",
    region: "Timizart",
    type: "villa",
    price: 115,
    rating: 4.7,
    reviews: 94,
    guests: 8,
    image: "⭐",
    description: "Villa vue montagne avec étoiles la nuit",
    amenities: ["wifi", "pool", "ac", "kitchen", "garden"],
    amenitiesText: "Wi-Fi, Piscine, Clim, Cuisine, Jardin"
  },
  {
    id: 30,
    name: "Riad Ghardaia Tradition",
    host: "Mohamed H.",
    wilaya: "Ghardaïa",
    region: "El-Atteuf",
    type: "riad",
    price: 60,
    rating: 4.8,
    reviews: 198,
    guests: 6,
    image: "🕌",
    description: "Riad traditionnel mozabite authentique",
    amenities: ["kitchen", "ac"],
    amenitiesText: "Cuisine, Climatisation"
  },
  {
    id: 31,
    name: "Appartement Alger Prestige",
    host: "Simone B.",
    wilaya: "Alger",
    region: "Kouba",
    type: "apartment",
    price: 78,
    rating: 4.6,
    reviews: 82,
    guests: 3,
    image: "🏢",
    description: "Appartement spacieux bien équipé",
    amenities: ["wifi", "ac", "parking"],
    amenitiesText: "Wi-Fi, Clim, Parking"
  },
  {
    id: 32,
    name: "Gîte Tlemcen Artisan",
    host: "Madina K.",
    wilaya: "Tlemcen",
    region: "Sidi-Moussa",
    type: "gite",
    price: 52,
    rating: 4.5,
    reviews: 63,
    guests: 3,
    image: "🎨",
    description: "Gîte chez céramiste artisan local",
    amenities: ["wifi", "kitchen"],
    amenitiesText: "Wi-Fi, Cuisine"
  },
  {
    id: 33,
    name: "Villa Tassili Luxe",
    host: "Tamanrasset N.",
    wilaya: "Tassili n'Ajjer",
    region: "Arakou",
    type: "villa",
    price: 125,
    rating: 4.9,
    reviews: 134,
    guests: 8,
    image: "👑",
    description: "Villa de luxe en plein cœur du désert",
    amenities: ["wifi", "ac", "kitchen", "pool"],
    amenitiesText: "Wi-Fi, Clim, Cuisine, Piscine"
  },
  {
    id: 34,
    name: "Maison Tipaza Artiste",
    host: "Pierre L.",
    wilaya: "Tipaza",
    region: "Gouraya",
    type: "maison",
    price: 85,
    rating: 4.7,
    reviews: 97,
    guests: 4,
    image: "🎭",
    description: "Maison d'artiste avec galerie",
    amenities: ["wifi", "kitchen", "garden", "ac"],
    amenitiesText: "Wi-Fi, Cuisine, Jardin, Clim"
  },
  {
    id: 35,
    name: "Riad Oran Musicien",
    host: "Karim M.",
    wilaya: "Oran",
    region: "Medina Jdida",
    type: "riad",
    price: 88,
    rating: 4.5,
    reviews: 79,
    guests: 5,
    image: "🎵",
    description: "Riad avec salle de musique traditionnelle",
    amenities: ["wifi", "kitchen", "ac"],
    amenitiesText: "Wi-Fi, Cuisine, Climatisation"
  },
  {
    id: 36,
    name: "Gîte Constantine Familia",
    host: "Aïcha D.",
    wilaya: "Constantine",
    region: "El-Merja",
    type: "gite",
    price: 62,
    rating: 4.6,
    reviews: 73,
    guests: 4,
    image: "👨‍👩‍👧‍👦",
    description: "Gîte accueillant pour familles",
    amenities: ["wifi", "kitchen", "garden"],
    amenitiesText: "Wi-Fi, Cuisine, Jardin"
  },
  {
    id: 37,
    name: "Villa Kabylie Tradition",
    host: "Ouardi T.",
    wilaya: "Kabylie",
    region: "Adekar",
    type: "villa",
    price: 105,
    rating: 4.7,
    reviews: 108,
    guests: 7,
    image: "🏡",
    description: "Villa traditionnelle kabyle bien aménagée",
    amenities: ["wifi", "kitchen", "ac", "garden"],
    amenitiesText: "Wi-Fi, Cuisine, Clim, Jardin"
  },
  {
    id: 38,
    name: "Appartement Ghardaia Moderne",
    host: "Hocine Y.",
    wilaya: "Ghardaïa",
    region: "Guerrara",
    type: "apartment",
    price: 58,
    rating: 4.4,
    reviews: 52,
    guests: 3,
    image: "🏢",
    description: "Appartement moderne dans oasis",
    amenities: ["wifi", "ac"],
    amenitiesText: "Wi-Fi, Climatisation"
  },
  {
    id: 39,
    name: "Maison Tlemcen Charme",
    host: "Yasmine R.",
    wilaya: "Tlemcen",
    region: "Mansourah",
    type: "maison",
    price: 72,
    rating: 4.8,
    reviews: 119,
    guests: 4,
    image: "🏘️",
    description: "Maison avec charme traditionnel",
    amenities: ["wifi", "kitchen", "garden"],
    amenitiesText: "Wi-Fi, Cuisine, Jardin"
  },
  {
    id: 40,
    name: "Gîte Tassili Starcamp",
    host: "Samir O.",
    wilaya: "Tassili n'Ajjer",
    region: "Iherir",
    type: "gite",
    price: 60,
    rating: 4.9,
    reviews: 178,
    guests: 3,
    image: "⭐",
    description: "Gîte pour camping étoilé désert",
    amenities: ["kitchen"],
    amenitiesText: "Cuisine"
  },
  {
    id: 41,
    name: "Villa Alger Méditerranée",
    host: "Patricia G.",
    wilaya: "Alger",
    region: "Sidi-Ferruch",
    type: "villa",
    price: 135,
    rating: 4.8,
    reviews: 145,
    guests: 8,
    image: "🌊",
    description: "Villa en bord de mer avec terrasse",
    amenities: ["wifi", "pool", "ac", "kitchen", "parking", "garden"],
    amenitiesText: "Wi-Fi, Piscine, Clim, Cuisine, Parking, Jardin"
  },
  {
    id: 42,
    name: "Riad Tipaza Détente",
    host: "Olivier L.",
    wilaya: "Tipaza",
    region: "Tahala",
    type: "riad",
    price: 92,
    rating: 4.6,
    reviews: 101,
    guests: 4,
    image: "🧘",
    description: "Riad avec spa et bien-être",
    amenities: ["wifi", "ac", "kitchen"],
    amenitiesText: "Wi-Fi, Clim, Cuisine"
  },
  {
    id: 43,
    name: "Maison Oran Sunset",
    host: "Fatima W.",
    wilaya: "Oran",
    region: "Ain-Turck",
    type: "maison",
    price: 98,
    rating: 4.7,
    reviews: 118,
    guests: 5,
    image: "🌅",
    description: "Maison avec vue coucher de soleil",
    amenities: ["wifi", "ac", "kitchen"],
    amenitiesText: "Wi-Fi, Clim, Cuisine"
  },
  {
    id: 44,
    name: "Gîte Constantine Heritage",
    host: "Nasim Z.",
    wilaya: "Constantine",
    region: "Bellevue",
    type: "gite",
    price: 68,
    rating: 4.5,
    reviews: 62,
    guests: 3,
    image: "🏛️",
    description: "Gîte charme dans Constantine",
    amenities: ["wifi", "ac"],
    amenitiesText: "Wi-Fi, Climatisation"
  },
  {
    id: 45,
    name: "Villa Kabylie Nature",
    host: "Thierry M.",
    wilaya: "Kabylie",
    region: "Azeffoun",
    type: "villa",
    price: 118,
    rating: 4.6,
    reviews: 92,
    guests: 7,
    image: "🌲",
    description: "Villa immergée dans la nature kabyle",
    amenities: ["wifi", "pool", "ac", "kitchen", "garden"],
    amenitiesText: "Wi-Fi, Piscine, Clim, Cuisine, Jardin"
  },
  {
    id: 46,
    name: "Riad Ghardaia Confort",
    host: "Hakim S.",
    wilaya: "Ghardaïa",
    region: "Chitrana",
    type: "riad",
    price: 65,
    rating: 4.7,
    reviews: 156,
    guests: 5,
    image: "🏠",
    description: "Riad confortable en plein oasis",
    amenities: ["kitchen", "ac", "wifi"],
    amenitiesText: "Cuisine, Clim, Wi-Fi"
  },
  {
    id: 47,
    name: "Appartement Alger Studio",
    host: "Anna P.",
    wilaya: "Alger",
    region: "Belcourt",
    type: "apartment",
    price: 50,
    rating: 4.3,
    reviews: 41,
    guests: 2,
    image: "🏢",
    description: "Studio compact bien situé",
    amenities: ["wifi"],
    amenitiesText: "Wi-Fi"
  },
  {
    id: 48,
    name: "Gîte Tlemcen Voyage",
    host: "Jacqueline D.",
    wilaya: "Tlemcen",
    region: "Tadjemouaart",
    type: "gite",
    price: 58,
    rating: 4.6,
    reviews: 81,
    guests: 3,
    image: "✈️",
    description: "Gîte idéal pour découvrir la région",
    amenities: ["wifi", "kitchen"],
    amenitiesText: "Wi-Fi, Cuisine"
  }
];

// État global
let filteredHebergements = [...hebergements];
let currentPage = 1;
const itemsPerPage = 12;

// ================================================================
// FUNCTIONS
// ================================================================

/**
 * Crée une carte hébergement
 */
function createHebergementCard(heberg) {
  const starsHtml = '⭐'.repeat(Math.floor(heberg.rating)) + 
                    (heberg.rating % 1 >= 0.5 ? '✨' : '');
  
  return `
    <div class="hebergement-card" data-id="${heberg.id}">
      <div class="hebergement-card__img" style="background-color: #f0f0f0; color: #999;">
        ${heberg.image}
      </div>
      <span class="hebergement-card__badge">${heberg.type.toUpperCase()}</span>
      <button class="hebergement-card__fav" aria-label="Ajouter aux favoris">♡</button>

      <div class="hebergement-card__body">
        <div class="hebergement-card__location">
          <i data-feather="map-pin" style="width: 11px; height: 11px;"></i>
          ${heberg.region}
        </div>
        <div class="hebergement-card__wilaya">${heberg.wilaya}</div>
        <h3 class="hebergement-card__title">${heberg.name}</h3>
        <div class="hebergement-card__host">
          <i data-feather="user" style="width: 12px; height: 12px;"></i>
          ${heberg.host}
        </div>
        <p class="hebergement-card__desc">${heberg.description}</p>
        <div class="hebergement-card__amenities">
          ${heberg.amenitiesText.split(',').map(a => `<span class="amenity-tag">${a.trim()}</span>`).join('')}
        </div>
        
        <div class="hebergement-card__footer">
          <div class="hebergement-card__rating">
            <span class="stars">${starsHtml}</span>
            <span class="avis-count">${heberg.reviews} avis</span>
          </div>
          <div class="hebergement-card__price">
            <div class="price">${heberg.price}€<small>/nuit</small></div>
          </div>
        </div>

        <button class="hebergement-card__btn">Réserver</button>
      </div>
    </div>
  `;
}

/**
 * Affiche les hébergements
 */
function displayHebergements() {
  const grid = document.getElementById('hebergements-grid');
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedItems = filteredHebergements.slice(startIdx, endIdx);

  grid.innerHTML = paginatedItems.map(h => createHebergementCard(h)).join('');
  
  // Re-initialize Feather Icons
  feather.replace();

  // Ajouter les listeners des cartes
  attachCardListeners();
}

/**
 * Affiche la pagination
 */
function displayPagination() {
  const pagination = document.getElementById('pagination');
  const totalPages = Math.ceil(filteredHebergements.length / itemsPerPage);
  let html = '';

  // Bouton précédent
  if (currentPage > 1) {
    html += `<button class="pagination__btn" id="prev-page">← Précédent</button>`;
  }

  // Numéros de page
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `<button class="pagination__btn active" data-page="${i}">${i}</button>`;
    } else if (i <= 3 || i > totalPages - 3 || Math.abs(i - currentPage) <= 2) {
      html += `<button class="pagination__btn" data-page="${i}">${i}</button>`;
    } else if (i === 4 || i === totalPages - 3) {
      html += `<span class="pagination__btn" style="border: none; cursor: default;">...</span>`;
    }
  }

  // Bouton suivant
  if (currentPage < totalPages) {
    html += `<button class="pagination__btn" id="next-page">Suivant →</button>`;
  }

  pagination.innerHTML = html;
  attachPaginationListeners();
}

/**
 * Attache les listeners aux cartes
 */
function attachCardListeners() {
  // Boutons favoris
  document.querySelectorAll('.hebergement-card__fav').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('favoris');
      this.textContent = this.classList.contains('favoris') ? '❤️' : '♡';
    });
  });

  // Cartes cliquables
  document.querySelectorAll('.hebergement-card').forEach(card => {
    card.addEventListener('click', function() {
      const id = this.dataset.id;
      console.log('Voir détails hébergement:', id);
      // À remplacer par navigation vers page détail
    });
  });

  // Boutons réserver
  document.querySelectorAll('.hebergement-card__btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      showToast('Redirection vers la réservation...');
    });
  });
}

/**
 * Attache les listeners à la pagination
 */
function attachPaginationListeners() {
  document.querySelectorAll('.pagination__btn[data-page]').forEach(btn => {
    btn.addEventListener('click', function() {
      currentPage = parseInt(this.dataset.page);
      displayHebergements();
      displayPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentPage--;
      displayHebergements();
      displayPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentPage++;
      displayHebergements();
      displayPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Met à jour le compteur de résultats
 */
function updateResultsCount() {
  document.getElementById('result-count').textContent = filteredHebergements.length;
}

/**
 * Applique les filtres
 */
function applyFilters() {
  const wilaya = document.getElementById('filter-wilaya').value;
  const type = document.getElementById('filter-type').value;
  const priceMin = parseInt(document.getElementById('filter-price-min').value);
  const priceMax = parseInt(document.getElementById('filter-price-max').value);
  const guests = document.getElementById('filter-guests').value;
  const rating = document.getElementById('filter-rating').value;
  const amenities = document.getElementById('filter-amenities').value;

  filteredHebergements = hebergements.filter(h => {
    // Wilaya
    if (wilaya && h.wilaya !== wilaya) return false;
    
    // Type
    if (type && h.type !== type) return false;
    
    // Prix
    if (h.price < priceMin || h.price > priceMax) return false;
    
    // Voyageurs
    if (guests && h.guests < parseInt(guests)) return false;
    
    // Note
    if (rating && h.rating < parseFloat(rating)) return false;
    
    // Équipements
    if (amenities && !h.amenities.includes(amenities)) return false;
    
    return true;
  });

  currentPage = 1;
  updateResultsCount();
  displayHebergements();
  displayPagination();
  showToast(`${filteredHebergements.length} hébergements trouvés`);
}

/**
 * Réinitialise les filtres
 */
function clearFilters() {
  document.getElementById('filter-wilaya').value = '';
  document.getElementById('filter-type').value = '';
  document.getElementById('filter-price-min').value = '10';
  document.getElementById('filter-price-max').value = '500';
  document.getElementById('filter-guests').value = '';
  document.getElementById('filter-rating').value = '';
  document.getElementById('filter-amenities').value = '';
  
  filteredHebergements = [...hebergements];
  currentPage = 1;
  updateResultsCount();
  displayHebergements();
  displayPagination();
  updatePriceDisplay();
}

/**
 * Met à jour l'affichage du prix
 */
function updatePriceDisplay() {
  const min = document.getElementById('filter-price-min').value;
  const max = document.getElementById('filter-price-max').value;
  document.getElementById('price-display').textContent = `${min}€ - ${max}€`;
}

/**
 * Affiche un toast message
 */
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--color-terracotta);
    color: white;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Gère le tri
 */
function handleSort(option) {
  switch(option) {
    case 'price-asc':
      filteredHebergements.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredHebergements.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredHebergements.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filteredHebergements.sort((a, b) => b.id - a.id);
      break;
    default:
      filteredHebergements.sort((a, b) => a.id - b.id);
  }
  currentPage = 1;
  displayHebergements();
  displayPagination();
}

// ================================================================
// EVENT LISTENERS
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
  // Affichage initial
  displayHebergements();
  displayPagination();

  // Filtres
  document.getElementById('btn-apply-filters').addEventListener('click', applyFilters);
  document.getElementById('btn-clear-filters').addEventListener('click', clearFilters);

  // Range prix
  document.getElementById('filter-price-min').addEventListener('change', updatePriceDisplay);
  document.getElementById('filter-price-max').addEventListener('change', updatePriceDisplay);

  // Tri
  document.getElementById('sort-select').addEventListener('change', function() {
    handleSort(this.value);
  });

  // Scroll to top
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ================================================================
// STYLES POUR ANIMATIONS
// ================================================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
  .back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 48px;
    height: 48px;
    background: var(--color-terracotta);
    color: white;
    border-radius: 50%;
    border: none;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 99;
    transition: var(--transition-normal);
    box-shadow: var(--shadow-lg);
  }
  .back-to-top:hover {
    background: var(--color-terracotta-dark);
    transform: translateY(-4px);
  }
`;
document.head.appendChild(style);