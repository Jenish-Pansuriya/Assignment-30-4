import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import React from 'react';

function App() {
  return (
    <React.Suspense fallback={false}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </React.Suspense>
  );
}

export default App;
