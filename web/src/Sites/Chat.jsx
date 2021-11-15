import { useState, useEffect } from 'react'
import ChatContact from "../Components/ChatContact"
import engine from '../Controllers/ChatEngine'


const Chat = () => {
    const [friends, setFriends] = useState({
        data: []
    })
    const user = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        engine.get_user_friends(user.account_id, setFriends)
    }, []);

    return (
        <div>
            <div className="center">
                <div className="contacts">
                    <i className="fas fa-bars fa-2x"></i>
                    <h2>
                        Contacts
                    </h2>
                    {friends.data.map((usr, index) => (
                        <ChatContact key={index} username="aa" userimage="pic stark" badge="4" />
                    ))}
                    <div className="contact">
                        <div className="pic thor"></div>
                        <div className="name">
                            Thor Odinson
                        </div>
                        <div className="badge">
                            3
                        </div>
                        <div className="message">
                            I like this one
                        </div>
                    </div>
                    <div className="contact">
                        <div className="pic danvers"></div>
                        <div className="badge">
                            2
                        </div>
                        <div className="name">
                            Carol Danvers
                        </div>
                        <div className="message">
                            Hey Peter Parker, you got something for me?
                        </div>
                    </div>
                </div>
                <div className="chat">
                    <div className="contact bar">
                        <div className="pic stark"></div>
                        <div className="name">
                            Tony Stark
                        </div>
                        <div className="seen">
                            Today at 12:56
                        </div>
                    </div>
                    <div className="messages" id="chat">
                        <div className="time">
                            Today at 11:41
                        </div>
                        <div className="message parker">
                            Hey, man! What's up, Mr Stark? 👋
                        </div>
                        <div className="message stark">
                            Kid, where'd you come from?
                        </div>
                        <div className="message parker">
                            Field trip! 🤣
                        </div>
                        <div className="message parker">
                            Uh, what is this guy's problem, Mr. Stark? 🤔
                        </div>
                        <div className="message stark">
                            Uh, he's from space, he came here to steal a necklace from a wizard.
                        </div>
                        {/* \ */}
                    </div>
                    <div className="input">
                        <i className="fas fa-camera"></i><i className="far fa-laugh-beam"></i><input placeholder="Type your message here!" type="text" /><i className="fas fa-microphone"></i>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Chat
