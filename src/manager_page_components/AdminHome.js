import { motion } from "framer-motion";
import AdminElementContainer from "./AdminElementContainer";
import { BarChart, Gauge, LineChart, PieChart } from "@mui/x-charts";
import { gaugeClasses } from "@mui/x-charts/Gauge";
import { AlignEndHorizontal, Box, ChartBar, Coins, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUri } from "../js/site";
import { ResponsivePie } from "@nivo/pie";
function AdminHome() {

    const [revenueOfMonth, setRevenueOfMonth] = useState(0);
    const [revenueOfYear, setRevenueOfYear] = useState(0);
    const [userRegOfMonth, setUserRegOfMonth] = useState(0);
    const [userRegOfYear, setUserRegOfYear] = useState(0);
    const [aosOfMonth, setAosOfMonth] = useState([]);
    const [topCates, setToptopCates] = useState([]);
    const [amountOfOrder, setAmountOfOrder] = useState([]);
    useEffect(() => {
        // tạo khoảng thời gian tháng này
        const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 19).replace("T", " ");
        const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 19).replace("T", " ");

        // tạo khoảng thời gian năm nay
        const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 19).replace("T", " ");
        const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).toISOString().slice(0, 19).replace("T", " ");

        const monthBody = {
            start: firstDayOfMonth,
            end: lastDayOfMonth
        }
        const yearBody = {
            start: firstDayOfYear,
            end: lastDayOfYear
        }
        axios.post(getUri() + "/stats/get-revenue-by-rangeoftime", monthBody).then(res => {
            const totalPrice = res.data[0].totalPrice;
            if (totalPrice) {
                setRevenueOfMonth(Number(totalPrice));
            } else {
                setRevenueOfMonth(0);
            }
        }).catch(err => {
            console.log(err);
        });

        axios.post(getUri() + "/stats/get-revenue-by-rangeoftime", yearBody).then(res => {
            const totalPrice = res.data[0].totalPrice;
            if (totalPrice) {
                setRevenueOfYear(Number(totalPrice));
            } else {
                setRevenueOfYear(0);
            }
        }).catch(err => {
            console.log(err);
        });

        axios.post(getUri() + "/stats/get-user-reg-by-rangeoftime", monthBody).then(res => {
            const totalPrice = res.data[0].totalValue;
            if (totalPrice) {
                setUserRegOfMonth(Number(totalPrice));
            } else {
                setUserRegOfMonth(0);
            }
        }).catch(err => {
            console.log(err);
        });
        axios.post(getUri() + "/stats/get-user-reg-by-rangeoftime", yearBody).then(res => {
            const totalPrice = res.data[0].totalValue;
            if (totalPrice) {
                setUserRegOfYear(Number(totalPrice));
            } else {
                setUserRegOfYear(0);
            }

        }).catch(err => {
            console.log(err);
        });


        axios.post(getUri() + "/stats/get-amount-of-product-sale-by-rangeoftime",
            {
                ...monthBody
                , sortType: 'price'
            }).then(res => {
                const datas = res.data;
                if (datas) {
                    setAosOfMonth(datas);
                }
            }).catch(err => {
                console.log(err);
            });

        axios.post(getUri() + "/stats/get-top-cate-by-rangeoftime",
            {
                ...monthBody
                , rows: 3
                , sortType: 'price'
            }).then(res => {
                const datas = res.data;
                if (datas) {
                    setToptopCates(datas);
                }
            }).catch(err => {
                console.log(err);
            });

        axios.post(getUri() + "/stats/get-amount-of-order-by-rangeoftime", monthBody).then(res => {
            const datas = res.data[0];
            console.log(datas)
            if (datas) {
                setAmountOfOrder(datas);
            }
        }).catch(err => {
            console.log(err);
        });
    }, [])
    return (
        <>
            <div className="admin-page-header">
                <div className="admin-page-title">
                    TRANG CHỦ - THỐNG KÊ
                </div>
            </div>
            <div className="admin-home-main-container">
                <div className="admin-page-row row-header">
                    <AdminElementContainer className="item-container-admin admin-chart-header-item-container" duration={0.4}>
                        <div className="admin-chart-header-icon-container" style={{ backgroundColor: "rgb(255, 131, 29)" }}>
                            <Coins color="white" size={34} />
                        </div>
                        <div className="icon-title">Doanh thu</div>
                        <div className="admin-header-item-content">
                            <div className="params-container">
                                <label>Tháng này:</label><br />
                                <span>đ {revenueOfMonth.toLocaleString()}</span><br />
                                <label>Năm nay:</label><br />
                                <span>đ {revenueOfYear.toLocaleString()}</span>
                            </div>
                            <div className="per-container">
                                <Gauge width={110} height={110} value={(revenueOfMonth / revenueOfYear * 100).toFixed(2)}
                                    cornerRadius="50%"
                                    sx={(theme) => ({
                                        [`& .${gaugeClasses.valueText}`]: {
                                            fontSize: 29,
                                            fontWeight: "200",

                                        },
                                        [`& .${gaugeClasses.valueArc}`]: {
                                            fill: 'rgb(255, 149, 73)',
                                        },
                                        [`& .${gaugeClasses.referenceArc}`]: {
                                            fill: 'rgba(32, 32, 32, 0.09)',
                                        },
                                    })} />
                            </div>
                        </div>
                    </AdminElementContainer>
                    <AdminElementContainer className="item-container-admin admin-chart-header-item-container" duration={0.5}>
                        <div className="admin-chart-header-icon-container" style={{ backgroundColor: "rgb(44, 125, 187)" }}>
                            <User color="white" size={34} />
                        </div>
                        <div className="icon-title">Người dùng đăng ký</div>
                        <div className="admin-header-item-content">
                            <div className="params-container">
                                <label>Tháng này:</label><br />
                                <span>{userRegOfMonth}</span><br />
                                <label>Năm nay:</label><br />
                                <span>{userRegOfYear}</span><br />
                            </div>
                            <div className="per-container">
                                <span style={{ color: "rgb(52, 141, 197)" }}>{(userRegOfMonth / userRegOfYear * 100).toFixed(2)}</span><p>%</p>
                            </div>
                        </div>
                    </AdminElementContainer>
                    <AdminElementContainer className="item-container-admin admin-chart-header-item-container" duration={0.6}>
                        <div className="admin-chart-header-icon-container" style={{ backgroundColor: "rgb(79, 194, 138)" }}>
                            <Box color="white" size={34} />
                        </div>
                        <div className="icon-title">Top sản phẩm (Tháng này)</div>
                        <div className="admin-header-item-content">

                            <div className="per-container" style={{ backgroundColor: "" }}>
                                <ResponsivePie data={aosOfMonth.map((p) => (
                                    { id: p.display_name + "(" + p.product_id + ")", value: p.amount, label: p.display_name }
                                ))}
                                    arcLinkLabelsSkipAngle={10}
                                    arcLinkLabelsTextColor="#333333"
                                    arcLinkLabelsThickness={2}

                                    arcLinkLabelsColor={{ from: 'color' }}
                                    arcLabelsSkipAngle={10}
                                    innerRadius={0.2}
                                    padAngle={0.7}
                                    cornerRadius={3}
                                    activeOuterRadiusOffset={8}
                                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                    tooltip={({ datum }) => (
                                        <div
                                            style={{
                                                background: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                padding: "6px 12px",
                                                borderRadius: "4px",
                                                fontSize: "16px", // Chỉnh cỡ chữ ở đây
                                                color: datum.color,
                                                border: `1px solid ${datum.color}`,
                                            }}
                                        >
                                            <div style={{
                                                width: "10px",
                                                height: "10px",
                                                backgroundColor: datum.color
                                            }}></div> {datum.label}: {datum.value}
                                        </div>
                                    )}

                                />

                            </div>
                        </div>
                    </AdminElementContainer>
                    <AdminElementContainer className="item-container-admin admin-chart-header-item-container" duration={0.7}>
                        <div className="admin-chart-header-icon-container" style={{ backgroundColor: "rgb(87, 87, 87)" }}>
                            <AlignEndHorizontal color="white" size={34} />
                        </div>
                        <div className="icon-title">Top danh mục (doanh thu)</div>
                        <div className="admin-header-item-content">

                            <div className="per-container" style={{ backgroundColor: "" }}>
                                <PieChart
                                    series={[
                                        {
                                            data: topCates.map((c, index) => (
                                                { id: index, value: c.total_price, label: c.category_name }
                                            )),

                                            innerRadius: 10,
                                            outerRadius: 60,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                            startAngle: -45,
                                            endAngle: 225,
                                        }
                                    ]}

                                />
                            </div>
                        </div>
                    </AdminElementContainer>
                </div>
                <div className="admin-page-row row-1">
                    <AdminElementContainer className="item-container-admin admin-chart-row1-item-container revenue" duration={0.4}>
                        <div className="chart-container">
                            <LineChart

                                xAxis={[{
                                    zoom: true,
                                    data: [2, 3, 4, 5, 6, 7, 8]
                                }
                                ]}
                                series={[
                                    {
                                        data: [2, 5.5, 2, 8.5, 1.5, 3, 6],
                                    },
                                ]}
                                width={460}
                                height={220}
                                colors={["white", "white", "white", "white", "white", "white", "white"]}
                            />

                        </div>
                        <div className="chart-content">
                            <div className="item-container-title">DOANH THU TRONG TUẦN</div>

                        </div>
                    </AdminElementContainer>
                    <AdminElementContainer className="item-container-admin admin-chart-row1-item-container amount-of-order-created" duration={0.5}>
                        <div className="chart-container">
                            <BarChart
                                className="chart"
                                xAxis={[{ scaleType: 'band', data: [] }]}
                                series={
                                    [
                                        { label: "Tổng đơn hàng", data: [4] },
                                        { label: "Đơn hoàn thành", data: [1] },
                                    ]

                                }
                                colors={["rgb(255, 255, 255)", "rgb(255, 228, 91)"]}
                                width={460}
                                height={220}

                            />

                        </div>
                        <div className="chart-content">
                            <div className="item-container-title">ĐƠN HÀNG </div>

                        </div>
                    </AdminElementContainer>
                    <AdminElementContainer className="item-container-admin admin-chart-row1-item-container product-best-sale" duration={0.6}>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'series A' },
                                        { id: 1, value: 15, label: 'series B' },
                                        { id: 2, value: 20, label: 'series C' },
                                        { id: 3, value: 20, label: 'series C' },
                                        { id: 4, value: 20, label: 'series C' },
                                    ],
                                },
                            ]}
                            colors={["rgb(232, 232, 232)", "rgb(91, 181, 255)", "rgb(144, 244, 239)", "rgb(91, 214, 255)", "rgb(242, 198, 255)"]}

                            width={350}
                            height={170}
                        />
                        <div className="chart-content">
                            <div className="item-container-title">SẢN PHẨM NỔI BẬT (TUẦN)</div>

                        </div>
                    </AdminElementContainer>
                </div>
                <div className="admin-page-row row-2">
                    <AdminElementContainer className="item-container-admin admin-main-chart" duration={0.7}>

                    </AdminElementContainer>
                    <AdminElementContainer className="item-container-admin option-main-chart" duration={0.8}>

                    </AdminElementContainer>
                </div>
                <div className="admin-page-row row-3">
                    <div style={{ height: "200px" }}>

                    </div>
                </div>

            </div>
        </>
    )
}
export default AdminHome;