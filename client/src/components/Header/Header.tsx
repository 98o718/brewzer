import React, { useState, useEffect } from 'react'
import {
  HeaderWrapper,
  HeaderButton,
  AvatarWrapper,
  OfflineIndicator,
} from './Header.styles'

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
} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import Avatar from 'react-avatar'

import { useAtom, useAction } from '@reatom/react'
import { userAtom, logout } from '../../model'
import { Cookies } from 'react-cookie'
import { fetchRefresh } from '../../utils'
import { useOnlineDetector } from '../../hooks'

const Header: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const user = useAtom(userAtom)
  const doLogout = useAction(logout)

  const { isOnline } = useOnlineDetector()

  const history = useHistory()

  useEffect(() => {
    history.listen(() => {
      const token = new Cookies().get('token')

      if (!token) doLogout()
    })

    if (isOnline) {
      fetchRefresh(process.env.REACT_APP_VERIFY_AUTH_URL!).then((r) => {
        if (!r.ok) {
          doLogout()
        }
      })
    }
  }, [history, doLogout, isOnline])

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
          {!isOnline && <OfflineIndicator />}
        </NavbarBrand>
        <NavbarToggler onClick={() => setToggle(!toggle)} />
        <Collapse isOpen={toggle} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/404" onClick={() => setToggle(false)}>
                Поиск рецептов
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Калькуляторы
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/404">
                  IBU
                </DropdownItem>
                <DropdownItem tag={Link} to="/404">
                  ABV
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {user !== null ? (
              <>
                <AvatarWrapper>
                  {user.avatar.startsWith('http') ? (
                    <Avatar
                      name={user.username}
                      color="lightgrey"
                      style={{ backGround: 'lightgrey' }}
                      src={user.avatar}
                      size="40"
                      round
                    />
                  ) : (
                    <Avatar name={user.avatar} size="40" round />
                  )}
                </AvatarWrapper>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{ color: 'black' }}>
                    {user.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    {isOnline && (
                      <>
                        <DropdownItem tag={Link} to="/add-recipe">
                          Добавить рецепт
                        </DropdownItem>
                        <DropdownItem divider />
                      </>
                    )}
                    <DropdownItem tag={Link} to="/my-recipes">
                      Мои рецепты
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/my-brews">
                      Мои варки
                    </DropdownItem>
                    {isOnline && (
                      <>
                        <DropdownItem divider />
                        <DropdownItem
                          onClick={() => {
                            history.push('/')
                            doLogout()
                          }}
                          style={{ color: '#dc3545' }}
                        >
                          Выход
                        </DropdownItem>
                      </>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              isOnline && (
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
              )
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </HeaderWrapper>
  )
}

export default Header
