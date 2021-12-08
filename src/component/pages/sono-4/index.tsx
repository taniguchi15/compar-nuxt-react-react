import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { State } from '../../../stores'
import { logout } from '../../../stores/auth'

import Title from '../../atoms/view/Title'

import './index.sass'

function App() {

  const dispatch = useDispatch()

  const login = useSelector((state: State) => state.auth.login)
  const userId = useSelector((state: State) => state.auth.userId)

  const clickLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="page-sono-4">
      <Title
        detail="その4"
        url="https://blog.taniguchi.tech/archives/547"
      />
      <p className="contents">画面種別共通処理</p>
      <div className="sono-4">
        {
          login ?
            <div>
              <p>こんにちは、{userId}さん。(ログイン中)</p>
              <p>ログアウトは<a onClick={clickLogout}>こちら</a>。</p>
            </div>
          :
            <p>こんにちは、Guestさん。(未ログイン)</p>
        }
        <div className="links">
          <Link className="login" to="/sono-4/login">
            <p>ログイン</p>
            <p className="detail">（ログイン時はトップ画面遷移）</p>
          </Link>
          <Link className="profile" to="/sono-4/profile">
            <p>プロフィール</p>
            <p className="detail">（未ログイン時はログイン画面遷移）</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App
