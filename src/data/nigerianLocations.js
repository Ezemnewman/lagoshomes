/**
 * All 36 Nigerian states plus FCT with their Local Government Areas.
 * Used by the Add New Listing wizard's location step so agents can
 * select a real, valid location rather than typing freeform text.
 *
 * LGAs sourced from Nigeria's official INEC administrative divisions.
 * Kept as a separate data file (not inlined into the component) so a
 * future backend that provides this data via API can replace this
 * import without touching any component file.
 *
 * TODO: once a backend exists, this can be seeded into the database
 * and served from GET /api/locations/states and
 * GET /api/locations/states/:stateId/lgas — the component already
 * uses an async-friendly shape that won't need changing for that swap.
 */
export const NIGERIAN_STATES = [
  { name: "Abia", lgas: ["Aba North","Aba South","Arochukwu","Bende","Ikwuano","Isiala Ngwa North","Isiala Ngwa South","Isuikwuato","Obi Ngwa","Ohafia","Osisioma","Ugwunagbo","Ukwa East","Ukwa West","Umuahia North","Umuahia South","Umu Nneochi"] },
  { name: "Adamawa", lgas: ["Demsa","Fufure","Ganye","Gayuk","Gombi","Grie","Hong","Jada","Lamurde","Madagali","Maiha","Mayo Belwa","Michika","Mubi North","Mubi South","Numan","Shelleng","Song","Toungo","Yola North","Yola South"] },
  { name: "Akwa Ibom", lgas: ["Abak","Eastern Obolo","Eket","Esit-Eket","Essien Udim","Etim Ekpo","Etinan","Ibeno","Ibesikpo Asutan","Ibiono-Ibom","Ika","Ikono","Ikot Abasi","Ikot Ekpene","Ini","Itu","Mbo","Mkpat-Enin","Nsit-Atai","Nsit-Ibom","Nsit-Ubium","Obot Akara","Okobo","Onna","Oron","Oruk Anam","Udung-Uko","Ukanafun","Uruan","Urue-Offong/Oruko","Uyo"] },
  { name: "Anambra", lgas: ["Aguata","Anambra East","Anambra West","Anaocha","Awka North","Awka South","Ayamelum","Dunukofia","Ekwusigo","Idemili North","Idemili South","Ihiala","Njikoka","Nnewi North","Nnewi South","Ogbaru","Onitsha North","Onitsha South","Orumba North","Orumba South","Oyi"] },
  { name: "Bauchi", lgas: ["Alkaleri","Bauchi","Bogoro","Damban","Darazo","Dass","Gamawa","Ganjuwa","Giade","Itas/Gadau","Jama'are","Katagum","Kirfi","Misau","Ningi","Shira","Tafawa Balewa","Toro","Warji","Zaki"] },
  { name: "Bayelsa", lgas: ["Brass","Ekeremor","Kolokuma/Opokuma","Nembe","Ogbia","Sagbama","Southern Ijaw","Yenagoa"] },
  { name: "Benue", lgas: ["Agatu","Apa","Ado","Buruku","Gboko","Guma","Gwer East","Gwer West","Katsina-Ala","Konshisha","Kwande","Logo","Makurdi","Obi","Ogbadibo","Ohimini","Oju","Okpokwu","Oturkpo","Tarka","Ukum","Ushongo","Vandeikya"] },
  { name: "Borno", lgas: ["Abadam","Askira/Uba","Bama","Bayo","Biu","Chibok","Damboa","Dikwa","Gubio","Guzamala","Gwoza","Hawul","Jere","Kaga","Kala/Balge","Konduga","Kukawa","Kwaya Kusar","Mafa","Magumeri","Maiduguri","Marte","Mobbar","Monguno","Ngala","Nganzai","Shani"] },
  { name: "Cross River", lgas: ["Abi","Akamkpa","Akpabuyo","Bakassi","Bekwarra","Biase","Boki","Calabar Municipal","Calabar South","Etung","Ikom","Obanliku","Obubra","Obudu","Odukpani","Ogoja","Yakuur","Yala"] },
  { name: "Delta", lgas: ["Aniocha North","Aniocha South","Bomadi","Burutu","Ethiope East","Ethiope West","Ika North East","Ika South","Isoko North","Isoko South","Ndokwa East","Ndokwa West","Okpe","Oshimili North","Oshimili South","Patani","Sapele","Udu","Ughelli North","Ughelli South","Ukwuani","Uvwie","Warri North","Warri South","Warri South West"] },
  { name: "Ebonyi", lgas: ["Abakaliki","Afikpo North","Afikpo South","Ebonyi","Ezza North","Ezza South","Ikwo","Ishielu","Ivo","Izzi","Ohaozara","Ohaukwu","Onicha"] },
  { name: "Edo", lgas: ["Akoko-Edo","Egor","Esan Central","Esan North-East","Esan South-East","Esan West","Etsako Central","Etsako East","Etsako West","Igueben","Ikpoba Okha","Orhionmwon","Oredo","Ovia North-East","Ovia South-West","Owan East","Owan West","Uhunmwonde"] },
  { name: "Ekiti", lgas: ["Ado Ekiti","Efon","Ekiti East","Ekiti South-West","Ekiti West","Emure","Gbonyin","Ido/Osi","Ijero","Ikere","Ikole","Ilejemeje","Irepodun/Ifelodun","Ise/Orun","Moba","Oye"] },
  { name: "Enugu", lgas: ["Aninri","Awgu","Enugu East","Enugu North","Enugu South","Ezeagu","Igbo Etiti","Igbo Eze North","Igbo Eze South","Isi Uzo","Nkanu East","Nkanu West","Nsukka","Oji River","Udenu","Udi","Uzo Uwani"] },
  { name: "FCT", lgas: ["Abaji","Bwari","Gwagwalada","Kuje","Kwali","Municipal Area Council"] },
  { name: "Gombe", lgas: ["Akko","Balanga","Billiri","Dukku","Funakaye","Gombe","Kaltungo","Kwami","Nafada","Shomgom","Yamaltu/Deba"] },
  { name: "Imo", lgas: ["Aboh Mbaise","Ahiazu Mbaise","Ehime Mbano","Ezinihitte","Ideato North","Ideato South","Ihitte/Uboma","Ikeduru","Isiala Mbano","Isu","Mbaitoli","Ngor Okpala","Njaba","Nkwerre","Nwangele","Obowo","Oguta","Ohaji/Egbema","Okigwe","Orlu","Orsu","Oru East","Oru West","Owerri Municipal","Owerri North","Owerri West","Unuimo"] },
  { name: "Jigawa", lgas: ["Auyo","Babura","Biriniwa","Birnin Kudu","Buji","Dutse","Gagarawa","Garki","Gumel","Guri","Gwaram","Gwiwa","Hadejia","Jahun","Kafin Hausa","Kaugama","Kazaure","Kiri Kasama","Kiyawa","Maigatari","Malam Madori","Miga","Ringim","Roni","Sule Tankarkar","Taura","Yankwashi"] },
  { name: "Kaduna", lgas: ["Birnin Gwari","Chikun","Giwa","Igabi","Ikara","Jaba","Jema'a","Kachia","Kaduna North","Kaduna South","Kagarko","Kajuru","Kaura","Kauru","Kubau","Kudan","Lere","Makarfi","Sabon Gari","Sanga","Soba","Zangon Kataf","Zaria"] },
  { name: "Kano", lgas: ["Ajingi","Albasu","Bagwai","Bebeji","Bichi","Bunkure","Dala","Dambatta","Dawakin Kudu","Dawakin Tofa","Doguwa","Fagge","Gabasawa","Garko","Garun Mallam","Gaya","Gezawa","Gwale","Gwarzo","Kabo","Kano Municipal","Karaye","Kibiya","Kiru","Kumbotso","Kunchi","Kura","Madobi","Makoda","Minjibir","Nasarawa","Rano","Rimin Gado","Rogo","Shanono","Sumaila","Takai","Tarauni","Tofa","Tsanyawa","Tudun Wada","Ungogo","Warawa","Wudil"] },
  { name: "Katsina", lgas: ["Bakori","Batagarawa","Batsari","Baure","Bindawa","Charanchi","Dandume","Danja","Dan Musa","Daura","Dutsi","Dutsin Ma","Faskari","Funtua","Ingawa","Jibia","Kafur","Kaita","Kankara","Kankia","Katsina","Kurfi","Kusada","Mai'adua","Malumfashi","Mani","Mashi","Matazu","Musawa","Rimi","Sabuwa","Safana","Sandamu","Zango"] },
  { name: "Kebbi", lgas: ["Aliero","Arewa","Argungu","Augie","Bagudo","Birnin Kebbi","Bunza","Dandi","Fakai","Gwandu","Jega","Kalgo","Koko/Besse","Maiyama","Ngaski","Sakaba","Shanga","Suru","Wasagu/Danko","Yauri","Zuru"] },
  { name: "Kogi", lgas: ["Adavi","Ajaokuta","Ankpa","Bassa","Dekina","Ibaji","Idah","Igalamela Odolu","Ijumu","Kabba/Bunu","Kogi","Lokoja","Mopa Muro","Ofu","Ogori/Magongo","Okehi","Okene","Olamaboro","Omala","Yagba East","Yagba West"] },
  { name: "Kwara", lgas: ["Asa","Baruten","Edu","Ekiti","Ifelodun","Ilorin East","Ilorin South","Ilorin West","Irepodun","Isin","Kaiama","Moro","Offa","Oke Ero","Oyun","Pategi"] },
  { name: "Lagos", lgas: ["Agege","Ajeromi-Ifelodun","Alimosho","Amuwo-Odofin","Apapa","Badagry","Epe","Eti-Osa","Ibeju-Lekki","Ifako-Ijaye","Ikeja","Ikorodu","Kosofe","Lagos Island","Lagos Mainland","Mushin","Ojo","Oshodi-Isolo","Shomolu","Surulere"] },
  { name: "Nasarawa", lgas: ["Akwanga","Awe","Doma","Karu","Keana","Keffi","Kokona","Lafia","Nasarawa","Nasarawa Egon","Obi","Toto","Wamba"] },
  { name: "Niger", lgas: ["Agaie","Agwara","Bida","Borgu","Bosso","Chanchaga","Edati","Gbako","Gurara","Katcha","Kontagora","Lapai","Lavun","Magama","Mariga","Mashegu","Mokwa","Moya","Paikoro","Rafi","Rijau","Shiroro","Suleja","Tafa","Wushishi"] },
  { name: "Ogun", lgas: ["Abeokuta North","Abeokuta South","Ado-Odo/Ota","Egbado North","Egbado South","Ewekoro","Ifo","Ijebu East","Ijebu North","Ijebu North East","Ijebu Ode","Ikenne","Imeko Afon","Ipokia","Obafemi Owode","Odeda","Odogbolu","Ogun Waterside","Remo North","Shagamu"] },
  { name: "Ondo", lgas: ["Akoko North-East","Akoko North-West","Akoko South-East","Akoko South-West","Akure North","Akure South","Ese Odo","Idanre","Ifedore","Ilaje","Ile Oluji/Okeigbo","Irele","Odigbo","Okitipupa","Ondo East","Ondo West","Ose","Owo"] },
  { name: "Osun", lgas: ["Atakunmosa East","Atakunmosa West","Aiyedaade","Aiyedire","Boluwaduro","Boripe","Ede North","Ede South","Egbedore","Ejigbo","Ife Central","Ife East","Ife North","Ife South","Ifedayo","Ifelodun","Ila","Ilesa East","Ilesa West","Irepodun","Irewole","Isokan","Iwo","Obokun","Odo Otin","Ola Oluwa","Olorunda","Oriade","Orolu","Osogbo"] },
  { name: "Oyo", lgas: ["Afijio","Akinyele","Atiba","Atisbo","Egbeda","Ibadan North","Ibadan North-East","Ibadan North-West","Ibadan South-East","Ibadan South-West","Ibarapa Central","Ibarapa East","Ibarapa North","Ido","Irepo","Iseyin","Itesiwaju","Iwajowa","Kajola","Lagelu","Ogbomosho North","Ogbomosho South","Ogo Oluwa","Olorunsogo","Oluyole","Ona Ara","Orelope","Ori Ire","Oyo East","Oyo West","Saki East","Saki West","Surulere"] },
  { name: "Plateau", lgas: ["Barkin Ladi","Bassa","Bokkos","Jos East","Jos North","Jos South","Kanam","Kanke","Langtang North","Langtang South","Mangu","Mikang","Pankshin","Qua'an Pan","Riyom","Shendam","Wase"] },
  { name: "Rivers", lgas: ["Abua/Odual","Ahoada East","Ahoada West","Akuku-Toru","Andoni","Asari-Toru","Bonny","Degema","Eleme","Emohua","Etche","Gokana","Ikwerre","Khana","Obio/Akpor","Ogba/Egbema/Ndoni","Ogu/Bolo","Okrika","Omuma","Opobo/Nkoro","Oyigbo","Port Harcourt","Tai"] },
  { name: "Sokoto", lgas: ["Binji","Bodinga","Dange Shuni","Gada","Goronyo","Gudu","Gwadabawa","Illela","Isa","Kebbe","Kware","Rabah","Sabon Birni","Shagari","Silame","Sokoto North","Sokoto South","Tambuwal","Tangaza","Tureta","Wamako","Wurno","Yabo"] },
  { name: "Taraba", lgas: ["Ardo Kola","Bali","Donga","Gashaka","Gassol","Ibi","Jalingo","Karim Lamido","Kumi","Lau","Sardauna","Takum","Ussa","Wukari","Yorro","Zing"] },
  { name: "Yobe", lgas: ["Bade","Bursari","Damaturu","Fika","Fune","Geidam","Gujba","Gulani","Jakusko","Karasuwa","Machina","Nangere","Nguru","Potiskum","Tarmua","Tarmuwa","Yunusari","Yusufari"] },
  { name: "Zamfara", lgas: ["Anka","Bakura","Birnin Magaji/Kiyaw","Bukkuyum","Bungudu","Gummi","Gusau","Kaura Namoda","Maradun","Maru","Shinkafi","Talata Mafara","Tsafe","Zurmi"] },
];

