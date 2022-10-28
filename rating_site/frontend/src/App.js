import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import Logout from './Logout';
import Register from "./register"
import Artwork from './ArtworkDetailForm';
import ArtworkGrid from "./ArtworkGrid";

function App(){
    return (
        <Routes>
            <Route exact path="/" element={<ArtworkGrid/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/logout" element={<Logout/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/artwork/:id" element={<Artwork/>}/>
        </Routes>
    )
}

export default App;
