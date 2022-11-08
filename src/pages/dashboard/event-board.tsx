import {
  createStyles,
  Card,
  Group,
  Text,
  Avatar,
  Button,
  ActionIcon,
} from '@mantine/core'
import { IconCalendarEvent, IconClock } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: 'transparent',
    padding: '0px',
    placeItems: 'center',
  },

  item: {
    backgroundColor: theme.colors.grey[1],
    padding: '10px',
    borderRadius: '10px',

    '& + &': {
      //   paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
  },
  user: {
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'flex-start',
    marginLeft: '7px',
  },

  title: {
    lineHeight: 1,
    color: theme.colors.blue[7],
  },
}))

interface EventBoardProps {
  title: string
  data: {
    id: number
    title: string
    description: string
    image: string
  }[]
}

export function EventBoard({ title, data }: EventBoardProps) {
  const currentDay = new Date().toLocaleDateString('en-US')

  const { classes } = useStyles()

  const items = data.map((item) => (
    <Group
      position="apart"
      className={classes.item}
      noWrap
      spacing="xl"
      key={item?.id}
    >
      <div style={{ display: 'flex', placeItems: 'center' }}>
        <Avatar src={item.image} size={`md`} radius={`xl`} />
        <div className={classes.user}>
          <Text className={classes.title}>{item.title}</Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          placeItems: 'flex-end',
        }}
      >
        <IconClock size={18} stroke={2} className={classes.title} />
        <Text size="xs" color="dimmed">
          {currentDay}
        </Text>
      </div>
    </Group>
  ))

  return (
    <Card className={classes.card}>
      <Group position="apart" align={'center'} mb="md">
        <Text
          weight={'lighter'}
          style={{
            fontFamily: '-moz-initial',
            fontSize: '20px',
            color: '#E39133',
          }}
        >
          {title}
        </Text>
        <ActionIcon variant="light" radius="xl" color={'#E39133'}>
          <IconCalendarEvent size={28} color={'#E39133'} />
        </ActionIcon>
      </Group>
      {items}
      <Button variant="light" color="blue" mt={'lg'} fullWidth>
        View All
      </Button>
    </Card>
  )
}
