# Project Plan: Artist Portfolio & E-commerce Website

**Technology Stack:** Next.js, TypeScript, Shadcn UI, Tailwind CSS, Magic UI, p5.js

**Core Features:** Artwork Portfolio (various media types), Interactive p5.js Project Viewer/Runner, Print-on-Demand E-commerce, NFT Marketplace Integration.

---

## Phase 1: Project Setup & Foundation [COMPLETED]

- [x] 1.1 Initialize Next.js project (`create-next-app` with TS, Tailwind, ESLint).
- [x] 1.2 Install Core Dependencies (Shadcn UI, Magic UI CLI, p5, `@p5-wrapper/react`, `clsx`, `tailwind-merge`, `react-syntax-highlighter`).
- [x] 1.3 Configure Tailwind CSS (Handled by `create-next-app` & `globals.css` for v4).
- [x] 1.4 Configure Shadcn UI (`components.json`, theme variables in `globals.css`).
- [x] 1.5 Configure TypeScript (`tsconfig.json` path aliases).
- [x] 1.6 Establish Project Structure (`components`, `lib`, `data`, `p5-projects` folders).

## Phase 2: Core UI & Layout [COMPLETED]

- [x] 2.1 Define Global Layout (`app/layout.tsx` with Header/Footer placeholders, main tag).
- [x] 2.2 Implement Header/Navigation (`components/Header.tsx` using Shadcn `navigation-menu`).
- [x] 2.3 Implement Footer (`components/Footer.tsx` placeholder).
- [x] 2.4 Create Main Page Structures (Placeholders for `/portfolio`, `/shop`, `/nft`, `/about`).
- [x] 2.5 Integrate Magic UI (Added `GridPattern` to layout, created `magicui` component folder).
- [x] 2.6 Theme Setup (Basic Shadcn theme variables added to `globals.css`).

## Phase 3: Artwork Portfolio Implementation [COMPLETED]

- [x] 3.1 Define Artwork Data Structure (`Artwork` type in `lib/types.ts`).
- [x] 3.2 Data Storage (Initial) (Created `data/artworks.json` with sample data).
- [x] 3.3 Portfolio Gallery Page (`app/portfolio/page.tsx` fetching data, using Shadcn `Card`).
- [x] 3.4 Individual Artwork Page (`app/portfolio/[slug]/page.tsx` dynamic route, conditional rendering).
- [x] 3.5 Display Artwork Details (Implemented basic details display on `[slug]/page.tsx`).

## Phase 4: p5.js Integration (Viewer & Runner) [COMPLETED]

- [x] 4.1 Define p5 Project Structure (Conceptual).
- [x] 4.2 Create p5 Runner Component (`components/P5Runner.tsx` using `@p5-wrapper/react`, placeholder sketch).
- [x] 4.3 Create Code Viewer Component (`components/CodeViewer.tsx` using Shadcn `Tabs`, `react-syntax-highlighter`).
- [x] 4.4 Integrate on Artwork Page (Added `P5Runner` & `CodeViewer` to `[slug]/page.tsx` for 'p5' type, using `ResizablePanelGroup`).

## Phase 5: E-commerce (Print-on-Demand - POD) [IN PROGRESS]

- [ ] 5.1 Select POD Provider (Decision needed later).
- [x] 5.2 Define Product Data (`Product`, `PrintOption` types in `lib/types.ts`).
- [x] 5.3 Data Management (Initial) (Created `data/products.json` with sample data, added fetch functions to `lib/data.ts`).
- [x] 5.4 Shop Pages (Implemented Shop Gallery `app/shop/page.tsx` and Product Detail `app/shop/[productId]/page.tsx`).
- [x] 5.5 Cart Implementation (Client-side state, Cart component, Add to Cart functionality).
- [ ] 5.6 **Checkout Integration (Integrate with POD provider) <-- CURRENT STEP**

## Phase 6: NFT Marketplace Integration

