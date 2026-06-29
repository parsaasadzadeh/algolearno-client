'use client';
import { useState } from 'react';
import api from '@/app/services/api';

export default function CreateCourseAdmin() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  // 👇 استیت‌های جدید
  const [instructorName, setInstructorName] = useState('');
  const [instructorField, setInstructorField] = useState('');
  const [instructorDescription, setInstructorDescription] = useState('');
  const [image, setImage] = useState(null); // برای نگهداری فایل عکس

  const [price, setPrice] = useState(0);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('description', description);
      formData.append('instructorName', instructorName);
      formData.append('instructorField', instructorField);
      formData.append('instructorDescription', instructorDescription);
      
      // 🟢 این خط باید اضافه شود تا قیمت به بک‌اند برود:
      formData.append('price', price);

      if (image) {
        formData.append('image', image);
      }

      // ارسال به بک‌اند
      await api.post('/courses', formData);

      setMessage('✅ دوره با موفقیت ساخته شد!');

      // خالی کردن فرم
      setTitle('');
      setSlug('');
      setDescription('');
      setInstructorName('');
      setInstructorField('');
      setInstructorDescription('');
      setPrice(0); // 🟢 قیمت را هم بعد از موفقیت ریست کنید
      setImage(null);
      document.getElementById('course-image').value = '';

    } catch (error) {
      const errorMsg = error.response?.data?.message || '❌ خطا در ساخت دوره. دسترسی خود را چک کنید.';
      setMessage(errorMsg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">ساخت دوره جدید (ادمین)</h1>

      {message && (
        <p className={`mb-4 p-3 rounded font-bold ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white p-6 shadow-md rounded-lg">

        {/* --- بخش اطلاعات اصلی دوره --- */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold mb-3 text-blue-600">اطلاعات دوره</h2>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="عنوان دوره (مثلا: آموزش جامع Node.js)" className="border p-2 rounded focus:outline-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="آدرس انگلیسی دوره (مثلا: nodejs-course)" className="border p-2 rounded focus:outline-blue-500 text-left" value={slug} onChange={(e) => setSlug(e.target.value)} required dir="ltr" />
            <textarea placeholder="توضیحات دوره" className="border p-2 rounded h-24 focus:outline-blue-500" value={description} onChange={(e) => setDescription(e.target.value)} required />

            {/* اینپوت عکس */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600 font-semibold">عکس کاور دوره:</label>
              <input id="course-image" type="file" accept="image/jpeg, image/png, image/webp" className="border p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={(e) => setImage(e.target.files[0])} />
            </div>
          </div>
        </div>

        {/* --- بخش اطلاعات مدرس --- */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-blue-600">اطلاعات مدرس</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input type="text" placeholder="نام مدرس (مثلا: علی محمدی)" className="border p-2 rounded focus:outline-blue-500 flex-1" value={instructorName} onChange={(e) => setInstructorName(e.target.value)} required />
              <input type="text" placeholder="حوزه فعالیت (مثلا: مهندس نرم افزار)" className="border p-2 rounded focus:outline-blue-500 flex-1" value={instructorField} onChange={(e) => setInstructorField(e.target.value)} required />
            </div>
            <textarea placeholder="درباره مدرس (توضیحات کوتاه)" className="border p-2 rounded h-20 focus:outline-blue-500" value={instructorDescription} onChange={(e) => setInstructorDescription(e.target.value)} required />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-semibold">قیمت دوره (تومان):</label>
          <input
            type="number"
            placeholder="قیمت (برای رایگان عدد 0 را وارد کنید)"
            className="border p-2 rounded focus:outline-blue-500 text-left"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            dir="ltr"
          />
        </div>
        <button type="submit" disabled={loading} className="mt-4 bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 transition disabled:bg-gray-400">
          {loading ? 'در حال ثبت دوره و آپلود عکس...' : 'ثبت نهایی دوره'}
        </button>
      </form>
    </div>
  );
}
