import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import { AddMeetingPage, HomePage } from "../pages";

const AppRoutes = () => {
    return (
        <Router>
            <Outlet />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-meeting" element={<AddMeetingPage />}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
