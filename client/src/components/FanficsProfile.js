import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";
import {Loader} from "./Loader";
import {EmptyFanFics} from "./EmptyMyFanfics";

export const FanficsProfile = () => {

    const [pageNumber, setPageNumber] = useState(0)
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [fanfics, setFanfics] = useState(null)
    const [fanfictions, setFanfictions] = useState(null)
    const getMyFanfics = useCallback(async (page_number, limit) => {
        try {
            const fetched = await request(`api/my-fanfiction?page=${page_number}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setFanfics(fetched)
        } catch (e) {
        }
    }, [token, request])

    const deleteFanfic = useCallback(async (id) => {
        try {
            const fetched = await request(`api/my-fanfiction`, 'DELETE', {
                id_fanfic: id,
            }, {
                Authorization: `Bearer ${token}`
            })
            getMyFanfics(pageNumber)
        } catch (e) {
        }
    }, [token, request])

    const getFanfiction = useCallback(async () => {
        try {
            const fetched = await request('/api/fanfictions', 'GET', null)
            setFanfictions([...fetched.items])
        } catch (e) {
        }
    }, [request])

    useEffect(() => {
        getFanfiction()
    }, [getFanfiction])

    useEffect(() => {
        getMyFanfics(pageNumber)
    }, [getMyFanfics])

    useEffect(() => {
        getMyFanfics(pageNumber)
    }, [deleteFanfic])

    if (loading) {
        return <Loader/>
    }

    if (!loading && fanfics === null || fanfics.length === 0) {
        if (fanfics !== null) {
            console.log(fanfics.length === 0)
        }
        return <EmptyFanFics/>
    }

    const DeleteFanfics = (event) => {
        deleteFanfic(event.currentTarget.id)
    }

    const NextPage = () => {
        if (fanfics.length === 10) {
            setPageNumber(pageNumber + 1)
            getMyFanfics(pageNumber + 1)
        }
    }
    const PrevPage = () => {

        if (pageNumber !== 0) {
            setPageNumber(pageNumber - 1)
            getMyFanfics(pageNumber - 1)
        }

    }

    return (
        <div className="bg-gray-50">
            <div className="py-20">
                <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
                    <div
                        className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
                        <div
                            className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                            <div
                                className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                                <p className="text-base text-gray-600 dark:text-gray-400" id="page-view">
                                    Viewing {pageNumber}0 - {pageNumber + 1}0
                                </p>
                                <a className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded"
                                   onClick={PrevPage}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="icon icon-tabler icon-tabler-chevron-left" width={20} height={20}
                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <polyline points="15 6 9 12 15 18"/>
                                    </svg>
                                </a>
                                <a className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer"
                                   onClick={NextPage}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="icon icon-tabler icon-tabler-chevron-right" width={20} height={20}
                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <polyline points="9 6 15 12 9 18"/>
                                    </svg>
                                </a>
                            </div>
                            <div className="lg:ml-6 flex items-center">
                                <NavLink to="/write-fanfic"
                                    className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="icon icon-tabler icon-tabler-plus" width={28} height={28}
                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                         strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <line x1={12} y1={5} x2={12} y2={19}/>
                                        <line x1={5} y1={12} x2={19} y2={12}/>
                                    </svg>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
                        <table className="min-w-full bg-white dark:bg-gray-800">
                            <thead>
                            <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                                <th className="text-gray-600 pl-5 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Company
                                    Contact
                                </th>
                                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Title</th>
                                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Like</th>
                                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Dislike</th>
                                <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">Fanfiction
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                fanfics.map(function (f) {
                                    return <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">

                                        <td className="text-sm pr-6 pl-5 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">#MC10023</td>
                                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{f.title}</td>
                                        <td className="pr-6 whitespace-no-wrap">
                                            <p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">{f.liked.length}</p>
                                        </td>
                                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                            <p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">{f.dis_liked.length}</p>
                                        </td>
                                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{fanfictions.find((fan) => {
                                            return f.fanfiction === fan["_id"]
                                        }).name}</td>
                                        <td className="pr-6">
                                            <div className="w-2 h-2 rounded-full bg-indigo-400"/>
                                        </td>
                                        <td className="pr-8 relative">
                                            <button
                                                className="text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" onClick="dropdownFunction(this)"
                                                     className="icon icon-tabler icon-tabler-dots-vertical dropbtn"
                                                     width={28}
                                                     height={28} viewBox="0 0 24 24" strokeWidth="1.5"
                                                     stroke="currentColor"
                                                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                                    <circle cx={12} cy={12} r={1}/>
                                                    <circle cx={12} cy={19} r={1}/>
                                                    <circle cx={12} cy={5} r={1}/>
                                                </svg>
                                            </button>
                                        </td>
                                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                            <svg id={f._id} type='button' onClick={DeleteFanfics}
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 className="h-7 w-7 rounded-lg shadow-md hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                            </svg>
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}