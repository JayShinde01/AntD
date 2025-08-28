import React, { useContext, useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from '../page_style/login.module.css';

const { Title } = Typography;

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
      <div className={styles.signupPageContainer}>
        <Title level={3} style={{ textAlign: 'center' }}>Signup</Title>

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
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Link to="/">Already registered? Sign In</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Signup
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
