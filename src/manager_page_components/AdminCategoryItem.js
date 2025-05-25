import axios from "axios";
import { Delete, Edit, Save, SaveOff } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getUri } from "../js/site";
import { useManager } from "./AdminContext";
import { useState } from "react";

function AdminCategoryItem({ id, displayName, amount, slug }) {
    const nav = useNavigate();
    const [editing, toggleEdit] = useState(false);
    const [displayNames, setDisplayName] = useState(displayName);
    const clickHandle = () => {
        nav("/manager/product/" + slug);
    }
    const { trigger, onTrigger } = useManager();
    const deleteCate = () => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Xóa danh mục " + displayName,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(getUri() + "/category/delete", { categoryId: id }, { withCredentials: true }).then((res) => {
                    onTrigger(Math.floor(Math.random() * 10));
                }).catch((err) => {
                    toast.error("Lỗi khi xóa danh mục", { position: "top-right" })
                })
            }
        })
    }

    const update = () => {
        axios.put(getUri() + "/category/update/"+id, { categoryName: displayNames }, { withCredentials: true }).then((res) => {
            onTrigger(Math.floor(Math.random() * 10));
            toast.success("Sửa danh mục thành công", { position: "top-right" })

        }).catch((err) => {
            toast.error("Lỗi khi sửa danh mục", { position: "top-right" })
        })
    }
    return (<>
        <div className="category-admin-item" onClick={clickHandle}>
            <div className="category-admin-item-name">
                <input onChange={(e)=>{
                    setDisplayName(e.target.value)
                }} value={displayNames||""} disabled={!editing} style={{border:editing?"1px solid #777":"none", outline:"none"}}></input>
            </div>
            <div className="category-admin-item-amount">
                {amount}
            </div>
            <div className="category-admin-item-option">
                {editing ?
                    <>
                        <button onClick={update}><Save color="rgb(59, 207, 118)" /></button>
                        <button onClick={() => {
                            toggleEdit(!editing)
                        }}><SaveOff color="rgb(233, 59, 59)" /></button>

                    </>
                    :
                    <><button onClick={() => {
                        toggleEdit(!editing)
                    }}><Edit color="rgb(59, 128, 207)" /></button>
                        <button onClick={deleteCate}><Delete color="rgb(233, 59, 59)" /></button>

                    </>}




            </div>
        </div>
    </>)
}
export default AdminCategoryItem;