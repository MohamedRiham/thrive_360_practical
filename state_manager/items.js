import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../services/api_service";
const baseUrl = "http://172.25.107.69:3000";
// Create context with default values
export const ItemsContext = createContext({
  items: [],
  loading: false,
  fetchItems: async () => { },
  search: () => { },
  filterByCategory: () => { }, // 👈 added here
});

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await fetchData(`${baseUrl}/items`);
      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    } finally {
      setLoading(false);
    }
  };

  const search = (value) => {
    const lowerValue = value.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerValue) ||
        item.brand.toLowerCase().includes(lowerValue) ||
        item.category.toLowerCase().includes(lowerValue) ||
        item.subCategory.toLowerCase().includes(lowerValue)
    );
    setFilteredItems(filtered);
  };


  const filterByCategory = async (category, subCategory = "") => {
    try {
      setLoading(true);
      if (!category || category === "All") {

        await fetchItems();
        return;
      }
      else {
        let url = `${baseUrl}/items/filter?category=${encodeURIComponent(category)}`;
        if (subCategory) {
          url += `&subCategory=${encodeURIComponent(subCategory)}`;
        }

        const data = await fetchData(url);
        setFilteredItems(data);
      }
    } catch (err) {
      console.error("Failed to fetch filtered items", err);
    }
    setLoading(false);

  };

  // Fetch once on mount
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ items: filteredItems, loading, fetchItems, search, filterByCategory }}>
      {children}
    </ItemsContext.Provider>
  );
};
