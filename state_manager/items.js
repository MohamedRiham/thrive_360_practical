import ErrorMessage from "../shared_components/error_message";
import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../services/api_service";
const baseUrl = "https://745f0d73-41cc-4a5d-beef-93fd274e6bd8-dev.e1-us-east-azure.choreoapis.dev/store/store-service/v1.0";
// Create context with default values
export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [itemsFetchedByCategory, setItemsFetchedByCategory] = useState([]);
  const [allItems, setItems] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);
  const [extremeError, setExtremeError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [generalError, setGeneralError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setExtremeError(null);
      const data = await fetchData(`${baseUrl}/items`);

      if (data) {
        setItems(data);
        setFilteredItems(data);
      } else {
        setItems([]);
        setFilteredItems([]);
      }
    } catch (err) {
      setExtremeError("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let tempItemList = itemsFetchedByCategory.length > 0 ? itemsFetchedByCategory : allItems;
    // Search filter
    if (searchValue) {
      tempItemList = tempItemList.filter(item =>
        (item.name?.toLowerCase() || "").includes(searchValue) ||
        (item.brand?.toLowerCase() || "").includes(searchValue) ||
        (item.category?.toLowerCase() || "").includes(searchValue) ||
        (item.subCategory?.toLowerCase() || "").includes(searchValue)
      );
    }
    setFilteredItems(tempItemList);
  };

  const search = (value) => {
    if (!value) {
      setSearchValue("");
    } else {
      setSearchValue(value.toLowerCase());
    }
  };

  const filterByCategory = async (category, subCategory = "") => {
    try {
      setGeneralError(null);
      setLoading(true);
      if (!category || category === "all") {
        setItemsFetchedByCategory([]);
        setFilteredItems(allItems);
      }
      else {
        let url = `${baseUrl}/items/filter?category=${encodeURIComponent(category)}`;
        if (subCategory) {
          url += `&subCategory=${encodeURIComponent(subCategory)}`;
        }
        const data = await fetchData(url);
        if (data) {
          setItemsFetchedByCategory(data);
          setFilteredItems(data);
        }
      }
    } catch (err) {
      setGeneralError("Something went wrong while fetching filtered items");
    }
    setLoading(false);
  };

  useEffect(() => {
    applyFilters();
  }, [itemsFetchedByCategory, searchValue]);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ items: filteredItems, loading, fetchItems, search, filterByCategory, extremeError, allItems, generalError }}>
      {children}
    </ItemsContext.Provider>
  );
};
