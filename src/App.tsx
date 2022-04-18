import "@elastic/eui/dist/eui_theme_light.css";
import "./App.css";
import { EuiProvider } from "@elastic/eui";
import { AttributeTextHelper } from "./components/AttributeTextHelper";

function App() {
  return (
    <div className="App">
      <EuiProvider>
        <AttributeTextHelper />
      </EuiProvider>
    </div>
  );
}

export default App;
