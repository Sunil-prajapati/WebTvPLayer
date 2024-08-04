import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import MainRoute from "../src/routes/route";
import "./styles/global.scss";
import store from "./store/store";
import { useOrientation } from "react-use";
import { orientationType } from "./constant/enum";
import { OrientationBanner } from "./components/common/OrientationBanner";

function App() {
  const { type } = useOrientation();
  return (
    <Provider store={store}>
      {type === orientationType.LANDSCAPE_PRIMARY ||
      type === orientationType.LANDSCAPE_SECONDARY ? (
        <MainRoute />
      ) : (
        <OrientationBanner />
      )}
    </Provider>
  );
}

export default App;
