import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import '../Styles/NavBar.css'
export default function SearchBar({}){
    
    const [query, setQuery] = useState('')
    const navigate = useNavigate();

    const routeToResult = () => {
        if(query.trim()!==''){
            navigate(`/services/category=/query=${query}`);
        }
        
    }
    const generateQuery = () => {
      
      if (query.trim() !== '') {
        
        const newQueryList = query.toLowerCase().split(' ');
        console.log(newQueryList)
      }

    };
  
    useEffect(() => {
      
      const timer = setTimeout(generateQuery, 1000);
  
      
      return () => clearTimeout(timer);
    }, [query]);

	const handleEnter = (event) => {
		if(event.key === "Enter")
		{
            setQuery(event.target.value)
			routeToResult(event);
		}
	}

    return (
        <div className="searchContainer">
            <input
                className='searchField'
                type='text'
                placeholder='Enter keywords here'
                onChange={(e)=>{
                    setQuery(e.target.value)
                }}
                onKeyDown={handleEnter}                
            >
            </input>
            <button className='searchButton' onClick={routeToResult} id="search">
                Search
            </button>
        </div> 
    )
}