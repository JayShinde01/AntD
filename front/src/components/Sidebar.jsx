import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Drawer,
  Grid,
  Switch,
  Tooltip,
} from "antd";
import {
  HomeOutlined,
  ShoppingOutlined,
  DollarOutlined,
  UserOutlined,
  SearchOutlined,
  BarChartOutlined,
  LogoutOutlined,
  MenuOutlined,
  AppstoreOutlined,
  BulbFilled,
} from "@ant-design/icons";

import { AuthContext } from "../context/AuthContext";
import { DarkModeContext } from "../context/DarkModeContext";

import "./sidebar.css";

const { Sider } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logOut } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const screens = useBreakpoint();

  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    setIsMobile(!screens.md);
  }, [screens]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={() => isMobile && setDrawerVisible(false)}
      style={{ fontWeight: 500 }}
    >
      <Menu.Item key="/home" icon={<HomeOutlined />}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="/item" icon={<ShoppingOutlined />}>
        <Link to="/item">Products</Link>
      </Menu.Item>
      <Menu.Item key="/sales" icon={<DollarOutlined />}>
        <Link to="/sales">Sales</Link>
      </Menu.Item>
      <Menu.Item key="/customer" icon={<UserOutlined />}>
        <Link to="/customer">Customer</Link>
      </Menu.Item>
      <Menu.Item key="/search" icon={<SearchOutlined />}>
        <Link to="/search">Search</Link>
      </Menu.Item>
      <Menu.Item key="/report" icon={<BarChartOutlined />}>
        <Link to="/report">Report</Link>
      </Menu.Item>
    </Menu>
  );

  const darkToggle = (
    <div style={{ padding: "16px 24px", textAlign: "left" }}>
      <Tooltip title="Toggle Theme">
        <span style={{ color: "#fff", marginRight: 10 }}>
          <BulbFilled style={{ fontSize: 18, color: "#fadb14" }} />
        </span>
      </Tooltip>
      <Switch
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </div>
  );

  const Brand = (
    <div className="sidebar-headerbox">
      <Title level={4} className="sidebar-title" style={{ color: "#fff", margin: 0, padding: "16px 24px" }}>
        <AppstoreOutlined style={{ marginRight: 8 }} />
        Ambika Spare Parts
      </Title>
      {darkToggle}
    </div>
  );

  return (
    <>
      {isMobile ? (
        <>
          <div className="mobile-header">
            <Button
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              className="menu-toggle-btn"
              type="text"
            />
            <Title level={5} className="mobile-title">
              Ambika Spare Parts
            </Title>
          </div>

          <Drawer
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
            width={240}
            bodyStyle={{ padding: 0, background: "#001529" }}
          >
            {Brand}
            {menuItems}
            <div style={{ padding: "16px 24px", textAlign: "center" }}>
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                block
              >
                Logout
              </Button>
            </div>
          </Drawer>
        </>
      ) : (
        <Sider width={240} className="sidebar-sider">
          {Brand}
          {menuItems}
          <div style={{ padding: "16px 24px" }}>
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              block
            >
              Logout
            </Button>
          </div>
        </Sider>
      )}
    </>
  );
};

export default Sidebar;
