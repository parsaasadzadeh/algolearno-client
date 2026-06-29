import AuthPage from "./Login";

export const metadata = {
  title: 'ورود / ثبت نام',
  description: 'برای ارتباط با تیم پشتیبانی آلگولرنو، مشاوره دوره‌های برنامه‌نویسی و طرح سوالات خود از طریق ایمیل، تلفن یا تلگرام با ما در تماس باشید.',
};

export default function loginPage(){
  return(
    <>
    <AuthPage />
    </>
  )
}