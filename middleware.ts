// middleware.js (или middleware.ts, если вы используете TypeScript)

export function middleware() {}

// Конфигурация модуля
export const config = {
  matcher: [
    // Пропустить внутренности Next.js и все статические файлы, если они не найдены в параметрах поиска
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Всегда запускать для API маршрутов
    '/(api|trpc)(.*)',
  ],
}
