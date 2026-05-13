'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardLogin() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/client-dashboard/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const json = await res.json();
      if (res.ok) {
        router.push(json.redirect || '/client-dashboard');
        router.refresh();
      } else {
        setError('Invalid access code. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(0,170,255,0.12) 0%, rgba(0,212,200,0.06) 30%, transparent 70%), #0d1b3e',
      fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
      padding: '24px 16px',
    }}>
      <div style={{
        width: 'min(420px, 100%)',
        background: 'rgba(13, 27, 62, 0.85)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,200,0.08)',
        overflow: 'hidden',
      }}>
        {/* Top accent bar */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, #00D4C8 0%, #00AAFF 100%)',
        }} />

        <div style={{ padding: '36px 36px 40px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <Image
              src="/assets/remshield-logo.png"
              alt="RemShield"
              width={120}
              height={36}
              style={{ objectFit: 'contain', display: 'inline-block' }}
              priority
            />
          </div>

          {/* Shield icon */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 2L4 9V22C4 31.4 11 40.2 20 43C29 40.2 36 31.4 36 22V9L20 2Z"
                stroke="#00D4C8"
                strokeWidth="1.5"
                fill="rgba(0,212,200,0.06)"
              />
              <path
                d="M13 22.5L17.5 27L27 18"
                stroke="#00D4C8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{
              margin: '0 0 8px',
              fontSize: 22,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}>
              Client Portal
            </h1>
            <p style={{
              margin: 0,
              color: '#8898aa',
              fontSize: 14,
              lineHeight: 1.6,
            }}>
              Enter your access code to view your campaign intelligence dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12 }}>
              <input
                type="password"
                value={code}
                onChange={e => setCode(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter access code"
                required
                autoFocus
                autoComplete="current-password"
                style={{
                  width: '100%',
                  height: 50,
                  padding: '0 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${error ? '#ff5f57' : focused ? '#00D4C8' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 10,
                  fontSize: 16,
                  fontFamily: "'Courier New', Courier, monospace",
                  letterSpacing: '0.18em',
                  textAlign: 'center',
                  color: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  boxShadow: focused ? '0 0 0 3px rgba(0,212,200,0.12)' : error ? '0 0 0 3px rgba(255,95,87,0.12)' : 'none',
                }}
              />
            </div>

            {error && (
              <p style={{
                margin: '0 0 12px',
                color: '#ff5f57',
                fontSize: 13,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#ff5f57" strokeWidth="1.2"/>
                  <path d="M7 4.5V7.5" stroke="#ff5f57" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="7" cy="9.5" r="0.7" fill="#ff5f57"/>
                </svg>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !code.trim()}
              style={{
                width: '100%',
                height: 50,
                background: loading || !code.trim()
                  ? 'rgba(255,255,255,0.06)'
                  : 'linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)',
                border: 'none',
                borderRadius: 10,
                fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: loading || !code.trim() ? 'rgba(255,255,255,0.3)' : '#06101f',
                cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
                letterSpacing: '0.02em',
                transition: 'all 0.2s',
                boxShadow: loading || !code.trim() ? 'none' : '0 4px 16px rgba(0,170,255,0.25)',
              }}
            >
              {loading ? 'Verifying…' : 'Access Dashboard'}
            </button>
          </form>

          {/* Footer note */}
          <p style={{
            marginTop: 24,
            textAlign: 'center',
            fontSize: 12,
            color: 'rgba(136,152,170,0.6)',
            lineHeight: 1.5,
          }}>
            Access codes are issued by RemShield.<br />
            Contact <a href="mailto:support@remshield.solutions" style={{ color: '#00D4C8', textDecoration: 'none' }}>support@remshield.solutions</a> for help.
          </p>
        </div>
      </div>
    </div>
  );
}
