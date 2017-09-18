import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import MenuBar from '../common/MenuBar';
import '../../index.less';

const App = () => (
  <div>
    <header>
        <MenuBar />
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App
