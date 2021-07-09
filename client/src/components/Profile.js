import React, {useState} from 'react'
import CheckBoxMulti from './CheckBoxMulti'
import {useHttp} from "../hooks/http.hook";
import {useEffect} from "react/cjs/react.production.min";

export const Profile = props => {


    const [profile, setProfile] = useState(props.profile)
    const [name, setName] = useState(props.profile.name,)
    const [fan, setFan] = useState(props.fan.forEach((item) => {
        item.checked = props.profile.preferences.includes(item._id);
    }))

    const [fanfictions, setFanfictions] = useState([
        ...props.fan
    ])


    const changeHandler = event => {
        const oldFanfictions = fanfictions
        oldFanfictions[event.currentTarget.id].checked = event.currentTarget.checked
        setFanfictions(oldFanfictions)

    }

    const saveHandler = () => {
        const pref = [
            ...props.fan.filter(function (prefer) {
                if (prefer.checked) {
                    return prefer._id
                }
            })
        ]
        props.putProfile(name, pref.map(function (prefer) {
            return prefer._id
        }))

    }

    const changeName = event => {
        setName(event.currentTarget.value)
    }

    return (
        <>
            <div className="min-h-screen flex items-top justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div>
                    <div>
                        <form>
                            <div className="shadow sm:rounded-md bg-white sm:overflow-hidden">
                                <div className="px-4 py-5 bg-violet-500 space-y-6 sm:p-6 ">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="first-name"
                                                id="first-name"
                                                defaultValue={props.profile.email}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                defaultValue={name}
                                                onChange={changeName}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="px-4 sm:px-6 lg:px-8">
                                        <CheckBoxMulti
                                            changeHandler={changeHandler}
                                            fanfictions={fanfictions}
                                        />
                                    </div>


                                    <div className="px-4 sm:px-6 lg:px-8">
                                        <label className="block text-sm font-medium text-gray-700">Photo</label>
                                        <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <img src={props.profile.photo_url} className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24"/>
                      </span>
                                            <button
                                                type="button"
                                                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Cover
                                            photo</label>
                                        <div
                                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                               className="sr-only"/>
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="button"
                                        onClick={saveHandler}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"/>
                </div>
            </div>

        </>
    )

}