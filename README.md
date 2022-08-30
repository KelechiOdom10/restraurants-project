# Restraurants multiverse project
This is a restaurant website application with ordering functionality would help tackle the inadequacies and the weaknesses of the offline business model and the use of 3rd party delivery companies. It was built in a week with a hackathon style approach to understand what it's like working under pressure.

## User Stories
- As a user I want to be able to create an account, so my info is stored on the system 
- As a user I want to be able to login, and my session on the browser can be used to carry out subsequent activities 
- As a user I want to be able to logout and my session on the browser is destroyed 
- As a user I want to be able to view, search and filter by category for all menu items  
- As a user I want to be able to add menu items to the cart ranging from 1 to 5  
- As a user I want to be able to view all items added to the cart with a running sub-total  
- As a user I want to be able to update cart items including changing the quantity of any item added, or removing items from the cart 
- As a user I want to be able to book a table on specific dates and time 
- As a user I want to be able to see all my bookings 
- As a user I want my bookings to be persisted in the database, so I have access to my bookings 
- As a user I want to be able to update bookings 
- As a user I want to be able to checkout / mimic payment address inputted and my order stored in the database 
- As a user I want to be able to view all my checkout orders with their order status 
- As an admin I want to be able to add, update and delete product items 
- As an admin I want to be able to view all orders, products, bookings, and users 
- As an admin I want to be to add, update and delete categories  
- As an admin I want to be update the statuses of checkout orders 

## Technologies 🔧
This project followed a test driven development approach on the backend and these are the technologies used:

- Express
- Mongo DB
- Jest
- Yup
- Next.js(React)
- Framer Motion
- Chakra UI
- React Query

## Installation 💾
```bash
git clone https://github.com/KelechiOdom10/restraurants-project.git
```

### Backend 
Fill your `.env` variables:

```
PORT=8080
MONGO_URI_DEV=
MONGO_URI_PROD=
NEXT_PUBLIC_VERCEL_URL=
DOMAIN_VERCEL_URL=
TOKEN_SECRET=
```

Install deps:
```bash
npm install
```

Run server:

```bash
npm run server
```

### Frontend
Fill your `.env` variables:

```
NEXT_PUBLIC_SERVER_URL="http://localhost:8080"
NEXT_PUBLIC_SERVER_URL_PROD=
```

Install deps:
```bash
npm install
```

Run Next Dev server:

```bash
npm run dev
```


