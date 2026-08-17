import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginAdmin } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, User, Key, Gamepad2, ArrowRight } from 'lucide-react';
import yellowBrushAccent from '../assets/yellow-stroke-line.png';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginAdmin({ username, password });
      login(data);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F5F9',
      color: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Subtle Gradient Blobs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(245, 245, 249, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(255, 205, 0, 0.2) 0%, rgba(245, 245, 249, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: '#ffffff',
        borderRadius: '28px',
        border: '1.5px solid #e2e8f0',
        padding: '44px 38px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: '#e0f2fe',
            border: '2px solid #38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 25px rgba(56, 189, 248, 0.25)'
          }}>
            <Gamepad2 style={{ color: '#0284c7', width: '32px', height: '32px' }} />
          </div>

          <div style={{ display: 'inline-block', position: 'relative' }}>
            <img
              src={yellowBrushAccent}
              alt=""
              style={{
                display: 'block',
                width: '70%',
                maxWidth: '220px',
                height: 'auto',
                margin: '0 auto 4px',
                objectFit: 'contain'
              }}
            />
            <h2 style={{ fontSize: '1.9rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' }}>
              Admin <span style={{ color: '#38bdf8' }}>Portal</span>
            </h2>
          </div>

          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', marginTop: '6px' }}>
            Winera International CMS Management
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1.5px solid #fca5a5',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '14px',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', color: '#0f172a', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '16px', top: '15px', color: '#38bdf8', width: '18px', height: '18px' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter admin username"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: '#F5F5F9',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  color: '#0f172a',
                  fontSize: '14px',
                  fontWeight: '600',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', color: '#0f172a', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Key style={{ position: 'absolute', left: '16px', top: '15px', color: '#38bdf8', width: '18px', height: '18px' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: '#F5F5F9',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  color: '#0f172a',
                  fontSize: '14px',
                  fontWeight: '600',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '25px',
              background: '#38bdf8',
              color: '#ffffff',
              fontWeight: '900',
              fontSize: '14px',
              letterSpacing: '0.5px',
              border: '2px solid #ffcd00',
              boxShadow: '0 8px 24px rgba(56, 189, 248, 0.4)',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'transform 0.2s'
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
            <ArrowRight style={{ width: '18px', height: '18px' }} />
          </button>
        </form>

        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid #f1f5f9',
          fontSize: '12px',
          color: '#64748b',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          Default Credentials: <b style={{ color: '#0f172a' }}>admin</b> / <b style={{ color: '#0f172a' }}>admin123</b>
        </div>
      </div>
    </div>
  );
}
