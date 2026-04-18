export interface City {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  era: string;
  coordinates: [number, number];
  highlights: string[];
  bannerImage: string;
}

export const CITIES: City[] = [
  {
    id: 'xian',
    name: "Xi'an",
    nameZh: "西安",
    description: "The ancient Chang'an, capital of 13 dynasties including Han and Tang. The heart of the Silk Road.",
    descriptionZh: "古称长安，十三朝古都，汉唐盛世之魂，丝绸之路的起点。",
    era: "Han, Tang, Ming",
    coordinates: [34.2634, 108.9487],
    highlights: ["Terracotta Army", "City Wall", "Giant Wild Goose Pagoda"],
    bannerImage: "https://images.unsplash.com/photo-1610486337535-618476839556?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'luoyang',
    name: "Luoyang",
    nameZh: "洛阳",
    description: "Known as the 'God's City', it was the center of China for centuries during the Zhou and Sui-Tang periods.",
    descriptionZh: "神都洛阳，周、隋唐时期的中国中心，牡丹之乡，龙门宝库。",
    era: "Zhou, Han, Wei, Tang",
    coordinates: [34.6197, 112.4539],
    highlights: ["Longmen Grottoes", "White Horse Temple", "Luoyang Old City"],
    bannerImage: "https://images.unsplash.com/photo-1547984609-906d96e87f17?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'beijing',
    name: "Beijing",
    nameZh: "北京",
    description: "The capital of Ming and Qing dynasties, home to the world's grandest palace complex.",
    descriptionZh: "明清皇城，故宫、长城，集中国古代建筑营造成就之大成。",
    era: "Yuan, Ming, Qing",
    coordinates: [39.9042, 116.4074],
    highlights: ["Forbidden City", "Temple of Heaven", "Great Wall"],
    bannerImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'nanjing',
    name: "Nanjing",
    nameZh: "南京",
    description: "The 'Capital of Six Dynasties', known for its tragic beauty and southern architectural elegance.",
    descriptionZh: "六朝古都，江淮明珠，金陵怀古，尽显江南建康之灵气。",
    era: "Six Dynasties, Ming",
    coordinates: [32.0603, 118.7969],
    highlights: ["Sun Yat-sen Mausoleum", "Ming Xiaoling Mausoleum", "Confucius Temple"],
    bannerImage: "https://images.unsplash.com/photo-1598583488422-5dc897f7ae82?auto=format&fit=crop&q=80&w=1200"
  }
];

export interface Architecture {
  id: string;
  cityId: string;
  name: string;
  nameZh: string;
  year: string;
  type: 'Palace' | 'Temple' | 'Fortress' | 'Pagoda' | 'Gate';
  description: string;
  descriptionZh: string;
  coordinates: [number, number];
  image: string;
  structure: string;
  culture: string;
  history: string;
  modelUrl?: string; // URL to a .glb or .gltf file
}

export const ARCHITECTURES: Architecture[] = [
  {
    id: 'forbidden-city',
    cityId: 'beijing',
    name: "Forbidden City",
    nameZh: "故宫",
    year: "1420",
    type: 'Palace',
    description: "The world's largest palace complex, spanning 72 hectares.",
    descriptionZh: "世界上保存最完整的古建筑群，木质结构的巅峰之作。",
    coordinates: [39.9163, 116.3972],
    image: "https://images.unsplash.com/photo-1529921879218-f99546d03a9d?auto=format&fit=crop&q=80&w=1000",
    structure: "Traditional multi-layered wooden framework with golden glazed tiles.",
    culture: "Symbol of imperial power and cosmic order.",
    history: "Home to 24 emperors over 500 years."
  },
  {
    id: 'city-wall-xian',
    cityId: 'xian',
    name: "Xi'an City Wall",
    nameZh: "西安城墙",
    year: "1374",
    type: 'Fortress',
    description: "The most complete ancient city wall surviving in China.",
    descriptionZh: "中国现存最完整的古城垣，彰显了大明盛世的防御智慧。",
    coordinates: [34.2594, 108.9470],
    image: "https://images.unsplash.com/photo-1599573752119-be54b504e036?auto=format&fit=crop&q=80&w=1000",
    structure: "Rammed earth core with heavy brick exterior.",
    culture: "Demonstration of Ming dynasty military architecture.",
    history: "Built on Tang dynasty foundations."
  },
  {
    id: 'longmen-grottoes',
    cityId: 'luoyang',
    name: "Longmen Grottoes",
    nameZh: "龙门石窟",
    year: "493",
    type: 'Temple',
    description: "Tens of thousands of statues of Buddha and his disciples.",
    descriptionZh: "中国石刻艺术的里程碑，万尊佛像，千年信仰。",
    coordinates: [34.5583, 112.4706],
    image: "https://images.unsplash.com/photo-1598583488422-5dc897f7ae82?auto=format&fit=crop&q=80&w=1000",
    structure: "Cave architecture carved into limestone cliffs.",
    culture: "Zenith of Chinese Buddhist stone carving.",
    history: "Continued carving over 400 years."
  },
  {
    id: 'big-wild-goose-pagoda',
    cityId: 'xian',
    name: "Big Wild Goose Pagoda",
    nameZh: "大雁塔",
    year: "652",
    type: 'Pagoda',
    description: "A monumental Buddhist pagoda built to house sutras brought from India by Xuanzang.",
    descriptionZh: "玄奘法师为保存从印度带回的经卷而主持修建的标志性佛塔。",
    coordinates: [34.2211, 108.9594],
    image: "https://images.unsplash.com/photo-1610486337535-618476839556?auto=format&fit=crop&q=80&w=1000",
    structure: "Brick structure built in the style of Indian stupas but with Chinese aesthetic.",
    culture: "Symbol of the cultural exchange between China and India.",
    history: "Renovated many times, most notably in the Ming dynasty.",
    modelUrl: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/shinto-shrine/model.gltf" // Shinto shrine as a placeholder placeholder
  },
  {
    id: 'terracotta-army',
    cityId: 'xian',
    name: "Terracotta Army",
    nameZh: "秦始皇兵马俑",
    year: "210 BC",
    type: 'Fortress',
    description: "Thousands of life-sized terracotta soldiers guarding Emperor Qin Shi Huang's tomb.",
    descriptionZh: "秦始皇陵的随葬陶俑，成千上万，气势恢宏。",
    coordinates: [34.3841, 109.2785],
    image: "https://images.unsplash.com/photo-1585642930421-df6229952ccb?auto=format&fit=crop&q=80&w=1000",
    structure: "Massive underground pits containing individually sculpted warriors.",
    culture: "Representation of the First Emperor's power and vision of the afterlife.",
    history: "Discovered by farmers in 1974.",
    modelUrl: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/building-houseman/model.gltf" // Another placeholder
  }
];
