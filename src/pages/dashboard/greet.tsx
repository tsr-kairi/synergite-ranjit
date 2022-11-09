import { Text } from '@mantine/core'
import { IconHaze, IconSunset, IconSunset2 } from '@tabler/icons'

export const Greeting = () => {
  const myDate = new Date()
  const hours = myDate.getHours()
  let greet

  if (hours < 12)
    greet = (
      <span style={{ display: 'flex', gap: '5px' }}>
        Morning <IconHaze color="#E9A338" />
      </span>
    )
  else if (hours >= 12 && hours <= 17)
    greet = (
      <span
        style={{ display: 'flex', gap: '5px', justifyContent: 'space-between' }}
      >
        Afternoon
        <IconSunset2 color="#E9A338" />
      </span>
    )
  else if (hours >= 17 && hours <= 24)
    greet = (
      <span style={{ display: 'flex', gap: '5px' }}>
        Evening
        <IconSunset color="#E9A338" />
      </span>
    )

  return (
    <Text
      style={{
        display: 'flex',
        alignContent: 'center',
        fontFamily: '-moz-initial',
        gap: '5px',
        fontWeight: '400',
      }}
      size={'xl'}
    >
      Good {greet}
    </Text>
  )
}
