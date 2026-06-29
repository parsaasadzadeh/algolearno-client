import React from 'react';
export const metadata = {
  title: 'تماس با ما ',
  description: 'برای ارتباط با تیم پشتیبانی آلگولرنو، مشاوره دوره‌های برنامه‌نویسی و طرح سوالات خود از طریق ایمیل، تلفن یا تلگرام با ما در تماس باشید.',
};
const ContactSection = () => {
  return (
    <div className="antialiased text-gray-700 w-full bg-white">
      
      {/* بخش هدر - ساده و تمیز مشابه تصویر */}
      <section className="pt-16 pb-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* عنوان با رنگ فیروزه‌ای برند شما */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#06b6d4]">
            تماس با ما
          </h1>
          {/* توضیحات با رنگ خاکستری ملایم */}
          <p className="text-lg text-gray-500 leading-relaxed">
            تضمین پاسخگویی سریع به نظرات و سوالات شما
          </p>
        </div>
      </section>

      {/* بخش کارت‌ها */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* کارت ایمیل */}
            <div className="group flex flex-col items-center p-8 bg-gray-50 rounded-2xl border border-transparent transition-all duration-300 hover:border-[#06b6d4]/30 hover:bg-white hover:shadow-lg hover:shadow-gray-100">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-white shadow-sm text-[#06b6d4] text-2xl group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-envelope"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ایمیل</h3>
              <p className="text-gray-400 text-sm mb-4">پشتیبانی فنی و عمومی</p>
              <a href="mailto:wtstorecode1@gmail.com" className="text-lg font-medium text-gray-600 hover:text-[#f97316] transition-colors duration-200">
                algoLearno@gmail.com
              </a>
            </div>

            {/* کارت تلفن */}
            <div className="group flex flex-col items-center p-8 bg-gray-50 rounded-2xl border border-transparent transition-all duration-300 hover:border-[#06b6d4]/30 hover:bg-white hover:shadow-lg hover:shadow-gray-100">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-white shadow-sm text-[#06b6d4] text-2xl group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تلفن</h3>
              <p className="text-gray-400 text-sm mb-4">شنبه تا پنجشنبه، ۹ تا ۱۸</p>
              <a href="tel:09143834148" className="text-xl font-bold text-gray-600 hover:text-[#f97316] transition-colors duration-200 tracking-wide">
                09143834148
              </a>
            </div>

            {/* کارت تلگرام */}
            <div className="group flex flex-col items-center p-8 bg-gray-50 rounded-2xl border border-transparent transition-all duration-300 hover:border-[#06b6d4]/30 hover:bg-white hover:shadow-lg hover:shadow-gray-100">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-white shadow-sm text-[#06b6d4] text-2xl group-hover:scale-110 transition-transform duration-300">
                <i className="fab fa-telegram-plane pr-1"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تلگرام</h3>
              <p className="text-gray-400 text-sm mb-4">پاسخگویی سریع آنلاین</p>
              <a href="https://t.me/vtstorecode" target="_blank" rel="noopener noreferrer" dir="ltr" className="text-lg font-medium text-gray-600 hover:text-[#f97316] transition-colors duration-200">
                @algoLearno
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;