import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ItemModal from './ItemModal';

function App() {
  const [rollValue, setRollValue] = useState('');
  const [treasureType, setTreasureType] = useState('common');
  const [rarity, setRarity] = useState('common');
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  const generateItem = async () => {
    if (!rollValue) {
      alert('Please enter a roll value');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/generate`, {
        roll: parseInt(rollValue),
        treasureType,
        rarity
      });
      
      setItemData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error generating item:', error);
      alert('Failed to generate item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openInNewWindow = () => {
    if (!itemData) return;
    
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${itemData.name}</title>
          <style>
            body {
              font-family: 'Crimson Text', serif;
              background: linear-gradient(135deg, #2c1810 0%, #1a0f0a 100%);
              padding: 40px;
              margin: 0;
            }
            .item-display {
              background: linear-gradient(135deg, #f4e4c1 0%, #e8d4a8 100%);
              border: 8px double #8b4513;
              border-radius: 15px;
              padding: 40px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.5);
              max-width: 700px;
              margin: 0 auto;
            }
            h1 {
              color: #8b0000;
              text-align: center;
              font-size: 2.5em;
              margin-bottom: 10px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .rarity {
              text-align: center;
              color: #8b4513;
              font-style: italic;
              margin-bottom: 20px;
            }
            .item-image {
              width: 100%;
              max-width: 500px;
              display: block;
              margin: 20px auto;
              border: 4px solid #8b4513;
              border-radius: 10px;
            }
            .description {
              line-height: 1.8;
              color: #2c1810;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="item-display">
            <h1>${itemData.name}</h1>
            <div class="rarity">${itemData.rarity} ${itemData.type}</div>
            ${itemData.imageUrl ? `<img src="${itemData.imageUrl}" alt="${itemData.name}" class="item-image" />` : ''}
            <div class="description">${itemData.description}</div>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">⚔️ Magic Item Generator ⚔️</h1>
        
        <div className="input-section">
          <div className="form-group">
            <label>Roll Value (d100):</label>
            <input
              type="number"
              value={rollValue}
              onChange={(e) => setRollValue(e.target.value)}
              placeholder="Enter roll (1-100)"
              min="1"
              max="100"
            />
          </div>

          <div className="form-group">
            <label>Treasure Type:</label>
            <select value={treasureType} onChange={(e) => setTreasureType(e.target.value)}>
              <option value="weapon">Weapon</option>
              <option value="armor">Armor</option>
              <option value="potion">Potion</option>
              <option value="wondrous">Wondrous Item</option>
              <option value="ring">Ring</option>
              <option value="scroll">Scroll</option>
            </select>
          </div>

          <div className="form-group">
            <label>Rarity:</label>
            <select value={rarity} onChange={(e) => setRarity(e.target.value)}>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="very rare">Very Rare</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>

          <button 
            className="generate-btn" 
            onClick={generateItem}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Magic Item'}
          </button>
        </div>

        {showModal && itemData && (
          <ItemModal 
            itemData={itemData} 
            onClose={() => setShowModal(false)}
            onOpenNew={openInNewWindow}
          />
        )}
      </div>
    </div>
  );
}

export default App;
