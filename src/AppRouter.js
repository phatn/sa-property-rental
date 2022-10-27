import { Route, Routes } from "react-router";
import Login from "./Login";
import PropertyList from "./PropertyList";
import PropertyDetail from "./PropertyDetail";

export default function AppRouter() {

    return(
        <div>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/property-list" element={<PropertyList />} />
                <Route path="/property-detail/:id" element={<PropertyDetail/>} />
            </Routes>
        </div>
    )
}