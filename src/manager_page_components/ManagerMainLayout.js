import { ArrowLeft, Box, ChartArea, Home, LogOut, PanelTopOpen, Settings, UserCog2, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AdminProvider } from "./AdminContext";
import '../admin_page.css'

function ManagerMainLayout() {
    const [selectedId, setSelectedId] = useState(2);


    const nav = useNavigate();
    const menuItems = [
        { page: "/manager/", id: 2, icon: <><Home color="rgb(63, 63, 63)" size={"30px"} /><div> Trang chủ</div></>, name: "Box" },
        { page: "/manager/product", id: 3, icon: <><Box color="rgb(63, 63, 63)" size={"30px"} /><div> Sản phẩm</div></>, name: "Box" },
        { page: "/manager/users", id: 4, icon: <><Users2 color="rgb(63, 63, 63)" size={"30px"} /><div> Người dùng</div></>, name: "Staff" },
        { page: "/manager/orders", id: 5, icon: <><PanelTopOpen color="rgb(63, 63, 63)" size={"30px"} /><div> Đơn hàng</div></>, name: "Order" },
        //{ id: 6, icon: <ChartArea color="rgb(63, 63, 63)" size={"50%"} />, name: "Chart" },
        { id: 8, icon: <><Settings color="rgb(63, 63, 63)" size={"30px"} /><div> Cài đặt</div></>, name: "Settings" }
    ];
    return (
        <>
            <ToastContainer />
            <AdminProvider>
                <div id="container" className="admin-container">

                    <div style={{ display: "flex", width: "100%", height: "auto", gap: "1%" }}>
                        <div className="left-menu">
                            <div>
                                <div className="left-menu-item" onClick={() => { nav("/") }}>
                                    <ArrowLeft color="rgb(63, 63, 63)" size={"30px"} /><div>Trở về</div>
                                </div>
                            </div>
                            <div>
                                {menuItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`left-menu-item ${selectedId === item.id ? "active" : ""}`}
                                        onClick={() => { nav(item.page); setSelectedId(item.id) }}>
                                        {item.icon}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="left-menu-item">
                                    <LogOut color="rgb(252, 84, 84)" size={"30px"} /><div style={{color:"red"}}>Đăng xuất</div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-main-container">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </AdminProvider>
        </>
    )
}
export default ManagerMainLayout;