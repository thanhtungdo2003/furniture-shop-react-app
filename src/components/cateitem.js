import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "./ProductsContext";
import { LeafIcon } from "lucide-react";
function CateItem({ icon, content, id, slug }) {
    const {categorySlug, setCategorySlug} = useProduct();
    const nav = useNavigate();

    const handlerClick = (e) => {
        setCategorySlug(slug);
        nav("/" + slug);
        window.scrollTo(0, 0);
    
    }
    return (
        <>
            <div id={id} slug={slug} onClick={handlerClick} className="cate-item" style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap:"10px",
                color: "rgb(84, 84, 84)",

            }}>{content}</div>
        </>
    )
}
export default CateItem;