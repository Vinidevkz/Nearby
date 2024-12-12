import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginVertical: 5
    },

    text: {
        color: colors.gray[500],
        fontSize: 14,
        fontFamily: fontFamily.regular,
        flex: 1 
    }
})