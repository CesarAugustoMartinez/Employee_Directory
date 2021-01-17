import React from "react";
import Employees from "./pages/Employees";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

function App() {
  return (
      <div>
        <Wrapper>
          <Employees />
        </Wrapper>
        <Footer />
      </div>
  );
}

export default App;
