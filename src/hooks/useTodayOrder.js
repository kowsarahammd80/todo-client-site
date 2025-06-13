import React, { useEffect, useState } from 'react';

const useTodayOrder = () => {
    const [todaysOrder, setTodayOrder] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/api/orders/orders/by-date`)
        .then(res => res.json())
        .then((data) => {
            setTodayOrder(data.orders)
        })
        .catch(error => error.massage)
    }, [])
    return [todaysOrder]
};

export default useTodayOrder;