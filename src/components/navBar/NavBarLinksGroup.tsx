import { useState } from 'react'
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
} from '@mantine/core'
import { TablerIcon, IconChevronLeft, IconChevronRight } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.grey[0]
        : theme.colors.grey[3],
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.blue[8],
      color: theme.colorScheme === 'dark' ? theme.white : theme.colors.grey[0],
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 40,
    marginLeft: 37,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.grey[4]
        : theme.colors.gray[4],
    borderLeft: `1px solid ${theme.colors.blue[6]}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.blue[8]
          : theme.colors.blue[8],
      color: theme.colors.grey[0],
    },
  },

  icoTheme: {
    backgroundColor: 'rgba(103, 169, 241, 0.44)',
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}))

interface LinksGroupProps {
  icon: TablerIcon
  label: string
  initiallyOpened?: boolean
  links?: { label: string; link: string }[]
}

export default function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const { classes, theme } = useStyles()
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ))

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon className={classes.icoTheme} size={30}>
              <Icon size={20} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
