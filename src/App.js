import "./App.css";
import Header from "./Header";
import HomePage from "./HomePage";

export default function App() {
  return (
    <div>
      <Header />
      <div>
        {" "}
        {/* Add margin top to create space */}
        <HomePage />
      </div>
    </div>
  );
}
