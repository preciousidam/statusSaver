import React from 'react';
import Photo from './navigation';
import { createAppContainer } from 'react-navigation';
import {Provider } from 'react-redux';

import store from './redux/store';


const Navigation = createAppContainer(Photo);

const App = _ => (
  <Provider store={store}>
    <Navigation />
  </Provider>
)

export default App;
