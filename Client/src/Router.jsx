import {Routes, Route} from 'react-router-dom';
import {HomePage} from './Pages/HomePage'
import {Login} from './Pages/Login'
import {MyContent} from './Pages/MyContent'

export const Router = () => {
    return (
        <Routes>
            <Route path = "/" element={<Login />}/>
            <Route path = "/HomePage" element={<HomePage/>}/>
            <Route path = "/MyContent" element={<MyContent/>}/>
        </Routes>
    )
}