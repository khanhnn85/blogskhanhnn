
import type { Category } from '@/types';
import { Cog, Shield, Network, Cloud } from 'lucide-react';
import type { Article } from '@/types';

export const CATEGORIES: Category[] = [
  { slug: 'systems', name: 'Hệ thống', icon: Cog },
  { slug: 'security', name: 'Bảo mật', icon: Shield },
  { slug: 'networking', name: 'Mạng', icon: Network },
  { slug: 'cloud', name: 'Cloud', icon: Cloud },
];

const ARTICLES: Article[] = [
    {
    "id": "1",
    "slug": "hieu-nang-he-thong-voi-redis",
    "title": "Tối ưu hoá hiệu năng hệ thống với Redis",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-20",
    "image": "https://picsum.photos/1200/630?random=1",
    "image_alt": "Abstract network visualization",
    "excerpt": "Khám phá cách Redis, một kho lưu trữ dữ liệu trong bộ nhớ, có thể tăng tốc đáng kể ứng dụng của bạn và giảm tải cho cơ sở dữ liệu chính.",
    "content": "\n      <p>Redis, viết tắt của Remote Dictionary Server, là một kho lưu trữ cấu trúc dữ liệu trong bộ nhớ, mã nguồn mở, được sử dụng làm cơ sở dữ liệu, bộ đệm và trình môi giới thông điệp. Nó hỗ trợ các cấu trúc dữ liệu như chuỗi, hash, danh sách, tập hợp, tập hợp có sắp xếp với các truy vấn phạm vi, bitmap, hyperloglog, chỉ mục không gian địa lý với các truy vấn bán kính và luồng.</p>\n      \n      <h2>Tại sao nên sử dụng Redis?</h2>\n      <p>Lý do chính khiến Redis trở nên phổ biến là hiệu suất vượt trội của nó. Vì Redis lưu trữ dữ liệu trong bộ nhớ, nó có thể đọc và ghi dữ liệu với độ trễ cực thấp. Điều này làm cho nó trở thành một lựa chọn lý tưởng cho các ứng dụng yêu cầu phản hồi nhanh, chẳng hạn như:</p>\n      <ul>\n        <li>Caching: Giảm tải cho cơ sở dữ liệu chính bằng cách lưu trữ các dữ liệu thường xuyên truy cập trong Redis.</li>\n        <li>Session Management: Lưu trữ thông tin phiên người dùng một cách hiệu quả và có thể mở rộng.</li>\n        <li>Real-time Analytics: Xử lý và phân tích dữ liệu thời gian thực cho các bảng điều khiển và hệ thống báo cáo.</li>\n        <li>Queues: Xây dựng hàng đợi công việc nền đáng tin cậy.</li>\n      </ul>\n\n      <h2>Triển khai Caching với Redis</h2>\n      <p>Một trong những trường hợp sử dụng phổ biến nhất của Redis là làm bộ đệm. Chiến lược caching \"cache-aside\" hoạt động như sau:</p>\n      <ol>\n        <li>Khi ứng dụng cần dữ liệu, nó trước tiên sẽ kiểm tra trong Redis.</li>\n        <li>Nếu dữ liệu tồn tại (cache hit), nó sẽ được trả về ngay lập tức.</li>\n        <li>Nếu dữ liệu không tồn tại (cache miss), ứng dụng sẽ truy vấn từ cơ sở dữ liệu chính, sau đó lưu trữ kết quả vào Redis trước khi trả về cho người dùng.</li>\n      </ol>\n      <p>Cách tiếp cận này giúp giảm đáng kể số lượng truy vấn đến cơ sở dữ liệu, cải thiện thời gian phản hồi và khả năng mở rộng của hệ thống.</p>\n    "
  },
  {
    "id": "2",
    "slug": "bao-mat-ung-dung-web-voi-owasp-top-10",
    "title": "Bảo mật ứng dụng web với OWASP Top 10",
    "category": "security",
    "author": "KhanhNN",
    "published_date": "2024-07-18",
    "image": "https://picsum.photos/1200/630?random=2",
    "image_alt": "Digital security shield",
    "excerpt": "Tìm hiểu về OWASP Top 10, một tài liệu nhận thức tiêu chuẩn cho các nhà phát triển và chuyên gia bảo mật ứng dụng web.",
    "content": "\n      <p>OWASP Top 10 là một danh sách các rủi ro bảo mật ứng dụng web phổ biến và nghiêm trọng nhất. Việc hiểu và áp dụng các biện pháp phòng chống các lỗ hổng này là bước đầu tiên quan trọng để xây dựng các ứng dụng an toàn.</p>\n      \n      <h2>Các rủi ro hàng đầu trong OWASP Top 10</h2>\n      <p>Danh sách này được cập nhật vài năm một lần. Một số rủi ro tiêu biểu bao gồm:</p>\n      <ul>\n        <li><strong>A01:2021-Broken Access Control:</strong> Lỗ hổng kiểm soát truy cập cho phép kẻ tấn công truy cập vào các tài nguyên hoặc chức năng mà họ không được phép.</li>\n        <li><strong>A02:2021-Cryptographic Failures:</strong> Các lỗi liên quan đến mã hóa, thường dẫn đến lộ lọt dữ liệu nhạy cảm.</li>\n        <li><strong>A03:2021-Injection:</strong> Các lỗ hổng tiêm nhiễm, chẳng hạn như SQL injection, NoSQL injection và OS command injection, xảy ra khi dữ liệu không đáng tin cậy được gửi đến một trình thông dịch như một phần của lệnh hoặc truy vấn.</li>\n      </ul>\n\n      <h2>Làm thế nào để phòng chống?</h2>\n      <p>Không có một giải pháp duy nhất. Bảo mật là một quá trình liên tục đòi hỏi sự kết hợp của nhiều kỹ thuật:</p>\n      <blockquote>Thực hành mã hóa an toàn, xác thực đầu vào, sử dụng các framework bảo mật, và thường xuyên thực hiện đánh giá và kiểm thử thâm nhập là những yếu-tố-then-chốt.</blockquote>\n      <p>Bằng cách tích hợp bảo mật vào vòng đời phát triển phần mềm (DevSecOps), các tổ chức có thể phát hiện và khắc phục các lỗ hổng sớm hơn, giảm thiểu rủi ro và chi phí.</p>\n    "
  },
  {
    "id": "3",
    "slug": "gioi-thieu-mo-hinh-osi-7-lop",
    "title": "Giới thiệu mô hình OSI 7 lớp",
    "category": "networking",
    "author": "KhanhNN",
    "published_date": "2024-07-15",
    "image": "https://picsum.photos/1200/630?random=3",
    "image_alt": "Network layers diagram",
    "excerpt": "Mô hình Tham chiếu Kết nối Hệ thống Mở (OSI) là một khuôn khổ khái niệm mô tả các chức năng của một hệ thống mạng hoặc viễn thông.",
    "content": "\n      <p>Mô hình OSI chia giao tiếp mạng thành bảy lớp trừu tượng. Mỗi lớp phục vụ lớp trên nó và được phục vụ bởi lớp dưới nó. Điều này giúp chuẩn hóa giao tiếp giữa các hệ thống máy tính đa dạng.</p>\n      \n      <h2>Bảy lớp của mô hình OSI</h2>\n      <ol>\n        <li><strong>Lớp 1 - Lớp Vật lý (Physical Layer):</strong> Chịu trách nhiệm truyền các bit dữ liệu thô qua một phương tiện vật lý (cáp, sóng vô tuyến).</li>\n        <li><strong>Lớp 2 - Lớp Liên kết dữ liệu (Data Link Layer):</strong> Cung cấp truyền dữ liệu đáng tin cậy giữa hai nút được kết nối trực tiếp.</li>\n        <li><strong>Lớp 3 - Lớp Mạng (Network Layer):</strong> Quản lý việc định địa chỉ và định tuyến dữ liệu giữa các mạng. Đây là nơi các IP hoạt động.</li>\n        <li><strong>Lớp 4 - Lớp Giao vận (Transport Layer):</strong> Cung cấp truyền dữ liệu đầu cuối đến đầu cuối đáng tin cậy, ví dụ như TCP và UDP.</li>\n        <li><strong>Lớp 5 - Lớp Phiên (Session Layer):</strong> Quản lý các phiên giao tiếp giữa các máy tính.</li>\n        <li><strong>Lớp 6 - Lớp Trình diễn (Presentation Layer):</strong> Chuyển đổi dữ liệu sang một định dạng mà lớp ứng dụng có thể chấp nhận; ví dụ: mã hóa và nén.</li>\n        <li><strong>Lớp 7 - Lớp Ứng dụng (Application Layer):</strong> Cung cấp các dịch vụ mạng trực tiếp cho các ứng dụng người dùng cuối, như HTTP, FTP, SMTP.</li>\n      </ol>\n      <p>Hiểu rõ mô hình OSI giúp các kỹ sư mạng và nhà phát triển chẩn đoán sự cố, thiết kế các giao thức mới và hiểu cách các thành phần mạng khác nhau tương tác với nhau.</p>\n    "
  },
  {
    "id": "4",
    "slug": "serverless-computing-voi-aws-lambda",
    "title": "Serverless Computing với AWS Lambda",
    "category": "cloud",
    "author": "KhanhNN",
    "published_date": "2024-07-12",
    "image": "https://picsum.photos/1200/630?random=4",
    "image_alt": "Cloud computing icons",
    "excerpt": "Điện toán không máy chủ (Serverless) cho phép bạn xây dựng và chạy các ứng dụng mà không cần phải quản lý cơ sở hạ tầng.",
    "content": "\n      <p>AWS Lambda là một dịch vụ điện toán không máy chủ, hướng sự kiện, cho phép bạn chạy mã cho hầu hết mọi loại ứng dụng hoặc dịch vụ backend mà không cần cung cấp hoặc quản lý máy chủ. Bạn chỉ trả tiền cho thời gian tính toán mà bạn tiêu thụ.</p>\n\n      <h2>Lợi ích của Serverless</h2>\n      <ul>\n        <li><strong>Không quản lý máy chủ:</strong> Bạn không cần phải lo lắng về việc vá lỗi hệ điều hành, cung cấp dung lượng hoặc mở rộng quy mô.</li>\n        <li><strong>Chi phí hiệu quả:</strong> Bạn chỉ trả tiền khi mã của bạn đang chạy, tính bằng mili giây.</li>\n        <li><strong>Khả năng mở rộng linh hoạt:</strong> Ứng dụng của bạn có thể tự động mở rộng hoặc thu hẹp quy mô dựa trên lưu lượng truy cập.</li>\n        <li><strong>Tăng tốc độ phát triển:</strong> Các nhà phát triển có thể tập trung vào việc viết mã thay vì quản lý cơ sở hạ tầng.</li>\n      </ul>\n      \n      <h2>Khi nào nên sử dụng AWS Lambda?</h2>\n      <p>Lambda là một lựa chọn tuyệt vời cho nhiều trường hợp sử dụng, bao gồm:</p>\n      <ul>\n        <li><strong>Xử lý dữ liệu:</strong> Chạy mã để xử lý dữ liệu ngay khi nó được tải lên S3 hoặc được ghi vào DynamoDB.</li>\n        <li><strong>Backends cho Web/Mobile:</strong> Xây dựng các API RESTful mạnh mẽ bằng cách sử dụng Lambda và API Gateway.</li>\n        <li><strong>Tự động hóa tác vụ:</strong> Lên lịch các công việc tự động để thực hiện các tác vụ bảo trì hoặc báo cáo.</li>\n      </ul>\n      <p>Mặc dù serverless mang lại nhiều lợi ích, nó cũng có những hạn chế như thời gian thực thi có giới hạn và khả năng xảy ra \"khởi động nguội\" (cold start). Tuy nhiên, đối với nhiều kiến trúc hiện đại, những ưu điểm của nó vượt xa nhược điểm.</p>\n    "
  },
  {
    "id": "5",
    "slug": "microservices-la-gi",
    "title": "Kiến trúc Microservices: Ưu và Nhược điểm",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-10",
    "image": "https://picsum.photos/1200/630?random=5",
    "image_alt": "Interconnected blocks representing microservices",
    "excerpt": "Kiến trúc microservices cấu trúc một ứng dụng thành một tập hợp các dịch vụ nhỏ, độc lập, có thể triển khai riêng lẻ.",
    "content": "\n      <p>Kiến trúc microservices đã trở thành một phương pháp phổ biến để xây dựng các ứng dụng phức tạp và có khả năng mở rộng. Thay vì một khối nguyên khối (monolith) duy nhất, ứng dụng được chia thành các dịch vụ nhỏ hơn, mỗi dịch vụ chạy trong quy trình riêng và giao tiếp với nhau qua các API nhẹ.</p>\n\n      <h2>Ưu điểm của Microservices</h2>\n      <ul>\n        <li><strong>Khả năng mở rộng độc lập:</strong> Mỗi dịch vụ có thể được mở rộng quy mô một cách độc lập dựa trên nhu cầu cụ thể của nó.</li>\n        <li><strong>Linh hoạt về công nghệ:</strong> Các nhóm có thể chọn công nghệ phù hợp nhất cho dịch vụ của họ mà không ảnh hưởng đến phần còn lại của hệ thống.</li>\n        <li><strong>Triển khai độc lập:</strong> Một thay đổi trong một dịch vụ không yêu cầu phải triển khai lại toàn bộ ứng dụng.</li>\n        <li><strong>Tăng khả năng phục hồi:</strong> Lỗi trong một dịch vụ không nhất thiết phải làm sập toàn bộ ứng dụng.</li>\n      </ul>\n\n      <h2>Nhược điểm và Thách thức</h2>\n      <p>Tuy nhiên, kiến trúc này cũng đi kèm với những thách thức riêng:</p>\n      <blockquote>Sự phức tạp trong vận hành, khó khăn trong việc quản lý dữ liệu phân tán, và chi phí giao tiếp mạng là những vấn đề cần được xem xét cẩn thận.</blockquote>\n      <p>Việc chuyển sang microservices không phải là một quyết định nên được xem nhẹ. Nó đòi hỏi sự trưởng thành về mặt tổ chức và kỹ thuật, đặc biệt là trong các lĩnh vực DevOps, giám sát và tự động hóa.</p>\n    "
  },
  {
    "id": "6",
    "slug": "nhap-mon-cau-lenh-linux",
    "title": "Nhập môn về các câu lệnh cơ bản trong Linux",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-21",
    "image": "https://picsum.photos/1200/630?random=6",
    "image_alt": "Linux terminal with code",
    "excerpt": "Bắt đầu hành trình của bạn với Linux bằng cách tìm hiểu các câu lệnh thiết yếu để điều hướng và quản lý hệ thống tệp của bạn.",
    "content": "\n      <p>Dòng lệnh Linux là một công cụ mạnh mẽ. Việc thành thạo một vài lệnh cơ bản có thể cải thiện đáng kể năng suất của bạn. Dưới đây là một số lệnh để bạn bắt đầu.</p>\n      <h2>Điều hướng hệ thống tệp</h2>\n      <ul>\n        <li><code>pwd</code>: In thư mục làm việc hiện tại.</li>\n        <li><code>ls</code>: Liệt kê nội dung của một thư mục.</li>\n        <li><code>cd</code>: Thay đổi thư mục hiện tại.</li>\n      </ul>\n      <h2>Quản lý tệp</h2>\n      <ul>\n        <li><code>touch &lt;tên_tệp&gt;</code>: Tạo một tệp trống mới.</li>\n        <li><code>cp &lt;nguồn&gt; &lt;đích&gt;</code>: Sao chép tệp hoặc thư mục.</li>\n        <li><code>mv &lt;nguồn&gt; &lt;đích&gt;</code>: Di chuyển hoặc đổi tên tệp hoặc thư mục.</li>\n        <li><code>rm &lt;tên_tệp&gt;</code>: Xóa một tệp.</li>\n      </ul>\n    "
  },
  {
    "id": "7",
    "slug": "quan-ly-tien-trinh-trong-linux",
    "title": "Quản lý tiến trình trong Linux",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-22",
    "image": "https://picsum.photos/1200/630?random=7",
    "image_alt": "Process management visualization",
    "excerpt": "Tìm hiểu cách xem, quản lý và kết thúc các tiến trình đang chạy trên hệ thống Linux của bạn bằng các công cụ dòng lệnh.",
    "content": "\n      <p>Quản lý tiến trình là một kỹ năng quản trị hệ thống Linux cơ bản. Hiểu cách các tiến trình hoạt động sẽ giúp bạn gỡ lỗi và tối ưu hóa hệ thống của mình.</p>\n      <h2>Các lệnh hữu ích</h2>\n      <ul>\n        <li><code>ps aux</code>: Hiển thị ảnh chụp nhanh của tất cả các tiến trình đang chạy.</li>\n        <li><code>top</code>: Cung cấp chế độ xem thời gian thực về các tiến trình hệ thống.</li>\n        <li><code>kill &lt;PID&gt;</code>: Gửi tín hiệu đến một tiến trình, thường được sử dụng để kết thúc nó.</li>\n        <li><code>pkill &lt;tên_tiến_trình&gt;</code>: Kết thúc các tiến trình dựa trên tên của chúng.</li>\n      </ul>\n    "
  },
  {
    "id": "8",
    "slug": "bash-scripting-co-ban",
    "title": "Giới thiệu về Bash Scripting",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-23",
    "image": "https://picsum.photos/1200/630?random=8",
    "image_alt": "Bash script code on a screen",
    "excerpt": "Tự động hóa các tác vụ lặp đi lặp lại và tạo các công cụ mạnh mẽ bằng cách viết các tập lệnh shell của riêng bạn bằng Bash.",
    "content": "\n      <p>Bash scripting cho phép bạn tự động hóa các chuỗi lệnh. Đó là một kỹ năng cơ bản cho bất kỳ quản trị viên hệ thống hoặc nhà phát triển nào làm việc với Linux.</p>\n      <h2>Cấu trúc Script cơ bản</h2>\n      <pre><code>#!/bin/bash\n# Đây là một bình luận\nECHO \"Hello, World!\"\nMY_VARIABLE=\"Tôi là một biến\"\necho $MY_VARIABLE\n      </code></pre>\n      <p>Tập lệnh này bắt đầu bằng một 'shebang' (#!), cho hệ thống biết trình thông dịch nào sẽ sử dụng. Sau đó, nó in một thông báo, định nghĩa một biến và in giá trị của biến.</p>\n    "
  },
  {
    "id": "9",
    "slug": "tim-hieu-quyen-tep-linux",
    "title": "Tìm hiểu về quyền tệp trong Linux",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-24",
    "image": "https://picsum.photos/1200/630?random=9",
    "image_alt": "File permissions concept image",
    "excerpt": "Bảo mật hệ thống của bạn bằng cách hiểu và quản lý quyền truy cập tệp cho người dùng, nhóm và những người khác.",
    "content": "\n      <p>Linux sử dụng một hệ thống quyền để kiểm soát ai có thể đọc, ghi và thực thi tệp. Hiểu điều này là rất quan trọng đối với bảo mật hệ thống.</p>\n      <h2>Ba loại quyền</h2>\n      <ul>\n        <li><strong>Đọc (r):</strong> Xem nội dung của một tệp hoặc liệt kê các tệp trong một thư mục.</li>\n        <li><strong>Ghi (w):</strong> Sửa đổi một tệp hoặc tạo/xóa các tệp trong một thư mục.</li>\n        <li><strong>Thực thi (x):</strong> Chạy một tệp (nếu đó là tập lệnh hoặc chương trình) hoặc vào một thư mục.</li>\n      </ul>\n      <p>Sử dụng lệnh <code>chmod</code> để thay đổi quyền và <code>chown</code> để thay đổi quyền sở hữu.</p>\n    "
  },
  {
    "id": "10",
    "slug": "su-dung-grep-va-find",
    "title": "Tìm kiếm tệp và văn bản bằng grep và find",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-25",
    "image": "https://picsum.photos/1200/630?random=10",
    "image_alt": "Magnifying glass over text",
    "excerpt": "Làm chủ nghệ thuật tìm kiếm trong Linux. Tìm hiểu cách định vị tệp theo tên, loại, kích thước và tìm kiếm các mẫu văn bản cụ thể bên trong chúng.",
    "content": "\n      <p>Hai trong số các tiện ích mạnh mẽ nhất trong Linux là <code>find</code> và <code>grep</code>.</p>\n      <h2>Find</h2>\n      <p>Lệnh <code>find</code> tìm kiếm các tệp và thư mục dựa trên các tiêu chí như tên, kích thước, ngày sửa đổi, v.v.</p>\n      <pre><code># Tìm tất cả các tệp .log trong thư mục hiện tại\nfind . -name \"*.log\"\n      </code></pre>\n      <h2>Grep</h2>\n      <p>Lệnh <code>grep</code> tìm kiếm các mẫu văn bản bên trong các tệp.</p>\n      <pre><code># Tìm kiếm \"error\" trong một tệp nhật ký\ngrep \"error\" /var/log/syslog\n      </code></pre>\n    "
  },
  {
    "id": "11",
    "slug": "ket-noi-mang-trong-linux",
    "title": "Các lệnh kết nối mạng cơ bản trong Linux",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-26",
    "image": "https://picsum.photos/1200/630?random=11",
    "image_alt": "Network cables and server",
    "excerpt": "Chẩn đoán các sự cố kết nối và xem thông tin mạng bằng các công cụ dòng lệnh Linux thiết yếu.",
    "content": "\n      <p>Linux cung cấp một bộ công cụ mạnh mẽ để quản lý và gỡ lỗi kết nối mạng.</p>\n      <h2>Các lệnh cần biết</h2>\n      <ul>\n        <li><code>ping &lt;máy_chủ&gt;</code>: Kiểm tra khả năng kết nối đến một máy chủ từ xa.</li>\n        <li><code>ifconfig</code> (cũ hơn) hoặc <code>ip addr</code> (mới hơn): Hiển thị và cấu hình các giao diện mạng.</li>\n        <li><code>netstat -tuln</code>: Liệt kê tất cả các cổng đang lắng nghe (TCP và UDP).</li>\n        <li><code>traceroute &lt;máy_chủ&gt;</code>: Hiển thị đường đi mà các gói tin đi đến một máy chủ.</li>\n      </ul>\n    "
  },
  {
    "id": "12",
    "slug": "quan-ly-goi-voi-apt",
    "title": "Quản lý gói trên các hệ thống dựa trên Debian bằng APT",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-27",
    "image": "https://picsum.photos/1200/630?random=12",
    "image_alt": "Software package boxes",
    "excerpt": "Tìm hiểu cách cài đặt, cập nhật và xóa phần mềm trên Ubuntu, Debian và các bản phân phối liên quan bằng công cụ quản lý gói APT.",
    "content": "\n      <p>Advanced Package Tool (APT) là một công cụ mạnh mẽ để quản lý phần mềm trên các hệ thống dựa trên Debian. Nó đơn giản hóa quá trình cài đặt, nâng cấp và xóa các gói phần mềm.</p>\n      <h2>Các lệnh APT phổ biến</h2>\n      <ul>\n        <li><code>sudo apt update</code>: Đồng bộ hóa lại các tệp chỉ mục gói từ các nguồn của chúng.</li>\n        <li><code>sudo apt upgrade</code>: Cài đặt các phiên bản mới nhất của tất cả các gói hiện được cài đặt.</li>\n        <li><code>sudo apt install &lt;tên_gói&gt;</code>: Cài đặt một gói mới.</li>\n        <li><code>sudo apt remove &lt;tên_gói&gt;</code>: Xóa một gói.</li>\n      </ul>\n    "
  },
  {
    "id": "13",
    "slug": "chuyen-huong-io-trong-linux",
    "title": "Làm chủ chuyển hướng I/O và đường ống (Pipes) trong Linux",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-28",
    "image": "https://picsum.photos/1200/630?random=13",
    "image_alt": "Water pipes connecting things",
    "excerpt": "Kiểm soát đầu vào và đầu ra của các lệnh của bạn. Tìm hiểu cách chuyển hướng đầu ra đến các tệp và chuỗi các lệnh lại với nhau bằng các đường ống.",
    "content": "\n      <p>Chuyển hướng và đường ống là các tính năng cốt lõi của shell Linux cho phép bạn tạo các quy trình làm việc phức tạp.</p>\n      <h2>Chuyển hướng</h2>\n      <ul>\n        <li><code>&gt;</code>: Chuyển hướng đầu ra tiêu chuẩn đến một tệp, ghi đè lên tệp nếu nó tồn tại.</li>\n        <li><code>&gt;&gt;</code>: Chuyển hướng đầu ra tiêu chuẩn đến một tệp, nối vào tệp nếu nó tồn tại.</li>\n        <li><code>&lt;</code>: Chuyển hướng đầu vào tiêu chuẩn từ một tệp.</li>\n        <li><code>2&gt;</code>: Chuyển hướng lỗi tiêu chuẩn.</li>\n      </ul>\n      <h2>Đường ống (Pipes)</h2>\n      <p>Đường ống (<code>|</code>) lấy đầu ra tiêu chuẩn của một lệnh và sử dụng nó làm đầu vào tiêu chuẩn của lệnh tiếp theo.</p>\n      <pre><code># Đếm số lượng tệp trong thư mục hiện tại\nls -l | wc -l\n      </code></pre>\n    "
  },
  {
    "id": "14",
    "slug": "su-dung-ssh-de-ket-noi-tu-xa",
    "title": "Bảo mật kết nối từ xa bằng SSH",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-29",
    "image": "https://picsum.photos/1200/630?random=14",
    "image_alt": "Secure lock on a digital tunnel",
    "excerpt": "Tìm hiểu cách truy cập và quản lý các máy chủ Linux từ xa một cách an toàn bằng giao thức Secure Shell (SSH).",
    "content": "\n      <p>SSH (Secure Shell) là một giao thức mạng mật mã để vận hành các dịch vụ mạng một cách an toàn qua một mạng không an toàn. Các ứng dụng chính của nó là đăng nhập dòng lệnh từ xa và thực thi lệnh từ xa.</p>\n      <h2>Kết nối với SSH</h2>\n      <p>Để kết nối đến một máy chủ từ xa, hãy sử dụng lệnh sau:</p>\n      <pre><code>ssh &lt;tên_người_dùng&gt;@&lt;địa_chỉ_ip_máy_chủ&gt;\n      </code></pre>\n      <h2>Xác thực dựa trên khóa</h2>\n      <p>Để tăng cường bảo mật, bạn nên sử dụng xác thực khóa SSH thay vì mật khẩu. Điều này liên quan đến việc tạo một cặp khóa công khai-riêng tư và đặt khóa công khai trên máy chủ.</p>\n    "
  },
  {
    "id": "15",
    "slug": "cau-hinh-tuong-lua-voi-ufw",
    "title": "Thiết lập tường lửa cơ bản với UFW",
    "category": "systems",
    "author": "KhanhNN",
    "published_date": "2024-07-30",
    "image": "https://picsum.photos/1200/630?random=15",
    "image_alt": "Digital firewall brick wall",
    "excerpt": "Bảo vệ máy chủ Linux của bạn bằng cách định cấu hình tường lửa. Tìm hiểu giao diện Uncomplicated Firewall (UFW) dễ sử dụng.",
    "content": "\n      <p>UFW, hay Uncomplicated Firewall, là một giao diện người dùng thân thiện để quản lý các quy tắc tường lửa iptables. Nó cung cấp một cách đơn giản để bảo mật mạng của bạn.</p>\n      <h2>Các lệnh UFW cơ bản</h2>\n      <ul>\n        <li><code>sudo ufw enable</code>: Bật tường lửa.</li>\n        <li><code>sudo ufw status</code>: Kiểm tra trạng thái của tường lửa.</li>\n        <li><code>sudo ufw default deny incoming</code>: Từ chối tất cả các kết nối đến theo mặc định.</li>\n        <li><code>sudo ufw allow ssh</code>: Cho phép tất cả các kết nối đến trên cổng SSH.</li>\n        <li><code>sudo ufw allow 80/tcp</code>: Cho phép các kết nối đến trên cổng 80 (HTTP).</li>\n      </ul>\n    "
  }
];


export async function getArticles(
  categorySlug?: string,
  count?: number,
  excludeSlug?: string
): Promise<Article[]> {
  let articles = [...ARTICLES].sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());

  if (categorySlug) {
    articles = articles.filter(article => article.category === categorySlug);
  }
  
  if (excludeSlug) {
    articles = articles.filter(article => article.slug !== excludeSlug);
  }
  
  if (count) {
    return articles.slice(0, count);
  }

  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const article = ARTICLES.find(a => a.slug === slug);
    return article || null;
}

export async function getAllArticleSlugs(): Promise<string[]> {
    return ARTICLES.map(article => article.slug);
}

export async function searchArticles(searchTerm: string): Promise<Article[]> {
  if (!searchTerm) {
    const allArticles = await getArticles();
    return allArticles;
  }

  const lowercasedQuery = searchTerm.toLowerCase();
  const allArticles = await getArticles();
  return allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercasedQuery) ||
      article.content.toLowerCase().includes(lowercasedQuery) ||
      article.excerpt.toLowerCase().includes(lowercasedQuery)
  );
}

    