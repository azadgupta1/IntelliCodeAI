// src/pages/Commits/CommitDetailModal.jsx
const CommitDetailModal = ({ commit, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-[90%] max-w-3xl relative">
          <button
            className="absolute top-2 right-4 text-xl text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-4">Commit Details</h2>
          <p><strong>Message:</strong> {commit.commit.message}</p>
          <p><strong>Author:</strong> {commit.commit.author.name} ({commit.commit.author.email})</p>
          <p><strong>Date:</strong> {new Date(commit.commit.author.date).toLocaleString()}</p>
          <p className="mt-2 text-sm text-blue-500 break-all">
            <strong>SHA:</strong> {commit.sha}
          </p>
          <a
            href={commit.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 underline"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    );
  };
  
  export default CommitDetailModal;
  