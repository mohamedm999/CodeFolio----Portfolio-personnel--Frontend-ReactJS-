import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Simple introspection query to test connection
const TEST_QUERY = gql`
  query TestConnection {
    __typename
  }
`;

export const TestConnection: React.FC = () => {
  const { data, loading, error } = useQuery(TEST_QUERY);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🔍 GraphQL Connection Test</h1>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Status:</h2>
        {loading && <p style={{ color: 'blue' }}>⏳ Testing connection...</p>}
        
        {error && (
          <div style={{ color: 'red', background: '#ffebee', padding: '15px', borderRadius: '5px' }}>
            <h3>❌ Error:</h3>
            <p><strong>Message:</strong> {error.message}</p>
            {error.networkError && (
              <p><strong>Network Error:</strong> {JSON.stringify(error.networkError, null, 2)}</p>
            )}
            {error.graphQLErrors && error.graphQLErrors.length > 0 && (
              <div>
                <strong>GraphQL Errors:</strong>
                <pre>{JSON.stringify(error.graphQLErrors, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
        
        {data && (
          <div style={{ color: 'green', background: '#e8f5e9', padding: '15px', borderRadius: '5px' }}>
            <h3>✅ Connection Successful!</h3>
            <p>Backend is responding correctly.</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <h2>Backend Info:</h2>
        <p><strong>GraphQL Endpoint:</strong> http://localhost:4000/graphql</p>
        <p><strong>Token:</strong> {localStorage.getItem('accessToken') ? '✅ Present' : '❌ Not found'}</p>
      </div>
    </div>
  );
};
