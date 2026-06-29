import React from 'react';

const Footer = () => {
  return (
    <footer className=" border-t border-gray-100 font-sans text-gray-600" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">

        {/* کانتینر گرید: در موبایل وسط‌چین، در دسکتاپ راست‌چین */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 text-center lg:text-right">

          {/* ستون ۱: وب‌سایت‌ها */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-[#06b6d4] font-bold text-lg mb-6 relative inline-block px-2">
              وب‌سایت‌های ما
              {/* خط زیر عنوان: در موبایل وسط، در دسکتاپ راست */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:right-0 w-8 h-1 bg-[#06b6d4]/20 rounded-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-4 w-full">
              <li>
                <a href="https://algolearno.ir" className="group flex items-center justify-center lg:justify-start gap-2 hover:text-[#f97316] transition-all duration-300 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#f97316] transition-colors"></span>
                  آلگولرنو
                </a>
              </li>
              <li>
                {/* <a href="https://parsaasadzadeh.site" className="group flex items-center justify-center lg:justify-start gap-2 hover:text-[#f97316] transition-all duration-300 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#f97316] transition-colors"></span>
                  پارسا اسدزاده
                </a> */}
              </li>
            </ul>
          </div>

          {/* ستون ۲: شبکه‌های اجتماعی */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-[#06b6d4] font-bold text-lg mb-6 relative inline-block px-2">
              ما را دنبال کنید
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:right-0 w-8 h-1 bg-[#06b6d4]/20 rounded-full transition-all duration-300"></span>
            </h3>
            <div className="flex flex-col space-y-3 w-full">
              <a href="https://t.me/algoLearno" className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-gray-50 hover:text-[#06b6d4] transition-all duration-300">
                <i className="fab fa-telegram text-xl opacity-80"></i>
                <span className="text-sm font-medium">کانال تلگرام</span>
              </a>
              <a href="https://instagram.com/algoLearno" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-gray-50 hover:text-[#E1306C] transition-all duration-300">
                <i className="fab fa-instagram text-xl opacity-80"></i>
                <span className="text-sm font-medium">اینستاگرام</span>
              </a>
              <a href="https://www.aparat.com/algoLearno" className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-gray-50 hover:text-[#ED145B] transition-all duration-300">
                <i className="fas fa-video text-xl opacity-80"></i>
                <span className="text-sm font-medium">آپارات</span>
              </a>
            </div>
          </div>

          {/* ستون ۳: پشتیبانی */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-[#06b6d4] font-bold text-lg mb-6 relative inline-block px-2">
              پشتیبانی
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:right-0 w-8 h-1 bg-[#06b6d4]/20 rounded-full transition-all duration-300"></span>
            </h3>
            <div className="space-y-6 w-full">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                <div className="text-center lg:text-right">
                  <span className="block text-xs text-gray-400 mb-1">پشتیبانی تلگرام:</span>
                  <a href="https://t.me/vtstorecode" className="text-gray-700 hover:text-[#f97316] font-bold transition-colors text-sm" dir="ltr">
                    @algoLearno
                  </a>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                <div className="text-center lg:text-right">
                  <span className="block text-xs text-gray-400 mb-1">ایمیل:</span>
                  <a href="mailto:wtstorecode1@gmail.com" className="text-gray-700 hover:text-[#f97316] font-bold transition-colors text-sm break-all" dir="ltr">
                    algoLearno@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ستون ۴: اینماد */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-[#06b6d4] font-bold text-lg mb-6 relative inline-block px-2">
              نماد اعتماد
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:right-0 w-8 h-1 bg-[#06b6d4]/20 rounded-full transition-all duration-300"></span>
            </h3>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <a
                referrerPolicy='origin'
                target='_blank'
                href='https://trustseal.enamad.ir/?id=556826&Code=YNIKP2X2a8PCmJBQC7SkXSFxApO5z99W'
                className="block"
              >
                <img
                  referrerPolicy='origin'
                  src='https://trustseal.enamad.ir/logo.aspx?id=556826&Code=YNIKP2X2a8PCmJBQC7SkXSFxApO5z99W'
                  alt='نماد اعتماد الکترونیکی'
                  className="w-28 h-auto mix-blend-multiply filter grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer mx-auto"
                  code='YNIKP2X2a8PCmJBQC7SkXSFxApO5z99W'
                />
              </a>
            </div>
          </div>

        </div>

        {/* بخش کپی‌رایت */}
        <div className="border-t border-gray-100 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <p className="text-sm text-gray-400">
              © 2023 - 2026 تمامی حقوق برای <span className="text-gray-600 font-medium">آلگولرنو</span> محفوظ است.
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;