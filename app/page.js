
import Link from "next/link";
import CourseSlider from "./components/co";
import Roadmap from "./components/Roadmap";
export default function Home() {

  return (
    <>
      <header>
        <section className="vt-hero-center">
          <h1 className="vt-hero-title">آلگو لرنو</h1>
          <p className="vt-hero-subtitle rtl"> تضمین موفقیت شما در برنامه‌نویسی 🚀</p>
          <div className="vt-buttons">
            <Link href="#1" className="vt-button m-2 vt-hero-subtitle" >شروع یادگیری </Link>
            <Link href="#2" className="vt-button m-2 vt-hero-subtitle"> مسیر یادگیری </Link>
          </div>
        </section>
      </header>
      <Roadmap />

      
      <CourseSlider/>
      
    </>
  );
}
