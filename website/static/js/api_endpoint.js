import React from 'react';

export default function ApiEndpoint(props) {
  return (
    <div className="api-endpoint">
      <div className="api-endpoint-header">
        <div className={`api-endpoint-method ${props.method}`}>
          {props.method}
        </div>
        <code>{props.path}</code>
        <div
          className="api-endpoint-protection"
          title={
            props.unprotected
              ? 'Authentication is not required for this endpoint'
              : 'Authentication is required for this endpoint'
          }
        >
          {props.unprotected ? '🔓' : '🔒'}
        </div>
      </div>
      <div className="api-endpoint-content">{props.children}</div>
    </div>
  );
}
