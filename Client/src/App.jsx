import { useState , useEffect} from 'react'
import {Router} from './Router'
import './App.css'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/users');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <Router />
    </div>
  );
}

export default App
