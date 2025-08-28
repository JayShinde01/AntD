// src/pages/Login1.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { AuthContext } from '../context/AuthContext';
import Logo from '../components/Logo';
import styles from '../page_style/login.module.css';

const { Title, Text } = Typography;

function Login1() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { user, logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;

    try {
      const result = await logIn(email, password);

      if (result?.user) {
        setAlert({ type: 'success', message: 'Login successful!' });
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setAlert({ type: 'error', message: 'Invalid credentials!' });
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: 'error', message: 'Something went wrong!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPageWrapper}>
      <Card
        className={styles.loginPageContainer}
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          padding: '32px 24px',
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Logo size={120} />
        </div>

        <Title level={3} style={{ textAlign: 'center', marginBottom: 24, color: '#2a5298' }}>
          Welcome Back 👋
        </Title>

        {alert && (
          <Alert
            style={{ marginBottom: 16 }}
            message={alert.message}
            type={alert.type}
            showIcon
            closable
            onClose={() => setAlert(null)}
          />
        )}

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Invalid email format!' },
            ]}
          >
            <Input
              placeholder="Enter your email"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="Enter your password"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{
                borderRadius: 8,
                background: 'linear-gradient(90deg, #2a5298, #1e3c72)',
                fontWeight: 600,
              }}
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Text type="secondary">
              Don’t have an account?{' '}
              <Link to="/signup" style={{ fontWeight: 600, color: '#2a5298' }}>
                Sign up here
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login1;
