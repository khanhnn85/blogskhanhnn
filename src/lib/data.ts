import type { Article, Category } from '@/types';
import { Cog, Shield, Network, Cloud } from 'lucide-react';

export const CATEGORIES: Category[] = [
  { slug: 'systems', name: 'Hệ thống', icon: Cog },
  { slug: 'security', name: 'Bảo mật', icon: Shield },
  { slug: 'networking', name: 'Mạng', icon: Network },
  { slug: 'cloud', name: 'Cloud', icon: Cloud },
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'hieu-nang-he-thong-voi-redis',
    title: 'Tối ưu hoá hiệu năng hệ thống với Redis',
    category: 'systems',
    author: 'KhanhNN',
    published_date: '2024-07-20',
    image: 'https://picsum.photos/1200/630?random=1',
    image_alt: 'Abstract network visualization',
    excerpt: 'Khám phá cách Redis, một kho lưu trữ dữ liệu trong bộ nhớ, có thể tăng tốc đáng kể ứng dụng của bạn và giảm tải cho cơ sở dữ liệu chính.',
    content: `
      <p>Redis, viết tắt của Remote Dictionary Server, là một kho lưu trữ cấu trúc dữ liệu trong bộ nhớ, mã nguồn mở, được sử dụng làm cơ sở dữ liệu, bộ đệm và trình môi giới thông điệp. Nó hỗ trợ các cấu trúc dữ liệu như chuỗi, hash, danh sách, tập hợp, tập hợp có sắp xếp với các truy vấn phạm vi, bitmap, hyperloglog, chỉ mục không gian địa lý với các truy vấn bán kính và luồng.</p>
      
      <h2>Tại sao nên sử dụng Redis?</h2>
      <p>Lý do chính khiến Redis trở nên phổ biến là hiệu suất vượt trội của nó. Vì Redis lưu trữ dữ liệu trong bộ nhớ, nó có thể đọc và ghi dữ liệu với độ trễ cực thấp. Điều này làm cho nó trở thành một lựa chọn lý tưởng cho các ứng dụng yêu cầu phản hồi nhanh, chẳng hạn như:</p>
      <ul>
        <li>Caching: Giảm tải cho cơ sở dữ liệu chính bằng cách lưu trữ các dữ liệu thường xuyên truy cập trong Redis.</li>
        <li>Session Management: Lưu trữ thông tin phiên người dùng một cách hiệu quả và có thể mở rộng.</li>
        <li>Real-time Analytics: Xử lý và phân tích dữ liệu thời gian thực cho các bảng điều khiển và hệ thống báo cáo.</li>
        <li>Queues: Xây dựng hàng đợi công việc nền đáng tin cậy.</li>
      </ul>

      <h2>Triển khai Caching với Redis</h2>
      <p>Một trong những trường hợp sử dụng phổ biến nhất của Redis là làm bộ đệm. Chiến lược caching "cache-aside" hoạt động như sau:</p>
      <ol>
        <li>Khi ứng dụng cần dữ liệu, nó trước tiên sẽ kiểm tra trong Redis.</li>
        <li>Nếu dữ liệu tồn tại (cache hit), nó sẽ được trả về ngay lập tức.</li>
        <li>Nếu dữ liệu không tồn tại (cache miss), ứng dụng sẽ truy vấn từ cơ sở dữ liệu chính, sau đó lưu trữ kết quả vào Redis trước khi trả về cho người dùng.</li>
      </ol>
      <p>Cách tiếp cận này giúp giảm đáng kể số lượng truy vấn đến cơ sở dữ liệu, cải thiện thời gian phản hồi và khả năng mở rộng của hệ thống.</p>
    `,
  },
  {
    id: '2',
    slug: 'bao-mat-ung-dung-web-voi-owasp-top-10',
    title: 'Bảo mật ứng dụng web với OWASP Top 10',
    category: 'security',
    author: 'KhanhNN',
    published_date: '2024-07-18',
    image: 'https://picsum.photos/1200/630?random=2',
    image_alt: 'Digital security shield',
    excerpt: 'Tìm hiểu về OWASP Top 10, một tài liệu nhận thức tiêu chuẩn cho các nhà phát triển và chuyên gia bảo mật ứng dụng web.',
    content: `
      <p>OWASP Top 10 là một danh sách các rủi ro bảo mật ứng dụng web phổ biến và nghiêm trọng nhất. Việc hiểu và áp dụng các biện pháp phòng chống các lỗ hổng này là bước đầu tiên quan trọng để xây dựng các ứng dụng an toàn.</p>
      
      <h2>Các rủi ro hàng đầu trong OWASP Top 10</h2>
      <p>Danh sách này được cập nhật vài năm một lần. Một số rủi ro tiêu biểu bao gồm:</p>
      <ul>
        <li><strong>A01:2021-Broken Access Control:</strong> Lỗ hổng kiểm soát truy cập cho phép kẻ tấn công truy cập vào các tài nguyên hoặc chức năng mà họ không được phép.</li>
        <li><strong>A02:2021-Cryptographic Failures:</strong> Các lỗi liên quan đến mã hóa, thường dẫn đến lộ lọt dữ liệu nhạy cảm.</li>
        <li><strong>A03:2021-Injection:</strong> Các lỗ hổng tiêm nhiễm, chẳng hạn như SQL injection, NoSQL injection và OS command injection, xảy ra khi dữ liệu không đáng tin cậy được gửi đến một trình thông dịch như một phần của lệnh hoặc truy vấn.</li>
      </ul>

      <h2>Làm thế nào để phòng chống?</h2>
      <p>Không có một giải pháp duy nhất. Bảo mật là một quá trình liên tục đòi hỏi sự kết hợp của nhiều kỹ thuật:</p>
      <blockquote>Thực hành mã hóa an toàn, xác thực đầu vào, sử dụng các framework bảo mật, và thường xuyên thực hiện đánh giá và kiểm thử thâm nhập là những yếu-tố-then-chốt.</blockquote>
      <p>Bằng cách tích hợp bảo mật vào vòng đời phát triển phần mềm (DevSecOps), các tổ chức có thể phát hiện và khắc phục các lỗ hổng sớm hơn, giảm thiểu rủi ro và chi phí.</p>
    `,
  },
  {
    id: '3',
    slug: 'gioi-thieu-mo-hinh-osi-7-lop',
    title: 'Giới thiệu mô hình OSI 7 lớp',
    category: 'networking',
    author: 'KhanhNN',
    published_date: '2024-07-15',
    image: 'https://picsum.photos/1200/630?random=3',
    image_alt: 'Network layers diagram',
    excerpt: 'Mô hình Tham chiếu Kết nối Hệ thống Mở (OSI) là một khuôn khổ khái niệm mô tả các chức năng của một hệ thống mạng hoặc viễn thông.',
    content: `
      <p>Mô hình OSI chia giao tiếp mạng thành bảy lớp trừu tượng. Mỗi lớp phục vụ lớp trên nó và được phục vụ bởi lớp dưới nó. Điều này giúp chuẩn hóa giao tiếp giữa các hệ thống máy tính đa dạng.</p>
      
      <h2>Bảy lớp của mô hình OSI</h2>
      <ol>
        <li><strong>Lớp 1 - Lớp Vật lý (Physical Layer):</strong> Chịu trách nhiệm truyền các bit dữ liệu thô qua một phương tiện vật lý (cáp, sóng vô tuyến).</li>
        <li><strong>Lớp 2 - Lớp Liên kết dữ liệu (Data Link Layer):</strong> Cung cấp truyền dữ liệu đáng tin cậy giữa hai nút được kết nối trực tiếp.</li>
        <li><strong>Lớp 3 - Lớp Mạng (Network Layer):</strong> Quản lý việc định địa chỉ và định tuyến dữ liệu giữa các mạng. Đây là nơi các IP hoạt động.</li>
        <li><strong>Lớp 4 - Lớp Giao vận (Transport Layer):</strong> Cung cấp truyền dữ liệu đầu cuối đến đầu cuối đáng tin cậy, ví dụ như TCP và UDP.</li>
        <li><strong>Lớp 5 - Lớp Phiên (Session Layer):</strong> Quản lý các phiên giao tiếp giữa các máy tính.</li>
        <li><strong>Lớp 6 - Lớp Trình diễn (Presentation Layer):</strong> Chuyển đổi dữ liệu sang một định dạng mà lớp ứng dụng có thể chấp nhận; ví dụ: mã hóa và nén.</li>
        <li><strong>Lớp 7 - Lớp Ứng dụng (Application Layer):</strong> Cung cấp các dịch vụ mạng trực tiếp cho các ứng dụng người dùng cuối, như HTTP, FTP, SMTP.</li>
      </ol>
      <p>Hiểu rõ mô hình OSI giúp các kỹ sư mạng và nhà phát triển chẩn đoán sự cố, thiết kế các giao thức mới và hiểu cách các thành phần mạng khác nhau tương tác với nhau.</p>
    `,
  },
  {
    id: '4',
    slug: 'serverless-computing-voi-aws-lambda',
    title: 'Serverless Computing với AWS Lambda',
    category: 'cloud',
    author: 'KhanhNN',
    published_date: '2024-07-12',
    image: 'https://picsum.photos/1200/630?random=4',
    image_alt: 'Cloud computing icons',
    excerpt: 'Điện toán không máy chủ (Serverless) cho phép bạn xây dựng và chạy các ứng dụng mà không cần phải quản lý cơ sở hạ tầng.',
    content: `
      <p>AWS Lambda là một dịch vụ điện toán không máy chủ, hướng sự kiện, cho phép bạn chạy mã cho hầu hết mọi loại ứng dụng hoặc dịch vụ backend mà không cần cung cấp hoặc quản lý máy chủ. Bạn chỉ trả tiền cho thời gian tính toán mà bạn tiêu thụ.</p>

      <h2>Lợi ích của Serverless</h2>
      <ul>
        <li><strong>Không quản lý máy chủ:</strong> Bạn không cần phải lo lắng về việc vá lỗi hệ điều hành, cung cấp dung lượng hoặc mở rộng quy mô.</li>
        <li><strong>Chi phí hiệu quả:</strong> Bạn chỉ trả tiền khi mã của bạn đang chạy, tính bằng mili giây.</li>
        <li><strong>Khả năng mở rộng linh hoạt:</strong> Ứng dụng của bạn có thể tự động mở rộng hoặc thu hẹp quy mô dựa trên lưu lượng truy cập.</li>
        <li><strong>Tăng tốc độ phát triển:</strong> Các nhà phát triển có thể tập trung vào việc viết mã thay vì quản lý cơ sở hạ tầng.</li>
      </ul>
      
      <h2>Khi nào nên sử dụng AWS Lambda?</h2>
      <p>Lambda là một lựa chọn tuyệt vời cho nhiều trường hợp sử dụng, bao gồm:</p>
      <ul>
        <li><strong>Xử lý dữ liệu:</strong> Chạy mã để xử lý dữ liệu ngay khi nó được tải lên S3 hoặc được ghi vào DynamoDB.</li>
        <li><strong>Backends cho Web/Mobile:</strong> Xây dựng các API RESTful mạnh mẽ bằng cách sử dụng Lambda và API Gateway.</li>
        <li><strong>Tự động hóa tác vụ:</strong> Lên lịch các công việc tự động để thực hiện các tác vụ bảo trì hoặc báo cáo.</li>
      </ul>
      <p>Mặc dù serverless mang lại nhiều lợi ích, nó cũng có những hạn chế như thời gian thực thi có giới hạn và khả năng xảy ra "khởi động nguội" (cold start). Tuy nhiên, đối với nhiều kiến trúc hiện đại, những ưu điểm của nó vượt xa nhược điểm.</p>
    `,
  },
  {
    id: '5',
    slug: 'microservices-la-gi',
    title: 'Kiến trúc Microservices: Ưu và Nhược điểm',
    category: 'systems',
    author: 'KhanhNN',
    published_date: '2024-07-10',
    image: 'https://picsum.photos/1200/630?random=5',
    image_alt: 'Interconnected blocks representing microservices',
    excerpt: 'Kiến trúc microservices cấu trúc một ứng dụng thành một tập hợp các dịch vụ nhỏ, độc lập, có thể triển khai riêng lẻ.',
    content: `
      <p>Kiến trúc microservices đã trở thành một phương pháp phổ biến để xây dựng các ứng dụng phức tạp và có khả năng mở rộng. Thay vì một khối nguyên khối (monolith) duy nhất, ứng dụng được chia thành các dịch vụ nhỏ hơn, mỗi dịch vụ chạy trong quy trình riêng và giao tiếp với nhau qua các API nhẹ.</p>

      <h2>Ưu điểm của Microservices</h2>
      <ul>
        <li><strong>Khả năng mở rộng độc lập:</strong> Mỗi dịch vụ có thể được mở rộng quy mô một cách độc lập dựa trên nhu cầu cụ thể của nó.</li>
        <li><strong>Linh hoạt về công nghệ:</strong> Các nhóm có thể chọn công nghệ phù hợp nhất cho dịch vụ của họ mà không ảnh hưởng đến phần còn lại của hệ thống.</li>
        <li><strong>Triển khai độc lập:</strong> Một thay đổi trong một dịch vụ không yêu cầu phải triển khai lại toàn bộ ứng dụng.</li>
        <li><strong>Tăng khả năng phục hồi:</strong> Lỗi trong một dịch vụ không nhất thiết phải làm sập toàn bộ ứng dụng.</li>
      </ul>

      <h2>Nhược điểm và Thách thức</h2>
      <p>Tuy nhiên, kiến trúc này cũng đi kèm với những thách thức riêng:</p>
      <blockquote>Sự phức tạp trong vận hành, khó khăn trong việc quản lý dữ liệu phân tán, và chi phí giao tiếp mạng là những vấn đề cần được xem xét cẩn thận.</blockquote>
      <p>Việc chuyển sang microservices không phải là một quyết định nên được xem nhẹ. Nó đòi hỏi sự trưởng thành về mặt tổ chức và kỹ thuật, đặc biệt là trong các lĩnh vực DevOps, giám sát và tự động hóa.</p>
    `,
  },
];
