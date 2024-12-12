import {View, Text} from "react-native";

import {IconPhone, IconMapPin, IconTicket} from "@tabler/icons-react-native";

import {s} from "./styles"

export type PropsDetails = {
    name: string
    description: string,
    address: string
    phone: string
    coupons: number
    rules: {
        id: string
        description: string
    }
}