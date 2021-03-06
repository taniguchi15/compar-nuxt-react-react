import React, {useState, useCallback, useEffect} from 'react'

import useAxios from '../../hooks/axios'

import Title from '../atoms/view/Title'
import Text from '../atoms/input/Text'

import './sono-1.sass'

function App() {

  const axios = useAxios()

  const [inputs, setInputs] = useState({
    name: '',
    nameKana: '',
    email: '',
    age: '',
    zipCode: '',
    address: '',
    tel: '',
    mobileNumber: '',
    hobby: '',
    workTel: '',
  })

  const [valids, setValids] = useState({
    name: false,
    nameKana: false,
    email: false,
    age: false,
    zipCode: false,
    address: false,
    tel: false,
    mobileNumber: false,
    hobby: false,
    workTel: false,
    telOrMobile: false,
    noMobile: false
  })

  const [viewValidationResult, setViewValidationResult] = useState(false)

  useEffect(() => {
    setValids(valids => ({
      ...valids,
      telOrMobile: !!inputs.tel || !!inputs.mobileNumber
    }))
  }, [inputs.tel, inputs.mobileNumber])

  useEffect(() => {
    setValids(valids => ({
      ...valids,
      noMobile: !!inputs.mobileNumber || !!inputs.workTel
    }))
  }, [inputs.mobileNumber, inputs.workTel])

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

  const send = () => {
    setViewValidationResult(true)
    const valid = Object.values(valids).every(bool => bool)

    if (!valid) return

    /*
    fetch("/api/v1/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...inputs,
        age: Number(inputs.age),
        zipCode: Number(inputs.zipCode),
      })
    }).then(() => {
      alert('succsess')
      setViewValidationResult(false)
    })
    */

    axios.post('/user', {
      ...inputs,
      age: Number(inputs.age),
      zipCode: Number(inputs.zipCode),
    }).then(() => {
      alert('succsess')
      setViewValidationResult(false)
    })
  }



  return (
    <div className="page-sono-1">
      <Title
        detail="??????1"
        url="https://blog.taniguchi.tech/archives/547"
      />
      <Text
        label="??????"
        keyName="name"
        value={inputs.name}
        onChange={onChange}
        required={true}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="??????(??????)"
        keyName="nameKana"
        value={inputs.nameKana}
        onChange={onChange}
        regex={/^[???-?????????]+$/}
        required={true}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="E-Mail"
        keyName="email"
        value={inputs.email}
        onChange={onChange}
        regex={/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/}
        required={true}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="??????"
        keyName="age"
        value={inputs.age}
        onChange={onChange}
        regex={/^\d{1,3}$/}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="????????????"
        keyName="zipCode"
        value={inputs.zipCode}
        onChange={onChange}
        regex={/^\d{7}$/}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="??????"
        keyName="address"
        value={inputs.address}
        onChange={onChange}
        required={true}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="????????????"
        keyName="tel"
        value={inputs.tel}
        onChange={onChange}
        regex={/^\d{10}$/}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="??????????????????"
        keyName="mobileNumber"
        value={inputs.mobileNumber}
        onChange={onChange}
        regex={/^\d{11}$/}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="???????????????"
        keyName="hobby"
        value={inputs.hobby}
        onChange={onChange}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="?????????????????????"
        keyName="workTel"
        value={inputs.workTel}
        onChange={onChange}
        regex={/^\d{10,11}$/}
        viewValidationResult={viewValidationResult}
      />
      {
        viewValidationResult &&
        <div className="errors">
          { !valids.telOrMobile && <p>?????????????????????????????????????????????????????????????????????????????????????????????</p> }
          { !valids.noMobile && <p>????????????????????????????????????????????????????????????????????????????????????</p>  }
        </div>
      }
      <p className="button" onClick={send}>??????</p>
    </div>
  )
}

export default App
