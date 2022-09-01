import AppRoutes from './routes';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { apolloClient } from './api/ApolloClient/client';
import { ApolloProvider } from '@apollo/client';
import { Header } from './components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import './App.css';

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="body">
                    <Header />
                    <div className="container">
                        <AppRoutes />
                    </div>
                </div>
            </LocalizationProvider>
        </ApolloProvider>
    );
}

export default App;
