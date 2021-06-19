import React from "react";
import { CookiesProvider } from "react-cookie";
import { Route } from "./routes";
import { store } from "./store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Route />
      </CookiesProvider>
    </Provider>
  );
};

export default App;