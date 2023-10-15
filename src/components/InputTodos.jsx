import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { addTodos } from '../api/api';

const InputTodos = ({ setReloadLoading, setEditTodo }) => {
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (description === '') {
      setMessage('description cannot be empty');
      setTimeout(() => {
        setMessage('');
        return;
      }, 3000);
    } else {
      const { added_todo } = await addTodos(description);
      if (added_todo) {
        setReloadLoading((prev) => !prev);
        setDescription('');
        setEditTodo('');
        console.log('createTodo', added_todo);
      }
    }
  };

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Pern Todo List</h1>

      <form className='d-flex mt-5' onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btn btn-success' type='submit'>
          Add
        </button>
      </form>
      <p className='text-center text-danger mt-1'>{message}</p>
    </Fragment>
  );
};

InputTodos.propTypes = {
  setReloadLoading: PropTypes.func,
  setEditTodo: PropTypes.func,
};
export default InputTodos;
