const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI (if API key is provided)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Magic item tables based on treasure type and rarity
const magicItemTables = {
  weapon: {
    common: [
      { range: [1, 20], name: 'Dagger of Warning', description: 'This dagger glows faintly when danger is near (within 120 feet).' },
      { range: [21, 40], name: 'Sword of Sharpness', description: 'A +1 shortsword that never dulls and cuts through non-magical materials with ease.' },
      { range: [41, 60], name: 'Bow of Accuracy', description: 'A +1 shortbow that grants advantage on the first attack roll each combat.' },
      { range: [61, 80], name: 'Mace of Disruption', description: 'This mace deals an extra 1d4 radiant damage to undead.' },
      { range: [81, 100], name: 'Spear of Returning', description: 'This spear returns to your hand immediately after being thrown.' }
    ],
    rare: [
      { range: [1, 25], name: 'Flametongue Sword', description: 'You can command this sword to burst into flames, dealing an extra 2d6 fire damage.' },
      { range: [26, 50], name: 'Frost Brand Battleaxe', description: 'This +2 battleaxe deals an extra 1d6 cold damage and grants resistance to fire.' },
      { range: [51, 75], name: 'Vorpal Scimitar', description: 'On a roll of 20, this scimitar severs the target\'s head.' },
      { range: [76, 100], name: 'Holy Avenger Longsword', description: 'A +3 longsword that deals 2d10 extra radiant damage to fiends and undead.' }
    ],
    legendary: [
      { range: [1, 50], name: 'Sword of Kas', description: 'A sentient +3 longsword with vampiric properties, granting temporary hit points on kills.' },
      { range: [51, 100], name: 'Blackrazor', description: 'A sentient greatsword that devours souls and grants temporary hit points and advantage.' }
    ]
  },
  armor: {
    common: [
      { range: [1, 25], name: 'Leather Armor of Gleaming', description: 'This armor never gets dirty and always looks polished.' },
      { range: [26, 50], name: 'Cloak of Billowing', description: 'This cloak billows dramatically on command.' },
      { range: [51, 75], name: 'Shield of Expression', description: 'The face on this shield changes to match your emotions.' },
      { range: [76, 100], name: 'Boots of False Tracks', description: 'These boots leave tracks of a different creature.' }
    ],
    rare: [
      { range: [1, 33], name: 'Plate Armor of Etherealness', description: 'This +1 plate armor allows you to become ethereal once per day.' },
      { range: [34, 66], name: 'Dragonscale Mail', description: 'Armor made from dragon scales granting resistance to a damage type.' },
      { range: [67, 100], name: 'Animated Shield', description: 'This shield floats and protects you, leaving your hands free.' }
    ]
  },
  potion: {
    common: [
      { range: [1, 20], name: 'Potion of Healing', description: 'Heals 2d4+2 hit points when consumed.' },
      { range: [21, 40], name: 'Potion of Climbing', description: 'Grants a climbing speed equal to your walking speed for 1 hour.' },
      { range: [41, 60], name: 'Potion of Water Breathing', description: 'Breathe underwater for 1 hour.' },
      { range: [61, 80], name: 'Potion of Animal Friendship', description: 'Charm beasts for 1 hour (DC 13 Wisdom save).' },
      { range: [81, 100], name: 'Potion of Growth', description: 'Your size doubles for 1d4 hours.' }
    ],
    rare: [
      { range: [1, 33], name: 'Potion of Superior Healing', description: 'Heals 8d4+8 hit points when consumed.' },
      { range: [34, 66], name: 'Potion of Invisibility', description: 'Become invisible for 1 hour or until you attack.' },
      { range: [67, 100], name: 'Potion of Flying', description: 'Gain a flying speed of 60 feet for 1 hour.' }
    ]
  },
  wondrous: {
    common: [
      { range: [1, 20], name: 'Bag of Holding', description: 'A bag that can hold 500 pounds in a 64 cubic feet space.' },
      { range: [21, 40], name: 'Rope of Climbing', description: '60 feet of rope that animates and climbs on command.' },
      { range: [41, 60], name: 'Immovable Rod', description: 'A rod that becomes fixed in space when activated.' },
      { range: [61, 80], name: 'Boots of Striding and Springing', description: 'Your walking speed becomes 30 feet and you can jump triple distance.' },
      { range: [81, 100], name: 'Cloak of Protection', description: 'Grants +1 to AC and saving throws.' }
    ],
    rare: [
      { range: [1, 25], name: 'Deck of Illusions', description: 'Draw cards to create illusory creatures.' },
      { range: [26, 50], name: 'Wings of Flying', description: 'A cloak that transforms into bat or bird wings, granting flight.' },
      { range: [51, 75], name: 'Pearl of Power', description: 'Regain one expended spell slot of 3rd level or lower.' },
      { range: [76, 100], name: 'Amulet of Health', description: 'Your Constitution score becomes 19 while wearing this amulet.' }
    ]
  },
  ring: {
    common: [
      { range: [1, 33], name: 'Ring of Warmth', description: 'Grants resistance to cold damage and comfort in cold environments.' },
      { range: [34, 66], name: 'Ring of Water Walking', description: 'Walk on liquid surfaces as if they were solid ground.' },
      { range: [67, 100], name: 'Ring of Feather Falling', description: 'Fall slowly and take no falling damage.' }
    ],
    rare: [
      { range: [1, 33], name: 'Ring of Invisibility', description: 'Become invisible as an action. Lasts until you attack or cast a spell.' },
      { range: [34, 66], name: 'Ring of Protection', description: 'Grants +1 to AC and saving throws.' },
      { range: [67, 100], name: 'Ring of Spell Storing', description: 'Stores up to 5 levels of spells that can be cast later.' }
    ]
  },
  scroll: {
    common: [
      { range: [1, 25], name: 'Scroll of Magic Missile', description: 'Cast Magic Missile at 1st level.' },
      { range: [26, 50], name: 'Scroll of Cure Wounds', description: 'Cast Cure Wounds at 1st level.' },
      { range: [51, 75], name: 'Scroll of Identify', description: 'Cast Identify once.' },
      { range: [76, 100], name: 'Scroll of Shield', description: 'Cast Shield as a reaction.' }
    ],
    rare: [
      { range: [1, 50], name: 'Scroll of Fireball', description: 'Cast Fireball at 5th level.' },
      { range: [51, 100], name: 'Scroll of Resurrection', description: 'Cast Raise Dead once.' }
    ]
  }
};

