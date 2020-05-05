import React from 'react'
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Form,
  Button,
  Row,
  Col,
} from 'reactstrap'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import TextareaAutosize from 'react-autosize-textarea'
import { SyncLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import {
  CommentsWrapper,
  CommentWrapper,
  CommentDate,
  IconButtom,
  AvatarWrapper,
  CommentsInput,
} from './Comments.styles'
import { CommentDescription } from '../../types'

type CommentsProps = {
  comments: CommentDescription[] | undefined
  changePage: (page: number) => void
  changeText: (e: React.ChangeEvent<HTMLInputElement>) => void
  text: string
  hidden?: boolean
  loading?: boolean
  sending?: boolean
  prevPage: number | null
  nextPage: number | null
  current: number
  last: number
  handleSubmit: () => void
  handleDelete: (id: string) => void
  author?: string
  username?: string
}

const Comments = ({
  comments,
  changePage,
  changeText,
  text,
  current,
  hidden = false,
  loading = false,
  sending = false,
  last,
  prevPage,
  nextPage,
  handleSubmit,
  handleDelete,
  author,
  username,
}: CommentsProps) => {
  return !hidden ? (
    <CommentsWrapper>
      <h2>Комментарии</h2>
      <ListGroup className="w-100 mb-4" style={{ maxWidth: 500 }}>
        {!loading ? (
          comments !== undefined && !!comments.length ? (
            comments.map((comment) => (
              <ListGroupItem
                key={comment.id}
                className="d-flex flex-row align-items-start"
              >
                <Link to={`/user/${comment.user.username}`}>
                  <AvatarWrapper>
                    {comment.user.withPhoto ? (
                      <Avatar
                        name={comment.user.username}
                        color="lightgray"
                        src={comment.user.miniAvatar}
                        size="40"
                        round
                      />
                    ) : (
                      <Avatar
                        name={comment.user.miniAvatar}
                        size="40"
                        round
                        style={{ backGround: 'lightgray' }}
                      />
                    )}
                  </AvatarWrapper>
                </Link>
                <CommentWrapper>
                  <Link to={`/user/${comment.user.username}`}>
                    {comment.user.username}
                  </Link>
                  <CommentDate>
                    {formatDistanceToNow(new Date(comment.created), {
                      locale: ru,
                      addSuffix: true,
                    })}
                  </CommentDate>
                  <span>{comment.text}</span>
                </CommentWrapper>
                {(username === author ||
                  username === comment.user.username) && (
                  <IconButtom onClick={handleDelete.bind(null, comment.id)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </IconButtom>
                )}
              </ListGroupItem>
            ))
          ) : (
            <ListGroupItem className="d-flex flex-row align-items-center justify-content-center p-4">
              Нет комментариев
            </ListGroupItem>
          )
        ) : (
          <ListGroupItem className="d-flex flex-row align-items-center justify-content-center pt-4">
            <SyncLoader color="#007aff" />
          </ListGroupItem>
        )}
        {username !== undefined && (
          <ListGroupItem className="d-flex flex-row align-items-center justify-content-center pt-4">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Row form>
                <Col>
                  <FormGroup className="d-flex flex-row align-items-center justify-content-center">
                    <CommentsInput
                      type="textarea"
                      spellCheck={false}
                      name="description"
                      tag={TextareaAutosize}
                      id="description"
                      placeholder="Комментарий"
                      onChange={changeText}
                      value={text}
                    />
                  </FormGroup>
                </Col>
                <Col className="d-flex flex-row justify-content-center">
                  <FormGroup>
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                      disabled={sending}
                    >
                      Добавить
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ListGroupItem>
        )}
      </ListGroup>
      {comments !== undefined && !!comments.length && (
        <Pagination aria-label="Comments navigation">
          <PaginationItem>
            <PaginationLink
              first
              tag="button"
              onClick={changePage.bind(null, 1)}
            />
          </PaginationItem>

          {prevPage !== null && (
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={changePage.bind(null, prevPage)}
              >
                {prevPage}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem active>
            <PaginationLink
              tag="button"
              onClick={changePage.bind(null, current)}
            >
              {current}
            </PaginationLink>
          </PaginationItem>
          {nextPage !== null && (
            <PaginationItem>
              <PaginationLink
                tag="button"
                onClick={changePage.bind(null, nextPage)}
              >
                {nextPage}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              last
              tag="button"
              onClick={changePage.bind(null, last === undefined ? 1 : last)}
            />
          </PaginationItem>
        </Pagination>
      )}
    </CommentsWrapper>
  ) : (
    <></>
  )
}

export default Comments
