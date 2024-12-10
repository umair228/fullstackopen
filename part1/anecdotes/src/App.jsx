import { useState } from 'react';

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Display = ({ header, content, votes }) => {
    return (
        <div>
            <h1>{header}</h1>
            <p>{content}</p>
            {votes !== undefined && <p>has {votes} votes</p>}
        </div>
    );
};

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

    const generateRandomAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomIndex);
    };

    const voteForAnecdote = () => {
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
    };

    const getMostVotedAnecdote = () => {
        const maxVotes = Math.max(...votes);
        const index = votes.indexOf(maxVotes);
        return { anecdote: anecdotes[index], votes: maxVotes };
    };

    const mostVoted = getMostVotedAnecdote();

    return (
        <div>
            <Display header="Anecdote of the day" content={anecdotes[selected]} votes={votes[selected]}/>
            <Button onClick={voteForAnecdote} text="vote" />
            <Button onClick={generateRandomAnecdote} text="next anecdote" />
            <Display header="Anecdote with most votes" content={mostVoted.anecdote} votes={mostVoted.votes}/>
        </div>
    );
};

export default App;