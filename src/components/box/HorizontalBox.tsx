import { Box, BoxProps } from '@mui/material'

export default function HorizontalBox({ children, ...props }: BoxProps) {
  return (
    <Box
      {...{ display: 'flex', flexDirection: 'row', gap: '0.5rem', ...props }}
    >
      {children}
    </Box>
  )
}
