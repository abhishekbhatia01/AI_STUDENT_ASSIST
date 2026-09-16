import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout as clearAuth } from "../store/authSlice/authSlice";
import { logout } from "../api/auth/authApi";
import { deleteUser, getAllUsers, setUserBlocked } from "../api/admin/adminApi";
import { getPendingUnblockRequests } from "../api/unblockRequestApi";

const AdminUsers = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [requests, setRequests] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.users || []);
      const requestResponse = await getPendingUnblockRequests();
      setRequests(requestResponse.requests || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialUsers = async () => {
      await loadUsers();
    };

    loadInitialUsers();
  }, []);

  const handleLogout = async () => {
    await logout().catch(() => undefined);
    dispatch(clearAuth());
    navigate("/login", { replace: true });
  };

  const handleBlock = async (listedUser) => {
    setActionId(listedUser.id);
    try {
      await setUserBlocked(listedUser.id, !listedUser.isBlocked);
      toast.success(listedUser.isBlocked ? "User unblocked." : "User blocked.");
      await loadUsers();
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

  return (
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
            <Link
              to="/dashboard"
              className="block rounded px-3 py-3 text-sm font-bold text-[#c8dce6] transition hover:bg-[#1d4964] hover:text-white"
            >
              <span className="mr-3 text-[#ffd0a6]">▦</span>
              Overview
            </Link>
            <div className="mt-2 rounded bg-[#1d4964] px-3 py-3 text-sm font-bold">
              <span className="mr-3 text-[#ffd0a6]">◎</span>
              Users
            </div>
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
              className="text-xs font-bold text-[#c8dce6] transition hover:text-white"
            >
              Log out ↗
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <header className="border-b border-[#c8d4dc] pb-8">
            <Link to="/dashboard" className="text-xs font-bold text-[#ef6f61]">
              ← Back to overview
            </Link>
            <p className="mb-3 mt-8 text-[10px] font-bold uppercase tracking-[.22em] text-[#ef6f61]">
              Administration
            </p>
            <h1 className="font-serif text-4xl font-normal tracking-[-.04em] text-[#12263a] sm:text-5xl">
              User directory
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#557080]">
              Review account access and manage the StudyZen community.
            </p>
          </header>

          <section className="mt-8 overflow-hidden border border-[#c8d4dc] bg-white shadow-[0_18px_45px_rgba(38,66,84,0.06)]">
            {isLoading ? (
              <p className="p-8 text-sm text-[#7892a1]">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="p-8 text-sm text-[#7892a1]">No users found.</p>
            ) : (
              <div className="divide-y divide-[#e1e8ec]">
                {users.map((listedUser) => (
                  <div
                    key={listedUser.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#12263a]">
                        {listedUser.fullname}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#7892a1]">
                        {listedUser.email}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#e2f2ef] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#287277]">
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
          </section>

          {requests.length > 0 && (
            <section className="mt-8 border border-[#f0c9a7] bg-[#fffaf4] p-5 shadow-[0_18px_45px_rgba(38,66,84,0.04)] sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#f0dfd0] pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#c66c35]">
                    Needs review
                  </p>
                  <h2 className="mt-1 font-serif text-2xl text-[#12263a]">
                    Unblock requests
                  </h2>
                </div>
                <span className="text-xs font-bold text-[#c66c35]">
                  {requests.length} pending
                </span>
              </div>
              <div className="divide-y divide-[#f0dfd0]">
                {requests.map((request) => (
                  <article
                    key={request.id}
                    className="py-5 first:pt-4 last:pb-0"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-[#12263a]">
                          {request.email}
                        </p>
                        <p className="mt-1 text-xs text-[#7892a1]">
                          Submitted{" "}
                          {new Date(request.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className="h-fit bg-[#f7e4d2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#a75d2d]">
                        Pending
                      </span>
                    </div>
                    <p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-[#557080]">
                      {request.message}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminUsers;
