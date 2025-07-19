import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="h-[64px] bg-green-500 flex items-center justify-center gap-4 px-4 text-white">
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
        </Link>
        <Link to={"/crops"}>
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16,23c-1.7,0-3.3-0.4-4.7-1.1l0.7,2.2V29c0,0.6,0.4,1,1,1h6c0.6,0,1-0.4,1-1v-4.8l0.7-2.2C19.3,22.6,17.7,23,16,23z" />
            <path
              d="M27.9,14.2c0.7-0.9,1.1-2,1.1-3.2c0-2.8-2.2-5-5-5c-0.3,0-0.7,0-1,0.1C21.6,3.6,18.9,2,16,2s-5.6,1.6-7,4.1C8.7,6,8.3,6,8,6
    c-2.8,0-5,2.2-5,5c0,1.2,0.4,2.3,1.1,3.2c-1.3,1-2.1,2.6-2.1,4.3c0,3,2.5,5.5,5.5,5.5c0.5,0,1.1-0.1,1.6-0.2
    c0.3,0.3,0.6,0.6,0.9,0.9v-0.2l-0.6-1.9c-0.3-0.8,0-1.6,0.6-2.1c0.6-0.5,1.5-0.7,2.2-0.3c2.4,1.2,5.4,1.2,7.8,0
    c0.7-0.3,1.6-0.2,2.2,0.3c0.6,0.5,0.8,1.4,0.6,2.1L22,24.5v0.2c0.3-0.3,0.6-0.6,0.9-0.9c0.5,0.2,1.1,0.2,1.6,0.2
    c3,0,5.5-2.5,5.5-5.5C30,16.8,29.2,15.2,27.9,14.2z"
            />
          </svg>
        </Link>
      </nav>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
