import React, { useState } from 'react';
import { Button, Form, Image, Input, Modal, Select } from 'antd';
import { techStacks } from '../../config/constants';

const EditModal = ({ isOpen, handleOk, handleCancel, project }) => {
  const [imageUrl, setImageUrl] = useState(project.imageUrl);
  const [image, setImage] = useState(null);


  const handleSubmit = (values) => {
    handleOk(values);
  }

  const imageUpload = (file) => {
    setImageUrl(URL.createObjectURL(file));
    setImage(file);
  }

  return (
    <Modal title="Basic Modal" open={isOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose footer={null}>
      <Form
        name="basic"
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
          initialValue={project?.name}
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
          initialValue={project?.description}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Github URL"
          name="url"
          initialValue={project?.githubUrl}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Website URL"
          name="siteUrl"
          initialValue={project?.siteUrl}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="TechStacks"
          name="techStacks"
          initialValue={project?.techStacks}
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
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EditModal;
