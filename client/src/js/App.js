import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Layout from "./layouts/layout";
import WordCloud from "./WordCloud";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
