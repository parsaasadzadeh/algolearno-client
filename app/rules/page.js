import Link from 'next/link';

export const metadata = {
  title: 'قوانین و شرایط | algolearno',
  description: 'قوانین و شرایط استفاده از خدمات آموزشی الگولرنو',
};

export default function RulesPage() {
  const rules = [
    {
      title: 'عدم بازگشت وجه پس از خرید دوره',
      text: 'با توجه به ماهیت آموزشی و دیجیتال محصولات algolearno، پس از خرید و فعال‌سازی دسترسی دوره، امکان بازگشت وجه، لغو خرید یا درخواست استرداد وجود ندارد. لطفاً پیش از خرید، توضیحات دوره را با دقت مطالعه کنید.',
      icon: '💳',
    },
    {
      title: 'رعایت احترام در بخش چت و ارتباطات',
      text: 'تمام کاربران موظف‌اند در بخش چت، نظرات، پرسش‌وپاسخ و هر نوع ارتباط داخل پلتفرم، از ادبیات محترمانه و حرفه‌ای استفاده کنند. استفاده از الفاظ نامناسب، توهین، تهدید، تمسخر، آزار کلامی یا هر محتوای غیراخلاقی مجاز نیست و می‌تواند منجر به محدودسازی یا مسدود شدن حساب کاربری شود.',
      icon: '💬',
    },
    {
      title: 'ممنوعیت اشتراک‌گذاری ویدیوها و محتوای آموزشی',
      text: 'تمام محتوای آموزشی algolearno شامل ویدیوها، فایل‌ها، جزوات، تمرین‌ها و سایر منابع، صرفاً برای استفاده شخص خریدار ارائه می‌شود. هرگونه دانلود غیرمجاز، بازنشر، اشتراک‌گذاری، فروش مجدد، ارسال برای دیگران یا انتشار عمومی محتوا، غیرقانونی بوده و پیگرد قانونی خواهد داشت.',
      icon: '🔒',
    },
  ];

  return (
    <main className="algolearno-rules-page" dir="rtl">
      <section className="algolearno-rules-shell">
        <div className="algolearno-rules-bg algolearno-rules-bg-1" />
        <div className="algolearno-rules-bg algolearno-rules-bg-2" />

        <div className="algolearno-rules-header">
          <div className="algolearno-rules-badge">algolearno</div>
          <h1 className="algolearno-rules-title">قوانین و شرایط استفاده</h1>
          <p className="algolearno-rules-subtitle">
            به پلتفرم آموزشی الگولرنو خوش آمدید. برای حفظ کیفیت آموزش، امنیت کاربران و رعایت
            حقوق مادی و معنوی محتوا، لطفاً قوانین زیر را با دقت مطالعه کنید.
          </p>
        </div>

        <div className="algolearno-rules-grid">
          {rules.map((rule, index) => (
            <article key={index} className="algolearno-rule-card">
              <div className="algolearno-rule-icon">{rule.icon}</div>
              <div className="algolearno-rule-content">
                <h2 className="algolearno-rule-title">{rule.title}</h2>
                <p className="algolearno-rule-text">{rule.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="algolearno-rules-note">
          <h3 className="algolearno-rules-note-title">نکته مهم</h3>
          <p className="algolearno-rules-note-text">
            استفاده از خدمات algolearno به معنای مطالعه و پذیرش این قوانین است. در صورت نقض
            قوانین، این مجموعه حق دارد دسترسی کاربر را محدود یا غیرفعال کند.
          </p>
        </div>

        <div className="algolearno-rules-actions">
          <Link href="/auth" className="algolearno-rules-btn algolearno-rules-btn-primary">
            بازگشت به ورود
          </Link>

          <Link href="/" className="algolearno-rules-btn algolearno-rules-btn-secondary">
            صفحه اصلی
          </Link>
        </div>
      </section>
    </main>
  );
}
