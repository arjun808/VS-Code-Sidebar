import FileExploral from "./components/FileExploral";
import data from "./data.json";

const App = () => {
  return (
    <div className="h-screen w-screen bg-gray-800 text-white">
      {/* {data.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })} */}
      <FileExploral data={data} />
    </div>
  );
};
export default App;
