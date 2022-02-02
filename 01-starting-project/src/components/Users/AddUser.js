import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {

  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // }

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // }


  const addUserHandler = (event) => {
    event.preventDefault();
    const nameEntered = nameInputRef.current.value;
    const ageEntered = nameInputRef.current.value;
    if (nameEntered.trim().length === 0 || ageEntered.trim().length === 0) {
      setError({
        title: 'Invalid Input',
        message: 'Please Enter a valid Input (Non-Empty Values).'
      });
      return;
    }
    if (+ageEntered < 1) {
      setError({
        title: 'Invalid Age',
        message: 'Age must be greater than 0 (A Positive Value).'
      });
      return;
    }
    props.onAddUser(nameEntered, ageEntered);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    // setEnteredUsername('');
    // setEnteredAge('');
  }
  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler} />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username" >Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;