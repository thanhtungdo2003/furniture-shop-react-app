import axios from "axios";
import ProductCartItem from "../components/ProductCartItem";
import { QuantityProvider } from "../components/QuantityContext";

export function addProductToCart(item) {
    const rawData = localStorage.getItem("cart_shop_fashion");
    var localCart = [];
    if (rawData === undefined) {
        localCart.push({ ...item, quantity: 1 });
    } else {
        localCart = JSON.parse(localStorage.getItem("cart_shop_fashion")) || [];
    }
    const existProductIndex = localCart.findIndex((product) => product.id === item.id);
    if (existProductIndex !== -1) {
        const newQuantity = item.quantity + localCart[existProductIndex].quantity;
        if (Number(newQuantity) > 10) {
            return false;
        }
        localCart[existProductIndex].quantity = newQuantity;
    } else {
        localCart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart_shop_fashion", JSON.stringify(localCart));
    return true;
}
export function getTotalPriceCart(localCart) {
    let totalprice = 0;
    if (!localCart) return { totalprice: 0, finalPrice: 0 };
    localCart.forEach((p) => {
        totalprice += ((p.price) * p.quantity)
    })
    return { totalprice: totalprice, finalPrice: totalprice };
}
export function updateQuantityProductCartByID(id, newValue) {
    var localCart = getProductFromCart();
    const index = localCart.findIndex((p) => p.id === id)
    localCart[index].quantity = newValue;
    localStorage.setItem("cart_shop_fashion", JSON.stringify(localCart));
}
export function getProductFromCart() {
    const rawData = localStorage.getItem("cart_shop_fashion") || "null";
    var localCart = [];
    if (rawData === "null") {
        return "NONE"
    } else {
        localCart = JSON.parse(localStorage.getItem("cart_shop_fashion")) || [];
    }
    return localCart;
}
export function getLengthCart() {
    const rawData = localStorage.getItem("cart_shop_fashion") || "null";
    if (rawData !== "null") {
        return JSON.parse(localStorage.getItem("cart_shop_fashion")).length;
    } else {
        return 0;
    }
}
export function removeProductFromCart(id) {
    const rawData = localStorage.getItem("cart_shop_fashion") || "null";
    var localCart = [];
    if (rawData !== "null") {
        localCart = JSON.parse(localStorage.getItem("cart_shop_fashion")) || [];
        localCart.map((product, index) => {
            if (product.id === id) {
                localCart.pop(index, undefined)
                localStorage.setItem("cart_shop_fashion", JSON.stringify(localCart));
                window.location.reload();
            }
        })
    }
}
const uriApiTunel = "https://q96h7j3irdxh.share.zrok.io/api"; 
const uriLocal = "http://localhost:3000/api"; 
export function getUri(){ return uriLocal};
