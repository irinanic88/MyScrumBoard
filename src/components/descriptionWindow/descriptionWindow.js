import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {useForm} from 'react-hook-form';
import Button from '../button';
import CloseButton from '../button/closeButton/closeButton';
import { Link } from 'react-router-dom';

import {statusesSelector, ticketSelector} from '../../redux/selectors';
import {changeStatus, deleteTicket} from '../../redux/actions';

import styles from './descriptionWindow.module.css';
import cn from 'classnames';


const DescriptionWindow = ({
    statuses,
    ticketId,
    boardId,
    ticket,
    changeStatusDispatcher,
    deleteTicketDispatcher
}) => {

    const {register, getValues} = useForm();

    if (!ticket) {
        return null;
    }

    const {status, id, title, description} = ticket;

    const handleChangeStatus = (event) => {
        event.preventDefault();
        const newStatus = getValues('status');
        return changeStatusDispatcher(newStatus);
    };

    return (
    <div className={styles.modal} data-id="descriptionWindow">
        <div className={styles.overlay} />
        <div className={styles.inner}>
            <Link to={`/board/${boardId}`}>
                <CloseButton/>
            </Link>
            <h2 className={cn(styles.element, styles.title)}>{title}</h2>
            <p className={cn(styles.element, styles.number)}>{id}</p>
            <p className={cn(styles.element, styles.description)}>{description}</p>
            <div className={styles.options}>
                <form className={cn(styles.element, styles.form)}>
                    <label className={styles.statusLabel}>Change status: </label>
                    <select {...register('status', {value: status})} className={styles.statusInput}>
                            {statuses.map((item) =>
                            <option key={item} {...register(item)}>{item}</option> 
                        )}
                    </select>
                    <button className={styles.submit} onClick={handleChangeStatus}>Submit</button>
                </form>
            </div>
            <Button name={'Delete ticket'} onClick={deleteTicketDispatcher}/>
        </div>
    </div>
    );
};

DescriptionWindow.propTypes = {
    statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
    ticketId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    ticket: PropTypes.shape({
        status: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
    }),
    changeStatusDispatcher: PropTypes.func.isRequired,
    deleteTicketDispatcher: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
    statuses: statusesSelector(state),
    ticket: ticketSelector(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
    changeStatusDispatcher: (newStatus) => dispatch(changeStatus(props.ticketId, props.boardId, newStatus)),
    deleteTicketDispatcher: () => dispatch(deleteTicket(props)),
});

export default connect(mapStateToProps, mapDispatchToProps) (DescriptionWindow);