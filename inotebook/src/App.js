import Navbar from "./components/Navbar";
import NoteState from "./context/note/NoteState";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Outlet />
        <Footer />
      </NoteState>
    </>
  );
}

export default App;
