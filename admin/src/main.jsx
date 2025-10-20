import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AdminContextProvider from './context/AdminContext.jsx';
import DoctorContextProvider from './context/DoctorContext.jsx';
import AppContextProvider from './context/AppContext.jsx';
import { ToastContextProvider } from './context/ToastContext.jsx';
import { LoaderContextProvider } from './context/LoaderContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoaderContextProvider>
      <ToastContextProvider>
        <AdminContextProvider>
          <DoctorContextProvider>
            <AppContextProvider>
              <App />
            </AppContextProvider>
          </DoctorContextProvider>
        </AdminContextProvider>
      </ToastContextProvider>
    </LoaderContextProvider>
  </BrowserRouter>,
);
