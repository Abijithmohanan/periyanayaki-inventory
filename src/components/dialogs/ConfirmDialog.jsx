import React from 'react';
import Modal from '../common/Modal';

const ConfirmDialog = ({ open, onClose, onConfirm, title = 'Confirm Action', message, confirmLabel = 'Delete', danger = true }) => {
  return (
    <Modal open={open} onClose={onClose} title={title} width={420}>
      <p style={{ marginBottom: 20, color: 'var(--text-secondary)' }}>{message}</p>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className={danger ? 'btn btn-danger' : 'btn btn-primary'} onClick={() => { onConfirm(); onClose(); }}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
