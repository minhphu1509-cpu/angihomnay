export type WeeklyMenuDay = {
  day: string;
  dishes: string[];
  prepTip: string;
};

export type WeeklyMenu = {
  id: string;
  title: string;
  description: string;
  days: WeeklyMenuDay[];
};

export const weeklyMenus: WeeklyMenu[] = [
  {
    id: "truyen-thong",
    title: "Tuần 1 · Mâm cơm quen thuộc",
    description: "Các món Việt dễ ăn, nguyên liệu phổ biến và phù hợp gia đình 3–5 người.",
    days: [
      { day: "Thứ Hai", dishes: ["Thịt rang cháy cạnh", "Canh rau ngót thịt băm", "Dưa leo trộn chua ngọt"], prepTip: "Ướp thịt và nhặt rau từ tối hôm trước." },
      { day: "Thứ Ba", dishes: ["Cá basa kho tộ", "Canh bí xanh nấu tôm", "Rau muống luộc"], prepTip: "Kho cá nhiều hơn một phần để dùng bữa trưa hôm sau." },
      { day: "Thứ Tư", dishes: ["Gà kho gừng", "Canh cải xanh", "Giá hẹ xào"], prepTip: "Chặt và ướp gà trước 30 phút để thịt thấm đều." },
      { day: "Thứ Năm", dishes: ["Đậu hũ sốt cà chua", "Canh chua cá", "Rau sống"], prepTip: "Nấu sẵn sốt cà chua, khi ăn mới cho đậu hũ vào." },
      { day: "Thứ Sáu", dishes: ["Sườn rim mặn ngọt", "Canh mướp nấu mồng tơi", "Cà pháo"], prepTip: "Chần sườn trước khi rim để nước sốt trong và thơm." },
      { day: "Thứ Bảy", dishes: ["Bò xào hành cần", "Canh khoai tây cà rốt", "Trứng hấp"], prepTip: "Thái bò ngang thớ và chỉ xào sát giờ ăn." },
      { day: "Chủ Nhật", dishes: ["Cá diêu hồng chiên", "Canh cải chua", "Đậu bắp luộc"], prepTip: "Sơ chế cá thật khô để chiên an toàn và ít bắn dầu." },
    ],
  },
  {
    id: "nhanh-gon",
    title: "Tuần 2 · Nhanh gọn ngày bận rộn",
    description: "Thực đơn ưu tiên 30–40 phút, dùng chung nguyên liệu để giảm thời gian sơ chế.",
    days: [
      { day: "Thứ Hai", dishes: ["Trứng chiên thịt băm", "Canh cà chua trứng", "Cải thìa xào tỏi"], prepTip: "Băm sẵn thịt cho cả món trứng và phần cơm hộp." },
      { day: "Thứ Ba", dishes: ["Gà áp chảo tiêu đen", "Canh bí đỏ", "Salad dưa leo"], prepTip: "Ướp gà trong hộp kín từ buổi sáng." },
      { day: "Thứ Tư", dishes: ["Thịt băm xào đậu que", "Canh rong biển đậu hũ", "Cà chua"], prepTip: "Cắt đậu que đồng đều để chín cùng lúc." },
      { day: "Thứ Năm", dishes: ["Cá thu sốt cà", "Canh rau dền", "Bắp cải luộc"], prepTip: "Làm một mẻ sốt cà đủ dùng cho hai bữa." },
      { day: "Thứ Sáu", dishes: ["Đậu hũ kho nấm", "Canh bầu", "Trứng luộc"], prepTip: "Lau khô nấm trước khi áp chảo để giữ hương." },
      { day: "Thứ Bảy", dishes: ["Cơm chiên rau củ", "Gà xé trộn rau răm", "Canh cải"], prepTip: "Dùng cơm nguội bảo quản lạnh đúng cách từ hôm trước." },
      { day: "Chủ Nhật", dishes: ["Bún thịt nướng", "Đồ chua", "Rau thơm"], prepTip: "Ướp thịt và làm đồ chua trước một ngày." },
    ],
  },
  {
    id: "ba-mien",
    title: "Tuần 3 · Đổi vị ba miền",
    description: "Luân phiên vị thanh Bắc Bộ, đậm đà miền Trung và hào sảng Nam Bộ.",
    days: [
      { day: "Thứ Hai", dishes: ["Chả cá thì là", "Canh rau cải", "Cà pháo"], prepTip: "Ướp cá với nghệ và thì là trước khi áp chảo." },
      { day: "Thứ Ba", dishes: ["Thịt kho mắm ruốc", "Canh mít non", "Rau luộc"], prepTip: "Nêm mắm ruốc từng ít một vì độ mặn thay đổi theo loại." },
      { day: "Thứ Tư", dishes: ["Cá lóc kho tiêu", "Canh chua", "Giá trụng"], prepTip: "Chuẩn bị chung thơm và cà chua cho món kho lẫn canh." },
      { day: "Thứ Năm", dishes: ["Nem rán", "Canh su hào", "Nộm đu đủ"], prepTip: "Cuốn nem trước, giữ lạnh và chiên sát giờ ăn." },
      { day: "Thứ Sáu", dishes: ["Gà xào sả ớt", "Canh rau tập tàng", "Dưa leo"], prepTip: "Tách phần ớt để trẻ nhỏ hoặc người ăn ít cay tự điều chỉnh." },
      { day: "Thứ Bảy", dishes: ["Tôm rim nước dừa", "Canh khổ qua", "Rau sống"], prepTip: "Rút chỉ lưng tôm và giữ lạnh đến khi nấu." },
      { day: "Chủ Nhật", dishes: ["Bún bò Huế", "Rau sống", "Trái cây theo mùa"], prepTip: "Ninh nước dùng từ hôm trước, làm nguội nhanh rồi bảo quản lạnh." },
    ],
  },
  {
    id: "nhieu-rau",
    title: "Tuần 4 · Nhiều rau, cân bằng",
    description: "Mỗi bữa có rau, món canh và phần đạm linh hoạt; không đặt mục tiêu ăn kiêng cực đoan.",
    days: [
      { day: "Thứ Hai", dishes: ["Đậu hũ non sốt nấm", "Canh cải bó xôi", "Cà rốt luộc"], prepTip: "Chỉ cho đậu hũ vào cuối để không bị vỡ." },
      { day: "Thứ Ba", dishes: ["Cá hấp gừng", "Canh bầu nấu tôm", "Rau lang luộc"], prepTip: "Chuẩn bị gừng, hành thành một hộp gia vị dùng chung." },
      { day: "Thứ Tư", dishes: ["Gà xào nấm", "Canh củ quả", "Bắp cải trộn"], prepTip: "Xào nấm riêng ở lửa lớn rồi mới trộn với gà." },
      { day: "Thứ Năm", dishes: ["Trứng hấp rau củ", "Canh chua chay", "Đậu que luộc"], prepTip: "Cắt rau củ hạt lựu nhỏ để trứng chín đồng đều." },
      { day: "Thứ Sáu", dishes: ["Bò xào bông cải", "Canh cà chua", "Dưa leo"], prepTip: "Chần bông cải 60 giây rồi xào nhanh với bò." },
      { day: "Thứ Bảy", dishes: ["Nấm kho tiêu", "Canh bí đỏ đậu phộng", "Rau cải luộc"], prepTip: "Áp chảo nấm trước khi kho để món không ra quá nhiều nước." },
      { day: "Chủ Nhật", dishes: ["Gỏi cuốn tôm thịt", "Canh nấm", "Trái cây theo mùa"], prepTip: "Để nguyên liệu thật ráo trước khi cuốn." },
    ],
  },
];

