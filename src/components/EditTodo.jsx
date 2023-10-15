import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { editTodo as editTodoApi } from '../api/api';

const EditInput = ({ setReloadLoading, editTodo, id, setSwitchOp, setId }) => {
  const [description, setDescription] = useState(editTodo || '');

  const onSubmit = async (e) => {
    e.preventDefault();

    const { result } = await editTodoApi(id, description);
    if (result) {
      setReloadLoading((prev) => !prev);
      setSwitchOp(true);
      setId(null);
      console.log('createTodo', result);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Edit Pern Todo</h1>

      <form className='d-flex mt-5' onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btn btn-success' type='submit'>
          Save
        </button>
      </form>
    </Fragment>
  );
};

EditInput.propTypes = {
  setReloadLoading: PropTypes.func,
  editTodo: PropTypes.string,
  id: PropTypes.number,
  setSwitchOp: PropTypes.func,
  setId: PropTypes.func,
};
export default EditInput;
