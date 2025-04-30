import { Link } from 'react-router-dom'
import { Button } from './components/ui/button'
import './App.css'
import { Toaster } from 'sonner'
import { SeoHead } from './lib/SeoHead'

function App() {
  return (
    <>
      <SeoHead
        title="Home"
        description="A simple and powerful tool to create and manage your forms"
        keywords="form builder, online forms, form creation, form management"
        ogType="website"
        canonicalUrl="/"
      />
      <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100" data-testid="home-container">
        <h1 className="mb-8 text-4xl font-bold text-center" data-testid="home-title">Welcome to Form Builder</h1>
        <p className="mb-8 text-lg text-center text-gray-600" data-testid="home-description">
          A simple and powerful tool to create and manage your forms
        </p>
        <div className="flex gap-4" data-testid="home-buttons">
          <Button asChild variant="outline" data-testid="home-login-btn">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App
