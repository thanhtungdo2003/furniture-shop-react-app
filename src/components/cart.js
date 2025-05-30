import Button from "@atlaskit/button";
import React, { useEffect, useState } from "react";
import cartIcon from "../lib/cart-shopping-svgrepo-com.svg"
import { useNavigate } from "react-router-dom";
import { getLengthCart } from "../js/site";
import { ShoppingCart } from "lucide-react";

export default function Cart({value}) {
  const nav = useNavigate();
  const handlerClick = () => {
    nav("/cart");
  }

  return (
    <button className="cart-btn" onClick={handlerClick}
      style={{

        width: "40px",
        height: "40px",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        outline: "none",
        fontWeight: "550",
        fontSize: "14px",
        color: "rgb(156, 112, 74)",
        cursor: "pointer",
        gap: "5px",
        position: "relative"
      }}
    >
      <div style={{
        width:"20px",
        height:"20px",
        borderRadius:"50%",
        backgroundColor:"rgb(255, 53, 53)",
        color:"white",
        fontSize:"10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position:"absolute",
        top:"-8px",
        left:"30px"
      }}>
        {value}
      </div>
      <ShoppingCart/>
    </button>
  );
}