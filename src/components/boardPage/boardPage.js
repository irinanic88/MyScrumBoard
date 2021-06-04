import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import { useHistory, Link } from 'react-router-dom';
import Board from '../board';
import Loader from '../loader';
import CreateTicketWindow from '../createTicketWindow';
import Button from "../button/button";

import {
    ticketIdSelector,
    loadingSelector,
    boardInfoSelector
} from '../../redux/selectors';
import {checkBoardId} from "../../redux/actions";

import styles from './boardPage.module.css';
import DescriptionWindow from "../descriptionWindow";

export let BoardPage;
BoardPage = ({match,
                 createTicket,
                 boardInfo,
                 checkBoardIdDispatch,
                 loading,
}) => {

    const requestedTicketId = match.params.ticketId;
    const requestedBoardId = match.params.boardId;
    const history = useHistory();

    useEffect(() => checkBoardIdDispatch(requestedBoardId), [checkBoardIdDispatch, requestedBoardId]);

    if (boardInfo === undefined) {
        return null;
    }
    if (boardInfo === null ) {
        history.push('/');
    }

        return (
            <div data-id="app">
                <div className={styles.header} data-id="header">
                    <h2>Board: {requestedBoardId}</h2>
                    <Link to={`/board/${requestedBoardId}/tickets/create`}>
                        <Button name={'New ticket'} onClick={() => {}}/>
                    </Link>
                </div>
                <Board boardId={requestedBoardId}/>
                {requestedTicketId ? <DescriptionWindow boardId={requestedBoardId} ticketId={requestedTicketId} /> : null}
                {createTicket ? <CreateTicketWindow boardId={requestedBoardId} /> : null}

                {loading ? <Loader /> : null}
            </div>
        );
};

const mapStateToProps = (state, props) => ({
  boardInfo: boardInfoSelector(state, props.match.params.boardId),
  ticketId: ticketIdSelector(state),
  loading: loadingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    checkBoardIdDispatch: (boardId) => dispatch(checkBoardId(boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps) (BoardPage);

