import React, { useState } from 'react'
import { HeaderWrapper, HeaderButton } from './Header.styles'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // Button,
} from 'reactstrap'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <HeaderWrapper>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
          brewzer&nbsp;
          <span role="img" aria-label="organizer">
            🗓
          </span>
          <span role="img" aria-label="beer mug emoji">
            🍺
          </span>
        </NavbarBrand>
        <NavbarToggler onClick={() => setToggle(!toggle)} />
        <Collapse isOpen={toggle} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                tag={Link}
                to="/recipes"
                onClick={() => setToggle(false)}
              >
                Рецепты
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/events" onClick={() => setToggle(false)}>
                События
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={Link} to="/blog" onClick={() => setToggle(false)}>
                Блог
              </NavLink>
            </NavItem> */}
            <HeaderButton color="success" tag={Link} to="/signin">
              Войти
            </HeaderButton>
            <HeaderButton color="primary" tag={Link} to="/signup">
              Регистрация
            </HeaderButton>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Профиль
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
        </Collapse>
      </Navbar>
    </HeaderWrapper>
  )
}

export default Header
