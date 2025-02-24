import { View, Text, Platform } from "react-native";
import React from "react";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";

type Props = {};

const CartScreen = ({ navigation, route }: TabsStackScreenProps<"Cart">) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "ios" ? 40 : 0,
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <HeadersComponent></HeadersComponent>
    </SafeAreaView>
  );
};

export default CartScreen;
