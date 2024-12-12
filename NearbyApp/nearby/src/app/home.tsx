import { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import { Categories, CategoriesProps } from "@/components/categories";

import { api } from "@/services/api";
import { fontFamily, colors } from "@/styles/theme"
import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>();
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);

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

  type MarketsProps = PlaceProps & {
    latitude: number,
    longitude: number
  }

  const currentLocation = {
    latitude: -23.5613987335933,
    longitude: -46.656440659823254
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#959595' }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      >
        <Marker
         identifier="current"
         coordinate={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
         }}
         image={require("@/assets/location.png")}
        />

        {markets.map((item) => (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout>
                <View>
                  <Text style={{fontSize: 14, color: colors.gray[600], fontFamily: fontFamily.medium}}>{item.name}</Text>
                  <Text style={{fontSize: 12, color: colors.gray[600], fontFamily: fontFamily.regular}}>{item.address}</Text>
                </View>
              </Callout>
            </Marker>
         ))}
      </MapView>


      <Places data={markets} />
    </View>
  );
}
