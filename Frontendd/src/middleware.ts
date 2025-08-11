import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import type { userPayload } from "@/interfaces/userPayload.dto";

// Rutas
const protectedRoutes = ["/DashboardAgente"];
const onBoardingRoutes = ["/stripe"];
const adminRoutes = ["/DashboardAdmin"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isOnBoardingRoute = onBoardingRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = request.cookies.get("token")?.value;

  // Decodifico lo mínimo posible del token para no depender solo del endpoint
  const { isAuthenticated, isAdmin, isOnBoarding, isPay } = verifySession(token);

  // Verificación con backend (evita loop y limpia cookie si es inválido)
  const isTokenValid = await verifyToken(request);

  // Si hay token pero es inválido -> borro cookie y mando a /login
  if (token && !isTokenValid && !isPublicRoute) {
    const res = NextResponse.redirect(new URL("/login", request.nextUrl));
    res.cookies.delete("token");
    return res;
  }

  // Si la ruta es pública y el usuario ya está auth -> redirijo a destino
  if (isPublicRoute && isAuthenticated && isTokenValid) {
    const targetPath = isOnBoarding ? "/stripe" : "/DashboardAgente";
    return NextResponse.redirect(new URL(targetPath, request.nextUrl));
  }

  // Rutas protegidas: si no está auth -> login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Onboarding: si está en proceso y entra a protegida -> mandarlo a /stripe
  if (isProtectedRoute && isOnBoarding && isAuthenticated) {
    return NextResponse.redirect(new URL("/stripe", request.nextUrl));
  }

  // Si intenta entrar a /stripe sin estar en onboarding -> home
  if (isOnBoardingRoute && !isOnBoarding) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Admin: requiere auth + admin
  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

// === Helpers ===

async function verifyToken(req: NextRequest): Promise<boolean> {
  // IMPORTANTe: usar /api/... para quedar fuera del matcher y evitar loop.
  // Si NEXT_PUBLIC_API_URL apunta a backend externo, úsalo; si no, usa mismo origen.
  const external = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  const url = external
    ? `${external}/auth/validToken`
    : `${req.nextUrl.origin}/api/auth/validToken`;

  try {
    const res = await fetch(url, {
      headers: {
        // Reenvío cookie al backend
        cookie: req.headers.get("cookie") ?? "",
      },
      // Evita caché en edge
      cache: "no-store",
    });

    // 2xx/3xx = válido; 401/403/404 = inválido
    return !(res.status === 401 || res.status === 403 || res.status === 404);
  } catch (e) {
    // Si falla la red, tratamos como inválido para no romper navegación
    return false;
  }
}

function verifySession(token?: string): {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOnBoarding: boolean;
  isPay: boolean | string | undefined;
} {
  if (!token)
    return { isAuthenticated: false, isAdmin: false, isOnBoarding: false, isPay: false };

  try {
    const user = jwtDecode<userPayload>(token);
    return {
      isAuthenticated: true,
      isAdmin: !!user.isAdmin,
      isOnBoarding: !!user.onBoarding,
      isPay: user.status,
    };
  } catch {
    return { isAuthenticated: false, isAdmin: false, isOnBoarding: false, isPay: false };
  }
}

// Excluir /api y estáticos (así /api/auth/validToken nunca pasa por el middleware)
export const config = {
  matcher: [
    "/((?!api|_next|.*\\.(?:png|jpg|jpeg|svg|ico|webp|gif|css|js|map)$).*)",
  ],
};
