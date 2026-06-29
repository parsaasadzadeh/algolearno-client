'use server'; // اطمینان حاصل کنید این خط در بالای فایل course-actions.js هست

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'; // این را اضافه کنید

export async function createCourseAction(formData) {
  const title = formData.get('title');
  const description = formData.get('description');

  // 1. توکن را از کوکی‌های Next.js بخوانید
  const token = cookies().get('token')?.value; // فرض می‌کنیم نام کوکی 'token' است

  // 2. اگر توکن وجود نداشت، یا کاربر لاگین نیست یا توکن از دست رفته
  if (!token) {
    throw new Error('شما وارد حساب خود نشده‌اید. لطفا ابتدا لاگین کنید.');
  }

  const res = await fetch(`http://localhost:5000/api/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // توکن را در هدر Authorization ارسال کنید
    },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    // این خطا حالا دقیق‌تر خواهد بود، مثلا اگر توکن نامعتبر بود
    throw new Error(`خطا در ساخت دوره: ${errorText}`);
  }

  revalidatePath('/courses');
  return await res.json();
}


// اکشن ساخت ویدیو
export async function addVideoAction(formData) {
  const title = formData.get('title');
  const aparatIframe = formData.get('aparatIframe');
  const isFree = formData.get('isFree') === 'on';
  const courseId = formData.get('courseId');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, aparatIframe, isFree, courseId }),
  });

  if (!res.ok) throw new Error('خطا در ثبت ویدیو');
  
  // آپدیت کردن صفحه همون دوره
  revalidatePath(`/courses/${courseId}`);
  return await res.json();
}
