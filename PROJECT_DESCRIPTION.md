# StudyZen - AI Student Assistant

## 1. Project Summary

StudyZen is a full-stack AI study assistant for students. A user can create an account, verify the account through email OTP, log in, upload study material, ask for a specific learning output, generate structured notes with Google Gemini, save those notes, and revisit them later from a personal library.

The application has two separate packages:

- `client/`: React + Vite frontend
- `server/`: Node.js + Express backend

The product's visual direction is a calm study workspace: light blue/green backgrounds, dark navy text, warm coral/orange actions, compact cards, and a focused two-column notes-generation workspace.

## 2. Main User Journey

1. User opens the frontend.
2. User signs up with full name, email, and password.
3. Backend hashes the password and creates a 10-minute email OTP.
4. User verifies the OTP.
5. User logs in.
6. Backend sets HTTP-only `accessToken` and `refreshToken` cookies.
7. User opens the note-generation page.
8. User uploads a PDF, DOCX, PPTX, image, or submits text through the prompt.
9. Backend extracts text from the file when needed.
10. Backend sends a structured prompt to Google Gemini.
11. Frontend displays the generated Markdown notes.
12. User saves the notes, optionally uploading the original file to ImageKit.
13. User opens Saved Courses to search and read saved notes.

## 3. Technology Stack

### Frontend

- React 19
- Vite
- React Router
- Redux Toolkit and React Redux
- Axios
- Tailwind CSS v4 with `@tailwindcss/vite`
- `react-markdown` and `remark-gfm` for note rendering
- `react-toastify` for user feedback

### Backend

- Node.js with ES modules
- Express 5
- Sequelize ORM
- PostgreSQL through `DATABASE_URL`
- JWT access and refresh tokens
- HTTP-only cookies using `cookie-parser`
- CORS with credentials enabled
- Zod request validation
- Multer memory storage for uploaded files
- Google Gemini through `@google/genai`
- ImageKit for saved source-file uploads
- Nodemailer for OTP email
- `pdf-parse`, `mammoth`, `officeparser`, and Tesseract.js for text extraction/OCR

## 4. Repository Map

```text
client/
  src/
    api/
      api.js                 Axios instance; base URL and credentials
      auth/authApi.js        Signup, OTP, login, and getMe calls
      notes/notesApi.js      Generate, save, and fetch notes calls
    components/
      StudySidebar.jsx       Main authenticated navigation/sidebar
      ProtectedRoute/        Existing Redux-based route guard
    pages/
      Landing.jsx            Public landing page
      Dashboard.jsx          Study dashboard
      Notes.jsx              Note generation workspace (`/noteGenerate`)
      SavedCourses.jsx       Saved note library (`/saved-courses`)
      auth/                   Login, signup, and OTP verification pages
    routes/AppRoutes.jsx     Frontend route declarations
    store/                   Redux store and auth slice
    index.css                Tailwind import and global color overrides

server/
  index.js                   Starts the server and connects to the database
  app.js                     Express middleware, CORS, static files, and routes
  src/
    config/                  Environment config, Sequelize DB, ImageKit client
    routers/                 API route declarations
    controller/              HTTP request/response handlers
    services/                Business logic and external integrations
    repositories/            Database access functions
    model/                   Sequelize User, Note, and OTP models
    associations/             Sequelize model relationships
    middlewares/              Auth, role, validation, upload, and error handling
    validators/               Zod schemas
    utils/                    JWT, email, prompts, and file extraction helpers
```

## 5. Frontend Routes

Declared in `client/src/routes/AppRoutes.jsx`:

| Path             | Component      | Purpose                            |
| ---------------- | -------------- | ---------------------------------- |
| `/`              | `Landing`      | Public landing page                |
| `/signup`        | `SignUp`       | Create a new account               |
| `/verify-otp`    | `VerifyOTP`    | Verify email OTP                   |
| `/login`         | `Login`        | Authenticate a verified user       |
| `/dashboard`     | `Dashboard`    | Main study dashboard               |
| `/noteGenerate`  | `Notes`        | Upload material and generate notes |
| `/saved-courses` | `SavedCourses` | Search and read saved notes        |
| `*`              | `Login`        | Fallback route                     |

