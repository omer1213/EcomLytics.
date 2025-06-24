

// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Protect everything except Clerk and static files
//     '/((?!_next|.*\\..*|sign-in|sign-up|api/webhooks|favicon.ico).*)',
//   ],
// };



import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Add your specific routes to be protected
const isProtectedRoute = createRouteMatcher([
    // '/',
    '/aiwriter',
    '/chat/[id]',
    '/dashboard',
    '/products',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect(); // ✅ No parentheses!
    }
});

export const config = {
    matcher: [
        '/((?!_next|.*\\..*|sign-in|sign-up|api/webhooks|favicon.ico).*)',
    ],
};
