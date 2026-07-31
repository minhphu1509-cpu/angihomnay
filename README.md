# Ăn gì hôm nay

Webapp hướng dẫn nấu 300 món ăn chọn lọc, thiết kế theo tinh thần **Vietnamese Heritage Luxury**.

## Tính năng

- Kho dữ liệu đúng 300 công thức có tên duy nhất, gồm 210 món Việt Nam và 90 món thế giới
- Bộ sưu tập riêng 50 món cơm bình dân và cơm văn phòng theo định lượng suất
- 4 thực đơn gia đình theo tuần, mỗi tuần đủ 7 ngày
- Lộ trình khởi nghiệp quán cơm và máy tính doanh thu, giá vốn, lợi nhuận, điểm hòa vốn
- Tìm kiếm tức thời theo tên món, vùng miền và thẻ nội dung
- Lọc theo 10 khu vực ẩm thực
- Gợi ý món ngẫu nhiên cho hôm nay
- Lưu món yêu thích trên thiết bị
- Hướng dẫn nguyên liệu và tối thiểu 6 bước nấu có thể đánh dấu hoàn thành
- Định lượng tự động theo 1–12 khẩu phần
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

Next.js 16, React 19, TypeScript và CSS thuần. Không cần cơ sở dữ liệu hay biến môi trường.
