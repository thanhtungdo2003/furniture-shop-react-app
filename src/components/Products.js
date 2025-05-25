import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import axios from "axios";
import downIcon from "../lib/down-chevron-svgrepo-com.svg"
import { useProduct } from "./ProductsContext";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function ProductsPage() {
    const { keyword } = useParams();

    const { page, setPage } = useProduct();
    const { row, setRow } = useProduct();
    const { searchKeyword, setSearchKeyword } = useProduct();
    const { categorySlug, setCategorySlug } = useProduct();
    const { sortType, setSortType } = useProduct();
    const { getType, setGetType } = useProduct();
    const [sortTypeName, setSortTypeName] = useState("Giá");
    const [products, setProducts] = useState([]);

    const handleClickSortType = (content) => {
        setSortTypeName(content);
    }

    useEffect(() => {
        window.scrollTo(0, 900);
        axios.post("http://localhost:3000/api/products-get-by-params", {
            row: row,
            page: page,
            keyword: keyword,
            category_slug: "",
            sort: sortType,
            get_type: "user"
        }, { withCredentials: true })
            .then((res) => {
                if (!res.data) return <></>;
                const productsDatas = res.data;

                if (sortType === "price_asc") {
                    productsDatas.sort((a, b) => b.price - b.price);


                } else {
                    productsDatas.sort((a, b) => a.price - b.price);

                }

                setProducts(productsDatas);
            })
    }, [categorySlug, page, row, sortType, keyword, getType])
    return (
        <>
            <ToastContainer />
            <div style={{ position: "sticky", top: "10px", maxWidth: "100%", height: "40px", backgroundColor: "rgba(1, 1, 1, 0.6)", backdropFilter: "blur(10px)", display: "flex", padding: "10px", alignItems: "center", justifyContent: "space-between" }}>
                <div className="product-show-option-container" style={{ display: "flex", width: "75%", height: "40px", alignItems: "center", gap: "7px" }}>
                    <p style={{ color: "white" }}>Sắp xếp theo</p>
                    <button onClick={() => { window.location.reload() }}>Phổ biến</button>
                    <button onClick={() => { window.location.reload() }}>Mới nhất</button>
                    <button onClick={() => { window.location.reload() }}>Bán chạy</button>
                    <div className="sort-type-select-container">
                        <div className="sort-type-content" style={{ width: "80%" }}>
                            <p>{sortTypeName}</p>
                            <div className="sort-type-option-container">
                                <div onClick={() => {
                                    handleClickSortType("Giá: từ thấp đến cao");
                                    setSortType("price_asc");
                                }}>
                                    Giá: từ thấp đến cao
                                </div>
                                <div onClick={() => {
                                    handleClickSortType("Giá: từ cao đến thấp");
                                    setSortType("price_desc");

                                }}>
                                    Giá: từ cao đến thấp
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "20%" }}>
                            <img style={{ width: "20px", height: "20px" }} src={downIcon} />
                        </div>
                    </div>
                </div>
                <div className="page-control-container">
                    <p style={{ color: "white" }}>{page}</p>
                    <div>
                        <button disabled={page === 1} onClick={() => {
                            setPage(page - 1)
                        }}>{"<"}</button>
                        <button disabled={products.length < 20} onClick={() => {
                            setPage(page + 1)
                        }}>{">"}</button>
                    </div>
                </div>
            </div>
            <div className="box-main">
                <div className="products">
                    {products.map((p, index) => {
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
                            img={`http://localhost:3000/api/product/get-imgs/product_imgs/` + imageName}
                        />)
                    })}
                </div>
            </div>
        </>
    )
}
export default ProductsPage;