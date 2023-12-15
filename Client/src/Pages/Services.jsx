import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar.jsx";
import Cookies from "js-cookie";
import NewChatModal from "../Components/NewChatModal";
import ChatComponent from "../Components/ChatComponent.jsx";
import SearchResult from "../Components/SearchResult.jsx";
import "../Styles/Search.css";

export default function Home() {
  const orderMap = {
    1: "Relevance",
    2: "Date - Newest first",
    3: "Date - Oldest first",
    4: "Price - High to low",
    5: "Price - Low to high",
  };

  const { query, category } = useParams();
  const [results, setResults] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState({});
  const [filteredResult, setFilteredResults] = useState([]);
  const [filterMax, setFilterMax] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState();
  const [maxPrice, setMaxPrice] = useState(0);
  const [order, setOrder] = useState("1");
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(0);
  const [token, setToken] = useState(Cookies.get("token"));
  const [modalIsOpen, updateModalIsOpen] = useState(false);
  const [chatData, setChatData] = useState(null);

  // states for set review and open and close pop up
  const [isReviewPopUpOpen, setReviewPopUpOpen] = useState(false);

  const perPage = 10;
  console.log(query);
  console.log(category);

  useEffect(() => {
    console.log("update content");
    const token = Cookies.get("token");
    const url = "http://localhost:3001/api/users/" + token + "/auth";
    // do a check token before request
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        setLoggedInUser(data.user);
      })
      .catch((e) => console.log(e.message));
  }, []);

  useEffect(() => {
    setPage(0);
    var searchQuery = query ? query : "";
    const fetchData = async () => {
      try {
        var url = `http://localhost:3001/api/services/search/${query}`;

        if (searchQuery === ""  ) {
          url = "http://localhost:3001/api/services/";
        }

        const response = await fetch(url);
        var data = await response.json();

        if (searchQuery === "") {
          data = data.map((currData) => {
            return { service: currData, score: 0 };
          });
        }
        setResults(data);
        resetFilters();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      setResults([]);
    };
  }, [query, category]);

  const resetFilters = () => {
    setFilteredCategories({});
    results.forEach((result) => {
      result.service.categories.forEach((currCategory) => {
        setFilteredCategories((prevCategories) => {
          return {
            ...prevCategories,
            [currCategory]: {
              ...prevCategories[currCategory],
              count: 0,
            },
          };
        });
      });
    });
    setMaxPrice(0);
  };

  useEffect(() => {
    var searchQuery = query ? query : "";
    var searchCategory = category ? category : "";
    resetFilters();
    setFilterMax(0);
    if (!results || results.length === 0) {
      return;
    }

    try {
      let updatedMaxPrice = maxPrice;

      results.forEach((result) => {
        if (result.service.price > updatedMaxPrice) {
          updatedMaxPrice = result.service.price;
        }

        result.service.categories.forEach((currCategory) => {
          setFilteredCategories((prevCategories) => {
            const categoryExists = prevCategories[currCategory];
            var inputtedCategory = searchCategory;

            if (searchQuery === "") {
              return {
                ...prevCategories,
                [currCategory]: {
                  count: categoryExists ? categoryExists.count + 1 : 1,
                  checked:
                    inputtedCategory === currCategory || inputtedCategory === ""
                      ? true
                      : false,
                },
              };
            } else {
              // console.log(checkedCategories)
              return {
                ...prevCategories,
                [currCategory]: {
                  ...prevCategories[currCategory],
                  count: categoryExists ? categoryExists.count + 1 : 1,
                  checked:
                    inputtedCategory === currCategory || inputtedCategory === ""
                      ? true
                      : false,
                },
              };
            }
          });
        });
      });

      setMaxPrice(updatedMaxPrice);
      setFilterMax(updatedMaxPrice);
  
    } catch (error) {
      console.error("Error iterating over results", error);
    }
  }, [results]);

  useEffect(() => {
    setFilteredResults([]);
    setMaxPage(0);
    const byRelevance = (a, b) => b.service.score - a.service.score;
    const byDateOldest = (a, b) =>
      new Date(a.service.created) - new Date(b.service.created);
    const byDateNewest = (a, b) =>
      new Date(b.service.created) - new Date(a.service.created);
    const byPriceCheapest = (a, b) => a.service.price - b.service.price;
    const byPriceExpensive = (a, b) => b.service.price - a.service.price;

    const sortMap = {
      1: byRelevance,
      2: byDateNewest,
      3: byDateOldest,
      4: byPriceExpensive,
      5: byPriceCheapest,
    };

    let filteredResults = [];
    const checkedCategories = [];

    Object.keys(filteredCategories).forEach((category) => {
      if (filteredCategories[category].checked) {
        checkedCategories.push(category);
      }
    });

    results.forEach((result) => {
      if (result.service.price <= filterMax) {
       
          if(
          result.service.categories.some((category) =>
            checkedCategories.includes(category)
          ) &&
          !filteredResults.includes(result)
        ) {
          filteredResults.push(result);
        }
        
      }
    });

    filteredResults.sort(sortMap[order]);
    setFilteredResults(filteredResults);
    console.log(filteredResults)
    setMaxPage(Math.ceil(filteredResults.length / perPage));
  }, [filteredCategories, order, filterMax,filteredResult]);

  const toggleCategory = (key) => {
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
  // pop up state
  const handleReviewOpenPopUp = () => {
    setReviewPopUpOpen(true);
  };

  const displayChatModal = () => {
    updateModalIsOpen(true);
  };

  const movePage = (step) => {
    let currPage = page;
    currPage += step;

    if (currPage <= maxPage && currPage >= 0) {
      setPage(currPage);
    }
  };

  let links = (
    <>
      <button className="leftAlign">
        <Link className="navLinks" to="/">
          Home
        </Link>
      </button>
      <button className="leftAlign">
        <Link className="navLinks" to="/content">
          My Content
        </Link>
      </button>
    </>
  );

  return (
    <React.Fragment>
      <NavBar
        leftButtons={links}
        setToken={setToken}
        token={token}
        user={loggedInUser}
      />
      <SearchBar></SearchBar>
      
        <div className="resultContainer">
          <div className="filterContainer">
            <div className="filterSection">
              <div className="filterTitle">Order by</div>
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
            <div className="filterSection">
              <div className="filterTitle">Categories</div>
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
            <div className="filterSection">
              <div className="filterTitle">Price</div>
              <div className="filterTitle">
                <div className="priceInfo">
                  <div className="sliderValue">Free</div>
                  <div className="sliderContainer">
                    <output
                      className="valueLabel"
                      style={{ marginLeft: `${(filterMax / maxPrice) * 100}%` }}
                      htmlFor="price"
                    >{`CAD $${filterMax}`}</output>
                    <input
                      type="range"
                      name="price"
                      min="0"
                      max={`${maxPrice}`}
                      step={`${maxPrice / 5}`}
                      value={`${filterMax}`}
                      onChange={(e) => setFilterMax(e.target.value)}
                      className="priceSlider"
                    />
                  </div>

                  <div className="sliderValue">{maxPrice}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="contentContain">
            <div className="searchResults">
              {filteredResult.length !== 0 ? (
                filteredResult
                  .slice(
                    page * perPage,
                    Math.min(page * perPage + perPage, filteredResult.length)
                  )
                  .map((result) => (
                    <div
                      key={result.service.id}
                      className="resultItemContainer"
                    >
                      <SearchResult
                        data={result.service}
                        displayChatModal={displayChatModal}
                        setChatData={setChatData}
                        loggedInUser={loggedInUser}
                        currUser={loggedInUser}
                        displayReview={handleReviewOpenPopUp}
                      />
                    </div>
                  ))
              ) : (
                <div className="noResults">{`Oops! No results found`}</div>
              )}
            </div>
            <div className="pageNavigator">
              <div className="pageInfo">
                {`Page`}
                {page > 0 ? (
                  <button
                    className="navigateButton"
                    onClick={() => movePage(-1)}
                  >{`<`}</button>
                ) : (
                  <></>
                )}
                <div className="page">{page + 1}</div>
                {page + 1 < maxPage ? (
                  <button
                    className="navigateButton"
                    onClick={() => movePage(1)}
                  >
                    {`>`}{" "}
                  </button>
                ) : (
                  <></>
                )}
                {`of ${Math.max(page + 1, maxPage)}`}
              </div>
              <div className="pageToggle">
                {`Showing items ${Math.min(
                  filteredResult.length,
                  page * perPage + 1
                )} to ${Math.min(
                  filteredResult.length,
                  page * perPage + perPage
                )} of ${filteredResult.length}`}
              </div>
            </div>
          </div>
        </div>
      
               
      
      <NewChatModal
        title="Start New Chat"
        isOpen={modalIsOpen}
        updateIsOpen={updateModalIsOpen}
        PageData={chatData}
      />
      {loggedInUser ? <ChatComponent loggedInUser={loggedInUser} /> : <></>}
    </React.Fragment>
  );
}
