import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden"
      dir="rtl"
    >
      {/* افکت پس‌زمینه (برگ) */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/leaf.png')`,
          zIndex: 0,
        }}
      ></div>

      {/* اضافه کردن gap-y برای ایجاد فاصله عمودی بین عناصر */}
      <div className="flex flex-col items-center justify-center text-center z-10 px-4 gap-y-6">
        
        {/* کد خطا */}
        <h1 className="text-[6rem] sm:text-[8rem] md:text-[12rem] font-bold leading-none drop-shadow-lg bg-gradient-to-r from-cyan-400 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
          404
        </h1>

        {/* پیام خطا */}
        <p className="text-lg sm:text-xl md:text-2xl text-teal-600 px-2">
          صفحه‌ای که دنبال آن هستید پیدا نشد
        </p>

        {/* دکمه بازگشت */}
        <Link
          href="/"
          className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-base sm:text-lg px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg inline-block"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
