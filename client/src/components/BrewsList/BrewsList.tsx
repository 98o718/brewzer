import React from 'react'
import { ListGroup, ListGroupItem, Progress } from 'reactstrap'
import { BarLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import { format, formatDistanceToNow, formatDistance } from 'date-fns'
import { ru } from 'date-fns/locale'

import {
  BrewsListWrapper,
  BrewItem,
  BrewHeader,
  IconButton,
  ButtonsWrapper,
  BrewInfoWrapper,
  BrewInfo,
  BrewComment,
} from './BrewsList.styles'
import { BrewDescription } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'

type BrewsListProps = {
  heading?: string
  showButtons?: boolean
  width?: string
  brews: BrewDescription[] | undefined
  handleDelete: (id: string) => void
  handleEdit: (id: string) => void
}

const BrewsList = ({
  heading,
  handleDelete,
  handleEdit,
  brews,
  showButtons,
  width,
}: BrewsListProps) => {
  return (
    <BrewsListWrapper style={{ width }}>
      {heading && <h2>{heading}</h2>}
      <ListGroup>
        {!brews ? (
          <BarLoader width="100%" />
        ) : brews.length > 0 ? (
          brews.map((brew, index) => {
            const brewDate = new Date(brew.brewDate)
            const bottlingDate = new Date(brew.bottlingDate)
            let percent =
              (((Date.now() - Date.parse(brew.brewDate)) /
                (Date.parse(brew.bottlingDate) - Date.parse(brew.brewDate))) *
                100) |
              0

            percent = percent >= 100 ? 100 : percent <= 0 ? 0 : percent

            return (
              <ListGroupItem
                tag={BrewItem}
                key={brew.id}
                className="d-flex flex-column justify-content-between align-items-start"
              >
                <BrewHeader>
                  <Link to={`/recipes/${brew.recipe}`}>{brew.title}</Link>
                  {showButtons && (
                    <ButtonsWrapper>
                      <IconButton
                        data-testid="edit-button"
                        onClick={handleEdit.bind(null, brew.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </IconButton>
                      <IconButton
                        data-testid="delete-button"
                        color="red"
                        onClick={handleDelete.bind(null, brew.id)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </IconButton>
                    </ButtonsWrapper>
                  )}
                </BrewHeader>

                {(brew.volume || brew.og || brew.fg) && (
                  <BrewInfoWrapper>
                    {brew.volume && <BrewInfo>{brew.volume} Л</BrewInfo>}
                    {brew.og && <BrewInfo>НП {brew.og}%</BrewInfo>}
                    {brew.fg && <BrewInfo>КП {brew.fg}%</BrewInfo>}
                  </BrewInfoWrapper>
                )}
                {brew.comment && <BrewComment>{brew.comment}</BrewComment>}
                <span>
                  Дата варки: <b>{format(brewDate, 'dd.MM.yyyy')}</b>
                </span>
                <span>
                  Дата розлива: <b>{format(bottlingDate, 'dd.MM.yyyy')}</b>
                </span>
                {percent === 100 ? (
                  <b>
                    Розлив{' '}
                    {formatDistance(bottlingDate, new Date(), {
                      locale: ru,
                      addSuffix: true,
                    })}
                  </b>
                ) : (
                  <>
                    <b>
                      Варка{' '}
                      {formatDistanceToNow(brewDate, {
                        locale: ru,
                        addSuffix: true,
                      })}
                    </b>
                    <b>
                      Розлив{' '}
                      {formatDistanceToNow(bottlingDate, {
                        locale: ru,
                        addSuffix: true,
                      })}
                    </b>
                  </>
                )}
                {percent !== 0 && (
                  <Progress
                    className="w-100 mt-2"
                    style={{ height: 25 }}
                    animated={percent < 100}
                    color={percent < 100 ? 'warning' : 'success'}
                    value={percent}
                  >
                    {percent}%
                  </Progress>
                )}
              </ListGroupItem>
            )
          })
        ) : (
          'Нет варок'
        )}
      </ListGroup>
    </BrewsListWrapper>
  )
}

export default BrewsList
