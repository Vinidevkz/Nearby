import {View, Text, StatusBar} from "react-native";
import { router } from "expo-router";

import { Welcome } from "@/components/welcome";
import { Steps } from "@/components/steps";
import { Button } from "@/components/button";


export default function Index(){
    return(
        <View style={{flex: 1, padding: 40, gap: 40}}>
            <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
            <Welcome />
            <Steps />
            <Button onPress={() => router.navigate("/home")}>
                <Button.Title>Começar</Button.Title>
            </Button>
        </View>
    )
}