import { useEffect, useState } from "react";
import GuestRoutes from "./routes/GuestRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 1000);
  }, []);

  const Router = isAuthenticated ? UserRoutes : GuestRoutes;

  return <Router />;
}

export default App;
