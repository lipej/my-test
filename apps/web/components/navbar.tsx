import { removeCookies } from "cookies-next";

type Params = {
  title: string;
  avatar?: string;
};

export default function NavBar({ title, avatar }: Params) {
  const handleLogout = () => {
    removeCookies("token");
    window.location.pathname = "/";
  };

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          {title}
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end"></div>
        {avatar && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={avatar} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
