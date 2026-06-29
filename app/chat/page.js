'use client';
import React from 'react';
import ChatRoom from '../components/ChatRoom';
import Link from 'next/link';
import useAuth from '../hooks/useAuth'; // 🟢 استفاده از هوک اختصاصی خودتان

export default function ChatPage() {
  // 🟢 دریافت اطلاعات کاربر با استفاده از هوک (دقیقاً مثل داشبورد)
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-20 font-vazir">در حال بررسی وضعیت ورود...</div>;
  
  if (!user) return <div className="text-center mt-20 text-red-500 font-vazir text-2xl">برای مشاهده چت روم لطفا وارد حساب کاربری شوید.</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-8 px-4 font-vazir" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link href="/dashboard" className="text-indigo-600 font-bold hover:underline">
            بازگشت به داشبورد
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <ChatRoom user={user} />
        </div>
      </div>
    </div>
  );
}
