import { useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, error, isLoading } = useLogin();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => await login(email, password);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="login">
      <Row>
        <Col>
          <Typography.Title level={3}>Login</Typography.Title>
        </Col>
      </Row>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 24,
          }}
        >
          <Button loading={isLoading} type="primary" htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
      {error && <div className="error">{error}</div>}
      <Typography.Text>Not a user? <Link to="/signup">Signup</Link></Typography.Text>
    </div>
  )
}

export default Login