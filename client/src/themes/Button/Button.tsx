export const Button = {
  baseStyle: {
    fontWeight: 'medium',
    borderRadius: 'base',
  },
  sizes: {},
  variants: {
    solid: {
      bg: 'brand.500',
      color: 'black.800',
      _hover: { bg: 'brand.600' },
    },
    outline: {
      bg: 'black.800',
      border: '2px solid',
      borderColor: 'brand.500',
      color: 'brand.500',
      _hover: { color: 'brand.600', borderColor: 'brand.600', bg: 'black.800' },
    },
    disable: {
      color: 'black.800',
      bg: 'black.600',
      _hover: { color: 'black.900', bg: 'black.700' },
    },
    link: {
      color: 'white',
    },
  },
  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
}
