import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Creating MUI theme
let theme = createTheme({
	palette: {
		primary: {
			main: '#F7F0FF',
			dark: '#A673EA'
		},
	},
	typography: {
		h1: {
			fontSize: '2rem',
			fontWeight: 700
		},
		h2: {
			fontSize: '1.5rem',
		},
	},
})
theme = responsiveFontSizes(theme)

root.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);