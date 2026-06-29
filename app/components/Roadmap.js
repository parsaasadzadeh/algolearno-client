'use client';

import React, { useState } from 'react';

// داده‌های مسیر یادگیری
const roadmapData = {
  frontend: [
    {
      id: 1,
      title: 'شروع ماجراجویی',
      tech: 'HTML5 & CSS3',
      desc: 'اسکلت و زیبایی وب را اینجا می‌سازیم. یاد می‌گیری چطور ساختار صفحه را بچینی و با CSS به آن رنگ و لعاب بدهی.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'جان بخشیدن به صفحه',
      tech: 'JavaScript',
      desc: 'مهم‌ترین زبان وب! اینجا یاد می‌گیری چطور سایت را تعاملی کنی، دکمه‌ها را زنده کنی و منطق برنامه را بنویسی.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'کتابخانه محبوب',
      tech: 'React.js',
      desc: 'حالا وقتشه حرفه‌ای بشی. با ریکت یاد می‌گیری چطور وب‌اپلیکیشن‌های تک‌صفحه‌ای سریع و مدرن بسازی.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'استایل‌دهی سریع',
      tech: 'Tailwind CSS',
      desc: 'خداحافظی با CSS طولانی! با تیلویند سرعت طراحی تو ۱۰ برابر میشه و سایت‌های ریسپانسیو رو مثل آب خوردن می‌سازی.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'تیر خلاص (فول‌استک)',
      tech: 'Next.js 14',
      desc: 'فریم‌ورکی که همه دنبالشن. رندر سمت سرور، سئو عالی و سرعت بی‌نظیر. اینجاست که تبدیل به یک مهندس ارشد میشی.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      ),
    },
  ],
  backend: [
    {
      id: 1,
      title: 'موتور قدرتمند',
      tech: 'Node.js',
      desc: 'جاوااسکریپت فقط برای مرورگر نیست! با نودجی‌اس سرورهای قدرتمند و مقیاس‌پذیر می‌نویسیم.',
      icon: <span className="text-xl">🔹</span>,
    },
    {
      id: 2,
      title: 'بانک اطلاعاتی',
      tech: 'MongoDB',
      desc: 'دیتابیس‌های مدرن NoSQL رو یاد بگیر و داده‌های کاربرانت رو به صورت حرفه‌ای ذخیره و مدیریت کن.',
      icon: <span className="text-xl">💠</span>,
    },
    {
      id: 3,
      title: 'معماری API',
      tech: 'Express & REST',
      desc: 'پل ارتباطی بین فرانت و بک. ساخت APIهای استاندارد و امن که قلب تپنده هر اپلیکیشنی هستن.',
      icon: <span className="text-xl">⚙️</span>,
    },
  ],
};

const Roadmap = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const [selectedStep, setSelectedStep] = useState(roadmapData['frontend'][0]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedStep(roadmapData[tab][0]);
  };

  const currentData = roadmapData[activeTab];

  return (
    <section id='2' className="py-20font-vazir" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            چطور قراره <span style={{ color: '#06b6d4' }}>متخصص</span> بشی؟
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            نقشه راه اختصاصی ما، از صفر مطلق تا استخدام. مسیرت رو انتخاب کن و ببین قراره چه چیزهایی یاد بگیری.
          </p>

          <div className="flex justify-center mt-8">
            <div className="bg-white p-1.5 rounded-full shadow-md border border-slate-200 inline-flex relative">
              <div
                className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{
                  width: '50%',
                  backgroundColor: '#06b6d4',
                  boxShadow: '0 8px 24px rgba(6, 182, 212, 0.35)',
                  right: activeTab === 'frontend' ? '4px' : 'calc(50% - 4px)',
                }}
              ></div>

              <button
                onClick={() => handleTabChange('frontend')}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
                  activeTab === 'frontend' ? 'text-white' : 'text-slate-500 hover:text-cyan-600'
                }`}
              >
                مسیر فرانت‌اند
              </button>
              <button
                onClick={() => handleTabChange('backend')}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
                  activeTab === 'backend' ? 'text-white' : 'text-slate-500 hover:text-cyan-600'
                }`}
              >
                مسیر بک‌اند
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-4 relative">
            <div className="absolute top-8 bottom-8 right-6 w-0.5 bg-slate-200 hidden lg:block"></div>

            {currentData.map((step) => (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={`group relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                  selectedStep.id === step.id
                    ? 'bg-white border-cyan-400 shadow-lg scale-100'
                    : 'bg-transparent border-transparent hover:bg-white hover:border-slate-100 opacity-70 hover:opacity-100'
                }`}
                style={
                  selectedStep.id === step.id
                    ? { boxShadow: '0 10px 30px rgba(6, 182, 212, 0.14)' }
                    : {}
                }
              >
                <div
                  className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm transition-colors duration-300 ${
                    selectedStep.id === step.id
                      ? 'text-white'
                      : 'bg-white text-slate-400 border border-slate-100 group-hover:text-cyan-500'
                  }`}
                  style={
                    selectedStep.id === step.id
                      ? {
                          backgroundColor: '#06b6d4',
                          boxShadow: '0 8px 22px rgba(6, 182, 212, 0.35)',
                        }
                      : {}
                  }
                >
                  {step.icon}
                </div>

                <div>
                  <h4
                    className={`font-bold text-lg transition-colors ${
                      selectedStep.id === step.id ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {step.tech}
                  </h4>
                  <span className="text-xs text-slate-400">{step.title}</span>
                </div>

                {selectedStep.id === step.id && (
                  <div className="mr-auto animate-pulse" style={{ color: '#06b6d4' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 sticky top-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden transition-all duration-500">
              <div
                className="absolute top-0 left-0 w-full h-2"
                style={{
                  background: 'linear-gradient(to left, #22d3ee, #06b6d4, #0891b2)',
                }}
              ></div>

              <div
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-50"
                style={{ backgroundColor: 'rgba(6, 182, 212, 0.12)' }}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="px-4 py-1.5 rounded-full text-xs font-black tracking-wider"
                    style={{
                      backgroundColor: 'rgba(6, 182, 212, 0.10)',
                      color: '#0891b2',
                    }}
                  >
                    گام {selectedStep.id}
                  </span>
                  <span className="text-slate-300 text-sm">/</span>
                  <span className="text-slate-400 text-sm font-medium">
                    {activeTab === 'frontend' ? 'مسیر فرانت‌اند' : 'مسیر بک‌اند'}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 tracking-tight">
                  {selectedStep.tech}
                </h3>

                <p className="text-slate-500 text-lg leading-loose mb-10 text-justify">
                  {selectedStep.desc}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-100">
                

                  <button
                    className="w-full sm:w-auto text-white px-8 py-3 rounded-xl font-bold transition-colors duration-300 flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#0f172a' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#06b6d4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0f172a';
                    }}
                  >
                    مشاهده دوره مربوطه
                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="absolute top-10 left-10 text-slate-100 opacity-20 pointer-events-none transform scale-[5] rotate-12">
                {selectedStep.icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