// Function to find item based on roll
function getItemFromRoll(roll, treasureType, rarity) {
  const normalizedRarity = rarity.toLowerCase().replace(/\s+/g, '');
  const rarityKey = normalizedRarity === 'veryrare' ? 'rare' : normalizedRarity;
  
  const table = magicItemTables[treasureType]?.[rarityKey] || magicItemTables[treasureType]?.common;
  
  if (!table) {
    return {
      name: 'Unknown Item',
      description: 'This item\'s properties are shrouded in mystery.'
    };
  }
  
  const item = table.find(entry => roll >= entry.range[0] && roll <= entry.range[1]);
  
  return item || table[0];
}

// API endpoint to generate magic item
app.post('/api/generate', async (req, res) => {
  try {
    const { roll, treasureType, rarity } = req.body;
    
    if (!roll || !treasureType || !rarity) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Get item from tables
    const item = getItemFromRoll(roll, treasureType, rarity);
    
    // Generate AI image if OpenAI is configured
    let imageUrl = null;
    if (openai) {
      try {
        const imagePrompt = `A fantasy RPG magic item: ${item.name}. ${item.description}. Medieval fantasy art style, detailed illustration, parchment background, ornate borders.`;
        
        const response = await openai.images.generate({
          model: 'dall-e-3',
          prompt: imagePrompt,
          n: 1,
          size: '1024x1024',
        });
        
        imageUrl = response.data[0].url;
      } catch (error) {
        console.error('Error generating image:', error.message);
        // Continue without image if generation fails
      }
    }
    
    // Return item data
    res.json({
      name: item.name,
      description: item.description,
      rarity: rarity,
      type: treasureType,
      roll: roll,
      treasureType: treasureType,
      imageUrl: imageUrl
    });
    
  } catch (error) {
    console.error('Error generating item:', error);
    res.status(500).json({ error: 'Failed to generate magic item' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Magic Item Generator API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Magic Item Generator API',
    endpoints: {
      generate: 'POST /api/generate',
      health: 'GET /health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`OpenAI configured: ${openai ? 'Yes' : 'No'}`);
});
