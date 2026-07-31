export type Recipe = {
  id: number;
  name: string;
  region: RegionKey;
  continent: string;
  origin: string;
  description: string;
  time: number;
  difficulty: "Dễ" | "Vừa" | "Cầu kỳ";
  servings: number;
  image: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
};

export type RegionKey =
  | "Miền Bắc"
  | "Miền Trung"
  | "Miền Nam"
  | "Đông Á"
  | "Đông Nam Á"
  | "Nam Á"
  | "Châu Âu"
  | "Châu Mỹ"
  | "Châu Phi"
  | "Châu Đại Dương";

type RegionSeed = {
  region: RegionKey;
  continent: string;
  origin: string;
  names: string[];
  profile: string;
  pantry: string[];
  image: string;
};

const regionSeeds: RegionSeed[] = [
  {
    region: "Miền Bắc",
    continent: "Việt Nam",
    origin: "Bắc Bộ",
    names: [
      "Phở bò Hà Nội", "Bún chả Hà Nội", "Chả cá Lã Vọng", "Bánh cuốn Thanh Trì",
      "Bún thang", "Xôi xéo", "Nem cua bể", "Miến lươn", "Bún riêu cua",
      "Canh cua rau đay", "Thịt đông", "Cá kho làng Vũ Đại", "Bánh đa cua Hải Phòng",
      "Gà tần thuốc bắc", "Bún mọc", "Cốm xào", "Chả rươi", "Bánh tôm Hồ Tây",
      "Nộm hoa chuối", "Sườn xào chua ngọt",
    ],
    profile: "thanh vị, hài hòa và tinh tế theo nếp bếp Bắc Bộ",
    pantry: ["nước mắm", "hành hoa", "gừng", "tiêu", "rau thơm"],
    image: "/food/pho-bo.webp",
  },
  {
    region: "Miền Trung",
    continent: "Việt Nam",
    origin: "Trung Bộ",
    names: [
      "Bún bò Huế", "Mì Quảng", "Cơm hến", "Bánh bèo Huế", "Bánh bột lọc",
      "Cao lầu Hội An", "Nem lụi Huế", "Bánh canh cá lóc", "Bánh khoái",
      "Ram ít", "Chè bắp Hội An", "Gà kho sả ớt", "Cá nục hấp cuốn bánh tráng",
      "Bánh xèo tôm nhảy", "Bún cá Nha Trang", "Cơm gà Tam Kỳ", "Tré trộn",
      "Cháo lươn Nghệ An", "Bánh tráng cuốn thịt heo", "Cá ngừ kho thơm",
    ],
    profile: "đậm đà, thơm sả và có điểm cay đặc trưng miền Trung",
    pantry: ["sả", "ớt", "mắm ruốc", "hành tím", "rau sống"],
    image: "/food/bun-bo-hue.webp",
  },
  {
    region: "Miền Nam",
    continent: "Việt Nam",
    origin: "Nam Bộ",
    names: [
      "Bánh xèo miền Tây", "Cơm tấm sườn bì", "Hủ tiếu Nam Vang", "Canh chua cá",
      "Cá kho tộ", "Thịt kho trứng", "Gỏi cuốn", "Bún mắm", "Lẩu mắm miền Tây",
      "Bò lá lốt", "Gà nướng đất sét", "Bánh khọt Vũng Tàu", "Cháo cá lóc",
      "Bún nước lèo Sóc Trăng", "Cơm dừa Bến Tre", "Gỏi gà măng cụt",
      "Bánh canh Trảng Bàng", "Ốc len xào dừa", "Chè bà ba", "Xôi xiêm",
    ],
    profile: "hào sảng, thơm ngọt tự nhiên và giàu rau trái Nam Bộ",
    pantry: ["nước dừa", "tỏi", "hành tím", "nước mắm", "rau thơm"],
    image: "/food/banh-xeo.webp",
  },
  {
    region: "Đông Á",
    continent: "Châu Á",
    origin: "Đông Á",
    names: [
      "Sushi cuộn", "Ramen miso", "Cơm bò Gyudon", "Gà Teriyaki", "Súp Miso",
      "Tempura rau củ", "Cơm trộn Bibimbap", "Bulgogi", "Tokbokki", "Canh kim chi",
      "Mì tương đen", "Cơm chiên Dương Châu", "Đậu hũ Tứ Xuyên", "Vịt quay kiểu Bắc Kinh",
      "Há cảo hấp", "Mì bò Đài Loan", "Cơm thịt kho", "Trứng cuộn Tamagoyaki",
      "Cá hồi nướng miso", "Bánh hành",
    ],
    profile: "cân bằng vị umami, thanh sạch và chú trọng độ tươi",
    pantry: ["nước tương", "gừng", "dầu mè", "hành lá", "mè rang"],
    image: "/food/pho-bo.webp",
  },
  {
    region: "Đông Nam Á",
    continent: "Châu Á",
    origin: "Đông Nam Á",
    names: [
      "Pad Thai", "Tom Yum", "Cơm gà Hải Nam", "Laksa", "Nasi Goreng",
      "Satay gà", "Cà ri xanh Thái", "Som Tam", "Mì xào Mee Goreng", "Cơm Nasi Lemak",
      "Gà Adobo", "Sinigang", "Bò Rendang", "Cua sốt ớt", "Khao Soi",
      "Cơm dứa", "Gỏi xoài xanh", "Cháo ếch Singapore", "Mì hoành thánh",
      "Bánh Roti Canai",
    ],
    profile: "rực rỡ hương vị với thảo mộc, vị chua cay và nước cốt dừa",
    pantry: ["sả", "chanh", "ớt", "nước cốt dừa", "rau mùi"],
    image: "/food/bun-bo-hue.webp",
  },
  {
    region: "Nam Á",
    continent: "Châu Á",
    origin: "Nam Á",
    names: [
      "Cà ri gà bơ", "Cơm Biryani", "Gà Tikka Masala", "Bánh Naan", "Samosa rau củ",
      "Đậu hầm Dal", "Palak Paneer", "Cà ri cá", "Chana Masala", "Korma rau củ",
      "Gà Tandoori", "Cơm Pulao", "Bánh Dosa", "Súp Rasam", "Cà ri Vindaloo",
      "Aloo Gobi", "Pakora rau củ", "Cơm chanh", "Cà ri tôm", "Pudding gạo Kheer",
    ],
    profile: "ấm nồng gia vị, nhiều tầng hương và giàu màu sắc",
    pantry: ["nghệ", "thì là", "gừng", "tỏi", "rau mùi"],
    image: "/food/banh-xeo.webp",
  },
  {
    region: "Châu Âu",
    continent: "Châu Âu",
    origin: "Châu Âu",
    names: [
      "Mì Ý sốt cà chua", "Pizza Margherita", "Risotto nấm", "Lasagna bò",
      "Gà hầm kiểu Pháp", "Súp hành Pháp", "Cá tuyết áp chảo", "Paella hải sản",
      "Khoai tây Tortilla", "Goulash bò", "Moussaka", "Salad Hy Lạp",
      "Cá hồi sốt chanh", "Súp rau Minestrone", "Gà nướng thảo mộc",
      "Bánh Crepe", "Ratatouille", "Khoai tây nghiền", "Bò Stroganoff",
      "Bánh táo quế",
    ],
    profile: "thanh lịch, chú trọng nguyên liệu theo mùa và kỹ thuật căn bản",
    pantry: ["dầu ô liu", "tỏi", "cà chua", "thảo mộc", "tiêu đen"],
    image: "/food/pho-bo.webp",
  },
  {
    region: "Châu Mỹ",
    continent: "Châu Mỹ",
    origin: "Châu Mỹ",
    names: [
      "Taco bò", "Burrito gà", "Quesadilla phô mai", "Chili đậu đỏ", "Cơm Jambalaya",
      "Gà nướng BBQ", "Burger bò", "Súp ngô", "Salad Cobb", "Bánh ngô Arepa",
      "Ceviche cá", "Cơm đậu kiểu Cuba", "Empanada bò", "Gà sốt Mole",
      "Sườn nướng mật ong", "Khoai tây nướng", "Cá hồi phong cách Alaska",
      "Bánh Pancake", "Súp bí đỏ", "Bánh chanh",
    ],
    profile: "phóng khoáng, dễ chia sẻ và kết hợp đa dạng văn hóa",
    pantry: ["ớt chuông", "ngô", "đậu", "cà chua", "rau mùi"],
    image: "/food/banh-xeo.webp",
  },
  {
    region: "Châu Phi",
    continent: "Châu Phi",
    origin: "Châu Phi",
    names: [
      "Cơm Jollof", "Gà Yassa", "Couscous rau củ", "Tagine gà chanh",
      "Súp Harira", "Đậu hầm Misir Wot", "Bánh Injera", "Gà Peri Peri",
      "Bò Bobotie", "Súp lạc", "Cá nướng Chermoula", "Cơm dừa Đông Phi",
      "Đậu Chakalaka", "Gà hầm Doro Wat", "Bánh ngô Msemen", "Khoai lang hầm",
      "Salad cà chua Ma-rốc", "Thịt viên Kefta", "Cơm Pilau", "Bánh dừa Koeksister",
    ],
    profile: "ấm áp, thơm gia vị, giàu ngũ cốc và rau củ",
    pantry: ["thì là", "ớt bột", "cà chua", "đậu", "rau mùi"],
    image: "/food/bun-bo-hue.webp",
  },
  {
    region: "Châu Đại Dương",
    continent: "Châu Đại Dương",
    origin: "Châu Đại Dương",
    names: [
      "Cá Barramundi nướng", "Gà nướng chanh sim", "Bánh thịt kiểu Úc", "Salad bơ hạt",
      "Cá áp chảo sốt chanh", "Khoai lang Kumara nướng", "Gà cuộn rau chân vịt",
      "Cơm hải sản đảo", "Súp bí đỏ kiểu Úc", "Burger củ dền", "Cá hồi macadamia",
      "Gà sốt mật ong", "Salad xoài tôm", "Bánh Damper", "Cừu nướng thảo mộc",
      "Mì hải sản", "Rau củ nướng", "Bánh Pavlova trái cây", "Bánh dừa Lamington",
      "Pudding chanh",
    ],
    profile: "tươi sáng, tối giản và tôn trọng hương vị nguyên bản",
    pantry: ["chanh", "dầu ô liu", "thảo mộc", "hạt", "rau xanh"],
    image: "/food/pho-bo.webp",
  },
];

