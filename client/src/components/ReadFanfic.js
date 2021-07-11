import React, {useState, useCallback, useEffect, useContext} from 'react'
import 'react-markdown-editor-lite/lib/index.css';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'

export default function DetailMyFanfic() {


    const id = useParams().id
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [fanfictions, setFanfictions] = useState()
    const [fanfick, setFanfick] = useState()
    const [user, setUser] = useState(null)
    const [text, setText] = useState()
    const [rating, setRating] = useState()
    const [title, setTitle] = useState(null)
    const [currentFanfiction, setCurrentFanfiction] = useState(null)

    const getFanfic = useCallback(async () => {
        try {
            const fetched = await request(`/api/fanfics/${id}`, 'GET', null)
            setTitle(fetched.fanfic.title)
            setText(fetched.fanfic.body)
            setUser(
                {
                    name: fetched.fanfic.user_name,
                    photo: fetched.fanfic.url_photo,
                    id: fetched.fanfic.user,
                }
            )
            setRating({
                liked: fetched.fanfic.liked,
                dis_liked: fetched.fanfic.dis_liked,
            })
            setCurrentFanfiction(fetched.fanfic.fanfiction)
        } catch (e) {
        }
    }, [request])

    const clickLike = useCallback(async () => {
        try {
            const fetched = await request(`/api/fanfics/like/${id}`, 'POST', {
                user_id: auth.userId
            })
            setRating({
                liked: fetched.liked,
                dis_liked: fetched.dis_liked,
            })
            setFanfictions([...fetched.items])
        } catch (e) {
        }
    }, [request])

    const clickDislike = useCallback(async () => {
        try {
            const fetched = await request(`/api/fanfics/dislike/${id}`, 'POST', {
                user_id: auth.userId
            })
            setRating({
                liked: fetched.liked,
                dis_liked: fetched.dis_liked,
            })
        } catch (e) {
        }
    }, [request])

    const getFanfiction = useCallback(async () => {
        try {
            const fetched = await request('/api/fanfictions', 'GET', null)
            setFanfictions([...fetched.items])
        } catch (e) {
        }
    }, [request])


    useEffect(() => {
        getFanfic()
    }, [getFanfic])

    useEffect(() => {
        getFanfiction()
    }, [getFanfiction])


    const mdParser = new MarkdownIt()

    function handleEditorChange({html, text}) {
        setText(text)
    }

    if (loading || !fanfictions || user === null) {
        return <Loader/>
    }

    return (
        <>
            {fanfictions && rating &&
            <div className="mt-10 pt-10 mx-10 justify-center sm:mt-0">
                <div className="md:grid  justify-center md:gap-6">
                    <div className="mt-5 md:mt-0 ">
                        <form action="#" method="POST">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium text-gray-700">
                                                Название
                                            </label>
                                            <p
                                                id="first-name"
                                                className="text-lime-600 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase"
                                            >
                                                {title}
                                            </p>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country"
                                                   className="block text-sm font-medium text-gray-700">
                                                Категория
                                            </label>

                                            {
                                                fanfictions.map(function (f) {
                                                    if (f._id === currentFanfiction) {
                                                        return <p
                                                            className="text-lime-600 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase">{f.name}</p>
                                                    }
                                                })
                                            }
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country"
                                                   className="block text-sm font-medium text-gray-700">
                                                Автор
                                            </label>
                                            <p className=" text-lime-600 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase">
                                                {user.name}
                                            </p>
                                            <span
                                                className="h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                                                <img src={user.photo}
                                                     className="h-14 w-14 text-gray-300" fill="currentColor"
                                                     viewBox="0 0 18 18"/>
                                            </span>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            {
                                                auth.isAuthenticated &&
                                                <div className="max-w-md flex">

                                                    <label className="block text-sm font-medium flex text-gray-700">
                                                        {
                                                            rating.dis_liked.indexOf(auth.userId) === -1 &&
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 className="h-7 w-7 text-green-800 hover:text-green-800"
                                                                 viewBox="0 0 24 24" fill="currentColor">
                                                                <path
                                                                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                                                            </svg>
                                                        }
                                                        {
                                                            rating.dis_liked.indexOf(auth.userId) !== -1 &&
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 className="h-6 w-6 hover:text-green-800" fill="none"
                                                                 onClick={clickLike}
                                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                                                            </svg>

                                                        }

                                                        <p
                                                            id="first-name"
                                                            className="text-lime-600 px-4 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase"
                                                        >
                                                            {rating.liked.length}
                                                        </p>
                                                    </label>
                                                    <label className="block text-sm font-medium flex text-gray-700">
                                                        {
                                                            rating.dis_liked.indexOf(auth.userId) !== -1 &&
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 onClick={clickDislike}
                                                                 className="h-6 w-6 text-red-800" viewBox="0 0 20 20"
                                                                 fill="currentColor">
                                                                <path
                                                                    d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
                                                            </svg>
                                                        }
                                                        {
                                                            rating.dis_liked.indexOf(auth.userId) === -1 &&
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 onClick={clickDislike}
                                                                 className="h-6 w-6 hover:text-red-800" fill="none"
                                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/>
                                                            </svg>

                                                        }
                                                        <p
                                                            id="first-name"
                                                            className="text-lime-600 px-4 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase"
                                                        >
                                                            {rating.dis_liked.length}
                                                        </p>
                                                    </label>
                                                </div>
                                            }
                                        </div>

                                        <div className="col-span-6 max-w-2xl">
                                            <MdEditor view={{md: false, menu: true, fullScreen: true}}
                                                      style={{height: '500px', weight: '100px'}}
                                                      defaultValue={text}
                                                      renderHTML={text => mdParser.render(text)}
                                                      onChange={handleEditorChange}/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            }
        </>
    )
}