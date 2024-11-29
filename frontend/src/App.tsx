import { Input } from "./components/ui/input";

function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-[90vh] w-[90vw] shadow-xl ">
        <div className="bg-primary h-full w-1/2"></div>
        <div className="h-full w-auto">
          <Input type="datetime-local"></Input>
        </div>
      </div>
    </div>
  );
}

export default App;
