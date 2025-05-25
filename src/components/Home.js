import React, { useEffect, useState } from "react";
import Slideshow from "./SlideShow";
import ProductItem from "./ProductItem";

import uri, { getUri } from "../js/site";

import slide1 from "../lib/funiture-slide1.png";
import slide2 from "../lib/funiture-slide2.png";
import slide3 from "../lib/funiture-slide3.png";
import slide4 from "../lib/funiture-slide4.png";
import axios from "axios";
import { ArrowUpFromDot, Atom, BadgeCheck, Boxes, Clock, FlaskConical, FlaskConicalOff, HandCoins, HeartHandshake, Package2, Phone, PhoneCall, RotateCcw, WineOff } from "lucide-react";


const slides = [
    slide1, slide2, slide3,
    slide4,
];
function Home() {
    const [newProducts, setNewProducts] = useState([]);
    const [bestSaleProducts, setBestSaleProducts] = useState([]);
    useEffect(() => {
        axios.post(getUri() + "/products-get-by-params", {
            row: 4,
            page: 1,
            keyword: "",
            sort: "newest",
            get_type: "user",
            category_slug: ""
        }, { withCredentials: true })
            .then((res) => {
                if (!res.data) return <></>;
                const productsDatas = res.data;

                setNewProducts(productsDatas.map((p, index) => {
                    const imgNames = JSON.parse(p.product_imgs);
                    const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                    return (<ProductItem
                        key={p.product_id}
                        id={p.product_id}
                        displayName={p.display_name}
                        categoryName={p.category_name}
                        price={p.price}
                        categorySlug={p.category_slug}
                        totalSelled={p.totalSelled}

                        img={getUri() + `/product/get-imgs/product_imgs/` + imageName}
                    />)
                }))
            }).catch(err => {

            })

        //
        axios.post(getUri() + "/products-get-by-params", {
            row: 16,
            page: 1,
            keyword: "",
            sort: "bestsale",
            get_type: "user",
            category_slug: ""
        }, { withCredentials: true })
            .then((res) => {
                if (!res.data) return <></>;
                setBestSaleProducts(res.data)
            }).catch(err => {

            })
    }, [])
    return (
        <>
            <div className="slide-show">
                <Slideshow images={slides} />
            </div>
            <div className="box-main">
                <div className="product-container newproduct-container">
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "30px" }}>
                        <div className="product-container-title">
                            <p>SẢN PHẨM MỚI</p>
                        </div>
                        <div className="product-container-more-btn">
                            <i>XEM THÊM</i>
                        </div>
                    </div>
                    <div className="products">
                        {newProducts}
                    </div>
                </div>
                <div className="mini-slide">
                    <div>
                        <Package2 color="#666" size={100} strokeWidth={1} /><span>Giao hàng & lắp đặt</span>
                    </div>
                    <div>
                        <HandCoins color="#666" size={100} strokeWidth={1} /><span>Giá cả hợp lý</span>
                    </div>
                    <div>
                        <RotateCcw color="#666" size={100} strokeWidth={1} /><span>Đổi trả 1 - 1</span>
                    </div>
                    <div>
                        <PhoneCall color="#666" size={100} strokeWidth={1} /><span>Tư vấn thiết kế</span>
                    </div>
                </div>
                <div className="product-container bestproduct-container">
                    <div style={{ display: "flex",justifyContent:"space-between", width: "100%", height: "30px" }}>
                        <div className="product-container-title">
                            <p>SẢN PHẨM NỔI BẬT</p>
                        </div>

                        <div className="product-container-more-btn">
                            <i>XEM THÊM</i>
                        </div>

                    </div>
                    <div className="products">
                        {bestSaleProducts.map((p, index) => {
                            const imgNames = JSON.parse(p.product_imgs);
                            const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                            return (<ProductItem
                                key={p.product_id}
                                id={p.product_id}
                                displayName={p.display_name}
                                categoryName={p.category_name}
                                price={p.price}
                                categorySlug={p.category_slug}
                                totalSelled={p.totalSelled}
                                img={getUri() + `/product/get-imgs/product_imgs/` + imageName}
                            />)
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}
export default Home;