Important: `ProtectedRoute` exists but the current route file does not wrap dashboard, note generation, or saved courses with it. Treat these routes as intended authenticated routes, but verify this before changing navigation or auth behavior.

## 6. Backend API Contract

The backend base URL is `/api`. The frontend Axios instance currently uses `http://localhost:5000/api` and `withCredentials: true`.

### Authentication

| Method | Endpoint             | Auth           | Purpose                              |
| ------ | -------------------- | -------------- | ------------------------------------ |
| `POST` | `/api/signup`        | No             | Create user and send OTP             |
| `POST` | `/api/verify-otp`    | No             | Verify email OTP                     |
| `POST` | `/api/resend-otp`    | No             | Send a new OTP                       |
| `POST` | `/api/login`         | No             | Validate credentials and set cookies |
| `GET`  | `/api/getMe`         | Access cookie  | Fetch current user                   |
| `POST` | `/api/refresh-token` | Refresh cookie | Generate a new access token          |

### AI and notes

| Method | Endpoint           | Auth          | Body                                       | Purpose                                       |
| ------ | ------------------ | ------------- | ------------------------------------------ | --------------------------------------------- |
| `POST` | `/api/ai/generate` | Access cookie | Multipart: `file`, `prompt`                | Extract content and generate AI notes         |
| `POST` | `/api/notes/save`  | Access cookie | Multipart: `file`, `notesData` JSON string | Save generated notes and optional source file |
| `GET`  | `/api/notes`       | Access cookie | None                                       | Return notes belonging to current user        |

## 7. Authentication Details

Login creates two JWTs:

- Access token: signed with `JWT_ACCESS_SECRET`, JWT expiry is 1 hour, cookie max age is 15 minutes.
- Refresh token: signed with `JWT_REFRESH_SECRET`, JWT expiry and cookie max age are 7 days.

Both tokens are stored as `httpOnly` cookies. Cookies use `sameSite: strict`; `secure` becomes true when `NODE_ENV=production`.

The auth middleware reads `req.cookies.accessToken`, verifies it, and sets `req.user` to the decoded payload. The payload contains `id`, `email`, and `role`.

Current limitation to know before making auth changes:

- Redux auth state is in memory only and is not persisted.
- The frontend currently does not dispatch `getMeThunk()` during app startup.
- There is no Axios response interceptor that calls `/refresh-token` after a 401.
- The refresh endpoint currently returns a new access token in JSON but does not set a replacement `accessToken` cookie.
- Therefore a full browser refresh can reset the frontend auth state even though cookies remain, and expired access-token recovery is incomplete.

## 8. Note Generation Pipeline

The main implementation is in `server/src/services/ai.service.js`.

1. `POST /api/ai/generate` is protected by `authMiddleware` and `multer`.
2. Multer stores the upload in memory, not on disk.
3. The backend checks the MIME type:
   - `image/*` -> Tesseract OCR
   - `application/pdf` -> `pdf-parse`
   - DOCX -> Mammoth raw text extraction
   - PPTX -> `officeparser`
   - no file -> prompt-only generation
4. Extracted text and the user prompt are passed to `notes_prompt()`.
5. Google Gemini model `gemini-3.1-flash-lite` generates the response.
6. The response includes:
   - `title`
   - `originalFileName`
   - `fileType`
   - `extractedText`
   - `prompt`
   - `aiResponse`
7. The frontend renders `aiResponse` as Markdown.

Upload limit is configured in `server/src/middlewares/multer.middleware.js` as 20 MB, despite the old inline comment saying 5 MB.

## 9. Save Notes Pipeline

1. Frontend serializes the generated note object into `notesData`.
2. The original file is included only when the user clicks Save.
3. Backend parses `notesData` in `notes.controller.js`.
4. If a file exists, `notes.service.js` uploads it to ImageKit.
5. The note is saved through `notes.repository.js` with the current authenticated user ID.
6. Saved notes are fetched only for the current user.

