import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { ItemsContext } from "../state_manager/items";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Root() {
  const { items, loading, search, filterByCategory } = useContext(ItemsContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Product List</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#888"
          onChangeText={(text) => search(text)}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              filterByCategory(value);
            }}
            style={styles.picker}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Electronics" value="Electronics" />
            <Picker.Item label="Category B" value="Category B" />
            <Picker.Item label="Category C" value="Category C" />
          </Picker>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#1E90FF" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemBrand}>{item.brand}</Text>
                <Text style={styles.itemCategory}>
                  {item.category} → {item.subCategory}
                </Text>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  searchInput: {
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  itemCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 4,
  },
  itemBrand: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  itemCategory: {
    fontSize: 12,
    color: "#888",
  },
});
