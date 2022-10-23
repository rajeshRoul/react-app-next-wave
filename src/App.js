import Header from 'components/Header';
import { ToastContainer } from 'react-toastify';
import Router from 'router';
import './App.css';
import "./config/fonts.css"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        rtl={false}
        theme="colored"
      />
    </div>
  );
}

export default App;
