import React from 'react'
import styles from './Sidebar.module.css'
import appicon from'../assets/icons/appicon.png'
import dashboardIcon from'../assets/icons/dashboard.png'
import contactIcon from'../assets/icons/contact.png'
import analyticsIcon from'../assets/icons/analytics.png'
import chatbotIcon from'../assets/icons/chatbot.png'
import teamIcon from'../assets/icons/team.png'
import settingIcon from'../assets/icons/setting.png'

const Sidebar = ({selected, setSelected}) => {
    const items = [
        {id: 'dashboard', icon: dashboardIcon, label: 'Dashboard'},
        {id: 'contact', icon: contactIcon, label: 'Contact Center'},
        {id: 'analytics', icon:analyticsIcon, label: 'Analytics'},
        {id: 'chatbot', icon: chatbotIcon, label: 'Chat bot'},
        {id: 'team', icon: teamIcon, label: 'Team'},
        {id: 'setting', icon: settingIcon, label: 'Setting'},
    ];

    return (
        <div className={styles.sidebar}>
            <img className={styles.appIcon} src={appicon} alt="appicon" />
            <div className={styles.menu}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`${styles.menuItem} ${selected === item.id ? styles.active : ''}`}
                        onClick={() => setSelected(item.id)}
                    >
                        <div className={styles.iconLabelWrapper}>
                            <img src={item.icon} alt={item.label} className={styles.icon}/> 
                            {selected === item.id && (
                                <span className={styles.label}>{item.label}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
};

export default Sidebar