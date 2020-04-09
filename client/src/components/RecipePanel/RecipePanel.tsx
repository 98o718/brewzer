import React from 'react'
import { Button } from 'reactstrap'
import { BarLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPrint,
  faCopy,
  faPen,
  faTrash,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons'

import {
  RecipePanelWrapper,
  ButtonsWrapper,
  RatingWrapper,
  RatingValue,
  IconButton,
  VolumeInput,
} from './RecipePanel.styles'

type RecipePanelProps = {
  isAuthorized: boolean
  isAuthor: boolean
  canVote: boolean
  vote: (value: number) => void
  voting: boolean
  loading?: boolean
  volume: number | ''
  handleEdit: () => void
  handleDelete: () => void
  handleBrew: () => void
  handleCopy: () => void
  handlePrint: () => void
  handleShare: () => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RecipePanel = ({
  isAuthorized,
  isAuthor,
  canVote,
  vote,
  voting,
  loading = false,
  volume,
  handleEdit,
  handleDelete,
  handleBrew,
  handleCopy,
  handlePrint,
  handleShare,
  handleChange,
}: RecipePanelProps) => {
  return (
    <RecipePanelWrapper>
      {!loading && (
        <ButtonsWrapper>
          <VolumeInput
            type="number"
            value={volume}
            onChange={handleChange}
            placeholder="Объем"
          />
          {isAuthorized && (
            <>
              <Button
                outline
                color="warning"
                onClick={handleBrew}
                title="Сварить"
              >
                Сварить
              </Button>
              <IconButton onClick={handleCopy} title="Скопировать">
                <FontAwesomeIcon icon={faCopy} />
              </IconButton>
            </>
          )}
          <IconButton onClick={handlePrint} title="Напечатать">
            <FontAwesomeIcon icon={faPrint} />
          </IconButton>
          {isAuthor && (
            <>
              <IconButton onClick={handleShare} title="Скопировать ссылку">
                <FontAwesomeIcon icon={faBullhorn} />
              </IconButton>
              <IconButton onClick={handleEdit} title="Изменить">
                <FontAwesomeIcon icon={faPen} />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                color="#f44336"
                title="Удалить"
              >
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </>
          )}
        </ButtonsWrapper>
      )}
      {canVote && (
        <RatingWrapper>
          {voting ? (
            <BarLoader width="180px" />
          ) : (
            <>
              👎
              <RatingValue onClick={vote.bind(null, 0)}>1</RatingValue>
              <RatingValue onClick={vote.bind(null, 1)}>2</RatingValue>
              <RatingValue onClick={vote.bind(null, 2)}>3</RatingValue>
              <RatingValue onClick={vote.bind(null, 3)}>4</RatingValue>
              <RatingValue onClick={vote.bind(null, 4)}>5</RatingValue>
              👍
            </>
          )}
        </RatingWrapper>
      )}
    </RecipePanelWrapper>
  )
}

export default RecipePanel
