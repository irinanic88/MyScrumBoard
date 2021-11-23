import React from 'react';
import { connect } from 'react-redux';
import {Draggable} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import {ticketSelector} from '../../redux/selectors';

import cn from 'classnames';
import styles from './ticket.module.scss';

import {Link} from 'react-router-dom';

export let Ticket;
Ticket = ({ticketId, boardId, index, ticket}) => {

    if (ticket === undefined) {
        return null;
    }
    const {id, title} = ticket;

    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided, snapshot) => {
                const isDragging = snapshot.isDragging;
                return (
                    <Link to={`/board/${boardId}/tickets/${ticketId}`}>
                        <div
                             className={cn(styles.ticket, {[styles.ticket__isDragging]: isDragging})}
                             data-id="ticket"
                             ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                        >

                                <p className={styles.ticket__title} data-id="title">{title}</p>
                                <p className={styles.ticket__number} data-id="number">{id}</p>

                        </div>
                    </Link>
                    )
                }
            }
        </Draggable>
    );
};

Ticket.propTypes = {
    ticketId: PropTypes.string,
    boardId: PropTypes.string,
    index: PropTypes.number.isRequired,
    ticket: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
    }),
}

const mapStateToProps = (state, props) => ({
    ticket: ticketSelector(state, props),
});

export default connect(mapStateToProps) (Ticket);

//see ticketId == number,