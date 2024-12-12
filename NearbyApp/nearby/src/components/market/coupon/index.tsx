import { IconTicket } from "@tabler/icons-react-native";
import { View, Text } from "react-native";

import { s } from './styles';
import { colors } from "@/styles/theme";

type Props = {
    code: string
}

export function Coupon({code}: Props){
    return(
        <View style={s.container}>
            <Text style={s.title}>Utilize esse cupom:</Text>

            <Text style={s.content}>
                <IconTicket size={15} color={colors.green.light}/>
                <Text style={s.code}>{code}</Text>
            </Text>
        </View>
    )
}