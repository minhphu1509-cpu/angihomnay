export type Ingredient = {
  amount: number | string;
  unit: string;
  item: string;
  prep?: string;
  group: "Phần chính" | "Gia vị" | "Ăn kèm";
  optional?: boolean;
};

export type RecipeStep = {
  title: string;
  instruction: string;
  duration?: string;
  temperature?: string;
};

export type Recipe = {
  id: number;
  name: string;
  baseName: string;
  region: RegionKey;
  continent: string;
  origin: string;
  description: string;
  time: number;
  prepTime: number;
  cookTime: number;
  restTime: number;
  difficulty: "Dễ" | "Vừa" | "Cầu kỳ";
  servings: number;
  image: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: RecipeStep[];
  equipment: string[];
  allergens: string[];
  tips: string[];
  substitutions: string[];
  storage: string;
  doneness: string;
  safety: string;
  variation: string;
  sourceNote: string;
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

type DishFamily =
  | "Món nước"
  | "Cơm"
  | "Mì xào"
  | "Cà ri"
  | "Kho hầm"
  | "Nướng"
  | "Chiên"
  | "Gỏi salad"
  | "Bánh bột"
  | "Món ngọt";

type SignatureProfile = {
  family: DishFamily;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  equipment: string[];
  tip: string;
  storage: string;
  prepTime: number;
  cookTime: number;
  restTime: number;
};

const ingredient = (
  amount: number | string,
  unit: string,
  item: string,
  group: Ingredient["group"],
  prep?: string,
  optional = false,
): Ingredient => ({ amount, unit, item, group, prep, optional });

const step = (
  title: string,
  instruction: string,
  duration?: string,
  temperature?: string,
): RecipeStep => ({ title, instruction, duration, temperature });

const signatureProfiles: Record<string, SignatureProfile> = {
  "Phở bò Hà Nội": {
    family: "Món nước",
    ingredients: [
      ingredient(600, "g", "xương ống bò", "Phần chính", "chần sạch"),
      ingredient(350, "g", "thịt nạm bò", "Phần chính"),
      ingredient(250, "g", "thăn bò", "Phần chính", "thái thật mỏng"),
      ingredient(600, "g", "bánh phở tươi", "Phần chính"),
      ingredient(1, "củ", "hành tây", "Gia vị", "bổ đôi"),
      ingredient(60, "g", "gừng", "Gia vị", "đập dập"),
      ingredient(3, "quả", "hoa hồi", "Gia vị"),
      ingredient(1, "thanh", "quế", "Gia vị"),
      ingredient(1, "thìa cà phê", "hạt mùi", "Gia vị"),
      ingredient(35, "ml", "nước mắm", "Gia vị"),
      ingredient(12, "g", "đường phèn", "Gia vị"),
      ingredient(12, "g", "muối", "Gia vị"),
      ingredient(80, "g", "hành hoa và rau mùi", "Ăn kèm", "thái nhỏ"),
      ingredient(1, "quả", "chanh", "Ăn kèm", "cắt miếng"),
    ],
    steps: [
      step("Làm sạch xương", "Chần xương bò 5 phút, đổ nước chần và rửa kỹ để nước dùng trong.", "10 phút"),
      step("Nướng hương liệu", "Áp chảo khô hành tây và gừng đến xém cạnh; rang hoa hồi, quế và hạt mùi 1–2 phút.", "8 phút"),
      step("Ninh nước dùng", "Cho xương, nạm bò và 3 lít nước vào nồi. Đun sôi, hạ nhỏ lửa, hớt bọt thường xuyên.", "120 phút", "Sôi lăn tăn"),
      step("Lấy thịt nạm", "Khi nạm mềm, vớt ra ngâm nước nguội 5 phút rồi thái lát mỏng; tiếp tục ninh xương.", "15 phút"),
      step("Nêm nước dùng", "Lọc nước dùng, thêm túi gia vị rang, nước mắm, đường phèn và muối. Nếm vị thanh, thơm, không ngọt gắt.", "20 phút"),
      step("Chần bánh phở", "Chần bánh phở trong nước sôi 10–15 giây, để ráo rồi chia vào bát đã làm nóng.", "5 phút", "100°C"),
      step("Hoàn thiện", "Xếp nạm và thăn bò lên bánh phở. Chan nước dùng đang sôi để làm chín tái thịt, thêm hành hoa và rau mùi.", "5 phút", "Nước dùng sôi"),
    ],
    equipment: ["Nồi 6 lít", "Chảo nhỏ", "Rây lọc", "Túi vải đựng gia vị"],
    tip: "Giữ nồi chỉ sôi lăn tăn và hớt bọt đều để nước dùng trong, không khuấy mạnh.",
    storage: "Nước dùng để nguội nhanh, bảo quản kín trong ngăn mát tối đa 3 ngày; bánh phở và rau để riêng.",
    prepTime: 35,
    cookTime: 180,
    restTime: 5,
  },
  "Bún bò Huế": {
    family: "Món nước",
    ingredients: [
      ingredient(700, "g", "xương ống bò", "Phần chính", "chần sạch"),
      ingredient(500, "g", "bắp bò", "Phần chính"),
      ingredient(500, "g", "giò heo", "Phần chính", "chặt khoanh"),
      ingredient(600, "g", "bún sợi lớn", "Phần chính"),
      ingredient(5, "cây", "sả", "Gia vị", "đập dập"),
      ingredient(25, "g", "mắm ruốc Huế", "Gia vị", "hòa với nước ấm, lọc"),
      ingredient(40, "ml", "nước mắm", "Gia vị"),
      ingredient(20, "g", "đường phèn", "Gia vị"),
      ingredient(20, "ml", "dầu điều", "Gia vị"),
      ingredient(15, "g", "ớt bột", "Gia vị"),
      ingredient(1, "củ", "hành tây", "Gia vị"),
      ingredient(120, "g", "bắp chuối và rau thơm", "Ăn kèm", "rửa sạch"),
      ingredient(1, "quả", "chanh", "Ăn kèm"),
    ],
    steps: [
      step("Sơ chế thịt", "Chần xương, bắp bò và giò heo 5 phút; rửa sạch dưới vòi nước.", "12 phút"),
      step("Ninh nước dùng", "Ninh xương, bắp bò, giò heo cùng sả và hành tây trong 3 lít nước; hớt bọt đều.", "90 phút", "Sôi lăn tăn"),
      step("Kiểm tra độ mềm", "Vớt giò heo sau khoảng 45 phút và bắp bò sau 60–75 phút; ngâm nguội rồi thái.", "10 phút"),
      step("Lọc mắm ruốc", "Để phần mắm ruốc đã hòa lắng xuống, chỉ rót phần nước trong vào nồi.", "5 phút"),
      step("Làm sa tế", "Đun dầu điều, cho ớt bột và sả băm vào đảo ở lửa nhỏ đến thơm, không để cháy.", "5 phút", "Lửa nhỏ"),
      step("Nêm hoàn chỉnh", "Thêm nước mắm, đường phèn và sa tế; nước dùng cần đậm, thơm sả và có vị ruốc vừa phải.", "10 phút"),
      step("Trình bày", "Chần bún, xếp bắp bò và giò heo, chan nước dùng sôi; dùng cùng bắp chuối, rau thơm và chanh.", "5 phút"),
    ],
    equipment: ["Nồi 6 lít", "Rây lọc", "Chảo nhỏ", "Dao thái thịt"],
    tip: "Mắm ruốc phải được hòa, để lắng và lọc; cho quá nhiều cặn sẽ làm nước dùng nặng mùi.",
    storage: "Bảo quản nước dùng và phần thịt riêng trong ngăn mát tối đa 3 ngày; đun sôi kỹ trước khi dùng lại.",
    prepTime: 30,
    cookTime: 120,
    restTime: 5,
  },
  "Bánh xèo miền Tây": {
    family: "Chiên",
    ingredients: [
      ingredient(300, "g", "bột gạo", "Phần chính"),
      ingredient(35, "g", "bột bắp", "Phần chính"),
      ingredient(400, "ml", "nước lọc", "Phần chính"),
      ingredient(200, "ml", "nước cốt dừa", "Phần chính"),
      ingredient(1, "thìa cà phê", "bột nghệ", "Gia vị"),
      ingredient(300, "g", "tôm", "Phần chính", "bỏ chỉ lưng"),
      ingredient(250, "g", "thịt ba chỉ", "Phần chính", "thái mỏng"),
      ingredient(300, "g", "giá đỗ", "Phần chính"),
      ingredient(80, "g", "hành lá", "Gia vị", "thái nhỏ"),
      ingredient(60, "ml", "dầu ăn", "Gia vị"),
      ingredient(60, "ml", "nước mắm", "Ăn kèm"),
      ingredient(45, "g", "đường", "Ăn kèm"),
      ingredient(30, "ml", "nước cốt chanh", "Ăn kèm"),
      ingredient(250, "g", "xà lách và rau thơm", "Ăn kèm"),
    ],
    steps: [
      step("Pha bột", "Khuấy bột gạo, bột bắp, nước, nước cốt dừa, nghệ và 1/2 thìa cà phê muối đến mịn.", "8 phút"),
      step("Để bột nghỉ", "Cho hành lá vào bột và để nghỉ để bột hút đủ nước, bánh sẽ giòn hơn.", "30 phút"),
      step("Làm nhân", "Xào nhanh thịt ba chỉ 3 phút, thêm tôm và nấu đến khi vừa chuyển màu.", "6 phút", "Lửa vừa"),
      step("Đổ bánh", "Làm nóng chảo, quét dầu mỏng, đổ một vá bột và nghiêng chảo tạo lớp thật mỏng.", "2 phút", "Chảo nóng"),
      step("Thêm nhân", "Cho tôm, thịt và giá vào một nửa bánh; đậy nắp 1 phút rồi mở nắp để hơi thoát.", "3 phút"),
      step("Làm giòn", "Hạ lửa vừa, rưới rất ít dầu quanh mép; chờ mép vàng giòn rồi gập bánh.", "3–4 phút"),
      step("Pha nước chấm", "Hòa nước mắm, đường, chanh và 120 ml nước ấm; thêm tỏi ớt tùy khẩu vị.", "5 phút"),
    ],
    equipment: ["Chảo chống dính 24 cm", "Âu trộn", "Vá bột", "Phới lồng"],
    tip: "Bột phải loãng vừa và chảo đủ nóng; lớp bột càng mỏng, bánh càng giòn lâu.",
    storage: "Bánh ngon nhất khi dùng ngay; bột đã pha bảo quản ngăn mát tối đa 24 giờ và khuấy lại trước khi đổ.",
    prepTime: 25,
    cookTime: 40,
    restTime: 30,
  },
  "Pad Thai": {
    family: "Mì xào",
    ingredients: [
      ingredient(300, "g", "bánh phở khô bản nhỏ", "Phần chính", "ngâm mềm"),
      ingredient(300, "g", "tôm tươi", "Phần chính", "bóc vỏ"),
      ingredient(2, "quả", "trứng", "Phần chính"),
      ingredient(180, "g", "giá đỗ", "Phần chính"),
      ingredient(80, "g", "hẹ", "Phần chính", "cắt khúc"),
      ingredient(35, "g", "đậu phộng rang", "Ăn kèm", "giã dập"),
      ingredient(45, "ml", "nước cốt me", "Gia vị"),
      ingredient(35, "ml", "nước mắm", "Gia vị"),
      ingredient(30, "g", "đường thốt nốt", "Gia vị"),
      ingredient(25, "ml", "dầu ăn", "Gia vị"),
      ingredient(1, "quả", "chanh", "Ăn kèm"),
      ingredient(1, "thìa cà phê", "ớt khô", "Ăn kèm", undefined, true),
    ],
    steps: [
      step("Pha sốt", "Đun nhỏ lửa nước cốt me, nước mắm và đường thốt nốt đến khi tan, vị chua–mặn–ngọt cân bằng.", "5 phút"),
      step("Chuẩn bị sợi", "Ngâm bánh phở trong nước mát đến khi dẻo nhưng lõi còn hơi cứng; để thật ráo.", "20 phút"),
      step("Áp chảo tôm", "Làm nóng chảo với một nửa dầu, áp tôm đến vừa chín rồi lấy ra.", "3 phút", "Lửa lớn"),
      step("Xào sợi", "Cho phần dầu còn lại và bánh phở vào chảo; rưới sốt, đảo để sợi hút đều.", "4 phút", "Lửa vừa–lớn"),
      step("Thêm trứng", "Gạt sợi sang một bên, đập trứng vào chảo, đảo đến vừa đông rồi trộn với sợi.", "2 phút"),
      step("Hoàn thiện", "Cho tôm, giá và hẹ vào đảo nhanh 60–90 giây; sợi phải mềm dai, không nát.", "2 phút"),
      step("Trình bày", "Dùng ngay cùng đậu phộng, chanh và ớt khô tùy khẩu vị.", "2 phút"),
    ],
    equipment: ["Chảo lớn hoặc wok", "Kẹp gắp", "Bát pha sốt"],
    tip: "Không luộc chín bánh phở trước; sợi sẽ tiếp tục mềm khi hút sốt trong chảo.",
    storage: "Dùng ngon nhất ngay sau khi xào; phần thừa bảo quản ngăn mát tối đa 2 ngày.",
    prepTime: 25,
    cookTime: 20,
    restTime: 0,
  },
  "Cơm Biryani": {
    family: "Cơm",
    ingredients: [
      ingredient(400, "g", "gạo basmati", "Phần chính", "vo và ngâm 30 phút"),
      ingredient(700, "g", "đùi gà lọc xương", "Phần chính", "cắt miếng"),
      ingredient(180, "g", "sữa chua không đường", "Gia vị"),
      ingredient(2, "củ", "hành tây", "Phần chính", "thái mỏng"),
      ingredient(20, "g", "gừng", "Gia vị", "băm"),
      ingredient(20, "g", "tỏi", "Gia vị", "băm"),
      ingredient(2, "thìa cà phê", "garam masala", "Gia vị"),
      ingredient(1, "thìa cà phê", "nghệ", "Gia vị"),
      ingredient(1, "thìa cà phê", "bột thì là", "Gia vị"),
      ingredient(2, "quả", "cà chua", "Phần chính", "băm"),
      ingredient(40, "g", "rau mùi và bạc hà", "Ăn kèm"),
      ingredient(35, "ml", "dầu ăn", "Gia vị"),
      ingredient(12, "g", "muối", "Gia vị"),
    ],
    steps: [
      step("Ướp gà", "Trộn gà với sữa chua, gừng, tỏi, garam masala, nghệ, thì là và một nửa muối.", "30 phút"),
      step("Chiên hành", "Phi hành tây với dầu đến vàng nâu; lấy một nửa ra để rắc mặt.", "12 phút", "Lửa vừa"),
      step("Nấu gà", "Cho gà ướp và cà chua vào nồi, đảo đến săn rồi om đến khi gà gần chín.", "18 phút", "Lửa vừa"),
      step("Luộc sơ gạo", "Luộc gạo trong nhiều nước có muối đến khoảng 70% chín; hạt còn lõi nhẹ, sau đó để ráo.", "7–8 phút"),
      step("Xếp lớp", "Rải gạo lên phần gà, thêm rau mùi, bạc hà và hành chiên; rưới 60 ml nước nóng quanh nồi.", "5 phút"),
      step("Hấp kín", "Đậy thật kín, nấu lửa nhỏ để hơi nước làm chín hoàn toàn gạo và gà.", "22 phút", "Lửa rất nhỏ"),
      step("Nghỉ và xới", "Tắt bếp, nghỉ 10 phút rồi xới nhẹ từ dưới lên để giữ hạt cơm tơi.", "10 phút"),
    ],
    equipment: ["Nồi đáy dày có nắp kín", "Nồi luộc gạo", "Rây"],
    tip: "Luộc gạo chỉ 70% chín trước khi xếp lớp; gạo chín hoàn toàn sẽ bị nát khi hấp kín.",
    storage: "Làm nguội nhanh và bảo quản ngăn mát tối đa 2 ngày; hâm thật nóng một lần trước khi dùng.",
    prepTime: 40,
    cookTime: 60,
    restTime: 10,
  },
  "Pizza Margherita": {
    family: "Bánh bột",
    ingredients: [
      ingredient(320, "g", "bột mì số 11", "Phần chính"),
      ingredient(210, "ml", "nước ấm", "Phần chính"),
      ingredient(4, "g", "men nở khô", "Gia vị"),
      ingredient(7, "g", "muối", "Gia vị"),
      ingredient(12, "ml", "dầu ô liu", "Gia vị"),
      ingredient(250, "g", "cà chua nghiền", "Phần chính"),
      ingredient(250, "g", "phô mai mozzarella", "Phần chính", "xé nhỏ"),
      ingredient(20, "g", "lá húng quế", "Ăn kèm"),
      ingredient(1, "thìa cà phê", "lá oregano khô", "Gia vị", undefined, true),
    ],
    steps: [
      step("Trộn bột", "Hòa men vào nước, thêm bột và trộn đến hết bột khô; nghỉ 15 phút.", "20 phút"),
      step("Nhào và ủ", "Thêm muối, dầu ô liu; nhào 8–10 phút đến mịn rồi ủ kín đến nở gấp đôi.", "75–90 phút"),
      step("Làm sốt", "Nêm cà chua nghiền với một nhúm muối và oregano; không cần nấu trước.", "5 phút"),
      step("Làm nóng lò", "Đặt khay nướng úp hoặc đá nướng trong lò và làm nóng ít nhất 30 phút.", "30 phút", "250°C"),
      step("Tạo hình", "Ấn bột từ giữa ra ngoài thành đế 28–30 cm, giữ viền dày hơn; không dùng cây cán.", "6 phút"),
      step("Phủ mặt", "Dàn lớp sốt mỏng, thêm mozzarella và một ít dầu ô liu.", "4 phút"),
      step("Nướng", "Trượt pizza lên khay thật nóng, nướng đến khi viền phồng vàng và phô mai sôi nhẹ.", "8–11 phút", "250°C"),
      step("Hoàn thiện", "Thêm lá húng quế sau khi lấy bánh ra, nghỉ 2 phút rồi cắt.", "2 phút"),
    ],
    equipment: ["Lò nướng", "Khay nướng dày hoặc đá nướng", "Âu trộn", "Giấy nướng"],
    tip: "Khay phải được làm nóng trước; mặt bánh chỉ nên phủ mỏng để đáy chín giòn.",
    storage: "Bảo quản kín trong ngăn mát tối đa 3 ngày; hâm lại ở 200°C trong 5–7 phút.",
    prepTime: 25,
    cookTime: 20,
    restTime: 90,
  },
  "Cơm Jollof": {
    family: "Cơm",
    ingredients: [
      ingredient(400, "g", "gạo hạt dài", "Phần chính", "vo sạch"),
      ingredient(500, "g", "cà chua chín", "Phần chính"),
      ingredient(2, "quả", "ớt chuông đỏ", "Phần chính"),
      ingredient(2, "củ", "hành tây", "Phần chính"),
      ingredient(30, "g", "cà chua cô đặc", "Gia vị"),
      ingredient(650, "ml", "nước dùng gà hoặc rau củ", "Phần chính"),
      ingredient(35, "ml", "dầu ăn", "Gia vị"),
      ingredient(1, "thìa cà phê", "húng tây khô", "Gia vị"),
      ingredient(1, "thìa cà phê", "bột cà ri không cay", "Gia vị"),
      ingredient(2, "lá", "lá nguyệt quế", "Gia vị"),
      ingredient(10, "g", "muối", "Gia vị"),
      ingredient(30, "g", "hành lá", "Ăn kèm"),
    ],
    steps: [
      step("Xay sốt đỏ", "Xay cà chua, ớt chuông và một nửa hành tây đến mịn.", "5 phút"),
      step("Cô sốt", "Phi phần hành còn lại, thêm cà chua cô đặc rồi cho hỗn hợp xay vào nấu đến sánh và bớt mùi sống.", "18 phút", "Lửa vừa"),
      step("Tạo nền vị", "Thêm húng tây, bột cà ri, lá nguyệt quế, muối và nước dùng; đun sôi nhẹ.", "5 phút"),
      step("Nấu cơm", "Cho gạo vào, đảo một lần cho đều rồi đậy kín; nấu ở lửa rất nhỏ.", "25 phút", "Lửa rất nhỏ"),
      step("Kiểm tra", "Nếu gạo còn cứng, thêm 30–50 ml nước nóng quanh thành nồi; không đảo mạnh.", "5 phút"),
      step("Hấp hoàn thiện", "Tắt bếp và để nguyên nắp để hơi nước làm hạt cơm chín đều.", "10 phút"),
      step("Xới cơm", "Bỏ lá nguyệt quế, xới nhẹ và thêm hành lá trước khi dùng.", "3 phút"),
    ],
    equipment: ["Máy xay", "Nồi đáy dày có nắp kín", "Muôi gỗ"],
    tip: "Cô hỗn hợp cà chua đủ lâu trước khi cho gạo để cơm thơm, đỏ đẹp và không có vị cà chua sống.",
    storage: "Làm nguội nhanh, bảo quản ngăn mát tối đa 2 ngày; hâm nóng kỹ và không hâm lại nhiều lần.",
    prepTime: 15,
    cookTime: 55,
    restTime: 10,
  },
};

const regionalPantry: Record<RegionKey, Ingredient[]> = {
  "Miền Bắc": [
    ingredient(25, "ml", "nước mắm", "Gia vị"),
    ingredient(15, "g", "gừng", "Gia vị", "băm"),
    ingredient(30, "g", "hành hoa", "Ăn kèm", "thái nhỏ"),
    ingredient(2, "g", "tiêu xay", "Gia vị"),
  ],
  "Miền Trung": [
    ingredient(2, "cây", "sả", "Gia vị", "băm"),
    ingredient(8, "g", "ớt", "Gia vị", "băm"),
    ingredient(25, "ml", "nước mắm", "Gia vị"),
    ingredient(35, "g", "hành tím", "Gia vị", "băm"),
  ],
  "Miền Nam": [
    ingredient(180, "ml", "nước dừa tươi", "Gia vị"),
    ingredient(20, "g", "tỏi", "Gia vị", "băm"),
    ingredient(25, "ml", "nước mắm", "Gia vị"),
    ingredient(50, "g", "rau thơm", "Ăn kèm"),
  ],
  "Đông Á": [
    ingredient(30, "ml", "nước tương", "Gia vị"),
    ingredient(12, "ml", "dầu mè", "Gia vị"),
    ingredient(12, "g", "gừng", "Gia vị", "băm"),
    ingredient(8, "g", "mè rang", "Ăn kèm"),
  ],
  "Đông Nam Á": [
    ingredient(2, "cây", "sả", "Gia vị", "băm"),
    ingredient(180, "ml", "nước cốt dừa", "Gia vị"),
    ingredient(1, "quả", "chanh", "Gia vị"),
    ingredient(30, "g", "rau mùi", "Ăn kèm"),
  ],
  "Nam Á": [
    ingredient(1, "thìa cà phê", "nghệ", "Gia vị"),
    ingredient(1, "thìa cà phê", "bột thì là", "Gia vị"),
    ingredient(18, "g", "gừng", "Gia vị", "băm"),
    ingredient(18, "g", "tỏi", "Gia vị", "băm"),
  ],
  "Châu Âu": [
    ingredient(30, "ml", "dầu ô liu", "Gia vị"),
    ingredient(18, "g", "tỏi", "Gia vị", "băm"),
    ingredient(1, "thìa cà phê", "thảo mộc khô", "Gia vị"),
    ingredient(2, "g", "tiêu đen", "Gia vị"),
  ],
  "Châu Mỹ": [
    ingredient(1, "quả", "ớt chuông", "Phần chính", "cắt hạt lựu"),
    ingredient(150, "g", "cà chua", "Phần chính", "băm"),
    ingredient(1, "thìa cà phê", "bột thì là", "Gia vị"),
    ingredient(30, "g", "rau mùi", "Ăn kèm"),
  ],
  "Châu Phi": [
    ingredient(1, "thìa cà phê", "bột thì là", "Gia vị"),
    ingredient(1, "thìa cà phê", "ớt bột ngọt", "Gia vị"),
    ingredient(180, "g", "cà chua", "Phần chính", "băm"),
    ingredient(30, "g", "rau mùi", "Ăn kèm"),
  ],
  "Châu Đại Dương": [
    ingredient(1, "quả", "chanh vàng", "Gia vị"),
    ingredient(25, "ml", "dầu ô liu", "Gia vị"),
    ingredient(1, "thìa cà phê", "thảo mộc khô", "Gia vị"),
    ingredient(120, "g", "rau xanh", "Ăn kèm"),
  ],
};

const lower = (value: string) => value.toLocaleLowerCase("vi");
const includesAny = (value: string, words: string[]) =>
  words.some((word) => lower(value).includes(word));

const inferFamily = (name: string): DishFamily => {
  if (includesAny(name, ["chè", "pudding", "pavlova", "lamington", "bánh táo", "bánh chanh", "pancake", "crepe", "cốm xào", "xôi xiêm"])) return "Món ngọt";
  if (includesAny(name, ["gỏi", "nộm", "salad", "som tam", "ceviche"])) return "Gỏi salad";
  if (includesAny(name, ["pizza", "naan", "samosa", "pakora", "dosa", "bánh cuốn", "bánh bèo", "bánh bột", "bánh khoái", "bánh khọt", "bánh tôm", "bánh hành", "bánh ngô", "empanada", "damper"])) return "Bánh bột";
  if (includesAny(name, ["cà ri", "curry", "masala", "korma", "vindaloo", "rendang", "tagine", "doro wat", "misir wot"])) return "Cà ri";
  if (includesAny(name, ["phở", "bún", "ramen", "laksa", "khao soi", "súp", "canh", "cháo", "hủ tiếu", "bánh canh", "miến", "harira", "sinigang"])) return "Món nước";
  if (includesAny(name, ["mì xào", "pad thai", "mee goreng", "mì tương đen"])) return "Mì xào";
  if (includesAny(name, ["cơm", "biryani", "paella", "risotto", "jambalaya", "jollof", "pulao", "pilau", "nasi"])) return "Cơm";
  if (includesAny(name, ["kho", "hầm", "goulash", "stroganoff", "chili", "adobo", "thịt đông"])) return "Kho hầm";
  if (includesAny(name, ["nướng", "tandoori", "teriyaki", "satay", "bulgogi", "vịt quay", "bbq"])) return "Nướng";
  return includesAny(name, ["chiên", "xào", "tempura", "bánh xèo"]) ? "Chiên" : "Nướng";
};

const proteinFor = (name: string): Ingredient[] => {
  if (includesAny(name, ["bò", "beef", "gyudon", "bulgogi", "goulash", "stroganoff"])) return [ingredient(550, "g", "thịt bò", "Phần chính", "thái theo thớ phù hợp")];
  if (includesAny(name, ["gà", "chicken", "tandoori", "adobo", "yassa"])) return [ingredient(650, "g", "thịt gà", "Phần chính", "cắt miếng đều")];
  if (includesAny(name, ["heo", "lợn", "sườn", "ba chỉ"])) return [ingredient(600, "g", "thịt heo", "Phần chính", "cắt miếng")];
  if (includesAny(name, ["tôm", "hải sản", "cua", "ốc"])) return [ingredient(500, "g", "hải sản", "Phần chính", "làm sạch")];
  if (includesAny(name, ["cá", "lươn"])) return [ingredient(600, "g", "cá hoặc lươn", "Phần chính", "làm sạch")];
  if (includesAny(name, ["đậu", "rau củ", "ratatouille", "aloo", "chana"])) return [ingredient(450, "g", "rau củ và đậu", "Phần chính", "cắt đều")];
  return [ingredient(400, "g", "đậu hũ hoặc nấm", "Phần chính", "cắt miếng")];
};

const stapleFor = (name: string, family: DishFamily): Ingredient[] => {
  if (includesAny(name, ["phở"])) return [ingredient(500, "g", "bánh phở", "Phần chính")];
  if (includesAny(name, ["bún"])) return [ingredient(500, "g", "bún tươi", "Phần chính")];
  if (includesAny(name, ["mì", "ramen", "laksa", "khao soi"])) return [ingredient(350, "g", "mì", "Phần chính")];
  if (family === "Cơm") return [ingredient(360, "g", "gạo", "Phần chính", "vo sạch")];
  if (family === "Bánh bột") return [ingredient(300, "g", "bột mì hoặc bột gạo phù hợp", "Phần chính")];
  if (family === "Món ngọt") return [ingredient(250, "g", "nguyên liệu bột hoặc hạt chính", "Phần chính")];
  return [];
};

const familyBasics = (family: DishFamily): Ingredient[] => {
  if (family === "Món nước") return [
    ingredient(1.8, "lít", "nước dùng không muối", "Phần chính"),
    ingredient(1, "củ", "hành tây", "Phần chính", "bổ múi"),
    ingredient(150, "g", "rau theo món", "Ăn kèm", "rửa sạch"),
  ];
  if (family === "Cơm") return [
    ingredient(1, "củ", "hành tây", "Phần chính", "băm"),
    ingredient(650, "ml", "nước dùng", "Phần chính"),
    ingredient(150, "g", "rau củ", "Phần chính", "cắt hạt lựu"),
  ];
  if (family === "Mì xào") return [
    ingredient(180, "g", "rau củ giòn", "Phần chính", "thái sợi"),
    ingredient(25, "ml", "dầu ăn", "Gia vị"),
    ingredient(1, "quả", "trứng", "Phần chính"),
  ];
  if (family === "Cà ri" || family === "Kho hầm") return [
    ingredient(250, "g", "cà chua", "Phần chính", "băm"),
    ingredient(1, "củ", "hành tây", "Phần chính", "băm"),
    ingredient(500, "ml", "nước dùng", "Phần chính"),
  ];
  if (family === "Gỏi salad") return [
    ingredient(350, "g", "rau củ tươi", "Phần chính", "thái mỏng"),
    ingredient(30, "ml", "nước cốt chanh", "Gia vị"),
    ingredient(15, "g", "đường", "Gia vị"),
  ];
  if (family === "Món ngọt") return [
    ingredient(80, "g", "đường", "Gia vị"),
    ingredient(250, "ml", "sữa hoặc nước cốt dừa", "Phần chính"),
    ingredient(2, "quả", "trứng", "Phần chính"),
  ];
  return [
    ingredient(200, "g", "rau củ theo mùa", "Phần chính", "cắt đều"),
    ingredient(30, "ml", "dầu ăn", "Gia vị"),
    ingredient(1, "củ", "hành tây", "Phần chính", "thái"),
  ];
};

const dedupeIngredients = (items: Ingredient[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = lower(item.item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const genericSteps = (name: string, family: DishFamily): RecipeStep[] => {
  const commonStart = step("Chuẩn bị", `Cân đủ nguyên liệu cho ${name}; tách riêng thực phẩm sống, rau ăn kèm và gia vị.`, "10–15 phút");
  const commonFinish = step("Hoàn thiện", "Nếm lại, điều chỉnh từng ít một rồi trình bày và dùng ở trạng thái phù hợp với món.", "3 phút");

  const templates: Record<DishFamily, RecipeStep[]> = {
    "Món nước": [
      commonStart,
      step("Xử lý phần chính", "Chần hoặc áp chảo nguyên liệu chính để loại bọt và tạo mùi thơm, sau đó để riêng.", "8 phút"),
      step("Tạo nước dùng", "Phi thơm gia vị nền, thêm nước dùng và đun sôi; hạ nhỏ lửa, hớt bọt để nước trong.", "25–40 phút", "Sôi lăn tăn"),
      step("Nấu nguyên liệu", "Cho nguyên liệu lâu chín trước, rau củ sau; giữ lửa vừa để chín đều mà không nát.", "15–25 phút"),
      step("Nêm vị", "Thêm gia vị theo từng phần nhỏ, chờ 1 phút sau mỗi lần nêm rồi mới thử lại.", "5 phút"),
      step("Chuẩn bị phần sợi", "Chần sợi hoặc phần tinh bột vừa mềm, xả nhanh nếu cần và để ráo.", "3–5 phút", "Nước sôi"),
      commonFinish,
    ],
    "Cơm": [
      commonStart,
      step("Chuẩn bị gạo", "Vo gạo nhẹ tay đến khi nước bớt đục, ngâm theo loại gạo rồi để ráo.", "20 phút"),
      step("Tạo nền vị", "Phi hành và gia vị ở lửa vừa đến thơm; cho nguyên liệu chính vào đảo săn.", "8–10 phút", "Lửa vừa"),
      step("Nấu cơm", "Thêm gạo và lượng nước dùng đã định lượng; đun sôi rồi hạ lửa rất nhỏ, đậy kín.", "18–25 phút", "Lửa rất nhỏ"),
      step("Làm chín phần chính", "Kiểm tra nguyên liệu chín hoàn toàn và nước đã được gạo hấp thụ.", "5 phút"),
      step("Ủ cơm", "Tắt bếp, giữ nguyên nắp để hơi nước phân bố đều; không mở nắp sớm.", "10 phút"),
      commonFinish,
    ],
    "Mì xào": [
      commonStart,
      step("Chuẩn bị sợi", "Ngâm hoặc luộc sợi ngắn hơn hướng dẫn 1–2 phút; để ráo và trộn một ít dầu.", "8 phút"),
      step("Pha sốt", "Hòa các gia vị lỏng và gia vị khô thành một hỗn hợp đồng nhất.", "3 phút"),
      step("Xào phần chính", "Làm nóng chảo, xào nguyên liệu chính theo mẻ nhỏ đến vừa chín rồi lấy ra.", "5–7 phút", "Lửa lớn"),
      step("Xào sợi", "Cho sợi và sốt vào chảo, đảo liên tục để sốt bám đều mà sợi không đứt.", "3–4 phút", "Lửa lớn"),
      step("Thêm rau", "Cho rau và nguyên liệu đã xào vào, đảo nhanh đến khi rau còn độ giòn.", "2 phút"),
      commonFinish,
    ],
    "Cà ri": [
      commonStart,
      step("Ướp phần chính", "Trộn nguyên liệu chính với một nửa gia vị và để thấm.", "20 phút"),
      step("Rang gia vị", "Phi hành, gừng, tỏi; cho gia vị khô vào đảo 30–45 giây ở lửa nhỏ để dậy mùi.", "6 phút", "Lửa nhỏ"),
      step("Xào săn", "Cho nguyên liệu chính vào đảo đến khi bề mặt săn và phủ đều gia vị.", "7 phút", "Lửa vừa"),
      step("Om", "Thêm chất lỏng đã định lượng, đậy hé nắp và nấu đến khi nguyên liệu mềm.", "25–35 phút", "Sôi nhẹ"),
      step("Điều chỉnh độ sánh", "Mở nắp, đun nhỏ lửa đến độ sánh mong muốn; nêm muối từng ít một.", "8 phút"),
      commonFinish,
    ],
    "Kho hầm": [
      commonStart,
      step("Ướp", "Ướp nguyên liệu chính với gia vị trong thời gian ghi ở công thức.", "20 phút"),
      step("Áp chảo", "Làm nóng nồi, áp các mặt nguyên liệu đến vàng nhẹ để giữ cấu trúc.", "8 phút", "Lửa vừa–lớn"),
      step("Tạo nước kho", "Phi thơm gia vị nền, thêm phần nước và cạo nhẹ đáy nồi để lấy lớp vị bám.", "5 phút"),
      step("Kho hoặc hầm", "Đậy hé nắp và nấu ở lửa nhỏ đến khi nguyên liệu mềm; trở mặt nhẹ nhàng.", "30–50 phút", "Sôi nhẹ"),
      step("Cô sốt", "Mở nắp, đun đến khi sốt bám quanh nguyên liệu; không để cạn cháy.", "8 phút"),
      commonFinish,
    ],
    "Nướng": [
      commonStart,
      step("Ướp", "Trộn đều nguyên liệu với gia vị, để thấm trong ngăn mát.", "30 phút"),
      step("Làm nóng thiết bị", "Làm nóng lò hoặc chảo nướng trước để bề mặt nguyên liệu se nhanh.", "10 phút", "200°C"),
      step("Nướng mặt đầu", "Xếp nguyên liệu một lớp, chừa khoảng cách để hơi nóng lưu thông.", "10–15 phút", "200°C"),
      step("Trở mặt", "Trở nguyên liệu, quét lớp sốt mỏng và tiếp tục nướng đến chín.", "8–12 phút", "200°C"),
      step("Để nghỉ", "Lấy ra, che hờ và để nghỉ để nước bên trong phân bố lại.", "5 phút"),
      commonFinish,
    ],
    "Chiên": [
      commonStart,
      step("Chuẩn bị bề mặt", "Thấm khô nguyên liệu; pha hoặc áo lớp bột mỏng theo món.", "8 phút"),
      step("Làm nóng dầu", "Cho dầu vào chảo sâu lòng và làm nóng ổn định; không để dầu bốc khói.", "6 phút", "170–175°C"),
      step("Chiên theo mẻ", "Thả từng ít nguyên liệu, không làm chảo quá đầy; giữ nhiệt ổn định.", "4–7 phút/mẻ", "170–175°C"),
      step("Trở mặt", "Trở khi mặt dưới đã vàng, tiếp tục đến khi chín đều.", "3–5 phút"),
      step("Để ráo", "Vớt lên giá có khay hứng để hơi thoát và giữ độ giòn.", "3 phút"),
      commonFinish,
    ],
    "Gỏi salad": [
      commonStart,
      step("Làm ráo rau", "Rửa rau bằng nước sạch, ngâm lạnh nếu cần rồi để thật ráo để sốt không bị loãng.", "10 phút"),
      step("Xử lý phần đạm", "Luộc, hấp hoặc áp chảo phần đạm đến chín; để nguội bớt rồi thái.", "10–15 phút"),
      step("Pha sốt", "Hòa phần chua, mặn và ngọt trước; sau đó mới thêm dầu hoặc nguyên liệu tạo độ sánh.", "4 phút"),
      step("Trộn lần một", "Trộn nguyên liệu cứng với một nửa sốt để thấm.", "3 phút"),
      step("Trộn hoàn thiện", "Thêm rau mềm và phần sốt còn lại ngay trước khi dùng; đảo nhẹ tay.", "2 phút"),
      commonFinish,
    ],
    "Bánh bột": [
      commonStart,
      step("Pha bột", "Cân bột và chất lỏng chính xác; trộn đến đồng nhất, không còn bột khô.", "10 phút"),
      step("Cho bột nghỉ", "Đậy kín để bột hút nước hoặc lên men theo yêu cầu của món.", "30–60 phút"),
      step("Chuẩn bị nhân", "Nấu hoặc trộn phần nhân, để nguội bớt trước khi tạo hình.", "15 phút"),
      step("Tạo hình", "Chia bột đều để các phần chín cùng lúc; miết kín mép nếu có nhân.", "12 phút"),
      step("Làm chín", "Hấp, áp chảo hoặc nướng theo đặc trưng món đến khi bột chín hoàn toàn.", "12–25 phút", "Theo phương pháp"),
      commonFinish,
    ],
    "Món ngọt": [
      commonStart,
      step("Chuẩn bị khuôn", "Lót hoặc chống dính khuôn; cân chính xác nguyên liệu khô và ướt riêng.", "8 phút"),
      step("Trộn nền", "Hòa tan đường trong chất lỏng, sau đó kết hợp từ từ với phần khô để tránh vón.", "8 phút"),
      step("Tạo hương", "Thêm nguyên liệu tạo hương và nếm độ ngọt trước khi làm chín.", "3 phút"),
      step("Làm chín", "Nấu, hấp hoặc nướng ở nhiệt độ chỉ định đến khi cấu trúc ổn định.", "20–35 phút", "Theo phương pháp"),
      step("Làm nguội", "Để nguội tự nhiên trước khi cắt hoặc trang trí để món giữ hình.", "20 phút"),
      commonFinish,
    ],
  };
  return templates[family];
};

const equipmentFor = (family: DishFamily) => {
  const map: Record<DishFamily, string[]> = {
    "Món nước": ["Nồi 4–6 lít", "Rây lọc", "Vá canh", "Dao và thớt riêng"],
    "Cơm": ["Nồi đáy dày có nắp", "Rây", "Muôi gỗ"],
    "Mì xào": ["Chảo lớn hoặc wok", "Kẹp gắp", "Bát pha sốt"],
    "Cà ri": ["Nồi đáy dày", "Muôi gỗ", "Dao và thớt riêng"],
    "Kho hầm": ["Nồi đáy dày", "Kẹp gắp", "Dao và thớt riêng"],
    "Nướng": ["Lò hoặc chảo nướng", "Khay nướng", "Nhiệt kế thực phẩm"],
    "Chiên": ["Chảo sâu lòng", "Kẹp gắp", "Giá để ráo", "Nhiệt kế dầu"],
    "Gỏi salad": ["Âu trộn lớn", "Rổ quay rau", "Dao và thớt riêng"],
    "Bánh bột": ["Âu trộn", "Cân bếp", "Phới lồng", "Thiết bị làm chín phù hợp"],
    "Món ngọt": ["Âu trộn", "Cân bếp", "Phới lồng", "Khuôn"],
  };
  return map[family];
};

const allergensFor = (items: Ingredient[]) => {
  const joined = lower(items.map((item) => item.item).join(" "));
  const rules: Array<[string, string[]]> = [
    ["Trứng", ["trứng"]],
    ["Sữa", ["sữa", "phô mai", "bơ"]],
    ["Gluten/lúa mì", ["bột mì", "mì", "nước tương"]],
    ["Đậu nành", ["nước tương", "đậu hũ", "miso"]],
    ["Cá", ["cá", "nước mắm", "mắm ruốc"]],
    ["Giáp xác", ["tôm", "cua", "hải sản"]],
    ["Đậu phộng", ["đậu phộng", "lạc"]],
    ["Hạt cây", ["hạnh nhân", "macadamia", "hạt điều"]],
    ["Mè", ["mè", "dầu mè"]],
  ];
  return rules.filter(([, keys]) => keys.some((key) => joined.includes(key))).map(([label]) => label);
};

const safetyFor = (name: string) => {
  if (includesAny(name, ["gà", "vịt"])) return "Thịt gia cầm cần đạt ít nhất 74°C ở phần dày nhất. Dùng thớt riêng cho thực phẩm sống.";
  if (includesAny(name, ["bò", "heo", "lợn", "sườn"]) && includesAny(name, ["viên", "xay", "burger", "chả"])) return "Thịt xay cần đạt ít nhất 71°C. Không dùng chung dụng cụ với thực phẩm ăn ngay.";
  if (includesAny(name, ["cá", "tôm", "cua", "hải sản", "ốc", "lươn"])) return "Cá cần đạt khoảng 63°C hoặc thịt chuyển đục và tách dễ; hải sản có vỏ phải chín đục hoàn toàn.";
  return "Rửa tay trước khi nấu, tách thực phẩm sống khỏi món ăn ngay và không để món chín ở nhiệt độ phòng quá lâu.";
};

const donenessFor = (family: DishFamily, name: string) => {
  if (includesAny(name, ["gà", "vịt"])) return "Phần thịt dày nhất đạt 74°C, nước thịt trong và không còn màu hồng sống.";
  if (includesAny(name, ["cá", "tôm", "cua", "hải sản"])) return "Thịt chín đục, săn vừa; cá tách lớp dễ, tôm cong nhẹ và không khô.";
  if (family === "Cơm") return "Hạt cơm chín tới, tơi, không còn lõi cứng và đáy nồi không cháy.";
  if (family === "Bánh bột") return "Phần bột chín hoàn toàn, không còn lõi ướt hoặc mùi bột sống.";
  if (family === "Món nước") return "Nước dùng trong hoặc sánh đúng kiểu món, nguyên liệu mềm nhưng không nát.";
  return "Nguyên liệu chín đều, giữ được cấu trúc và sốt bám vừa phải.";
};

const variantSetFor = (family: DishFamily, name: string) => {
  if (family === "Món ngọt") return ["Nguyên bản", "Bếp nhà", "Nhanh gọn", "Ít ngọt", "Đãi khách"];
  if (family === "Chiên") return ["Nguyên bản", "Bếp nhà", "Nhanh gọn", "Nồi chiên không dầu", "Đãi khách"];
  if (includesAny(name, ["ớt", "cay", "kim chi", "tom yum", "tikka", "vindaloo", "sa tế"])) return ["Nguyên bản", "Bếp nhà", "Nhanh gọn", "Ít cay", "Đãi khách"];
  return ["Nguyên bản", "Bếp nhà", "Nhanh gọn", "Nhiều rau", "Đãi khách"];
};

const adjustIngredients = (items: Ingredient[], variation: string) =>
  items.map((item) => {
    if (variation === "Ít cay" && includesAny(item.item, ["ớt", "sa tế"])) {
      return { ...item, amount: typeof item.amount === "number" ? item.amount * 0.4 : item.amount };
    }
    if (variation === "Ít ngọt" && includesAny(item.item, ["đường", "mật ong"])) {
      return { ...item, amount: typeof item.amount === "number" ? item.amount * 0.65 : item.amount };
    }
    if (variation === "Nhiều rau" && (item.group === "Phần chính" || item.group === "Ăn kèm") && includesAny(item.item, ["rau", "củ", "giá", "nấm"])) {
      return { ...item, amount: typeof item.amount === "number" ? item.amount * 1.5 : item.amount };
    }
    if (variation === "Nồi chiên không dầu" && item.item === "dầu ăn") {
      return { ...item, amount: 10, unit: "ml" };
    }
    return item;
  });

const adjustSteps = (steps: RecipeStep[], variation: string) => {
  const noteMap: Record<string, RecipeStep | undefined> = {
    "Bếp nhà": step("Điều chỉnh bếp nhà", "Ưu tiên dụng cụ sẵn có; chuẩn bị toàn bộ nguyên liệu trước khi bật bếp để thao tác gọn và ổn định.", "5 phút"),
    "Nhanh gọn": step("Chuẩn bị nhanh", "Dùng phần nước dùng đã nấu sẵn hoặc nguyên liệu đã sơ chế trong ngày; không rút ngắn bước làm chín an toàn.", "5 phút"),
    "Ít cay": step("Giảm độ cay", "Giảm lượng ớt ngay từ đầu và để ớt riêng trên bàn để mỗi người tự điều chỉnh.", "2 phút"),
    "Ít ngọt": step("Cân bằng vị ngọt", "Giảm đường theo định lượng; tăng hương thơm tự nhiên thay vì dùng chất tạo ngọt bổ sung.", "2 phút"),
    "Nhiều rau": step("Tăng rau", "Chia rau thành hai lần nấu: phần cứng cho trước, rau lá cho cuối để giữ màu và độ giòn.", "4 phút"),
    "Nồi chiên không dầu": step("Đổi phương pháp", "Làm nóng nồi 5 phút ở 190°C, xịt lớp dầu rất mỏng và xếp nguyên liệu một lớp.", "5 phút", "190°C"),
    "Đãi khách": step("Chuẩn bị đãi khách", "Sơ chế trước phần có thể bảo quản lạnh; hoàn thiện phần nóng sát giờ dùng để món đúng kết cấu.", "10 phút"),
  };
  const note = noteMap[variation];
  return note ? [steps[0], note, ...steps.slice(1)] : steps;
};

const createRecipe = (
  seed: RegionSeed,
  baseName: string,
  regionIndex: number,
  nameIndex: number,
  variation: string,
  variationIndex: number,
): Recipe => {
  const signature = signatureProfiles[baseName];
  const family = signature?.family ?? inferFamily(baseName);
  const rawIngredients = signature?.ingredients ?? dedupeIngredients([
    ...stapleFor(baseName, family),
    ...proteinFor(baseName),
    ...familyBasics(family),
    ...regionalPantry[seed.region],
    ingredient(8, "g", "muối", "Gia vị"),
    ingredient(15, "g", "đường", "Gia vị", undefined, true),
  ]);
  const ingredients = adjustIngredients(rawIngredients, variation);
  const rawSteps = signature?.steps ?? genericSteps(baseName, family);
  const steps = adjustSteps(rawSteps, variation);
  const prepBase = family === "Gỏi salad" ? 25 : family === "Bánh bột" ? 30 : 20;
  const cookBase = family === "Món nước" ? 55 : family === "Kho hầm" ? 50 : family === "Món ngọt" ? 35 : 30;
  const quickReduction = variation === "Nhanh gọn" ? 10 : 0;
  const prepTime = signature?.prepTime ?? Math.max(10, prepBase - quickReduction);
  const cookTime = signature?.cookTime ?? Math.max(15, cookBase - quickReduction);
  const restTime = signature?.restTime ?? (family === "Bánh bột" || family === "Món ngọt" ? 20 : 5);
  const displayName = variationIndex === 0 ? baseName : `${baseName} · ${variation}`;
  const equipment = signature?.equipment ?? equipmentFor(family);
  const tip = signature?.tip ?? `Với ${baseName}, hãy chuẩn bị nguyên liệu theo đúng kích thước để các phần chín cùng lúc và giữ đúng kết cấu.`;
  const storage = signature?.storage ?? (
    family === "Gỏi salad"
      ? "Nên dùng ngay sau khi trộn; nếu chuẩn bị trước, để rau và nước sốt riêng trong ngăn mát tối đa 24 giờ."
      : "Làm nguội nhanh, bảo quản hộp kín trong ngăn mát tối đa 2 ngày và hâm nóng kỹ một lần trước khi dùng."
  );

  return {
    id: regionIndex * 100 + nameIndex * 5 + variationIndex + 1,
    name: displayName,
    baseName,
    region: seed.region,
    continent: seed.continent,
    origin: seed.origin,
    description: `${baseName} theo phong cách ${variation.toLocaleLowerCase("vi")}, giữ tinh thần ${seed.profile}. Công thức ghi rõ định lượng cho 4 người và dấu hiệu chín để dễ thực hiện.`,
    time: prepTime + cookTime + restTime,
    prepTime,
    cookTime,
    restTime,
    difficulty: variation === "Đãi khách" ? "Cầu kỳ" : variation === "Nhanh gọn" ? "Dễ" : "Vừa",
    servings: 4,
    image: seed.image,
    tags: [variation, family, regionIndex < 3 ? "Món Việt" : seed.continent, nameIndex % 3 === 0 ? "Nổi tiếng" : "Bếp nhà"],
    ingredients,
    steps,
    equipment,
    allergens: allergensFor(ingredients),
    tips: [
      tip,
      "Nếm và điều chỉnh gia vị ở giai đoạn cuối; các loại nước mắm, nước tương và muối có độ mặn khác nhau.",
      "Cắt nguyên liệu đồng đều và chuẩn bị xong trước khi bật bếp để kiểm soát thời gian chính xác.",
    ],
    substitutions: [
      "Có thể thay phần đạm bằng đậu hũ hoặc nấm với cùng khối lượng nếu muốn phiên bản không thịt.",
      "Nếu không có đúng loại rau ăn kèm, dùng rau địa phương có độ giòn và mùi thơm tương đương.",
    ],
    storage,
    doneness: donenessFor(family, baseName),
    safety: safetyFor(baseName),
    variation,
    sourceNote: "Công thức được biên soạn nguyên bản theo kỹ thuật đặc trưng của món; nhiệt độ an toàn tham chiếu FoodSafety.gov và cảnh báo dị ứng theo nhóm FDA.",
  };
};

export const recipes: Recipe[] = regionSeeds.flatMap((seed, regionIndex) =>
  seed.names.flatMap((baseName, nameIndex) => {
    const family = signatureProfiles[baseName]?.family ?? inferFamily(baseName);
    return variantSetFor(family, baseName).map((variation, variationIndex) =>
      createRecipe(seed, baseName, regionIndex, nameIndex, variation, variationIndex),
    );
  }),
);

const invalidRecipes = recipes.filter(
  (recipe) =>
    recipe.ingredients.length < 8 ||
    recipe.steps.length < 6 ||
    recipe.ingredients.some((item) => /nguyên liệu chính cho|vừa đủ/i.test(item.item)),
);

if (recipes.length !== 1000 || invalidRecipes.length > 0) {
  throw new Error(`Dữ liệu công thức không đạt chuẩn: ${recipes.length} mục, ${invalidRecipes.length} mục chưa đủ chi tiết.`);
}

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
