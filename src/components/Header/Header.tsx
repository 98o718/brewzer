import React, { useState, useEffect } from 'react'
import { HeaderWrapper, HeaderButton, AvatarWrapper } from './Header.styles'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // Button,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar'

import constants from '../../constants'

import { useAtom, useAction } from '@reatom/react'
import { authAtom, usernameAtom, avatarAtom } from '../../atoms/auth.atoms'
import { logout } from '../../actions/auth.actions'
import { useCookies } from 'react-cookie'

const Header: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const isAuth = useAtom(authAtom)
  const username = useAtom(usernameAtom)
  const avatar = useAtom(avatarAtom)
  const doLogout = useAction(logout)
  const [cookies, setCookies] = useCookies()

  useEffect(() => {
    fetch(constants.VERIFY_AUTH_URL, {
      headers: {
        Authorization: cookies.token,
      },
    })
      .then(r => {
        if (!r.ok) {
          doLogout()
        }
        return r.json()
      })
      .then(data => {
        setCookies('token', `Bearer ${data.newToken}`, { maxAge: 86400 })
      })
      .catch(e => console.error(e.message))
    //eslint-disable-next-line
  }, [])

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
            {isAuth ? (
              <>
                <AvatarWrapper>
                  {avatar.startsWith('http') ? (
                    <Avatar
                      name={username}
                      color="lightgrey"
                      style={{ backGround: 'lightgrey' }}
                      src={avatar}
                      size="40"
                      round
                    />
                  ) : (
                    <Avatar name={avatar} size="40" round />
                  )}
                </AvatarWrapper>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{ color: 'black' }}>
                    {username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/my-recipes">
                      Мои рецепты
                    </DropdownItem>
                    {/* <DropdownItem>Option 2</DropdownItem> */}
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={doLogout}
                      style={{ color: '#dc3545' }}
                    >
                      Выход
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <>
                <HeaderButton
                  color="success"
                  tag={Link}
                  to="/signin"
                  onClick={() => setToggle(false)}
                >
                  Войти
                </HeaderButton>
                <HeaderButton
                  color="primary"
                  tag={Link}
                  to="/signup"
                  onClick={() => setToggle(false)}
                >
                  Регистрация
                </HeaderButton>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </HeaderWrapper>
  )
}

export default Header
