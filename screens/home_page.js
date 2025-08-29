import React, { useContext, useState, useEffect } from "react";
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
import showError from "../shared_components/error_message";
import { categories } from "../shared_components/models/categories";

export default function Root() {
  const { items, loading, search, filterByCategory, extremeError, fetchItems, allItems, generalError } = useContext(ItemsContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  useEffect(() => {
    if (extremeError) {
      showError(extremeError, fetchItems, true);
    }
    else if (generalError) {
      showError(generalError, () => {
        if (selectedSubCategory) {
          filterByCategory(selectedCategory, selectedSubCategory);
        } else {
          filterByCategory(selectedCategory);
        }
      },
        () => {
          setSelectedCategory("");
          setSelectedSubCategory("");
        }
      );

    }
  }, [extremeError, generalError]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Product List</Text>
        <TextInput
          style={styles.searchInput}
          editable={allItems.length > 0}
          placeholder="Search products..."
          placeholderTextColor="black"
          onChangeText={(text) => {
            search(text);
          }
          }
        />
        <Text style={styles.instructions}>select category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            enabled={allItems.length > 0}
            onValueChange={async (value) => {
              try {
                setSelectedCategory(value);
                await filterByCategory(value);
              } catch (e) {
                setSelectedCategory("");
              }
            }
            }
            style={styles.picker}
          >
            <Picker.Item label="All" value="all" />
            {Object.keys(categories).map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
          {selectedCategory && selectedCategory !== "all" && (
            <>
              <Text style={styles.instructions}>Select Sub Category</Text>
              <Picker
                selectedValue={selectedSubCategory}
                onValueChange={async (sub) => {
                  try {
                    setSelectedSubCategory(sub);
                    await filterByCategory(selectedCategory, sub);
                  } catch (e) {
                    setSelectedSubCategory("");
                  }
                }
                }
                style={styles.picker}
              >
                <Picker.Item label="All" value="" />
                {categories[selectedCategory].map((sub) => (
                  <Picker.Item key={sub} label={sub} value={sub.toLowerCase()} />
                ))}
              </Picker>
            </>
          )}
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="white" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Text style={styles.itemBrand}>Brand: {item.brand}</Text>
                <Text style={styles.itemName}>Name: {item.name}</Text>
                <Text style={styles.itemCategory}>
                  Category: {item.category} → {item.subCategory}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              !loading && (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No data found</Text>
                </View>
              )
            }
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
    backgroundColor: "gray",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "red",
  },
  searchInput: {
    height: 45,
    backgroundColor: "white",
    color: "black",
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
    backgroundColor: "blue",
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
  instructions: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
  },
});