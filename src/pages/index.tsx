import SignUpIn from "@/components/SignUpIn";
import Validate from "@/components/Validate";
import { auth } from "@/lib/firebase";
import useAuthStateChanged from "@/lib/useAuthStateChanged";
import {
  AppShell,
  Aside,
  Burger,
  Button,
  Flex,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function Home() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  useAuthStateChanged((changeduser) => setUser(changeduser));

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Flex
            justify={"space-between"}
            align="center"
            style={{ height: "100%" }}
          >
            <Flex align="center" style={{ height: "100%" }}>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Application header</Text>
            </Flex>
            {user ? (
              <Button color="red" onClick={() => signOut(auth)} compact>
                Sign Out
              </Button>
            ) : undefined}
          </Flex>
        </Header>
      }
    >
      {user ? (
        user.emailVerified ? (
          "You are logged in."
        ) : (
          <Validate user={user} />
        )
      ) : (
        <SignUpIn />
      )}
    </AppShell>
  );
}
