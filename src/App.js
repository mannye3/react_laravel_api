import React  from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Task from './pages/Task';
import Addtask from './pages/Addtask';
import Editstudent from './pages/Edittask';

function App() {
  return (
   <Router>
     <Switch>
       <Route exact path="/" component={Task} />
       <Route exact path="/add-task" component={Addtask} />
       <Route exact path="/edit-task/:id" component={Editstudent} />

       
     </Switch>
   </Router>
  );
}

export default App;
