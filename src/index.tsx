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
			main: '#000'
		}
	},
	typography: {
		h1: {
			fontSize: '3rem',
		},
		h2: {
			fontSize: '2rem'
		},
		h3: {
			fontSize: '1rem'
		}
	}
})
theme = responsiveFontSizes(theme)

root.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);