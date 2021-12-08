import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import Title from '../../component/atoms/view/Title'

import './index.sass'

const Component: FC = () => {

  return (
    <div className="page-index">
      <Title
        detail="Top"
        url="https://blog.taniguchi.tech/archives/547"
        viewNuxtTop={true}
      />
      <p className="contents">Contents</p>
      <ul>
        <li><Link to="/sono-1">その１ たった10項目の入力フォーム</Link></li>
        <li><Link to="/sono-2">その２ Page Pathの設定① - 重複設定</Link></li>
        <li><Link to="/sono-2-2">その２ Page Pathの設定② - Not Found Page</Link></li>
        <li><Link to="/sono-3">その３ APIアクセス共通エラー画面遷移処理</Link></li>
        <li><Link to="/sono-4">その４ 画面種別共通処理</Link></li>
      </ul>
    </div>
  )
}

export default Component
