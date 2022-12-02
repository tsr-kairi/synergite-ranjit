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
  Menu,
  Tooltip,
} from '@mantine/core'
import { TablerIcon } from '@tabler/icons'
import { Link } from 'react-router-dom'
import theme from '@/theme/theme'
import { useAuth } from '@/store/auth.store'
import {
  getPermission,
  IAllPagePermissionOptionsWithAllowedCheck,
  IPermissionOptions,
} from '@/utils/permission.utils'

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
    margin: `1px`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.grey[0]
        : theme.colors.grey[3],
    fontSize: theme.fontSizes.sm,

    '&:hover': parentBackgroundColor,
  },

  link: {
    // fontWeight: 500,
    // fontSize: theme.fontSizes.sm,
    textDecoration: 'none',
    // padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: 'rgba(252,185,0,1)',
    },
  },

  linkGroup: {
    marginTop: '2px',
    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.grey[0]
        : theme.colors.gray[0],
    // borderLeft: `1px solid ${theme.colors.grey[0]}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(252,185,0,1)'
          : 'rgba(252,185,0,1)',
      color: theme.colors.grey[0],
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

  controlActive: {
    backgroundColor: 'rgba(103, 169, 241, 0.14)',
  },
  menuDD: {
    // boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    backgroundColor: '#04334c',
  },
}))

interface LinksGroupProps {
  id: string
  icons: TablerIcon
  label: string
  initiallyOpened?: boolean
  links: {
    label: string
    link?: string
    icon: TablerIcon
    canIAccess: boolean
    subLinks?: {
      label: string
      subLink: string
      icon: TablerIcon
      canIAccess: boolean
    }[]
  }[]
  // url?: string
  isSidebarOpen?: boolean
  isActive: boolean
  onTopLinkClick: () => void
}

