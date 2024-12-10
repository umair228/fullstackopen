import { useState } from 'react';

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value, suffix }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>
                {value} {suffix}
            </td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const average = total === 0 ? 0 : (good - bad) / total;
    const positive = total === 0 ? 0 : (good / total) * 100;

    if (total === 0) {
        return <p>No feedback given</p>;
    }

    return (
        <table>
            <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average.toFixed(2)} />
            <StatisticLine text="positive" value={positive.toFixed(2)} suffix="%" />
            </tbody>
        </table>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button onClick={() => setGood(good + 1)} text="good" />
                <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
                <Button onClick={() => setBad(bad + 1)} text="bad" />
            </div>
            <h2>statistics</h2>

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;