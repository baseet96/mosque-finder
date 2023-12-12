import "./App.css";

import Header from "./components/Header";
import AutoComplete from "./components/AutoComplete";

function App() {
  const header = "Mosque Finder";
  return (
    <>
      <Header header={header} />
      <AutoComplete />
    </>
  );
}

export default App;
