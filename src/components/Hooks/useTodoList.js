import React, { useEffect, useState } from 'react';

const useTodoList = () => {

  const [todoLists, setTodoLists] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
      
    fetch(`http://localhost:5000/dataGet`)
    .then(res => res.json())
    .then(data => {
      setTodoLists(data)
      setLoading(false)
    })
    .catch(e => console.log(e))

  },[todoLists])

  return [todoLists, loading];

};

export default useTodoList;