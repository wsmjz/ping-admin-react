import React from 'react';
import { Login } from './views/login'
import { Protypes } from './views/a-types/index'
import { Vuepage } from './views/a-types/vue'
import { Home } from './views/home'
import { Home1 } from './views/home1'
import { Boot } from './views/bootPage'
import BigForm from './views/business/form/big'
import Substep from './views/business/form/substep'
import { Trends } from './views/business/form/trends'
import { ComplexTable } from './views/business/table'
import { Marketing } from './views/marketing/index'
import UploadExcel from './views/excel/index'
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import routes from './routes/index';
import './App.css';
console.log(routes, '路由对象2')
function App() {
  return (
    <div className="App">
      {/* <Router>{renderRoutes(routes)}</Router> */}
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Protypes>
            <Route exact path="/vue-t" component={Vuepage} />
            <Home>
              <Route exact path="/" component={Boot} />
              <Route exact path="/home" component={Home1} />
              <Route exact path="/business/form/substep" component={Substep} />
              <Route exact path="/business/form/big" component={BigForm} />
              <Route exact path="/business/form/trends" component={Trends} />
              <Route exact path="/excel/upload" component={UploadExcel} />
              <Route exact path="/business/table-complex" component={ComplexTable} />
            </Home>  
          </Protypes>
          
          <Route exact path="/marketing" component={Marketing} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
