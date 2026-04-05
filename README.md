# Zorvyn Fintech: Finance Data Processing and Access Control Backend

## Objective
A logically structured, full-featured backend for a finance dashboard handling user Role-Based Access Control (RBAC), robust financial transaction tracking, data analytics aggregation, and secure API architecture. 

## Technology Stack
- **Framework**: Node.js & Express (TypeScript)
- **Database ORM**: Prisma
- **Database**: PostgreSQL (configured for Vercel Serverless deployments)
- **Validation**: Zod (Strict Schema Validation)
- **Security**: Helmet, bcrypt, JSON Web Tokens (JWT), Express-Rate-Limit

## Security & Architecture Breakdown (Interview Reference)
👉 **[Read the Full Technical Story & Architecture Breakdown here (STORY.md)](./STORY.md)**
This dedicated document breaks down exactly *why* certain technologies were chosen (Vercel Serverless routing, PostgreSQL over SQLite, Soft Deletes, RBAC, and UI injections) alongside specific code snippets ideal for technical interviews.

---

## 1. Core Implementation & Tradeoffs
### Database Selection (Vercel Serverless Compliance)
**Assumption Check:** Initially, development typically utilizes `SQLite` for simplicity. However, recognizing modern CI/CD requirements, mapping directly to a Vercel deployment pipeline enforces Serverless architectural limits. Since Vercel Serverless Edge/Functions maintain ephemeral read-only file systems, a traditional file-based `SQLite` database will crash upon receiving `POST/PUT` operations. 
**Tradeoff:** I abstracted the Prisma configuration strictly to `"postgresql"` under the hood so the system natively supports scaling to Neon or Supabase instances, completely future-proofing the deployment logic for the Zorvyn Portal.

### Access Control Configuration
Role-Based Access Control (RBAC) was implemented at the middleware routing level using an automated `restrictTo` token-check function. 
- **Admin**: Immutable read, write, toggle user states (`ACTIVE/INACTIVE`), establish roles.
- **Analyst**: Deep Dashboard reporting and record viewing capability, bypassing user modification logic safely.
- **Viewer**: Read-only isolated access blocks.

### Soft Record Deletions
**Assumption Check:** True record deletion in financial auditing structures can be dangerous and non-compliant.
**Design Logic:** I equipped the `.transactions` schema with a permanent `isDeleted` Boolean toggle. Deletion methods use an update query rather than explicit destruction, securing historical data audits transparently.

---

## 2. API Endpoints Map
*(A full interactive display of these endpoints is automatically hosted dynamically on `[HOST]/api-docs` thanks to our integrated Swagger UI wrapper)*

* **Authentication API:**
  * `POST /api/auth/register`
  * `POST /api/auth/login`
* **User Management API:**
  * `GET /api/users`
  * `PUT /api/users/:id/role`
  * `PUT /api/users/:id/status`
  * `DELETE /api/users/:id`
* **Transaction Records API:**
  * `GET /api/transactions`
  * `POST /api/transactions`
  * `GET /api/transactions/:id`
  * `PUT /api/transactions/:id`
  * `DELETE /api/transactions/:id` *(Soft Delete)*
* **Dashboard Analytics API:**
  * `GET /api/dashboard/summary`
  * `GET /api/dashboard/category-breakdown`
  * `GET /api/dashboard/monthly-trends`
  * `GET /api/dashboard/recent-activity`

---

## 3. Local Installation & Setup

1. **Install Node.js Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file at the root:
   ```env
   DATABASE_URL="postgresql://user:password@host/db"
   PORT=3000
   JWT_SECRET="YOUR_SUPER_SECRET_KEY"
   JWT_EXPIRES_IN="1d"
   ```

3. **Prisma Mapping & Seed Generation**
   Sync up the configured remote database and trigger the test population script:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. **Launch Server Development Protocol**
   Because a `postinstall` script hooks seamlessly with compilation limits, triggering dev mode compiles seamlessly:
   ```bash
   npm run dev
   ```

## Folder Architecture Overview
- `/src/modules`: Contains domains mapped with Controller/Route/Service encapsulation.
- `/src/middlewares`: Global exception trackers, Request interception (RBAC/Auth).
- `/src/validators`: Zod schema bounds strictly controlling JSON injections to memory.
- `/src/config`: Secure env parsing configurations dynamically caching environment hooks.
