# Form Builder

A flexible drag-and-drop form builder built with React, Vite, shadcn-ui and TailwindCSS. Users can visually create forms using a sleek, interactive interface.


## ✨ Features

- **Intuitive Drag-and-Drop Interface**: Easily design forms by dragging elements onto your canvas
- **Schema-Based Structure**: All forms use clean JSON schema with UUID identifiers
- **Real-Time Preview**: See your form changes instantly as you build
- **Get link**: Obtain a shareable link to your public form  
- **Accessible UI**: Built using Radix UI primitives for maximum accessibility

## 🚀 Tech Stack

- React 19 with ReactDOM
- TypeScript
- Vite
- shadcn-ui components
- TailwindCSS 4
- Zustand for state management
- Radix UI primitives
- dnd-kit (sortable, core, utilities)
- Framer Motion animations
- Lucide Icons
- React Router 7

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/form-builder.git

# Navigate to project directory
cd form-builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📖 Usage
0. use "user@gmail.com" and "User1234"for Login
1. **Add Elements**: Drag components from the sidebar onto your form canvas
2. **Configure Properties**: Select any element to edit its properties in the sidebar
3. **Preview**: Toggle to preview mode to test your form's functionality
4. **Get Your Link**: Get a link, your form is public now




## 📁 Project Structure

```
formBuilder/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images, icons, etc.
│   ├── components/
│   │   ├── auth/     # Authentication components
│   │   ├── elements/ # Form elements (inputs, buttons, etc.)
│   │   ├── form-builder/ # Core form builder components
│   │   ├── layout/   # Layout components
│   │   └── ui/       # UI components (shadcn)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   ├── pages/        # Page components
│   ├── routes/       # Route definitions
│   ├── store/        # Zustand state management
│   └── types/        # TypeScript type definitions
├── .gitignore
├── components.json   # shadcn components configuration
└── package.json
```

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run build:static` - Build static version 
- `npm run build:all` - Build static version + Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality



## 📄 License

This project is licensed under the MIT License
