import React from 'react';


const TodoWriting = () => {

  const handleTodoPost = (event) =>{
      
     event.preventDefault()
      
     const inputData={
        todo: event.target.todo.value,
     }

     fetch(`http://localhost:5000/postData`,{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(inputData)  
     })
     .then(res => res.json())
     .then(data => {
       if(data.acknowledged === true){
        event.target.reset("")
       }
       console.log(data)
     })
     .catch(e => console.log(e))


  }

  return (

    <div className='my-10'>

      <h1 className='text-center text-3xl font-semibold my-10'> Todo list here </h1>
        
       <form onSubmit={handleTodoPost} className='flex justify-center'>          
           
           <input name='todo' type="text" placeholder="Type here" className="input input-bordered rounded-e-none w-4/6 lg:w-1/2 font-semibold" required />

           <button type='submit' className='btn-ghost px-3 py-1 bg-blue-400 text-white hover:text-black font-bold'> Todo Add </button>
           
       </form>

    </div>

  );

};

export default TodoWriting;