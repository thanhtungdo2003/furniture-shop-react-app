import Textfield from "@atlaskit/textfield";
import React, { use, useEffect, useState } from "react";
import { getProductFromCart, getTotalPriceCart, getUri, removeProductFromCart } from "../js/site";
import ProductCartItem from "./ProductCartItem";
import { QuantityProvider, useQuantity } from "./QuantityContext";
import axios from "axios";
import cartEmptyIcon from "../lib/empty-box-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AlarmCheck, BookX, BoxSelectIcon, PackageOpen } from "lucide-react";
function CartLayout() {
    const [totalprice, setTotalPrice] = useState(0);
    const nav = useNavigate();
    const [finalPrice, setFinalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]); // State để lưu danh sách sản phẩm
    const [click, onCLick] = useState(0);
    useEffect(() => {
        window.scrollTo({ top: 800, behavior: "smooth" });
    }, []);
    useEffect(() => {
        let isMounted = true; // Biến để kiểm tra component có còn mounted không

        const fetchData = async () => {
            try {
                const cartItems = getProductFromCart(); // Lấy danh sách sản phẩm trong giỏ hàng
                if (!cartItems.length) return; // Nếu giỏ hàng trống thì không cần fetch

                const productRequests = cartItems.map(item =>
                    axios.get(getUri() + `/products/${item.id}`)
                        .then(res => {
                            if (res.data.length == 0){
                                removeProductFromCart(item.id)
                            }
                            return ({
                                ...res.data[0],
                                quantity: item.quantity
                            })
                        }).catch(err => {
                            console.log(err);
                            toast.error("Lỗi khi tải sản phẩm");
                        })
                );

                const products = await Promise.all(productRequests); // Đợi tất cả request hoàn thành

                if (isMounted) {
                    const { totalprice, finalPrice } = getTotalPriceCart(products); // Chỉ gọi hàm 1 lần
                    setTotalPrice(totalprice);
                    setFinalPrice(finalPrice);
                    setCartItems(products);
                }
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup khi component bị unmount
        };
    }, [click]);




    return (
        <>
            <ToastContainer />
            <div className="cart-layout" onClick={() => onCLick(click + 1)} onKeyDown={() => onCLick(click + 1)}>
                <div className="cart-products-container">
                    <div style={{ width: "100%", height: "30px", backgroundColor: "rgb(32, 32, 32)", display: "flex", alignItems: "center", color: "white", fontWeight: "300" }}>
                        <p style={{ margin: "0px 10px" }}>{cartItems.length} SẢN PHẨM</p>
                    </div>
                    <div className="cart-products">
                        {cartItems.length === 0 ? (
                            <>
                                <div style={{ width: "200px", height: "400px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", margin: "auto auto" }}>
                                    <div>
                                        <PackageOpen size={150} strokeWidth={1} color="rgb(219, 219, 219)" />
                                    </div>
                                    <p style={{ fontSize: "20px", color: "rgb(101, 101, 101)" }}>Giỏ hàng trống !</p>
                                </div>
                            </>
                        ) : (
                            cartItems.map((product) => {
                                if (!product) return <></>;
                                if (!product.product_imgs) return <></>;
                                const imgNames = JSON.parse(product.product_imgs);
                                const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                                return (
                                    <QuantityProvider key={product.id} defaultvalue={product.quantity}>
                                        <ProductCartItem
                                            setTotalPrice={() => { }}
                                            id={product.product_id}
                                            displayName={product.display_name}
                                            price={product.price}
                                            cateName={product.category_name}
                                            img={getUri() + "/product/get-imgs/product_imgs/" + imageName}
                                        />
                                    </QuantityProvider>
                                )
                            })
                        )}
                    </div>
                </div>
                <div className="cart-summary-container">
                    <div style={{ maxWidth: "100%", padding: "5px", backgroundColor: "rgb(16, 16, 16)", color: "white" }}>
                        Thông tin thanh toán
                    </div>

                    <div className="summary-info">
                        <p className="form-title">chi tiết tiền hàng</p>

                        <div className="summary-item">
                            <p>Tổng tiền hàng: </p><p>{totalprice ? (totalprice).toLocaleString('de-DE') : 0} đ</p>
                        </div>
                        <div className="summary-item">
                            <p>Tổng giá giảm: </p><p>0 đ</p>
                        </div>
                        <div className="summary-item totalprice">
                            <p>Thành tiền: </p><p style={{ color: "red" }}>{totalprice ? (finalPrice).toLocaleString('de-DE') : 0} đ</p>
                        </div>
                    </div>
                    <button onClick={() => {
                        if (getProductFromCart() === "NONE") {
                            toast.info("Giỏ hàng trống!", {})
                            return;
                        };

                        nav("/order-confirm");
                    }} className="summary-sumbit-btn" style={{ maxWidth: "100%", padding: "10px", backgroundColor: "rgb(46, 158, 93)", color: "white", textAlign: "center", cursor: "pointer" }}>
                        ĐẶT HÀNG
                    </button>
                </div>
            </div>

        </>
    )
}

export default CartLayout;