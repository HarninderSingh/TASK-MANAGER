import React, { useReducer, useEffect, useState, useRef, useContext } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import { TaskStatsProvider } from './context/TaskStatsContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';


import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; // Add this line

// Reducer function to manage task logic
const taskReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_TASKS':
            return action.payload;
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'START_TASK':
            return state.map(task =>
                task.id === action.payload
                    ? { ...task, started: true, startTime: Date.now(), ended: false, endTime: null, timeTaken: null }
                    : task
            );
        case 'END_TASK':
            return state.map(task =>
                task.id === action.payload
                    ? {
                        ...task,
                        ended: true,
                        endTime: Date.now(),
                        completed: true,
                        timeTaken: task.startTime ? Date.now() - task.startTime : null
                    }
                    : task
            );
        case 'TOGGLE_TASK':
            // Prevent toggling if task is completed via END_TASK
            return state.map(task =>
                task.id === action.payload && !task.ended
                    ? { ...task, completed: !task.completed }
                    : task
            );
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
};

function App() {
    const [tasks, dispatch] = useReducer(taskReducer, []);
    const [taskText, setTaskText] = useState('');
    const isInitialMount = useRef(true);

    // Load tasks from localStorage once on mount
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(storedTasks) });
        }
    }, []);

    // Save tasks to localStorage when updated
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    // Add a task
    const handleAddTask = () => {
        if (taskText.trim() === '') return;
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            started: false,
            ended: false,
            startTime: null,
            endTime: null,
            timeTaken: null,
        };
        dispatch({ type: 'ADD_TASK', payload: newTask });
        setTaskText('');
    };

    // Toggle completion of task
    const toggleTaskCompletion = (id) => {
        dispatch({ type: 'TOGGLE_TASK', payload: id });
    };

    const handleStartTask = (id) => {
        dispatch({ type: 'START_TASK', payload: id });
    };

    const handleEndTask = (id) => {
        dispatch({ type: 'END_TASK', payload: id });
    };

    const deleteTask = (id) => {
        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    // Access theme context
    const { toggleTheme } = useContext(ThemeContext);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
    }, [theme]);

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg mb-4 shadow">
                <div className="container">
                    <span className="navbar-brand fw-bold">Task Manager</span>
                    <div className="d-flex align-items-center">
                        <span
                            className="ms-2 d-flex align-items-center"
                            style={{ cursor: 'pointer', color: '#fff', fontSize: '1.5rem' }}
                            onClick={toggleTheme}
                        >
                            <i className="bi bi-moon-stars-fill"></i>
                        </span>
                    </div>
                </div>
            </nav>

            <div className="full-window-container">
                <TaskStatsProvider tasks={tasks}>
                    <div className="container-fluid py-5">
                        <div className="row g-4">
                            {/* Task List and Add Task */}
                            <div className="col-lg-8 mb-4">
                                <div className="card shadow p-5 h-100 bg-white bg-opacity-75">
                                    <TaskInput
                                        taskText={taskText}
                                        setTaskText={setTaskText}
                                        handleAddTask={handleAddTask}
                                    />
                                    <TaskList
                                        tasks={tasks}
                                        startTask={handleStartTask}
                                        endTask={handleEndTask}
                                        deleteTask={deleteTask}
                                    />
                                </div>
                            </div>
                            {/* Task Summary */}
                            <div className="col-lg-4 mb-4">
                                <div className="card shadow p-5 h-100 bg-white bg-opacity-75" style={{ minWidth: 300, maxWidth: 350, margin: '0 auto' }}>
                                    <TaskStats />
                                    {/* <Timer /> */} {/* Removed Task Timer from summary */}
                                </div>
                            </div>
                        </div>
                    </div>
                </TaskStatsProvider>
            </div>

            {/* Footer */}
            <footer className="bg-light text-center text-muted py-3 mt-auto border-top">
                <div>© {new Date().getFullYear()} Smart Task Manager &mdash; Built with React & Bootstrap</div>
            </footer>
        </>
    );
}


export default App;