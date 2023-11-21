import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import NewChatModal from '../Components/NewChatModal';
import ReviewPopUp from '../Components/ReviewPopUp'
import SearchResult from '../Components/SearchResult.jsx';
import Cookies from 'js-cookie'
import '../Styles/Search.css'

const getChats = (user, setChats) => {
  if(user !== undefined)
  {
    setChats([])

    const url = 'http://localhost:3001/api/chats/seller/' + user._id;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error('Error in getChat');
      })
      .then((data) => {
        setChats([...data]);
      })
      .catch((e) => console.log(e.message));

      const buyer = 'http://localhost:3001/api/chats/buyer/' + user._id;
      fetch(buyer, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else throw new Error('Error in getChat');
        })
        .then((data) => {
          setChats(prevChats => [...prevChats, ...data]);
        })
        .catch((e) => console.log(e.message));
  }
};

export default function Home() {
  const [user, setUser] = useState();
	const [token, setToken] = useState(Cookies.get('token'));
  const [chats, setChats] = useState();

	useEffect(() => {
		const url = 'http://localhost:3001/api/users/' + token + '/auth';
		// do a check token before request
		fetch(url, {
			method: 'GET',
		})
			.then((response) => {
				if (response.status === 200) return response.json();
			})
			.then((data) => {
				setUser(data.user);
        getChats(data.user, setChats)
			})
			.catch((e) => console.log(e.message));
	}, []);

  const orderMap = {
    '1' : 'Date - Newest first',
    '2' : 'Date - Oldest first',
    '3' : 'Price - High to low',
    '4' : 'Price - Low to high'
  }
  
  const [results, setResults] = useState([]);
  const [filteredCategories , setFilteredCategories ] = useState({})
  const [filteredResult, setFilteredResults] = useState([]) 
  const [filterMax, setFilterMax] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [order, setOrder] = useState('1');
  const [maxPage, setMaxPage] = useState(0)
  const [page, setPage] = useState(0)
  const [modalIsOpen, updateModalIsOpen] = useState(false)
  const [chatData, setChatData] = useState(null)
  const [isReviewPopUpOpen, setReviewPopUpOpen] = useState(false)

  const perPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/services/`);
        const data = await response.json();
  
        setResults(data);
        resetFilters();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to handle component unmounting
      setResults([]);
    };
  }, []);

  const resetFilters = () => {
    setFilteredCategories({});
    setMaxPrice(0);
    
  };

  useEffect(() => {
    setFilterMax(0)
    if (!results || results.length === 0) {
      return;
    }

    try {
      let updatedMaxPrice = maxPrice;

      results.forEach((result) => {
        if (result.price > updatedMaxPrice) {
          updatedMaxPrice = result.price;
        }

        result.categories.forEach((category) => {
          setFilteredCategories((prevCategories) => {
            const categoryExists = prevCategories[category];

            return {
              ...prevCategories,
              [category]: {
                count: categoryExists ? categoryExists.count + 1 : 1,
                checked: true,
              },
            };
          });
        });
      });
  
      setMaxPrice(updatedMaxPrice);
      setFilterMax(updatedMaxPrice)
    } catch (error) {
      console.error('Error iterating over results', error);
    }
  }, [results]);

  useEffect(() => {
    setFilteredResults([])
    setMaxPage(0)
    setPage(0)

    const byDateOldest = (a, b) => new Date(a.created) - new Date (b.created);
    const byDateNewest = (a, b) => new Date(b.created) - new Date (a.created);
    const byPriceCheapest = (a, b) => a.price - b.price;
    const byPriceExpensive = (a, b) => b.price - a.price;
  
    const sortMap = {
      '1': byDateNewest,
      '2': byDateOldest,
      '3': byPriceExpensive,
      '4': byPriceCheapest,
    };
  
    let filteredResults = [];
    const checkedCategories = [];
    Object.keys(filteredCategories).forEach((category) => {
      if (filteredCategories[category].checked) {
        checkedCategories.push(category);
      }
    });
  
    results.forEach((result) => {
      if (result.price <= filterMax) {
        if (
          result.categories.some((category) =>
            checkedCategories.includes(category)
          ) &&
          !filteredResults.includes(result)
        ) {
          filteredResults.push(result);
        }
      }
    });
    
    filteredResults.sort(sortMap[order]);
    setFilteredResults(filteredResults)
    setMaxPage(Math.floor(filteredResults.length/perPage))
  }, [filteredCategories, order, filterMax]);
  
  const toggleCategory = (key) => {
    console.log('here')
    setFilteredCategories((prevCategories) => {
        
      if (prevCategories[key]) {
        return {
          ...prevCategories,
          [key]: {
            count: prevCategories[key].count,
            checked: !prevCategories[key].checked,
          },
        };
      }
  
      return prevCategories;
    });
  };

  const handleReviewOpenPopUp = () => { setReviewPopUpOpen(true) };

  const displayChatModal = () =>{
     updateModalIsOpen(true)

  }

  const movePage = (step)=>{
    let currPage = page;
    currPage+=step

    if(currPage<=maxPage && currPage >= 0 ){
        setPage(currPage)
    }
  }
  


  let links = (
    <>
      <button className="leftAlign">
          <Link className="navLinks" to="/content">
              My Content
          </Link>
      </button>
      <button className="leftAlign">
          <Link className="navLinks" to="/chat">
            Chat
          </Link>
      </button>
    </>
  );

  return (
    <React.Fragment>
      <NavBar leftButtons={links} setToken={setToken} token={token}/>
      
      {results.length !== 0 || Object.keys(filteredCategories).length !== 0 ?  
      
      <div className='resultContainer'>
            <div className='filterContainer'>
                <div className='filterSection'>
                    <div className='filterTitle'>
                        Order by
                    </div>
                    <div className="radioContainer">
                    {Object.keys(orderMap).map((k) => (
                        <label key={k} className="radioLabel">
                        <input
                            type="radio"
                            name="order"
                            value={orderMap[k]}
                            checked={order === k}
                            onChange={() => setOrder(k)}
                        />
                        {orderMap[k]}
                        </label>
                    ))}
                    </div>
                </div>
                <div className='filterSection'>
                    <div className='filterTitle'>
                        Categories
                    </div>
                    <div className="radioContainer">
                    {Object.keys(filteredCategories).map((key) => (
                        <label key={key} className="radioLabel">
                            <input
                            type="radio"
                            value={key}
                            checked={filteredCategories[key].checked}
                            onClick={() => toggleCategory(key)}
                        />
                        {`${key} (${filteredCategories[key].count})`}
                        </label>
                    ))}
                    </div>
                </div>
                <div className='filterSection'>
                    <div className='filterTitle'>
                        Price
                    </div>
                    <div className='filterTitle'>
                    <div className='priceInfo'>
                    <div className='sliderValue'>Free</div> 
                    <div className='sliderContainer'>
                    <output className='valueLabel'  style={{marginLeft: `${(filterMax/maxPrice)*100}%`}} htmlFor="price">{`CAD $${filterMax}`}</output> 
                    <input
                        type='range'
                        name="price"
                        min='0'
                        max={`${maxPrice}`}
                        step={`${(maxPrice/5)}`}
                        value={`${filterMax}`}
                        onChange={(e)=>setFilterMax(e.target.value)}
                        className='priceSlider'/> 
                        </div>
                        
                        <div className='sliderValue'>{maxPrice}</div>         
                        </div>
                    </div>
      
                    
                </div>
            </div>
            <div className='contentContain'>
            
            <div className = 'searchResults'>
                
                {filteredResult.length !== 0 ? 
                filteredResult.slice(page*perPage, Math.min((page*perPage) + perPage,  filteredResult.length ) ).map((result) => (
                    <div key = {result.id} className = 'resultItemContainer'>
                        <SearchResult data={result} displayChatModal={displayChatModal} setChatData={setChatData} currUser={user} setChats={setChats} chats={chats} displayReview={handleReviewOpenPopUp}/>
                        <ReviewPopUp post_id={result._id} user={user} isOpen ={isReviewPopUpOpen} closePopUp={setReviewPopUpOpen}/>
                    </div>
                   
                )):
                <div className = "noResults">
                    {`Oops! No results found.`}
                </div>
                }
            </div> 
            <div className = 'pageToggle'>

                {`Showing items ${Math.min(filteredResult.length, (page*perPage)+1)} to ${Math.min(filteredResult.length,(page*perPage) + perPage)} of ${filteredResult.length}`}
                <div className='pageNavigator'>
                    {`Page`}
                    {page > 0 ?
                    <button className = 'navigateButton' onClick={()=>movePage(-1)}>{`<`}</button>
                    :
                    <></>
                    }
                    <div className='page'>
                    {page+1}
                    </div>
                    {page+1 < maxPage ?
                    <button className = 'navigateButton' onClick={()=>movePage(1)}>{`>`} </button>
                    :
                    <></>
                    }
                    {`of ${Math.max(page+1,maxPage)}`}
                    
                </div>
                </div>
                 
            </div>
                    
            </div>
      :
      <></>
      }
      {/* <NewChatModal title="Start New Chat" isOpen={modalIsOpen} updateIsOpen={updateModalIsOpen} data={chatData} user={user}/> */}
    </React.Fragment>
  );
}