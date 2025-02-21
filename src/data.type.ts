 export type FileNode = {
    id: number;
    name: string;
    isFolder: boolean;
    children?: FileNode[]; 
};
