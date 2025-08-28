// src/pages/SignUp.jsx
import React, { useContext, useState } from 'react';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from '../page_style/login.module.css';
import Logo from '../components/Logo';

const { Title, Text } = Typography;

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { signUpUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      const res = await signUpUser(email, password);
      if (res?.user) {
        setAlert({ type: 'success', message: 'Account created successfully!' });
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setAlert({ type: 'error', message: 'Signup failed. Try again!' });
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: 'error', message: 'Signup failed. Try again!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupPageWrapper}>
      <Card
        className={styles.signupPageContainer}
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          padding: '32px 24px',
          background: 'rgba(255,255,255,0.95)',
          maxWidth: 400,
          margin: '0 auto',
        }}
      >
         <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Logo size={120} />
        </div>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24, color: '#2a5298' }}>
          Create Account ✨
        </Title>

        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            showIcon
            closable
            onClose={() => setAlert(null)}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email!' },
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
              Sign Up
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Text type="secondary">
              Already registered?{' '}
              <Link to="/login" style={{ fontWeight: 600, color: '#2a5298' }}>
                Sign In
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default SignUp;
