# KhanhNN Insights - Blog Công nghệ với Next.js, Firebase và Genkit AI

Đây là một dự án blog kỹ thuật được xây dựng bằng Next.js, được thiết kế để trở thành một nền tảng chia sẻ kiến thức chuyên sâu về các chủ đề công nghệ. Dự án được tích hợp các tính năng quản trị mạnh mẽ và được hỗ trợ bởi AI để tự động hóa việc tạo nội dung.

## Các công nghệ chính

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Cơ sở dữ liệu & Xác thực:** [Firebase](https://firebase.google.com/) (Firestore & Authentication)
- **Tích hợp AI:** [Google Genkit](https://firebase.google.com/docs/genkit)
- **Ngôn ngữ:** TypeScript

## Tính năng nổi bật

- **Giao diện đáp ứng (Responsive):** Tối ưu hiển thị trên cả máy tính và thiết bị di động.
- **Quản lý nội dung (CRUD):** Quản trị viên có thể tạo, đọc, cập nhật và xóa bài viết.
- **Xác thực người dùng:** Đăng nhập an toàn bằng tài khoản Google thông qua Firebase Authentication.
- **Phân quyền quản trị:** Chỉ định quyền admin cho một email cụ thể để truy cập các tính năng quản trị.
- **Soạn bài với AI:**
    - Tự động tạo ra nhiều bài viết dựa trên một chủ đề và số lượng cho trước.
    - Giao diện cho phép admin xem trước, lựa chọn và đăng hàng loạt các bài viết do AI tạo ra.
- **Tóm tắt bài viết bằng AI:** Người dùng có thể yêu cầu AI tóm tắt nội dung của bất kỳ bài viết nào.
- **Tìm kiếm:** Chức năng tìm kiếm bài viết theo từ khóa trong tiêu đề và nội dung.
- **Phân loại bài viết:** Các bài viết được tổ chức theo chuyên mục (Hệ thống, Bảo mật, Mạng, Cloud).
- **Trang quản trị tập trung:**
    - Thống kê số lượng bài viết.
    - Giao diện bảng để quản lý tất cả bài viết.
    - Chức năng sửa/xóa bài viết trực quan.

## Hướng dẫn cài đặt và khởi chạy

### Yêu cầu
- [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên)
- Một tài khoản [Firebase](https://firebase.google.com/)

### 1. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 2. Thiết lập Firebase

1.  **Tạo dự án Firebase:** Truy cập [Firebase Console](https://console.firebase.google.com/) và tạo một dự án mới.
2.  **Thêm ứng dụng Web:** Trong trang tổng quan dự án, thêm một ứng dụng web mới và sao chép thông tin cấu hình (Firebase config).
3.  **Bật Authentication:** Vào mục **Build > Authentication**, chọn tab "Sign-in method" và bật **Google** làm nhà cung cấp.
4.  **Bật Firestore:** Vào mục **Build > Firestore Database** và tạo một cơ sở dữ liệu mới. Bắt đầu ở chế độ sản xuất (production mode).

### 3. Thiết lập biến môi trường

Tạo một tệp có tên `.env` ở thư mục gốc của dự án và dán thông tin cấu hình Firebase của bạn vào đó:

```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"

# (Optional) For Genkit AI features
# GEMINI_API_KEY="your-google-ai-studio-api-key"
```

### 4. Cấu hình quy tắc bảo mật Firestore

Để ứng dụng có thể đọc và ghi dữ liệu, bạn cần cập nhật Security Rules.

1.  Trong Firestore Database, nhấp vào tab **Rules**.
2.  Thay thế nội dung mặc định bằng các quy tắc sau và nhấn **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cho phép mọi người đọc bài viết và thông tin người dùng
    match /articles/{articleId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'khanhnnvn@gmail.com';
    }
    match /users/{userId} {
      allow read: if true;
      // Chỉ người dùng đã xác thực mới được tạo/cập nhật thông tin của chính họ
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
**Lưu ý:** Quy tắc `write` cho `articles` được gán cứng cho email admin. Hãy thay `'khanhnnvn@gmail.com'` bằng email quản trị viên của bạn.

### 5. Nhập dữ liệu mẫu (Tùy chọn)

Để có dữ liệu ban đầu, bạn có thể nhập tệp `articles.json` vào Firestore.
1.  Đi đến trang **Firestore Database**.
2.  Nhấp vào biểu tượng ba chấm (⋮) ở đầu trang dữ liệu và chọn **Import data**.
3.  Chọn tệp `articles.json` từ thư mục gốc của dự án.
4.  Nhấp **Import**.

### 6. Chạy ứng dụng

#### Chế độ phát triển
Chạy máy chủ phát triển trên cổng 3001:

```bash
npm run dev
```

Mở [http://localhost:3001](http://localhost:3001) trên trình duyệt của bạn để xem kết quả.

#### Chế độ Production với PM2

Để triển khai ứng dụng trong môi trường production trên máy chủ Ubuntu, bạn nên sử dụng `pm2` để quản lý tiến trình.

1.  **Cài đặt pm2 trên toàn cục:**
    ```bash
    npm install pm2 -g
    ```
2.  **Sử dụng script để build và khởi động:**
    Tệp `start-prod.sh` đã được tạo sẵn để tự động hóa quá trình này. Đầu tiên, cấp quyền thực thi cho tệp:
    ```bash
    chmod +x start-prod.sh
    ```
    Sau đó, chạy script:
    ```bash
    ./start-prod.sh
    ```
    Script này sẽ:
    - Build ứng dụng Next.js.
    - Dừng tiến trình pm2 có tên `khanhnn-insights` nếu nó đang chạy.
    - Khởi động ứng dụng của bạn trên cổng 3001 bằng pm2.

3.  **Các lệnh pm2 hữu ích:**
    - Xem danh sách các tiến trình đang chạy: `pm2 list`
    - Xem log của ứng dụng: `pm2 logs khanhnn-insights`
    - Dừng ứng dụng: `pm2 stop khanhnn-insights`
    - Khởi động lại ứng dụng: `pm2 restart khanhnn-insights`


## Các câu lệnh có sẵn

- `npm run dev`: Chạy ứng dụng ở chế độ phát triển trên cổng 3001.
- `npm run build`: Build ứng dụng để triển khai production.
- `npm run start`: Chạy phiên bản đã build (không qua pm2).
- `npm run lint`: Chạy ESLint để kiểm tra lỗi mã nguồn.
- `npm run prod:start`: Chạy phiên bản đã build trên cổng 3001.
