import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff, ZoomIn, X, Calendar, IndianRupee } from 'lucide-react';
import Modal from './Modal';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate, isLowStock, getStockStatus } from '../../utils/helpers';

const ProductDetailModal = ({ open, onClose, product }) => {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  if (!product) return null;

  const images = Array.isArray(product.images) ? product.images : [];
  const hasImages = images.length > 0;

  const goPrev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const stockTone = product.quantity === 0 ? 'danger' : isLowStock(product.quantity) ? 'warning' : 'success';

  const handleClose = () => {
    setIndex(0);
    setZoomed(false);
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} title={product.name} width={760}>
        <div className="detail-view">
          <div className="detail-view-media">
            {hasImages ? (
              <div className="detail-view-image-frame" onClick={() => setZoomed(true)}>
                <img
                  src={images[index]}
                  alt={`${product.name} ${index + 1}`}
                  className="detail-view-image"
                />
                <div className="detail-view-zoom-hint">
                  <ZoomIn size={15} /> Click to enlarge
                </div>
                {images.length > 1 && (
                  <>
                    <button type="button" className="detail-view-arrow left" onClick={goPrev}>
                      <ChevronLeft size={20} />
                    </button>
                    <button type="button" className="detail-view-arrow right" onClick={goNext}>
                      <ChevronRight size={20} />
                    </button>
                    <span className="detail-view-count">{index + 1} / {images.length}</span>
                  </>
                )}
              </div>
            ) : (
              <div className="detail-view-image-frame detail-view-empty">
                <ImageOff size={36} />
                <span>No images uploaded</span>
              </div>
            )}

            {images.length > 1 && (
              <div className="detail-view-thumbs">
                {images.map((img, i) => (
                  <button
                    type="button"
                    key={i}
                    className={'detail-view-thumb' + (i === index ? ' active' : '')}
                    onClick={() => setIndex(i)}
                  >
                    <img src={img} alt={`thumb ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail-view-info">
            <div className="detail-view-row">
              <span className="detail-view-label">Machine Name</span>
              <span className="detail-view-value detail-view-name">{product.name}</span>
            </div>

            <div className="detail-view-row">
              <span className="detail-view-label">Current Stock</span>
              <span className="detail-view-value">
                <StatusBadge label={`${getStockStatus(product.quantity)} (${product.quantity})`} tone={stockTone} />
              </span>
            </div>

            <div className="detail-view-price-grid">
              <div className="detail-view-price-card">
                <span className="detail-view-label">
                  <IndianRupee size={13} /> Customer Price
                </span>
                <span className="detail-view-price">{formatCurrency(product.customerPrice)}</span>
              </div>
              <div className="detail-view-price-card">
                <span className="detail-view-label">
                  <IndianRupee size={13} /> Dealer Price
                </span>
                <span className="detail-view-price">{formatCurrency(product.dealerPrice)}</span>
              </div>
            </div>

            <div className="detail-view-row">
              <span className="detail-view-label">
                <Calendar size={13} /> Date Added
              </span>
              <span className="detail-view-value">{formatDate(product.createdAt)}</span>
            </div>
          </div>
        </div>
      </Modal>

      {zoomed && hasImages && (
        <div className="image-zoom-overlay" onClick={() => setZoomed(false)}>
          <button className="image-zoom-close" onClick={() => setZoomed(false)}>
            <X size={22} />
          </button>
          <img src={images[index]} alt={product.name} className="image-zoom-full" onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <>
              <button type="button" className="detail-view-arrow left large" onClick={goPrev}>
                <ChevronLeft size={26} />
              </button>
              <button type="button" className="detail-view-arrow right large" onClick={goNext}>
                <ChevronRight size={26} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetailModal;
