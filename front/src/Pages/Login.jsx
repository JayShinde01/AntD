// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message, Card } from "antd";
import Logo from "../components/Logo";
import styles from "../page_style/login.module.css"; // CSS module

const { Title } = Typography;

function Login() {
  const [loginid, setLoginid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginid || !password) {
      message.warning("⚠ Please enter both Login ID and Password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginid, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token);
        message.success("✅ Login successful!");
        navigate("/home", { replace: true });
      } else {
        message.error("❌ " + data.message);
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      message.error("🚨 Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.loginPageWrapper}>
      <Card className={styles.loginPageContainer} bordered>
        <div style={{ textAlign: "center" }}>
          <Logo size={100} />
        </div>

        <Title level={3} style={{ textAlign: "center" }}>
          Log in to Ambika Spare Parts
        </Title>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Login ID" required>
            <Input
              placeholder="Enter your login ID"
              value={loginid}
              onChange={(e) => setLoginid(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Password" required>
            <Input.Password
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Continue →
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