export default function LinksGroup({
  icons: Icons,
  label,
  links,
  isActive,
  onTopLinkClick,
}: LinksGroupProps) {
  const { classes, cx } = useStyles()
  const hasLinks = Array.isArray(links)

  const [isOnHoverOpen, setIsOnHoverOpen] = useState(false)
  const [active, setActive] = useState('')
  const [activeSubMenu, setActiveSubMenu] = useState('')

  const [menuOpened, setMenuOpened] = useState(false)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

  // const items = (hasLinks ? links : []).map((link) => {
  //   // if (!link.canIAccess) {
  //   //   return null
  //   // }

  //   return link.subLinks ? (
  //     <Menu
  //       width={280}
  //       position="right-start"
  //       offset={12}
  //       transition="pop-top-right"
  //       // onOpen={() => setMenuOpened(true)}
  //       // onClose={() => setMenuOpened(false)}
  //       opened={isSubMenuOpen}
  //       onOpen={() => setIsSubMenuOpen(true)}
  //       onClose={() => setIsSubMenuOpen(false)}
  //       openDelay={100}
  //       closeDelay={400}
  //       withArrow
  //     >
  //       <Menu.Target>
  //         <Group
  //           key={link.label}
  //           className={cx(classes.linkGroup, {
  //             [classes.linkActive]: link.label === activeSubMenu,
  //           })}
  //           onClick={onTopLinkClick}
  //           onMouseLeave={() => setIsOnHoverOpen(false)}
  //         >
  //           <Icons size={20} />
  //           <Text
  //             onClick={() => {
  //               setMenuOpened(true)
  //             }}
  //             className={classes.link}
  //           >
  //             {link.label}
  //           </Text>
  //         </Group>
  //       </Menu.Target>
  //       <Menu.Dropdown className={classes.menuDD}>
  //         <Menu.Label
  //           style={{
  //             fontSize: '16px',
  //             fontWeight: 'lighter',
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: 'space-between',
  //             color: '#fff',
  //           }}
  //         >
  //           {link.label}
  //           <Icons size={20} />
  //         </Menu.Label>
  //         <Menu.Item style={{ padding: '5px', backgroundColor: 'transparent' }}>
  //           {link.subLinks.map((subLinkM) => (
  //             <p key={subLinkM.label}>{subLinkM.label}</p>
  //           ))}

  //           {/* {link.subLinks.map((subLinkM) => (
  //             <Group
  //               key={subLinkM.label}
  //               className={cx(classes.linkGroup, {
  //                 [classes.linkActive]: subLinkM.label === active,
  //               })}
  //             >
  //               <Icons size={20} />
  //               <Text
  //                 component={Link}
  //                 to={subLinkM.subLink}
  //                 className={classes.link}
  //                 onClick={() => {
  //                   setActiveSubMenu(subLinkM.label)
  //                 }}
  //               >
  //                 {subLinkM.label}
  //               </Text>
  //             </Group>
  //           ))} */}

  //           {/* {hasLinks ? (
  //             <Collapse in={isActive || isOnHoverOpen}>
  //               {link.subLinks.map((subLinkM) => (
  //                 <Group
  //                   key={subLinkM.label}
  //                   className={cx(classes.linkGroup, {
  //                     [classes.linkActive]: subLinkM.label === active,
  //                   })}
  //                 >
  //                   <Icons size={20} />
  //                   <Text
  //                     component={Link}
  //                     to={subLinkM.subLink}
  //                     className={classes.link}
  //                     onClick={() => {
  //                       setActiveSubMenu(subLinkM.label)
  //                     }}
  //                   >
  //                     {subLinkM.label}
  //                   </Text>
  //                 </Group>
  //               ))}
  //             </Collapse>
  //           ) : null} */}
  //         </Menu.Item>
  //       </Menu.Dropdown>
  //     </Menu>
  //   ) : (
  //     <Group
  //       key={link.label}
  //       className={cx(classes.linkGroup, {
  //         [classes.linkActive]: link.label === active,
  //       })}
  //     >
  //       {/* <span>{link.icon}</span> */}
  //       <Icons size={20} />
  //       {/* <span dangerouslySetInnerHTML={{ __html: link.icon }}></span> */}
  //       <Text
  //         component={Link}
  //         to={link.link || ''}
  //         className={classes.link}
  //         onClick={() => {
  //           setActive(link.label)
  //         }}
  //       >
  //         {link.label}
  //       </Text>
  //     </Group>
  //   )
  // })

  const items = (hasLinks ? links : []).map((link) => {
    // if (!link.canIAccess) {
    //   return null
    // }

    return (
      <Menu.Item
        key={link.label}
        icon={<Icons size={20} />}
        className={cx(classes.linkGroup, {
          [classes.linkActive]: link.label === active,
        })}
      >
        {!link.subLinks ? (
          <Text
            component={Link}
            to={link.link || ''}
            className={classes.link}
            onClick={() => {
              setActive(link.label)
              // if (!link.subLinks) {
              //   setIsMenuOpen(false)
              // }
              // if (link.subLinks && link?.subLinks.length <= 0) {
              //   setIsMenuOpen(false)
              // }
            }}
          >
            {link.label}
          </Text>
        ) : (
          // Sub Menu
          <Menu
            width={280}
            position="right-start"
            offset={12}
            transition="pop-top-right"
            withArrow
          >
            <Menu.Target>
              <Text
                className={classes.link}
                onClick={() => {
                  console.log('clicked')
                  setActive(link.label)
                }}
              >
                {link.label}
              </Text>
            </Menu.Target>

            <Menu.Dropdown className={classes.menuDD}>
              <Menu.Label
                style={{
                  fontSize: '16px',
                  fontWeight: 'lighter',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#fff',
                }}
              >
                {label}
                <Icons size={20} />
              </Menu.Label>
              {link?.subLinks?.map((subLink) => {
                return (
                  <Text
                    key={subLink.label}
                    component={Link}
                    to={link.link || ''}
                    className={classes.link}
                    onClick={() => {
                      setActive(link.label)
                      if (!link.subLinks) {
                        setIsMenuOpen(false)
                      }

                      if (link.subLinks && link?.subLinks.length <= 0) {
                        setIsMenuOpen(false)
                      }
                    }}
                  >
                    {subLink.label}
                  </Text>
                )
              })}
            </Menu.Dropdown>
          </Menu>
        )}
      </Menu.Item>
    )
  })

  return (
    <Menu
      width={280}
      position="right-start"
      offset={12}
      transition="pop-top-right"
      opened={isMenuOpen}
      onChange={setIsMenuOpen}
      withArrow
    >
      <Menu.Target>
        <UnstyledButton
          style={isActive ? parentBackgroundColor : {}}
          className={cx(classes.control, {
            [classes.controlActive]: isMenuOpen,
          })}
          onClick={onTopLinkClick}
          onMouseLeave={() => setIsOnHoverOpen(false)}
        >
          <Tooltip
            label={label}
            color="blue"
            withArrow
            position="right-start"
            offset={25}
          >
            <Anchor className={classes.anchor}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon
                  className={classes.icoTheme}
                  size={30}
                  style={isActive ? parentBackgroundColor : {}}
                >
                  <Icons size={20} />
                </ThemeIcon>
              </Box>
            </Anchor>
          </Tooltip>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className={classes.menuDD}>
        <Menu.Label
          style={{
            fontSize: '16px',
            fontWeight: 'lighter',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#fff',
          }}
        >
          {label}
          <Icons size={20} />
        </Menu.Label>

        {items}
      </Menu.Dropdown>
    </Menu>
  )
}
