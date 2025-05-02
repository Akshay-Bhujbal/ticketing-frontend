import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTickets();
  }, [filter, search]);

  const fetchTickets = async () => {
    try {
      const params = {};
      if (filter !== 'all') params.status = filter;
      if (search) params.search = search;
      const res = await axiosInstance.get('/api/tickets', {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'unresolved' ? 'resolved' : 'unresolved';
    try {
      await axiosInstance.patch(
        `/api/tickets/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTickets(tickets.map(t => (t._id === id ? { ...t, status: newStatus } : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const extractQuery = (desc) => {
    if (!desc) return '';
    const firstLine = desc.split('\n')[0];
    return firstLine.replace(/^.*?:\s*/i, '').trim();
  };

  const calculateTimeElapsed = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const hours = created.getHours().toString().padStart(2, '0');
    const minutes = created.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className={styles.dashboard}>
      <input
        type="search"
        placeholder="Search for ticket"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.filterButtons}>
        <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.active : ''}>
          All Tickets
        </button>
        <button onClick={() => setFilter('resolved')} className={filter === 'resolved' ? styles.active : ''}>
          Resolved
        </button>
        <button onClick={() => setFilter('unresolved')} className={filter === 'unresolved' ? styles.active : ''}>
          Unresolved
        </button>
      </div>

      <div className={styles.ticketCards}>
        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          tickets.map(ticket => (
            <div key={ticket._id} className={styles.ticketCard}>
              <div className={styles.ticketHeader}>
                <span className={styles.ticketId}>Ticket# {ticket.ticketNumber}</span>
                <span className={styles.postedTime}>
                  Posted at {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className={styles.ticketBody}>
                <span className={styles.ticketMessage}>{extractQuery(ticket.description)}</span>
                <span className={styles.timeElapsed}>{calculateTimeElapsed(ticket.createdAt)}</span>
              </div>

              <div className={styles.ticketFooter}>
                <p className={styles.raiserName}> {ticket.raiserName || 'Unknown'}</p>
                <p className={styles.raiserDetail}> {ticket.raiserPhone || 'N/A'}</p>
                <p className={styles.raiserDetail}> {ticket.raiserEmail || 'N/A'}</p>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
