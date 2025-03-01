import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { ProductListParams } from "../TypesCheck/ProductCartTypes";

const PaymentScreen = ({ navigation, route }: TabsStackScreenProps<"Payment">) => {
  const cartItems = route.params?.cartItems ?? []; // Fallback to empty array if undefined

  const renderPaymentItem = ({ item }: { item: ProductListParams }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.images?.[0] || "https://via.placeholder.com/50" }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity ?? 1}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <Text style={styles.total}>Total: ${(item.price * (item.quantity ?? 1)).toFixed(2)}</Text>
      </View>
    </View>
  );

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity ?? 1)), 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Details</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderPaymentItem}
            keyExtractor={(item) => item._id ?? Math.random().toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.grandTotal}>Grand Total: ${calculateGrandTotal()}</Text>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {route.params ? "No items to display" : "Please add items to your cart first"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
    color: "#1a1a1a",
    letterSpacing: 0.5,
  },
  listContainer: {
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#ffffff",
    marginVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: "#f0f0f0",
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 2,
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e91e63",
  },
  totalContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  grandTotal: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFD700",
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
    color: "#757575",
    fontStyle: "italic",
  },
});

export default PaymentScreen;