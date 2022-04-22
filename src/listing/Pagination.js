import React, {useState, useEffect} from 'react';

const Pagination = ({showPerPage, onPaginationChange,total}) => {

    const [counter,setCounter] = useState(1);
    const[numberOfButtons] = useState(Number(Math.ceil(total/showPerPage)))

    // eslint-disable-next-line
    useEffect(() => {
        const value = showPerPage * counter;
        onPaginationChange(value-showPerPage, value);
    },[counter]);

    const onButtonClick = (type) => {
        if(type === "prev"){
            if(counter === 1){
                setCounter(1)
            }else{
                setCounter(counter-1)
            }
        }else if(type === "next"){
            if(numberOfButtons === counter){
                setCounter(counter)
               
            }else{
                setCounter(counter+1)
            }
        }
    }

    return (
        <div className="d-flex justify-content-between ml-4">
            <button className="btn btn-primary" onClick={() => onButtonClick("prev")}>
                Previous
            </button>
            <button className="btn btn-primary" onClick={() => onButtonClick("next")}>
                Next
            </button>
        </div>
    );
};

export default Pagination;