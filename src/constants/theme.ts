const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",

  lightOrange: '#FFDFD3',
  darkOrange: '#6F2C11',

  darkBlue1: '#050D15',
  darkBlue2: '#0A1A2C',

  gray: "#83829A",
  gray2: "#C1C0C8",
  gray3: '#DCDCDC',

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",

  black: '#000',
}

const FONT = {
  regular: "Urbanist-Regular",
  italic: "Urbanist-Italic",
  bold: "Urbanist-Bold",
  light: "Urbanist-Light"
}

const SIZES = {
  xSmall: 10,
  small: 12,
  semiSmall: 14,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
}

const SHADOWS = {
  smallLight: {
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  smallDark: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  mediumLight: {
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },
  mediumDark: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
}

export { COLORS, FONT, SIZES, SHADOWS }
