import { Box, BoxProps } from '@mui/material'

export default function VerticalBox({ children, ...props }: BoxProps) {
  return (
    <Box
      {...{ display: 'flex', flexDirection: 'column', gap: '0.5rem', ...props }}
    >
      {children}
    </Box>
  )
}