const variants = [
  { label: "Nguyên bản", time: 0, difficulty: "Vừa" as const },
  { label: "Bếp nhà", time: -10, difficulty: "Dễ" as const },
  { label: "Nhanh gọn", time: -15, difficulty: "Dễ" as const },
  { label: "Đãi khách", time: 20, difficulty: "Cầu kỳ" as const },
  { label: "Phiên bản mới", time: 5, difficulty: "Vừa" as const },
];

const descriptions = [
  "Công thức chuẩn vị, dễ theo dõi với nguyên liệu quen thuộc.",
  "Phiên bản cân bằng giữa hương vị truyền thống và nhịp sống hiện đại.",
  "Món ngon tròn vị, phù hợp cho bữa cơm gia đình ấm cúng.",
  "Cách làm chỉn chu để món ăn đẹp mắt và giữ đúng tinh thần nguyên bản.",
  "Một gợi ý mới mẻ nhưng vẫn tôn trọng hương vị đặc trưng của món.",
];

const createSteps = (seed: RegionSeed, name: string) => [
  `Sơ chế toàn bộ nguyên liệu cho ${name}; rửa sạch rau và để thật ráo.`,
  `Chuẩn bị phần gia vị nền với ${seed.pantry.slice(0, 3).join(", ")}.`,
  "Làm nóng dụng cụ nấu, xử lý nguyên liệu chính đến khi dậy mùi và vừa chín.",
  `Nêm nếm từng ít một để đạt vị ${seed.profile}.`,
  "Hoàn thiện món, trình bày cùng rau thơm và dùng khi còn nóng.",
];

