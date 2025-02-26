import {
  View,
  Text,
  Platform,
  Pressable,
  ScrollView,
  Alert,
  FlatList,
  Image,
  TouchableOpacity, // Thêm TouchableOpacity
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import ImageSlider from "../Components/HomeSreenComponents/ImageSlider";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { CategoryCard } from "../Components/HomeSreenComponents/CategoryCard";
import {
  fetchCategories,
  fetchProductsByCatID,
  fetchFeaturedProducts,
} from "../MiddleWares/HomeMiddleWare";

type Props = {};

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const gotoCartScreen = () => {
    navigation.navigate("Cart");
  };

  const sliderImages = [
    "https://drive.google.com/uc?export=download&id=1QsdLY9t9-9bx98pccuqFMRP8FlIB79pt",
    "https://drive.google.com/uc?export=download&id=1E5uQPeDGr-kgQSV8xH2arQzLYlsePaz2",
    "https://drive.google.com/uc?export=download&id=1Q2BRub80vZU85w_WpPwidhY77hOI4COl",
    "https://drive.google.com/uc?export=download&id=1s3tr08AbEU7rn73QvD-03MkkELIWjTdN",
  ];

  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");
  const [getProductByCatID, setGetProductsByCatID] = useState<
    ProductListParams[]
  >([]);
  const [getFeaturedProducts, setGetFeaturedProducts] = useState<
    ProductListParams[]
  >([]);

  useEffect(() => {
    if (activeCat) {
      fetchFeaturedProducts({
        setGetFeaturedProducts,
        catID: activeCat, // Ensure catID is passed
      });
    }
  }, [activeCat]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });

      // Ensure you pass the activeCat as catID
      if (activeCat) {
        fetchFeaturedProducts({
          setGetFeaturedProducts,
          catID: activeCat, // Pass the activeCat as catID
        });
      }

      if (activeCat) {
        fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
      }
    }, [activeCat])
  );

  useEffect(() => {
    if (activeCat) {
      fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
    }
  }, [activeCat]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });
      if (activeCat) {
        fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
      }
    }, [activeCat])
  );

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "black",
      }}
    >
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
                  setActiveCat(item._id); // Cập nhật danh mục đang hoạt động
                  fetchProductsByCatID({
                    setGetProductsByCatID,
                    catID: item._id,
                  }); // Fetch sản phẩm cho danh mục này
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
                    source={{ uri: item.images[0] }} // Hiển thị hình ảnh sản phẩm
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
                  onPress={() => navigation.navigate("ProductDetails", item)} // Thêm hàm onPress để điều hướng
                >
                  <Image
                    source={{ uri: item.images[0] }} // Hiển thị hình ảnh sản phẩm nổi bật
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