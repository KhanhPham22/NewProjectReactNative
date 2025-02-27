import {
  View,
  Text,
  Platform,
  Pressable,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation"; // Assuming this imports TabsStackParams

import { RootStackParams } from "../Navigation/RootNavigation"; // Adjust path as needed
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import ImageSlider from "../Components/HomeSreenComponents/ImageSlider";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { CategoryCard } from "../Components/HomeSreenComponents/CategoryCard";
import {
  fetchCategories,
  fetchProductsByCatID,
  fetchFeaturedProducts,
} from "../MiddleWares/HomeMiddleWare";
import { useSelector } from "react-redux"; // Fixed typo
import { CartState } from "../TypesCheck/ProductCartTypes";
import DisplayMessage from "../Components/HeaderComponents/DisplayMessage";

// Combine navigation props for both stacks
type HomeScreenProps = TabsStackScreenProps<"Home"> & TabsStackScreenProps<"Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const cart = useSelector((state: CartState) => state.cart.cart);

  const gotoCartScreen = () => {
    if (cart.length === 0) {
      setMessage("Cart is empty. Please add products to cart.");
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
      }, 3000);
    } else {
      navigation.navigate("Cart"); // Navigate to root stack's "Cart"
    }
  };

  const goToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      console.log("Chuyển về trang trước.");
      navigation.goBack();
    } else {
      console.log("Không thể quay lại, ở lại trang Home.");
      // No navigation needed since we're already on Home
    }
  };

  const sliderImages = [
    "https://drive.google.com/uc?export=download&id=1QsdLY9t9-9bx98pccuqFMRP8FlIB79pt",
    "https://drive.google.com/uc?export=download&id=1E5uQPeDGr-kgQSV8xH2arQzLYlsePaz2",
    "https://drive.google.com/uc?export=download&id=1Q2BRub80vZU85w_WpPwidhY77hOI4COl",
    "https://drive.google.com/uc?export=download&id=1s3tr08AbEU7rn73QvD-03MkkELIWjTdN",
  ];

  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");
  const [getProductByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [getFeaturedProducts, setGetFeaturedProducts] = useState<ProductListParams[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });
      if (activeCat) {
        fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
        fetchFeaturedProducts({ setGetFeaturedProducts, catID: activeCat });
      }
    }, [activeCat])
  );

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {displayMessage && (
        <DisplayMessage
          message={message}
          visible={() => setDisplayMessage(!displayMessage)}
        />
      )}
      <HeadersComponent gotoCartScreen={gotoCartScreen} />

      {/* Slider */}
      <View style={{ height: 200 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: "#efg" }}
        >
          <ImageSlider images={sliderImages} />
        </ScrollView>
      </View>

      {/* Danh sách danh mục sản phẩm */}
      <View style={{ backgroundColor: "yellow", flex: 1 }}>
        {/* Tiêu đề danh mục */}
        <View
          style={{
            backgroundColor: "pink",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 1,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
            Products from Selected Category
          </Text>
          <Pressable>
            <Text style={{ fontSize: 11, fontWeight: "bold", padding: 10 }}>
              See ALL
            </Text>
          </Pressable>
        </View>

        {/* Danh mục sản phẩm */}
        <FlatList
          data={getCategory}
          renderItem={({ item }) => (
            <CategoryCard
              item={{ name: item.name, images: item.images, _id: item._id }}
              catStyleProps={{
                height: 100,
                width: 100,
                radius: 10,
                resizeMode: "contain",
              }}
              catProps={{
                activeCat: activeCat,
                onPress: () => {
                  setActiveCat(item._id);
                  fetchProductsByCatID({
                    setGetProductsByCatID,
                    catID: item._id,
                  });
                },
              }}
            />
          )}
          keyExtractor={(item) => item._id}
          horizontal={false}
          numColumns={3}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ marginTop: 1 }}
        />

        {/* Hiển thị danh sách sản phẩm */}
        <View
          style={{
            backgroundColor: "#fff",
            borderWidth: 7,
            borderColor: "green",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            padding: 10,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getProductByCatID.length > 0 ? (
              getProductByCatID.map((item, index) => (
                <View key={index} style={{ alignItems: "center", margin: 5 }}>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    resizeMode="contain"
                  />
                  <Text style={{ textAlign: "center", marginTop: 5 }}>
                    {item.name}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{ padding: 10 }}>Không có sản phẩm nào</Text>
            )}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View
          style={{
            backgroundColor: "#fff",
            borderWidth: 7,
            borderColor: "blue",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
            Featured Products
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getFeaturedProducts.length > 0 ? (
              getFeaturedProducts.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ alignItems: "center", margin: 5 }}
                  onPress={() => navigation.navigate("ProductDetails", item)} // Fixed navigation
                >
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    resizeMode="contain"
                  />
                  <Text style={{ textAlign: "center", marginTop: 5 }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ padding: 10 }}>Không có sản phẩm nổi bật nào</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;