import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignup } from "../hooks/useSignup";
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import { useEffect } from "react";

const Signup = () => {
    const { signup, error, isLoading } = useSignup();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async ({ email, password }) => await signup(email, password);

    useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    return (
        <div className="signup">
            <Row>
                <Col>
                    <Typography.Title level={3}>Signup</Typography.Title>
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
                    <Button loading={isLoading} type="primary" htmlType="submit">Signup</Button>
                </Form.Item>
            </Form>
            {error && <div className="error">{error}</div>}
            <Typography.Text>Already a user?<Link to="/login">Login</Link></Typography.Text>
        </div>
    )
}

export default Signup