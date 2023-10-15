import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { deleteTodo as deleteTodoApi } from '../api/api';

const ListTodos = ({
  data,
  loading,
  setDelResp,
  setLoading,
  setEditTodo,
  setSwitchOp,
  setId,
  id: editID,
}) => {
  //delete todos
  const deleteTodo = async (id) => {
    setDelResp(true);

    const result = await deleteTodoApi(id);
    if (result) {
      setDelResp(data.message);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  //delete todo
  if (loading) return <p>loading...{String(loading)}</p>;
  return (
    <Fragment>
      {data && (
        <table className='table mt-5 text-center'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <button
                    disabled={todo.todo_id === editID}
                    className='btn btn-white'
                    onClick={() => {
                      setSwitchOp(false);
                      setId(todo.todo_id);
                      setEditTodo(todo.description);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      setSwitchOp(true);
                      deleteTodo(todo.todo_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};
ListTodos.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  setDelResp: PropTypes.func,
  setLoading: PropTypes.func,
  setEditTodo: PropTypes.func,
  setSwitchOp: PropTypes.func,
  setId: PropTypes.func,
  id: PropTypes.number,
};

export default ListTodos;
