import React from 'react';


interface DataFilterProps {
    data: {
        data: {
            userId: number;
            id: number;
            title: number;
        }[]
    }
}

export const DataFilter = ({ data }: DataFilterProps) => {
    if(data.data.length < 0) return <p>No items</p>;
    const unique = new Set(data.data.map((item) => item.userId));
    const array = Array.from(unique);

    return (
        <div>
            {array.map(item => (<p>Unique: {item}</p>))}
            <p>Total count: {array.length}</p>
        </div>
    );
};