import React, { useState, useEffect } from 'react';
import APIForm from '../components/APIForm';
import Gallery from '../components/Gallery';
import './App.css';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [catInfo, setCatInfo] = useState(null);
  const [banList, setBanList] = useState([]);
  const [prevCats, setPrevCats] = useState([]);

  const fetchCatInfo = async () => {
    try {
      let query = '';
      if (banList.length > 0) {
        query = '&exclude=' + banList.join(',');
      }
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10${query}`, {
        headers: {
          'x-api-key': ACCESS_KEY
        }
      });
      const data = await response.json();
      const catData = data.find(cat => cat.breeds.length > 0); // Find the first cat with breed information
      if (catData) {
        const breedInfo = catData.breeds[0];
        setCatInfo({
          ...catData,
          breed: breedInfo.name || 'Unknown',
          origin: breedInfo.origin || 'Unknown',
          lifeSpan: breedInfo.life_span || 'Unknown',
          temperament: breedInfo.temperament || 'Unknown'
        });
      } else {
        setCatInfo(null);
      }
    } catch (error) {
      console.error('Error fetching cat info:', error);
    }
  };
  
  const submitForm = () => {
    fetchCatInfo();
  };

  const handleBan = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
      fetchCatInfo(); 
    }
  };

  useEffect(() => {
    fetchCatInfo();
  }, []);

  useEffect(() => {
    if (catInfo) {
      setPrevCats((prevCats) => [...prevCats, catInfo]);
    }
  }, [catInfo]);

  return (
    <div className="whole-page">
      <div className="left-section">
        <Gallery banList={banList} handleBan={handleBan} />
      </div>
      <div className="center-section">
        <div className="card">
          <h1>Cat Discovery Website! 🐱</h1>
          <APIForm onSubmit={submitForm} />
          <br />
          {catInfo && (
            <div className="cat-info">
              <img src={catInfo.url} alt="Cat" />
              <div className="attributes">
                <h2>{catInfo.breed}</h2>
                <button onClick={() => handleBan(catInfo.origin)}>Origin: {catInfo.origin}</button>
                <button onClick={() => handleBan(catInfo.lifeSpan)}>Life Span: {catInfo.lifeSpan}</button>
                <button onClick={() => handleBan(catInfo.temperament)}>Temperament: {catInfo.temperament}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
