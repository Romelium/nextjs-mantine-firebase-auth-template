import { auth } from "@/lib/firebase";
import refineFirebaseAuthErrorMessage from "@/lib/refineFirebaseAuthErrorMessage";
import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function SignUpIn() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : "Passwords should have at least eight characters, including at least one letter and one number.",
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit(({ email, password }) => {
          setPersistence(auth, browserSessionPersistence).then(() =>
            createUserWithEmailAndPassword(auth, email, password).catch(
              (error) => {
                switch (error.code) {
                  case "auth/email-already-in-use":
                    signInWithEmailAndPassword(auth, email, password).catch(
                      (error) =>
                        alert(refineFirebaseAuthErrorMessage(error.message))
                    );
                    break;
                  default:
                    alert(refineFirebaseAuthErrorMessage(error.message));
                    break;
                }
              }
            )
          );
        })}
      >
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
