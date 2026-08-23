import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ message = 'No records found' }) => {
  return (
    <div className="empty-state">
      <Inbox size={36} />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
