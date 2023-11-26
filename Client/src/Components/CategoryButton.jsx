import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Search.css'

export default function CategoryButton({category}) {
    const navigate = useNavigate();

    return <button
        onClick={ () => {navigate("/services/category=" +  category +"/query=");}}
        className="text-[25px] w-[250px] p-[15px] h-[250px] m-[25px] rounded-xl backgroundBlue font-bold">
            <p>{category}</p>
    </button>
}