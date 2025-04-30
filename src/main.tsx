import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes'

// Define which routes should be statically rendered vs client-side rendered
const currentPath = window.location.pathname;
const isStaticRoute = 
  currentPath === '/' || 
  currentPath === '/login' || 
  currentPath.startsWith('/app/dashboard');
const isFormRoute = currentPath.startsWith('/forms/');

// Create different hydration strategies based on route type
const renderApp = () => {
  const root = createRoot(document.getElementById('root')!);
  
  // For static routes (dashboard and login), use partial hydration
  if (isStaticRoute) {
    root.render(
      <StrictMode>
        <Router />
      </StrictMode>,
    );
  } 
  // For form routes, use full client-side rendering with dynamic imports
  else if (isFormRoute) {
    // Ensure form-related code is loaded dynamically
    import('./routes/form-routes.tsx')
      .then((module) => {
        const FormRouter = module.default;
        root.render(
          <StrictMode>
            <FormRouter />
          </StrictMode>,
        );
      })
      .catch((error) => {
        console.error('Error loading form routes:', error);
        // Fallback to standard router
        root.render(
          <StrictMode>
            <Router />
          </StrictMode>,
        );
      });
  } 
  // Default case - standard rendering
  else {
    root.render(
      <StrictMode>
        <Router />
      </StrictMode>,
    );
  }
};

// Initialize the application
renderApp();
