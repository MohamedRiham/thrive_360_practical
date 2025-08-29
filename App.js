
import React from "react";
import Root from "./screens/home_page";
import { ItemsProvider } from "./state_manager/items";

export default function App() {


  
  return (
    <ItemsProvider>
      <Root />
    </ItemsProvider>
  );
}
