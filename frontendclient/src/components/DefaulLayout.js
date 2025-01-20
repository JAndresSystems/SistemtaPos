import React, { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate,useNavigate } from 'react-router-dom';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import "../styles/DefaultLayout.css";
import { Button, Layout, Menu, theme,Image } from 'antd';
import CartPage from './../pages/CartPage';
import Spinner from './Spinner';





const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {

  const navigate = useNavigate();

  
  const { cartItems , loading } = useSelector((state) => state.root); // Cambiado a 'state.root'

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //to get local storage data
useEffect(()=>{

  localStorage.setItem("cartItems",JSON.stringify(cartItems))
 
},[cartItems])

  return (
    <Layout>
      {loading && <Spinner></Spinner>}
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
     <Image src=''></Image>
  <h1 className="text-center text-light font-weight-bold mt-4">NextSell</h1>
</div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Facturas</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Elementos</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Clientes</Link>
          </Menu.Item>
          <Menu.Item 
          key="logout"
           icon={<LogoutOutlined />}
          onClick={() => {
            localStorage.removeItem('auth')
            navigate("/login")
          }}
          >
            Salir
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="cart-item d-flex justify-content-space-between flex-row" 
          onClick={() =>navigate('/cart')}
          
          >
            
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
