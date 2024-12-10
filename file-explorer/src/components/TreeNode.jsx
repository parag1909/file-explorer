// import React, { useState } from "react";
// import { ChevronRight, ChevronDown, Folder, File, Trash, Edit2 } from "lucide-react";

// function TreeNode({ name, node, onAdd, onRename, onDelete, level, setActiveFolder, isActive, path }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editName, setEditName] = useState(name);

//   const toggleExpand = () => {
//     if (node?.type === "folder") {
//       setIsExpanded(!isExpanded);
//     }
//   };

//   const handleRenameSubmit = () => {
//     if (editName && editName !== name) {
//       onRename(name, editName);
//     }
//     setIsEditing(false);
//   };

//   const handleFolderClick = () => {
//     if (node.type === "folder") {
//       setActiveFolder(path);
//     }
//   };

//   const renderChildren = () => {
//     if (node?.type !== "folder" || !isExpanded) return null;

//     return (
//       <div className="ms-3">
//         {node?.children &&
//           node.children.map((child, index) => (
//             <TreeNode
//               key={index}
//               name={child.name}
//               node={child}
//               onAdd={onAdd}
//               onRename={onRename}
//               onDelete={onDelete}
//               level={level + 1}
//               setActiveFolder={setActiveFolder}
//               isActive={isActive}
//               path={`${path}/${child.name}`}
//             />
//           ))}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div
//         className={`d-flex align-items-center py-1 text-muted cursor-pointer ${isActive === path ? "bg-info text-white" : ""}`}
//         style={{ paddingLeft: `${level * 16}px` }}
//         onClick={handleFolderClick}
//       >
//         {node?.type === "folder" && (
//           <button onClick={toggleExpand} className="btn btn-light btn-sm me-2">
//             {isExpanded ? (
//               <ChevronDown className="w-4 h-4 text-dark" />
//             ) : (
//               <ChevronRight className="w-4 h-4 text-dark" />
//             )}
//           </button>
//         )}

//         <div className="d-flex align-items-center flex-grow-1">
//           {node?.type === "folder" ? (
//             <Folder className="w-4 h-4 me-2 text-warning" />
//           ) : (
//             <File className="w-4 h-4 me-2 text-primary" />
//           )}

//           {isEditing ? (
//             <input
//               type="text"
//               value={editName}
//               onChange={(e) => setEditName(e.target.value)}
//               onBlur={handleRenameSubmit}
//               onKeyPress={(e) => e.key === "Enter" && handleRenameSubmit()}
//               className="form-control form-control-sm"
//               autoFocus
//             />
//           ) : (
//             <span>{name}</span>
//           )}
//         </div>

//         <div className="d-flex gap-2 ms-2">
//           <button
//             onClick={() => setIsEditing(true)}
//             className="btn btn-light btn-sm"
//             title="Rename"
//           >
//             <Edit2 className="w-4 h-4 text-dark" />
//           </button>
//           <button
//             onClick={() => onDelete(name)}
//             className="btn btn-light btn-sm"
//             title="Delete"
//           >
//             <Trash className="w-4 h-4 text-danger" />
//           </button>
//         </div>
//       </div>

//       {renderChildren()}
//     </div>
//   );
// }

// export default TreeNode;

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Folder, File, Trash, Edit2 } from "lucide-react";

function TreeNode({ name, node, onAdd, onRename, onDelete, level, setActiveFolder, isActive, path }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);

  const toggleExpand = () => {
    
    if (node?.type === "folder") {
      setIsExpanded(!isExpanded);
    }
  };

  const handleRenameSubmit = () => {
    if (editName && editName !== name) {
      onRename(name, editName);
    }
    setIsEditing(false);
  };

  const handleFolderClick = (e) => {
    e.stopPropagation();
    if (node.type === "folder") {
      setActiveFolder(path);
    }
  };

  // Add an effect to detect clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`[data-path="${path}"]`)) {
        setActiveFolder(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [path, setActiveFolder]);

  const renderChildren = () => {
    if (node?.type !== "folder" || !isExpanded) return null;

    return (
      <div className="ms-3">
        {node?.children &&
          node.children.map((child, index) => (
            <TreeNode
              key={index}
              name={child.name}
              node={child}
              onAdd={onAdd}
              onRename={onRename}
              onDelete={onDelete}
              level={level + 1}
              setActiveFolder={setActiveFolder}
              isActive={isActive}
              path={`${path}/${child.name}`}
            />
          ))}
      </div>
    );
  };

  return (
    <div data-path={path}>
      <div
        className={`d-flex align-items-center py-1 text-muted cursor-pointer ${
          isActive === path ? "bg-info text-white" : ""
        }`}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={handleFolderClick}
      >
        {node?.type === "folder" && (
          <button onClick={toggleExpand} className="btn btn-light btn-sm me-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-dark" />
            ) : (
              <ChevronRight className="w-4 h-4 text-dark" />
            )}
          </button>
        )}

        <div className="d-flex align-items-center flex-grow-1">
          {node?.type === "folder" ? (
            <Folder className="w-4 h-4 me-2 text-warning" />
          ) : (
            <File className="w-4 h-4 me-2 text-primary" />
          )}

          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyPress={(e) => e.key === "Enter" && handleRenameSubmit()}
              className="form-control form-control-sm"
              autoFocus
            />
          ) : (
            <span>{name}</span>
          )}
        </div>

        <div className="d-flex gap-2 ms-2">
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-light btn-sm"
            title="Rename"
          >
            <Edit2 className="w-4 h-4 text-dark" />
          </button>
          <button
            onClick={() => onDelete(name)}
            className="btn btn-light btn-sm"
            title="Delete"
          >
            <Trash className="w-4 h-4 text-danger" />
          </button>
        </div>
      </div>

      {renderChildren()}
    </div>
  );
}

export default TreeNode;
