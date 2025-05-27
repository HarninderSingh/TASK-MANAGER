import React, { useRef, useEffect } from 'react';

function TaskInput({ taskText, setTaskText, handleAddTask }) {
    const inputRef = useRef(null);

    // Focus input on first mount
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="mb-4">
            <h3 className="mb-4 title-green">Add New Task</h3>
            <div className="input-group mb-3">
                <input
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    placeholder="Enter a new task"
                    value={taskText}
                    onChange={e => setTaskText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddTask()}
                />
                <button className="btn btn-green" type="button" onClick={handleAddTask}>
                    Add Task
                </button>
            </div>
        </div>
    );
}

export default TaskInput;
