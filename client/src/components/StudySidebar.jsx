import { Link, useLocation } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: "⌂" },
  { label: "Generate notes", path: "/noteGenerate", icon: "✦" },
  { label: "Saved courses", path: "/saved-courses", icon: "⌁" },
];

const StudySidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-full shrink-0 border-b border-[#d7dcd3] bg-[#fffef8] lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col px-5 py-5 lg:px-6 lg:py-7">
        <Link
          to="/"
          className="flex items-center gap-2 text-[17px] font-bold tracking-[-.04em] text-[#18221f]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f4a248] text-white">
            S/
          </span>
          <span>StudyZen</span>
        </Link>

        <div className="mt-8 flex gap-2 overflow-x-auto lg:mt-16 lg:block lg:space-y-2">
          <p className="hidden px-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#a0a9a0] lg:mb-4 lg:block">
            Workspace
          </p>
          {navigation.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex min-w-max items-center gap-3 rounded-[3px] px-3 py-3 text-xs font-bold transition lg:w-full ${active ? "bg-[#1b2925] text-white shadow-lg shadow-[#1b2925]/10" : "text-[#68736c] hover:bg-[#f5f4ed] hover:text-[#1b2925]"}`}
              >
                <span
                  className={`text-base ${active ? "text-[#f2b16d]" : "text-[#e9914d]"}`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto hidden border-t border-[#d7dcd3] pt-5 lg:block">
          <p className="mb-3 text-[10px] leading-4 text-[#87908a]">
            Make space for better thinking.
          </p>
          <Link
            to="/"
            className="text-xs font-bold text-[#d4773d] hover:text-[#b45b2b]"
          >
            Back to home ↗
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default StudySidebar;
