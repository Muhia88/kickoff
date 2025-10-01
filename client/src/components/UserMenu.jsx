import { User } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';

export const UserMenu = () => {
  const { user } = useAuth();

  const handleClick = () => {
    if (user) {
      window.location.href = '/profile';
    } else {
      window.location.href = '/signin';
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center p-2 border rounded-md text-gray-700 hover:bg-gray-100 gap-2"
    >
      <User className="h-5 w-5" />
      {/* Show username on larger screens */}
      <span className="hidden lg:inline-block">
        {user ? `Hi, ${user.username}!` : ''}
      </span>
    </button>
  );
};