# Zorvyn Fintech Backend - Interview Narrative

*This document is designed to guide technical discussions regarding architectural decisions, tradeoffs, and system logic used in the Zorvyn Fintech Backend. It illustrates exactly **what** was built, **why** certain tools were chosen, and **how** Vercel Serverless limitations were bypassed.*

---

## 1. Cloud-First Database Strategy: PostgreSQL vs. SQLite
**The Challenge:** Many standard Node.js boilerplates default to SQLite for prototyping speed. However, deploying a file-based database like SQLite to Vercel is a critical architectural anti-pattern. Vercel utilizes ephemeral serverless functions with a read-only filesystem; any `HTTP POST/PUT` attempt to an SQLite file in production will immediately crash.

**The Solution:** I preemptively engineered the Prisma schema to utilize PostgreSQL. This future-proofs the application for immediate integration with scalable managed databases like Supabase or Neon.

**The Code (`prisma/schema.prisma`):**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## 2. Bypassing Serverless Traps (Serving Custom Swagger UI)
**The Challenge:** Standard Swagger UI implementations rely heavily on serving local static assets globally (`/public/custom.css`). However, when Express is packaged into a Vercel serverless function (`api/index.ts`), Vercel intercepts wildcard routes `/(.*)` and pushes them deep into `/var/task`, often breaking the delivery of static CSS/JS files and resulting in a blank or unstyled documentation page.

**The Solution:** Instead of fighting the serverless compiler, I configured `vercel.json` rewrites. This instructs Vercel's global Edge CDN to intercept `/public/(.*)` traffic and serve the physical assets instantly, ensuring the UI loads flawlessly while delegating all standard `/(.*)` routes to the Node backend.

**The Code (`vercel.json`):**
```json
"rewrites": [
  {
    "source": "/public/(.*)",
    "destination": "/public/$1"
  },
  {
    "source": "/(.*)",
    "destination": "/api/index.ts"
  }
]
```

---

## 3. High-End Presentation Layer (The UI Jar Aesthetic)
**The Challenge:** Standard Swagger UI is notoriously clinical and visually dull. I wanted to demonstrate full-stack aesthetic awareness even within a pure backend system, creating a premium first impression for API consumers.

**The Solution:** I injected a customized `window.addEventListener` script and a heavy CSS override sheet into Swagger UI. I completely rebuilt the UI to mirror the high-end, premium deep-dark "UI Jar" aesthetic—featuring a subtle grid background, a sleek floating black window layout, subdued slate-grey typography, and glassmorphic header pill-tags.

---

## 4. Bulletproof Security: Role-Based Access Control (RBAC)
**The Challenge:** Financial dashboards demand strict boundaries between Viewers, Analysts, and Administrators. Hardcoding permission checks in every controller creates bloated, unmaintainable spaghetti code.

**The Solution:** I utilized JWT for stateless session handling and built a dynamic, higher-order middleware function `restrictTo(...)` that acts as a gatekeeper across the Express router layer.

**The Code (`src/middlewares/authMiddleware.ts`):**
```typescript
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

// Implementation on route:
router.put('/:id/role', restrictTo('ADMIN'), updateRoleController);
```

---

## 5. Architectural Data Safety: Soft Deletion
**The Challenge:** Executing true `DELETE` commands on financial transactions is disastrous. It permanently alters historical revenue models, breaks analytical aggregation (`SUM` queries), and violates financial auditing principles.

**The Solution:** Implemented "Soft Deletes". The database `.transactions` model possesses an `isDeleted` Boolean. The controller's `delete` logic does not destroy the row; it simply updates the boolean flag. Subsequent `GET` routes filter out `isDeleted: true`, hiding the data without destroying history.

**The Code (Transaction Controller / Prisma Query):**
```typescript
// SOFT DELETE
await prisma.transaction.update({
  where: { id: req.params.id },
  data: { isDeleted: true } // Preserves row for db audits
});
```

---

## 6. Edge Case Validation via Zod
**The Challenge:** Relying on Prisma/TypeScript to catch malformed JSON payloads at runtime still leaves the server vulnerable to heavy processing overhead and poor client error reporting.

**The Solution:** I implemented `Zod` schema validation at the earliest possible interception point (the router boundary). If a user attempts to push a `string` to an `amount` integer field, Zod violently rejects the request with highly specific error logging before it ever touches memory or the database ORM.
