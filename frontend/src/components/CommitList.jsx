// // src/pages/Commits/CommitList.jsx
// const CommitList = ({ commits, onSelectCommit }) => {
//     return (
//       <div className="space-y-4">
//         {commits.map((commit) => (
//           <div
//             key={commit.sha}
//             onClick={() => onSelectCommit(commit)}
//             className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//           >
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold">{commit.commit.message}</h2>
//               <span className="text-sm text-gray-500">{new Date(commit.commit.author.date).toLocaleString()}</span>
//             </div>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//               Author: {commit.commit.author.name}
//             </p>
//             <p className="text-xs text-blue-600 mt-1 break-all">{commit.sha}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default CommitList;
  




import { CheckCircle } from "lucide-react";

const CommitList = ({ commits, analyzedHashes, onSelectCommit }) => {
  return (
    <div className="space-y-4">
      {commits.map((commit) => {
        const isAnalyzed = analyzedHashes.has(commit.sha);

        return (
          <div
            key={commit.sha}
            onClick={() => onSelectCommit(commit)}
            className={`border p-4 rounded-lg cursor-pointer transition 
              ${isAnalyzed 
                ? 'border-green-500 hover:bg-green-50 dark:hover:bg-green-900' 
                : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isAnalyzed && (
                  <CheckCircle 
                    className="text-green-500 w-5 h-5" 
                    aria-label="Commit analyzed"
                    title="Analyzed"
                  />
                )}
                <h2 className="text-lg font-semibold">{commit.commit.message}</h2>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(commit.commit.author.date).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Author: {commit.commit.author.name}
            </p>
            <p className="text-xs text-blue-600 mt-1 break-all">{commit.sha}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommitList;
