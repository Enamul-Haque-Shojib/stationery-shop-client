import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Button, Drawer } from "antd";
import { UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { currentAuth, logout } from "../../../redux/features/auth/authSlice";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const {userData, setUserData} = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector(currentAuth);

  const handleLogOut = () => {
    dispatch(logout());
    setUserData(null);
  };

  const updateScreenSize = () => {
    setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #6a0dad, #4b0082)",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textDecoration: "none",
            color: "white",
          }}
         
        >
            <p>Stationery Shop</p>
          
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

<NavLink
                  to={`/`}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#FFD700" : "white",
                    transition: "color 0.3s",
                  })}
                >
                Home
                </NavLink>
                <NavLink
                  to={`/all-products`}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#FFD700" : "white",
                    transition: "color 0.3s",
                  })}
                >
                All Products
                </NavLink>
                <NavLink
                  to={`/about`}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#FFD700" : "white",
                    transition: "color 0.3s",
                  })}
                >
                About
                </NavLink>
            
            {auth ? (
              <>
                <NavLink
                  to={`/${auth.role}/dashboard`}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#FFD700" : "white",
                    transition: "color 0.3s",
                  })}
                >
                  Dashboard
                </NavLink>
               
                  <Avatar
                    src={userData?.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    size="large"
                    icon={<UserOutlined />}
                    style={{ cursor: "pointer" }}
                  />

                
                <Button
                type="text"
                danger
                onClick={() => {
                  handleLogOut();
                }}
              >
                Logout
              </Button>
               
              
              </>
            ) : (
              <>
                <Button
                  type="default"
                  style={{
                    backgroundColor: "#FFD700",
                    color: "black",
                    border: "none",
                    borderRadius: "20px",
                  }}
                >
                  <Link to="/register">Register</Link>
                </Button>
                <Button
                  type="default"
                  style={{
                    backgroundColor: "#FFD700",
                    color: "black",
                    border: "none",
                    borderRadius: "20px",
                  }}
                >
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        )}

        {/* Mobile Navigation Button */}
        {isMobile && (
          <Button
            style={{ fontSize: "24px", color: "white", border: "none" }}
            icon={drawerOpen ? <CloseOutlined /> : <MenuOutlined />}
            onClick={() => setDrawerOpen(!drawerOpen)}
          />
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        style={{ zIndex: 1050 }}
        styles={{
          body: { padding: "20px" }, // Corrected usage of `styles.body`
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <NavLink
                to={`/`}
                style={{ fontSize: "16px", textDecoration: "none", color: "#4B0082" }}
                onClick={() => setDrawerOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to={`/all-products`}
                style={{ fontSize: "16px", textDecoration: "none", color: "#4B0082" }}
                onClick={() => setDrawerOpen(false)}
              >
                All Products
              </NavLink>
              <NavLink
                to={`/about`}
                style={{ fontSize: "16px", textDecoration: "none", color: "#4B0082" }}
                onClick={() => setDrawerOpen(false)}
              >
                About
              </NavLink>
          {auth ? (
            <>
            <Avatar
                   src={userData?.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    size="large"
                    icon={<UserOutlined />}
                    style={{ cursor: "pointer" }}
                  />
             
              <NavLink
                to={`/${auth.role}/dashboard`}
                style={{ fontSize: "16px", textDecoration: "none", color: "#4B0082" }}
                onClick={() => setDrawerOpen(false)}
              >
                Dashboard
              </NavLink>
              <Button
                type="text"
                danger
                onClick={() => {
                  handleLogOut();
                  setDrawerOpen(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                type="default"
                block
                style={{
                  backgroundColor: "#FFD700",
                  color: "black",
                  border: "none",
                  borderRadius: "20px",
                }}
                onClick={() => setDrawerOpen(false)}
              >
                <Link to="/register">Register</Link>
              </Button>
              <Button
                type="default"
                block
                style={{
                  backgroundColor: "#FFD700",
                  color: "black",
                  border: "none",
                  borderRadius: "20px",
                }}
                onClick={() => setDrawerOpen(false)}
              >
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
