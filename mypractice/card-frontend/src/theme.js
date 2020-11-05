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
});

export default theme;