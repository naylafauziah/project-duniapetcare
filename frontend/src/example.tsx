import { useQueryClient } from "@tanstack/react-query";

export default function Example() {
  const queryClient = useQueryClient();
  const user: any | undefined = queryClient.getQueryData(["user"]);
  console.log(user.data);
  return (
    <>
      <p></p>
    </>
  );
}
