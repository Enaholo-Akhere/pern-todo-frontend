import axios from 'axios';
const api_string_prod = 'https://pern-todo-backend.vercel.app/todos';
const api_string_dev = 'http://localhost:5000/todos';
const api = import.meta.env.PROD ? api_string_prod : api_string_dev;

const addTodos = async (description) => {
  console.log('description', description, 'api', api);
  try {
    const { data: added_todo } = await axios.post(api, { description });
    console.log('added todo', added_todo);
    return { added_todo };
  } catch (err) {
    return err;
  }
};

const getAllTodos = async () => {
  try {
    const { data: result } = await axios.get(api);
    return { result };
  } catch (err) {
    return err;
  }
};

const getTodoById = async (id) => {
  try {
    const todoById = await axios.get(`${api}/${id}`);
    return todoById;
  } catch (error) {
    console.log('error', error);
  }
};

const editTodo = async (id, description) => {
  try {
    const { data: result } = await axios.put(`${api}/${id}`, { description });
    return { result };
  } catch (error) {
    console.log('error', error);
  }
};

const deleteTodo = async (id) => {
  try {
    const result = await axios.delete(`${api}/${id}`);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export { addTodos, getAllTodos, getTodoById, editTodo, deleteTodo };
