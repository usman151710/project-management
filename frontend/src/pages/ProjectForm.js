import { useState } from 'react'
import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Form, Input, Button, Row, Col, Typography, Select, Image } from 'antd';
import { techStacks } from '../config/constants';
import { createProjectAPI } from '../services/projects';

const formRules = {
    name: [
        {
            required: true,
            message: 'Please input your project Name!',
        },
    ],
    description: [
        {
            required: true,
            message: 'Please input your project description!',
        },
    ],
    githubUrl: [
        {
            required: true,
            message: 'Please input your project Github Url!',
        },
    ],
    siteUrl: [
        {
            required: true,
            message: 'Please input your project Website Url!',
        },
    ],
    techStacks: [
        {
            required: true,
            message: 'Please select Tech Stacks!',
        },
    ],
    image: [
        {
            required: true
        }
    ]
}

const ProjectForm = () => {
    const [form] = Form.useForm();
    const { dispatch } = useProjectsContext();
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values) => {
        console.log('values: ', values);

        if (!user) {
            setError('you must be loggedIn');
            return;
        }

        if (!imageFile) {
            setError("Please select Image..");
            return;
        }


        let data = new FormData();

        for (const key in values) {
            if (key === "techStacks") {
                data.append(key, values[key].join(","));
            }
            else {
                data.append(key, values[key]);
            }
        }

        data.append("image", imageFile);
        console.log('data: ', data);

        try {
            setIsLoading(true)
            const response = await createProjectAPI(data, user.token);
            const json = await response.json();
            if (response.ok) {
                setError(null);
                form.resetFields()
                dispatch({ type: "CREATE_PROJECT", payload: json });
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    const imageUpload = (file) => {
        setError('')
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
    }

    return (
        <div className='project-form'>
            <Row>
                <Col>
                    <Typography.Title level={3}>Create Project</Typography.Title>
                </Col>
            </Row>
            <Form
                name="basic"
                form={form}
                style={{ marginTop: 32 }}
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
                    label="Name"
                    name="name"
                    rules={formRules.name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={formRules.description}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="URL"
                    name="githubUrl"
                    rules={formRules.githubUrl}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Website"
                    name="siteUrl"
                    rules={formRules.siteUrl}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="TechStacks"
                    name="techStacks"
                    rules={formRules.techStacks}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        options={techStacks}
                    />
                </Form.Item>
                <Form.Item
                    label="Image"
                >
                    <Image
                        preview={false}
                        width={100}
                        style={{ marginBottom: 20 }}
                        src={imageUrl}
                        fallback="https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg"
                    />
                    <input
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={(e) => imageUpload(e.target.files[0])}
                        type="file"
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 24,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={isLoading}>Submit</Button>
                </Form.Item>
            </Form>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default ProjectForm