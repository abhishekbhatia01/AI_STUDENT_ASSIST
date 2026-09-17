const UserDetailsModal = ({ user, onClose, dark = false }) => {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#12263a]/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-details-title"
        className={`w-full max-w-md border p-6 shadow-2xl sm:p-8 ${dark ? "border-[#29465a] bg-[#12263a] text-white" : "border-[#d7dcd3] bg-[#fffef8] text-[#1b2925]"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-current/15 pb-5">
          <div>
            <p
              className={`text-[10px] font-bold uppercase tracking-[.18em] ${dark ? "text-[#ffd0a6]" : "text-[#e9914d]"}`}
            >
              Account profile
            </p>
            <h2
              id="user-details-title"
              className="mt-2 font-serif text-3xl font-normal"
            >
              {user.fullname || "StudyZen user"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className={`text-xl leading-none ${dark ? "text-[#c8dce6] hover:text-white" : "text-[#87908a] hover:text-[#1b2925]"}`}
          >
            ×
          </button>
        </div>

        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt
              className={`text-[10px] font-bold uppercase tracking-[.16em] ${dark ? "text-[#9db8c6]" : "text-[#87908a]"}`}
            >
              Email
            </dt>
            <dd className="mt-1 wrap-break-word">
              {user.email || "Not available"}
            </dd>
          </div>
          <div>
            <dt
              className={`text-[10px] font-bold uppercase tracking-[.16em] ${dark ? "text-[#9db8c6]" : "text-[#87908a]"}`}
            >
              Role
            </dt>
            <dd className="mt-1 capitalize">{user.role || "User"}</dd>
          </div>
          <div>
            <dt
              className={`text-[10px] font-bold uppercase tracking-[.16em] ${dark ? "text-[#9db8c6]" : "text-[#87908a]"}`}
            >
              Account status
            </dt>
            <dd className="mt-1">{user.isBlocked ? "Blocked" : "Active"}</dd>
          </div>
          {user.createdAt && (
            <div>
              <dt
                className={`text-[10px] font-bold uppercase tracking-[.16em] ${dark ? "text-[#9db8c6]" : "text-[#87908a]"}`}
              >
                Joined
              </dt>
              <dd className="mt-1">
                {new Date(user.createdAt).toLocaleDateString()}
              </dd>
            </div>
          )}
        </dl>

        <button
          type="button"
          onClick={onClose}
          className={`mt-8 w-full px-4 py-3 text-xs font-bold ${dark ? "bg-white text-[#12263a] hover:bg-[#e2f2ef]" : "bg-[#1b2925] text-white hover:bg-[#2c403a]"}`}
        >
          Close
        </button>
      </section>
    </div>
  );
};

export default UserDetailsModal;
