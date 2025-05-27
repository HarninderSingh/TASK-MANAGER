import React, { useEffect, useRef, useState } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null); // store timer ID

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSeconds((s) => s + 1);
        }, 1000);

        // Cleanup on unmount
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="text-center mt-4">
            <h5>Task Timer: {seconds} seconds</h5>
        </div>
    );
}

export default Timer;
