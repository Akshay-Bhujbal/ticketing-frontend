import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Dashboard from '../pages/Dashboard/Dashboard';
import ContactCenter from '../pages/ContactCenter/ContactCenter';
import Analytics from '../pages/Analytics/Analytics';
import Chatbot from '../pages/Chatbot/Chatbot';
import Team from '../pages/Team/Team';
import Setting from '../pages/Setting/Setting';
import styles from './MainLayout.module.css'

const MainLayout = () => {
    const [selected, setSelected] = useState('dashboard');

    const getPageName = () => {
      switch (selected) {
        case 'dashboard':
          return 'Dashboard';
        case 'contact':
          return 'Contact Center';
        case 'analytics':
          return 'Analytics';
        case 'chatbot':
          return 'Chatbot';
        case 'team':
          return 'Team';
        case 'setting':
          return 'Settings';
        default:
          return 'Dashboard';
      }
    };

    const renderSection = () => {
        switch (selected) {
          case 'dashboard':
            return <Dashboard />;
          case 'contact':
            return <ContactCenter />;
          case 'analytics':
            return <Analytics />;
          case 'chatbot':
            return <Chatbot />;
          case 'team':
            return <Team />;
          case 'setting':
            return <Setting />;
          default:
            return <Dashboard />;
        }
      };

  return (
    <div className={styles.mainLayout}>
        <Sidebar selected={selected} setSelected={setSelected}/>
        <div className={styles.rightSection}>
          <h2 className={styles.pageHeader}>{getPageName()}</h2>
          <div className={styles.pageContent}>{renderSection()}</div>
        </div>
    </div>
  )
}

export default MainLayout