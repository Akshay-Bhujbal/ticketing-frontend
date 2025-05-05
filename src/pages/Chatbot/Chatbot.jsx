import { useState } from 'react';
import styles from './Chatbot.module.css'; 
import chatIcon from '../../assets/images/chaticon.png'
import enterIcon from '../../assets/images/enter.png';


const SupportChat = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [infoRequested, setInfoRequested] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleSendMessage = () => {
    if (query.trim()) {
      const newMsg = { type: 'user', text: query };
      setMessages(prev => [...prev, newMsg]);
      setQuery('');

      if (!infoRequested) {
        setMessages(prev => [...prev, {
          type: 'system',
          text: "Please enter your name, email, and phone number below, then click Submit to raise a ticket."
        }]);
        setInfoRequested(true);
      }
    }
  };


  const handleSubmit = async () => {
    const { name, email, phone } = userInfo;
    if (!name || !email || !phone) return alert("All fields required");

    const ticketPayload = {
      title: `Support Query from ${name}`,
      description: `Query: ${messages.find(m => m.type === 'user')?.text || ''}`,
      priority: 'medium',
      assignedTo: null,
      raiserName: name,
      raiserEmail: email,
      raiserPhone: phone
    };

    try {
      const token = localStorage.getItem('token');
    
      const res = await axiosInstance.post(
        '/api/tickets',
        ticketPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      if (res.status === 200 || res.status === 201) {
        setMessages(prev => [...prev, {
          type: 'system',
          text: " Ticket raised successfully. We'll contact you soon."
        }]);
        setTicketSubmitted(true);
      } else {
        setMessages(prev => [...prev, {
          type: 'system',
          text: " Failed to raise ticket."
        }]);
      }
    
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        type: 'system',
        text: " Something went wrong. Please try again later."
      }]);
    }
    

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatBox}>
        <div className={styles.chatHeader}>
          <img src={chatIcon} alt="chaticon" />
          <h2>Hubly</h2>
        </div>
        
        <div className={styles.chatMessages}>
          {messages.map((msg, idx) => (
            <div key={idx} className={styles[msg.type]}>
              {msg.text}
            </div>
          ))}

          {infoRequested && (
            <div className={styles.contactInputs}>
              <input
                type="text"
                placeholder="Name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                disabled={ticketSubmitted}
              />
              <input
                type="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                disabled={ticketSubmitted}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                disabled={ticketSubmitted}
              />
              <button onClick={handleSubmit} disabled={ticketSubmitted}>
                {ticketSubmitted ? "Submitted" : "Thank You!"}
              </button>
            </div>
          )}
        </div>

        <div className={styles.chatInput}>
          <input
            type="text"
            placeholder="Write a message"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <img
            src={enterIcon}
            alt="Enter"
            className={styles.enterIcon}
            onClick={handleSendMessage}
          />
        </div>
      </div>

    </div>
  );
};

export default SupportChat;
