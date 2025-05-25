import React, { use, useEffect, useState } from "react";

function Blogs() {
    useEffect(() => {
        window.scrollTo(0, 900);
    })
    return (
        <>
            <div className="box-main">
                <div className="blogs-container">
                    <div className="blog-card-container">
                        <div className="blog-img-container">
                            <img src="/blog_1.jpg" />
                        </div>
                        <div className="blog-main">
                            <div className="blog-title">
                                Cách Bảo Quản Đồ Thời Trang Để Luôn Như Mới
                            </div>
                            <div className="blog-content">
                                Việc giữ gìn trang phục không chỉ giúp tiết kiệm chi phí mà còn kéo dài tuổi thọ của từng món đồ yêu thích. Hãy giặt đúng cách theo chất liệu – ví dụ như giặt tay với lụa, giặt máy nhẹ với cotton. Tránh phơi dưới nắng gắt vì sẽ làm phai màu vải. Khi cất giữ, dùng móc phù hợp với từng loại áo, và bảo quản trong môi trường khô ráo, thoáng mát. Với giày dép, nên dùng túi chống ẩm và giữ form để tránh bị biến dạng theo thời gian.
                            </div>
                        </div>
                    </div>
                    <div className="blog-card-container">

                        <div className="blog-main">
                            <div className="blog-title">
                                An Tâm Mua Sắm Với Chính Sách Bảo Hành 12 Tháng
                            </div>
                            <div className="blog-content">
                                Tất cả sản phẩm tại MarcFashion đều được bảo hành 12 tháng cho các lỗi kỹ thuật như bung chỉ, hỏng khóa, đứt cúc,... Chỉ cần giữ hóa đơn hoặc mã đơn hàng, chúng tôi sẽ hỗ trợ sửa chữa hoặc thay thế miễn phí nếu lỗi từ nhà sản xuất.
                            </div>
                        </div>
                        <div className="blog-img-container">
                            <img src="/blog_2.jpg" />
                        </div>
                    </div>
                    <div className="blog-card-container">
                        <div className="blog-img-container">
                            <img src="/blog_4.jpg" />
                        </div>
                        <div className="blog-main">
                            <div className="blog-title">
                                Thiết Kế Sang Trọng – Tôn Vẻ Phong Cách Riêng
                            </div>
                            <div className="blog-content">
                                Tại MarcFashion, mỗi sản phẩm không chỉ là quần áo – mà là sự kết hợp giữa chất liệu cao cấp và thiết kế tinh tế. Từ những đường cắt may chuẩn chỉnh đến phom dáng hiện đại, tất cả đều hướng đến vẻ ngoài thanh lịch và đẳng cấp.

                                Dù là đi làm, dự tiệc hay dạo phố, mày luôn có thể chọn được món đồ vừa sang trọng, vừa đúng gu.
                            </div>
                        </div>

                    </div>
                    <div className="blog-card-container">

                        <div className="blog-main">
                            <div className="blog-title">
                                An Tâm Mua Sắm Với Chính Sách Bảo Hành 12 Tháng
                            </div>
                            <div className="blog-content">
                                Dù bạn theo đuổi phong cách tối giản, năng động, hay cá tính nổi bật, MarcFashion luôn có thứ bạn cần. Bộ sưu tập được cập nhật liên tục với nhiều kiểu dáng, chất liệu và màu sắc, từ đồ basic hằng ngày đến các item nổi bật cho những dịp đặc biệt.
                                Không giới hạn trong một gu – ở đây là nơi để bạn thể hiện chính mình.
                            </div>
                        </div>
                        <div className="blog-img-container">
                            <img src="/blog_3.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blogs;