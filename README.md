# Ăn gì hôm nay

Webapp hướng dẫn nấu 300 món ăn chọn lọc, thiết kế theo tinh thần **Vietnamese Heritage Luxury**.

## Tính năng

- Kho dữ liệu đúng 300 công thức có tên duy nhất, gồm 210 món Việt Nam và 90 món thế giới
- Bộ sưu tập riêng 50 món cơm bình dân và cơm văn phòng theo định lượng suất
- 4 thực đơn gia đình theo tuần, mỗi tuần đủ 7 ngày
- Trình lập kế hoạch tương tác cho 7 ngày, có thể chọn món và điều chỉnh 1–20 khẩu phần
- Tự động cộng dồn nguyên liệu trùng thành danh sách đi chợ theo ba nhóm
- Đánh dấu nguyên liệu đã có/đã mua, sao chép và in danh sách đi chợ
- Kế hoạch tuần và trạng thái mua sắm được lưu cục bộ trên thiết bị
- Thêm món trực tiếp vào một ngày trong tuần từ cửa sổ công thức
- Trạng thái biên tập và kiểm chứng tách biệt, có người/ngày rà soát và ghi chú phạm vi kiểm chứng
- CMS tại `/quan-tri` để sửa toàn bộ trường của 300 món: nguyên liệu, bước nấu, ảnh, an toàn, bảo quản và nguồn
- CMS có lưu nháp, xuất bản trên thiết bị, khôi phục dữ liệu gốc và nhập/xuất JSON
- Thư viện ảnh phân biệt rõ ảnh đúng món với minh họa theo nhóm món
- Lộ trình khởi nghiệp quán cơm và máy tính doanh thu, giá vốn, lợi nhuận, điểm hòa vốn
- Tìm kiếm toàn văn theo tên, mô tả, vùng, nguyên liệu và các bước nấu
- Bộ lọc nâng cao theo khu vực, độ khó, thời gian, trạng thái kiểm chứng, trạng thái ảnh và dị ứng
- Lọc theo 10 khu vực ẩm thực
- Gợi ý món ngẫu nhiên cho hôm nay
- Lưu món yêu thích trên thiết bị
- Hướng dẫn nguyên liệu và tối thiểu 6 bước nấu có thể đánh dấu hoàn thành
- Định lượng công thức theo 1–12 khẩu phần và kế hoạch tuần theo 1–20 người
- Thời gian sơ chế, nấu, nghỉ; nhiệt độ và dấu hiệu chín
- Cảnh báo dị ứng, an toàn thực phẩm, bảo quản và thay thế nguyên liệu
- Kiểm tra tự động: đúng 300 công thức, không trùng tên, không trùng nội dung và không gắn sai ảnh
- Giao diện responsive cho máy tính, máy tính bảng và điện thoại
- Hỗ trợ bàn phím, focus state và chế độ giảm chuyển động

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

CMS biên tập mở tại `http://localhost:3000/quan-tri`.

## Quy trình CMS

1. Tìm món theo tên, vùng, nguyên liệu hoặc trạng thái kiểm chứng.
2. Sửa hồ sơ và chọn **Lưu nháp**.
3. Xử lý toàn bộ cảnh báo chất lượng rồi chọn **Xuất bản**.
4. Mở trang công khai trên cùng trình duyệt để xem dữ liệu đã xuất bản.
5. Dùng **Xuất dữ liệu** để tạo tệp JSON bàn giao hoặc nhập vào hệ quản trị trung tâm.

CMS hiện dùng `localStorage`, phù hợp cho biên tập thử nghiệm và bàn giao dữ liệu mà không cần cấu hình máy chủ. Để nhiều biên tập viên cùng làm việc và xuất bản cho mọi người dùng, giai đoạn tiếp theo cần kết nối xác thực và cơ sở dữ liệu trung tâm.

## Triển khai Vercel

1. Đưa mã nguồn lên GitHub.
2. Chọn **Add New → Project** trong Vercel.
3. Import repository và bấm **Deploy**.

Tệp `vercel.json` đã cấu hình Vercel dùng quy trình build Next.js tiêu chuẩn.

## Nguyên tắc biên soạn công thức

- Công thức được viết lại nguyên bản, không sao chép nội dung từ nguồn khác.
- Các món tiêu biểu có hồ sơ riêng về định lượng và kỹ thuật.
- Các biến thể dùng chung nền tảng truyền thống nhưng điều chỉnh rõ lượng cay, ngọt, rau hoặc phương pháp làm chín.
- Nhiệt độ chín an toàn tham chiếu FoodSafety.gov; nhóm dị ứng tham chiếu FDA.
- Không sử dụng đồ uống có cồn trong danh sách nguyên liệu.

## Công nghệ

Next.js 16, React 19, TypeScript và CSS thuần. Bản hiện tại không cần cơ sở dữ liệu hay biến môi trường; kế hoạch tuần, danh sách mua sắm và dữ liệu CMS thử nghiệm được lưu bằng `localStorage`.
