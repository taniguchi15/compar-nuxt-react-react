import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { login } from '../../../stores/auth'

import Title from '../../atoms/view/Title'
import Text from '../../atoms/input/Text'

import './login.sass'

function App() {

  const history = useHistory()
  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    userId: ''
  })

  const [valids, setValids] = useState({
    userId: false
  })

  const onChange = useCallback((key: string, value: string, isValid: boolean) => {
    setInputs(inputs => ({
      ...inputs,
      [key]: value
    }))
    setValids(valids => ({
      ...valids,
      [key]: isValid
    }))
  }, [])

  const clickLogin = () => {
    const valid = Object.values(valids).every(b => b)
    if (!valid) return
    dispatch(login({userId: inputs.userId}))
    history.push('/sono-4')
  }

  return (
    <div className="page-sono-4">
      <Title
        detail="その2"
        url="https://blog.taniguchi.tech/archives/547"
      />
      <p className="contents">ログイン</p>
      <Text
        label="User ID"
        keyName="userId"
        value={inputs.userId}
        onChange={onChange}
        required={true}
      />
      <p className="button" onClick={clickLogin}>ログイン</p>
    </div>
  )
}

export default App
