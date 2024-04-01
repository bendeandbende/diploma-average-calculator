import { Calculator } from "@/views/calculator";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
}

export default App;
