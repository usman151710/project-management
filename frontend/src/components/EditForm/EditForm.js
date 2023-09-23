import React, { useState } from 'react';
import { Button, Form, Image, Input, Select } from 'antd';
import { techStacks } from '../../config/constants';
import { updateProjectAPI } from '../../services/projects';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProjectsContext } from '../../hooks/useProjectsContext';

const EditForm = ({ project, modalClose }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const { user } = useAuthContext();
  const { dispatch } = useProjectsContext();
  const formInitialValues = {
    name: project.name || "",
    description: project.description || "",
    githubUrl: project.githubUrl || "",
    siteUrl: project.siteUrl || "",
    techStacks: project.techStacks ? project.techStacks.split(",") : [],
  }

  const handleSubmit = async (values) => {

    if (!imageFile) {
      setError("Please select Image..");
      return;
    }

    setIsLoading(true)

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

    try {
      const response = await updateProjectAPI(project._id, data, user.token);
      const json = await response.json();
      if (response.ok) {
        setError(null);
        modalClose()
        dispatch({ type: "UPDATE_PROJECT", payload: json });
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  const imageUpload = (file) => {
    setImageUrl(URL.createObjectURL(file));
    setImageFile(file);
  }

  return (
    <>
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
        preserve={false}
        initialValues={formInitialValues}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your project Name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Github URL"
          name="githubUrl"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Website URL"
          name="siteUrl"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="TechStacks"
          name="techStacks"
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
            fallback='https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg'
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
    </>
  );
};
export default React.memo(EditForm);
