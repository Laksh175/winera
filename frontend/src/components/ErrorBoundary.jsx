import React from 'react';
import wineraLogo from '../assets/logo.webp';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught an error:', error, errorInfo);
    
    // Check if error is related to dynamic import / chunk loading failure
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      error?.message?.includes('Failed to fetch dynamically imported module') ||
      error?.message?.includes('Loading chunk') ||
      error?.message?.includes('import');

    if (isChunkError) {
      const reloaded = sessionStorage.getItem('winera_chunk_reload');
      if (!reloaded) {
        sessionStorage.setItem('winera_chunk_reload', 'true');
        window.location.reload();
      }
    }
  }

  handleReload = () => {
    try {
      sessionStorage.clear();
      localStorage.removeItem('winera_chunk_reload');
    } catch (_) {}
    window.location.href = window.location.pathname + '?t=' + Date.now();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F5F9',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'Open Sans, sans-serif'
        }}>
          <img
            src={wineraLogo}
            alt="Winera Logo"
            style={{ width: '130px', marginBottom: '24px' }}
          />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
            Page Reload Needed
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '420px', lineHeight: 1.6, marginBottom: '24px' }}>
            A temporary network issue occurred while loading page assets. Please click below to refresh the page.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              background: '#00a8ff',
              color: '#ffffff',
              padding: '12px 30px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0, 168, 255, 0.3)',
              transition: 'all 0.2s'
            }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <pre style={{
              marginTop: '20px',
              padding: '10px 14px',
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: '8px',
              fontSize: '12px',
              maxWidth: '80vw',
              overflowX: 'auto',
              textAlign: 'left'
            }}>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
