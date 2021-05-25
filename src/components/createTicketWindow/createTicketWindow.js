import React from 'react';
import {useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import Button from '../button';
import CloseButton from '../button/closeButton/closeButton';
import {closeCreateTicketModal, createTicket} from '../../redux/actions';
import cn from 'classnames';
import styles from './createTicketWindow.module.css';


const CreateTicketWindow = ({allStatuses, closeCreateTicketModal, createTicketRequest}) => {
    const {register, handleSubmit} = useForm();

    return (
        <div className={styles.modal} data-id="createTicketWindow">
            <div className={styles.overlay}></div>
            <div className={styles.inner}>
                <CloseButton onClick={closeCreateTicketModal} />
                <form className={styles.form} onSubmit={handleSubmit(createTicketRequest)}>
                    <div className={styles.formElement}>
                        <label className={styles.label}>Title:</label>
                        <input {...register('title', {required: true, maxLength: 50})} type="text" size="50" 
                        className={cn(styles.title, styles.input)} />
                    </div>
                    <div className={cn(styles.formElement, styles.description)}>
                        <label className={styles.label}>Description:</label>
                        <textarea {...register('description', {required: true})} 
                            type="text" id="create-description" size="2000" 
                            className={cn(styles.input, styles.descriptionInput)}>
                        </textarea>
                    </div>
                    <div className={styles.formElement}>
                        <label className={styles.label}>Status: </label>
                        <select className={cn(styles.statusInput, styles.input)} 
                                {...register('status', {value: allStatuses[0]})}>
                            {allStatuses.map((item) =>
                                <option className={styles.option} key={item}>{item}</option> 
                            )}
                        </select>
                    </div>
                    <div className={styles.buttons}>
                        <Button name={'Create'} onClick={() => {}}/>
                    </div>

                </form>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    closeCreateTicketModal: () => dispatch(closeCreateTicketModal),
    createTicketRequest: (ticketData) => dispatch(createTicket(ticketData)),
})

export default connect(null, mapDispatchToProps) (CreateTicketWindow);