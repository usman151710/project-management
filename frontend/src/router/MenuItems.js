import { Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export const menuItems = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: <Link to={'/dashboard/projects/create'}>Create Project</Link>,
    },
    {
        key: '2',
        icon: <UserOutlined />,
        label: <Link to={'/dashboard/projects/all'}>Current Projects</Link>,
    },
    {
        key: '3',
        element: (<Typography.Text style={{ color: 'black' }}>Create</Typography.Text>),
        icon: <UserOutlined />,
        label: <Link to={'/dashboard/projects/archived'}>Archived Projects</Link>,
    },
    {
        key: '4',
        element: (<Typography.Text style={{ color: 'black' }}>Create</Typography.Text>),
        icon: <UserOutlined />,
        label: <Link to={'/dashboard/projects/completed'}>Completed Projects</Link>,
    },
];