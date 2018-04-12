import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import TodoApp from '../../todos';
import RedditApp from '../../reddit';

const Header = (props) => (
  <header>
    <nav>
      <ul>
        <li><Link to="/todos">TODOs</Link></li>
        <li><Link to="/reddit">Reddit</Link></li>
      </ul>

      <Route path="/todos" component={TodoApp} />
      <Route path="/reddit" component={RedditApp} />
    </nav>
  </header>
);

export default Header;
