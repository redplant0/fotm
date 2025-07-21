import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import CalendarPage from "./pages/Calendar";
import CropsPage from "./pages/Crops";
import BirthdayCalendarPage from "./pages/BirthdayCalendar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CalendarPage />} />
        <Route path="/crops" element={<CropsPage />} />
        <Route path="/birthdays" element={<BirthdayCalendarPage />} />
      </Route>
    </Routes>
  );
}

export default App;
