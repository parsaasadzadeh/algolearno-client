'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import api from '../services/api';

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    api.get('/courses')
      .then((res) => {
        setCourses(res.data.data || res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -320, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#06b6d4]"></div>
    </div>
  );

  return (
    <section className="py-20 bg-slate-50/50 overflow-hidden font-vazir" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">

        {/* هدر بخش */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">دوره‌های آموزشی</h2>
            <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-[#06b6d4] to-blue-500 mt-3 rounded-full"></div>
          </div>

          {/* دکمه‌های کنترل اسلایدر */}
          <div className="flex gap-2 md:gap-3">
            <button onClick={() => scroll('right')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-[#06b6d4] hover:border-[#06b6d4] hover:text-white transition-all text-slate-500 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <button onClick={() => scroll('left')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-[#06b6d4] hover:border-[#06b6d4] hover:text-white transition-all text-slate-500 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>
        </div>

        {/* محفظه اسلایدر لمسی */}
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 -mt-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courses.map((course) => (
            <div key={course._id} className="w-[85vw] sm:w-[320px] shrink-0 snap-start group">
              <Link href={`/courses/${course.slug}`} className="block h-full outline-none">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden relative">

                  {/* کاور دوره - استفاده از aspect-video برای فیت شدن استاندارد */}
                  <div className="aspect-video w-full relative overflow-hidden bg-slate-100">
                    {/* گرادیانت روی عکس در حالت هاور */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    
                    <img 
                      src={`${course.imageUrl}`} 
                      alt={course.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* محتوا */}
                  <div className="p-5 md:p-6 flex flex-col flex-grow z-20 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-amber-400 text-sm">★</span>)}
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-[#06b6d4]">
                        آموزشی
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-base md:text-lg mb-6 line-clamp-2 leading-relaxed group-hover:text-[#06b6d4] transition-colors">
                      {course.title}
                    </h3>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-medium mb-0.5">سرمایه‌گذاری</span>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-lg md:text-xl font-black ${!course.price || course.price === 0 ? 'text-emerald-500' : 'text-slate-800'}`}>
                            {!course.price || course.price === 0 ? 'رایگان' : course.price.toLocaleString()}
                          </span>
                          {course.price > 0 && <span className="text-[10px] md:text-xs text-slate-400 font-medium">تومان</span>}
                        </div>
                      </div>

                      <div className="bg-[#06b6d4] text-white p-2.5 md:p-3 rounded-xl md:rounded-2xl group-hover:bg-slate-800 transition-colors duration-300 shadow-md shadow-cyan-500/30 group-hover:shadow-slate-800/20">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
