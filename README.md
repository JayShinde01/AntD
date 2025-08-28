🛠️ Inventory & Sales Management System – Ambika Spare Parts

A full-stack Inventory & Sales Management System designed for Ambika Spare Parts.
This system helps manage products, customers, purchases, sales invoices, and reports, making business operations more efficient, accurate, and user-friendly.

🚀 Features

🔐 User Authentication – Secure login system with role-based access.

📦 Product Management – Add, update, delete, and view spare parts inventory.

👥 Customer Management – Maintain customer records with details.

🧾 Sales Invoice – Create dynamic invoices with tax, discount, and payment mode options.

📊 Dashboard & Reports – Visual representation of sales, customers, and products using charts.

📂 Purchases – Track and manage product purchases.

📑 Invoice Receipt – Auto-generated receipts with company letterhead & logo.

🔎 Search & Filters – Smart search for products, invoices, and customers.

🏗️ Tech Stack

Frontend

⚛️ React.js (with Ant Design components)

🎨Ant Design(for styling)

📊 Recharts (for data visualization)

Athentication
Firebase used for authentication
🏷️ Barcode/QR code integration
Backend

🟢 Node.js + Express.js

🗄️ MongoDB (No SQL)

📤 Multer (for image upload handling)

📂 Project Structure
inventary/
├── backend/
│   ├── server.js
│   ├── index.js
│   ├── routes/ (API routes: sales, customers, products, purchases, vendors)
│   └── models/ (Database schemas)
│
├── front/
│   ├── src/
│   │   ├── pages/ (All main pages)
│   │   ├── components/ (Reusable components: Sidebar, Navbar, InvoiceForm, etc.)
│   │   ├── page_style/ (Custom styles)
│   │   ├── assets/ (Logos, images)
│   │   ├── app.jsx
│   │   └── main.jsx
│   └── index.html
│
└── README.md

⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/inventary.git
cd inventary

2️⃣ Backend setup
cd backend
npm install
node server.js

3️⃣ Frontend setup
cd front
npm install
npm run dev



📌 Future Enhancements

📲 Mobile-friendly app version

🔔 Smart notifications for stock alerts




👨‍💻 Developer
@Team SmartTransitInovators
B.Tech CSE, KBP College of Engineering, Satara
