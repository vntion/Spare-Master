# Spare Master

Spare Master is a simple online motorcycle/car spare parts store where users can buy and search for the products they want.

## Installation

**How to install this project:**

- Clone this project inside `C:\xampp\htdocs` folder
- Rename project folder to `Spare Master`

> [!IMPORTANT]  
> Your project must inside htdocs `C:\xampp\htdocs\Spare Master`

- Install dependencies this project

```bash
  $ npm install
  # or
  $ yarn
```

- Run project

```bash
  $ npm run dev
  # or
  $ yarn
```

- Build project

```bash
  $ npm run build
  # or
  $ yarn
```

- Happy coding!

**Data**

- Create database with name `sparemaster`
- Import the files `akun.sql`, `pembelian.sql`, and `produk.sql` located within the data folder.

**Login**

- Admin

```
  email: admin@gmail.com
  password: admin1234
```

- User

```
  email: user1@gmail.com
  password: user1

  email: user2@gmail.com
  password: user2

  email: user3@gmail.com
  password: user3
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_SESSION_KEY`

## Tech Stack

**Client:** React, React Router, TailwindCSS

**Server:** PHP, MySQL

**Other:** Integrate ESlint, Prettier, Functional programming with React hooks

## Project Routes

### Public Routes

- **Home**: `/`
- **Product detail**: `/produk/:id`
- **Search product**: `/search/:query`
- **Login**: `/login`
- **Sign up**: `/signup`
- **Thank you**: `/thankyou`
- **404**: Page not found

### Private Routes

- **Dashboard**: `/admin/dashboard`
- **Pembelian**: `/admin/pembelian`
- **Produk**: `/admin/produk`
