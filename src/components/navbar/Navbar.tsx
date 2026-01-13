import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth.store";

type MenuItem = {
  label: string;
  path: string;
};

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const menus: Record<string, MenuItem[]> = {
    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Users", path: "/admin/users" },
      { label: "Categories", path: "/admin/categories" },
      { label: "Companies", path: "/admin/companies" },
    ],
    employer: [
      { label: "Dashboard", path: "/employer" },
      { label: "My Company", path: "/employer/company" },
      { label: "Job Listings", path: "/employer/job-listings" },
      { label: "Applications", path: "/employer/applications" },
    ],
    applicant: [
      { label: "Dashboard", path: "/applicant" },
      { label: "Job Listings", path: "/applicant/job-listings" },
      { label: "My Applications", path: "/applicant/applications" },
    ],
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex gap-6">
        {menus[user.role].map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600"
                : "text-gray-600 hover:text-black"
            }
          >
            {menu.label}
          </NavLink>
        ))}
      </div>

      <button onClick={logout} className="text-sm text-red-600 hover:underline">
        Logout
      </button>
    </nav>
  );
}
