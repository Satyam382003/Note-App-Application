// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  // colors:{
  //     primary: "#2BB5FF",
  //     secondary: "#EF863E"
  // },
  plugins: [
    tailwindcss(),
  ],
})