import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/authSlice';

/**
 * Custom hook for WebSocket connection management
 * @param {Function} onMessage - Callback function when message is received
 * @param {Object} options - Configuration options
 * @returns {Object} WebSocket connection state
 */
export function useWebSocket(onMessage, options = {}) {
  const {
    reconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 10,
  } = options;

  const token = useSelector(selectCurrentToken);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const isConnectingRef = useRef(false);

  // Get WebSocket URL from environment or construct from API URL
  const getWebSocketUrl = useCallback(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const wsProtocol = apiUrl.startsWith('https') ? 'wss' : 'ws';
    const wsHost = apiUrl.replace(/^https?:\/\//, '').replace(/\/api\/?$/, '');
    return `${wsProtocol}://${wsHost}/ws?token=${token}`;
  }, [token]);

  // Connect to WebSocket
  const connect = useCallback(() => {
    // Don't connect if no token or already connecting
    if (!token || isConnectingRef.current) {
      return;
    }

    // Close existing connection
    if (wsRef.current) {
      wsRef.current.close();
    }

    isConnectingRef.current = true;

    try {
      const wsUrl = getWebSocketUrl();
      console.log('Connecting to WebSocket:', wsUrl.replace(/token=[^&]+/, 'token=***'));

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        isConnectingRef.current = false;
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('WebSocket message received:', data.type);

          if (onMessage) {
            onMessage(data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        isConnectingRef.current = false;
      };

      ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        isConnectingRef.current = false;
        wsRef.current = null;

        // Attempt to reconnect if enabled
        if (
          reconnect &&
          reconnectAttemptsRef.current < maxReconnectAttempts &&
          token
        ) {
          reconnectAttemptsRef.current++;
          console.log(
            `Attempting to reconnect (${reconnectAttemptsRef.current}/${maxReconnectAttempts})...`
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      isConnectingRef.current = false;
    }
  }, [token, onMessage, reconnect, reconnectInterval, maxReconnectAttempts, getWebSocketUrl]);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    console.log('Disconnecting WebSocket...');

    // Clear reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Close WebSocket connection
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    isConnectingRef.current = false;
    reconnectAttemptsRef.current = 0;
  }, []);

  // Send message through WebSocket
  const sendMessage = useCallback((data) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
      return true;
    }
    console.warn('WebSocket is not connected');
    return false;
  }, []);

  // Connect on mount and token change
  useEffect(() => {
    if (token) {
      connect();
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [token, connect, disconnect]);

  return {
    isConnected: wsRef.current?.readyState === WebSocket.OPEN,
    sendMessage,
    disconnect,
    reconnect: connect,
  };
}
