import { useNavigate } from "react-router-dom";

const QuizAttemptDetails = ({ attempt }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => navigate(`/quiz-attempts/${attempt.id}/questions`)}
        className="text-xs font-bold text-[#c9554d] transition hover:text-[#a65a25]"
      >
        View questions
      </button>
    </div>
  );
};

export default QuizAttemptDetails;
