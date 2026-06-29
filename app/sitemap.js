export default function sitemap() {
  const baseUrl = 'https://algolearno.ir';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/courses`, lastModified: new Date() },
    // دوره‌های خود را به این شکل کپی کرده و به لیست اضافه کنید:
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/login`, lastModified: new Date() },
    { url: `${baseUrl}/courses/reactjs`, lastModified: new Date() },
    { url: `${baseUrl}/courses/javascript`, lastModified: new Date() },
    { url: `${baseUrl}/courses/flex-box`, lastModified: new Date() },
    { url: `${baseUrl}/courses/bootstrap`, lastModified: new Date() },
    { url: `${baseUrl}/courses/html-css-course`, lastModified: new Date() },
  ];
}
