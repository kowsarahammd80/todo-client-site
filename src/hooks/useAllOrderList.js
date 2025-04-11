import React, { useEffect, useState } from 'react';

const useAllOrderList = () => {
    const [allOrderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        fetch(`http://localhost:5000/api/orders/all-orders`)
        .then(res => res.json())
        .then(data => {
            setOrderList(data)
            setLoading(false)
        })
    }, [])
    return[allOrderList, loading]
};

export default useAllOrderList;