import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AllCards from "./components/AllCards";
import MyNavBar from "./components/MyNavBar";
import MyPlayer from "./components/MyPlayer";
import Album from "./components/Album";
import Artist from "./components/Artist";
import SearchResaults from "./components/SearchResults";
import MyFav from "./components/MyFav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<AllCards />} />
          <Route path="/Album" element={<Album />} />
          <Route path="/Artist" element={<Artist />} />
          <Route path="/SearchResults" element={<SearchResaults />} />
          <Route path="/MyFavourite" element={<MyFav />} />
        </Routes>
        <MyPlayer />
      </BrowserRouter>
    </div>
  );
}
export default App;
