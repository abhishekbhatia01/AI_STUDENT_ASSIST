import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout as clearAuth } from "../store/authSlice/authSlice";
import { logout } from "../api/auth/authApi";
import { deleteUser, getAllUsers, setUserBlocked } from "../api/admin/adminApi";
import UserDetailsModal from "../components/UserDetailsModal";

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.users || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load users.");
      } finally {
        setIsLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  const handleBlock = async (listedUser) => {
    setActionId(listedUser.id);

    try {
      await setUserBlocked(listedUser.id, !listedUser.isBlocked);
      toast.success(listedUser.isBlocked ? "User unblocked." : "User blocked.");
      const response = await getAllUsers();
      setUsers(response.users || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update user.");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (listedUser) => {
    if (!window.confirm(`Delete ${listedUser.fullname}'s account?`)) return;

    setActionId(listedUser.id);

    try {
      await deleteUser(listedUser.id);
      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser.id !== listedUser.id),
      );
      toast.success("User deleted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete user.");
    } finally {
      setActionId(null);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      dispatch(clearAuth());
      navigate("/login", { replace: true });
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#edf2f5] text-[#12263a] lg:flex">
        <aside className="w-full shrink-0 border-b border-[#c8d4dc] bg-[#12263a] text-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:border-[#29465a]">
          <div className="flex h-full flex-col px-5 py-5 lg:px-6 lg:py-7">
            <Link to="/" className="flex items-center gap-3 text-lg font-bold">
              <span className="grid h-8 w-8 place-items-center rounded bg-[#ef6f61] text-sm">
                S/
              </span>
              StudyZen
            </Link>

            <div className="mt-12">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#9db8c6]">
                Administration
              </p>
              <div className="rounded bg-[#1d4964] px-3 py-3 text-sm font-bold">
                <span className="mr-3 text-[#ffd0a6]">▦</span>
                Overview
              </div>
              <Link
                to="/admin/users"
                className="mt-2 block rounded px-3 py-3 text-sm font-bold text-[#c8dce6] transition hover:bg-[#1d4964] hover:text-white"
              >
                <span className="mr-3 text-[#ffd0a6]">◎</span>
                Users
              </Link>
            </div>

            <div className="mt-auto border-t border-[#29465a] pt-5">
              <p className="mb-1 truncate text-xs font-semibold text-white">
                {user?.fullname || "System Admin"}
              </p>
              <p className="mb-4 text-[10px] uppercase tracking-wider text-[#9db8c6]">
                Administrator
              </p>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-xs font-bold text-[#c8dce6] transition hover:text-white disabled:cursor-wait disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Log out ↗"}
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="mx-auto max-w-7xl">
            <header className="border-b border-[#c8d4dc] pb-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#ef6f61]">
                System control center
              </p>
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <h1 className="font-serif text-4xl font-normal tracking-[-.04em] text-[#12263a] sm:text-5xl">
                    Admin overview
                  </h1>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#557080]">
                    Monitor the StudyZen workspace and manage platform
                    operations from one place.
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#b7d9d4] bg-[#e2f2ef] px-3 py-2 text-xs font-bold text-[#287277]">
                  <span className="h-2 w-2 rounded-full bg-[#287277]" />
                  System online
                </span>
              </div>
            </header>

            <section className="grid gap-4 py-8 sm:grid-cols-3">
              {[
                [
                  "01",
                  "User access",
                  "Authentication and account access are active.",
                ],
                [
                  "02",
                  "Notes service",
                  "AI note generation is available to students.",
                ],
                ["03", "Data layer", "Application services are connected."],
              ].map(([number, title, text]) => (
                <div
                  key={number}
                  className="border-t-2 border-[#29465a] bg-white p-5 shadow-[0_12px_30px_rgba(38,66,84,0.06)]"
                >
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[.16em] text-[#7892a1]">
                    <span>{number}</span>
                    <span className="text-[#ef6f61]">●</span>
                  </div>
                  <h2 className="mt-8 text-lg font-bold text-[#12263a]">
                    {title}
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-[#557080]">
                    {text}
                  </p>
                </div>
              ))}
            </section>

            <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
              <div className="border border-[#c8d4dc] bg-white p-6 shadow-[0_18px_45px_rgba(38,66,84,0.06)] sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ef6f61]">
                  Operations
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#12263a]">
                  Platform services
                </h2>
                <div className="mt-7 divide-y divide-[#e1e8ec]">
                  {[
                    [
                      "Authentication",
                      "User sign-in and verification",
                      "Active",
                    ],
                    [
                      "AI generation",
                      "Study note processing service",
                      "Active",
                    ],
                    [
                      "File storage",
                      "Uploaded study material storage",
                      "Connected",
                    ],
                  ].map(([service, description, status]) => (
                    <div
                      key={service}
                      className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h3 className="text-sm font-bold text-[#12263a]">
                          {service}
                        </h3>
                        <p className="mt-1 text-xs text-[#7892a1]">
                          {description}
                        </p>
                      </div>
                      <span className="w-fit rounded-full bg-[#e2f2ef] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#287277]">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#c8d4dc] bg-white p-6 shadow-[0_18px_45px_rgba(38,66,84,0.06)] sm:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ef6f61]">
                      Directory
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-[#12263a]">
                      All users
                    </h2>
                  </div>
                  <span className="text-2xl font-bold text-[#29465a]">
                    {users.length}
                  </span>
                </div>

                {isLoadingUsers ? (
                  <p className="mt-7 text-sm text-[#7892a1]">
                    Loading users...
                  </p>
                ) : users.length === 0 ? (
                  <p className="mt-7 text-sm text-[#7892a1]">No users found.</p>
                ) : (
                  <div className="mt-7 divide-y divide-[#e1e8ec]">
                    {users.map((listedUser) => (
                      <div
                        key={listedUser.id}
                        className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedUser(listedUser)}
                          className="min-w-0 text-left"
                        >
                          <p className="truncate text-sm font-bold text-[#12263a] hover:text-[#ef6f61]">
                            {listedUser.fullname}
                          </p>
                          <p className="truncate text-xs text-[#7892a1]">
                            {listedUser.email}
                          </p>
                        </button>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="shrink-0 rounded-full bg-[#e2f2ef] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#287277]">
                            {listedUser.isBlocked ? "Blocked" : listedUser.role}
                          </span>
                          {listedUser.id !== user?.id && (
                            <>
                              <button
                                type="button"
                                disabled={actionId === listedUser.id}
                                onClick={() => handleBlock(listedUser)}
                                className="border border-[#29465a] px-3 py-2 text-xs font-bold text-[#29465a] transition hover:bg-[#edf2f5] disabled:cursor-wait disabled:opacity-50"
                              >
                                {listedUser.isBlocked ? "Unblock" : "Block"}
                              </button>
                              <button
                                type="button"
                                disabled={actionId === listedUser.id}
                                onClick={() => handleDelete(listedUser)}
                                className="border border-[#ef6f61] px-3 py-2 text-xs font-bold text-[#c65045] transition hover:bg-[#fff0ed] disabled:cursor-wait disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        dark
      />
    </>
  );
};

export default AdminDashboard;
