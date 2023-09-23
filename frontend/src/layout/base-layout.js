import { useEffect, useState } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Layout, Menu, Button, Typography, Affix, notification } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// components
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { menuItems } from "../router/MenuItems";
import { getProjectsAPI } from "../services/projects";

const { Header, Sider, Content } = Layout;

const sideMenuState = {
  "/dashboard/projects/create": "1",
  "/dashboard/projects/all": "2",
  "/dashboard/projects/archived": "3",
  "/dashboard/projects/completed": "4",
}

const BaseLayout = () => {
  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [api, contextHolder] = notification.useNotification();


  useEffect(() => {
    if (location.pathname === "/") navigate('/dashboard/projects/create');
  }, [location]);

  const handleLogout = () => logout();

  const fetchProjects = async () => {
    try {
      const response = await getProjectsAPI(user.token);
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_PROJECTS', payload: json })
      }
    } catch (error) {
      api.error({
        message: error.message,
      });
    }
  }

  useEffect(() => {
    if (user) fetchProjects();
  }, [dispatch, user])

  return (
    <>
      {contextHolder}
      <Layout>
        <Affix>
          <Sider width={256} collapsed={collapsed}>
            <div className="sider-title">
              <Typography.Title style={{ color: 'white' }}>PMS</Typography.Title>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              className="sider"
              defaultSelectedKeys={sideMenuState[location.pathname]}
              items={menuItems}
            />
          </Sider>
        </Affix>
        <Layout>
          <Affix>
            <Header
              className="site-layout-background">
              <Button
                type="ghost"
                shape="circle"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
              <div>
                <span>{user.email} </span>
                <Button onClick={handleLogout} type="default" htmlType="button">Logout</Button>
              </div>
            </Header>
          </Affix>
          <Content className="layout-content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default BaseLayout