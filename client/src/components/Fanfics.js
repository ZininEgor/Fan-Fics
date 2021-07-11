import React, {useState, useCallback, useContext, useEffect} from 'react'
import Nav from './MainFanfics/Nav.js'
import NavItem from './MainFanfics/NavItem.js'
import List from './MainFanfics/List.js'
import ListItem from './MainFanfics/ListItem.js'
import {AuthContext} from "../context/AuthContext";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {useHistory} from "react-router-dom";

export default function Fanfics() {

    const {request, loading} = useHttp()
    const [fanfics, setFanfics] = useState(null)
    const [fanfictions, setFanfictions] = useState(null)
    const history = useHistory()
    const detailFanfic = (id) => {
        history.push(`/fanfics/detail/${id}`)
    }

    const getFanfic = useCallback(async () => {
        try {
            const fetched = await request('/api/fanfics', 'GET', null)
            setFanfics([...fetched])
        } catch (e) {
        }
    }, [request])

    useEffect(() => {
        getFanfic()
    }, [getFanfic])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="bg-gray-50">
            {fanfics &&
            <div className="grid grid-rows-6 grid-flow-col gap-4">
                <div className="row-span-6 h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-120">
                    <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
                        <div className="flex items-center justify-center pt-6">

                        </div>
                        <nav className="mt-6">
                            <div>
                                <a
                                    className="w-full font-thin uppercase text-blue-500 flex items-center p-4 my-2 transition-colors duration-200 justify-start bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-blue-500"
                                    href="#"
                                >
          <span className="text-left">
            <svg
                width={20}
                height={20}
                fill="currentColor"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
            </svg>
          </span>
                                    <span className="mx-4 text-sm font-normal">Dashboard</span>
                                </a>
                                <a
                                    className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
                                    href="#"
                                >
          <span className="text-left">
            <svg
                width={20}
                height={20}
                fill="currentColor"
                className="m-auto"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
            </svg>
          </span>
                                    <span className="mx-4 text-sm font-normal">Projects</span>
                                </a>
                                <a
                                    className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
                                    href="#"
                                >
          <span className="text-left">
            <svg
                width={20}
                height={20}
                fill="currentColor"
                className="m-auto"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z"></path>
            </svg>
          </span>
                                    <span className="mx-4 text-sm font-normal">My tasks</span>
                                </a>
                                <a
                                    className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
                                    href="#"
                                >
          <span className="text-left">
            <svg
                width={20}
                height={20}
                fill="currentColor"
                className="m-auto"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M960 0l960 384v128h-128q0 26-20.5 45t-48.5 19h-1526q-28 0-48.5-19t-20.5-45h-128v-128zm-704 640h256v768h128v-768h256v768h128v-768h256v768h128v-768h256v768h59q28 0 48.5 19t20.5 45v64h-1664v-64q0-26 20.5-45t48.5-19h59v-768zm1595 960q28 0 48.5 19t20.5 45v128h-1920v-128q0-26 20.5-45t48.5-19h1782z"></path>
            </svg>
          </span>
                                    <span className="mx-4 text-sm font-normal">Calendar</span>
                                </a>
                                <a
                                    className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
                                    href="#"
                                >
          <span className="text-left">
            <svg
                width={20}
                height={20}
                className="m-auto"
                fill="currentColor"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
            </svg>
          </span>
                                    <span className="mx-4 text-sm font-normal">Time manage</span>
                                </a>
                                <a
                                    className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
                                    href="#"
                                >
          <span className="text-left">
            <svg
                width={20}
                height={20}
                fill="currentColor"
                className="m-auto"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
            </svg>
          </span>
                                    <span className="mx-4 text-sm font-normal">Reports</span>
                                </a>
                                <a
                                    className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500"
                                    href="#"
                                >
          <span className="text-left">
            <svg
                width={20}
                fill="currentColor"
                height={20}
                className="h-5 w-5"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"></path>
            </svg>
          </span>
                                    <span className="mx-4 text-sm font-normal">Settings</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="col-span-2 shadow mt-4 pl-5 sm:rounded-md sm:overflow-hidden bg-white justify-items:center items-center" style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/fanfics-ac485.appspot.com/o/bc.svg?alt=media&token=e562e4f1-9783-43f6-9135-4fcb3b230f3a)`, backgroundRepeat: 'no-repeat',}}>
                    <div className="text-center font-light flex items-center pt-10 justify-center" >
                        <form className="flex w-full max-w-sm space-x-3">
                            <div className="relative text-black flex items-center w-full lg:w-82 h-full group">
                                <div
                                    className="absolute z-50 flex items-center justify-center bg-white block w-auto h-10 p-3 pr-2 text-sm text-black uppercase cursor-pointer sm:hidden">
                                    <svg
                                        fill="none"
                                        className="relative w-5 h-5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <svg
                                    className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-black pointer-events-none fill-current group-hover:text-black sm:block"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                                </svg>
                                <input
                                    type="text"
                                    className="block w-full py-1.5 pl-10 pr-4 text-black leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black ring-opacity-90 bg-gray-100 dark:bg-black text-blacl aa-input"
                                    placeholder="Найдется все..."
                                />
                                <div
                                    className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-black border border-black rounded-2xl md:block">
                                    +
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row-span-5 col-span-2 shadow sm:rounded-md bg-white sm:overflow-hidden">
                    <List>
                        {fanfics.map((fanfic) => (
                            <ListItem key={fanfic.id} detailFanfic={detailFanfic} fanfic={fanfic}/>
                        ))}
                    </List>
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </a>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                    <span className="font-medium">97</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                                    <a
                                        href="#"
                                        aria-current="page"
                                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    >
                                        1
                                    </a>
                                    <a
                                        href="#"
                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    >
                                        2
                                    </a>
                                    <a
                                        href="#"
                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                    >
                                        3
                                    </a>
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
                                    <a
                                        href="#"
                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                                    >
                                        8
                                    </a>
                                    <a
                                        href="#"
                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    >
                                        9
                                    </a>
                                    <a
                                        href="#"
                                        className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    >
                                        10
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}