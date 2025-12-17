
import Hero from "./components/heroPage";
import { TechTalkNavbar } from "@/components/UIComponents/Navbar/Navbar";

import AboutSection from "./components/AboutSection";
import EventsSection from "./components/eventsSection/EventsSection";
import GalleryCarousel from "./components/GalleryCarousal/carousal";
import { useTheme } from "@/components/ModeProvider/modeprovider";
import PopularBlogs from "./components/blogsPage";
import TechTalkFooter from "./components/footer";

function Home() {
  const { theme } = useTheme();
  return (
    <>
      <TechTalkNavbar />

      <Hero />
      {theme === "dark" && <hr className="w-3/4 mx-auto" />}
      <AboutSection />
      {theme === "dark" && <hr className="w-3/4 mx-auto" />}

      <GalleryCarousel />
      <hr className="w-3/4 mx-auto" />
      <EventsSection />
      <PopularBlogs />
      {/* <section className="relative ">
        <Quotes />
      </section> */}
      <TechTalkFooter />
    </>
  );
}

export default Home;
