import React, {FC, useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Top from './component/pages'
import Sono1 from './component/pages/sono-1'
import Sono2_1 from './component/pages/sono-2-1'
import Sono2_2 from './component/pages/sono-2-2'
import Sono3 from './component/pages/sono-3'
import Sono4 from './component/pages/sono-4/index'
import Login from './component/pages/sono-4/login'
import Profile from './component/pages/sono-4/profile'
import Error from './component/pages/error'

import { State } from './stores'
import { setPublicUrl } from './common/func'

function omitComponent(props: any): any {
  return Object.keys(props).reduce((acc: any, cur: string) => {
    if (cur !== 'component') {
      acc[cur] = (props as any)[cur]
    }
    return acc
  }, {})
}

/**
 * 認証ページ 画面遷移制御
 * 
 * @param props 
 * @returns 
 */
 const Authed: FC<RouteProps> = props => {
  const login = useSelector((state: State) => state.auth.login)
  const rest = useMemo(() => omitComponent(props), [])
  return (
    <Route
      {...rest}
      render={() => login ?
        <Route {...props} />
      :
        <Redirect to={setPublicUrl("/sono-4/login")} />}
    />
  )
}
  
/**
 * 未認証ページ 画面遷移制御
 * 
 * @param props 
 * @returns 
 */
const Unauthed: FC<RouteProps> = props => {
  const login = useSelector((state: State) => state.auth.login)
  const rest = useMemo(() => omitComponent(props), [])
  return (
    <Route
      {...rest}
      render={() => login ?
        <Redirect to={setPublicUrl("/sono-4")} />
      :
        <Route {...props} />
      }
    />
  )
}
  
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={setPublicUrl("/")} component={Top} />
        <Route exact path={setPublicUrl("/sono-1")} component={Sono1} />
        <Route exact path={setPublicUrl("/sono-2")} component={Sono2_1} />
        <Route exact path={setPublicUrl("/sono-2")} component={Sono2_2} />
        <Route exact path={setPublicUrl("/sono-3")} component={Sono3} />
        <Route exact path={setPublicUrl("/sono-4")} component={Sono4} />
        <Unauthed exact path={setPublicUrl("/sono-4/login")} component={Login} />
        <Authed exact path={setPublicUrl("/sono-4/profile")} component={Profile} />
        <Route exact path={setPublicUrl("/error")} component={Error} />
        <Redirect to={{ pathname: setPublicUrl("/error"), state: { httpStatusCode: 404 } }} />
      </Switch>
    </Router>
  )
}

export default App
