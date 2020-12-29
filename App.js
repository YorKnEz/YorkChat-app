import React from 'react'

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import NavigationContainer from './src/components/Navigation';

import store, { persistor } from './src/features/store'

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <NavigationContainer />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App