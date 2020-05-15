import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, navbar-nav, .nav-link{
        color: #bbb!important;

        a.hover {
            color: white;
        }

    }
`;

const NavigationBar = () => {
    return (
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/">AlSeRa</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">                       
                        <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/orders">My Orders</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/profile">Profile</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    )
}

export default NavigationBar;