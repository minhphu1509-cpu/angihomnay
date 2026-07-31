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

export type VerificationStatus =
  | "Đã kiểm chứng nội bộ"
  | "Đã chuẩn hóa vận hành"
  | "Chờ kiểm chứng";

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
  image: string | null;
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
  editorialStatus: "Đã biên tập chi tiết" | "Đã chuẩn hóa theo suất" | "Đang rà soát";
  contentVersion: string;
  imageStatus: "Ảnh đúng món" | "Minh họa theo nhóm món";
  verificationStatus: VerificationStatus;
  reviewedAt: string | null;
  reviewedBy: string | null;
  verificationNotes: string;
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
  | "Xào"
  | "Hấp luộc"
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
  "Bún chả Hà Nội": {
    family: "Nướng",
    ingredients: [
      ingredient(500, "g", "bún tươi", "Phần chính"),
      ingredient(350, "g", "thịt ba chỉ", "Phần chính", "thái lát mỏng"),
      ingredient(350, "g", "thịt nạc vai xay", "Phần chính"),
      ingredient(80, "g", "đu đủ xanh", "Ăn kèm", "thái lát mỏng"),
      ingredient(50, "g", "cà rốt", "Ăn kèm", "thái lát mỏng"),
      ingredient(2, "củ", "hành tím", "Gia vị", "băm nhỏ"),
      ingredient(20, "g", "tỏi", "Gia vị", "băm nhỏ"),
      ingredient(70, "ml", "nước mắm", "Gia vị"),
      ingredient(45, "g", "đường", "Gia vị"),
      ingredient(35, "ml", "nước cốt chanh", "Gia vị"),
      ingredient(15, "ml", "dầu ăn", "Gia vị"),
      ingredient(2, "g", "tiêu xay", "Gia vị"),
      ingredient(250, "g", "xà lách và rau thơm", "Ăn kèm", "rửa sạch, để ráo"),
      ingredient(1, "quả", "ớt", "Ăn kèm", "thái lát", true),
    ],
    steps: [
      step("Pha phần ướp", "Hòa 20 ml nước mắm với 15 g đường, hành tím, một nửa tỏi, dầu ăn và tiêu.", "5 phút"),
      step("Ướp hai phần thịt", "Chia gia vị ướp cho thịt ba chỉ và thịt nạc vai xay; trộn riêng, đậy kín và để trong ngăn mát.", "30 phút"),
      step("Tạo chả viên", "Chia thịt xay thành các viên dẹt dày khoảng 1,5 cm để chín đều mà vẫn mọng.", "8 phút"),
      step("Làm dưa góp", "Trộn đu đủ và cà rốt với một nhúm muối trong 10 phút, xả nhanh rồi để thật ráo.", "15 phút"),
      step("Pha nước chấm", "Hòa 50 ml nước mắm, 30 g đường, nước cốt chanh và 250 ml nước ấm; thêm phần tỏi còn lại, dưa góp và ớt tùy khẩu vị.", "8 phút"),
      step("Nướng thịt", "Nướng thịt lát và chả viên trên vỉ hoặc chảo nướng đã làm nóng; trở đều đến khi xém cạnh và phần giữa chín hoàn toàn.", "12–16 phút", "Lửa vừa–lớn"),
      step("Hoàn thiện", "Cho thịt nướng vào bát nước chấm ấm; dùng cùng bún tươi, xà lách và rau thơm.", "3 phút"),
    ],
    equipment: ["Vỉ nướng hoặc chảo nướng", "Hai âu ướp riêng", "Bát pha nước chấm", "Kẹp gắp"],
    tip: "Tạo chả viên dẹt và nướng theo mẻ nhỏ để thịt có cạnh xém thơm nhưng không bị khô.",
    storage: "Thịt đã nướng bảo quản kín trong ngăn mát tối đa 2 ngày; bún, rau và nước chấm để riêng.",
    prepTime: 35,
    cookTime: 20,
    restTime: 30,
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
      ingredient(650, "ml", "nước dùng gà", "Phần chính"),
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
const pickByName = <T,>(name: string, options: T[]) => {
  const score = Array.from(name).reduce((total, char) => total + char.charCodeAt(0), 0);
  return options[score % options.length];
};

const inferFamily = (name: string): DishFamily => {
  if (includesAny(name, ["chè", "pudding", "pavlova", "lamington", "bánh táo", "bánh chanh", "pancake", "crepe", "cốm xào", "xôi xiêm", "tào phớ"])) return "Món ngọt";
  if (includesAny(name, ["gỏi", "nộm", "salad", "som tam", "ceviche", "cuốn"])) return "Gỏi salad";
  if (includesAny(name, ["pizza", "naan", "samosa", "pakora", "dosa", "bánh", "empanada", "damper", "injera", "msemen"])) return "Bánh bột";
  if (includesAny(name, ["cà ri", "curry", "masala", "korma", "vindaloo", "rendang", "tagine", "doro wat", "misir wot"])) return "Cà ri";
  if (includesAny(name, ["phở", "bún", "ramen", "laksa", "khao soi", "súp", "canh", "cháo", "hủ tiếu", "bánh canh", "miến", "harira", "sinigang", "lẩu", "don"])) return "Món nước";
  if (includesAny(name, ["mì xào", "pad thai", "mee goreng", "mì tương đen"])) return "Mì xào";
  if (includesAny(name, ["cơm", "xôi", "biryani", "paella", "risotto", "jambalaya", "jollof", "pulao", "pilau", "nasi"])) return "Cơm";
  if (includesAny(name, ["kho", "hầm", "goulash", "stroganoff", "chili", "adobo", "thịt đông", "phá lấu"])) return "Kho hầm";
  if (includesAny(name, ["hấp", "luộc", "tần"])) return "Hấp luộc";
  if (includesAny(name, ["nướng", "tandoori", "teriyaki", "satay", "bulgogi", "vịt quay", "bbq"])) return "Nướng";
  if (includesAny(name, ["xào", "rang", "lúc lắc"])) return "Xào";
  return includesAny(name, ["chiên", "tempura", "bánh xèo"]) ? "Chiên" : "Nướng";
};

const proteinFor = (name: string, family: DishFamily): Ingredient[] => {
  if (family === "Món ngọt") return [];
  if (family === "Bánh bột" && includesAny(name, ["bánh chưng", "bánh giò", "bánh cuốn", "bánh bột lọc", "bánh bèo", "há cảo", "hoành thánh", "empanada"])) {
    return [ingredient(280, "g", pickByName(name, ["thịt băm", "tôm", "đậu xanh"]), "Phần chính", "chuẩn bị riêng")];
  }
  if (family === "Bánh bột") return [];
  if (includesAny(name, ["bò", "beef", "gyudon", "bulgogi", "goulash", "stroganoff"])) return [ingredient(550, "g", "thịt bò", "Phần chính", "thái theo thớ phù hợp")];
  if (includesAny(name, ["gà", "chicken", "tandoori", "adobo", "yassa"])) return [ingredient(650, "g", "thịt gà", "Phần chính", "cắt miếng đều")];
  if (includesAny(name, ["heo", "lợn", "sườn", "ba chỉ"])) return [ingredient(600, "g", "thịt heo", "Phần chính", "cắt miếng")];
  if (includesAny(name, ["tôm", "hải sản", "cua", "ốc"])) return [ingredient(500, "g", "hải sản", "Phần chính", "làm sạch")];
  if (includesAny(name, ["lươn"])) return [ingredient(550, "g", "lươn", "Phần chính", "làm sạch nhớt")];
  if (includesAny(name, ["cá"])) return [ingredient(600, "g", "cá", "Phần chính", "làm sạch")];
  if (includesAny(name, ["đậu", "rau củ", "ratatouille", "aloo", "chana"])) return [ingredient(450, "g", "rau củ và đậu", "Phần chính", "cắt đều")];
  if (family === "Gỏi salad") return [ingredient(220, "g", pickByName(name, ["tôm", "thịt luộc", "rau củ giòn"]), "Phần chính", "sơ chế riêng")];
  if (family === "Món nước") return [ingredient(450, "g", pickByName(name, ["xương heo", "chả", "rau củ nấu nước"]), "Phần chính", "sơ chế sạch")];
  return [ingredient(420, "g", pickByName(name, ["thịt", "cá", "đậu", "rau củ chính"]), "Phần chính", "cắt miếng vừa ăn")];
};

const stapleFor = (name: string, family: DishFamily): Ingredient[] => {
  if (includesAny(name, ["phở"])) return [ingredient(500, "g", "bánh phở", "Phần chính")];
  if (includesAny(name, ["bún"])) return [ingredient(500, "g", "bún tươi", "Phần chính")];
  if (includesAny(name, ["mì", "ramen", "laksa", "khao soi"])) return [ingredient(350, "g", "mì", "Phần chính")];
  if (includesAny(name, ["bánh canh"])) return [ingredient(500, "g", "sợi bánh canh", "Phần chính")];
  if (includesAny(name, ["bánh cuốn", "bánh bèo", "bánh bột lọc", "bánh nậm", "bánh căn", "bánh khọt", "bánh hỏi"])) return [ingredient(320, "g", "bột gạo", "Phần chính")];
  if (includesAny(name, ["bánh naan", "pizza", "pancake", "crepe", "damper", "roti", "msemen"])) return [ingredient(320, "g", "bột mì", "Phần chính")];
  if (includesAny(name, ["samosa", "empanada", "bánh mì"])) return [ingredient(300, "g", pickByName(name, ["vỏ bánh", "bột mì"]), "Phần chính")];
  if (includesAny(name, ["xôi", "bánh chưng", "bánh khúc", "bánh dày"])) return [ingredient(400, "g", "gạo nếp", "Phần chính", "ngâm mềm")];
  if (includesAny(name, ["chè bắp"])) return [ingredient(350, "g", "bắp nếp", "Phần chính", "bào mỏng")];
  if (includesAny(name, ["chè đậu", "chè kho"])) return [ingredient(280, "g", "đậu", "Phần chính", "ngâm mềm")];
  if (includesAny(name, ["chè chuối", "chuối nếp"])) return [ingredient(500, "g", "chuối sứ", "Phần chính")];
  if (includesAny(name, ["tào phớ"])) return [ingredient(800, "ml", "sữa đậu nành", "Phần chính")];
  if (family === "Cơm") return [ingredient(360, "g", "gạo", "Phần chính", "vo sạch")];
  if (family === "Bánh bột") return [ingredient(300, "g", pickByName(name, ["bột gạo", "bột mì"]), "Phần chính")];
  if (family === "Món ngọt") return [ingredient(250, "g", pickByName(name, ["đậu", "nếp", "trái cây", "bột làm bánh"]), "Phần chính")];
  return [];
};

const aromaticFor = (name: string, region: RegionKey): Ingredient[] => {
  if (includesAny(name, ["phở", "bún bò", "bò kho", "vịt quay", "biryani", "tagine", "jollof"])) {
    return [ingredient(35, "g", pickByName(name, ["gừng", "sả", "hoa hồi", "quế"]), "Gia vị", "sơ chế riêng")];
  }
  if (includesAny(name, ["xào", "kho", "rim", "chiên", "nướng", "ram", "chả", "nem", "gỏi", "nộm"])) {
    return [ingredient(35, "g", region === "Miền Bắc" ? pickByName(name, ["hành tím", "hành hoa"]) : pickByName(name, ["hành tím", "tỏi"]), "Gia vị", "băm hoặc thái nhỏ")];
  }
  if (includesAny(name, ["súp", "canh", "cháo", "lẩu", "hủ tiếu", "miến"])) {
    return [ingredient(30, "g", pickByName(name, ["gừng", "hành tím", "rau mùi", "rau răm"]), "Gia vị", "sơ chế riêng")];
  }
  return [ingredient(25, "g", pickByName(name, ["hành tím", "tỏi", "hành lá"]), "Gia vị", "băm nhỏ")];
};

const familyBasics = (name: string, family: DishFamily, region: RegionKey): Ingredient[] => {
  if (family === "Món nước") return [
    ingredient(1.8, "lít", includesAny(name, ["canh", "súp", "cháo"]) ? pickByName(name, ["nước lọc", "nước luộc gà", "nước luộc rau củ"]) : pickByName(name, ["nước dùng xương", "nước dùng rau củ", "nước dùng hải sản"]), "Phần chính"),
    ...aromaticFor(name, region),
    ingredient(150, "g", includesAny(name, ["phở"]) ? "hành hoa, rau mùi và chanh" : includesAny(name, ["bún bò", "mì quảng", "cao lầu"]) ? "rau sống, bắp chuối và rau thơm" : pickByName(name, ["rau thơm", "giá đỗ", "rau sống"]), "Ăn kèm", "rửa sạch"),
  ];
  if (family === "Cơm") return [
    ...aromaticFor(name, region),
    ingredient(650, "ml", "nước dùng", "Phần chính"),
    ingredient(150, "g", includesAny(name, ["hến"]) ? "rau răm và tóp mỡ" : pickByName(name, ["cà rốt", "đậu Hà Lan", "rau ăn kèm"]), "Phần chính", "sơ chế vừa ăn"),
  ];
  if (family === "Mì xào") return [
    ingredient(180, "g", "rau củ giòn", "Phần chính", "thái sợi"),
    ingredient(25, "ml", "dầu ăn", "Gia vị"),
    ingredient(1, "quả", "trứng", "Phần chính"),
  ];
  if (family === "Cà ri" || family === "Kho hầm") return [
    ingredient(250, "g", "cà chua", "Phần chính", "băm"),
    ...aromaticFor(name, region),
    ingredient(500, "ml", "nước dùng", "Phần chính"),
  ];
  if (family === "Gỏi salad") return [
    ingredient(350, "g", "rau củ tươi", "Phần chính", "thái mỏng"),
    ingredient(30, "ml", "nước cốt chanh", "Gia vị"),
    ingredient(15, "g", "đường", "Gia vị"),
  ];
  if (family === "Món ngọt") return [
    ingredient(80, "g", "đường", "Gia vị"),
    ingredient(250, "ml", pickByName(name, ["sữa tươi", "nước cốt dừa"]), "Phần chính"),
    ingredient(2, "quả", "trứng", "Phần chính"),
  ];
  return [
    ingredient(200, "g", "rau củ theo mùa", "Phần chính", "cắt đều"),
    ingredient(30, "ml", "dầu ăn", "Gia vị"),
    ...aromaticFor(name, region),
  ];
};

const dishAccentFor = (name: string, family: DishFamily): Ingredient => {
  const rules: Array<[string[], Ingredient]> = [
    [["rươi"], ingredient(120, "g", "vỏ quýt và thì là", "Gia vị", "băm nhỏ")],
    [["lá lốt"], ingredient(80, "g", "lá lốt", "Gia vị", "rửa sạch, để ráo")],
    [["mắm tôm"], ingredient(35, "g", "mắm tôm", "Gia vị", "đánh bông với chanh")],
    [["mắm ruốc"], ingredient(30, "g", "mắm ruốc", "Gia vị", "hòa lọc")],
    [["riềng"], ingredient(60, "g", "riềng", "Gia vị", "giã hoặc thái lát")],
    [["tương"], ingredient(45, "g", "tương bần", "Gia vị")],
    [["sấu"], ingredient(80, "g", "sấu xanh", "Gia vị", "cạo vỏ")],
    [["dọc mùng"], ingredient(180, "g", "dọc mùng", "Phần chính", "bóp muối, xả sạch")],
    [["rau đay"], ingredient(250, "g", "rau đay", "Phần chính", "nhặt lá")],
    [["hoa chuối", "bắp chuối"], ingredient(220, "g", "hoa chuối", "Phần chính", "bào mỏng, ngâm chua nhẹ")],
    [["ngó sen"], ingredient(240, "g", "ngó sen", "Phần chính", "chẻ sợi")],
    [["măng cụt"], ingredient(250, "g", "măng cụt xanh", "Phần chính", "tách múi")],
    [["vả trộn"], ingredient(350, "g", "trái vả", "Phần chính", "luộc sơ, thái lát")],
    [["xoài"], ingredient(220, "g", "xoài xanh", "Phần chính", "bào sợi")],
    [["khổ qua"], ingredient(350, "g", "khổ qua", "Phần chính", "bỏ ruột")],
    [["lá giang"], ingredient(120, "g", "lá giang", "Gia vị", "vò nhẹ")],
    [["thơm", "dứa"], ingredient(180, "g", "thơm", "Phần chính", "cắt miếng")],
    [["nước dừa", "dừa"], ingredient(220, "ml", "nước dừa tươi", "Gia vị")],
    [["cốt dừa"], ingredient(180, "ml", "nước cốt dừa", "Gia vị")],
    [["hến"], ingredient(450, "g", "thịt hến", "Phần chính", "rửa sạch")],
    [["bún kèn"], ingredient(220, "g", "cá xay nấu kèn", "Phần chính")],
    [["bún quậy"], ingredient(220, "g", "chả tôm quết", "Phần chính", "quết dẻo")],
    [["ốc"], ingredient(500, "g", "ốc", "Phần chính", "luộc lấy thịt")],
    [["ngan"], ingredient(650, "g", "thịt ngan", "Phần chính", "làm sạch")],
    [["lươn"], ingredient(550, "g", "lươn", "Phần chính", "làm sạch nhớt")],
    [["tôm chua"], ingredient(220, "g", "tôm chua Huế", "Gia vị", "để ráo phần nước ngâm")],
    [["cua"], ingredient(500, "g", "cua", "Phần chính", "sơ chế theo món")],
    [["mực"], ingredient(500, "g", "mực", "Phần chính", "khứa nhẹ")],
    [["tôm"], ingredient(450, "g", "tôm", "Phần chính", "bỏ chỉ lưng")],
    [["cá mai"], ingredient(450, "g", "cá mai", "Phần chính", "làm sạch")],
    [["cá kèo"], ingredient(550, "g", "cá kèo", "Phần chính", "làm sạch")],
    [["cá lóc"], ingredient(600, "g", "cá lóc", "Phần chính", "cắt khoanh")],
    [["cá bống thệ"], ingredient(550, "g", "cá bống thệ", "Phần chính", "làm sạch")],
    [["cá bống sông trà"], ingredient(550, "g", "cá bống sông Trà", "Phần chính", "làm sạch")],
    [["cá bống"], ingredient(550, "g", "cá bống", "Phần chính", "làm sạch")],
    [["cá nục"], ingredient(600, "g", "cá nục", "Phần chính", "làm sạch")],
    [["cá rô"], ingredient(550, "g", "cá rô", "Phần chính", "làm sạch")],
    [["cá trắm"], ingredient(650, "g", "cá trắm", "Phần chính", "cắt khúc")],
    [["cá hồi"], ingredient(520, "g", "cá hồi", "Phần chính", "cắt phần đều")],
    [["bò kho"], ingredient(60, "g", "sả và hoa hồi", "Gia vị", "đập dập")],
    [["bò né"], ingredient(35, "g", "bơ lạt", "Gia vị")],
    [["bò lúc lắc"], ingredient(120, "g", "ớt chuông", "Phần chính", "cắt vuông")],
    [["gà rang gừng", "gà kho gừng"], ingredient(55, "g", "gừng", "Gia vị", "thái sợi")],
    [["gà xào sả", "gà kho sả"], ingredient(4, "cây", "sả", "Gia vị", "băm nhỏ")],
    [["gà hấp lá chanh"], ingredient(15, "lá", "lá chanh", "Gia vị", "thái chỉ")],
    [["vịt nấu chao"], ingredient(80, "g", "chao đỏ", "Gia vị", "tán nhuyễn")],
    [["xôi xéo"], ingredient(260, "g", "đậu xanh cà vỏ", "Phần chính", "hấp chín, giã mịn")],
    [["xôi gấc"], ingredient(180, "g", "thịt gấc", "Gia vị", "trộn với nếp")],
    [["xôi"], ingredient(400, "g", "gạo nếp", "Phần chính", "ngâm mềm")],
    [["cốm"], ingredient(300, "g", "cốm", "Phần chính")],
    [["bánh chưng"], ingredient(450, "g", "gạo nếp và lá dong", "Phần chính")],
    [["bánh gai"], ingredient(120, "g", "lá gai", "Phần chính", "xay mịn")],
    [["bánh khúc"], ingredient(120, "g", "rau khúc", "Phần chính", "giã nhuyễn")],
    [["bánh tằm"], ingredient(320, "g", "bột gạo làm sợi bánh tằm", "Phần chính")],
    [["bánh bò"], ingredient(180, "g", "đường thốt nốt", "Gia vị")],
    [["bánh da lợn"], ingredient(160, "g", "đậu xanh cà vỏ", "Phần chính", "hấp chín")],
    [["chè bắp"], ingredient(350, "g", "bắp nếp bào", "Phần chính")],
    [["chè chuối"], ingredient(500, "g", "chuối sứ", "Phần chính", "cắt khoanh")],
    [["chè đậu"], ingredient(280, "g", "đậu trắng", "Phần chính", "ngâm mềm")],
    [["tào phớ"], ingredient(800, "ml", "sữa đậu nành", "Phần chính")],
    [["sushi"], ingredient(8, "lá", "rong biển nori", "Phần chính")],
    [["ramen"], ingredient(35, "g", "miso", "Gia vị")],
    [["bibimbap"], ingredient(80, "g", "tương ớt gochujang", "Gia vị")],
    [["tokbokki"], ingredient(500, "g", "bánh gạo Hàn Quốc", "Phần chính")],
    [["kim chi"], ingredient(300, "g", "kim chi cải thảo", "Phần chính")],
    [["đậu hũ tứ xuyên"], ingredient(35, "g", "tương đậu cay", "Gia vị")],
    [["pad thai"], ingredient(45, "ml", "nước cốt me", "Gia vị")],
    [["tom yum"], ingredient(8, "lá", "lá chanh Thái", "Gia vị")],
    [["laksa"], ingredient(80, "g", "gia vị laksa", "Gia vị")],
    [["nasi lemak"], ingredient(250, "ml", "nước cốt dừa", "Gia vị")],
    [["biryani"], ingredient(2, "thìa cà phê", "garam masala", "Gia vị")],
    [["pizza"], ingredient(250, "g", "phô mai mozzarella", "Phần chính")],
    [["jollof"], ingredient(30, "g", "cà chua cô đặc", "Gia vị")],
  ];
  const matched = rules.find(([keys]) => keys.some((key) => includesAny(name, [key])));
  if (matched) return matched[1];
  if (family === "Món nước") return ingredient(40, "g", pickByName(name, ["hành lá", "rau mùi", "rau răm"]), "Ăn kèm", "thái nhỏ");
  if (family === "Cơm") return ingredient(120, "g", pickByName(name, ["cà rốt", "đậu Hà Lan", "rau thơm"]), "Phần chính", "cắt đều");
  if (family === "Bánh bột") return ingredient(80, "g", pickByName(name, ["đậu xanh", "tôm khô", "hành phi"]), "Phần chính", "chuẩn bị riêng");
  if (family === "Món ngọt") return ingredient(60, "g", pickByName(name, ["gừng", "vani", "lá dứa", "mè rang"]), "Gia vị", "thêm ở cuối");
  if (family === "Gỏi salad") return ingredient(45, "g", pickByName(name, ["đậu phộng rang", "hành phi"]), "Ăn kèm", "giã dập");
  if (family === "Xào") return ingredient(120, "g", pickByName(name, ["cần tây", "hành lá", "ớt chuông"]), "Phần chính", "cắt khúc");
  if (family === "Nướng") return ingredient(25, "g", pickByName(name, ["mật ong", "dầu điều", "mè rang"]), "Gia vị");
  if (family === "Chiên") return ingredient(60, "g", pickByName(name, ["bột chiên giòn", "bột năng"]), "Gia vị");
  return ingredient(35, "g", pickByName(name, ["hành tím", "tỏi", "tiêu xanh"]), "Gia vị", "cho vào cuối để dậy mùi");
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
  const dishFocus = step(
    `Xử lý điểm vị ${name}`,
    `Sơ chế riêng phần ${dishAccentFor(name, family).item} để món có đúng dấu vị nhận diện, không nấu chung quá sớm làm mất mùi.`,
    "4–8 phút",
  );
  const commonFinish = step("Hoàn thiện", "Nếm lại, điều chỉnh từng ít một rồi trình bày và dùng ở trạng thái phù hợp với món.", "3 phút");

  const templates: Record<DishFamily, RecipeStep[]> = {
    "Món nước": [
      commonStart,
      dishFocus,
      step("Xử lý phần chính", "Chần hoặc áp chảo nguyên liệu chính để loại bọt và tạo mùi thơm, sau đó để riêng.", "8 phút"),
      step("Tạo nước dùng", "Phi thơm gia vị nền, thêm nước dùng và đun sôi; hạ nhỏ lửa, hớt bọt để nước trong.", "25–40 phút", "Sôi lăn tăn"),
      step("Nấu nguyên liệu", "Cho nguyên liệu lâu chín trước, rau củ sau; giữ lửa vừa để chín đều mà không nát.", "15–25 phút"),
      step("Nêm vị", "Thêm gia vị theo từng phần nhỏ, chờ 1 phút sau mỗi lần nêm rồi mới thử lại.", "5 phút"),
      step("Chuẩn bị phần sợi", "Chần sợi hoặc phần tinh bột vừa mềm, xả nhanh nếu cần và để ráo.", "3–5 phút", "Nước sôi"),
      commonFinish,
    ],
    "Cơm": [
      commonStart,
      dishFocus,
      step("Chuẩn bị gạo", "Vo gạo nhẹ tay đến khi nước bớt đục, ngâm theo loại gạo rồi để ráo.", "20 phút"),
      step("Tạo nền vị", "Phi hành và gia vị ở lửa vừa đến thơm; cho nguyên liệu chính vào đảo săn.", "8–10 phút", "Lửa vừa"),
      step("Nấu cơm", "Thêm gạo và lượng nước dùng đã định lượng; đun sôi rồi hạ lửa rất nhỏ, đậy kín.", "18–25 phút", "Lửa rất nhỏ"),
      step("Làm chín phần chính", "Kiểm tra nguyên liệu chín hoàn toàn và nước đã được gạo hấp thụ.", "5 phút"),
      step("Ủ cơm", "Tắt bếp, giữ nguyên nắp để hơi nước phân bố đều; không mở nắp sớm.", "10 phút"),
      commonFinish,
    ],
    "Mì xào": [
      commonStart,
      dishFocus,
      step("Chuẩn bị sợi", "Ngâm hoặc luộc sợi ngắn hơn hướng dẫn 1–2 phút; để ráo và trộn một ít dầu.", "8 phút"),
      step("Pha sốt", "Hòa các gia vị lỏng và gia vị khô thành một hỗn hợp đồng nhất.", "3 phút"),
      step("Xào phần chính", "Làm nóng chảo, xào nguyên liệu chính theo mẻ nhỏ đến vừa chín rồi lấy ra.", "5–7 phút", "Lửa lớn"),
      step("Xào sợi", "Cho sợi và sốt vào chảo, đảo liên tục để sốt bám đều mà sợi không đứt.", "3–4 phút", "Lửa lớn"),
      step("Thêm rau", "Cho rau và nguyên liệu đã xào vào, đảo nhanh đến khi rau còn độ giòn.", "2 phút"),
      commonFinish,
    ],
    "Cà ri": [
      commonStart,
      dishFocus,
      step("Ướp phần chính", "Trộn nguyên liệu chính với một nửa gia vị và để thấm.", "20 phút"),
      step("Rang gia vị", "Phi hành, gừng, tỏi; cho gia vị khô vào đảo 30–45 giây ở lửa nhỏ để dậy mùi.", "6 phút", "Lửa nhỏ"),
      step("Xào săn", "Cho nguyên liệu chính vào đảo đến khi bề mặt săn và phủ đều gia vị.", "7 phút", "Lửa vừa"),
      step("Om", "Thêm chất lỏng đã định lượng, đậy hé nắp và nấu đến khi nguyên liệu mềm.", "25–35 phút", "Sôi nhẹ"),
      step("Điều chỉnh độ sánh", "Mở nắp, đun nhỏ lửa đến độ sánh mong muốn; nêm muối từng ít một.", "8 phút"),
      commonFinish,
    ],
    "Kho hầm": [
      commonStart,
      dishFocus,
      step("Ướp", "Ướp nguyên liệu chính với gia vị trong thời gian ghi ở công thức.", "20 phút"),
      step("Áp chảo", "Làm nóng nồi, áp các mặt nguyên liệu đến vàng nhẹ để giữ cấu trúc.", "8 phút", "Lửa vừa–lớn"),
      step("Tạo nước kho", "Phi thơm gia vị nền, thêm phần nước và cạo nhẹ đáy nồi để lấy lớp vị bám.", "5 phút"),
      step("Kho hoặc hầm", "Đậy hé nắp và nấu ở lửa nhỏ đến khi nguyên liệu mềm; trở mặt nhẹ nhàng.", "30–50 phút", "Sôi nhẹ"),
      step("Cô sốt", "Mở nắp, đun đến khi sốt bám quanh nguyên liệu; không để cạn cháy.", "8 phút"),
      commonFinish,
    ],
    "Nướng": [
      commonStart,
      dishFocus,
      step("Ướp", "Trộn đều nguyên liệu với gia vị, để thấm trong ngăn mát.", "30 phút"),
      step("Làm nóng thiết bị", "Làm nóng lò hoặc chảo nướng trước để bề mặt nguyên liệu se nhanh.", "10 phút", "200°C"),
      step("Nướng mặt đầu", "Xếp nguyên liệu một lớp, chừa khoảng cách để hơi nóng lưu thông.", "10–15 phút", "200°C"),
      step("Trở mặt", "Trở nguyên liệu, quét lớp sốt mỏng và tiếp tục nướng đến chín.", "8–12 phút", "200°C"),
      step("Để nghỉ", "Lấy ra, che hờ và để nghỉ để nước bên trong phân bố lại.", "5 phút"),
      commonFinish,
    ],
    "Chiên": [
      commonStart,
      dishFocus,
      step("Chuẩn bị bề mặt", "Thấm khô nguyên liệu; pha hoặc áo lớp bột mỏng theo món.", "8 phút"),
      step("Làm nóng dầu", "Cho dầu vào chảo sâu lòng và làm nóng ổn định; không để dầu bốc khói.", "6 phút", "170–175°C"),
      step("Chiên theo mẻ", "Thả từng ít nguyên liệu, không làm chảo quá đầy; giữ nhiệt ổn định.", "4–7 phút/mẻ", "170–175°C"),
      step("Trở mặt", "Trở khi mặt dưới đã vàng, tiếp tục đến khi chín đều.", "3–5 phút"),
      step("Để ráo", "Vớt lên giá có khay hứng để hơi thoát và giữ độ giòn.", "3 phút"),
      commonFinish,
    ],
    "Xào": [
      commonStart,
      dishFocus,
      step("Sơ chế đồng đều", "Thái nguyên liệu theo kích thước tương đương và để thật ráo trước khi xào.", "10 phút"),
      step("Pha sốt", "Hòa gia vị lỏng và khô trong bát riêng để có thể cho vào chảo cùng lúc.", "4 phút"),
      step("Làm nóng chảo", "Làm nóng chảo đến khi nhiệt ổn định, thêm dầu và láng nhanh quanh thành chảo.", "3 phút", "Lửa lớn"),
      step("Xào phần chính", "Xào nguyên liệu chính theo mẻ nhỏ, đảo nhanh đến vừa chín rồi lấy ra.", "4–7 phút", "Lửa lớn"),
      step("Xào rau và hoàn thiện", "Cho rau cứng trước, rau mềm sau; thêm phần chính và sốt, đảo nhanh đến khi sốt bám đều.", "4 phút", "Lửa lớn"),
      commonFinish,
    ],
    "Hấp luộc": [
      commonStart,
      dishFocus,
      step("Chuẩn bị nguyên liệu", "Làm sạch, cắt đồng đều và để ráo; ướp nhẹ nếu món cần giữ hương vị tự nhiên.", "10 phút"),
      step("Chuẩn bị thiết bị", "Đun nước đến sôi ổn định; lượng nước không được chạm thực phẩm khi hấp.", "8 phút", "100°C"),
      step("Làm chín phần chính", "Xếp nguyên liệu thoáng, đậy kín và làm chín theo kích thước; hạn chế mở nắp nhiều lần.", "12–25 phút", "Hơi nước mạnh"),
      step("Kiểm tra độ chín", "Kiểm tra phần dày nhất và kéo dài thời gian nếu chưa đạt dấu hiệu chín an toàn.", "3 phút"),
      step("Pha nước chấm", "Hòa gia vị chấm theo từng ít một, cân bằng vị mặn, chua và thơm phù hợp với món.", "5 phút"),
      commonFinish,
    ],
    "Gỏi salad": [
      commonStart,
      dishFocus,
      step("Làm ráo rau", "Rửa rau bằng nước sạch, ngâm lạnh nếu cần rồi để thật ráo để sốt không bị loãng.", "10 phút"),
      step("Xử lý phần đạm", "Luộc, hấp hoặc áp chảo phần đạm đến chín; để nguội bớt rồi thái.", "10–15 phút"),
      step("Pha sốt", "Hòa phần chua, mặn và ngọt trước; sau đó mới thêm dầu hoặc nguyên liệu tạo độ sánh.", "4 phút"),
      step("Trộn lần một", "Trộn nguyên liệu cứng với một nửa sốt để thấm.", "3 phút"),
      step("Trộn hoàn thiện", "Thêm rau mềm và phần sốt còn lại ngay trước khi dùng; đảo nhẹ tay.", "2 phút"),
      commonFinish,
    ],
    "Bánh bột": [
      commonStart,
      dishFocus,
      step("Pha bột", "Cân bột và chất lỏng chính xác; trộn đến đồng nhất, không còn bột khô.", "10 phút"),
      step("Cho bột nghỉ", "Đậy kín để bột hút nước hoặc lên men theo yêu cầu của món.", "30–60 phút"),
      step("Chuẩn bị nhân", "Nấu hoặc trộn phần nhân, để nguội bớt trước khi tạo hình.", "15 phút"),
      step("Tạo hình", "Chia bột đều để các phần chín cùng lúc; miết kín mép nếu có nhân.", "12 phút"),
      step("Làm chín", "Hấp, áp chảo hoặc nướng theo đặc trưng món đến khi bột chín hoàn toàn.", "12–25 phút", "Theo phương pháp"),
      commonFinish,
    ],
    "Món ngọt": [
      commonStart,
      dishFocus,
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
    "Xào": ["Chảo lớn hoặc wok", "Xẻng chảo", "Bát pha sốt", "Dao và thớt riêng"],
    "Hấp luộc": ["Nồi hấp hoặc nồi sâu lòng", "Kẹp gắp", "Đĩa chịu nhiệt", "Nhiệt kế thực phẩm"],
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

const exactRecipeImages: Record<string, string> = {
  "Phở bò Hà Nội": "/food/pho-bo.webp",
  "Bún bò Huế": "/food/bun-bo-hue.webp",
  "Bánh xèo miền Tây": "/food/banh-xeo.webp",
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
    ...proteinFor(baseName, family),
    ...familyBasics(baseName, family, seed.region),
    dishAccentFor(baseName, family),
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
    image: exactRecipeImages[baseName] ?? null,
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
    editorialStatus: signature ? "Đã biên tập chi tiết" : "Đang rà soát",
    contentVersion: "2026.07",
    imageStatus: exactRecipeImages[baseName] ? "Ảnh đúng món" : "Minh họa theo nhóm món",
    verificationStatus: signature ? "Đã kiểm chứng nội bộ" : "Chờ kiểm chứng",
    reviewedAt: signature ? "2026-07-31" : null,
    reviewedBy: signature ? "Ban biên tập Ăn gì hôm nay" : null,
    verificationNotes: signature
      ? "Đã rà soát định lượng, trình tự thao tác và dấu hiệu món đạt trong bộ công thức gốc."
      : "Hồ sơ đã đủ trường dữ liệu nhưng cần tiếp tục đối chiếu định lượng và kỹ thuật đặc trưng trước khi gắn nhãn kiểm chứng.",
  };
};

const additionalVietnameseNames: Record<
  Extract<RegionKey, "Miền Bắc" | "Miền Trung" | "Miền Nam">,
  string[]
> = {
  "Miền Bắc": [
    "Bún ốc Hà Nội", "Phở gà Hà Nội", "Bánh đa trộn", "Miến gà", "Cháo sườn",
    "Bánh giò", "Bánh đúc nóng", "Bánh khúc", "Bún cá rô đồng", "Bún bung dọc mùng",
    "Bún ngan", "Bún đậu mắm tôm", "Cá rô kho tương", "Cá trắm kho riềng",
    "Gà rang gừng", "Thịt chưng mắm tép", "Chả lá lốt", "Đậu phụ tẩm hành",
    "Canh sườn nấu sấu", "Canh cá nấu dọc", "Canh bóng thả", "Rau muống xào tỏi",
    "Cải làn xào bò", "Su hào xào trứng", "Nộm đu đủ bò khô", "Nộm sứa",
    "Xôi khúc", "Xôi gấc", "Bánh gai", "Bánh chưng", "Bánh dày đậu xanh",
    "Bánh tro mật mía", "Chè kho", "Tào phớ",
  ],
  "Miền Trung": [
    "Bún nghệ Huế", "Bún hến", "Bánh ép Huế", "Bánh nậm", "Bánh ít lá gai",
    "Cơm âm phủ", "Vả trộn tôm thịt", "Tôm chua Huế", "Cá bống thệ kho tiêu",
    "Canh mít non nấu tôm", "Bún giấm nuốc", "Bánh canh Nam Phổ", "Chè hạt sen Huế",
    "Cơm gà Hội An", "Hoành thánh Hội An", "Bánh mì Hội An", "Bê thui Cầu Mống",
    "Gỏi cá Nam Ô", "Bún chả cá Đà Nẵng", "Bánh tráng đập", "Mít trộn",
    "Don Quảng Ngãi", "Cá bống sông Trà kho", "Ram bắp Quảng Ngãi",
    "Bánh hỏi lòng heo", "Bún sứa Nha Trang", "Nem nướng Nha Trang",
    "Bánh căn Nha Trang", "Gỏi cá mai", "Gà nướng muối ớt",
    "Thịt heo ngâm nước mắm", "Chè đậu ván", "Chè bột lọc heo quay",
  ],
  "Miền Nam": [
    "Hủ tiếu Mỹ Tho", "Hủ tiếu Sa Đéc", "Bún kèn Phú Quốc", "Bún quậy Phú Quốc",
    "Bánh tằm bì", "Bánh cống Sóc Trăng", "Bánh pía Sóc Trăng", "Bánh bò thốt nốt",
    "Bánh lá mơ", "Bánh đúc lá dứa", "Cơm cháy kho quẹt", "Kho quẹt rau củ",
    "Cá lóc nướng trui", "Cá tai tượng chiên xù", "Gà hấp lá chanh", "Vịt nấu chao",
    "Bò kho Nam Bộ", "Phá lấu bò", "Bò né", "Hủ tiếu bò kho", "Bún thịt nướng",
    "Bì cuốn", "Gỏi ngó sen tôm thịt", "Gỏi xoài khô cá lóc",
    "Canh khổ qua nhồi thịt", "Canh bầu nấu tôm", "Lẩu cá kèo", "Lẩu gà lá giang",
    "Chè chuối", "Chè đậu trắng", "Chè khoai môn", "Bánh da lợn", "Chuối nếp nướng",
  ],
};

const selectedRecipeSeeds: Array<{ seed: RegionSeed; baseName: string }> = [
  ...regionSeeds.slice(0, 3).flatMap((seed) =>
    seed.names.map((baseName) => ({ seed, baseName })),
  ),
  ...regionSeeds.slice(0, 3).flatMap((seed) =>
    additionalVietnameseNames[
      seed.region as Extract<RegionKey, "Miền Bắc" | "Miền Trung" | "Miền Nam">
    ].map((baseName) => ({ seed, baseName })),
  ),
  ...regionSeeds.slice(3).flatMap((seed, worldIndex) =>
    seed.names
      .filter((baseName) => baseName !== "Cơm chiên Dương Châu")
      .slice(0, worldIndex === 6 ? 12 : 13)
      .map((baseName) => ({ seed, baseName })),
  ),
];

const coreRecipes: Recipe[] = selectedRecipeSeeds.map(
  ({ seed, baseName }, index) => ({
    ...createRecipe(
      seed,
      baseName,
      regionSeeds.findIndex((item) => item.region === seed.region),
      index,
      "Nguyên bản",
      0,
    ),
    id: index + 1,
  }),
);

type CanteenMethod = "Kho" | "Rim" | "Xào" | "Chiên" | "Nướng" | "Sốt" | "Hấp" | "Luộc" | "Cà ri";

type CanteenDishSeed = {
  name: string;
  region: Extract<RegionKey, "Miền Bắc" | "Miền Trung" | "Miền Nam">;
  category: string;
  method: CanteenMethod;
  main: string;
  amount?: number;
};

const canteenDishSeeds: CanteenDishSeed[] = [
  { name: "Cơm sườn nướng", region: "Miền Nam", category: "Thịt heo", method: "Nướng", main: "sườn cốt lết" },
  { name: "Cơm gà kho gừng", region: "Miền Bắc", category: "Thịt gà", method: "Kho", main: "đùi gà chặt miếng" },
  { name: "Cơm thịt kho trứng", region: "Miền Nam", category: "Thịt heo", method: "Kho", main: "thịt ba chỉ và trứng", amount: 700 },
  { name: "Cơm cá basa kho tộ", region: "Miền Nam", category: "Cá", method: "Kho", main: "cá basa cắt khoanh" },
  { name: "Cơm cá thu sốt cà", region: "Miền Trung", category: "Cá", method: "Sốt", main: "cá thu cắt lát" },
  { name: "Cơm bò xào hành cần", region: "Miền Bắc", category: "Thịt bò", method: "Xào", main: "thịt bò thái mỏng" },
  { name: "Cơm gà chiên nước mắm", region: "Miền Nam", category: "Thịt gà", method: "Chiên", main: "đùi gà rút xương" },
  { name: "Cơm sườn ram mặn", region: "Miền Trung", category: "Thịt heo", method: "Rim", main: "sườn non" },
  { name: "Cơm thịt rang cháy cạnh", region: "Miền Bắc", category: "Thịt heo", method: "Rim", main: "thịt ba chỉ thái mỏng" },
  { name: "Cơm cá nục kho cà", region: "Miền Trung", category: "Cá", method: "Kho", main: "cá nục làm sạch" },
  { name: "Cơm gà xào sả ớt", region: "Miền Trung", category: "Thịt gà", method: "Xào", main: "thịt gà cắt miếng" },
  { name: "Cơm thịt luộc mắm nêm", region: "Miền Trung", category: "Thịt heo", method: "Luộc", main: "thịt ba chỉ nguyên miếng" },
  { name: "Cơm đậu hũ sốt cà", region: "Miền Bắc", category: "Món chay", method: "Sốt", main: "đậu hũ cắt miếng" },
  { name: "Cơm trứng chiên thịt băm", region: "Miền Bắc", category: "Trứng", method: "Chiên", main: "trứng và thịt heo băm", amount: 550 },
  { name: "Cơm chả trứng hấp", region: "Miền Nam", category: "Trứng", method: "Hấp", main: "trứng, thịt băm và miến", amount: 600 },
  { name: "Cơm thịt viên sốt cà", region: "Miền Bắc", category: "Thịt heo", method: "Sốt", main: "thịt heo xay" },
  { name: "Cơm cá rô phi chiên sả", region: "Miền Trung", category: "Cá", method: "Chiên", main: "cá rô phi phi lê" },
  { name: "Cơm mực xào chua ngọt", region: "Miền Nam", category: "Hải sản", method: "Xào", main: "mực tươi làm sạch" },
  { name: "Cơm tôm rim mặn ngọt", region: "Miền Nam", category: "Hải sản", method: "Rim", main: "tôm tươi bỏ chỉ lưng" },
  { name: "Cơm bò lúc lắc", region: "Miền Nam", category: "Thịt bò", method: "Xào", main: "thịt bò cắt khối" },
  { name: "Cơm gà rô ti", region: "Miền Nam", category: "Thịt gà", method: "Rim", main: "đùi gà" },
  { name: "Cơm sườn xào chua ngọt", region: "Miền Bắc", category: "Thịt heo", method: "Xào", main: "sườn non chặt miếng" },
  { name: "Cơm heo quay kho cải chua", region: "Miền Nam", category: "Thịt heo", method: "Kho", main: "heo quay và cải chua", amount: 700 },
  { name: "Cơm cá kèo kho rau răm", region: "Miền Nam", category: "Cá", method: "Kho", main: "cá kèo làm sạch" },
  { name: "Cơm lươn xào sả ớt", region: "Miền Trung", category: "Cá", method: "Xào", main: "lươn làm sạch" },
  { name: "Cơm cá lóc nấu canh chua", region: "Miền Nam", category: "Cá", method: "Sốt", main: "cá lóc cắt khoanh" },
  { name: "Cơm cá bống kho tiêu", region: "Miền Trung", category: "Cá", method: "Kho", main: "cá bống làm sạch" },
  { name: "Cơm thịt kho mắm ruốc", region: "Miền Trung", category: "Thịt heo", method: "Kho", main: "thịt ba chỉ cắt nhỏ" },
  { name: "Cơm gà nướng mật ong", region: "Miền Bắc", category: "Thịt gà", method: "Nướng", main: "đùi gà rút xương" },
  { name: "Cơm gà xé trộn rau răm", region: "Miền Trung", category: "Thịt gà", method: "Luộc", main: "ức và đùi gà" },
  { name: "Cơm chả cá sốt cà", region: "Miền Trung", category: "Cá", method: "Sốt", main: "chả cá miếng" },
  { name: "Cơm cá diêu hồng chiên", region: "Miền Nam", category: "Cá", method: "Chiên", main: "cá diêu hồng làm sạch" },
  { name: "Cơm thịt ba chỉ nướng", region: "Miền Bắc", category: "Thịt heo", method: "Nướng", main: "thịt ba chỉ thái bản" },
  { name: "Cơm thịt băm xào đậu que", region: "Miền Bắc", category: "Thịt heo", method: "Xào", main: "thịt heo băm và đậu que", amount: 650 },
  { name: "Cơm gan heo xào hành", region: "Miền Bắc", category: "Thịt heo", method: "Xào", main: "gan heo thái lát" },
  { name: "Cơm trứng kho thịt", region: "Miền Nam", category: "Trứng", method: "Kho", main: "trứng và thịt nạc vai", amount: 650 },
  { name: "Cơm đậu hũ kho nấm", region: "Miền Nam", category: "Món chay", method: "Kho", main: "đậu hũ và nấm", amount: 600 },
  { name: "Cơm nấm kho tiêu", region: "Miền Nam", category: "Món chay", method: "Kho", main: "nấm đùi gà và nấm rơm" },
  { name: "Cơm cà ri gà", region: "Miền Nam", category: "Thịt gà", method: "Cà ri", main: "thịt gà chặt miếng" },
  { name: "Cơm bò kho", region: "Miền Nam", category: "Thịt bò", method: "Kho", main: "nạm bò cắt khối" },
  { name: "Cơm gà xối mỡ", region: "Miền Nam", category: "Thịt gà", method: "Chiên", main: "đùi gà" },
  { name: "Cơm sườn bì chả", region: "Miền Nam", category: "Suất đặc biệt", method: "Nướng", main: "sườn cốt lết, bì và chả trứng", amount: 750 },
  { name: "Cơm tấm sườn trứng", region: "Miền Nam", category: "Suất đặc biệt", method: "Nướng", main: "sườn cốt lết và trứng", amount: 700 },
  { name: "Cơm chiên Dương Châu", region: "Miền Nam", category: "Cơm chiên", method: "Xào", main: "trứng, tôm và thịt xá xíu", amount: 600 },
  { name: "Cơm chiên cá mặn", region: "Miền Nam", category: "Cơm chiên", method: "Xào", main: "cá mặn, trứng và thịt gà", amount: 550 },
  { name: "Cơm gà áp chảo tiêu đen", region: "Miền Bắc", category: "Cơm văn phòng", method: "Chiên", main: "ức gà cắt miếng" },
  { name: "Cơm cá hồi áp chảo", region: "Miền Bắc", category: "Cơm văn phòng", method: "Chiên", main: "cá hồi phi lê" },
  { name: "Cơm bò sốt nấm", region: "Miền Bắc", category: "Cơm văn phòng", method: "Sốt", main: "thịt bò và nấm", amount: 650 },
  { name: "Cơm gà sốt cam", region: "Miền Bắc", category: "Cơm văn phòng", method: "Sốt", main: "ức gà cắt miếng" },
  { name: "Cơm đậu hũ non sốt nấm", region: "Miền Bắc", category: "Cơm văn phòng", method: "Sốt", main: "đậu hũ non và nấm", amount: 600 },
];

const canteenMethodIngredients = (method: CanteenMethod): Ingredient[] => {
  const shared = [
    ingredient(25, "ml", "dầu ăn", "Gia vị"),
    ingredient(20, "g", "hành tím", "Gia vị", "băm"),
    ingredient(12, "g", "tỏi", "Gia vị", "băm"),
  ];
  const byMethod: Record<CanteenMethod, Ingredient[]> = {
    Kho: [ingredient(250, "ml", "nước dừa tươi", "Phần chính"), ingredient(30, "ml", "nước mắm", "Gia vị"), ingredient(15, "g", "đường", "Gia vị"), ingredient(2, "g", "tiêu", "Gia vị")],
    Rim: [ingredient(35, "ml", "nước mắm", "Gia vị"), ingredient(20, "g", "đường", "Gia vị"), ingredient(80, "ml", "nước", "Phần chính"), ingredient(2, "g", "tiêu", "Gia vị")],
    Xào: [ingredient(250, "g", "rau củ dùng để xào", "Phần chính", "cắt đều"), ingredient(20, "ml", "nước tương", "Gia vị"), ingredient(10, "ml", "nước mắm", "Gia vị")],
    Chiên: [ingredient(60, "ml", "dầu chiên", "Gia vị"), ingredient(20, "ml", "nước mắm", "Gia vị"), ingredient(10, "g", "đường", "Gia vị")],
    Nướng: [ingredient(25, "ml", "nước mắm", "Gia vị"), ingredient(20, "g", "mật ong", "Gia vị"), ingredient(10, "ml", "nước tương", "Gia vị"), ingredient(2, "g", "tiêu", "Gia vị")],
    Sốt: [ingredient(280, "g", "cà chua", "Phần chính", "băm nhỏ"), ingredient(20, "ml", "nước mắm", "Gia vị"), ingredient(10, "g", "đường", "Gia vị")],
    Hấp: [ingredient(20, "g", "gừng", "Gia vị", "thái sợi"), ingredient(30, "g", "hành lá", "Ăn kèm", "thái nhỏ"), ingredient(15, "ml", "nước tương", "Gia vị")],
    Luộc: [ingredient(25, "g", "gừng", "Gia vị", "đập dập"), ingredient(20, "ml", "nước mắm", "Gia vị"), ingredient(1, "quả", "chanh", "Ăn kèm")],
    "Cà ri": [ingredient(250, "ml", "nước cốt dừa", "Phần chính"), ingredient(250, "g", "khoai tây và cà rốt", "Phần chính", "cắt khối"), ingredient(18, "g", "bột cà ri", "Gia vị")],
  };
  return [...shared, ...byMethod[method]];
};

const canteenCookingStep = (dish: CanteenDishSeed): RecipeStep => {
  const instructions: Record<CanteenMethod, string> = {
    Kho: `Cho ${dish.main} vào nồi cùng nước kho đã định lượng; đun sôi rồi hạ nhỏ lửa đến khi chín và sốt bám nhẹ.`,
    Rim: `Đảo săn ${dish.main}, thêm hỗn hợp nước rim và đun lửa vừa–nhỏ; trở đều đến khi sốt áo quanh nguyên liệu.`,
    Xào: `Làm chảo thật nóng, xào ${dish.main} theo mẻ nhỏ; cho rau củ vào sau để giữ độ giòn rồi trộn lại.`,
    Chiên: `Làm nóng dầu ổn định, chiên hoặc áp chảo ${dish.main} theo mẻ đến vàng và chín hoàn toàn; để ráo trên giá.`,
    Nướng: `Làm nóng lò hoặc chảo nướng, nướng ${dish.main} đến vàng hai mặt và chín; quét sốt mỏng ở cuối để không cháy.`,
    Sốt: `Áp chảo ${dish.main} vừa chín, nấu sốt cà đến sánh rồi cho phần chính vào đảo nhẹ để phủ đều.`,
    Hấp: `Cho ${dish.main} vào dụng cụ hấp đã nóng, hấp đến chín hoàn toàn rồi thêm hành và gừng ở cuối.`,
    Luộc: `Cho ${dish.main} vào nước vừa sôi cùng gừng, hạ lửa và luộc đến chín; vớt ra để nghỉ trước khi cắt.`,
    "Cà ri": `Xào thơm bột cà ri, cho ${dish.main} vào đảo săn; thêm nước cốt dừa và rau củ, nấu nhỏ lửa đến mềm.`,
  };
  const temperatures: Partial<Record<CanteenMethod, string>> = {
    Chiên: "170–175°C",
    Nướng: "190–200°C",
    Hấp: "Hơi nước mạnh",
  };
  return step("Nấu món chính", instructions[dish.method], "15–30 phút", temperatures[dish.method]);
};

const createCanteenRecipe = (dish: CanteenDishSeed, index: number): Recipe => {
  const regionIndex = regionSeeds.findIndex((seed) => seed.region === dish.region);
  const regionSeed = regionSeeds[regionIndex];
  const ingredients = dedupeIngredients([
    ingredient(360, "g", "gạo", "Phần chính", "vo nhẹ, để ráo"),
    ingredient(dish.amount ?? 600, "g", dish.main, "Phần chính"),
    ingredient(300, "g", "rau xanh theo mùa", "Ăn kèm", "rửa sạch"),
    ingredient(500, "ml", "canh rau trong ngày", "Ăn kèm"),
    ...canteenMethodIngredients(dish.method),
    ingredient(8, "g", "muối", "Gia vị"),
  ]);
  const steps = [
    step(`Chuẩn bị suất ${dish.name}`, `Cân nguyên liệu cho 4 suất ${dish.name}; để riêng ${dish.main}, rau và thực phẩm ăn ngay.`, "12 phút"),
    step(`Nấu cơm cho ${dish.name}`, "Nấu gạo với lượng nước phù hợp; khi chín ủ kín 10 phút rồi xới tơi để chia suất đồng đều.", "25 phút"),
    step(`Sơ chế ${dish.main}`, `Làm sạch và cắt ${dish.main} đồng đều; thấm khô trước khi ướp để gia vị bám tốt.`, "10 phút"),
    step(`Ướp ${dish.name} theo mẻ`, "Trộn phần chính với một nửa gia vị, để thấm trong ngăn mát; giữ phần sốt còn lại cho lúc nấu.", "15 phút"),
    canteenCookingStep(dish),
    step(`Chuẩn bị rau và canh cho ${dish.name}`, "Luộc hoặc xào rau vừa chín; nấu canh trong ngày và giữ riêng từng món để không lẫn mùi.", "12 phút"),
    step(`Chia suất ${dish.name}`, "Chia cơm, món chính, rau và canh theo định lượng; phục vụ nóng hoặc đóng hộp ngay sau khi hoàn thiện.", "5 phút"),
  ];
  const totalCook = dish.method === "Kho" || dish.method === "Cà ri" ? 45 : 30;

  return {
    id: coreRecipes.length + index + 1,
    name: dish.name,
    baseName: dish.name,
    region: dish.region,
    continent: "Việt Nam",
    origin: `${regionSeed.origin} · Cơm quán`,
    description: `${dish.name} được chuẩn hóa thành suất cơm 4 người với món chính, rau và canh; phù hợp bếp gia đình, quán cơm bình dân hoặc cơm văn phòng.`,
    time: 27 + totalCook + 5,
    prepTime: 27,
    cookTime: totalCook,
    restTime: 5,
    difficulty: "Vừa",
    servings: 4,
    image: null,
    tags: ["Cơm quán", "Cơm bình dân", "Cơm văn phòng", dish.category, dish.method],
    ingredients,
    steps,
    equipment: ["Nồi cơm điện hoặc nồi cơm công nghiệp", "Chảo hoặc nồi đáy dày", "Cân bếp", "Khay chia suất", "Dao và thớt riêng cho thực phẩm sống"],
    allergens: allergensFor(ingredients),
    tips: [
      "Cân thử 5 suất đầu tiên và ghi lại định lượng thực tế để bếp giữ chất lượng ổn định trong giờ cao điểm.",
      "Nấu theo mẻ vừa đủ cho từng ca; không trộn mẻ mới với món đã giữ nóng lâu.",
      "Rau, canh và món chính nên có dụng cụ chia riêng để kiểm soát khẩu phần.",
    ],
    substitutions: [
      "Có thể đổi rau và canh theo mùa nhưng giữ nguyên định lượng mỗi suất.",
      "Nếu thay phần đạm, cần tính lại giá vốn và thời gian làm chín trước khi đưa vào bán.",
    ],
    storage: "Món nấu xong nên phục vụ theo từng ca. Phần cần bảo quản phải làm nguội nhanh, đậy kín, ghi thời gian và hâm nóng kỹ một lần trước khi dùng.",
    doneness: includesAny(dish.name, ["gà"])
      ? "Phần thịt dày nhất đạt ít nhất 74°C; cơm chín tơi và rau còn màu tự nhiên."
      : includesAny(dish.name, ["cá", "tôm", "mực", "lươn"])
        ? "Hải sản chín đục, săn vừa; cơm chín tơi và món chính không bị khô."
        : "Món chính chín đều, sốt bám vừa; cơm tơi, rau vừa chín và các phần được chia đồng đều.",
    safety: safetyFor(dish.name),
    variation: "Suất cơm quán",
    sourceNote: "Định lượng dành cho 4 suất mẫu. Khi kinh doanh, cần nấu thử, cân lại hao hụt thực tế và tuân thủ yêu cầu an toàn thực phẩm tại địa phương.",
    editorialStatus: "Đã chuẩn hóa theo suất",
    contentVersion: "2026.07",
    imageStatus: "Minh họa theo nhóm món",
    verificationStatus: "Đã chuẩn hóa vận hành",
    reviewedAt: "2026-07-31",
    reviewedBy: "Ban biên tập Ăn gì hôm nay",
    verificationNotes: "Đã chuẩn hóa định lượng mẫu 4 suất, quy trình theo mẻ và lưu ý chia suất; cần nấu thử tại bếp thực tế trước khi kinh doanh.",
  };
};

export const canteenRecipes: Recipe[] = canteenDishSeeds.map(createCanteenRecipe);
export const recipes: Recipe[] = [...coreRecipes, ...canteenRecipes];

const duplicateNames = recipes.filter(
  (recipe, index) =>
    recipes.findIndex(
      (item) => lower(item.name).trim() === lower(recipe.name).trim(),
    ) !== index,
);

const recipeFingerprint = (recipe: Recipe) =>
  JSON.stringify({
    ingredients: recipe.ingredients.map((item) => [
      item.amount,
      item.unit,
      lower(item.item),
      item.prep ?? "",
      item.group,
    ]),
    steps: recipe.steps.map((item) => [
      lower(item.title),
      lower(item.instruction),
      item.duration ?? "",
      item.temperature ?? "",
    ]),
  });

const recipeFingerprints = new Set<string>();
const duplicateContent = recipes.filter((recipe) => {
  const fingerprint = recipeFingerprint(recipe);
  if (recipeFingerprints.has(fingerprint)) return true;
  recipeFingerprints.add(fingerprint);
  return false;
});

const mismatchedImages = recipes.filter(
  (recipe) =>
    recipe.image !== null &&
    exactRecipeImages[recipe.baseName] !== recipe.image,
);

const invalidRecipes = recipes.filter(
  (recipe) =>
    recipe.ingredients.length < 8 ||
    recipe.steps.length < 6 ||
    !recipe.editorialStatus ||
    !recipe.contentVersion ||
    !recipe.verificationStatus ||
    !recipe.verificationNotes ||
    recipe.ingredients.some((item) =>
      /nguyên liệu chính cho|vừa đủ| hoặc |nước dùng không muối|rau theo món|gia vị nền riêng|đậu hũ hoặc nấm|rau củ điểm vị|phần nhân hoặc topping|nguyên liệu tạo hương|gia vị hoàn thiện|đúng món|theo món|đã gọi tên|đúng vùng|nền đúng loại/i.test(item.item),
    ),
);

if (
  recipes.length !== 300 ||
  canteenRecipes.length !== 50 ||
  duplicateNames.length > 0 ||
  duplicateContent.length > 0 ||
  mismatchedImages.length > 0 ||
  invalidRecipes.length > 0
) {
  throw new Error(
    `Dữ liệu không đạt chuẩn: ${recipes.length} món, ${duplicateNames.length} tên trùng, ${duplicateContent.length} công thức trùng, ${mismatchedImages.length} ảnh sai, ${invalidRecipes.length} mục thiếu chi tiết.`,
  );
}

export const recipeQualityReport = {
  total: recipes.length,
  vietnamese: recipes.filter((recipe) => recipe.continent === "Việt Nam").length,
  world: recipes.filter((recipe) => recipe.continent !== "Việt Nam").length,
  exactImages: recipes.filter((recipe) => recipe.imageStatus === "Ảnh đúng món").length,
  illustratedImages: recipes.filter(
    (recipe) => recipe.imageStatus === "Minh họa theo nhóm món",
  ).length,
  verified: recipes.filter(
    (recipe) => recipe.verificationStatus === "Đã kiểm chứng nội bộ",
  ).length,
  standardized: recipes.filter(
    (recipe) => recipe.verificationStatus === "Đã chuẩn hóa vận hành",
  ).length,
  pending: recipes.filter(
    (recipe) => recipe.verificationStatus === "Chờ kiểm chứng",
  ).length,
  duplicateNames: duplicateNames.length,
  duplicateContent: duplicateContent.length,
  mismatchedImages: mismatchedImages.length,
  invalidRecipes: invalidRecipes.length,
};

export const regions: Array<{
  key: "Tất cả" | RegionKey;
  eyebrow: string;
  description: string;
}> = [
  { key: "Tất cả", eyebrow: "300 công thức", description: "Ưu tiên tinh hoa món Việt" },
  { key: "Miền Bắc", eyebrow: "70 món", description: "Thanh nhã, tinh tế" },
  { key: "Miền Trung", eyebrow: "64 món", description: "Đậm đà, cay thơm" },
  { key: "Miền Nam", eyebrow: "76 món", description: "Hào sảng, phong phú" },
  { key: "Đông Á", eyebrow: "13 món", description: "Umami cân bằng" },
  { key: "Đông Nam Á", eyebrow: "13 món", description: "Rực rỡ thảo mộc" },
  { key: "Nam Á", eyebrow: "13 món", description: "Ấm nồng gia vị" },
  { key: "Châu Âu", eyebrow: "13 món", description: "Cổ điển thanh lịch" },
  { key: "Châu Mỹ", eyebrow: "13 món", description: "Phóng khoáng đa sắc" },
  { key: "Châu Phi", eyebrow: "13 món", description: "Ấm áp, giàu hương" },
  { key: "Châu Đại Dương", eyebrow: "12 món", description: "Tươi sáng tự nhiên" },
];

export const featuredRecipeIds = [
  "Phở bò Hà Nội",
  "Bún bò Huế",
  "Bánh xèo miền Tây",
  "Bún chả Hà Nội",
  "Mì Quảng",
  "Cơm tấm sườn bì",
]
  .map((name) => recipes.find((recipe) => recipe.name === name)?.id)
  .filter((id): id is number => typeof id === "number");
