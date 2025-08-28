import React from "react";
import Root from "./screens/Root";
import { ItemsProvider } from "./state_manager/items";

export default function App() {
  return (
    <ItemsProvider>
      <Root />
    </ItemsProvider>
  );
}
