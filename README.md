# Periyanayaki Inventory Management System

A professional, modern inventory management system built with React, Vite, and Material-UI. Designed for managing products, buyers, and dispatch operations seamlessly.

## ✨ Features

- **Dashboard**: Real-time overview of inventory metrics and recent activities
- **Product Management**: Add, edit, delete products with multiple images and detailed information
- **Buyer Management**: Track buyer information and purchase history
- **Dispatch Management**: Monitor order dispatch status and delivery details
- **Inventory Tracking**: Automatic stock updates when purchases are made
- **Search & Filters**: Advanced filtering by category, status, and customer type
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Stock Alerts**: Get notified when products run low or out of stock

## 🛠️ Technologies

- **React 18.2.0** - UI library
- **Vite 5.0.0** - Build tool and development server
- **Material-UI (MUI) 5.14.0** - Component library
- **React Router 6.20.0** - Routing
- **React Icons 4.12.0** - Icon library
- **Axios 1.6.0** - HTTP client
- **Emotion** - CSS-in-JS styling

## 📁 Project Structure

```
periyanayaki-inventory/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── cards/
│   │   ├── common/
│   │   ├── dialogs/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── tables/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── InventoryContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── products.js
│   │   ├── buyers.js
│   │   ├── dispatch.js
│   │   └── users.js
│   ├── pages/
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── Products/
│   │   ├── Buyers/
│   │   ├── Dispatch/
│   │   └── Settings/
│   ├── services/
│   ├── theme/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Installation

1. **Extract the ZIP file**
   ```bash
   unzip periyanayaki-inventory.zip
   cd periyanayaki-inventory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔐 Login Credentials

**Demo Username:** Admin
**Demo Password:** Password123

The system supports frontend-only authentication with dummy credentials for demonstration purposes.

## 📊 Dashboard

The dashboard provides:
- Total products count
- Available products count
- Low stock warnings
- Out of stock count
- Total buyers
- Pending payments
- Active dispatches
- Recent activities (products, buyers, dispatches)

## 📦 Product Management

- Add new products with multiple images
- Edit product details
- Delete products
- Filter by category and stock status
- Search by product name
- Automatic low stock and out of stock alerts

## 👥 Buyer Management

- Add buyer information
- Track purchase history
- Monitor payment status
- Filter by customer type (Retail/Wholesale)
- Automatic inventory updates on purchase
- Prevention of overselling

## 🚚 Dispatch Management

- Create dispatch orders
- Track dispatch status
- Manage transport details
- Monitor delivery type (Booking/Direct)
- Search and filter dispatch records

## ⚙️ State Management

The application uses React Context API for state management:

- **AuthContext**: User authentication and login state
- **InventoryContext**: Products, buyers, and dispatch data
- **ThemeContext**: Dark mode toggle

All data is stored in React state with optional localStorage persistence.

## 🎨 Customization

### Colors

Edit `src/theme/theme.js` to customize the color palette:
- Primary: `#2563EB`
- Secondary: `#FFFFFF`
- Success: `#22C55E`
- Error: `#EF4444`
- Background: `#F5F7FA`

### Add New Pages

1. Create a new file in `src/pages/`
2. Add the route in `src/routes/AppRoutes.jsx`
3. Add navigation link in `src/components/layout/Sidebar.jsx`

## 🔄 Backend Integration

The application is structured for easy backend integration:

1. API calls are centralized in `src/services/axios.js`
2. Replace dummy data with API calls
3. Update context functions to use axios instead of state operations

Example API integration structure is ready in the axios service file.

## 📝 Future Enhancements

- Real backend API integration
- User authentication with JWT
- Database persistence
- Advanced reporting and analytics
- Email notifications
- Excel export/import
- Barcode scanning
- Multi-language support
- Advanced user roles and permissions

## 📋 System Requirements

- Node.js 14.0 or higher
- npm 6.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🐛 Troubleshooting

**Issue: Port 5173 already in use**
```bash
npm run dev -- --port 3000
```

**Issue: Module not found**
```bash
rm -rf node_modules
npm install
```

**Issue: Build fails**
```bash
npm run build
```

## 📄 License

This project is built for Periyanayaki company.

## 🤝 Support

For issues or questions, please contact the development team.

---

**Made with ❤️ for Periyanayaki**
