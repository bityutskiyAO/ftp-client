// eslint-disable-next-line import/named
import { PALETTE, SHADOWS } from '../constants'

export const buttonTheme = {
    root: {
        padding: '12px 40px'
    },
    contained: {
        color: PALETTE.BLACK.dark,
        backgroundColor: PALETTE.WHITE.main,
        boxShadow: SHADOWS.CONTAINED_BUTTON_SHADOW,
        '&:hover': {
            backgroundColor: PALETTE.WHITE.main,
            boxShadow: SHADOWS.CONTAINED_BUTTON_SHADOW,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: PALETTE.WHITE.main,
                boxShadow: SHADOWS.CONTAINED_BUTTON_SHADOW
            }
        },
        '&$focusVisible': {
            boxShadow: SHADOWS.CONTAINED_BUTTON_SHADOW
        },
        '&:active': {
            boxShadow: SHADOWS.CONTAINED_BUTTON_SHADOW
        }
    },
    startIcon: {
        marginRight: 20
    }
}
