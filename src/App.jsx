// import "./App.css";
import CVGenerator from "./components/CVGenerator";
import Navbar from "./components/Navbar";
import { CVProvider } from "./CVContext";

function App() {
  return (
    <div>
      <CVProvider>
        <Navbar />
        <div>
          <CVGenerator />
        </div>
      </CVProvider>
    </div>
  );
}

export default App;
