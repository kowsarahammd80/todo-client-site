import React from 'react';
import useTodoList from '../Hooks/useTodoList';
import TodoListShow from './TodoListShow';

const TodoList = () => {

  const [todoLists, loading] = useTodoList()

  if(loading){
    return <h1>Loading...</h1>
  }

  return (

    <div className='flex justify-center'>

       
       <div className='w-5/6 lg:w-1/2'>
          
       {
         [...todoLists].reverse().map(todoList => <TodoListShow
          key={todoList._id} todoList = {todoList}
         />)
       }
          
          
        </div>

    </div>
     
  );

};

export default TodoList;