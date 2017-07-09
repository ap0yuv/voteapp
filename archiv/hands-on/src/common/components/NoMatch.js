import React from 'react';

export default function NoMatch({ staticContext }) {
  if (staticContext)
      staticContext.status = 404
  return <div>Page not found</div>;
}