import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GoBack } from "./GoBackButton";

interface IHeaderParams {
  pageTitle?: string;
  goToPrevios?: () => void;
  search?: () => void;
  cartLength?: number;
  gotoCartScreen?: () => void;
  searchInput?: string; // Make optional
  setSearchInput?: (text: string) => void; // Make optional
}

export const HeadersComponent = ({
  goToPrevios,
  search,
  cartLength,
  gotoCartScreen,
  searchInput,
  setSearchInput,
}: IHeaderParams) => {
  
  return (
    <View style={styles.headerContainer}>
      <GoBack onPress={goToPrevios} />
      <Pressable style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color={"blue"} />
        <TextInput
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="Search items..."
          style={styles.searchInput}
        />
      </Pressable>
      <Pressable onPress={gotoCartScreen}>
        <View style={styles.cartNum}>
          <Text style={styles.cartNumText}>{cartLength}</Text>
        </View>
        <MaterialIcons
          name="shopping-cart"
          size={24}
          color={"white"}
          style={styles.cartIcon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 38,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
  },
  cartNum: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartNumText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cartIcon: {
    padding: 5,
    marginTop: 3,
  },
});
