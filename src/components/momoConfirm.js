import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUri } from "../js/site";
import { toast } from "react-toastify";

function MomoConfim() {
    const { orderId } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        axios.post(getUri() + "/order/update-status", {
            orderId: orderId,
            status: "PAID"
        }).then(res => {
            toast.success("Thanh toán thành công! Chờ một chút");
            setTimeout(() => {
                nav("/")
            }, 1000);
        }).catch(err => {
            toast.success("Thanh toán thất bại! Vui lòng liên hệ admin");

        })
    }, [])
    return (<>
        <div style={{ width: "100%", height: "100%", backgroundColor: "black" }}>

        </div>
    </>)
}
export default MomoConfim;