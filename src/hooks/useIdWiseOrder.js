import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useIdWiseOrder = () => {
    const{id} = useParams()
    const [idWiseOrder, setIdWiseOrder] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/api/orders/single/${id}`)
        .then(res => res.json())
        .then(data => {
            setIdWiseOrder(data.order)
            setLoading(false)
        })
        .catch((error) => 
            error.massage
        )
    }, [])
    return {idWiseOrder, loading}
};

export default useIdWiseOrder;