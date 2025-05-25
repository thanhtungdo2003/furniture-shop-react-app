import AdminElementContainer from "./AdminElementContainer";
import { AlertCircle, Copy, Edit, Eye, EyeOff, FilePlus, Grid2X2, Grid2X2Plus, PlusIcon, PlusSquare, Save, Search, Trash, Trash2, X, XCircle, XSquare } from "lucide-react";
import AdminCategoryItem from "./AdminCategoryItem";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getUri } from "../js/site"
import { toast, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from 'react'
import Sawl from 'sweetalert2';
import { useManager } from "./AdminContext";

const textfieldConfig = {
    inputLabel: {
        shrink: true,
    },
}

function AdminProduct() {
    const productManager = useManager();

    const [newCate, setNewCate] = useState([]);

    const [showCateaddFrom, toggleShowCateFrom] = useState(false);

    const {showProductForm, toggleProductForm} = useManager();

    const categoryAddRef = useRef();

    const [productSelect, setProductSelect] = useState([])

    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (!files) return;

        const newImages = Array.from(files).map((file) => ({
            file, // Lưu file để sau này có thể xóa
            url: URL.createObjectURL(file), // URL hiển thị ảnh
        }));

        setImages((prev) => [...prev, ...newImages]);
    };
    const handleRemoveImage = (index) => {
        setImages((prev) => {
            const updatedImages = [...prev];
            // Hủy URL để tránh rò rỉ bộ nhớ
            URL.revokeObjectURL(updatedImages[index].url);
            updatedImages.splice(index, 1); // Xóa ảnh khỏi danh sách
            return updatedImages;
        });
    };
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
        axios.post(getUri() + "/category/get-by-page", {
            row: 1000,
            page: 1
        }).then((res) => {
            setCategorys(res.data);
        })
            .catch((err) => {
                toast.error("Lỗi", { position: "top-right" })
            })
    }, [productManager.trigger]);


    useEffect(() => {
        if (productManager) {
            const product = productManager.product;
            if (product) {
                setProductSelect(product);
                setImages([]);
                const imgNames = JSON.parse(product.product_imgs);
                imgNames.forEach(item => {
                    const imgName = item.split("-")[1];
                    axios.get(getUri() + "/product/get-imgs/product_imgs/" + imgName, { responseType: 'blob' }).then((res) => {

                        const file = new File([res.data], imgName, { type: res.data.type });

                        const newImage = {
                            file: file, // Lưu blob để sau này có thể xóa
                            url: URL.createObjectURL(res.data), // URL hiển thị ảnh
                        };

                        setImages((prev) => [...prev, newImage]); // Cập nhật danh sách ảnh
                    }).catch((err) => {

                    })
                });


            }
        }
    }, [productManager.product]);

    const updateProductHandle = () => {
        const reqData = new FormData();
        Object.keys(productSelect).forEach(key => {
            reqData.append(key, productSelect[key]);
        });
        Object.values(images).map(item => item.file).forEach(file => {
            reqData.append("images", file);
        })
        axios.post(getUri() + "/product/update", reqData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            toast.success("Cập nhật thông tin sản phẩm thành công!", { position: "top-right" });
            productManager.onTrigger(Math.floor(Math.random() * 1000));
        }).catch((err) => {
            toast.error(err.status + " - Cập nhật thông tin sản phẩm thất bại", { position: "top-right" });
        })
    };
    const createProductHandle = () => {
        const reqData = new FormData();

        Object.keys(productSelect).forEach(key => {
            reqData.append(key, productSelect[key]);
        });
        Object.values(images).map(item => item.file).forEach(file => {
            reqData.append("images", file);
        })
        axios.post(getUri() + "/products-add", reqData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            toast.success("Thêm sản phẩm thành công!", { position: "top-right" });
            productManager.onTrigger(Math.floor(Math.random() * 1000));

        }).catch((err) => {
            toast.error(err.status + " - Thêm sản phẩm thất bại", { position: "top-right" });
        })
    }

    return (
        <>
            <div className="admin-page-header">
                <div className="admin-page-title">
                    Sản phẩm
                </div>
                <div className="admin-page-option">
                    <button
                        onClick={() => {
                            toggleProductForm(!showProductForm);
                        }}
                        style={{
                            display: "flex", justifyContent: "center", alignItems: "center",
                            minWidth: "100%", border: "none", outline: "none", backgroundColor: "rgb(39, 172, 79)",
                            height: "5vh", color: "white", borderRadius: "1vh", fontSize: "2vh", cursor: "pointer"
                        }}><PlusIcon color="white" size="3vh" />Thêm sản phẩm</button>
                </div>
            </div>

            <div className="admin-product-main-container">
                <div style={{ display: "flex", flex: "3", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.3}>
                        <div className="category-admin-title">
                            <div className="titles">
                                <Grid2X2 color="rgb(119, 119, 119)" size="5vh" />
                                <p style={{ fontSize: "2.6vh", width: "100%", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Danh mục</p>
                            </div>
                            <div>
                                <button onClick={(e) => {
                                    toggleShowCateFrom(prev => !prev);
                                }}><Grid2X2Plus color="rgb(255, 255, 255)" size="auto" /></button>
                            </div>

                        </div>
                        <div ref={categoryAddRef} style={{ display: showCateaddFrom ? "flex" : "none", flexDirection: "column", gap: "10px", backgroundColor: "rgba(1, 1, 1, 0.06)", padding: "10px" }}>
                            <div className="inputs" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <TextField label="Tên danh mục mới"
                                    value={newCate.category_name ?? ""}
                                    onChange={(e) => {
                                        setNewCate({ ...newCate, category_name: e.target.value });
                                    }}
                                />
                                <FormControl fullWidth style={{ flex: "1" }} >
                                    <InputLabel>Danh mục cha</InputLabel>
                                    <Select
                                        label="Danh mục cha"
                                        value={newCate.category_id_parent ?? "none"}
                                        onChange={(e) => {
                                            setNewCate({ ...newCate, category_id_parent: e.target.value }); // Cập nhật state
                                        }}
                                        slotProps={textfieldConfig}
                                    >
                                        <MenuItem
                                            disabled
                                            value={"none"}
                                        >-- danh mục cha --</MenuItem>
                                        {[...categorys].map((category, index) => (
                                            <MenuItem
                                                key={index}
                                                value={category.category_id}
                                            >{category.category_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button style={{ width: "40px", height: "40px", backgroundColor: "rgb(184, 54, 54)", display: "flex", alignItems: "center", outline: "none", border: "none", borderRadius: "10px", cursor: "pointer", justifyContent: "center" }}
                                    onClick={(e) => {
                                        toggleShowCateFrom(prev => !prev)
                                    }}><XSquare color="white" /></button>

                                <button style={{ width: "40px", height: "40px", backgroundColor: "rgb(54, 184, 74)", display: "flex", alignItems: "center", outline: "none", border: "none", borderRadius: "10px", cursor: "pointer", justifyContent: "center" }}
                                    onClick={() => {
                                        axios.post(getUri() + "/category/create", newCate).then(res => {
                                            toast.success("Tạo danh mục thành công!");
                                            productManager.onTrigger(Math.floor(Math.random() * 1000))
                                        }).catch(err => {
                                            toast.error(err.status + " Lỗi khi tạo danh mục mới")
                                        })
                                    }}
                                ><PlusSquare color="white" /></button>
                            </div>
                        </div>
                        <div className="category-admin-items">
                            {[...categorys].map((category, index) => (
                                <AdminCategoryItem
                                    key={category.category_id}
                                    id={category.category_id}
                                    slug={category.category_slug}
                                    amount={category.total_item}
                                    displayName={category.category_name + "."}
                                />
                            ))}
                            <div style={{ width: "100%", height: "30vh", background: "" }}>

                            </div>
                        </div>
                    </AdminElementContainer>
                </div>
                <div style={{ display: "flex", flex: "9", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.4}>
                        <Outlet />
                    </AdminElementContainer>
                </div>
                <div style={{ display: "flex", width: "500px", height: "70%", top: "50%", left: "50%", gap: "1%", display: showProductForm ? "flex" : "none", position: "absolute", transform: "translate(-50%, -50%)" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.5}>
                        <div className="category-admin-title">
                            <div className="titles" style={{ width: "70%" }}>
                                <AlertCircle color="rgb(119, 119, 119)" size="5vh" />
                                <p style={{ fontSize: "2.6vh", width: "100%", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Chi tiết sản phẩm</p>
                            </div>

                            <div>
                                <button onClick={createProductHandle}><PlusSquare color="rgb(255, 255, 255)" size="auto" /></button>
                                <button onClick={updateProductHandle}><Edit color="rgb(255, 255, 255)" size="auto" /></button>
                                <button style={{ backgroundColor: productSelect.status === 1 ? "rgb(217, 171, 65)" : "rgb(61, 171, 219)" }}
                                    onClick={() => {
                                        axios.post(getUri() + "/products-set-status/", {
                                            productId: productSelect.product_id,
                                            status: productSelect.status === 1 ? 0 : 1
                                        }, { withCredentials: true }).then(res => {
                                            setProductSelect({ ...productSelect, status: productSelect.status === 1 ? 0 : 1 });

                                            productManager.onTrigger(Math.floor(Math.random() * 10));

                                        }).catch(err => {
                                            console.log(err);
                                        })
                                    }}>
                                    {productSelect.status === 1 ? <EyeOff color="rgb(252, 252, 252)" size="auto" /> : <Eye color="rgb(252, 252, 252)" size="auto" />}
                                </button>
                                <button style={{backgroundColor:"red"}} onClick={()=>{
                                    toggleProductForm(!showProductForm)
                                }}><X color="rgb(255, 255, 255)" size="auto" /></button>

                            </div>
                        </div>
                        <div className="admin-product-detail-form">
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Thông tin chính
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField label="Tên sản phẩm" variant="outlined" style={{ flex: "1" }} onChange={(e) => {
                                        setProductSelect({ ...productSelect, display_name: e.target.value });
                                    }} value={productSelect.display_name} slotProps={textfieldConfig} />

                                    <FormControl fullWidth style={{ flex: "1" }} >
                                        <InputLabel>Danh mục</InputLabel>
                                        <Select
                                            label="Danh mục"
                                            value={productSelect.category_id ?? ""}
                                            onChange={(e) => {
                                                setProductSelect({ ...productSelect, category_id: e.target.value }); // Cập nhật state
                                            }}
                                            slotProps={textfieldConfig}
                                        >
                                            {[...categorys].map((category, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={category.category_id}
                                                >{category.category_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField fullWidth label="Giá (VND)" variant="outlined" type="number"
                                        slotProps={textfieldConfig}
                                        value={productSelect.price ?? ""}
                                        onChange={(e) => {
                                            setProductSelect({ ...productSelect, price: e.target.value }); // Cập nhật state
                                        }}
                                    />

                                </div>
                            </div>
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Ảnh sản phẩm (s)
                                </div>
                                <div className="admin-product-detail-row">
                                    <div className="main-image-container" onClick={(e) => { e.currentTarget.querySelector("input").click(); }}>
                                        <input type="file" style={{ display: "none" }} accept="image/*" multiple onChange={handleImageUpload} />
                                        <FilePlus size="50px" color="rgba(157, 157, 157, 0.69)" /><br />
                                        Thêm ảnh
                                    </div>

                                    <div className="image-preview-container">
                                        <div style={{
                                            display: "flex", justifyContent: "end",
                                            alignItems: "center", width: "100%",
                                        }}>
                                            <button onClick={() => {
                                                setImages([]);
                                            }} style={{
                                                display: "flex", justifyContent: "center", padding: "1vh",
                                                alignItems: "center", width: "auto", border: "none", outline: "none",
                                                backgroundColor: "rgb(222, 89, 89)", color: "white", borderRadius: "1vh"
                                                , cursor: "pointer"
                                            }}>
                                                <Trash2 size={20} color="white" />
                                            </button>
                                        </div>

                                        {images.map((img, index) => (
                                            <>
                                                <div className="image-item">
                                                    <img key={index} src={img.url} alt={`Uploaded ${index}`} />
                                                    <X className="remove-button" color="white" size={20} onClick={() => handleRemoveImage(index)} />
                                                </div>

                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Thông tin kèm (*lưu ý: xuống dòng sử dụng \n cuối hàng)
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField fullWidth label="Thông số" variant="outlined" multiline rows="4" slotProps={textfieldConfig}
                                        value={productSelect.pramaters ?? ""}
                                        onChange={(e) => {
                                            setProductSelect({ ...productSelect, pramaters: e.target.value }); // Cập nhật state
                                        }} />
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField fullWidth label="Mô tả" variant="outlined" multiline rows="6" slotProps={textfieldConfig}
                                        value={productSelect.description ?? ""}
                                        onChange={(e) => {
                                            setProductSelect({ ...productSelect, description: e.target.value }); // Cập nhật state
                                        }} />
                                </div>
                                <div className="admin-product-detail-row">
                                    <div style={{ width: "100%", display: "flex", gap: "10px", justifyContent: "end" }}>
                                        <Button onClick={() => {
                                            Sawl.fire({
                                                title: "Bạn có chắc chắn?",
                                                text: "Xóa sản phẩm " + productSelect.display_name,
                                                icon: "info",
                                                showCancelButton: true,
                                                confirmButtonText: "Xóa",
                                                cancelButtonText: "Hủy",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    axios.post(getUri() + "/products-delete", { productId: productSelect.product_id }, { withCredentials: true }).then((res) => {
                                                        productManager.onTrigger(Math.floor(Math.random() * 10));
                                                    }).catch((err) => {
                                                        toast.error("Lỗi khi xóa sản phẩm", { position: "top-right" })
                                                    })
                                                }
                                            })
                                        }} style={{ backgroundColor: "rgb(224, 49, 49)" }}><XCircle color="white" /></Button>
                                        <Button onClick={updateProductHandle} fullWidth style={{ backgroundColor: "rgb(42, 164, 52)" }}><Save color="white" /></Button>
                                    </div>
                                </div>
                                <div style={{ height: "100px" }}>

                                </div>
                            </div>

                        </div>
                    </AdminElementContainer>
                </div>
            </div>

        </>
    )
}
export default AdminProduct;