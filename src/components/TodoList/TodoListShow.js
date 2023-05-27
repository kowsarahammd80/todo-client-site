import React from 'react';

const TodoListShow = ({todoList}) => {
    
  const {todo, _id} = todoList

  const handleDelete =(id)=> {
    const proceed = window.confirm('Are you sure, you want to delete your list')
    if(proceed){
      fetch(`http://localhost:5000/data/${id}`,{
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    }
  }

  return (
    <div className='flex justify-between items-center my-3 bg-purple-100 border'>
          
    <h1 className='text-xl text-purple-600 font-semibold  p-2'> {todo} </h1>

    <button onClick={() => handleDelete(_id)} className='p-1 font-semibold text-red-600'> Delete </button>
    
  </div>
  );
};

export default TodoListShow;