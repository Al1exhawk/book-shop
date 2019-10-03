import store from './store'
import React from 'react';
import { Provider } from 'react-redux';
import Main from './components/main';
import Header from './components/header';


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