/**
 * Property types for the listing wizard's Basic Details step.
 * Kept separate so adding "Warehouse" or "Hotel" later is a one-line
 * data change, not a markup edit.
 */
export const PROPERTY_TYPES_LIST = [
  "Detached House",
  "Semi-Detached House",
  "Terraced House",
  "Duplex",
  "Bungalow",
  "Flat / Apartment",
  "Studio",
  "Mini Flat",
  "Block of Flats",
  "Self-Contained",
  "Land",
  "Office Space",
  "Warehouse",
  "Shop",
  "Shortlet",
];

export const LISTING_TYPES_LIST = ["For Sale", "For Rent", "Shortlet"];

export const AMENITIES_LIST = [
  { id: "electricity", label: "24/7 Electricity" },
  { id: "water", label: "Water Supply" },
  { id: "security", label: "Security" },
  { id: "parking", label: "Parking" },
  { id: "furnished", label: "Furnished" },
  { id: "ac", label: "Air Conditioning" },
  { id: "pool", label: "Swimming Pool" },
  { id: "gym", label: "Gym" },
  { id: "wifi", label: "Wi-Fi" },
  { id: "cctv", label: "CCTV" },
  { id: "generator", label: "Generator" },
  { id: "serviced", label: "Serviced" },
  { id: "bq", label: "Boys' Quarters" },
  { id: "garden", label: "Garden" },
  { id: "elevator", label: "Elevator" },
];

