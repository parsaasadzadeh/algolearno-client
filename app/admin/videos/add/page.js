'use client';
import { useState, useEffect } from 'react';
import api from '@/app/services/api';

export default function AddVideoAdmin() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [uploadType, setUploadType] = useState('aparat'); // 'aparat' یا 'file'
  const [aparatIframe, setAparatIframe] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // دریافت لیست دوره‌ها برای انتخاب
  useEffect(() => {
    api.get('/courses').then((res) => setCourses(res.data.data || res.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (uploadType === 'file' && file) {
        // حالت آپلود فایل فیزیکی (Multipart)
        const formData = new FormData();
        formData.append('courseId', courseId);
        formData.append('title', title);
        formData.append('isFree', isFree);
        formData.append('video', file); // 'video' باید هم‌نام با multer در بک‌اند باشد

        await api.post('/videos', formData);

      } else {
        // حالت ارسال کد آپارات (JSON)
        await api.post('/videos', { courseId, title, isFree, aparatIframe });
      }

      setMessage('✅ ویدیو با موفقیت اضافه شد!');
      setTitle(''); setAparatIframe(''); setFile(null);
    } catch (error) {
      setMessage('❌ خطا در ثبت ویدیو.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">افزودن ویدیو به دوره (ادمین)</h1>
      {message && <p className="mb-4 font-bold">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select className="border p-2 rounded" value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
          <option value="">-- انتخاب دوره --</option>
          {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
        </select>

        <input type="text" placeholder="عنوان ویدیو (مثلا: قسمت اول)" className="border p-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />

        {/* انتخاب نوع آپلود */}
        <div className="flex gap-4 border p-3 rounded bg-gray-50">
          <label><input type="radio" name="type" checked={uploadType === 'aparat'} onChange={() => setUploadType('aparat')} /> کد آپارات</label>
          <label><input type="radio" name="type" checked={uploadType === 'file'} onChange={() => setUploadType('file')} /> آپلود فایل</label>
        </div>

        {uploadType === 'aparat' ? (
          <textarea placeholder="کد Iframe آپارات" className="border p-2 rounded text-left" dir="ltr" value={aparatIframe} onChange={(e) => setAparatIframe(e.target.value)} required />
        ) : (
          <input type="file" accept="video/*" className="border p-2 rounded" onChange={(e) => setFile(e.target.files[0])} required />
        )}

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} />
          این ویدیو رایگان است؟
        </label>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {loading ? 'در حال آپلود...' : 'افزودن ویدیو'}
        </button>
      </form>
    </div>
  );
}
