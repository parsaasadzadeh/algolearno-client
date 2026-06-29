'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const myData = {
    name: "پارسا اسدزاده",
    role: "بنیان‌گذار آلگولرنو",
    bio: "من یک توسعه‌دهنده پرشور هستم که عاشق خلق تجربه‌های دیجیتال زیبا و کارآمد است. هدف من ایجاد مسیری روشن و استاندارد برای کسانی است که می‌خواهند با قدرت وارد دنیای حرفه‌ای وب شوند.",
    experience: [
      { 
        id: 1, 
        title: "3 سال تجربه", 
        desc: "توسعه سیستم‌های Full-stack",
        icon: (
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        )
      },
    
      { 
        id: 3, 
        title: "تخصص React", 
        desc: "مسلط به Next.js و اکوسیستم مدرن",
        icon: (
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      }
    ],
    image: "/img/parsaasadzadeh.jpg" 
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-16 bg-slate-50 font-vazir flex items-center justify-center overflow-hidden" dir="rtl">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* ستون راست: متن و محتوا */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span style={{color : "#06b6d4"}} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80  text-xs font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                {myData.role}
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4"
            >
              سلام، من <span className="text-transparent bg-clip-text bg-gradient-to-l" style={{color:"#06b6d4"}}>{myData.name}</span> هستم.
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-light"
            >
              {myData.bio}
            </motion.p>

            {/* کارت‌های تجربه */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 mb-8">
              {myData.experience.map((item) => (
                <div 
                  key={item.id} 
                  className="group flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-slate-50 group-hover:bg-indigo-50 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-base mb-0.5">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* دکمه‌ها */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a href='https://parsaasadzadeh.ir' className="px-6 py-3 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300">
                شروع همکاری
              </a>
              <a href='https://parsaasadzadeh.ir' className="px-6 py-3 rounded-lg bg-white text-slate-700 text-sm font-bold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300">
                مشاهده نمونه‌کارها
              </a>
            </motion.div>
          </motion.div>

          {/* ستون چپ: تصویر */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1 lg:order-2 relative max-w-md mx-auto lg:max-w-none"
          >
            {/* افکت‌های پس‌زمینه تصویر */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-blue-300 rounded-[2rem] blur-2xl opacity-20 -z-10 transform translate-x-3 translate-y-3"></div>
            
            <div className="relative rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl shadow-slate-200/50 aspect-[4/5] bg-slate-100">
              <img 
                src={myData.image} 
                alt={myData.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* لیبل شناور روی عکس */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">وضعیت فعلی</p>
                  <p className="text-slate-900 font-bold text-xs">آماده برای پروژه‌های جدید 🚀</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping absolute"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 relative z-10"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;