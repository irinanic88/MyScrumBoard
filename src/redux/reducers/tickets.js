import {
    CREATE_TICKET, 
    CHANGE_TICKET_STATUS,
    DELETE_TICKET, 
    LOAD_TICKETS, 
    SUCCESS, 
} from '../actionTypes';
import {stringifyId, stringifyAll,arrToMap, deleteKey} from '../utils';

const tickets = (state = {}, action) => {
    const {
        type,
        data,
        ticketId,
        boardId,
        destination
    } = action;

    switch(type) {
        case LOAD_TICKETS + SUCCESS: {
            const loadedTickets = stringifyAll(data);
            return {...state, [boardId]: { ...arrToMap(loadedTickets)}};
        }
        case CREATE_TICKET + SUCCESS: {
            const newTicketData = stringifyId(data);
            return {
                ...state, [boardId]: {
                    ...state[boardId], [newTicketData.id]: newTicketData
                }
            }
        }
        case CHANGE_TICKET_STATUS + SUCCESS: {

            return {...state, [boardId]: {
                ...state[boardId], [ticketId]: {
                        ...state[boardId][ticketId],
                        status: destination.droppableId,
                    }
                }};
        }
        case DELETE_TICKET + SUCCESS: {

            return {...state, [boardId]:{
                ...deleteKey(state[boardId], ticketId)
            }}

        }

        default:
            return state;
    }
};

export default tickets;

