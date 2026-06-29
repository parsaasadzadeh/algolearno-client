'use client';

import Cookies from 'js-cookie';
import React, { useState } from 'react';
import Link from 'next/link';
import SettingsModal from './SettingsModal';

const Dashboard = ({ user, isSubscribed, transactions = [] }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove('token');
    window.location.href = '/';
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-900 flex justify-center items-center p-4 md:p-8 font-vazir relative overflow-hidden" 
      dir="rtl"
    >
      {/* افکت‌های نوری پس‌زمینه (نسخه روشن) */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-300/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-rose-300/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* گرید اصلی به سبک Bento Box */}
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] relative z-10">
        
        {/* کارت پروفایل کاربر (بالا - راست) - 2 ستون */}
        <div className="col-span-2 row-span-1 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm rounded-3xl p-6 flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <img
                src={user?.avatar ? user.avatar : '/default-avatar.png'}
                alt={user?.fullName || 'کاربر'}
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">خوش آمدید،</p>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                {user?.fullName || 'کاربر مهمان'}
              </h1>
            </div>
          </div>
        </div>



        {/* دکمه چت روم - کارت بزرگ مربعی (2 در 2) */}
        <Link 
          href="/chat" 
          className="col-span-2 row-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 flex flex-col items-center justify-center text-white hover:scale-[1.02] shadow-lg hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)] transition-all duration-300 group"
        >
          <svg className="w-16 h-16 mb-4 opacity-90 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          <span className="font-black text-2xl tracking-wide">ورود به چت‌روم</span>
        </Link>

        {/* دکمه تنظیمات - مربعی کوچک 1 در 1 */}
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="col-span-1 row-span-1 bg-white/80 border border-slate-200 shadow-sm rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all duration-300"
        >
          <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-semibold text-slate-700">تنظیمات</span>
        </button>
        

        {/* دکمه خروج - مربعی کوچک 1 در 1 */}
        <button 
          onClick={handleLogout}
          className="col-span-1 row-span-1 bg-white/80 border border-slate-200 shadow-sm rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 hover:shadow-md transition-all duration-300 text-slate-600"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-semibold">خروج</span>
        </button>

      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        transactions={transactions}
      />
    </div>
  );
};

export default Dashboard;
