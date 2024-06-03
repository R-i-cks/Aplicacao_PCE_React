import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="add_measure" />
      <Stack.Screen name="history" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
