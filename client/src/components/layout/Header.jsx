import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import{UserOutlined} from "@ant-design/icons";
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoginUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    message.success("Logout Succesful");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light p-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Expense Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item m-auto fw-bold fs-5">
                <UserOutlined className="fs-4 mx-2"/>
                {loginUser && loginUser.name}
              </li>
              <li className="nav-item">
                <button className="btn btn-danger mx-5" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
