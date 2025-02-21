import { FileNode } from "../../data.type";

interface FileExploralProps {
  data: FileNode[];
}

const FileExploral = ({ data }: FileExploralProps) => {
  return (
    <div className="bg-black text-white h-full  w-[20%] p-2">
      {data.map((item) => {
        return (
          <div className="px-4" key={item.id}>
            <div className="flex gap-1 items-center p-2">
              <span>{item.isFolder ? "📁" : "📂"}</span>
              <span>{item.name}</span>
            </div>
            {item.children && <FileExploral data={item.children} />}
          </div>
        );
      })}
    </div>
  );
};
export default FileExploral;
