import React from 'react'
import {useAuth} from "../hooks/auth.hook";
import {Loader} from "../components/Loader";
import DetailMyFanfic from "../components/ReadFanfic";

export const ReadFanficPage = () => {

    const {ready} = useAuth()


    if (!ready) {
        return <Loader/>
    }

    return (
        <DetailMyFanfic/>
    )
}