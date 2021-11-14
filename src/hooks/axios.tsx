import React, { FC, createContext, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios, { AxiosInstance } from 'axios'

import { setPublicUrl } from '../common/func'

const baseAxios = (() => {

  const baseAxios = axios.create({
    baseURL:'/api/v1'
  })

  baseAxios.interceptors.request.use(config => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  })

  return baseAxios
})()

const axiosContext = createContext(baseAxios)



/**
 * 
 * useContextよりCustom Hookの方が疎結合にでいいと書きましたが、
 * useContextの方がいいかもしれません・・・
 * 
 */
export default function useAxios(): AxiosInstance {
  return useContext(axiosContext)
}

export const Axios: FC = ({ children }) => {

  const history = useHistory()

  baseAxios.interceptors.response.use(
    value => value,
    error => {
      history.replace(setPublicUrl('/error'), {
        httpStatusCode: error.response.status
      })
    }
  )

  return (
    <axiosContext.Provider value={baseAxios}>
      { children }
    </axiosContext.Provider>
  )
}