export const recipes: Recipe[] = regionSeeds.flatMap((seed, regionIndex) =>
  seed.names.flatMap((name, nameIndex) =>
    variants.map((variant, variantIndex) => {
      const id = regionIndex * 100 + nameIndex * 5 + variantIndex + 1;
      const displayName =
        variantIndex === 0 ? name : `${name} · ${variant.label}`;
      const baseTime = 30 + ((nameIndex * 7 + regionIndex * 3) % 45);

      return {
        id,
        name: displayName,
        region: seed.region,
        continent: seed.continent,
        origin: seed.origin,
        description: `${descriptions[variantIndex]} Mang phong vị ${seed.profile}.`,
        time: Math.max(20, baseTime + variant.time),
        difficulty: variant.difficulty,
        servings: 2 + ((nameIndex + variantIndex) % 4),
        image: seed.image,
        tags: [
          variant.label,
          regionIndex < 3 ? "Món Việt" : seed.continent,
          nameIndex % 3 === 0 ? "Nổi tiếng" : "Bếp nhà",
        ],
        ingredients: [
          `500 g nguyên liệu chính cho ${name}`,
          `200 g rau củ theo mùa`,
          ...seed.pantry.map((item) => `${item} vừa đủ`),
          "Muối và gia vị cơ bản",
        ],
        steps: createSteps(seed, name),
      };
    }),
  ),
);

export const regions: Array<{
  key: "Tất cả" | RegionKey;
  eyebrow: string;
  description: string;
}> = [
  { key: "Tất cả", eyebrow: "1.000 công thức", description: "Kho ẩm thực toàn cầu" },
  { key: "Miền Bắc", eyebrow: "100 món", description: "Thanh nhã, tinh tế" },
  { key: "Miền Trung", eyebrow: "100 món", description: "Đậm đà, cay thơm" },
  { key: "Miền Nam", eyebrow: "100 món", description: "Hào sảng, phong phú" },
  { key: "Đông Á", eyebrow: "100 món", description: "Umami cân bằng" },
  { key: "Đông Nam Á", eyebrow: "100 món", description: "Rực rỡ thảo mộc" },
  { key: "Nam Á", eyebrow: "100 món", description: "Ấm nồng gia vị" },
  { key: "Châu Âu", eyebrow: "100 món", description: "Cổ điển thanh lịch" },
  { key: "Châu Mỹ", eyebrow: "100 món", description: "Phóng khoáng đa sắc" },
  { key: "Châu Phi", eyebrow: "100 món", description: "Ấm áp, giàu hương" },
  { key: "Châu Đại Dương", eyebrow: "100 món", description: "Tươi sáng tự nhiên" },
];

export const featuredRecipeIds = [1, 101, 201, 6, 106, 206];
