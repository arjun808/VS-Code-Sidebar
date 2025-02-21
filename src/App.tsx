import { useState } from "react";
import FileExploral from "./components/FileExploral";
import initialData from "./data.json";
import { FileNode } from "./data.type";

const App = () => {
  const [data, setData] = useState<FileNode[]>(initialData);

  const addItem = (parentId: number, name: string, isFolder: boolean) => {
    const newItem = {
      id: Date.now(),
      name,
      isFolder,
      children: isFolder ? [] : undefined,
    };

    const addRecursively = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.id === parentId && node.isFolder) {
          return { ...node, children: [...(node.children || []), newItem] };
        } else if (node.children) {
          return { ...node, children: addRecursively(node.children) };
        }
        return node;
      });
    };

    setData(addRecursively(data) as FileNode[]);
  };

  const deleteItem = (id: number) => {
    const deleteRecursively = (nodes: FileNode[]): FileNode[] => {
      return nodes.filter((node) => {
        if (node.id === id) return false;
        if (node.children) {
          node.children = deleteRecursively(node.children);
        }
        return true;
      });
    };

    setData(deleteRecursively(data) as FileNode[]);
  };

  return (
    <div className="h-screen flex w-screen bg-gray-800 text-white">
      <FileExploral data={data} addItem={addItem} deleteItem={deleteItem} />
      <div className="text-6xl ml-auto mr-auto mt-5 text-black">
        FILE EXPLORAL
      </div>
    </div>
  );
};

export default App;
