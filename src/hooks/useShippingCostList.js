import React, { useEffect, useState } from 'react';

const useShippingCostList = () => {
    const [shippingCost, setShippingCost] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/api/shipping-getAll`)
        .then(res => res.json())
        .then((data) => {
            setShippingCost(data)
        })
        .catch((error) => error.massage)
    })
    return [shippingCost]
};

export default useShippingCostList;