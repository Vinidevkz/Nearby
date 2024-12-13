import { View, Alert, Modal } from "react-native"
import { router, useLocalSearchParams, Redirect } from "expo-router"
import { useCameraPermissions, CameraView } from "expo-camera"

import { api } from "@/services/api"
import { useEffect, useState, useRef } from "react"

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

    const qrLock = useRef(false)
    console.log(params.id)

    useEffect(() => {
        fetchMarket()
    }, [params.id, coupon])



    async function handleOpenCamera(){
        try{
            const { granted } = await requestPermission()

            if(!granted){
                return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera.")
            }

            qrLock.current = false
            setIsVisibleCameraModal(true)

        }catch(error){
            console.log(error)
            Alert.alert("Cãmera", "Não foi possível utilizar a câmera.")
        }
    }

    async function getCupom(id: string) {
        try{
            setCupomIsFetching(true)
            
            const { data } = await api.patch("/coupons/" + id)

            Alert.alert("Cupom: ", data.coupon)
            setCoupon(data.coupon)
        }catch(error){
            console.log(error)
            Alert.alert("Erro", "Não foi possível utilizar o cupom.")
        }finally{
            setCupomIsFetching(false)
        }
    }

    function handleUseCoupon(id: string){
        setIsVisibleCameraModal(false)

        Alert.alert("Cupom", "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?", [{style: "cancel", text: "Não"}, {text: "Sim", onPress: () => getCupom(id)}])
    }

    if(isLoading){
        return <Loading/>
    }

    if (!data){
        return <Redirect href={"/home"}/> 
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
                <CameraView
                style={{flex: 1}}
                facing="back"
                onBarcodeScanned={({ data }) => {
                    if(data && !qrLock.current){
                        qrLock.current = true
                        setTimeout(() => handleUseCoupon(data), 500)
                    }
                    
                }}

                />

                <View style={{position: 'absolute', flex: 1, width: '100%', alignSelf: 'flex-end', padding: 30, justifyContent: 'center'}}>
                    <Button onPress={() => setIsVisibleCameraModal(false)} isloading={cupomIsFetching}>
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>


            </Modal>
        </View>
    )
}