import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

import ChatHeader from './ChatHeader';
import Message from './Message';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';

import './Chat.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

function Chat() {

    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
            db.collection('channels').doc(channelId).collection('messages').
            orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
        }
    }, [channelId])

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('channels').doc(channelId).collection('messages').add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput('');
    }

    return (
        <div className="chat">
            <ChatHeader 
                channelName={channelName}
            />

            <div className="chat__messages">
                {messages.map((message) => (
                    <Message 
                        user={message.user}
                        message={message.message}
                        timestamp={message.timestamp}
                    />
                ))}
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input 
                        value={input}
                        onChange={ event => setInput(event.target.value)}
                        placeholder={channelId ? `Message #${channelName}` : `Please Select a Channel to Message`} 
                        disabled={!channelId}
                    />
                    <button 
                        disabled={!channelId}
                        type="submit" 
                        className="chat__inputButton"
                        onClick={sendMessage}
                    >Send Message</button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
