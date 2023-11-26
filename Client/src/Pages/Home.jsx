import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import CategoryButton from '../Components/CategoryButton';
// import {Link} from 'react-router-dom'
import ChatComponent from '../Components/ChatComponent';
import Cookies from 'js-cookie'
import '../Styles/Search.css'

const createCategories = (categories) =>
{
  var result = []
  var len = categories.length

  for(var i = 0; i < len; i++)
  {
    console.log(categories[i])
    if(categories[i].services.length !== 0)
    {
      result.push(<CategoryButton category={categories[i].name}/>)
    }
  }
  console.log(result)

  return result;
}

export default function Home() {
  const [user, setUser] = useState();
	const [token, setToken] = useState(Cookies.get('token'));
  const [categories, setCategories] = useState([]);
  const [width, changeWidth] = useState(window.innerWidth);
  const CATEGORY_WIDTH = 300;

  useEffect(() => {
    window.addEventListener("resize", () => changeWidth(window.innerWidth));
  }), [];
  console.log(width)

    useEffect(() => {
		console.log('update content');
		const token = Cookies.get('token');
		const url = 'http://localhost:3001/api/users/' + token + '/auth';
    // do a check token before request
		fetch(url, {method: 'GET',})
			.then((response) => {if (response.status === 200) return response.json();})
			.then((data) => {setUser(data.user);})
			.catch((e) => console.log(e.message));

      fetch('http://localhost:3001/api/categories/services/', {method: 'GET',})
        .then((response) => {if(response.status === 200) return response.json();})
        .then((data) => {setCategories([...data])})
        .catch((e) => console.log(e.message))
	}, []);

  var categoryList = createCategories(categories);
  var categoryWidth = [width-(width%CATEGORY_WIDTH)];
  console.log(width)
  console.log(width%CATEGORY_WIDTH)
      
  let links = (
    <>
      <button className="leftAlign">
        <Link className="navLinks" to="/services/category=">
          Services
        </Link>
      </button>
      <button className="leftAlign">
          <Link className="navLinks" to="/content">
              My Content
          </Link>
      </button>
    </>
  );
  console.log(categoryList)

  return (
    <div className="bg-neutral-200 w-full h-full">
      <NavBar leftButtons={links} setToken={setToken} token={token}/>
      <div className="m-auto" style={{width: categoryWidth+"px"}}>
        {categoryList}
        {user ? <ChatComponent loggedInUser={user} />: <></> } 
      </div>
    </div>
  );
}