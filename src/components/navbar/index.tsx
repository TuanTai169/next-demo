import Link from 'next/link';
import { useRouter } from 'next/router';
const Navbar = () => {
  const router = useRouter();

  const onLogout = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    localStorage.clear();
    router.push('/login');
  };
  return (
    <nav className="nav bg-blue-200">
      <div className="flex p-4 items-center justify-between">
        <ul className="flex items-center w-1/5 justify-between">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/user">User</Link>
          </li>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        </ul>
        <button className="bg-blue-500 p-2 rounded-md text-white" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
