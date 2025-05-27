import React, { createContext, useContext } from 'react';

const TaskStatsContext = createContext();

export function TaskStatsProvider({ tasks, children }) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const inProgress = tasks.filter(t => t.started && !t.ended && !t.completed).length;

    return (
        <TaskStatsContext.Provider value={{ total, completed, inProgress }}>
            {children}
        </TaskStatsContext.Provider>
    );
}

export const useTaskStats = () => useContext(TaskStatsContext);
