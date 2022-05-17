import Home from './pages/home/Home'
import Store from './pages/commerce/Store'
import Hostel from './pages/commerce/Hostel'
import Welcome from './pages/login/Welcome'
import ForgotPassword from './pages/login/forgotPassword/ForgotPassword'
import CreateClient from './pages/user/CreateClient'
import CreatePoint from './pages/admin/points/CreatePoint'
import EditPoint from './pages/admin/points/EditPoint'
import DeletePoints from './pages/admin/points/DeletePoints'
import ReportView from './pages/admin/sac/ReportView'
import Report from './pages/sac/Report'
import AdminPanel from './pages/admin/AdminPanel'
import EditUser from './pages/user/EditUser'

import PrivateRoute from './PrivateRoute'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/hostel' component={Hostel} exact />
      <Route path='/store' component={Store} exact />
      <Route path='/welcome' component={Welcome} exact />
      <Route path='/welcome/forgotpassword' component={ForgotPassword} exact />
      <Route path='/register/client' component={CreateClient} exact />
      <Route path='/report' component={Report} exact />
      <Route path='/admin/createPoint' component={CreatePoint} exact />
      <Route path='/admin/adminPanel' component={AdminPanel} exact />
      <Route path='/admin/reportView' component={ReportView} exact />
      <Route exact path='/admin/editPoint' component={EditPoint} />
      <Route path='/admin/deletepoints' component={DeletePoints} exact />
      <Route path='/user/editUser' component={EditUser} exact />
    </Switch>
  </BrowserRouter>
)

export default Routes
