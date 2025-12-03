import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const CommandConsole: React.FC = () => {
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isAuth, logout } = useAuth();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsVisible(prev => !prev);
        setMessage('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const cmd = input.trim().toLowerCase();
    setInput('');

    switch (cmd) {
      case 'login':
        navigate('/login');
        setIsVisible(false);
        break;

      case 'dashboard':
        if (isAuth) {
          navigate('/admin/dashboard');
          setIsVisible(false);
        } else {
          setMessage('⚠️ Authentication required. Use "login" command first.');
          setTimeout(() => navigate('/login'), 1500);
        }
        break;

      case 'logout':
        if (isAuth) {
          await logout();
          setMessage('✓ Logged out successfully');
          setTimeout(() => {
            navigate('/');
            setIsVisible(false);
          }, 1000);
        } else {
          setMessage('⚠️ Not logged in');
        }
        break;

      case 'help':
        setMessage('Commands: login | dashboard | logout | help | clear');
        break;

      case 'clear':
        setMessage('');
        break;

      case '':
        break;

      default:
        setMessage(`❌ Command not recognized: "${cmd}". Type "help" for available commands.`);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4" style={{ background: 'rgba(0, 0, 0, 0.7)' }} onClick={() => setIsVisible(false)}>
      <div
        className="w-full max-w-2xl rounded-xl backdrop-blur-xl shadow-2xl"
        style={{
          background: 'rgba(10, 9, 26, 0.95)',
          border: '1px solid rgba(58, 127, 255, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-mono" style={{ color: '#3A7FFF' }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              placeholder="Type a command... (help for list)"
              className="flex-1 bg-transparent outline-none text-sm font-mono"
              style={{ color: '#F0F0F0' }}
            />
            <button
              onClick={() => setIsVisible(false)}
              className="text-xs px-2 py-1 rounded"
              style={{ color: '#5A6B8C', background: 'rgba(90, 107, 140, 0.2)' }}
            >
              ESC
            </button>
          </div>
          {message && (
            <div className="px-3 py-2 text-xs font-mono rounded" style={{ background: 'rgba(58, 127, 255, 0.1)', color: '#5A6B8C' }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
