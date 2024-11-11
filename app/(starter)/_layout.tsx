import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot, Stack } from 'expo-router'

export default function RootLayout() {
  
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
  )
}