import React, { useEffect, useState } from 'react';

const useRegisterCusmotems = () => {
    const [registecustomers, setRegisCustomes] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/api/users/by-createBy?createBy=client`)
        .then(res => res.json())
        .then(data => {
            setRegisCustomes(data.users)
        })
        .catch((error) => error.massage)
    }, [])
    return [registecustomers]
};

export default useRegisterCusmotems;