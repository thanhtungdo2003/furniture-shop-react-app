import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const StyledLogo = styled.img`
    width: 300px;
    height: 90%;
    object-fit: contain;
    border-radius: 10px;
`;
export default function Logo() {
    const nav = useNavigate();
    const handleClick = ()=>{
        nav("/")
    }
    return (
        <>
            <div style={{overflow:"hidden", width:"auto", overflow:"hidden", height:"100px", cursor:"pointer", display:"flex", alignItems:"center", padding:"10px", boxSizing:"content-box"}}>
                <StyledLogo onClick={handleClick} src="./funiture-logo.png" />
            </div>

        </>
    )
}