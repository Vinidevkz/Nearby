import { View, Alert, Modal } from "react-native"
import { router, useLocalSearchParams, Redirect } from "expo-router"
import { useCameraPermissions, CameraView } from "expo-camera"


import { api } from "@/services/api"
import { useEffect, useState } from "react"

import  Loading  from "@/components/loading"

import { Cover } from "@/components/market/cover"

import { Button } from "@/components/button"
import { Details, PropsDetails } from "@/components/market/details"
import { Coupon } from "@/components/market/coupon"
import { s } from "@/components/button/styles"

type DataProps = PropsDetails & {
    cover: string
}

export default function Market(){

    const [data, setData] = useState<DataProps>()
    const [coupon, setCoupon] = useState<string | null>("FG457GK") 
    const [isLoading, setIsLoading] = useState(true)
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
    const [ cupomIsFetching, setCupomIsFetching ] = useState(false)

    const [ permission, requestPermission ] = useCameraPermissions()

    async function fetchMarket() {
        try{
            const {data} = await api.get("/markets/" + params.id)
            setData(data)
            setIsLoading(false)
        }catch(error){
            console.log(error)
            Alert.alert("Erro", "não foi possível carregar os dados do estabelecimento.", [{text: "Ok", onPress: () => router.back()}])
        }
    }

    const params = useLocalSearchParams<{ id: string }>()

    useEffect(() => {
        fetchMarket()
    }, [params.id])

    if(isLoading){
        return <Loading/>
    }

    if (!data){
        return <Redirect href={"/home"}/> 
    }

    function handleOpenCamera(){
        try{
            const {granted} = await requestPermission()
        }catch(error){
            console.log(error)
        }
    }

    async function getCupom(id: string) {
        try{
            setCupomIsFetching(true)

        }catch(error){
            console.log(error)
            Alert.alert("Não foi possível utilizar o cupom.")
        }finally{
            setCupomIsFetching(false)
        }
    }

    return(
        <View style={{flex: 1}}>
            <Cover uri={data.cover}/>
            <Details data={data}/>
            {coupon && <Coupon code={coupon}/>}

            <View style={{padding: 32}}>
                <Button onPress={() => handleOpenCamera()}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{flex: 1}} visible={isVisibleCameraModal}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Button onPress={() => setIsVisibleCameraModal(false)}>
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}