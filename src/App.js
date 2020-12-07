import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Todos from './components/Todos';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/todos" component={Todos} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
