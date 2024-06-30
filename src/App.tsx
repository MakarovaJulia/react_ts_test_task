import { FC } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {MainPage} from "./pages/MainPage";


const App: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};

export default App;

