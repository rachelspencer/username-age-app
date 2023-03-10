import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';
import classes from './AddUser.module.css';

const AddUser = (props) => {
    const nameImputRef = useRef();
    const ageImputRef = useRef();

    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameImputRef.current.value;
        const enteredUserAge = ageImputRef.current.value;

        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-emty values).'
            });
            return; 
        }
        if (+enteredUserAge < 1) {
            setError ({
            title: 'Invalid age',
            message: 'Please enter a valid age (> 0).'
        });
            return;
        }
        props.onAddUser(enteredName, enteredUserAge);
        nameImputRef.current.value = '';
        ageImputRef.current.value = '';
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Wrapper>
            {error && 
                <ErrorModal 
                    title={error.title} 
                    message={error.message} 
                    onConfirm={errorHandler} 
                />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input 
                        id= "username" 
                        type="text" 
                        ref={nameImputRef}
                />
                <label htmlFor="age">Username</label>
                <input 
                    id= "age" 
                    type="number" 
                    ref={ageImputRef}
                />
                <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
};

export default AddUser;