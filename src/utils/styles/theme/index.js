import { createMuiTheme } from '@material-ui/core'

import SBSansTextRegular from '../fonts/SBSansText-Regular.ttf'
import SBSansTextSemibold from '../fonts/SBSansText-Semibold.ttf'
import SBSansTextMedium from '../fonts/SBSansText-Medium.ttf'
import SBSansDisplayLight from '../fonts/SBSansDisplay-Light.ttf'
import SBSansDisplayRegular from '../fonts/SBSansDisplay-Regular.ttf'
import SBSansDisplaySemibold from '../fonts/SBSansDisplay-SemiBold.ttf'
import { PALETTE, SHADOWS } from '../constants'

import { buttonTheme } from './button'
import { typographyTheme, customFontFamilyTypes } from './typography'
import { paperTheme } from './paper'
import { outlinedInputTheme } from './outlined-input'

const sbSansTextRegular = {
    fontFamily: customFontFamilyTypes.SBSansTextRegular,
    src: `
        url(${SBSansTextRegular}) format('truetype')
        `,
    fontWeight: 'normal',
    fontStyle: 'normal'
}

const sbSansTextSemibold = {
    fontFamily: customFontFamilyTypes.SBSansTextSemibold,
    src: `
        url(${SBSansTextSemibold}) format('truetype')
        `,
    fontWeight: 'normal',
    fontStyle: 'normal'
}

const sbSansTextMedium = {
    fontFamily: customFontFamilyTypes.SBSansTextMedium,
    src: `
        url(${SBSansTextMedium}) format('truetype')
        `,
    fontWeight: 'normal',
    fontStyle: 'normal'
}

const sbSansDisplayLight = {
    fontFamily: customFontFamilyTypes.SBSansDisplayLight,
    src: `
        url(${SBSansDisplayLight}) format('truetype')
        `,
    fontWeight: 'normal',
    fontStyle: 'normal'
}

const sbSansDisplayRegular = {
    fontFamily: customFontFamilyTypes.SBSansDisplayRegular,
    src: `
        url(${SBSansDisplayRegular}) format('truetype')
        `,
    fontWeight: 'normal',
    fontStyle: 'normal'
}

const sbSansDisplaySemibold = {
    fontFamily: customFontFamilyTypes.SBSansDisplaySemibold,
    src: `
        url(${SBSansDisplaySemibold}) format('truetype')
        `,
    fontWeight: 'normal',
    fontStyle: 'normal'
}

const defaultTheme = createMuiTheme()

// eslint-disable-next-line import/no-mutable-exports
const theme = createMuiTheme({
    typography: {
        ...typographyTheme,
        customFontFamilyTypes
    },
    shape: {
        borderRadius: 52
    },
    palette: {
        background: {
            default: PALETTE.WHITE.main
        },
        text: {
            primary: PALETTE.BLACK.main,
            secondary: PALETTE.GRAY.main
        },
        ...PALETTE
    },
    shadows: [
        ...defaultTheme.shadows,
        SHADOWS.ROUNDED_PAPER
    ],
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [
                    sbSansTextRegular,
                    sbSansTextSemibold,
                    sbSansTextMedium,
                    sbSansDisplayLight,
                    sbSansDisplayRegular,
                    sbSansDisplaySemibold
                ],
                html: {
                    height: 'auto'
                },
                body: {
                    minHeight: '100%',
                    'overflow-x': 'hidden',
                    'overflow-y': 'overlay'
                }
            }
        },
        MuiButton: {
            ...buttonTheme
        },
        MuiPaper: {
            ...paperTheme
        },
        MuiOutlinedInput: {
            ...outlinedInputTheme
        }
    },
    customShadows: {
        button: {
            contained: SHADOWS.CONTAINED_BUTTON_SHADOW
        },
        styledButton: {
            contained: SHADOWS.CONTAINED_STYLED_BUTTON_SHADOW
        },
        main: {
            default: SHADOWS.DEFAULT_BLOCK_SHADOW
        },
        paper: {
            rounded: SHADOWS.ROUNDED_PAPER
        }
    }
})

export default theme
