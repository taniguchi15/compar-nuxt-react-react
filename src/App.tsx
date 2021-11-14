import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Axios } from './hooks/axios'

import Top from './component/pages'
import Sono1 from './component/pages/sono-1'
import Sono2_1 from './component/pages/sono-2-1'
import Sono2_2 from './component/pages/sono-2-2'
import Sono3 from './component/pages/sono-3'
import Error from './component/pages/error'

import { setPublicUrl } from './common/func'

function App() {
  return (
    <Router>
      <Axios>
        <Switch>
          <Route exact path={setPublicUrl("/")} component={Top} />
          <Route exact path={setPublicUrl("/sono-1")} component={Sono1} />
          <Route exact path={setPublicUrl("/sono-2")} component={Sono2_1} />
          <Route exact path={setPublicUrl("/sono-2")} component={Sono2_2} />
          <Route exact path={setPublicUrl("/sono-3")} component={Sono3} />
          <Route exact path={setPublicUrl("/error")} component={Error} />
          <Redirect to={{ pathname: setPublicUrl("/error"), state: { httpStatusCode: 404 } }} />
        </Switch>
      </Axios>
    </Router>
  )
}

export default App
