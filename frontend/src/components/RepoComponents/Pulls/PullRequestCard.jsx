import moment from "moment";
import { CalendarDays } from "lucide-react";

const PullRequestCard = ({ pr }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <a
          href={pr.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold text-lg hover:underline"
        >
          {pr.title} <span className="text-sm text-gray-500">#{pr.number}</span>
        </a>
        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
          OPEN
        </span>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <img
          src={pr.user.avatar_url}
          alt={pr.user.login}
          className="w-6 h-6 rounded-full"
        />
        <span>{pr.user.login}</span>
        <span className="flex items-center gap-1">
          <CalendarDays size={14} />
          {moment(pr.created_at).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default PullRequestCard;
