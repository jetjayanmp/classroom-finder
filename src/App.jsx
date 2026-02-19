import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  'https://ryqqxzyqvlynbrqifnst.supabase.co', 
  'sb_publishable_8tWrY-OfWsBBR8_PbErCjQ_dw7g65sL'
);

export default function App() {
  const [studentId, setStudentId] = useState('');
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Search Supabase for the student ID
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('student_id', studentId)
      .single();

    if (error) {
      alert("Student ID not found! Check your ID and try again.");
      console.error(error);
    } else if (data) {
      setSchedule(data);
    }
    setLoading(false);
  };

  if (!schedule) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Welcome to Training</h2>
        <p>Enter ID to find your room</p>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Student ID" 
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{ padding: '15px', width: '80%', borderRadius: '10px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: '20px', 
              padding: '15px 30px', 
              backgroundColor: loading ? '#ccc' : '#007AFF', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              fontSize: '1rem', 
              width: '85%',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Searching...' : 'Find My Room'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h3 style={{ color: '#666' }}>Today's Schedule</h3>
      <div style={{ background: '#007AFF', color: 'white', padding: '40px', borderRadius: '25px', boxShadow: '0 10px 20px rgba(0,122,255,0.3)' }}>
        <p style={{ margin: 0, opacity: 0.8 }}>GO TO ROOM</p>
        <h1 style={{ fontSize: '5rem', margin: '10px 0' }}>{schedule.room_number}</h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{schedule.floor}</p>
      </div>
      <div style={{ marginTop: '30px', textAlign: 'left', padding: '0 10px' }}>
        <h2 style={{ marginBottom: '5px' }}>{schedule.module_name}</h2>
        <p><strong>Time:</strong> {schedule.time}</p>
        <p><strong>Instructor:</strong> {schedule.instructor}</p>
      </div>
      <button onClick={() => setSchedule(null)} style={{ marginTop: '40px', background: 'none', border: 'none', color: '#007AFF', cursor: 'pointer' }}>
        ← Log out
      </button>
    </div>
  );
}
