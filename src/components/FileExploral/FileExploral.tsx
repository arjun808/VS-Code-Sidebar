import { useState } from "react";
import { FileNode } from "../../data.type";
import OpenIcon from "../../assets/Icons/open";
import CloseIcon from "../../assets/Icons/close";

interface FileExploralProps {
  data: FileNode[];
  addItem: (parentId: number, name: string, isFolder: boolean) => void;
  deleteItem: (id: number) => void;
}

const FileExploral = ({ data, addItem, deleteItem }: FileExploralProps) => {
  const [isFolderOpen, setIsFolderOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleFolder = (id: number) => {
    setIsFolderOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-black text-white h-full w-auto p-2">
      {data.map((item) => {
        const isOpen = isFolderOpen[item.id] || false;

        return (
          <div className="px-4" key={item.id}>
            <div className="flex gap-2 items-center p-2">
              {item.isFolder && (
                <button onClick={() => toggleFolder(item.id)}>
                  {isOpen ? <OpenIcon /> : <CloseIcon />}
                </button>
              )}

              <span>{item.isFolder ? "📁" : "📂"}</span>
              <span>{item.name}</span>

              {item.isFolder && (
                <>
                  {" "}
                  <button
                    className="ml-auto bg-green-500 px-2 py-1 text-xs rounded"
                    onClick={() => {
                      const name = prompt("Enter name:");
                      if (name) {
                        const isFolder = confirm("Is it a folder?");
                        addItem(item.id, name, isFolder);
                      }
                    }}
                  >
                    ➕
                  </button>
                  <button
                    className="bg-red-500 px-2 py-1 text-xs rounded"
                    onClick={() => deleteItem(item.id)}
                  >
                    ❌
                  </button>
                </>
              )}
            </div>

            {item.children && isOpen && (
              <div className="ml-4">
                <FileExploral
                  data={item.children}
                  addItem={addItem}
                  deleteItem={deleteItem}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FileExploral;
