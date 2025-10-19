import React from 'react';
import './ItemModal.css';

function ItemModal({ itemData, onClose, onOpenNew }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="item-card">
          <h2 className="item-name">{itemData.name}</h2>
          <p className="item-rarity">{itemData.rarity} {itemData.type}</p>
          
          {itemData.imageUrl && (
            <div className="image-container">
              <img 
                src={itemData.imageUrl} 
                alt={itemData.name} 
                className="item-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <div className="item-description">
            <p>{itemData.description}</p>
          </div>
          
          <div className="item-properties">
            <div className="property">
              <strong>Roll:</strong> {itemData.roll}
            </div>
            <div className="property">
              <strong>Treasure Type:</strong> {itemData.treasureType}
            </div>
          </div>
          
          <button className="open-new-btn" onClick={onOpenNew}>
            🌎 Open in New Window
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