The Note model stores:

- `userId`
- `title`
- `originalFileName`
- `fileType`
- `extractedText`
- `prompt`
- `aiResponse`
- Sequelize timestamps

## 10. Database and Associations

The backend uses Sequelize with PostgreSQL. `connectDB()` authenticates the connection and calls `sequelize.sync({ force: false })`.

Models include:

- `User`: full name, email, hashed password, role, verification status
- `Note`: generated note data and optional uploaded-file metadata
- `OTP`: email verification code, expiry, used status, and user relationship

Do not use `force: true`; it would destroy existing data. Prefer migrations for schema changes. Existing migration files are in `server/migrations/`.

## 11. Environment Variables

The backend expects values used by `server/src/config/config.js`:

```env
PORT=5000
DATABASE_URL=postgresql://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
GEMINI_API_KEY=...
GOOGLE_USER=...
GOOGLE_PASSWORD=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_URL_ENDPOINT=...
NODE_ENV=development
```

Never commit real secrets. The Docker Compose setup expects a server environment file at `/opt/studyzen/server.env` in the deployment environment.

## 12. Local Development

### Backend

```bash
cd server
npm install
npm start
```

Backend default port: `5000`.

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend Vite default port: `5173` during local development. The Docker frontend is exposed on port `3000`.

### Validation

```bash
cd client
npm run lint
npm run build
```

The server currently has no real automated test script; `npm test` is a placeholder.

## 13. Docker

`docker-compose.yml` defines:

- `backend`: builds `./server`, exposes `5000`, uses `/opt/studyzen/server.env`
- `frontend`: builds `./client`, exposes `3000`

Review Dockerfiles before changing deployment behavior. Do not assume the local Vite port and container port are identical.

## 14. Coding Conventions for Future Agents

- Preserve the existing React + Vite and Express + Sequelize architecture.
- Keep API calls inside the existing `client/src/api` modules.
- Keep database access inside repositories and business logic inside services.
- Keep controllers thin: parse request data, call a service, return a response.
- Use existing `asyncHandler`, `AppErrors`, auth middleware, and Zod validators.
- Do not expose JWTs to JavaScript if HTTP-only cookies are intended.
- Do not log passwords, tokens, API keys, uploaded document contents, or email credentials.
- Preserve `withCredentials: true` for authenticated browser requests.
- When changing note output, preserve the response fields consumed by `Notes.jsx` and `SavedCourses.jsx`.
- Keep frontend changes consistent with the StudyZen visual language and responsive behavior.
- Run `npm run lint` and `npm run build` in `client/` after frontend changes.
- Do not reset or overwrite unrelated user changes.

## 15. Recommended Next Improvements

These are known follow-up items, not assumptions that they are already implemented:

1. Add an app-start auth bootstrap that calls `getMeThunk()`.
2. Add an Axios 401 interceptor with a single-flight refresh request.
3. Make `/refresh-token` set a new HTTP-only access-token cookie.
4. Wrap authenticated frontend routes with `ProtectedRoute` after adding a loading/bootstrap state.
5. Add logout endpoint and clear both cookies server-side.
6. Validate file presence, file type, prompt length, and `notesData` parsing with clear user-facing errors.
7. Add backend tests for signup/OTP, login cookies, refresh, AI generation, save notes, and user isolation.
8. Move the frontend API base URL to a Vite environment variable instead of hardcoding localhost.
9. Add a real server test script and migration-based database workflow.

## 16. Agent Handoff Prompt

When assigning work to another coding agent, provide this file and the exact task. The agent should first identify the owning file and current behavior, then make the smallest compatible change.

Example:

> Read `PROJECT_DESCRIPTION.md` first. Work only on the authentication bootstrap flow. Preserve the existing HTTP-only cookie design, add startup user restoration, handle loading states, and verify the client with `npm run lint` and `npm run build`. Do not refactor unrelated pages or expose tokens to localStorage.
