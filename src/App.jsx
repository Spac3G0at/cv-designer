import "./App.css";
import CVGenerator from "./components/CVGenerator";
import { CVProvider } from "./CVContext";

function App() {
  return (
    <div>
      <CVProvider>
        <div>
          <CVGenerator />
        </div>
      </CVProvider>
    </div>
  );
}

export default App;
