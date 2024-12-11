import { useEffect, useState } from "react";
import { View, Alert } from "react-native";

import { Categories, CategoriesProps } from "@/components/categories";

import { api } from "@/services/api";
import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>();
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketsProps[]>();

  async function fatchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel carregar as categorias");
    }
  }

  useEffect(() => {
    fatchCategories();
  }, []);

  async function fetchMarkets() {
    try {
      if (!category) {
        return;
      }

      const { data } = await api.get("/markets/category/" + category);
      console.log("Estabelecimentos", data);
      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel buscar os estabelecimentos.");
    }
  }
  useEffect(() => {
    fetchMarkets();
  }, [category]);

  type MarketsProps = PlaceProps;

  return (
    <View style={{ flex: 1, backgroundColor: '#959595' }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}

      />


      <Places data={markets} />
    </View>
  );
}
