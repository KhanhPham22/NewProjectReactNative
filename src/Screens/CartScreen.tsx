import { View, Text, Platform, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import DisplayMessage from "../Components/HeaderComponents/DisplayMessage";
import { CartState, ProductListParams } from "../TypesCheck/ProductCartTypes";
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from "../Redux/CartReducer";

const CartScreen = ({ navigation }: TabsStackScreenProps<"Cart">) => {
    const cart = useSelector((state: CartState) => state.cart?.cart ?? []);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);

    const gotoCartScreen = () => {
        if (cart.length === 0) {
            setMessage("Cart is empty. Please add products to cart.");
            setDisplayMessage(true);
            setTimeout(() => setDisplayMessage(false), 3000);
        } else {
            navigation.navigate("Home");
        }
    };

    const gotoPreviousScreen = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate("Home");
        }
    };

    const handleIncreaseQuantity = (item: ProductListParams) => {
        dispatch(increaseQuantity(item));
    };

    const handleDecreaseQuantity = (item: ProductListParams) => {
        dispatch(decreaseQuantity(item));
    };

    const handleRemoveFromCart = (itemId?: string) => {
        if (!itemId) return;
        dispatch(removeFromCart(itemId));
        setMessage("Product removed from cart.");
        setDisplayMessage(true);
        setTimeout(() => setDisplayMessage(false), 3000);
    };

    const renderCartItem = ({ item }: { item: ProductListParams }) => {
        if (!item || !item._id) return null;
        return (
            <View style={{ 
                flexDirection: "row", 
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: 10, 
                backgroundColor: "#333", 
                marginVertical: 5, 
                borderRadius: 8 
            }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ color: "white", fontSize: 14 }}>Price: ${item.price}</Text>
                    {item.quantity !== undefined && (
                        <Text style={{ color: "white", fontSize: 14 }}>Quantity: {item.quantity}</Text>
                    )}
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Pressable 
                        onPress={() => handleDecreaseQuantity(item)} 
                        style={{ padding: 5, backgroundColor: "red", borderRadius: 5 }}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>-</Text>
                    </Pressable>
                    <Text style={{ color: "white", marginHorizontal: 10 }}>{item.quantity ?? 1}</Text>
                    <Pressable 
                        onPress={() => handleIncreaseQuantity(item)} 
                        style={{ padding: 5, backgroundColor: "green", borderRadius: 5 }}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>+</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() => handleRemoveFromCart(item._id)} 
                        style={{ marginLeft: 10, padding: 5, backgroundColor: "gray", borderRadius: 5 }}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, flex: 1, backgroundColor: "black" }}>
            {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}

            <HeadersComponent
                gotoCartScreen={gotoCartScreen}
                cartLength={cart.length}
                goToPrevios={gotoPreviousScreen}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                {Array.isArray(cart) && cart.length > 0 ? (
                    <FlatList
                        data={cart}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item?._id ?? Math.random().toString()}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 18 }}>Your cart is empty. Add some products!</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;
