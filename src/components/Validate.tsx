import { Box, Button } from "@mantine/core";
import { User, sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";

export default function Validate({
  user,
  onfulfilled,
}: {
  user: User;
  onfulfilled?: ((value: void) => void | PromiseLike<void>) | null | undefined;
}) {
  useEffect(() => {
    sendEmailVerification(user).then(onfulfilled);
  }, []);
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      The verification email has been sent to your email.
      <br />
      <Button onClick={() => sendEmailVerification(user).then(onfulfilled)}>
        Resend email
      </Button>
    </Box>
  );
}
