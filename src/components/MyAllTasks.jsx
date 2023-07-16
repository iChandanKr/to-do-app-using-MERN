import React from 'react'

const MyAllTasks = ({ title, description, isCompleted, updateHandeler, deleteHandeler, id }) => {
    return (
        <div className='todo'>
            <div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <div>
                <input onChange={() => updateHandeler(id)} type='Checkbox' checked={isCompleted} />
                <button onClick={() => deleteHandeler(id)} className='btn' >Delete</button>
            </div>
        </div>
    )
}

export default MyAllTasks;