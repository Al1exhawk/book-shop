import Main from './components/main';
import React from 'react';
import store from './store'
import Header from './components/header';
import { Provider } from 'react-redux';


const App: React.FC = () => {
  return (
    <Provider store={store}>
        <div className="constainer App">
            <Header/>
            <Main/>            
        </div>
    </Provider>
  );
}

export default App;
