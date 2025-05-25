import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const paths = location.pathname.split("/").filter(path => path);

    return (
        <nav className="breadcrums">
            <ul className="flex space-x-2 text-gray-600" style={{
                listStyle: "none",
                display: "flex"
            }}>
                <li style={{}}>
                    <Link style={{ color: "rgb(107, 107, 107)", textDecoration: "none", fontSize: "14px", margin: "0px 5px" }} to="/" className="text-blue-500">Trang chủ</Link>
                </li>
                {paths.map((path, index) => {
                    const to = `/${paths.slice(0, index + 1).join("/")}`;
                    return (
                        <li key={to} style={{}}>
                            <span > {">"} </span>
                            <Link style={{ color: "rgb(107, 107, 107)", textDecoration: "none", fontSize: "14px", margin: "0px 5px" }} to={to} className="text-blue-500 capitalize">
                                {path.replace("-", " ")}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
