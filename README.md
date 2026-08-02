# GearUp Frontend Project

**"Rent Sports & Outdoor Gear Instantly"**

# Live URL:

https://gear-up-frontend-ten.vercel.app

# API Integration Document:

[API\_INTEGRATION.md](./API_INTEGRATION.md)


# Project Important Links:
```
Frontend Repo    : https://github.com/PrantaBaruaDev/gear-up-frontend.git
Live Frontend    : https://gear-up-frontend-ten.vercel.app
Backend API      : https://gear-up-bay.vercel.app
Demo Video       : https://drive.google.com/file/d/1Tphvthhs0MLlB6hqGgwoYswY55HWcuQR/view?usp=sharing
Admin Email      : pranta.admin@mail.com
Admin Password   : 1234
```

## Getting Started

First, run the development server:

```
npm run dev
```

## Roles & Permissions

| Role | Description | Frontend UI Expectations |
| --- | --- | --- |
| **Customer** | Users who rent sports gear | Public browsing, interactive date-pickers for rentals, checkout/payment flow, order tracking dashboard, review submission. |
| **Provider** | Gear vendors/rental shops | Protected provider dashboard, gear CRUD forms (with image upload UI), order management tables with status-update actions. |
| **Admin** | Platform moderators | Protected admin dashboard, user management tables (suspend/activate actions), global platform statistics, content moderation UI. |

## Frontend Routes & API Integration

| Next.js Route | Component/Feature | Backend API Consumption |
| --- | --- | --- |
| `/` | Home page with featured gear | `GET /api/gear` |
| `/gear` | Browse & filter gear | `GET /api/gear`, `GET /api/categories` |
| `/gear/[id]` | Gear details & rent CTA | `GET /api/gear/:id` |
| `/auth/register` | Role selection & registration form | `POST /api/auth/register` |
| `/auth/login` | Login form | `POST /api/auth/login` |
| `/dashboard/customer` | Customer overview & order history | `GET /api/rentals`, `GET /api/payments` |
| `/dashboard/customer/orders/[id]/pay` (pay button) | Payment initiation page | `POST /api/payments/create` |
| `/payment/success` & `/payment/cancel` | Payment outcome pages | (Updates UI based on URL params/session) |
| `/dashboard/provider` | Provider overview & inventory list | `GET /api/provider/gear` |
| `/dashboard/provider/gear/new` | Add gear form | `POST /api/provider/gear` |
| `/dashboard/provider/orders` | Manage incoming orders | `GET /api/provider/orders`, `PATCH /api/provider/orders/:id` |
| `/dashboard/admin` | Admin overview & user management | `GET /api/admin/users`, `PATCH /api/admin/users/:id` |

# **👨‍💻 Author**

### **Name: Pranta Barua**

### **Batch: L2B7**