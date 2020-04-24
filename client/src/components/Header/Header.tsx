import React, { useState, useEffect } from 'react'
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
import { Cookies } from 'react-cookie'
import { useAtom, useAction } from '@reatom/react'

import {
  HeaderWrapper,
  HeaderButton,
  AvatarWrapper,
  OfflineIndicator,
} from './Header.styles'
import { userAtom, logout } from '../../model'
import { useOnlineDetector } from '../../hooks'

const Header: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const user = useAtom(userAtom)
  const doLogout = useAction(logout)

  const { isOnline } = useOnlineDetector()

  const history = useHistory()

  useEffect(() => {
    if (isOnline) {
      const token = new Cookies().get('accessToken')

      if (!token) {
        doLogout()
      }
    }
  }, [doLogout, isOnline])

  useEffect(() => {
    history.listen(() => {
      if (isOnline) {
        const token = new Cookies().get('accessToken')

        if (!token) {
          doLogout()
        }
      }
    })
  }, [history, doLogout, isOnline, user])

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
            {isOnline && (
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/search"
                  onClick={() => setToggle(false)}
                >
                  Поиск рецептов
                </NavLink>
              </NavItem>
            )}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Калькуляторы
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  tag={Link}
                  to="/calculators/ibu"
                  onClick={() => setToggle(false)}
                >
                  IBU
                </DropdownItem>
                <DropdownItem
                  tag={Link}
                  to="/calculators/abv"
                  onClick={() => setToggle(false)}
                >
                  ABV
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {user !== null ? (
              <>
                <AvatarWrapper transparent={user.avatar.startsWith('http')}>
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
                        <DropdownItem
                          tag={Link}
                          to="/add-recipe"
                          onClick={() => setToggle(false)}
                        >
                          Добавить рецепт
                        </DropdownItem>
                        <DropdownItem divider />
                      </>
                    )}
                    <DropdownItem
                      tag={Link}
                      to="/favorites"
                      onClick={() => setToggle(false)}
                    >
                      Избранные ♥
                    </DropdownItem>
                    <DropdownItem
                      tag={Link}
                      to="/my-recipes"
                      onClick={() => setToggle(false)}
                    >
                      Мои рецепты
                    </DropdownItem>
                    <DropdownItem
                      tag={Link}
                      to="/my-brews"
                      onClick={() => setToggle(false)}
                    >
                      Мои варки
                    </DropdownItem>
                    {isOnline && (
                      <>
                        <DropdownItem divider />
                        <DropdownItem
                          tag={Link}
                          to="/settings"
                          onClick={() => setToggle(false)}
                        >
                          Настройки
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem
                          onClick={() => {
                            setToggle(false)
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