- [ ] 6.1 Strategy Definition (Link out, Embed, or Custom).
- [ ] 6.2 Wallet Connection (If needed).
- [ ] 6.3 Display NFT Data (If applicable).
- [ ] 6.4 Smart Contract Development (If custom).
- [ ] 6.5 Minting/Listing UI (If custom).
- [ ] 6.6 Security Considerations.

## Phase 7: Data Management Strategy [COMPLETED - Initial Migration]

- [x] 7.1 Initial Approach Review (JSON files reviewed).
- [x] 7.2 Scalability Assessment (Supabase chosen for better scalability).
- [x] 7.3 Backend Options (Discussed: Headless CMS, DB/Backend, Git-based CMS).
- [x] 7.4 Recommended Path (Selected Supabase - DB/Backend).
- [/] 7.5 p5 Project Handling (Code still in Git, metadata now in `artworks` table - needs verification/refinement later).
- [x] 7.6 Data Fetching in Next.js (Updated `lib/data.ts` and page components to use Supabase client with async/await).
- [x] 7.7 Setup Supabase Project (User created project).
- [x] 7.8 Define Database Schema (Created `artworks`, `products`, `print_options` tables based on types).
- [x] 7.9 Install & Configure Supabase Client (`@supabase/supabase-js` installed, client configured in `lib/supabaseClient.ts`, credentials in `.env.local`).
- [x] 7.10 Data Migration (Migrated initial data from JSON to Supabase tables via SQL).

## Phase 8: Styling & Visual Polish

- [ ] 8.1 Refine Component Styling.
- [ ] 8.2 Implement Reference Images.
- [ ] 8.3 Magic UI Enhancement.
- [ ] 8.4 Responsive Design.
- [ ] 8.5 Micro-interactions.
- [ ] 8.6 Accessibility (A11y) Review.

## Phase 9: Testing & Deployment

- [ ] 9.1 Unit/Integration Testing.
- [ ] 9.2 End-to-End (E2E) Testing.
- [ ] 9.3 Cross-Browser/Device Testing.
- [ ] 9.4 Performance Optimization.
- [ ] 9.5 Deployment Platform Selection (Vercel recommended).
- [ ] 9.6 Build & Deployment.
- [ ] 9.7 Domain Configuration.
- [ ] 9.8 Post-Deployment Monitoring.

## Phase 10: Ongoing Considerations & Documentation

- [ ] 10.1 Version Control (Git).
- [ ] 10.2 Documentation (README, Code Comments, Architecture).
- [ ] 10.3 Environment Variables.
- [ ] 10.4 Error Handling.
- [ ] 10.5 SEO Basics.

---

## Project Status Summary (as of 2025-04-29 ~9:56 PM)

**Completed:**
*   Project initialization and core dependency setup (Next.js, TS, Tailwind, Shadcn, Magic UI, p5, etc.).
*   Basic UI layout (Header, Footer, Pages).
*   Artwork portfolio display (Gallery & Detail pages, reading from JSON).
*   p5.js integration structure (Runner & Code Viewer components, integrated into detail page).
*   E-commerce foundations (Product types, JSON data, Shop Gallery & Detail pages, Client-side Cart Context & UI, Add-to-Cart).
*   Resolved initial build errors and console warnings.
*   Development server (`npm run dev`) is running successfully.

**Current Step:**
*   Phase 5.6: Checkout Integration (Blocked pending POD provider selection).

**Next Major Steps Requiring Input/Decisions:**
*   Selecting a Print-on-Demand (POD) provider (for Phase 5.6).
*   Defining the NFT integration strategy (for Phase 6).
*   Deciding on a long-term data management solution (Headless CMS/Backend) and planning migration (for Phase 7).
*   Providing visual reference images/style guides (for Phase 8).

**Overall:**
The project foundation is built, core features are implemented with placeholder data/functionality where needed, and major errors have been resolved. The project is ready for the next phase of development, which involves integrating external services and refining the UI/UX.
