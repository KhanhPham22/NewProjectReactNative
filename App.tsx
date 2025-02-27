import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/Navigation/RootNavigation";
import { PersistGate } from "redux-persist/integration/react";
import {store, persistor } from "./src/Store";
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
   
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
