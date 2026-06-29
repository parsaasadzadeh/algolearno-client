import SingleCourse from './SingleCourse';

// تابع تولید متادیتای داینامیک
export async function generateMetadata({ params }) {
    // در Next.js 15+ پارامترها Promise هستند
    const resolvedParams = await params; 
    const slug = resolvedParams.slug;

    try {
        // دریافت اطلاعات دوره از سمت سرور برای سئو
        // دقت کنید آدرس کامل API را بدهید
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`, {
            cache: 'no-store' // یا 'force-cache' بسته به نیاز شما
        });
        const data = await res.json();
        const course = data?.data?.course || data?.course;

        if (!course) {
            return { title: 'دوره یافت نشد', description: '' };
        }

        return {
            title: course.title,
            // گرفتن 150 کاراکتر اول توضیحات برای دیسکریپشن گوگل
            description: course.description ? course.description.substring(0, 150) + '...' : 'توضیحات دوره',
            openGraph: {
                title: course.title,
                description: course.description ? course.description.substring(0, 150) + '...' : '',
                images: [course.imageUrl || '/img/algofav.png'],
            }
        };
    } catch (error) {
        return {
            title: 'دوره آموزشی | آلگولرنو',
            description: 'مشاهده جزئیات دوره آموزشی در سایت آلگولرنو'
        };
    }
}

export default async function Page({ params }) {
    // پاس دادن params به کامپوننت کلاینت
    return <SingleCourse params={params} />;
}
