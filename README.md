# 📌 StratoTask

**StratoTask** is a modern, responsive Kanban-style task management app for teams and individuals.

It features secure Firebase authentication (email/password & Google OAuth), lightning-fast UI built with **React & TailwindCSS**, a PostgreSQL backend (Node.js/Express), glassy, mobile-ready design, and real-time task organization. Designed to be flexible, accessible, and open-source, it's perfect for personal or team productivity.
[Live Server]([https://your-live-server-url.com](https://stratotask.onrender.com))

---

## 🚀 Features

- **Secure Auth**: Email/password login + Google Sign-In (Firebase)
- **Server-Side Data**: JWT-protected REST API (Node.js/Express) syncing with PostgreSQL
- **Real-Time Kanban Board**: Create, edit, delete, move tasks/lists instantly
- **Status Tracking**: "To Do", "In Progress", "Done"
- **Beautiful UI**: Glassy, animated, responsive (Tailwind)
- **Accessible**: Keyboard navigation, ARIA, focus highlights
- **Profile Settings**: Edit display name, view account modal
- **Smooth UX**: Dropdowns, modals, mobile menus, focus/hover transitions


---

## 🏗 Tech Stack

**Frontend**
- React 18+
- Tailwind CSS
- React Router
- Firebase JS SDK (auth)
- Axios

**Backend**
- Node.js & Express
- PostgreSQL
- Firebase Admin SDK
- dotenv
- CORS

---

## 🔗 API Endpoints

_All protected routes require `Authorization: Bearer <FirebaseIdToken>` header._

**Auth**
- `POST /api/auth/sync-user`

**Lists**
- `GET /api/lists`
- `POST /api/lists`
- `PUT /api/lists/:id`
- `DELETE /api/lists/:id`

**Tasks**
- `POST /api/lists/:listId/tasks`
- `PUT /api/lists/tasks/:taskId`
- `DELETE /api/lists/tasks/:taskId`

---

## 🔮 Future Improvements

_Trello-inspired + custom ideas for StratoTask:_

### 👥 Collaboration & Teams
- Add team members/collaborators to boards/lists/tasks
- Role-based permissions (Admin/Editor/Viewer)
- Real-time typing/editing and online indicators

### 📆 Deadlines & Reminders
- Due dates & deadlines for tasks
- Email/mobile/in-app notifications and reminders
- Visual highlighting for overdue/upcoming tasks

### 🖱 Drag & Drop
- Move tasks between lists
- Drag to re-order lists or tasks with smooth animation

### 🏷 Labels & Filters
- Add color-coded labels/tags
- Search/filter tasks by label, status, or assignee

### ✔ Checklists & Subtasks
- Turn tasks into checklists with progress
- Unlimited nested subtasks

### 📎 Attachments
- Upload and attach files/images/links to tasks

### 💬 Comments & Activity Feed
- Threaded comments on tasks
- Team discussions, mentions & task history

### 🔌 Integrations
- Google Calendar sync
- Slack, GitHub, Discord notifications

### 📱 Push Notifications
- Real-time push and desktop alerts for task changes and reminders

### 🌙 Dark Mode & Accessibility
- Dark mode toggle
- Enhanced keyboard navigation and ARIA labels

### 👤 User Profiles & Analytics
- Profile picture, user bio
- Task completion and productivity analytics

### 📝 Templates & Recurring Tasks
- Board/list/task templates for reuse
- Scheduling for recurring tasks

### 🌍 Multi-language & Internationalization
- Built-in i18n and timezone support

### 🔄 Offline/PWA
- Full offline support + auto sync when online


---

## 💡 Contributing

Pull requests and feature ideas very welcome!  
Open an issue or submit a PR for discussion and collaboration.

---

_Built with React, TailwindCSS, Node.js, PostgreSQL, Firebase Auth, and a passion for productivity._
