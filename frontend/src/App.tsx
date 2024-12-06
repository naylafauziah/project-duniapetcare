import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { Button } from "./components/ui/button";
import Example from "./example";

function App() {
  const queryClient = useQueryClient();

  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => await axios.get("https://randomuser.me/api/"),
  });

  // console.log(user);

  return (
    <>
      <Button onClick={()=>queryClient.refetchQueries({})}>refetch</Button>
      <Example />
      <div className="flex h-screen items-center justify-center">
        <ReactQueryDevtools />
      </div>
    </>
  );
}



export default App;
