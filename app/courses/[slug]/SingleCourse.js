'use client';
import { useState, useEffect, use } from 'react';
import api from '@/app/services/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function SingleCourse({ params }) {
    const resolvedParams = use(params);
    const courseSlug = resolvedParams.slug;
    const router = useRouter(); // اضافه کردن روتر که در کد اصلی تعریف نشده بود اما استفاده شده بود

    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    const [hasPurchased, setHasPurchased] = useState(false);
    const [isBuying, setIsBuying] = useState(false);

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [isReplying, setIsReplying] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await api.get(`/courses/${courseSlug}`);
                console.log('course response:', res.data);

                const responseData = res.data.data ? res.data.data : res.data;

                setCourse(responseData.course);
                setVideos(responseData.videos);

                if (responseData.hasPurchased !== undefined) {
                    setHasPurchased(responseData.hasPurchased);
                }

                const courseId = responseData.course._id;
                try {
                    const commentsRes = await api.get(`/comments/${courseId}`);
                    if (commentsRes.data && commentsRes.data.data) {
                        setComments(commentsRes.data.data);
                    }
                } catch (commentError) {
                    console.error('خطا در دریافت کامنت‌ها:', commentError);
                }

            } catch (error) {
                console.error('خطا در دریافت اطلاعات:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [courseSlug]);

    const handlePayment = async () => {
        setIsBuying(true);
        try {
            const res = await api.post('/payment/request', { courseId: course._id });
            if (res.data.success && res.data.paymentUrl) {
                window.location.href = res.data.paymentUrl;
            }
        } catch (error) {
            if (error.response?.status === 401) {
                alert('برای خرید دوره ابتدا باید وارد حساب کاربری خود شوید.');
                router.push('/login');
            } else {
                alert(error.response?.data?.message || 'خطا در اتصال به درگاه پرداخت');
            }
            setIsBuying(false);
        }
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return alert('لطفاً متن نظر خود را بنویسید.');
        setIsSubmitting(true);
        try {
            const res = await api.post('/comments', {
                courseId: course._id,
                content: commentText
            });
            if (res.data.success) {
                setComments([res.data.data, ...comments]);
                setCommentText('');
                alert('نظر شما با موفقیت ثبت شد.');
            }
        } catch (error) {
            handleCommentError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReplySubmit = async (parentId) => {
        if (!replyText.trim()) return alert('لطفاً متن پاسخ خود را بنویسید.');
        setIsReplying(true);
        try {
            const res = await api.post('/comments', {
                courseId: course._id,
                content: replyText,
                parentComment: parentId
            });
            if (res.data.success) {
                setComments([...comments, res.data.data]);
                setReplyingTo(null);
                setReplyText('');
                alert('پاسخ شما با موفقیت ثبت شد.');
            }
        } catch (error) {
            handleCommentError(error);
        } finally {
            setIsReplying(false);
        }
    };

    const handleCommentError = (error) => {
        if (error.response?.status === 401) {
            alert('برای ثبت نظر لطفاً ابتدا وارد حساب کاربری خود شوید.');
        } else if (error.response?.status === 403) {
            alert(error.response.data.message);
        } else if (error.response?.data?.message) {
            alert(error.response.data.message);
        } else {
            alert('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fa-IR');
    };

    const mainComments = comments.filter(c => !c.parentComment);
    const getReplies = (parentId) => comments.filter(c => c.parentComment === parentId);

    const getUserName = (userObj) => {
        if (!userObj) return 'کاربر ناشناس';
        return userObj.fullName || userObj.name || userObj.username || 'کاربر ناشناس';
    };

    // تابع تغییر وضعیت ویدیو (باز و بسته کردن)
    const toggleVideo = (video) => {
        if (activeVideo?._id === video._id) {
            setActiveVideo(null); // بستن اگر از قبل باز بود
        } else {
            setActiveVideo(video); // باز کردن ویدیوی جدید
        }
    };

    if (loading) return <p className="text-center mt-10 font-bold text-lg">در حال بارگذاری...</p>;
    if (!course) return <p className="text-center mt-10 text-red-500 font-bold">دوره یافت نشد.</p>;

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-20 " dir="rtl">

            <main className="max-w-6xl mx-auto px-4 md:px-8 pt-10 space-y-8">

                {/* ----------------- هدر دوره ----------------- */}
                <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-2/3 space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
                        <p className="text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-wrap max-h-48 overflow-y-auto pl-2 custom-scrollbar">
                            {course.description}
                        </p>
                        <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-gray-100 mt-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 mb-1">مبلغ سرمایه‌گذاری:</span>
                                <span className={`text-2xl font-black ${course.price === 0 ? 'text-green-500' : 'text-slate-800'}`}>
                                    {course.price === 0 ? 'رایگان' : `${course.price.toLocaleString()} تومان`}
                                </span>
                            </div>

                            <div className="mr-auto">
                                {course.price === 0 || hasPurchased ? (
                                    <button
                                        onClick={() => videos.length > 0 && toggleVideo(videos[0])}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition duration-200 flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        {hasPurchased ? 'شما دانشجوی دوره‌اید (شروع)' : 'شروع یادگیری رایگان'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePayment}
                                        disabled={isBuying}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition duration-200 flex items-center gap-2 disabled:bg-gray-400"
                                    >
                                        {isBuying ? 'در حال انتقال...' : 'ثبت نام و خرید دوره'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 shrink-0">
                        <img src={course.imageUrl} alt={course.title} className="w-full h-auto rounded-xl shadow-md object-cover aspect-[4/3] border" />
                    </div>
                </section>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-2/3 space-y-8">

                        {/* ----------------- لیست ویدیوها ----------------- */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                                <h2 className="text-xl font-bold text-gray-800">سرفصل‌های دوره</h2>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y">
                                {videos.length === 0 ? (
                                    <p className="p-6 text-gray-500 text-center font-semibold">هنوز ویدیویی آپلود نشده است.</p>
                                ) : (
                                    videos.map((video, index) => {
                                        const isLocked = !hasPurchased && !video.isFree;
                                        const isActive = activeVideo?._id === video._id;

                                        return (
                                            <div key={video._id} className="flex flex-col">
                                                {/* ردیف عنوان ویدیو */}
                                                <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 transition ${isActive ? 'bg-blue-50 border-r-4 border-r-blue-500' : 'hover:bg-gray-50'} ${isLocked ? 'opacity-75' : ''}`}>
                                                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-sm font-bold">{index + 1}</span>
                                                        <span className={`font-semibold ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>{video.title}</span>
                                                    </div>
                                                    <div className="flex gap-3 items-center sm:pr-4">
                                                        <span className={`px-3 py-1 text-xs rounded-full font-bold ${video.isFree ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {video.isFree ? 'رایگان' : 'نقدی'}
                                                        </span>

                                                        {isLocked ? (
                                                            <div className="flex items-center gap-1 text-gray-400 bg-gray-100 px-3 py-2 rounded-lg text-sm font-semibold cursor-not-allowed">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                                                قفل
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => toggleVideo(video)}
                                                                className={`${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-lg text-sm font-semibold transition w-20 text-center`}
                                                            >
                                                                {isActive ? 'بستن' : 'پخش'}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* بخش نمایش پلیر که زیر همین ردیف باز می‌شود */}
                                                {isActive && (
                                                    <div className="bg-slate-900 p-4 sm:p-6 w-full border-t border-slate-700">
                                                        <div className="bg-black rounded-xl overflow-hidden shadow-2xl flex justify-center border border-slate-700">
                                                            {video.aparatIframe ? (
                                                                <div className="w-full aspect-video" dangerouslySetInnerHTML={{ __html: video.aparatIframe }} />
                                                            ) : video.videoUrl ? (
                                                                <video
                                                                    controls
                                                                    autoPlay
                                                                    controlsList="nodownload"
                                                                    className="w-full aspect-video outline-none"
                                                                    src={`${process.env.NEXT_PUBLIC_API_URL || ''}/videos/stream/${video._id}${Cookies.get('token') ? `?token=${Cookies.get('token')}` : ''}`}
                                                                />
                                                            ) : (
                                                                <p className="text-white p-10">ویدیویی برای پخش یافت نشد.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </section>

                        {/* 🔴 بخش نظرات و ریپلای */}
                        {/* بقیه کدهای این بخش بدون تغییر باقی می‌ماند ... */}
                        {/* (کد بخش نظرات که در فایل اصلی شما بود) */}

                        <section className="bg-white rounded-2xl shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
                                <h2 className="text-xl font-bold text-gray-800">نظرات دانشجویان</h2>
                            </div>

                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-8">
                                <label className="block text-sm text-gray-600 font-semibold mb-2">دیدگاه خود را بنویسید:</label>
                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
                                    rows="3"
                                    placeholder="تجربه خود از این دوره را اینجا بنویسید..."
                                ></textarea>
                                <div className="flex justify-end mt-3">
                                    <button
                                        onClick={handleCommentSubmit} disabled={isSubmitting}
                                        className={`${isSubmitting ? 'bg-gray-400' : 'bg-[#0ea5e9] hover:bg-blue-600'} text-white text-sm font-medium py-2 px-6 rounded-lg transition`}
                                    >
                                        {isSubmitting ? 'در حال ارسال...' : 'ثبت نظر'}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {mainComments.length === 0 ? (
                                    <p className="text-gray-500 text-sm text-center">هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهد!</p>
                                ) : (
                                    mainComments.map((comment) => (
                                        <div key={comment._id} className="border-b border-gray-100 pb-6 last:border-0">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                                                    {getUserName(comment.user).charAt(0)}
                                                </div>
                                                <div className="space-y-2 w-full">
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-sm font-bold text-gray-800">{getUserName(comment.user)}</h5>
                                                        <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-wrap">
                                                        {comment.content}
                                                    </p>
                                                    <button
                                                        onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                                                        className="text-xs text-blue-500 font-semibold mt-2 hover:underline"
                                                    >
                                                        {replyingTo === comment._id ? 'لغو پاسخ' : 'پاسخ دادن'}
                                                    </button>

                                                    {replyingTo === comment._id && (
                                                        <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                                            <textarea
                                                                value={replyText} onChange={(e) => setReplyText(e.target.value)}
                                                                className="w-full bg-white border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                                                rows="2" placeholder="پاسخ خود را بنویسید..."
                                                            ></textarea>
                                                            <div className="flex justify-end mt-2">
                                                                <button
                                                                    onClick={() => handleReplySubmit(comment._id)} disabled={isReplying}
                                                                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium py-1.5 px-4 rounded-md transition"
                                                                >
                                                                    {isReplying ? 'در حال ارسال...' : 'ارسال پاسخ'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {getReplies(comment._id).length > 0 && (
                                                <div className="mt-4 mr-12 pr-4 border-r-2 border-gray-100 space-y-4">
                                                    {getReplies(comment._id).map(reply => (
                                                        <div key={reply._id} className="flex gap-3">
                                                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                                                {getUserName(reply.user).charAt(0)}
                                                            </div>
                                                            <div className="w-full bg-gray-50 p-3 rounded-lg">
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <h5 className="text-xs font-bold text-gray-800">{getUserName(reply.user)}</h5>
                                                                    <span className="text-[10px] text-gray-400">{formatDate(reply.createdAt)}</span>
                                                                </div>
                                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                                    {reply.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    {/* ----------------- سایدبار ----------------- */}
                    <aside className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center space-y-4">
                            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold">
                                {course.instructorName ? course.instructorName.charAt(0) : 'م'}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{course.instructorName || 'نام مدرس'}</h3>
                                <p className="text-sm text-blue-600 font-semibold mt-1">{course.instructorField || 'مدرس دوره'}</p>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg w-full">
                                {course.instructorDescription || 'توضیحاتی برای این مدرس ثبت نشده است.'}
                            </p>
                        </div>
                        <div className="bg-[#0ea5e9] text-white rounded-2xl shadow-sm p-6 text-center text-sm leading-relaxed">
                            <p className="font-bold mb-2 flex items-center justify-center gap-2 text-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                پشتیبانی دانشجویان
                            </p>
                            <p className="text-blue-50 text-sm mt-2 opacity-90">
                                در صورت نیاز به راهنمایی، می‌توانید در بخش نظرات سوال خود را مطرح کنید.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
