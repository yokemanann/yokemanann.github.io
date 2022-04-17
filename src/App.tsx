import '@elastic/eui/dist/eui_theme_light.css';
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { EuiProvider } from "@elastic/eui";
import { CustomForm } from "./components/customForm";

function App() {
  return (
    <div className="App">
      <EuiProvider>
        <CustomForm />
      </EuiProvider>
    </div>
  );
}

export default App;
