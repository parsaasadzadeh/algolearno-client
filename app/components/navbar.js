"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderNoticeBar from "./HeaderNoticeBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null); // برای تشخیص محدوده نوبار

  // تابع تغییر وضعیت منو
  const toggleMenu = () => setIsOpen(!isOpen);

  // بستن منو در صورت کلیک به بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      // اگر منو باز بود و کلیک روی جایی غیر از نوبار (navRef) انجام شد
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // افزودن رویداد کلیک به کل صفحه
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // پاکسازی برای جلوگیری از Memory Leak
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
    <HeaderNoticeBar/>
    <div className="navbar" ref={navRef}>
      <div className="container">
        <div className="logo">
          <Link href="/" className="logo">
            <Image
              src="/img/algolearno.png"
              alt="AlgoLearn"
              width={200}
              height={250}
              priority
              />
          </Link>

        </div>

        {/* دکمه همبرگری */}
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleMenu()}
          aria-label="منوی موبایل"
          aria-expanded={isOpen}
          role="button"
          tabIndex={0}
          >
          <i className={`bx ${isOpen ? "bx-x" : "bx-menu"}`}></i>
          =
        </div>

        {/* منوی لینک‌ها */}
        <nav className={`nav-links ${isOpen ? "active" : ""}`} role="navigation">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>داشبورد <i className="bx bx-bar-chart-alt"></i></Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>تماس با ما <i className="bx bx-phone"></i></Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>درباره ما <i className="bx bx-info-circle"></i></Link>
          <Link href="/courses" className="men" onClick={() => setIsOpen(false)}> دوره ها <i className="bx bx-phone"></i></Link>

        </nav>

        {/* باکس ورود */}
        <div className={`login ${isOpen ? "active" : ""}`} id="loginBox">
          <Link href="/login" onClick={() => setIsOpen(false)}><i className="bx bx-user"></i> ورود / ثبت‌نام</Link>
          <Link href="/dashboard" className="men" onClick={() => setIsOpen(false)}>داشبورد <i className="bx bx-bar-chart-alt"></i></Link>
          <Link href="/contact" className="men" onClick={() => setIsOpen(false)}>تماس با ما <i className=""></i></Link>
          <Link href="/about" className="men" onClick={() => setIsOpen(false)}> درباره ما <i className="fab fa-phone"></i></Link>
          <Link href="/courses" className="men" onClick={() => setIsOpen(false)}> دوره ها <i className="fab fa-course"></i></Link>
        </div>
      </div>
    </div>
          </>
  );
}