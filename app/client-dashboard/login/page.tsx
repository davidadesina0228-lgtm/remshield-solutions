'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardLogin() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      if (res.ok) {
        router.push('/client-dashboard');
        router.refresh();
      } else {
        setError('Incorrect access code. Please try again.');
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
      background: 'linear-gradient(135deg, rgba(0,170,255,0.12), rgba(0,212,200,0.06)), #0d1b3e',
      fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 14,
        padding: '40px 36px',
        width: 'min(400px, 90vw)',
        textAlign: 'center',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
      }}>
        <Image
          src="/assets/remshield-logo.png"
          alt="RemShield"
          width={120}
          height={36}
          style={{ objectFit: 'contain', margin: '0 auto 24px' }}
        />

        <h1 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, color: '#0f172a', letterSpacing: 0 }}>
          Campaign Intelligence Center
        </h1>
        <p style={{ margin: '0 0 28px', color: '#5a7085', fontSize: 14, lineHeight: 1.5 }}>
          Enter your access code to view the dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Access code"
            required
            autoFocus
            style={{
              width: '100%',
              height: 46,
              padding: '0 16px',
              border: `1px solid ${error ? '#c0392b' : '#dde3ec'}`,
              borderRadius: 8,
              fontSize: 15,
              fontFamily: 'inherit',
              letterSpacing: '0.12em',
              textAlign: 'center',
              outline: 'none',
              color: '#0f172a',
            }}
          />

          {error && (
            <p style={{ margin: '10px 0 0', color: '#c0392b', fontSize: 13 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !code}
            style={{
              marginTop: 14,
              width: '100%',
              height: 46,
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #00aaff, #00d4c8)',
              border: 'none',
              borderRadius: 8,
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 15,
              color: '#06101f',
              cursor: loading || !code ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Checking…' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
