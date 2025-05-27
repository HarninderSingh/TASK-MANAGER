import React from 'react';
import { useTaskStats } from '../context/TaskStatsContext';

function TaskStats() {
    const { total, completed, inProgress } = useTaskStats();

    // Calculate percentage of tasks completed
    const percentCompleted = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="text-center" style={{ minHeight: 120 }}>
            <h5 className="mb-3 fw-bold">Task Summary</h5>
            <div className="d-flex flex-column gap-2 align-items-center">
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <span className="fs-6">Completed</span>
                    <span className="badge bg-success fs-6 px-3 py-1">{completed}</span>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <span className="fs-6">In Progress</span>
                    <span className="badge bg-warning text-dark fs-6 px-3 py-1">{inProgress}</span>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <span className="fs-6">Completed (%)</span>
                    <span className="badge bg-info text-dark fs-6 px-3 py-1">{percentCompleted}%</span>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center border-top pt-2 mt-2">
                    <span className="fs-6 text-muted">Total</span>
                    <span className="badge bg-secondary fs-6 px-2 py-1">{total}</span>
                </div>
            </div>
        </div>
    );
}

export default TaskStats;
