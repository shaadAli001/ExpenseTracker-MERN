import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/layout/Spinner";

const Register = () => {
  const img =
    "https://images.pexels.com/photos/12955547/pexels-photo-12955547.jpeg";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/v1/user/register", values);

      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Invlid Username or Pasword");
    }
  };

  // prevent Login User
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="login-page">
        {loading && <Spinner />}
        <div className="row container">
          <h1 className="text-center mb-5 expens-head">
            Expense Managment System - MERN STACK
          </h1>
          <div className="col-md-7">
            <img src={img} alt="login-img" width={"100%"} height="100%" />
          </div>
          <div className="col-md-5 login-form">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1>Register Form</h1>

              <Form.Item label="Name" name="name">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <Link to="/login"> Already reisterd? Login</Link>
                <button className="btn">Register</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