export const startupSteps = [
  {
    number: "01",
    title: "Chọn khách hàng và mô hình",
    description: "Xác định cơm bình dân, cơm văn phòng giao theo suất hoặc mô hình kết hợp; khảo sát bán kính 1–3 km.",
    tasks: ["Ghi nhận 5–10 đối thủ", "Chọn khung giá thử nghiệm", "Ước lượng suất bán theo ca"],
  },
  {
    number: "02",
    title: "Thiết kế thực đơn tinh gọn",
    description: "Khởi đầu với 8–12 món luân phiên, dùng chung nguyên liệu nhưng khác kỹ thuật chế biến.",
    tasks: ["Chuẩn hóa định lượng một suất", "Tính giá vốn từng món", "Chọn 2 món bán chủ lực"],
  },
  {
    number: "03",
    title: "Bố trí bếp một chiều",
    description: "Tách luồng nhận hàng, sơ chế, nấu, chia suất và rửa; thực phẩm sống không đi ngược qua khu món chín.",
    tasks: ["Chia khu sống và chín", "Lập lịch vệ sinh", "Theo dõi nhiệt độ bảo quản"],
  },
  {
    number: "04",
    title: "Hoàn thiện thủ tục",
    description: "Kiểm tra hình thức đăng ký hộ kinh doanh, yêu cầu an toàn thực phẩm và quy định địa phương trước khi mở bán.",
    tasks: ["Đăng ký hộ kinh doanh", "Kiểm tra điều kiện ATTP", "Chuẩn bị chứng từ nguồn nguyên liệu"],
  },
  {
    number: "05",
    title: "Chạy thử 7–14 ngày",
    description: "Bán giới hạn để đo thời gian ra món, món dư, phản hồi và công suất bếp trước ngày khai trương.",
    tasks: ["Ghi món bán và món dư", "Đo thời gian mỗi đơn", "Điều chỉnh khẩu phần"],
  },
  {
    number: "06",
    title: "Theo dõi bằng số liệu",
    description: "Chốt doanh thu, giá vốn, chi phí cố định, tỷ lệ món hủy và khách quay lại theo ngày.",
    tasks: ["Chốt ca hằng ngày", "Kiểm kê nguyên liệu", "Rà lại điểm hòa vốn mỗi tuần"],
  },
];

export const officialBusinessLinks = [
  {
    label: "Đăng ký hộ kinh doanh",
    href: "https://dangkykinhdoanh.gov.vn/vn/Pages/Noidunghuongdan.aspx?htID=114&lhID=91",
  },
  {
    label: "Nghị định 15/2018/NĐ-CP về an toàn thực phẩm",
    href: "https://vanban.chinhphu.vn/?docid=192829&pageid=27160",
  },
  {
    label: "12 nguyên tắc an toàn cho cơ sở ăn uống",
    href: "https://vfa.gov.vn/truyen-thong/12-nguyen-tac-bao-dam-attp-doi-voi-nha-hang-an-uong-co-so-an-uong-o-khach-san-cang-tin-kinh-doanh-dich-vu-an-uong-phuc-vu-le-hoi.html",
  },
];
