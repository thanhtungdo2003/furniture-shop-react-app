import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const container = () => { return <div></div> }
const ContainerStyled = styled.div`
    cursor: pointer;
    width: 100%;
    color: rgb(26, 26, 26);
    .product-item-prop{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowarp;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
`;
function ProductItem({ id, displayName, categoryName, price, img, categorySlug, totalSelled }) {
    const nav = useNavigate();

    const handlerClick = (e) => {
        nav(`/${categorySlug}/${e.currentTarget.id}`);
        window.scrollTo(0, 0); // Cuộn lên đầu trang

    }
    return (
        <>
            <ContainerStyled onClick={handlerClick} id={id}>
                <div className="product-item-img-container">
                    <img className="product-item-img" src={img} />
                </div>
                <div>
                    <div className="product-item-prop" style={{ fontSize: "18px" }}>{displayName}</div>
                    <div className="product-item-prop" style={{ fontSize: "12px", color: "#454545" }}>{categoryName}</div>
                    <div className="product-item-prop" style={{ fontSize: "16px", color: "rgb(255, 48, 1)" }}>{price.toLocaleString('de-DE')}đ</div>
                    <div className="product-item-prop" style={{ fontSize: "14px", color: "rgb(91, 91, 91)", display: "flex", justifyContent: "end" }}>{totalSelled ? totalSelled.toLocaleString('de-DE') : 0} đã bán</div>
                </div>
            </ContainerStyled>
        </>
    )
}
export default ProductItem;