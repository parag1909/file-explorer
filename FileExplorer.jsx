import React, { useState } from "react";
import { Folder, File } from "lucide-react";
import TreeNode from "./TreeNode";

function FileExplorer({ initialData }) {
  const [data, setData] = useState(initialData);
  const [activeFolder, setActiveFolder] = useState(null);

  const handleAdd = (isFolder) => {
    const newName = prompt(`Enter name for new ${isFolder ? "folder" : "file"}:`);
    if (!newName) return;

    const updateTree = (node, currentPath) => {
      if (currentPath === activeFolder) {
        return {
          ...node,
          children: [
            ...(node.children || []),
            isFolder
              ? { name: newName, type: "folder", children: [] }
              : { name: newName, type: "file" },
          ],
        };
      }

      if (node?.type === "folder" && node.children) {
        return {
          ...node,
          children: node.children.map((child, index) =>
            updateTree(child, `${currentPath}/${child.name}`)
          ),
        };
      }

      return node;
    };

    if (!activeFolder) {
      // Add to the root or create a root folder/file if data is empty
      setData({
        ...data,
        [newName]: isFolder
          ? { type: "folder", children: [] }
          : { type: "file" },
      });
    } else {
      // Update nested folder
      const newData = Object.fromEntries(
        Object.entries(data).map(([key, node]) => [
          key,
          updateTree(node, key),
        ])
      );
      setData(newData);
    }
  };

  const handleRename = (oldName, newName) => {
    if (!newName) return;

    const renameTree = (node) => {
      if (node.name === oldName) {
        return { ...node, name: newName };
      }

      if (node?.type === "folder" && node.children) {
        return {
          ...node,
          children: node.children.map(renameTree),
        };
      }

      return node;
    };

    const newData = Object.fromEntries(
      Object.entries(data).map(([key, node]) => [key === oldName ? newName : key, renameTree(node)])
    );
    setData(newData);
  };

  const handleDelete = (name) => {
    const deleteTree = (node) => {
      if (node?.type === "folder" && node.children) {
        return {
          ...node,
          children: node.children.filter((child) => child.name !== name),
        };
      }

      return node;
    };

    const newData = Object.fromEntries(
      Object.entries(data)
        .filter(([key]) => key !== name)
        .map(([key, node]) => [key, deleteTree(node)])
    );
  
    // Reset activeFolder if it was deleted or if there are no folders left
    if (!newData[activeFolder] || Object.keys(newData).length === 0) {
      setActiveFolder(null);
    }
  
    setData(newData);
  };

  return (
    <div className="w-25 bg-light border-end h-100 overflow-auto">
      <div className="p-3 border-bottom">
        <div className="d-flex justify-content-between mb-2">
          <h2 className="h6 font-weight-bold">EXPLORER</h2>
          <div className="d-flex gap-2">
            <button
              onClick={() => handleAdd(true)}
              className="btn btn-light p-1 rounded"
              title="New Folder"
            >
              <Folder className="w-4 h-4 text-warning" />
            </button>
            <button
              onClick={() => handleAdd(false)}
              className="btn btn-light p-1 rounded"
              title="New File"
            >
              <File className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-2">
        {Object.entries(data).map(([name, node]) => (
          <TreeNode
            key={name}
            name={name}
            node={node}
            onAdd={handleAdd}
            onRename={handleRename}
            onDelete={handleDelete}
            level={0}
            setActiveFolder={setActiveFolder}
            isActive={activeFolder} // Pass activeFolder directly
            path={name} // Pass the correct path here
          />
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;
