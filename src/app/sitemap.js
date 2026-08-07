export default async function sitemap() {
  const baseUrl = 'https://dokanpat.vercel.app'; 


  const staticPages = [
    '',
    '/shops',
    '/register',
    '/dashboard/seller',
    '/help',
    '/terms',
    '/privacy',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticPages];
}