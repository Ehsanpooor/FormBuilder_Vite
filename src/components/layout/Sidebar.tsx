import {
  LayoutDashboard,
  MessagesSquare,
  PhoneIncoming,
  Calendar,
  BookUser,
  Hand,
  Files,
  CreditCard,
  LifeBuoy,
  Settings,
  X,
} from "lucide-react";
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
  { icon: MessagesSquare, label: 'Messages', href: '#' },
  { icon: PhoneIncoming, label: 'Calls', href: '#' },
  { icon: Calendar, label: 'Calendar', href: '#' },
  { icon: BookUser, label: 'Contacts', href: '#' },
  { icon: Hand, label: 'Tasks', href: '#' },
  { icon: Files, label: 'Documents', href: '#' },
  { icon: CreditCard, label: 'Billing', href: '#' },
];

const bottomItems = [
  { icon: LifeBuoy, label: 'Help', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-80 transition-opacity duration-200 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Mobile Sidebar - Slides from right */}
      <aside
        className={cn(
          "flex lg:hidden flex-col justify-between fixed right-0 top-0 bottom-0 w-72 bg-background z-100 transition-transform duration-300 ease-in-out border-l",
          !isOpen && "translate-x-full"
        )}
      >
        <ScrollArea className='h-screen'>
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute left-4 top-4 p-2 hover:bg-accent rounded-md"
        >
          <X size={24} />
        </button>

        {/* Mobile Menu with Text */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col w-full gap-2 p-4 mt-16">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {}}
                className=" flex items-center text-primary gap-3 p-3 rounded-md hover:bg-accent  hover:text-accent-foreground transition-colors "
              >
                <item.icon size={24}  />
                <span className="font-medium text-foreground">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Bottom Menu */}
        <div className="p-4 border-t bg-background">
          <div className="flex flex-col gap-2 mb-6">
            {bottomItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {}}
                className="flex items-center text-primary gap-3 p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon size={24} />
                <span className="font-medium text-foreground">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center gap-3 p-3">
              <img
                src="/profile_test.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">John Doe</span>
            </div>
          </div>
        </div>
        </ScrollArea>
      </aside>

      {/* Desktop Sidebar - Always visible, icons only */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-20 bg-background  pl-4">
        <ScrollArea className='h-screen'>
        {/* Logo */}
        <div className="flex items-center justify-center py-8">
          <img
            src="/logo_main.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
        </div>

        {/* Main Icons Box */}
        <div className="flex flex-col items-center w-full mb-8 gap-9 bg-gray-50 py-9 rounded-lg">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {}}
              className="text-gray-500  hover:text-teal-500 transition-colors duration-200 group relative"
              title={item.label}
            >
              <item.icon size={24} />
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {item.label}
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto mb-8">
          {/* Help and Settings */}
          <div className="flex flex-col items-center gap-6 mb-6">
            {bottomItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {}}
                className="text-gray-500 hover:text-teal-500 transition-colors duration-200 group relative"
                title={item.label}
              >
                <item.icon size={24} />
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
          
          {/* Divider */}
          <div className="border-b border-gray-200 mb-6" />
          
          {/* Profile */}
          <div className="flex items-center justify-center relative group">
            <img
              src="/profile_test.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              John Doe
            </div>
          </div>
        </div>
        </ScrollArea>
      </aside>
    </>
  );
} 