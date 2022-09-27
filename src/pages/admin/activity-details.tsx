import {
  Avatar,
  createStyles,
  Grid,
  Group,
  Table,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { Link } from 'react-router-dom'
import ContactsTable from '../client/client-details/contacts/contactsTable'
import { Th } from '../employee/employee-list'

const useStyles = createStyles(() => ({
  AdminActivityDetails: {
    // display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    // gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  clientProProfile: {
    // display: 'flex',
    // height: '88.5vh',
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    borderRadius: '10px',
    padding: '20px',
  },
  clientContactJobs: {
    height: '88.5vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
  },
  contacts: {
    height: '40vh',
  },
}))

export const AdminActivityDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <div className={classes.AdminActivityDetails}>
            <div className={classes.clientProProfile}>
              {/* <div className={classes.personalDetails}> */}
              <div>
                <Group spacing="xl">
                  <Text size="sm" color="#686969" weight={400} className="w-16">
                    <b>Name :</b>
                  </Text>
                  <Text size="sm" color="#686969" weight={400}>
                    vishal
                  </Text>
                </Group>
                <Group spacing="xl">
                  <Text size="sm" color="#686969" weight={400} className="w-16">
                    <b>Email :</b>
                  </Text>
                  <Text size="sm" color="#686969" weight={400}>
                    vishal@gail.com
                  </Text>
                </Group>
                <Group spacing="xl">
                  <Text size="sm" color="#686969" weight={400} className="w-16">
                    <b>Phone :</b>
                  </Text>
                  <Text size="sm" color="#686969" weight={400}>
                    1234567890
                  </Text>
                </Group>
                <Group spacing="xl">
                  <Text size="sm" color="#686969" weight={400} className="w-16">
                    <b>City :</b>
                  </Text>
                  <Text size="sm" color="#686969" weight={400}>
                    mumbai
                  </Text>
                </Group>
                <Group spacing="xl">
                  <Text size="sm" color="#686969" weight={400} className="w-16">
                    <b>State :</b>
                  </Text>
                  <Text size="sm" color="#686969" weight={400}>
                    state
                  </Text>
                </Group>
                <Group spacing="xl">
                  <Text size="sm" color="#686969" weight={400} className="w-16">
                    <b>Country :</b>
                  </Text>
                  <Text size="sm" color="#686969" weight={400}>
                    India
                  </Text>
                </Group>
              </div>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <div className="flex space-x-4 mb-4">
            <h3 className="text-2xl text-blue-800 font-semibold mb-4">
              Contact
            </h3>
            <TextInput
              placeholder="Search by any field"
              icon={<IconSearch size={14} stroke={1.5} />}
              value={''}
              // onChange={() => {}}
              radius="xl"
              // className={classes.searchField}
              className="w-full"
            />
          </div>
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            className="shadow bg-white rounded-md"
          >
            <thead>
              <tr>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  ID
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  Name
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  Email
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  Phone
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  City
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  State
                </Th>
                <Th sorted={true} reversed={false} onSort={() => null}>
                  Country
                </Th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((num) => {
                return (
                  <tr key={num}>
                    <td>
                      <Text weight={500} align="center">
                        No records found
                      </Text>
                    </td>
                    <td>
                      <Link
                        to={`/admin-activity/1`}
                        // className={classes.userLink}
                      >
                        <Tooltip
                          label="Click to view"
                          color="blue"
                          withArrow
                          transition="pop-top-right"
                          transitionDuration={300}
                        >
                          <Group spacing="sm">
                            <Avatar color="cyan" size={26} radius={26}>
                              C
                            </Avatar>
                            <Text size="sm" weight={500}>
                              Vishal
                            </Text>
                          </Group>
                        </Tooltip>
                      </Link>
                    </td>
                    <td>
                      <Text weight={500} align="center">
                        No records found
                      </Text>
                    </td>
                    <td>
                      <Text weight={500} align="center">
                        No records found
                      </Text>
                    </td>
                    <td>
                      <Text weight={500} align="center">
                        No records found
                      </Text>
                    </td>
                    <td>
                      <Text weight={500} align="center">
                        No records found
                      </Text>
                    </td>
                    <td>
                      <Text weight={500} align="center">
                        No records found
                      </Text>
                    </td>
                    <td>
                      <Text weight={500} align="center">
                        No records found
                      </Text>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default AdminActivityDetails
