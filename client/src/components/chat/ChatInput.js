import React from 'react';
import socket from '../chat/Socket';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
    chatArea: {
        display: 'flex',
        width: `calc(100% - 100px)`,
        position: 'absolute',
        bottom: '0px',
        paddingBottom: '10px',
        background: '#fff'
    },
    textField: {
        marginBottom: '0px!important',
        width: '100%',
        marginRight: '10px'
    },
    textInputGrid: {
        paddingLeft: '10px',
        paddingRight: '10px'
    }
}));

const useFocus = () => {
    const htmlElRef = React.useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}

const ChatInput = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [inputRef, setInputFocus] = useFocus();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const sendMessage = () => {
        if (value !== '') {
            socket.emit('chat', value);
            setValue('');
        }
        setInputFocus(true);

    }

    return (
        <div className={classes.chatArea}>
            <TextField
                id="chat-input-field"
                label="Enter your message here"
                className={classes.textField}
                multiline
                autoFocus
                inputRef={inputRef}
                rowsMax={4}
                value={value}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={sendMessage}
                endIcon={<Icon>send</Icon>}
            >
                Send
            </Button>
        </div>
    );
}

export default ChatInput;
