import React, { useState, useEffect } from 'react';
import './Counter.css'; // styling
import './Counter.html';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(50); // Set a limit for the counter

    const increaseCount = () => {
        if (count < limit) {
            setCount(count + 1);
        }
    };

    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const resetCount = () => {
        setCount(0);
    };   
    
    const [history, setHistory] = useState([]);

    const addToHistory = React.useCallback((newCount) => {
        setHistory((prevHistory) => [...prevHistory, newCount]);
    }, []);

    // Removed duplicate increaseCount function


    useEffect(() => {
        const savedCount = localStorage.getItem('count');
        const savedLimit = localStorage.getItem('limit');
        if (savedCount) setCount(Number(savedCount));
        if (savedLimit) setLimit(Number(savedLimit));
    }, []);

    useEffect(() => {
        localStorage.setItem('count', count);
        localStorage.setItem('limit', limit);
        addToHistory(count);
    }, [count, limit, addToHistory]);


    useEffect(() => {
        localStorage.setItem('count', count);
    }, [count]);

    useEffect(() => {
        const savedCount = localStorage.getItem('count');
        if (savedCount) {
            setCount(Number(savedCount));
        }
    }, []);  

    const clearHistory = () => {
        setHistory([]); // Clear the history
    };


    return (
        <div class="container" > 
            <h1>Click Counter</h1>  
            <header>
                <div class="counter" style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>{count}</h2>
                </div>

                <div>
                    <button onClick={increaseCount}>+</button>
                    <button onClick={decreaseCount}>-</button>
                    <button onClick={resetCount}>Reset</button>
                    <button onClick={clearHistory} className="clear-history-button">Clear History</button>
                </div>
                {count === limit && <p>You’ve reached the maximum limit!</p>}
                <h3>{History}</h3>
                <p>{history.join(', ')}</p> {/* Display history as a comma-separated string */}

            </header>
        </div>
    );
};

export default Counter;