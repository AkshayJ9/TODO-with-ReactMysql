import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./components/Student";
import Createstudent from "./components/Createstudent";
import Updatestudent from "./components/Updatestudent";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />}></Route>
          <Route path="/create" element={<Createstudent />}></Route>
          <Route path="/update/:id" element={<Updatestudent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
