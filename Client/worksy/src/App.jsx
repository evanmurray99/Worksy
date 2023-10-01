// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';


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
      <h1>Data from MongoDB</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.name}
            {item.email}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

