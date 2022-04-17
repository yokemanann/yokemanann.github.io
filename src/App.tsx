import '@elastic/eui/dist/eui_theme_light.css';
import "./App.css";
import { EuiProvider } from "@elastic/eui";
import { CustomForm } from "./components/AttributeTextHelper";

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
