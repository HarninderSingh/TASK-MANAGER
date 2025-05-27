import React from 'react';

function formatTime(timestamp) {
    if (!timestamp) return '--';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
}

function formatDuration(ms) {
    if (!ms) return '--';
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const remSec = sec % 60;
    return `${min}m ${remSec}s`;
}

function TaskList({ tasks, startTask, endTask, deleteTask }) {
    if (tasks.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4">
                No tasks yet. Add a task to get started!
            </div>
        );
    }

    return (
        <div className="row g-3">
            {tasks.map(task => (
                <div className="col-md-6 col-lg-4" key={task.id}>
                    <div className={`card shadow-sm h-100 ${task.completed ? 'border-success' : ''}`}>
                        <div className="card-body d-flex flex-column">
                            <h5 className={`card-title mb-2 ${task.completed ? 'text-success text-decoration-line-through' : ''}`}>
                                {task.text}
                            </h5>
                            <div className="mb-2">
                                {task.started && !task.ended && (
                                    <span className="badge bg-info me-1">Started</span>
                                )}
                                {task.ended && (
                                    <span className="badge bg-secondary me-1">Ended</span>
                                )}
                                {task.completed && (
                                    <span className="badge bg-success">Completed</span>
                                )}
                            </div>
                            <div className="mb-2 small">
                                <div>Started: {formatTime(task.startTime)}</div>
                                <div>Ended: {formatTime(task.endTime)}</div>
                                <div>Time Taken: {formatDuration(task.timeTaken)}</div>
                            </div>
                            <div className="mt-auto d-flex gap-2">
                                {!task.completed && (
                                    <>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => startTask(task.id)}
                                            disabled={task.started}
                                        >
                                            Start
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => endTask(task.id)}
                                            disabled={!task.started || task.ended}
                                        >
                                            End
                                        </button>
                                    </>
                                )}
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;