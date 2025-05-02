import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import styles from './Team.module.css'
import { FaEdit, FaTrash } from 'react-icons/fa';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newMember, setNewMember] = useState({
    username: '',
    phone: '+91 (000) 000-0000',
    email: '',
    role: 'member',
  });

  const [editRowId, setEditRowId] = useState(null);
  const [editMemberData, setEditMemberData] = useState({});


  const fetchTeam = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.get('/api/team/members', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log("Team data:", res.data);
      setTeam(res.data);
      
    } catch (error) {
      console.error('Failed to fetch team:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);


  const handleAddMember = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.post('/api/team/members', newMember, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setShowPopup(false);
      setNewMember({
        username: '',
        phone: '+91 (000) 000-0000', 
        email: '', 
        role: 'member'});
      fetchTeam();
    } catch (error) {
      console.error('Failed to add member:', error.response?.data || error.message);
    } 
  };

  const handleEditRow = (memberId) => {
    const memberToEdit = team.find((m) => m._id === memberId);
    setEditMemberData(memberToEdit);
    setEditRowId(memberId);
  };

  const handleUpdateMember = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put(`/api/team/members/${id}`, editMemberData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditRowId(null);
      fetchTeam();
    } catch (err) {
      console.error('Error updating member:', err);
    }
  };


  const handleDeleteMember = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/api/team/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeam();
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  const formatPhone = (value) => {
    const input = value.replace(/\D/g, '');
    if (input.length === 10) {
      return `+91 (${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
    } else {
      return '+91 (000) 000-0000';
    }
  };

  return (
    <div className='styles.teamContainer'>
      <table className={styles.teamList}>
        <thead className={styles.tableContent}>
          <tr className={styles.tableHeader}>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {team.map((member) => 
             editRowId === member._id ? (
              <tr key={member._id} className={styles.teamRow}>
                <td>
                  <input
                    value={editMemberData.fullName}
                    onChange={(e) =>
                      setEditMemberData({
                        ...editMemberData,
                        fullName: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editMemberData.phone}
                    onChange={(e) =>
                      setEditMemberData({
                        ...editMemberData,
                        phone: formatPhone(e.target.value),
                      })
                    }
                    onBlur={(e) =>
                      setEditMemberData({ 
                        ...editMemberData, 
                        phone: formatPhone(e.target.value) })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editMemberData.email}
                    onChange={(e) =>
                      setEditMemberData({
                        ...editMemberData,
                        email: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <select
                    value={editMemberData.role}
                    onChange={(e) =>
                      setEditMemberData({
                        ...editMemberData,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleUpdateMember(member._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditRowId(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
          
            <tr key={member._id} className={styles.teamRow}>
              <td>{member.fullName || '-'}</td>
              <td>{member.phone}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td className={styles.actionButtons}>
                <FaEdit className={styles.icon} onClick={() => handleEditRow(member._id)} />
                <FaTrash className={styles.icon} onClick={() => handleDeleteMember(member._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.addBtnContainer}>
        <button className={styles.addBtn} onClick={() => setShowPopup(true)}>Add Team members</button>
      </div>


      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h1>Add Team members</h1>
            <p>Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. New teammates may only be invited by the administrators.</p>
            <label>User name</label>
            <input 
              type="text" 
              placeholder='User name' 
              value={newMember.username} 
              onChange={(e) => setNewMember({...newMember, username: e.target.value})}
            />
            <label>Email Id</label>
            <input 
              type="text"
              placeholder='Email Id'
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
            />
            <label>Designation</label>
            <select
              value={newMember.role}
              onChange={(e) => setNewMember({...newMember, role: e.target.value})}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>

            <button onClick={() => setShowPopup(false)}>Cancel</button>
            <button onClick={handleAddMember}>Save</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Team