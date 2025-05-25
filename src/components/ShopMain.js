import { Outlet, Link } from "react-router-dom";
import Cateitem from "./cateitem";
import productIcon from "../lib/product-svgrepo-com.svg"
import { useEffect, useRef, useState } from "react";
import facebookIcon from "../lib/facebook-svgrepo-com.svg";
import zaloIcon from "../lib/zalo-svgrepo-com.svg";
import youtubeIcon from "../lib/youtube-color-svgrepo-com.svg";
import Breadcrumbs from "./Breadcrumbs";
import axios from "axios";
import { getUri } from "../js/site";
import { ProductProvider } from "./ProductsContext";
import { toast, ToastContainer } from "react-toastify";
function ShopMain() {
    
    return (
        <>
                
                <div className="main-container">
                    <div className="main-content">
                        <Outlet />
                    </div>
                </div>
        </>
    )
}
export default ShopMain;