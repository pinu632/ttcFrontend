
import Home from "./Pages/Home/home";
import EventsPage from "./Pages/EventPage/event";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./Routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import AppLayout from "./Pages/Admin/Layout/AppLayout";
import { useLocation } from "react-router-dom";
import EventTables from "./Pages/Admin/Pages/EventManagement/EventTable";
import UsersTables from "./Pages/Admin/Pages/userMangement/UserTable";
import AddStudent from "./Pages/Admin/Pages/userMangement/AddUser";
import CreateEvent from "./Pages/Admin/Pages/EventManagement/AddEvent";
import AboutPage from "./Pages/AboutUs/aboutus";
import PublicLayout from "./Layouts/publicLayout";
import NoticePage from "./Pages/Notices/notices";
import GalleryUploadPage from "./Pages/Admin/Pages/GalleryManagement/addPhotos";
import GalleryInfinitePage from "./Pages/Admin/Pages/GalleryManagement/viewAll";
import GalleryPage from "./Pages/Gallery/gallery";
import EventDetailsPage from "./Pages/EventPage/components/exploreEvents";
import LeaderboardPage from "./Pages/Leaderboards/leaderboard";
import Blogs from "./Pages/BlogPage/blogs";
import BlogManagement from "./Pages/Admin/Pages/BlogManagements/BlogManagesmentSection";
import CreateBlog from "./Pages/Admin/Pages/BlogManagements/CreateBlog";
import BlogReadingPage from "./Pages/BlogPage/Components/BlogReader";
import CreateBlogMetaPage from "./Pages/Admin/Pages/BlogManagements/addBlog";
import AdminDashboard from "./Pages/Admin/Pages/general";
import TeamPage from "./Pages/Members/Members";
import MyProfile from "./Pages/MyProfile/myprofile";

function App() {

  const location = useLocation();
  return (
    <>
      <ToastContainer
        position="top-right"
        style={{ zIndex: 9999999 }}
      />

      <Routes>
      
        <Route path="/blogs/:id" element={<BlogReadingPage/>} />

        <Route element={<ProtectedRoute allowedRoles={["generalUser"]} />}>
          <Route path="/admin/blogs/create/:Id" element={<CreateBlog/>} />
          <Route path="/" element={<Home />} />
          <Route element={<PublicLayout />}>

            <Route path="/about" element={<AboutPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage/>}/>
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<Blogs/>} />
            <Route path="/blog/create" element={<CreateBlogMetaPage/>} />
            <Route path="/members" element={<TeamPage/>} />
            <Route path="/profile" element={<MyProfile/>} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>

          <Route element={<AppLayout />}>
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/admin/event" element={<EventTables />} />
            <Route path="/admin/event/add" element={<CreateEvent />} />
            <Route path="/admin/user" element={<UsersTables />} />
            <Route path="/admin/user/add" element={<AddStudent />} />
            <Route path="/admin/gallery/add" element={<GalleryUploadPage/>} />
            <Route path="/admin/gallery" element={<GalleryInfinitePage/>} />
            <Route path="/admin/blogs" element={<BlogManagement/>} />
            <Route path="/admin/blogs/create" element={<CreateBlogMetaPage/>} />
            

          </Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
