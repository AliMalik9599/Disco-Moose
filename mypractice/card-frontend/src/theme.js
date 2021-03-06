import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3D5A80',
            light: '#6b87b0',
            dark: '#093153',
        },
        secondary: {
            main: '#EE6C4D',
            light: '#ff9d7a',
            dark: '#b63c23',
        },
        disabled: {
            main: "#F2F4F7",
            light: '#ffffff',
            dark: '#bfc1c4',
        },
        info: {
            main: '#98c1d9',
            light: '#caf4ff',
            disabled: '#6891a7',
        },
        disco: {
            main: '#E0FBFC',
            light: '#ffffff',
            dark: '#aec8c9',
        },
        charm: {
            main: '#293241',
            light: '#525b6c',
            dark: '#000a1b',
        }
    },
    typography: {
        htmlFontSize: 16,
        fontFamily: "Montserrat" | "sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontFamily: "Montserrat" | "sans-serif",
            fontWeight: 300,
            fontSize: "6rem",
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
        },

        h2: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 300,
            fontSize: "3.75rem",
            lineHeight: 1.2,
            letterSpacing: "-0.00833em"
        },

        h3: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 400,
            fontSize: "3rem",
            lineHeight: 1.167,
            letterSpacing: "0em",
        },
        h4: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 400,
            fontSize: "2.125rem",
            lineHeight: 1.235,
            letterSpacing: "0.00735em",
        },
        h5: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 400,
            fontSize: "1.5rem",
            lineHeight: 1.334,
            letterSpacing: "0em",
        },
        h6: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 500,
            fontSize: "1.25rem",
            lineHeight: 1.6,
            letterSpacing: "0.0075em"
        },
        subtitle1: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.75,
            letterSpacing: "0.00938em"
        },
        subtitle2: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: 1.57,
            letterSpacing: "0.00714em",
        },
        body1: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.5,
            letterSpacing: "0.00938em",
        },
        body2: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 400,
            fontSize: "0.875rem",
            lineHeight: 1.43,
            letterSpacing: "0.01071em"
        },
        button: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: 1.75,
            letterSpacing: "0.02857em",
            textTransform: "uppercase",
        },
        caption: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.66,
            letterSpacing: "0.03333em",
        },
        overline: {
            fontFamily: "Roboto" | "Helvetica" | "Arial" | "sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 2.66,
            letterSpacing: "0.08333em",
            textTransform: "uppercase"
        },
    },
});

export default theme;