import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';


const useGetByIdCatagory = (_id) => {
    // const {_id} = useParams()
    const [idByCategoryData, setIdByCategoryData] = useState({}) 
    const [loading, setLoading] = useState(false)
    // console.log(idByCategoryData)
    useEffect(()=> {
        fetch(`http://localhost:5000/api/category/${_id}`)
        .then(result => result.json())
        .then(data => { setIdByCategoryData(data); setLoading(false);  })
    }, [])
    return {idByCategoryData, loading}

};

export default useGetByIdCatagory;