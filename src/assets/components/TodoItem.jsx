import React from 'react';

const TodoItem = ({ text, id, completed, deleteTodo, ToggleEvent }) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={() => ToggleEvent(id)} className='flex flex-1 cursor-pointer items-center'>
        {/* Toggle between tick and completed based on the completed status */}
        <img 
          src={completed ? 'images/tick.png' : 'images/not_tick.png'} 
          alt={completed ? 'Completed' : 'Incomplete'} 
          className='w-7' 
        />
        <p 
          className={`text-slate-700 ml-4 text-[17px] ${completed ? 'line-through' : ''}`}
        >
          {text}
        </p>
      </div>
      <img 
        onClick={() => deleteTodo(id)} 
        src='images/delete.png' 
        alt='Delete todo' 
        className='w-5 cursor-pointer' 
      />
    </div>
  );
};

export default TodoItem;