/**
 * Subscription tiers for the Agent Portal billing screen.
 * Same pattern: data drives the UI, so changing a price or adding a tier
 * is a data edit, not a component edit.
 */
export const SUBSCRIPTION_TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: 15000,
    period: "month",
    formattedPrice: "₦15,000",
    description: "Perfect for individual agents just getting started",
    features: [
      "Up to 5 active listings",
      "Standard listing visibility",
      "Basic analytics",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 35000,
    period: "month",
    formattedPrice: "₦35,000",
    description: "For growing agents who need more reach and features",
    features: [
      "Up to 20 active listings",
      "Featured listing slots",
      "Advanced analytics",
      "Priority support",
      "WhatsApp integration",
    ],
    cta: "Upgrade Now",
    highlighted: true,
  },
  {
    id: "agency",
    name: "Agency",
    price: 75000,
    period: "month",
    formattedPrice: "₦75,000",
    description: "For agencies managing multiple agents and listings",
    features: [
      "Unlimited listings",
      "All Professional features",
      "Team accounts (up to 10)",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

/**
 * Demo data for the agent's My Listings page
 */
export const MY_AGENT_LISTINGS = [
  {
    id: "ml1",
    title: "Luxury 4 Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    formattedPrice: "₦150,000,000",
    type: "For Sale",
    status: "active",
    views: 248,
    inquiries: 12,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNH9P9UQcYTPLw1_G-LvypRQybhMDPxyKJV3bLco1cAyPsNDTzJFBOdbSGipv5kHze-UfiCbhxjHvLvqQFREscfcxsoPR0Oubx9Yult5zOFrd8xRLebkI67Rl0y6EDv7FBnTXN8Y6lFGjHVsHn5N4rz7OjkVipo-sbh_FwcwKFtKbJjzQnOc1BRVuxgkbbI26vchEqhdCEjlXkhPcH1lKf1i7iRgSh-o3QzB4ZXYenRvHT5fJXfWyk3JzW50Gm4GRdsXGpGYObQ3aV",
  },
  {
    id: "ml2",
    title: "3 Bedroom Flat",
    location: "Ikeja, Lagos",
    formattedPrice: "₦45,000,000",
    type: "For Sale",
    status: "active",
    views: 134,
    inquiries: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVF1Ex1Aks04Kyvr2pesSd1qGAZORCNPaiSR62Vk6bxGcuPNNg6SrvBwy4A5RT-74xHd_amJBGBe1c9ZK_tMHrLhYvyrh7Q9byUZOBY0pzmAZgtegyrZsbpqKQSiE4Rpajce9bp05huLW7TyiXM_CvgyhARZcOTwU8o3us6yGOiPXHUxmlFOkhU2bF1HjFMfzuv1e-_IyUkfKVHRyXUJn07cuHCBxnBX5Bhl0duykHoWnfKz-4W6d523Us_dQEWplbAroOnc3izsQF",
  },
  {
    id: "ml3",
    title: "Office Space",
    location: "Victoria Island, Lagos",
    formattedPrice: "₦8,500,000 / year",
    type: "For Rent",
    status: "pending",
    views: 67,
    inquiries: 3,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAherY8fw8ksUGM029Y2Z4Sb_9yKPhdp8tpKQ_7-6UQ5geM61gloS_Wcl4vS9JBMX84l_7rOgFYHEd7aKl92TLY2QNRK9w5UcVoTcH6zleFOjbKQHQgte0wyZpX5zUY3vfKT4v6fKqRT9RE1bNlcGI-p5Nf8A0Jzki1vkBkKfeI9hll338inaDGbMqer0Bh6ffs6xw1LtPu55w7_YLrVoOkVWN3X7byUklNluHw55r7yuhC_9jB8si7LymsATpB1g06DPClvLU2L87Y",
  },
];

/**
 * Super Admin demo data
 */
export const ADMIN_SUMMARY_STATS = [
  { label: "Total Users", value: "12,847", trend: "+12%", icon: "group" },
  { label: "Active Listings", value: "3,421", trend: "+8%", icon: "home_work" },
  { label: "Verified Agents", value: "284", trend: "+5%", icon: "verified_user" },
  { label: "Revenue (Oct)", value: "₦4.2M", trend: "+18%", icon: "payments" },
];
