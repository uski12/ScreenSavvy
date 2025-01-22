import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
background: #000000;
height: 50px;
display: flex;
justify-content: space-between;
padding-left: 10%;
padding-top: 10px;
padding-bottom: 10px;
z-index: 12;
font-size: 28px;
font-family: sans-serif;
font-variant: all-small-caps;
font-weight: bold;
`;

export const NavLink = styled(Link)`
color: #e4e4e4;
display: flex;
align-items: center;
text-decoration: none;
padding: 2rem;
height: 100%;
cursor: pointer;
&.active {
    color: #82b58d;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;

`;
