/* ============================================================
   Living Home Colombia · i18n (EN / ES / DE / FR) · FULL PAGE
   Dropdown selector · auto-detect · localStorage · whole-page
   ============================================================ */
(function () {
  "use strict";

  var LANGS = ["en", "es", "de", "fr"];
  var NAMES = { en: "English", de: "Deutsch", es: "Español", fr: "Français" };
  var CODES = { en: "EN", de: "DE", es: "ES", fr: "FR" };

  /* ---- dictionary ---- */
  var T = {
    /* NAV */
    "nav.valle":   { en:"The Valle", es:"El Valle", de:"Das Tal", fr:"La Vallée" },
    "nav.ginebra": { en:"Ginebra", es:"Ginebra", de:"Ginebra", fr:"Ginebra" },
    "nav.finca":   { en:"The Finca", es:"La Finca", de:"Die Finca", fr:"La Finca" },
    "nav.nearby":  { en:"Nearby", es:"Cercanías", de:"Umgebung", fr:"Environs" },
    "nav.guide":   { en:"Get the guide", es:"Obtener la guía", de:"Ratgeber anfordern", fr:"Obtenir le guide" },

    /* HERO */
    "hero.eyebrow":{ en:"Valle del Cauca · Colombia", es:"Valle del Cauca · Colombia", de:"Valle del Cauca · Kolumbien", fr:"Valle del Cauca · Colombie" },
    "hero.h1a":    { en:"Your spring that ", es:"Tu primavera que ", de:"Dein Frühling, der ", fr:"Votre printemps qui " },
    "hero.h1b":    { en:"never ends.", es:"nunca termina.", de:"nie endet.", fr:"ne finit jamais." },
    "hero.sub":    { en:'A private hacienda in Colombia\'s Valle del Cauca. <b>24°C year-round</b>, <b>44 min</b> from the international airport, <b>4 hours</b> from Florida by daily direct flight from July 2026.',
                     es:'Una hacienda privada en el Valle del Cauca. <b>24°C todo el año</b>, a <b>44 min</b> del aeropuerto internacional y a <b>4 horas</b> de Florida con vuelo directo diario desde julio de 2026.',
                     de:'Eine private Hacienda im Valle del Cauca. <b>24°C das ganze Jahr</b>, <b>44 Min</b> vom internationalen Flughafen, <b>4 Stunden</b> von Florida per täglichem Direktflug ab Juli 2026.',
                     fr:'Une hacienda privée dans le Valle del Cauca. <b>24°C toute l\'année</b>, à <b>44 min</b> de l\'aéroport international et à <b>4 heures</b> de la Floride par vol direct quotidien dès juillet 2026.' },
    "hero.btn1":   { en:"Download the 2026 living guide", es:"Descargar la guía 2026", de:"Leitfaden 2026 herunterladen", fr:"Télécharger le guide 2026" },
    "hero.btn2":   { en:"Schedule a free call", es:"Agendar una llamada gratis", de:"Kostenloses Gespräch buchen", fr:"Planifier un appel gratuit" },
    "hero.foot":   { en:"Living Home Colombia, a new life in Colombia's eternal spring", es:"Living Home Colombia, una nueva vida en la eterna primavera de Colombia", de:"Living Home Colombia, ein neues Leben in Kolumbiens ewigem Frühling", fr:"Living Home Colombia, une nouvelle vie dans le printemps éternel de Colombie" },
    "hero.scroll": { en:"Scroll", es:"Explora", de:"Scrollen", fr:"Défiler" },

    /* MANIFESTO */
    "man.1": { en:'Living Home Colombia is for those imagining a calmer life with more room to breathe, a home with history in the Valle del Cauca, where colonial character, nature and an <em>eternal spring</em> open the door to a new way of living.',
               es:'Living Home Colombia es para quienes imaginan una vida más tranquila, con más espacio para respirar, un hogar con historia en el Valle del Cauca, donde el carácter colonial, la naturaleza y una <em>eterna primavera</em> abren la puerta a una nueva forma de vivir.',
               de:'Living Home Colombia ist für Menschen, die sich ein ruhigeres Leben vorstellen, mit mehr Raum zum Atmen, ein Zuhause mit Geschichte im Valle del Cauca, wo kolonialer Charakter, Natur und ein <em>ewiger Frühling</em> die Tür zu einer neuen Lebensweise öffnen.',
               fr:'Living Home Colombia s\'adresse à ceux qui imaginent une vie plus paisible, avec plus d\'espace pour respirer, une maison avec de l\'histoire dans le Valle del Cauca, où le caractère colonial, la nature et un <em>printemps éternel</em> ouvrent la porte à une nouvelle façon de vivre.' },
    "man.2": { en:'In Ginebra, a century-old country home waits for those ready to leave the noise behind and wake to mountain air, close to the city, far from its rush. <em>A new life in Colombia\'s eternal spring.</em>',
               es:'En Ginebra, una casa campestre centenaria espera a quienes están listos para dejar el ruido atrás y despertar con aire de montaña, cerca de la ciudad, lejos de su agitación. <em>Una nueva vida en la eterna primavera de Colombia.</em>',
               de:'In Ginebra wartet ein hundertjähriges Landhaus auf diejenigen, die bereit sind, den Lärm hinter sich zu lassen und mit Bergluft aufzuwachen, nah an der Stadt, weit weg von ihrer Hektik. <em>Ein neues Leben in Kolumbiens ewigem Frühling.</em>',
               fr:'À Ginebra, une maison de campagne centenaire attend ceux qui sont prêts à laisser le bruit derrière eux et à se réveiller dans l\'air de la montagne, près de la ville, loin de son agitation. <em>Une nouvelle vie dans le printemps éternel de Colombie.</em>' },

    /* REGION */
    "reg.eyebrow": { en:"Why Valle del Cauca", es:"Por qué Valle del Cauca", de:"Warum Valle del Cauca", fr:"Pourquoi le Valle del Cauca" },
    "reg.h2": { en:"One of Colombia's most powerful regions, and its best-kept lifestyle secret.", es:"Una de las regiones más poderosas de Colombia, y su mejor secreto de estilo de vida.", de:"Eine der stärksten Regionen Kolumbiens, und ihr bestgehütetes Lifestyle-Geheimnis.", fr:"L'une des régions les plus puissantes de Colombie, et son secret de vie le mieux gardé." },
    "reg.p1": { en:"Valle del Cauca is not just Cali. City, countryside, mountains and Pacific access, one of Colombia's most complete and diverse departments.", es:"El Valle del Cauca no es solo Cali. Ciudad, campo, montañas y acceso al Pacífico, uno de los departamentos más completos y diversos de Colombia.", de:"Das Valle del Cauca ist nicht nur Cali. Stadt, Land, Berge und Pazifikzugang, eines der vollständigsten und vielfältigsten Departements Kolumbiens.", fr:"Le Valle del Cauca, ce n'est pas que Cali. Ville, campagne, montagnes et accès au Pacifique, l'un des départements les plus complets et divers de Colombie." },
    "reg.p2": { en:'A region on the rise, where property values still reflect what it <em class="gold">was</em>, not what it\'s becoming.', es:'Una región en ascenso, donde los precios inmobiliarios aún reflejan lo que <em class="gold">fue</em>, no lo que está por ser.', de:'Eine Region im Aufschwung, wo die Immobilienpreise noch widerspiegeln, was sie <em class="gold">war</em>, nicht was sie wird.', fr:'Une région en plein essor, où les prix de l\'immobilier reflètent encore ce qu\'elle <em class="gold">était</em>, et non ce qu\'elle devient.' },
    "reg.link": { en:"Meet the town we chose →", es:"Conoce el pueblo que elegimos →", de:"Lernen Sie die Stadt kennen, die wir wählten →", fr:"Découvrez la ville que nous avons choisie →" },

    /* ECONOMY */
    "eco.eyebrow": { en:"The Economy", es:"La Economía", de:"Die Wirtschaft", fr:"L'Économie" },
    "eco.h2": { en:"A region the numbers<br>are catching up to.", es:"Una región que<br>las cifras alcanzan.", de:"Eine Region, die die<br>Zahlen einholen.", fr:"Une région que les<br>chiffres rattrapent." },
    "eco.aside": { en:"Ranked #1 in economic performance among Colombia's major departments in 2025.", es:"Clasificada #1 en desempeño económico entre los principales departamentos de Colombia en 2025.", de:"2025 als #1 in wirtschaftlicher Leistung unter Kolumbiens großen Departements eingestuft.", fr:"Classée #1 en performance économique parmi les grands départements de Colombie en 2025." },
    "eco.s1": { en:"Economic performance among Colombian departments, 2025.", es:"Desempeño económico entre los departamentos colombianos, 2025.", de:"Wirtschaftsleistung unter den kolumbianischen Departements, 2025.", fr:"Performance économique parmi les départements colombiens, 2025." },
    "eco.s2": { en:"Export growth in 2025, over 7× the national rate.", es:"Crecimiento de exportaciones en 2025, más de 7× la tasa nacional.", de:"Exportwachstum 2025, über 7× der nationale Wert.", fr:"Croissance des exportations en 2025, plus de 7× le taux national." },
    "eco.s3": { en:"Exported in Q1 2026 alone, up 12.6% year over year.", es:"Exportado solo en el primer trimestre de 2026, un 12.6% más interanual.", de:"Allein im 1. Quartal 2026 exportiert, plus 12,6 % gegenüber dem Vorjahr.", fr:"Exporté au seul 1er trimestre 2026, en hausse de 12,6 % sur un an." },
    "eco.s4": { en:"People in metropolitan Cali, a full-service city right by your side.", es:"Personas en el área metropolitana de Cali, una ciudad de servicios completos a tu lado.", de:"Menschen im Großraum Cali, eine Vollservice-Stadt an Ihrer Seite.", fr:"Habitants dans l'agglomération de Cali, une ville à services complets à vos côtés." },

    /* ECO NATURE */
    "eco.nat.eyebrow": { en:"Natural capital", es:"Capital natural", de:"Naturkapital", fr:"Capital naturel" },
    "eco.nat.h": { en:"Where wealth has wings.", es:"Donde la riqueza tiene alas.", de:"Wo Reichtum Flügel hat.", fr:"Où la richesse a des ailes." },
    "eco.nat.tag": { en:"Bird species in Colombia, #1 on Earth and nearly a fifth of every bird alive.", es:"Especies de aves en Colombia, #1 en la Tierra y casi una quinta parte de todas las aves vivas.", de:"Vogelarten in Kolumbien, weltweit auf Platz 1 und fast ein Fünftel aller lebenden Vögel.", fr:"Espèces d'oiseaux en Colombie, #1 sur Terre et près d'un cinquième de chaque oiseau vivant." },
    "eco.nat.p": { en:"Valle del Cauca ranks among the country's richest departments for birdlife, and aviturismo, or birdwatching, is one of Colombia's fastest-growing forms of nature tourism. The finca does its part: its old trees, pastures and fruit groves are a daily refuge for tanagers, hummingbirds and migratory flocks, a quiet environmental value that deepens every year.", es:"El Valle del Cauca está entre los departamentos más ricos del país en avifauna, y el aviturismo, o avistamiento de aves, es una de las formas de turismo de naturaleza de más rápido crecimiento en Colombia. La finca hace su parte: sus viejos árboles, potreros y huertos son refugio diario de tángaras, colibríes y bandadas migratorias, un valor ambiental silencioso que crece cada año.", de:"Das Valle del Cauca gehört zu den reichsten Departements des Landes für Vogelwelt, und Aviturismo, also Vogelbeobachtung, ist eine der am schnellsten wachsenden Formen des Naturtourismus in Kolumbien. Die Finca trägt ihren Teil dazu bei: ihre alten Bäume, Weiden und Obstgärten sind täglich Zuflucht für Tangaren, Kolibris und Zugvögel, ein stiller Umweltwert, der jedes Jahr tiefer wird.", fr:"Le Valle del Cauca figure parmi les départements les plus riches du pays en avifaune, et l'aviturismo, ou observation des oiseaux, est l'une des formes de tourisme naturel à la croissance la plus rapide en Colombie. La finca fait sa part : ses vieux arbres, pâturages et vergers sont le refuge quotidien des tangaras, colibris et vols migratoires, une valeur environnementale silencieuse qui s'approfondit chaque année." },

    /* OFFERS */
    "off.eyebrow": { en:"What the Valle offers", es:"Lo que ofrece el Valle", de:"Was das Tal bietet", fr:"Ce qu'offre la Vallée" },
    "off.h2": { en:"Mountains, ocean,<br>culture &amp; table.", es:"Montañas, océano,<br>cultura y mesa.", de:"Berge, Meer,<br>Kultur &amp; Tafel.", fr:"Montagnes, océan,<br>culture &amp; table." },
    "off.aside": { en:"From Pacific whale-watching to world-class kitesurfing, all in one department.", es:"Desde avistamiento de ballenas en el Pacífico hasta kitesurf de talla mundial, todo en un departamento.", de:"Vom Walbeobachten am Pazifik bis Weltklasse-Kitesurfen, alles in einem Departement.", fr:"De l'observation des baleines à du kitesurf de classe mondiale, le tout dans un seul département." },
    "off.c1.h": { en:"Exceptional nature", es:"Naturaleza excepcional", de:"Außergewöhnliche Natur", fr:"Une nature exceptionnelle" },
    "off.c1.1": { en:"Bahía Málaga: humpback whales, mangroves, virgin beaches", es:"Bahía Málaga: ballenas jorobadas, manglares, playas vírgenes", de:"Bahía Málaga: Buckelwale, Mangroven, unberührte Strände", fr:"Bahía Málaga: baleines à bosse, mangroves, plages vierges" },
    "off.c1.2": { en:"Lake Calima, 3rd-best lake on earth for kite &amp; windsurf, 365 days of wind", es:"Lago Calima, 3.er mejor lago del mundo para kite y windsurf, 365 días de viento", de:"Calima-See, drittbester See der Welt für Kite &amp; Windsurf, 365 Tage Wind", fr:"Lac Calima, 3e meilleur lac au monde pour le kite &amp; windsurf, 365 jours de vent" },
    "off.c1.3": { en:"Farallones de Cali, one of Colombia's most biodiverse ecosystems", es:"Farallones de Cali, uno de los ecosistemas más biodiversos de Colombia", de:"Farallones de Cali, eines der artenreichsten Ökosysteme Kolumbiens", fr:"Farallones de Cali, l'un des écosystèmes les plus biodivers de Colombie" },
    "off.c1.4": { en:"Roldanillo, world-class paragliding", es:"Roldanillo, parapente de talla mundial", de:"Roldanillo, Gleitschirmfliegen der Weltklasse", fr:"Roldanillo, parapente de classe mondiale" },
    "off.c2.h": { en:"Incomparable culture", es:"Cultura incomparable", de:"Unvergleichliche Kultur", fr:"Une culture incomparable" },
    "off.c2.1": { en:"Feria de Cali, the world capital of salsa, every December", es:"Feria de Cali, la capital mundial de la salsa, cada diciembre", de:"Feria de Cali, die Welthauptstadt des Salsa, jeden Dezember", fr:"Feria de Cali, la capitale mondiale de la salsa, chaque décembre" },
    "off.c2.2": { en:"Festival Petronio Álvarez, the great Pacific music festival", es:"Festival Petronio Álvarez, el gran festival de música del Pacífico", de:"Festival Petronio Álvarez, das große Musikfestival des Pazifiks", fr:"Festival Petronio Álvarez, le grand festival de musique du Pacifique" },
    "off.c2.3": { en:"Festival Mono Núñez, 51 years of National Cultural Heritage", es:"Festival Mono Núñez, 51 años de Patrimonio Cultural de la Nación", de:"Festival Mono Núñez, 51 Jahre nationales Kulturerbe", fr:"Festival Mono Núñez, 51 ans de Patrimoine Culturel National" },
    "off.c3.h": { en:"A table that travels", es:"Una mesa que viaja", de:"Eine Tafel, die reist", fr:"Une table qui voyage" },
    "off.c3.tags": { en:"Sancocho valluno · Chuleta valluna · Aborrajados · Champús · Pandebono · Viche del Pacífico · Pacific seafood · artisanal Isabella-grape wine", es:"Sancocho valluno · Chuleta valluna · Aborrajados · Champús · Pandebono · Viche del Pacífico · Mariscos del Pacífico · vino artesanal de uva Isabella", de:"Sancocho valluno · Chuleta valluna · Aborrajados · Champús · Pandebono · Viche del Pacífico · Meeresfrüchte des Pazifiks · handwerklicher Wein aus Isabella-Trauben", fr:"Sancocho valluno · Chuleta valluna · Aborrajados · Champús · Pandebono · Viche del Pacífico · fruits de mer du Pacifique · vin artisanal de raisin Isabella" },
    "off.c4.h": { en:"Cities for every life", es:"Ciudades para cada vida", de:"Städte für jedes Leben", fr:"Des villes pour chaque vie" },
    "off.c4.1": { en:"Cali, economic &amp; cultural capital of the southwest", es:"Cali, capital económica y cultural del suroccidente", de:"Cali, Wirtschafts- und Kulturhauptstadt des Südwestens", fr:"Cali, capitale économique et culturelle du sud-ouest" },
    "off.c4.2": { en:"Palmira, calm, close to the airport and with low costs", es:"Palmira, tranquila, junto al aeropuerto y con costos bajos", de:"Palmira, ruhig, am Flughafen und mit niedrigen Kosten", fr:"Palmira, calme, près de l'aéroport et avec des coûts faibles" },
    "off.c4.3": { en:"Buga, colonial heritage &amp; the famous Basilica", es:"Buga, patrimonio colonial y la famosa Basílica", de:"Buga, koloniales Erbe &amp; die berühmte Basilika", fr:"Buga, patrimoine colonial &amp; la célèbre Basilique" },
    "off.c4.4": { en:"Calima El Darién, lake, kitesurf, adventure", es:"Calima El Darién, lago, kitesurf, aventura", de:"Calima El Darién, See, Kitesurf, Abenteuer", fr:"Calima El Darién, lac, kitesurf, aventure" },
    "off.closer": { en:'International-caliber quality of life, <em>without the international-caliber price.</em>', es:'Calidad de vida de nivel internacional, <em>sin el precio internacional.</em>', de:'Lebensqualität von internationalem Rang, <em>ohne den internationalen Preis.</em>', fr:'Une qualité de vie de niveau international, <em>sans le prix international.</em>' },

    /* GINEBRA */
    "gin.eyebrow": { en:"The Town · Pueblo Mágico", es:"El Pueblo · Pueblo Mágico", de:"Die Stadt · Pueblo Mágico", fr:"La Ville · Pueblo Mágico" },
    "gin.h2": { en:"Ginebra, the Valle's best-kept retirement secret.", es:"Ginebra, el secreto de retiro mejor guardado del Valle.", de:"Ginebra, das bestgehütete Ruhestandsgeheimnis des Tals.", fr:"Ginebra, le secret de retraite le mieux gardé de la Vallée." },
    "gin.body": { en:'Ginebra is an official <em class="gold">Pueblo Mágico</em> northeast of Cali, surrounded by colonial haciendas, Isabella vineyards and ecosystems from lowland to páramo, all in one town. The cultural and musical heart of the Valle.',
                 es:'Ginebra es un <em class="gold">Pueblo Mágico</em> oficial al noreste de Cali, rodeado de haciendas coloniales, viñedos de uva Isabella y ecosistemas del trópico al páramo, todo en un pueblo. El corazón cultural y musical del Valle.',
                 de:'Ginebra ist ein offizieller <em class="gold">Pueblo Mágico</em> nordöstlich von Cali, umgeben von kolonialen Haciendas, Isabella-Weinbergen und Ökosystemen vom Tiefland bis zum Páramo, alles in einer Stadt. Das kulturelle und musikalische Herz des Tals.',
                 fr:'Ginebra est un <em class="gold">Pueblo Mágico</em> officiel au nord-est de Cali, entouré de haciendas coloniales, de vignobles Isabella et d\'écosystèmes des basses terres au páramo, le tout dans une seule ville. Le cœur culturel et musical de la Vallée.' },
    "gin.stat": { en:"21,000 locals. Zero mass tourism. 3,770 Google reviews. The town English and French speakers keep coming back to.", es:"21.000 habitantes. Cero turismo masivo. 3.770 reseñas en Google. El pueblo al que angloparlantes y francófonos regresan.", de:"21.000 Einwohner. Kein Massentourismus. 3.770 Google-Bewertungen. Die Stadt, zu der englisch- und französischsprachige Besucher zurückkehren.", fr:"21 000 habitants. Zéro tourisme de masse. 3 770 avis Google. La ville où anglophones et francophones reviennent." },
    "gin.a1.h": { en:"24°C, every single day", es:"24°C, todos los días", de:"24°C, jeden einzelnen Tag", fr:"24°C, chaque jour" },
    "gin.a1.p": { en:"No seasons. No heating bill. No winter coat. Ecosystems from 1,000 to 4,000 m make it one of South America's most comfortable year-round climates.", es:"Sin estaciones. Sin calefacción. Sin abrigo. Ecosistemas de 1.000 a 4.000 m le dan uno de los climas más agradables de Sudamérica todo el año.", de:"Keine Jahreszeiten. Keine Heizkosten. Kein Wintermantel. Ökosysteme von 1.000 bis 4.000 m schaffen eines der angenehmsten Ganzjahresklimas Südamerikas.", fr:"Pas de saisons. Pas de chauffage. Pas de manteau. Des écosystèmes de 1 000 à 4 000 m en font l'un des climats les plus agréables d'Amérique du Sud toute l'année." },
    "gin.a2.h": { en:"Colombia's only wine town", es:"El único pueblo vinícola de Colombia", de:"Kolumbiens einzige Weinstadt", fr:"La seule ville viticole de Colombie" },
    "gin.a2.p": { en:"Two artisanal wine museums in the same town, Cava del Rancho (⭐4.8) and Vita Vid (⭐4.6). Grape-to-glass Isabella tastings you won't find in Medellín or Cartagena.", es:"Dos museos de vino artesanal en el mismo pueblo, Cava del Rancho (⭐4.8) y Vita Vid (⭐4.6). Catas de uva Isabella que no existen en Medellín ni Cartagena.", de:"Zwei handwerkliche Weinmuseen in derselben Stadt, Cava del Rancho (⭐4.8) und Vita Vid (⭐4.6). Isabella-Verkostungen, die es in Medellín oder Cartagena nicht gibt.", fr:"Deux musées du vin artisanal dans la même ville, Cava del Rancho (⭐4,8) et Vita Vid (⭐4,6). Des dégustations Isabella introuvables à Medellín ou Carthagène." },
    "gin.a3.h": { en:"A festival running since 1975", es:"Un festival que se celebra desde 1975", de:"Ein Festival seit 1975", fr:"Un festival depuis 1975" },
    "gin.a3.p": { en:"The Festival Mono Núñez, National Cultural Heritage, is Latin America's most important Andean music festival. 51 years, a 15-minute walk away.", es:"El Festival Mono Núñez, Patrimonio Cultural de la Nación, es el festival de música andina más importante de América Latina. 51 años, a 15 min a pie.", de:"Das Festival Mono Núñez, nationales Kulturerbe, ist Lateinamerikas wichtigstes Andenmusikfestival. 51 Jahre, 15 Gehminuten entfernt.", fr:"Le Festival Mono Núñez, Patrimoine Culturel National, est le plus grand festival de musique andine d'Amérique latine. 51 ans, à 15 min à pied." },
    "gin.a4.h": { en:"A free waterfall, 15 minutes away", es:"Una cascada gratuita, a 15 minutos", de:"Ein kostenloser Wasserfall, 15 Minuten entfernt", fr:"Une cascade gratuite, à 15 minutes" },
    "gin.a4.p": { en:"Cascada Puente Piedra, ⭐4.7, 505 Google reviews. Natural, free, open 24 hours.", es:"Cascada Puente Piedra, ⭐4.7, 505 reseñas en Google. Natural, gratuita, abierta 24 horas.", de:"Cascada Puente Piedra, ⭐4.7, 505 Google-Bewertungen. Natürlich, kostenlos, 24 Stunden geöffnet.", fr:"Cascada Puente Piedra, ⭐4,7, 505 avis Google. Naturelle, gratuite, ouverte 24h/24." },
    "gin.a5.h": { en:"City access without city noise", es:"Acceso a la ciudad sin el ruido de la ciudad", de:"Stadtzugang ohne Stadtlärm", fr:"L'accès à la ville sans le bruit de la ville" },
    "gin.a5.p": { en:"A city of 2.2 million, with hospitals, universities and an international airport, sitting under an hour away. Country peace, city access.", es:"Una ciudad de 2,2 millones, con hospitales, universidades y aeropuerto internacional, a menos de una hora. Paz del campo, acceso a la ciudad.", de:"Eine Stadt mit 2,2 Millionen, mit Krankenhäusern, Universitäten und internationalem Flughafen, unter einer Stunde entfernt. Landruhe, Stadtzugang.", fr:"Une ville de 2,2 millions, avec hôpitaux, universités et aéroport international, à moins d'une heure. Le calme de la campagne, l'accès à la ville." },
    "gin.closer": { en:'Authentic, affordable and quietly growing, <em>and not yet overrun.</em>', es:'Auténtico, asequible y creciendo en silencio, <em>y aún no saturado.</em>', de:'Authentisch, bezahlbar und leise wachsend, <em>und noch nicht überlaufen.</em>', fr:'Authentique, abordable et en croissance discrète, <em>et pas encore envahi.</em>' },

    /* PROPERTY */
    "prop.eyebrow": { en:"The Residence", es:"La Residencia", de:"Die Residenz", fr:"La Résidence" },
    "prop.h2": { en:"Finca San Antonio.", es:"Finca San Antonio.", de:"Finca San Antonio.", fr:"Finca San Antonio." },
    "prop.desc": { en:"A century-old country home, tastefully remodeled, with six bedrooms and shaded corridors among pastures and fruit trees. At 1,136 m, near 24°C all year.", es:"Una casa campestre centenaria, remodelada con buen gusto, con seis alcobas y corredores con sombra entre potreros y frutales. A 1.136 m, cerca de 24°C todo el año.", de:"Ein hundertjähriges Landhaus, geschmackvoll renoviert, mit sechs Schlafzimmern und schattigen Korridoren zwischen Weiden und Obstbäumen. Auf 1.136 m, das ganze Jahr nahe 24°C.", fr:"Une maison de campagne centenaire, rénovée avec goût, avec six chambres et des corridors ombragés parmi pâturages et arbres fruitiers. À 1 136 m, près de 24°C toute l'année." },
    "prop.from": { en:"Price", es:"Precio", de:"Preis", fr:"Prix" },
    "prop.note": { en:"Residential estate · 6 bedrooms · 2 baths. Indicative figure.", es:"Casa campestre · 6 alcobas · 2 baños. Cifra indicativa.", de:"Wohnanwesen · 6 Schlafzimmer · 2 Bäder. Richtwert.", fr:"Domaine résidentiel · 6 chambres · 2 SdB. Chiffre indicatif." },
    "prop.btn1": { en:"Request the full dossier", es:"Solicitar el dossier completo", de:"Vollständiges Dossier anfordern", fr:"Demander le dossier complet" },
    "prop.btn2": { en:"See what's nearby", es:"Ver qué hay cerca", de:"Umgebung ansehen", fr:"Voir les environs" },
    "prop.spec1": { en:"Bedrooms (alcobas)", es:"Alcobas", de:"Schlafzimmer", fr:"Chambres" },
    "prop.spec2": { en:"Full bathrooms", es:"Baños completos", de:"Vollbäder", fr:"Salles de bain" },
    "prop.spec3n": { en:"100 yr", es:"100 años", de:"100 Jahre", fr:"100 ans" },
    "prop.spec3": { en:"Heritage home, remodeled", es:"Casa centenaria, remodelada", de:"Historisches Haus, renoviert", fr:"Maison centenaire, rénovée" },
    "prop.spec4": { en:"Above sea level · ~24°C", es:"Sobre el nivel del mar · ~24°C", de:"Über dem Meer · ~24°C", fr:"Au-dessus du niveau de la mer · ~24°C" },
    "prop.feat1": { en:"Pastures, green zones &amp; fruit trees", es:"Potreros, zonas verdes y árboles frutales", de:"Weiden, Grünflächen &amp; Obstbäume", fr:"Pâturages, espaces verts &amp; arbres fruitiers" },
    "prop.feat2": { en:"Barn, service area &amp; storage", es:"Marranera, zona de oficios y bodega", de:"Stall, Wirtschaftsbereich &amp; Lager", fr:"Étable, zone de service &amp; rangement" },
    "prop.feat3": { en:"River + Acuavalle water supply", es:"Aguas de río + red Acuavalle", de:"Fluss- + Acuavalle-Wasserversorgung", fr:"Eau de rivière + réseau Acuavalle" },
    "prop.feat4": { en:"Flat topography · clay-loam soil", es:"Topografía plana · suelo franco arcilloso", de:"Flaches Gelände · lehmiger Tonboden", fr:"Topographie plane · sol argilo-limoneux" },

    /* NEARBY */
    "near.eyebrow": { en:"What's nearby", es:"Qué hay cerca", de:"In der Nähe", fr:"À proximité" },
    "near.h2a": { en:"Everything you need.", es:"Todo lo que necesitas.", de:"Alles, was Sie brauchen.", fr:"Tout ce dont vous avez besoin." },
    "near.h2b": { en:"Nothing you don't.", es:"Nada que no.", de:"Nichts, was Sie nicht brauchen.", fr:"Rien de superflu." },
    "near.aside": { en:"From your door, the Valle opens up. Every rating below is a real Google score.", es:"Desde tu puerta, el Valle se abre. Cada calificación es una puntuación real de Google.", de:"Von Ihrer Tür aus öffnet sich das Tal. Jede Bewertung unten ist eine echte Google-Wertung.", fr:"Depuis votre porte, la Vallée s'ouvre. Chaque note ci-dessous est un vrai score Google." },
    "near.band1": { en:"Within 5 minutes by car", es:"A 5 minutos en coche", de:"In 5 Autominuten", fr:"À 5 minutes en voiture" },
    "near.band2": { en:"Within 20 minutes", es:"A 20 minutos", de:"In 20 Minuten", fr:"À 20 minutes" },
    "near.band3": { en:"Within the hour", es:"En menos de una hora", de:"In weniger als einer Stunde", fr:"En moins d'une heure" },
    "near.min": { en:"min by car", es:"min en coche", de:"Autominuten", fr:"min en voiture" },
    "near.walk": { en:"Walkable", es:"A pie", de:"Zu Fuß", fr:"Accessible à pied" },
    "near.free": { en:"Free", es:"Gratis", de:"Kostenlos", fr:"Gratuit" },
    "near.d3": { en:"3 min by car", es:"3 min en coche", de:"3 Autominuten", fr:"3 min en voiture" },
    "near.d4": { en:"4 min by car", es:"4 min en coche", de:"4 Autominuten", fr:"4 min en voiture" },
    "near.d8": { en:"8 min by car", es:"8 min en coche", de:"8 Autominuten", fr:"8 min en voiture" },
    "near.d15": { en:"15 min by car", es:"15 min en coche", de:"15 Autominuten", fr:"15 min en voiture" },

    "n1.cat": { en:"Wine museum · 4 min", es:"Museo del vino · 4 min", de:"Weinmuseum · 4 Min.", fr:"Musée du vin · 4 min" },
    "n1.q": { en:'"The tour is captivating, comprehensive, and family-friendly."', es:'"El recorrido es cautivador, completo y apto para toda la familia."', de:'„Die Tour ist fesselnd, umfassend und familienfreundlich."', fr:'« La visite est captivante, complète et conviviale pour les familles. »' },
    "n2.cat": { en:"Vineyard &amp; wine museum · 4 min", es:"Viñedo y museo del vino · 4 min", de:"Weingut &amp; Weinmuseum · 4 Min.", fr:"Vignoble &amp; musée du vin · 4 min" },
    "n2.q": { en:'"A very modern and fun museum for adults and children alike."', es:'"Un museo muy moderno y divertido tanto para adultos como para niños."', de:'„Ein sehr modernes und unterhaltsames Museum für Erwachsene und Kinder."', fr:'« Un musée très moderne et amusant pour les adultes comme pour les enfants. »' },
    "n3.cat": { en:"Restaurant · 4 min", es:"Restaurante · 4 min", de:"Restaurant · 4 Min.", fr:"Restaurant · 4 min" },
    "n3.q": { en:'"Classic elegance combined with the present. I recommend it."', es:'"Elegancia clásica combinada con el presente. Lo recomiendo."', de:'„Klassische Eleganz, verbunden mit der Gegenwart. Ich empfehle es."', fr:'« Une élégance classique alliée au présent. Je le recommande. »' },
    "n4.cat": { en:"Wood-fire Valle cooking · 3 min", es:"Cocina vallecaucana a la leña · 3 min", de:"Holzfeuer-Küche des Tals · 3 Min.", fr:"Cuisine de la Vallée au feu de bois · 3 min" },
    "n4.q": { en:'"A culinary gem. Crispy empanadas with a wood-fired taste."', es:'"Una joya culinaria. Empanadas crujientes con sabor a leña."', de:'„Ein kulinarisches Juwel. Knusprige Empanadas mit Holzfeuer-Geschmack."', fr:'« Un joyau culinaire. Des empanadas croustillantes au goût de feu de bois. »' },
    "n5.cat": { en:"Lake, pool &amp; sport · 4 min", es:"Lago, piscina y deporte · 4 min", de:"See, Pool &amp; Sport · 4 Min.", fr:"Lac, piscine &amp; sport · 4 min" },
    "n5.q": { en:'"A place where you can go and relax, swimming and fishing."', es:'"Un lugar para ir a relajarse, nadar y pescar."', de:'„Ein Ort zum Entspannen, Schwimmen und Angeln."', fr:'« Un endroit où aller se détendre, nager et pêcher. »' },
    "n6.cat": { en:"Town park &amp; fairs · walkable", es:"Parque del pueblo y ferias · a pie", de:"Stadtpark &amp; Märkte · zu Fuß", fr:"Parc du village &amp; foires · à pied" },
    "n6.q": { en:'"A fabulous park! I can\'t wait to go back."', es:'"¡Un parque fabuloso! No veo la hora de volver."', de:'„Ein fabelhafter Park! Ich kann es kaum erwarten, zurückzukehren."', fr:'« Un parc fabuleux ! J\'ai hâte d\'y retourner. »' },
    "n7.cat": { en:"Tractor museum &amp; horse shows · 8 min", es:"Museo de tractores y espectáculos ecuestres · 8 min", de:"Traktormuseum &amp; Pferdeshows · 8 Min.", fr:"Musée du tracteur &amp; spectacles équestres · 8 min" },
    "n7.q": { en:'"Beautiful green areas and lovely views. A free tour."', es:'"Hermosas zonas verdes y vistas encantadoras. Un recorrido gratuito."', de:'„Schöne Grünflächen und reizvolle Ausblicke. Eine kostenlose Tour."', fr:'« De belles espaces verts et de jolies vues. Une visite gratuite. »' },
    "n8.cat": { en:"Natural waterfall · 15 min", es:"Cascada natural · 15 min", de:"Natürlicher Wasserfall · 15 Min.", fr:"Cascade naturelle · 15 min" },
    "n8.q": { en:'"A wonderful place, far from civilization. And it\'s free."', es:'"Un lugar maravilloso, lejos de la civilización. Y es gratis."', de:'„Ein wunderbarer Ort, fern der Zivilisation. Und er ist kostenlos."', fr:'« Un endroit merveilleux, loin de la civilisation. Et c\'est gratuit. »' },
    "n9.cat": { en:"River swimming &amp; camping · 15 min", es:"Baño en el río y camping · 15 min", de:"Flussbaden &amp; Camping · 15 Min.", fr:"Baignade en rivière &amp; camping · 15 min" },
    "n9.q": { en:"Entry under $2 USD, the afternoon that reminds you why you moved.", es:"Entrada por menos de $2 USD, la tarde que te recuerda por qué te mudaste.", de:"Eintritt unter 2 USD, der Nachmittag, der Sie daran erinnert, warum Sie umgezogen sind.", fr:"Entrée à moins de 2 USD, l'après-midi qui vous rappelle pourquoi vous avez déménagé." },

    "d1.why": { en:"Daily direct flight to Fort Lauderdale, from July 2026", es:"Vuelo directo diario a Fort Lauderdale, desde julio de 2026", de:"Täglicher Direktflug nach Fort Lauderdale, ab Juli 2026", fr:"Vol direct quotidien vers Fort Lauderdale, dès juillet 2026" },
    "d2.why": { en:"Hospitals, universities, salsa, shopping, international dining", es:"Hospitales, universidades, salsa, compras, gastronomía internacional", de:"Krankenhäuser, Universitäten, Salsa, Shopping, internationale Gastronomie", fr:"Hôpitaux, universités, salsa, shopping, gastronomie internationale" },
    "d3.why": { en:"One of Latin America's most important religious sanctuaries", es:"Uno de los santuarios religiosos más importantes de América Latina", de:"Eines der wichtigsten religiösen Heiligtümer Lateinamerikas", fr:"L'un des sanctuaires religieux les plus importants d'Amérique latine" },
    "d4.why": { en:'Setting of the novel "María", National Cultural Heritage', es:'Escenario de la novela "María", Patrimonio Cultural de la Nación', de:'Schauplatz des Romans „María", nationales Kulturerbe', fr:'Cadre du roman « María », Patrimoine Culturel National' },
    "d5.why": { en:"3rd-best lake on earth for kite &amp; windsurf, 365 days of wind", es:"3.er mejor lago del mundo para kite y windsurf, 365 días de viento", de:"Drittbester See der Welt für Kite &amp; Windsurf, 365 Tage Wind", fr:"3e meilleur lac au monde pour le kite &amp; windsurf, 365 jours de vent" },
    "d6.why": { en:"Humpback whales, virgin beaches, Pacific eco-tourism", es:"Ballenas jorobadas, playas vírgenes, ecoturismo del Pacífico", de:"Buckelwale, unberührte Strände, Pazifik-Ökotourismus", fr:"Baleines à bosse, plages vierges, écotourisme du Pacifique" },

    /* REVIEWS */
    "rev.eyebrow": { en:"Social Proof", es:"Prueba Social", de:"Soziale Bestätigung", fr:"Preuve Sociale" },
    "rev.h2": { en:"What people who<br>visited already say.", es:"Lo que ya dicen<br>quienes visitaron.", de:"Was Besucher<br>bereits sagen.", fr:"Ce que disent déjà<br>les visiteurs." },
    "rev.aside": { en:"Unfiltered Google reviews from international visitors who found Ginebra on their own.", es:"Reseñas de Google sin filtrar de visitantes internacionales que descubrieron Ginebra por su cuenta.", de:"Ungefilterte Google-Bewertungen internationaler Besucher, die Ginebra selbst entdeckt haben.", fr:"Avis Google non filtrés de visiteurs internationaux qui ont découvert Ginebra par eux-mêmes." },
    "rev.1": { en:'"A fabulous park! Full of people enjoying the evening and the craft fair. I can\'t wait to go back!"', es:'"¡Un parque fabuloso! Lleno de gente disfrutando la tarde y la feria artesanal. ¡No veo la hora de volver!"', de:'„Ein fabelhafter Park! Voller Menschen, die den Abend und den Kunsthandwerkermarkt genießen. Ich kann es kaum erwarten, zurückzukehren!"', fr:'« Un parc fabuleux ! Plein de gens profitant de la soirée et de la foire artisanale. J\'ai hâte d\'y retourner ! »' },
    "rev.2": { en:'"Visited during the Mono Núñez festival. 3 days of great hospitality with back-to-back bands all day and night. Famous for authentic Sancocho Valluno."', es:'"Lo visité durante el festival Mono Núñez. 3 días de gran hospitalidad con bandas sin parar día y noche. Famoso por el auténtico Sancocho Valluno."', de:'„Während des Mono-Núñez-Festivals besucht. 3 Tage großer Gastfreundschaft mit Bands rund um die Uhr. Berühmt für authentischen Sancocho Valluno."', fr:'« Visité pendant le festival Mono Núñez. 3 jours d\'une grande hospitalité avec des groupes en continu jour et nuit. Célèbre pour son authentique Sancocho Valluno. »' },
    "rev.3": { en:'"One of the best museums around. The tour is captivating, comprehensive, and family-friendly."', es:'"Uno de los mejores museos de la zona. El recorrido es cautivador, completo y apto para toda la familia."', de:'„Eines der besten Museen der Gegend. Die Tour ist fesselnd, umfassend und familienfreundlich."', fr:'« L\'un des meilleurs musées des environs. La visite est captivante, complète et conviviale pour les familles. »' },
    "rev.4": { en:'"Beautiful place full of nature, cool water and friendly people."', es:'"Hermoso lugar lleno de naturaleza, agua fresca y gente amable."', de:'„Wunderschöner Ort voller Natur, kühlem Wasser und freundlichen Menschen."', fr:'« Bel endroit plein de nature, d\'eau fraîche et de gens accueillants. »' },
    "rev.5": { en:'"A very typical little place just outside Cali. Traditional dishes, well-presented and tasty. Highly recommended."', es:'"Un lugarcito muy típico a las afueras de Cali. Platos tradicionales, bien presentados y sabrosos. Muy recomendable."', de:'„Ein sehr typisches kleines Lokal kurz außerhalb von Cali. Traditionelle Gerichte, schön angerichtet und schmackhaft. Sehr zu empfehlen."', fr:'« Un petit endroit très typique juste à la sortie de Cali. Plats traditionnels, bien présentés et savoureux. Vivement recommandé. »' },
    "rev.6": { en:'"So fine… a place where you can go and relax, swimming and fishing. Nice food."', es:'"Qué bien… un lugar para ir a relajarse, nadar y pescar. Buena comida."', de:'„So schön… ein Ort zum Entspannen, Schwimmen und Angeln. Gutes Essen."', fr:'« Si agréable… un endroit où aller se détendre, nager et pêcher. Bonne cuisine. »' },
    "rev.note": { en:"We didn't bring them there. <em>We're bringing you.</em>", es:"No los llevamos nosotros. <em>A ti sí te llevamos.</em>", de:"Wir haben sie nicht hingebracht. <em>Sie bringen wir hin.</em>", fr:"Nous ne les y avons pas amenés. <em>Vous, nous vous y amenons.</em>" },
    "rev.lang.en": { en:"English", es:"Inglés", de:"Englisch", fr:"Anglais" },
    "rev.lang.fr": { en:"Français", es:"Francés", de:"Französisch", fr:"Français" },

    /* FAQ */
    "faq.eyebrow": { en:"Questions", es:"Preguntas", de:"Fragen", fr:"Questions" },
    "faq.h2": { en:"Everything you're<br>wondering.", es:"Todo lo que te<br>preguntas.", de:"Alles, was Sie<br>sich fragen.", fr:"Tout ce que vous<br>vous demandez." },
    "faq.q1": { en:"Is it safe to live there?", es:"¿Es seguro vivir ahí?", de:"Ist es sicher, dort zu leben?", fr:"Est-il sûr d'y vivre ?" },
    "faq.a1": { en:"Ginebra is a calm Pueblo Mágico of 21,000 with a strong community and no mass tourism. A modern city sits under an hour away, and we guide you through the rest.", es:"Ginebra es un Pueblo Mágico tranquilo de 21.000 personas, con fuerte comunidad y sin turismo masivo. Una ciudad moderna está a menos de una hora, y te guiamos en lo demás.", de:"Ginebra ist ein ruhiger Pueblo Mágico mit 21.000 Einwohnern, starker Gemeinschaft und ohne Massentourismus. Eine moderne Stadt liegt unter einer Stunde entfernt, und wir begleiten Sie beim Rest.", fr:"Ginebra est un Pueblo Mágico calme de 21 000 habitants, à forte communauté et sans tourisme de masse. Une ville moderne est à moins d'une heure, et nous vous guidons pour le reste." },
    "faq.q2": { en:"Do I need to speak Spanish?", es:"¿Necesito hablar español?", de:"Muss ich Spanisch sprechen?", fr:"Dois-je parler espagnol ?" },
    "faq.a2": { en:"Not to begin. The international community is growing and essential services increasingly speak English. Learning Spanish here comes naturally, and enjoyably, over time.", es:"No para empezar. La comunidad internacional crece y los servicios esenciales hablan cada vez más inglés. Aprender español aquí se vuelve natural, y agradable, con el tiempo.", de:"Nicht für den Anfang. Die internationale Gemeinschaft wächst und wichtige Dienste sprechen zunehmend Englisch. Spanisch zu lernen wird hier mit der Zeit natürlich, und erfreulich.", fr:"Pas pour commencer. La communauté internationale grandit et les services essentiels parlent de plus en plus anglais. Apprendre l'espagnol vient naturellement, et agréablement, avec le temps." },
    "faq.q3": { en:"What is the real cost of living?", es:"¿Cuál es el costo de vida real?", de:"Wie hoch sind die echten Lebenshaltungskosten?", fr:"Quel est le vrai coût de la vie ?" },
    "faq.a3": { en:"A comfortable month, including food, utilities, transport, healthcare and leisure, typically runs $1,500–2,000 USD, several times less than Florida or Germany.", es:"Un mes cómodo, incluyendo comida, servicios, transporte, salud y ocio, suele costar $1.500–2.000 USD, varias veces menos que en Florida o Alemania.", de:"Ein komfortabler Monat, einschließlich Essen, Nebenkosten, Transport, Gesundheit und Freizeit, kostet meist 1.500–2.000 USD, ein Mehrfaches weniger als Florida oder Deutschland.", fr:"Un mois confortable, incluant nourriture, charges, transport, santé et loisirs, coûte généralement 1 500–2 000 USD, plusieurs fois moins qu'en Floride ou en Allemagne." },
    "faq.q4": { en:"What if I need city-level healthcare?", es:"¿Y si necesito atención médica de nivel urbano?", de:"Was, wenn ich medizinische Versorgung auf Stadtniveau brauche?", fr:"Et si j'ai besoin de soins de niveau urbain ?" },
    "faq.a4": { en:"Metropolitan Cali, over 2 million people, sits under an hour away, with major hospitals, clinics, universities and shopping. Country peace; the city handles the rest.", es:"El área metropolitana de Cali, más de 2 millones, está a menos de una hora, con grandes hospitales, clínicas, universidades y compras. Paz del campo; la ciudad hace el resto.", de:"Der Großraum Cali, über 2 Millionen, liegt unter einer Stunde entfernt, mit großen Krankenhäusern, Kliniken, Universitäten und Einkauf. Landruhe; die Stadt erledigt den Rest.", fr:"L'agglomération de Cali, plus de 2 millions, est à moins d'une heure, avec grands hôpitaux, cliniques, universités et commerces. Le calme; la ville fait le reste." },

    /* CTA */
    "cta.eyebrow": { en:"Ready to explore?", es:"¿Listo para explorar?", de:"Bereit zu entdecken?", fr:"Prêt à explorer ?" },
    "cta.h2": { en:"Start with the free 2026 living guide.", es:"Empieza con la guía de vida 2026 gratuita.", de:"Beginnen Sie mit dem kostenlosen Leitfaden 2026.", fr:"Commencez par le guide de vie 2026 gratuit." },
    "cta.body": { en:"No commitment. No spam. Just what you need to make a real decision about life in the Valle del Cauca.", es:"Sin compromiso. Sin spam. Solo lo que necesitas para decidir de verdad sobre una vida en el Valle del Cauca.", de:"Keine Verpflichtung. Kein Spam. Nur das, was Sie für eine echte Entscheidung über ein Leben im Valle del Cauca brauchen.", fr:"Sans engagement. Sans spam. Juste ce qu'il vous faut pour décider d'une vie dans le Valle del Cauca." },
    "cta.r1": { en:"We respond to every inquiry within 24 hours", es:"Respondemos cada consulta en menos de 24 horas", de:"Wir beantworten jede Anfrage innerhalb von 24 Stunden", fr:"Nous répondons à chaque demande sous 24 heures" },
    "cta.r2": { en:"Your information is never shared", es:"Tu información nunca se comparte", de:"Ihre Daten werden niemals weitergegeben", fr:"Vos informations ne sont jamais partagées" },
    "cta.r3": { en:"English · Deutsch · Svenska · Français", es:"Inglés · Alemán · Sueco · Francés", de:"Englisch · Deutsch · Schwedisch · Französisch", fr:"Anglais · Allemand · Suédois · Français" },

    /* FORM */
    "form.s1.h": { en:"Who we're speaking with", es:"Con quién hablamos", de:"Mit wem wir sprechen", fr:"À qui nous parlons" },
    "form.s1.hint": { en:"Just the essentials to begin.", es:"Solo lo esencial para comenzar.", de:"Nur das Wesentliche zum Start.", fr:"Juste l'essentiel pour commencer." },
    "form.fname": { en:"First name", es:"Nombre", de:"Vorname", fr:"Prénom" },
    "form.fname.ph": { en:"Your name", es:"Tu nombre", de:"Ihr Vorname", fr:"Votre prénom" },
    "form.lname": { en:"Last name", es:"Apellido", de:"Nachname", fr:"Nom" },
    "form.lname.ph": { en:"Your surname", es:"Tu apellido", de:"Ihr Nachname", fr:"Votre nom" },
    "form.country": { en:"Where you're writing from", es:"Desde dónde nos escribes", de:"Woher Sie schreiben", fr:"D'où vous nous écrivez" },
    "form.selcountry": { en:"Select your country", es:"Selecciona tu país", de:"Wählen Sie Ihr Land", fr:"Sélectionnez votre pays" },
    "form.c.us": { en:"United States", es:"Estados Unidos", de:"Vereinigte Staaten", fr:"États-Unis" },
    "form.c.ca": { en:"Canada", es:"Canadá", de:"Kanada", fr:"Canada" },
    "form.c.de": { en:"Germany", es:"Alemania", de:"Deutschland", fr:"Allemagne" },
    "form.c.se": { en:"Sweden", es:"Suecia", de:"Schweden", fr:"Suède" },
    "form.c.uk": { en:"United Kingdom", es:"Reino Unido", de:"Vereinigtes Königreich", fr:"Royaume-Uni" },
    "form.c.nl": { en:"Netherlands", es:"Países Bajos", de:"Niederlande", fr:"Pays-Bas" },
    "form.c.fr": { en:"France", es:"Francia", de:"Frankreich", fr:"France" },
    "form.c.other": { en:"Other", es:"Otro", de:"Andere", fr:"Autre" },
    "form.s2.h": { en:"How to reach you", es:"Cómo contactarte", de:"Wie wir Sie erreichen", fr:"Comment vous joindre" },
    "form.s2.hint": { en:"We'll only use it to send the guide and arrange your call.", es:"Solo lo usaremos para enviar la guía y coordinar tu llamada.", de:"Wir nutzen es nur, um den Leitfaden zu senden und Ihren Anruf zu vereinbaren.", fr:"Nous l'utiliserons uniquement pour envoyer le guide et organiser votre appel." },
    "form.method": { en:"Preferred way to be contacted", es:"Forma de contacto preferida", de:"Bevorzugte Kontaktart", fr:"Moyen de contact préféré" },
    "form.byemail": { en:"By email", es:"Por correo", de:"Per E-Mail", fr:"Par e-mail" },
    "form.byemail.sm": { en:"We'll write to you", es:"Te escribiremos", de:"Wir schreiben Ihnen", fr:"Nous vous écrirons" },
    "form.byphone": { en:"By phone or WhatsApp", es:"Por teléfono o WhatsApp", de:"Per Telefon oder WhatsApp", fr:"Par téléphone ou WhatsApp" },
    "form.byphone.sm": { en:"We'll call or message", es:"Te llamaremos o escribiremos", de:"Wir rufen an oder schreiben", fr:"Nous appellerons ou écrirons" },
    "form.email": { en:"Email", es:"Correo electrónico", de:"E-Mail", fr:"E-mail" },
    "form.phone": { en:"Phone or WhatsApp", es:"Teléfono o WhatsApp", de:"Telefon oder WhatsApp", fr:"Téléphone ou WhatsApp" },
    "form.dialnote": { en:"Prefix set from your country, edit it if you need a different one.", es:"Prefijo según tu país, edítalo si necesitas otro.", de:"Vorwahl nach Ihrem Land, ändern Sie sie bei Bedarf.", fr:"Préfixe défini selon votre pays, modifiez-le si nécessaire." },
    "form.s3.h": { en:"What draws you here", es:"Qué te trae aquí", de:"Was Sie hierher zieht", fr:"Ce qui vous attire ici" },
    "form.s3.hint": { en:"So we can send what's most relevant to you.", es:"Para enviarte lo más relevante.", de:"Damit wir Ihnen das Relevanteste senden können.", fr:"Pour vous envoyer ce qui vous concerne le plus." },
    "form.interest": { en:"What interests you most", es:"Qué te interesa más", de:"Was interessiert Sie am meisten", fr:"Ce qui vous intéresse le plus" },
    "form.i1": { en:"A place to live", es:"Un lugar para vivir", de:"Ein Ort zum Leben", fr:"Un lieu où vivre" },
    "form.i1.sm": { en:"Lifestyle &amp; retirement", es:"Estilo de vida y retiro", de:"Lebensstil &amp; Ruhestand", fr:"Mode de vie &amp; retraite" },
    "form.i2": { en:"An investment", es:"Una inversión", de:"Eine Investition", fr:"Un investissement" },
    "form.i2.sm": { en:"Value &amp; growth", es:"Valor y crecimiento", de:"Wert &amp; Wachstum", fr:"Valeur &amp; croissance" },
    "form.i3": { en:"Both", es:"Ambos", de:"Beides", fr:"Les deux" },
    "form.i3.sm": { en:"Lifestyle and returns", es:"Estilo de vida y rendimiento", de:"Lebensstil und Rendite", fr:"Mode de vie et rendement" },
    "form.i4": { en:"Still exploring", es:"Aún explorando", de:"Noch am Erkunden", fr:"Encore en exploration" },
    "form.i4.sm": { en:"Just curious for now", es:"Solo con curiosidad por ahora", de:"Vorerst nur neugierig", fr:"Juste curieux pour l'instant" },
    "form.when": { en:"When are you thinking", es:"Cuándo lo piensas", de:"Woran denken Sie zeitlich", fr:"Quand y pensez-vous" },
    "form.when.ph": { en:"Select a timeframe", es:"Selecciona un plazo", de:"Zeitrahmen wählen", fr:"Choisissez un délai" },
    "form.when1": { en:"Within the year", es:"Dentro del año", de:"Innerhalb des Jahres", fr:"Dans l'année" },
    "form.when2": { en:"One to two years", es:"De uno a dos años", de:"In ein bis zwei Jahren", fr:"D'un à deux ans" },
    "form.when3": { en:"Simply dreaming, for now", es:"Solo soñando, por ahora", de:"Vorerst nur am Träumen", fr:"Je rêve, pour l'instant" },
    "form.continue": { en:"Continue", es:"Continuar", de:"Weiter", fr:"Continuer" },
    "form.send": { en:"Send me the guide", es:"Envíame la guía", de:"Leitfaden senden", fr:"Envoyez-moi le guide" },
    "form.back": { en:"← Back", es:"← Atrás", de:"← Zurück", fr:"← Retour" },
    "form.thanks.h": { en:"Thank you.", es:"Gracias.", de:"Vielen Dank.", fr:"Merci." },
    "form.thanks.p": { en:"Your 2026 guide is on its way, and we'll write within a day. Welcome to the beginning of your endless spring.", es:"Tu guía 2026 está en camino, y te escribiremos en un día. Bienvenido al comienzo de tu eterna primavera.", de:"Ihr Leitfaden 2026 ist unterwegs, und wir schreiben Ihnen innerhalb eines Tages. Willkommen zum Beginn Ihres endlosen Frühlings.", fr:"Votre guide 2026 est en route, et nous vous écrirons sous un jour. Bienvenue au début de votre printemps sans fin." },
    "form.msg.fname": { en:"Please enter your first name.", es:"Por favor, ingresa tu nombre.", de:"Bitte geben Sie Ihren Vornamen ein.", fr:"Veuillez saisir votre prénom." },
    "form.msg.lname": { en:"Please enter your last name.", es:"Por favor, ingresa tu apellido.", de:"Bitte geben Sie Ihren Nachnamen ein.", fr:"Veuillez saisir votre nom." },
    "form.msg.country": { en:"Please select your country.", es:"Por favor, selecciona tu país.", de:"Bitte wählen Sie Ihr Land.", fr:"Veuillez sélectionner votre pays." },
    "form.msg.method": { en:"Please choose how to reach you.", es:"Por favor, elige cómo contactarte.", de:"Bitte wählen Sie eine Kontaktart.", fr:"Veuillez choisir comment vous joindre." },
    "form.msg.email": { en:"Please enter a valid email address.", es:"Por favor, ingresa un correo válido.", de:"Bitte geben Sie eine gültige E-Mail-Adresse ein.", fr:"Veuillez saisir une adresse e-mail valide." },
    "form.msg.phone": { en:"Please enter your number.", es:"Por favor, ingresa tu número.", de:"Bitte geben Sie Ihre Nummer ein.", fr:"Veuillez saisir votre numéro." },
    "form.msg.choice": { en:"Please choose one.", es:"Por favor, elige una opción.", de:"Bitte wählen Sie eine Option.", fr:"Veuillez en choisir une." },
    "form.msg.when": { en:"Please select a timeframe.", es:"Por favor, selecciona un plazo.", de:"Bitte wählen Sie einen Zeitrahmen.", fr:"Veuillez choisir un délai." },

    /* FOOTER */
    "foot.explore": { en:"Explore", es:"Explorar", de:"Entdecken", fr:"Explorer" },
    "foot.l1": { en:"The Valle del Cauca", es:"El Valle del Cauca", de:"Das Valle del Cauca", fr:"Le Valle del Cauca" },
    "foot.l3": { en:"Finca San Antonio", es:"Finca San Antonio", de:"Finca San Antonio", fr:"Finca San Antonio" },
    "foot.l4": { en:"What's nearby", es:"Qué hay cerca", de:"In der Nähe", fr:"À proximité" },
    "foot.contact": { en:"Contact", es:"Contacto", de:"Kontakt", fr:"Contact" },
    "foot.reply": { en:"We reply within 24 hours", es:"Respondemos en menos de 24 horas", de:"Wir antworten innerhalb von 24 Stunden", fr:"Nous répondons sous 24 heures" },
    "foot.social": { en:"All our socials →", es:"Todas nuestras redes →", de:"Alle unsere Kanäle →", fr:"Tous nos réseaux →" },
    "foot.copy": { en:"© 2026 Living Home Colombia · Finca San Antonio", es:"© 2026 Living Home Colombia · Finca San Antonio", de:"© 2026 Living Home Colombia · Finca San Antonio", fr:"© 2026 Living Home Colombia · Finca San Antonio" },
    "foot.tag": { en:"A new life in Colombia's eternal spring", es:"Una nueva vida en la eterna primavera de Colombia", de:"Ein neues Leben in Kolumbiens ewigem Frühling", fr:"Une nouvelle vie dans le printemps éternel de Colombie" },
    "foot.tagline": { en:"A new life in Colombia's eternal spring.", es:"Una nueva vida en la eterna primavera de Colombia.", de:"Ein neues Leben in Kolumbiens ewigem Frühling.", fr:"Une nouvelle vie dans le printemps éternel de Colombie." }
  };

  /* ---- helpers ---- */
  function t(key, lang) { var e = T[key]; return e ? (e[lang] || e.en) : null; }

  function detect() {
    var saved = localStorage.getItem("aluna-lang");
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    for (var i = 0; i < LANGS.length; i++) if (nav.indexOf(LANGS[i]) === 0) return LANGS[i];
    return "en";
  }

  var currentLang = "en";

  function apply(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem("aluna-lang", lang);

    // selector state
    var trigCode = document.querySelector(".lang-trigger .lt-code");
    if (trigCode) trigCode.textContent = CODES[lang];
    document.querySelectorAll(".lang-item").forEach(function (o) {
      o.classList.toggle("active", o.getAttribute("data-lang") === lang);
    });

    // text nodes
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = t(el.getAttribute("data-i18n"), lang);
      if (val == null) return;
      el.innerHTML = val;
    });
    // placeholders
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var val = t(el.getAttribute("data-i18n-ph"), lang);
      if (val != null) el.placeholder = val;
    });

    // dynamic button label (form next/continue)
    if (window.alunaFormRefresh) window.alunaFormRefresh();
    if (window.alunaGalleryRefresh) window.alunaGalleryRefresh();

    // close dropdown
    var dd = document.querySelector(".lang-dropdown");
    if (dd) dd.classList.remove("open");
  }

  /* ---- build dropdown selector ---- */
  function buildSelector() {
    var old = document.querySelector(".nav-links .lang");
    if (!old) return;

    var dd = document.createElement("div");
    dd.className = "lang-dropdown";

    var trigger = document.createElement("button");
    trigger.className = "lang-trigger";
    trigger.setAttribute("aria-label", "Select language");
    trigger.innerHTML =
      '<svg class="lt-globe" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3 12h18M12 2.8c2.6 2.4 4 5.8 4 9.2s-1.4 6.8-4 9.2c-2.6-2.4-4-5.8-4-9.2s1.4-6.8 4-9.2z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>' +
      '<span class="lt-code">EN</span>' +
      '<svg class="lt-chev" viewBox="0 0 12 8" width="10" height="7" aria-hidden="true"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>';

    var menu = document.createElement("div");
    menu.className = "lang-menu";
    LANGS.forEach(function (l) {
      var item = document.createElement("button");
      item.className = "lang-item";
      item.setAttribute("data-lang", l);
      item.innerHTML = '<span class="li-badge">' + CODES[l] + '</span><span class="li-name">' + NAMES[l] + "</span>";
      item.addEventListener("click", function (ev) { ev.preventDefault(); ev.stopPropagation(); apply(l); });
      menu.appendChild(item);
    });

    dd.appendChild(trigger);
    dd.appendChild(menu);
    old.parentNode.replaceChild(dd, old);

    trigger.addEventListener("click", function (ev) {
      ev.preventDefault(); ev.stopPropagation();
      dd.classList.toggle("open");
    });
    document.addEventListener("click", function (ev) {
      if (!dd.contains(ev.target)) dd.classList.remove("open");
    });
  }

  buildSelector();
  apply(detect());

  window.alunaI18n = { apply: apply, current: function () { return currentLang; }, t: t };
})();