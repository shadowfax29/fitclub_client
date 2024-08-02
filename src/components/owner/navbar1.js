import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import gym from '../images/Screenshot_2024-07-12_185824-removebg-preview.png';
import { useDispatch } from 'react-redux';
import { logOut } from '../../actions/userActions';

function Navbar1() {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const toggle = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    dispatch(logOut())
    navigate('/login');
  }

  return (
    <div>
      <Navbar color="dark" dark expand="lg">
        <div className="container-fluid d-flex justify-content-between flex-wrap">
          <NavbarBrand>
            <img src={gym} alt="gym" width="100px" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/ownerDashBoard" className="text-light">
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/addGym" className="text-light">
                  Gym
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/members" className="text-light">
                  Members
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/addSubscription" className="text-light">
                  Subscription
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/announcement" className="text-light">
                  Announcement
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/CheckIn" className="text-light">
                  checkin
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
               {user.userName}
              </DropdownToggle>
              <DropdownMenu right>
                
                <DropdownItem>{user.role.toUpperCase()}</DropdownItem>
                <DropdownItem divider />
                <DropdownItem> <Button onClick={handleLogout} style={{ backgroundColor: "#8E3E63" }} className="btn text-light">
                  Logout
                </Button></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            

            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Navbar1;
