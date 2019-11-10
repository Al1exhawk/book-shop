import React from 'react';

interface Prop {
    readonly value: number,
    readonly onClick: Function
}

const PageButton: React.FC<Prop> = (props) => {
    const onclick = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick(props.value)
    }
    return (
        <div>
            <button className='pageButtton' onClick={onclick}>{props.value}</button>
        </div>
    )
}

export default PageButton;