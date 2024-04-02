import { Calculator } from "@/views/calculator";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/components/ui";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Calculator />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
