import React from 'react';
import socket from '../chat/Socket';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    messagesListDiv: {
        paddingTop: '60px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
    },
    messageItem: {
        background: 'lightgrey',
        marginTop: '5px',
        marginBottom: '5px',
        borderRadius: 20,
        width: '50%'
    }
}));

const Messages = () => {
    const classes = useStyles();
    const [messages, setMessages] = React.useState([]);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    React.useEffect(() => {
        socket.on('chat', msg => {
            setMessages((messages) => [...messages, { message: msg }])
        });

        return function cleanup() {
            socket.on('chat');
        };
    }, [])  

    React.useEffect(scrollToBottom, [messages]);

    return (
        <div className={classes.messagesListDiv}>
            <List>
                {messages.map((value, index) => {
                    return ( 
                        <ListItem 
                        key={`message-${index}`} 
                        className={classes.messageItem}
                        dense
                        >
                            <ListItemText primary={value.message} />
                        </ListItem>
                    );
                })}
            </List>
            <div ref={messagesEndRef} />
        </div>
    );
}

export default Messages;
