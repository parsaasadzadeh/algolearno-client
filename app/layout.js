import "./globals.css";
import 'fontawesome-free/css/all.min.css';



export const metadata = {
  metadataBase: new URL('https://algolearno.com'),
  title: {
    default: 'آلگولرنو | آموزش برنامه‌نویسی',
    template: '%s | آلگولرنو',
  },
  description: 'آلگولرنو (Algolearno)؛ بهترین مرجع آموزش برنامه‌نویسی، الگوریتم، پایتون، جاوا اسکریپت و طراحی سایت. با دوره‌های پروژه‌محور ما، مسیر ورود به بازار کار را سریع‌تر طی کنید.',
  keywords: [
    'آموزش برنامه نویسی',
    'آلگولرنو',
    'algolearno',
    'آموزش ری اکت',
    'آموزش جاوا اسکریپت',
    'آموزش طراحی سایت',
    'اموزش نود جی اس ',
    'دوره برنامه نویسی',
    'آموزش فرانت اند',
    'آموزش بک اند'
  ],
  authors: [{ name: 'آلگولرنو', url: 'https://algolearno.com' }],
  creator: 'آلگولرنو',
  publisher: 'آلگولرنو',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'آلگولرنو | آموزش تخصصی برنامه‌نویسی',
    description: 'با دوره‌های کاربردی و پروژه‌محور آلگولرنو، از صفر تا صد برنامه‌نویسی را یاد بگیرید و وارد بازار کار شوید.',
    url: 'https://algolearno.com',
    siteName: 'آلگولرنو (AlgoLearno)',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/img/algofav.png', // پیشنهاد: یک عکس کاور با ابعاد 1200x630 جایگزین این کنید
        width: 800,
        height: 600,
        alt: 'آلگولرنو - آموزش برنامه نویسی',
      },
    ],
  },
  icons: {
    icon: '/img/algofav.png',
    apple: '/img/algofav.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'آلگولرنو | آموزش برنامه‌نویسی',
    description: 'با آلگولرنو وارد دنیای برنامه‌نویسی شوید. آموزش‌های کاربردی، پروژه‌محور و ویژه بازار کار.',
    site: '@algolearno',
    creator: '@algolearno',
    images: ['/img/algofav.png'],
  },
};


import Footer from "./components/footer";
import Navbar from "./components/navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="fs" dir="rtl">
      <head>
       <meta name="theme-color" content="#ffffff" />
       <meta name="google-site-verification" content="pFt_fQKVW2it7KAqEzCPm2NoY1_L_A3kk0pB8APc1bo" />
        {/* <link rel="me" href="https://instagram.com/algolearno" />
        <link rel="me" href="https://t.me/algolearno" /> */}
        {/* <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/> */}
      </head>
      <body
        className={` antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
