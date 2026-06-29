'use client';

import { useState } from 'react';
import api from '../services/api';

export default function CompleteProfile() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      
      if (avatar) {
        // نام 'avatar' باید دقیقا با چیزی که در بک‌اند (multer) نوشته‌اید یکی باشد
        formData.append('avatar', avatar); 
      }

  await api.put('/user/profile', formData, { // 🟢 کلمه update- را حذف کنید
  headers: { 'Content-Type': 'multipart/form-data' },
});

      window.location.href = '/dashboard';
    } catch (err) {
      alert(err.response?.data?.message || 'خطا در ثبت اطلاعات پروفایل');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50" dir="rtl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-5"
      >
        <h1 className="text-xl font-black text-center">تکمیل پروفایل</h1>

        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          placeholder="ایمیل (اختیاری)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="w-full p-2 border rounded-xl"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          {loading ? 'در حال ذخیره...' : 'ثبت و ادامه'}
        </button>
      </form>
    </div>
  );
}
