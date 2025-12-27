# 📚 Bookstore Management System

## 📌 Project Description (EN)

**Bookstore Management System** is a web application for managing an online bookstore.  
The system simplifies the administration of books, categories, users, and orders, providing a simple and intuitive interface for both administrators and regular users.

---

## 🎯 Project Goals (EN)

- Automate bookstore management processes  
- Ensure secure user authentication and authorization  
- Clear role separation (**Admin / User**)  
- Full frontend–backend integration through **REST APIs**

---

## ⚙️ Main Features (EN)

- Secure user registration and login  
- JWT-based authentication and authorization  
- Role-based access control (**Admin / User**)  
- CRUD operations for:
  - Books  
  - Categories  
  - Users  
  - Orders  
- Admin Dashboard and User Dashboard  
- Book search and browsing  
- Order management  

---

## 🛠️ Technologies Used (EN)

### Frontend
- React.js  
- Tailwind CSS  
- Axios  

### Backend
- Node.js  
- Express.js  
- JWT (JSON Web Token)  
- Joi (Data validation)  

### Database
- MongoDB (NoSQL)  
- Mongoose ODM  

---

## 🏗️ System Architecture (EN)

The project is built using **Three-Tier Architecture**, divided into the following layers:

### Presentation Layer (Frontend)
- User interface  
- Built with React.js and Tailwind CSS  
- Main components:
  - Navbar & Footer  
  - BookList, BookDetails  
  - Login, Register  
  - Admin & User Dashboard  

### Application Layer (Backend)
- Built with Node.js and Express.js  
- Modular structure following **Clean Architecture**
- Includes:
  - Controllers  
  - Routes (RESTful API)  
  - Middlewares (authentication & validation)  
  - JWT Authentication  

### Data Layer (Database)
- MongoDB for data storage  

**Main models:**
- Users  
- Books  
- Categories  
- Orders  

---

## 🗃️ Database Design (EN)

### Main Relationships

- **Category (1 → many) Book**  
- **User (1 → many) Order**  
- **Book (many → many) Order**  

Relationships are implemented using **ObjectId** and Mongoose’s `populate()` method.

---

# 📚 Sistemi i Menaxhimit të Librarisë

## 📌 Përshkrimi i Projektit (SQ)

**Bookstore Management System** është një aplikacion web për menaxhimin e një librarie online.  
Sistemi lehtëson administrimin e librave, kategorive, përdoruesve dhe porosive, duke ofruar një ndërfaqe të thjeshtë dhe intuitive si për administratorët ashtu edhe për përdoruesit e zakonshëm.

---

## 🎯 Qëllimi i Projektit (SQ)

- Automatizimi i proceseve të menaxhimit të librarisë  
- Siguri në autentikim dhe autorizim të përdoruesve  
- Ndarje e qartë e roleve (**Admin / User**)  
- Integrim i plotë frontend–backend përmes **REST API-ve**

---

## ⚙️ Funksionalitetet Kryesore (SQ)

- Regjistrim dhe identifikim i sigurt i përdoruesve  
- Autentikim dhe autorizim me **JWT**  
- Ndarje rolesh (**Admin / User**)  
- CRUD operacione për:
  - Librat  
  - Kategoritë  
  - Përdoruesit  
  - Porositë  
- Admin Dashboard dhe User Dashboard  
- Kërkim dhe shfletim i librave  
- Menaxhim i porosive  

---

## 🛠️ Teknologjitë e Përdorura (SQ)

### Frontend
- React.js  
- Tailwind CSS  
- Axios  

### Backend
- Node.js  
- Express.js  
- JWT (JSON Web Token)  
- Joi (Validimi i të dhënave)  

### Databaza
- MongoDB (NoSQL)  
- Mongoose ODM  

---

## 🏗️ Arkitektura e Sistemit (SQ)

Projekti është ndërtuar mbi **Three-Tier Architecture**, e ndarë në shtresat e mëposhtme:

### Shtresa e Prezantimit (Frontend)
- Ndërfaqja grafike për përdoruesit  
- Ndërtuar me React.js dhe Tailwind CSS  

**Komponentë kryesorë:**
- Navbar & Footer  
- BookList, BookDetails  
- Login, Register  
- Admin & User Dashboard  

### Shtresa e Logjikës së Aplikacionit (Backend)
- Ndërtuar me Node.js dhe Express.js  
- Strukturë modulare dhe **Clean Architecture**
- Përfshin:
  - Controllers  
  - Routes (RESTful API)  
  - Middlewares (auth & validation)  
  - JWT Authentication  

### Shtresa e të Dhënave (Database)
- MongoDB për ruajtjen e të dhënave  

**Modele kryesore:**
- Users  
- Books  
- Categories  
- Orders  

---

## 🗃️ Dizajni i Bazës së të Dhënave (SQ)

### Relacionet Kryesore

- **Category (1 → shumë) Book**  
- **User (1 → shumë) Order**  
- **Book (shumë → shumë) Order**  

Relacionet realizohen përmes **ObjectId** dhe metodës `populate()` të **Mongoose**.
