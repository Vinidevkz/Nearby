import { StyleSheet } from "react-native";
import {colors, fontFamily} from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        maxHeight: 70,
        position: "absolute",
        zIndex: 1,
        top: 30,
        paddingVertical: 20,
    },

    content: {
        gap: 8,
        paddingHorizontal: 24
    }
})