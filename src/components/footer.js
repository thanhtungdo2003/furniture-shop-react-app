import axios from "axios";
import { useEffect, useState } from "react";
import { getUri } from "../js/site";
import { toast } from "react-toastify";

function ShopFooter() {
    const [cateItems, setCateItem] = useState([]);
    useEffect(() => {
        axios.get(`${getUri()}/category/get-all`)
            .then((res) => {
                const categorys = res.data;
                setCateItem(categorys.map((cate, index) => {
                    return <a style={{ cursor: "pointer" }}>{cate.category_name}, </a>;
                }))
            }).catch(err => {
                toast.error(err.status + " Lỗi máy chủ");
            })
    }, [])
    return (
        <>

            <div class="footer-2">
                <div class="footer-gioithieu">
                    <div>GIỚI THIỆU</div>
                    <span>
                        Nội Thất MOHO là thương hiệu đến từ Savimex với gần 40 năm kinh nghiệm trong việc sản xuất và xuất khẩu nội thất đạt chuẩn quốc tế.
                    </span>
                </div>
                <div class="footer-top">
                    <div>DỊCH VỤ</div>
                    <div>
                        Chính Sách Bán Hàng
                        Chính Sách Giao Hàng & Lắp Đặt
                        Chính Sách Bảo Hành & Bảo Trì
                        Chính Sách Đổi Trả
                        Khách Hàng Thân Thiết – MOHOmie
                        Chính Sách Đối Tác Bán Hàng
                    </div>
                </div>
                <div class="footer-location">
                    <div>THÔNG TIN LIÊN HỆ</div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.2609062616098!2d106.05719710455183!3d20.94203499852238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a30555555555%3A0x39a8acd006ab8e69!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgUGjhuqFtIEvhu7kgVGh14bqtdCBIxrBuZyBZw6puLCBDxqEgc-G7nyAy!5e0!3m2!1svi!2s!4v1728696947337!5m2!1svi!2s"
                        width="90%"
                        height="70%"
                        style={{ border: "1px solid rgb(214, 214, 214)" }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <strong>[MIỀN BẮC]</strong><br/>
                    S3.03-Sh15 khu Sapphire | Vinhomes Smart City, Hà Nội .
                    Hotline: 0909 665 728

                    S2.09 khu Sapphire | Vinhomes Ocean Park, Hà Nội.
                    Hotline: 0938 108 772

                    128 Đại lộ Bốn Mùa, Vinhomes Ocean Park 3, Nghĩa Trụ, Văn Giang, Hưng Yên.
                    Hotline: 0888 718 020<br/><br/>
                    <strong>[MIỀN NAM]</strong><br/>
                    [Miền Nam]
                    162 HT17, P. Hiệp Thành, Q. 12, TP. HCM (Nằm trong khuôn viên công ty SAVIMEX phía sau bến xe buýt Hiệp Thành)
                    Hotline: 0934 608 916

                    S05.03-S18 khu The Rainbow | Vinhomes Grand Park, TP. Thủ Đức.
                    Hotline: 0931 880 424
                </div>
                <div class="footer-category">
                    <div>DANH MỤC</div>
                    <div>
                        {cateItems}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ShopFooter;