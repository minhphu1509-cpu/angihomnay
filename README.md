# Ăn gì hôm nay

Webapp hướng dẫn nấu 1.000 món ăn Việt Nam và thế giới, thiết kế theo tinh thần **Vietnamese Heritage Luxury**.

## Tính năng

- Kho dữ liệu đúng 1.000 công thức thuộc 3 miền Việt Nam và 6 châu lục
- Tìm kiếm tức thời theo tên món, vùng miền và thẻ nội dung
- Lọc theo 10 khu vực ẩm thực
- Gợi ý món ngẫu nhiên cho hôm nay
- Lưu món yêu thích trên thiết bị
- Hướng dẫn nguyên liệu và 5 bước nấu có thể đánh dấu hoàn thành
- Định lượng tự động theo 1–12 khẩu phần
- Thời gian sơ chế, nấu, nghỉ; nhiệt độ và dấu hiệu chín
- Cảnh báo dị ứng, an toàn thực phẩm, bảo quản và thay thế nguyên liệu
- Kiểm tra tự động: đủ đúng 1.000 công thức, mỗi công thức có ít nhất 8 nguyên liệu và 6 bước
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
