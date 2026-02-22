# 🛒 S3-Based E-Commerce Web Application

A full-stack E-Commerce web application that integrates **AWS S3 Cloud Storage** for handling product image uploads using **pre-signed URLs**.

This project demonstrates how modern web applications securely upload files directly to cloud storage without exposing backend credentials.

---

## 🚀 Project Overview

This application allows users to browse products, upload product images to Amazon S3, and manage an e-commerce workflow using a modern frontend and backend architecture.

The main goal of this project is to implement:

✅ Secure file uploads  
✅ AWS S3 integration  
✅ Presigned URL workflow  
✅ Full-stack communication  
✅ Cloud-based asset storage  

---

## ⚙️ Tech Stack

### Frontend
- HTML
- TAILWIND CSS
- JavaScript
- Fetch API 

### Backend
- Node.js
- Express.js
- REST APIs

### Cloud & DevOps
- Amazon S3
- AWS IAM
- Presigned URLs
- Environment Variables (.env)

---

## ☁️ AWS S3 Integration (Core Feature)

Instead of uploading images through the backend server:

1. Backend generates a **Presigned URL**
2. Frontend uploads image **directly to S3**
3. Image stored securely in AWS bucket
4. Backend never handles large file data

### Benefits
- 🔐 Secure uploads
- ⚡ Faster performance
- 💰 Reduced server load
- ☁️ Scalable cloud storage
---

## 🛠️ Installation & Setup

### 1 Clone Repository

```bash
git clone https://github.com/RahulM2416/S3-Based-Ecommerce-web.git
cd S3-Based-Ecommerce-web
```

### 2 Backend Setup 
```bash
cd backend
npm install
```

### create .env file
```bash
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
S3_BUCKET_NAME=your_bucket_name
PORT=3000
```

### Run Backend 
```bash
npm start
```

### 3 Frontend Setup
```bash
cd frontend
npm install
```

### Run Backend 
```bash
npm run dev
```

---

## STAR THE REPO IF YOU LIKE THIS PROJECT

