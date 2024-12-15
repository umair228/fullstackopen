const Notification = ({ message, type }) => {
    if (message === null) {
        return null;
    }

    const notificationStyle = {
        color: type === 'success' ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: 20,
        border: `3px solid ${type === 'success' ? 'green' : 'red'}`,
        padding: 10,
        marginBottom: 10,
    };

    return <div style={notificationStyle}>{message}</div>;
};

export default Notification;