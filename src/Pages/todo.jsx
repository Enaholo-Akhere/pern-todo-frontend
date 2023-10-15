import { Fragment, useState, useEffect } from 'react';
import InputTodos from '../components/InputTodos';
import ListTodos from '../components/ListTodos';
import EditTodo from '../components/EditTodo';
import { getAllTodos } from '../api/api';

const Todo = () => {
  const [data, setData] = useState([]);
  const [delResp, setDelResp] = useState('');
  const [reloadData, setReloadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTodo, setEditTodo] = useState('');
  const [switchOp, setSwitchOp] = useState(true);
  const [id, setId] = useState(null);

  //get todos
  const getTodos = async () => {
    setLoading(true);
    const { result } = await getAllTodos();
    if (result) {
      setLoading(false);
      setData(result.data);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, [delResp, reloadData]);

  return (
    <Fragment>
      <div className='container'>
        {switchOp ? (
          <InputTodos
            setReloadLoading={setReloadLoading}
            setEditTodo={setEditTodo}
          />
        ) : (
          <EditTodo
            editTodo={editTodo}
            id={id}
            setReloadLoading={setReloadLoading}
            setSwitchOp={setSwitchOp}
            setId={setId}
          />
        )}

        <ListTodos
          data={data}
          loading={loading}
          setLoading={setLoading}
          setDelResp={setDelResp}
          setEditTodo={setEditTodo}
          setId={setId}
          id={id}
          setSwitchOp={setSwitchOp}
        />
      </div>
    </Fragment>
  );
};

export default Todo;
