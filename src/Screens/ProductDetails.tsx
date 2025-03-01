import { View, Image, Text, Platform, ScrollView, Dimensions, Pressable, SafeAreaView, ImageBackground } from 'react-native';
import React, { useState } from 'react'; // Added useState import
import { RootStackScreenProps } from '../Navigation/RootNavigation';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { HeadersComponent } from '../Components/HeaderComponents/HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { CartState, ProductListParams } from '../TypesCheck/ProductCartTypes';
import { addToCart } from '../Redux/CartReducer';

const { width, height } = Dimensions.get("window");

const ProductDetails = ({ navigation, route }: RootStackScreenProps<"ProductDetails">) => {
  const { _id, images, name, price, oldPrice, inStock, color, size, description, quantity } = route.params;

  const cart = useSelector((state: { cart: CartState }) => state.cart.cart.cart || []);
  const dispatch = useDispatch();
  const [message, setMessage] = useState(""); // Changed to useState
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState(false); // New state for heart toggle

  const gotoCartScreen = () => {
    if (cart.length === 0) {
      setMessage("Cart is empty. Please add products to cart.");
      setDisplayMessage(true);
      setTimeout(() => setDisplayMessage(false), 3000);
    } else {
      navigation.navigate("TabsStack", { screen: "Cart" });
    }
  };

  const gotoPreviousScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("OnboardingScreen");
    }
  };

  const productImages: [string] = images.length > 0 ? [images[0]] : [""];

  const product: ProductListParams = {
    _id,
    images: productImages,
    name,
    price,
    inStock,
    color,
    size,
    description,
    quantity: quantity ?? 1,
  };

  const addItemToCart = () => {
    const findItem = cart.find((product) => product._id === _id);
    if (findItem) {
      setMessage("Product is already in cart.");
      setDisplayMessage(true);
      setTimeout(() => setDisplayMessage(false), 3000);
    } else {
      dispatch(addToCart(product));
      setMessage("Product added to cart successfully.");
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
        navigation.navigate("TabsStack", { screen: "Cart" });
      }, 3000);
    }
  };

  // Toggle heart icon
  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const truncateDescription = (text: string | undefined, maxLength: number = 100) => {
    if (!text) return "No description available";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 20 : 0, flex: 1, backgroundColor: "white" }}>
      <HeadersComponent gotoCartScreen={gotoCartScreen} goToPrevios={gotoPreviousScreen} />
      {displayMessage && (
        <View style={{ padding: 10, backgroundColor: "rgba(0,0,0,0.8)", position: "absolute", top: 50, left: 0, right: 0, zIndex: 10 }}>
          <Text style={{ color: "white", textAlign: "center" }}>{message}</Text>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#F5E8F5" }}>
        <ImageBackground style={{ width, height: 300, marginTop: 10 }}>
          <View style={{ padding: 3, flexDirection: "row", alignItems: "center", justifyContent: "space-between", position: "absolute", top: 10, left: 10, right: 10 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#60C3C3", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "yellow", textAlign: "center", fontWeight: "600", fontSize: 12 }}>
                {oldPrice ? (((oldPrice - price) / oldPrice) * 100).toFixed(1) : 0}% off
              </Text>
            </View>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <MaterialCommunityIcons name="share-variant" size={25} color="green" />
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {images?.[0] && <Image style={{ width: 300, height: 250, resizeMode: "contain" }} source={{ uri: images[0] }} />}
          </View>
          {/* Heart Icon with Pressable */}
          <Pressable
            onPress={toggleLike}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0", flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 10, right: 10 }}
          >
            <AntDesign
              name={isLiked ? "heart" : "hearto"} // Switch between filled and outlined heart
              size={25}
              color={isLiked ? "red" : "grey"} // Red when liked, grey when not
            />
          </Pressable>
        </ImageBackground>
        <View style={{ backgroundColor: "white", borderColor: "purple", borderWidth: 2, margin: 10, padding: 10, borderRadius: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "purple" }}>{name ?? "No Name"}</Text>
          <Text style={{ fontSize: 16, color: "black" }}>Price: {price ?? 0} $</Text>
          <Text style={{ fontSize: 16, color: "grey", textDecorationLine: "line-through" }}>Old Price: {oldPrice ?? 0} $</Text>
          <Text style={{ fontSize: 16, color: "blue" }}>
            {quantity !== undefined && quantity > 0 ? `In Stock - Quantity: ${quantity}` : "Out of Stock"}
          </Text>
        </View>
        <View style={{ backgroundColor: "#D9E6F5", borderColor: "red", borderWidth: 2, margin: 10, padding: 10, borderRadius: 10, width: width - 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "blue" }}>Delivery</Text>
          <Text style={{ fontSize: 14, color: "red" }}>Delivery is Available</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, flexWrap: "wrap" }}>
            <Ionicons name="location-sharp" size={25} color="green" />
            <Text style={{ fontSize: 14, color: "brown", marginLeft: 5 }} numberOfLines={2} ellipsizeMode="tail">
              Delivery to: CAMPUS THANH THAI 7/1 Thanh Thai, Ward 12, Ho Chi Minh City
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "white", paddingBottom: 10 }}>
          <Pressable style={{ backgroundColor: "green", padding: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, margin: 10 }} onPress={addItemToCart}>
            <Text style={{ color: "yellow", fontSize: 20, fontWeight: "bold" }}>Add to Cart</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;