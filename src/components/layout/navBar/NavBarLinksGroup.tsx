import { useState } from 'react'
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  Anchor,
  Tooltip,
  Button,
} from '@mantine/core'
import { TablerIcon, IconChevronLeft, IconChevronRight } from '@tabler/icons'
import { Link } from 'react-router-dom'
import theme from '@/theme/theme'

const parentBackgroundColor = {
  backgroundColor:
    theme.colorScheme === 'dark'
      ? theme?.colors?.dark?.[7]
      : 'rgba(252,185,0,1)',
  color: theme.colorScheme === 'dark' ? theme.white : theme?.colors?.grey?.[0],
}

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

    '&:hover': parentBackgroundColor,
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
          ? 'rgba(252,185,0,1)'
          : 'rgba(252,185,0,1)',
      color: theme.colors.grey[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: 'rgba(252,185,0,1)',
    },
  },

  icoTheme: {
    backgroundColor: 'rgba(103, 169, 241, 0.44)',
    '&:hover': {
      borderRadius: '8px',
    },
  },
  anchor: {
    color: theme.colors.grey[0],
    fontWeight: 500,
    fontSize: theme.fontSizes.md,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      textDecoration: 'none',
    },
  },
  chevron: {
    transition: 'transform 200ms ease',
  },
}))

interface LinksGroupProps {
  id: string
  icon: TablerIcon
  label: string
  initiallyOpened?: boolean
  links?: { label: string; link: string }[]
  url?: string
  isSidebarOpen?: boolean
  isActive: boolean
  onTopLinkClick: () => void
}

export default function LinksGroup({
  icon: Icon,
  label,
  links,
  isSidebarOpen,
  isActive,
  onTopLinkClick,
}: LinksGroupProps) {
  const { classes, theme, cx } = useStyles()
  const hasLinks = Array.isArray(links)

  const [isOnHoverOpen, setIsOnHoverOpen] = useState(false)
  const [active, setActive] = useState('Dashboard')
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft

  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component={Link}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: link.label === active,
      })}
      onClick={() => {
        setActive(link.label)
      }}
      key={link.label}
    >
      {link.label}
    </Text>
  ))

  return (
    <>
      <UnstyledButton
        className={classes.control}
        style={isActive ? parentBackgroundColor : {}}
      >
        <Anchor
          className={classes.anchor}
          onClick={onTopLinkClick}
          onMouseEnter={() => setIsOnHoverOpen(true)}
          onMouseLeave={() => setIsOnHoverOpen(false)}
        >
          <Group position="apart" spacing={0}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon className={classes.icoTheme} size={30}>
                <Icon size={20} />
              </ThemeIcon>
              {isSidebarOpen && <Box ml="md">{label}</Box>}
            </Box>

            {hasLinks && isSidebarOpen && (
              <ChevronIcon
                className={classes.chevron}
                size={14}
                stroke={1.5}
                style={{
                  transform: isActive
                    ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                    : 'none',
                }}
              />
            )}
          </Group>
        </Anchor>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={isActive || isOnHoverOpen}>{items}</Collapse>
      ) : null}
    </>
  )
}
