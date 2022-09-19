import {
  createStyles,
  Card,
  Group,
  Text,
  Avatar,
  Grid,
  TextInput,
  Button,
} from '@mantine/core'
import { IconArrowRight, IconClock } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: 'transparent',
    padding: '0px',
  },

  item1: {
    backgroundColor: theme.colors.grey[1],
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '10px',

    // '& + &': {
    //   marginTop: theme.spacing.sm,
    // },
  },
  item2: {
    backgroundColor: theme.colors.grey[1],
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  mainItem: {
    display: 'flex',
    gap: '30px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      display: 'flex',
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
      key={item.title}
      className={classes.mainItem}
      position="apart"
      spacing="xl"
      grow
    >
      <Group position="apart" className={classes.item1} noWrap spacing="xl">
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
      <Group position="apart" className={classes.item2} noWrap spacing="xl">
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
    </Group>
  ))

  return (
    <Card className={classes.card}>
      <Group
        position="apart"
        noWrap
        spacing="xl"
        align={'center'}
        style={{ marginBottom: '20px' }}
      >
        <Text size="lg" weight={500}>
          {title}
        </Text>
        <TextInput type={'month'} style={{ inputSecurity: 'inherit' }} />
      </Group>
      {items}
      <Group
        // grow
        position="apart"
        noWrap
        spacing="xl"
        align={'center'}
        mt="lg"
        // style={{ marginBottom: '20px' }}
      >
        <Group
          // grow
          position="apart"
          noWrap
          spacing="xl"
          align={'center'}
        >
          <Text size={'sm'} weight="lighter" align="center" color="grey">
            Click to view all
          </Text>
          <IconArrowRight color="grey" />
        </Group>
        <Button variant="light" color="blue">
          View All
        </Button>
      </Group>
    </Card>
  )
}
