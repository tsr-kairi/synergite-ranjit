import { useEffect, useState } from 'react'

import { getActivitiesByOnboardingId } from '@/services/onboarding.services'
import {
  Badge,
  Button,
  createStyles,
  Divider,
  Drawer,
  Group,
  Loader,
  Paper,
  Text,
  TextInput,
} from '@mantine/core'
import { useQuery } from 'react-query'
import useGetAllDepartment from '@/pages/department/hooks/useGetAllDepartment'
import { IconEdit } from '@tabler/icons'

// type TDepartment = 'Accounts' | 'Contracts' | 'HR' | 'Immigration'

const useStyles = createStyles(() => ({
  editIcon: {
    color: '#04334c',
    '&:hover': {
      color: '#04334c',
    },
  },
  assignedToByUser: {
    color: '#04334c',
    borderBottom: `1px solid #04334c`,
  },
}))

interface OnboardingActivity {
  onboardingId: string
  onDepartmentChange: (departmentUUID: string) => void
  onPressed: (activityId: string) => void
}

const OnboardingActivity: React.FC<OnboardingActivity> = ({
  onboardingId,
  onDepartmentChange,
  onPressed,
}) => {
  const { classes } = useStyles()

  const [selectedDepartmentUUID, setSelectedDepartUUID] = useState<string>('')
  const [isOpened, setIsOpened] = useState(false)

  const { data, isLoading, error } = useQuery(
    ['activity-by-department', selectedDepartmentUUID],
    () =>
      selectedDepartmentUUID
        ? getActivitiesByOnboardingId(onboardingId, selectedDepartmentUUID)
        : null
  )

  useEffect(() => {
    if (data && data?.length > 0) {
      const activity = data[0]
      onPressed(activity.uuid)
    } else {
      onPressed('')
    }
  }, [data])

  let element: React.ReactNode = <></>

  if (error) {
    element = (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        Error Occurred
      </Paper>
    )
  } else if (!isLoading && !data) {
    element = (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        Not Found
      </Paper>
    )
  } else if (isLoading) {
    element = <Loader variant="dots" />
  }

  return (
    <div>
      {/* Departments  */}
      <Department
        onDepartmentChange={(departmentUUID) => {
          setSelectedDepartUUID(departmentUUID)
          onDepartmentChange(departmentUUID)
        }}
        onPressed={() => null}
      />

      <div style={{ marginTop: '40px' }}>{element}</div>

      <div>
        {data?.map((activity) => {
          return (
            <Paper key={activity.uuid}>
              <Group>
                <Group>
                  <Text
                    onClick={() => onPressed(activity.uuid)}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    Assigned To:{' '}
                    {`${activity.assignedToUser.first_name} ${activity.assignedToUser.last_name}`}
                  </Text>
                  <IconEdit
                    className={classes.editIcon}
                    cursor="pointer"
                    onClick={() => {
                      setIsOpened(true)
                      // setClientEditData(row)
                    }}
                  />
                </Group>
                <Divider orientation="vertical" />
                <Text>
                  Assigned By:
                  {`${activity?.assignedByUser.first_name} ${activity.assignedByUser.last_name}`}
                </Text>
                {/* {activity.activity_status} */}
              </Group>
              <Group mt={'md'}>
                <Text>Status:</Text>
                <Text>
                  {activity.activity_status === 'ASSIGNED' ? (
                    <Badge
                      style={{
                        border: `2px solid #808080`,
                      }}
                      size="lg"
                      color="grey"
                    >
                      ASSIGNED
                    </Badge>
                  ) : activity.activity_status === 'IN-PROGRESS' ? (
                    <Badge
                      style={{
                        border: `2px solid #FFFF00`,
                      }}
                      size="lg"
                      color="yellow"
                    >
                      IN-PROGRESS
                    </Badge>
                  ) : activity.activity_status === 'COMPLETED' ? (
                    <Badge
                      style={{
                        border: `2px solid #008000`,
                      }}
                      size="lg"
                      color="green"
                    >
                      COMPLETED
                    </Badge>
                  ) : null}
                </Text>
              </Group>
              <Divider my={'md'} />

              {/* Assigned To User form drawer */}
              <Drawer
                opened={isOpened}
                onClose={() => setIsOpened(false)}
                title="Update"
                padding="xl"
                size="xl"
                position="right"
              >
                <Group align="center" grow>
                  <TextInput
                    label="Assigned To User"
                    type={'text'}
                    placeholder="Assigned To User"
                  />
                  <Button type="submit" mt={'xl'}>
                    Update
                  </Button>
                </Group>
              </Drawer>
            </Paper>
          )
        })}
      </div>
    </div>
  )
} // End of OnboardingActivity

export default OnboardingActivity

interface DepartmentProps {
  onDepartmentChange: (departmentUUID: string) => void
  onPressed: (activityId: string) => void
}

const Department: React.FC<DepartmentProps> = ({ onDepartmentChange }) => {
  const [selectedDepartmentUUID, setSelectedDepartUUID] = useState<string>('')

  const { data: departments, isLoading, error } = useGetAllDepartment()

  useEffect(() => {
    if (!selectedDepartmentUUID && departments?.data) {
      const initialDepartmentUUID =
        departments?.data?.find((department) => department.name === 'Accounts')
          ?.uuid || ''

      if (initialDepartmentUUID) {
        setSelectedDepartUUID(initialDepartmentUUID)
        onDepartmentChange(initialDepartmentUUID)
      }
    }
    ;() => setSelectedDepartUUID('')
  }, [departments?.data, onDepartmentChange, selectedDepartmentUUID])

  let element: React.ReactNode = <></>

  if (error) {
    element = (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        Error Occurred
      </Paper>
    )
  } else if (!isLoading && !departments) {
    element = (
      <Paper
        style={{
          boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.50)',
          padding: '20px',
        }}
      >
        Not Found
      </Paper>
    )
  } else if (isLoading) {
    element = <Loader variant="dots" />
  }

  const filteredDepartment =
    departments?.data
      ?.filter((department) =>
        ['Accounts', 'Contracts', 'HR', 'Immigration'].includes(department.name)
      )
      ?.reverse() || []

  return (
    <>
      {element}
      <Group grow>
        {filteredDepartment?.map(({ uuid, name }) => (
          <Button
            key={uuid}
            onClick={() => {
              setSelectedDepartUUID(uuid)
              onDepartmentChange(uuid)
            }}
            variant={selectedDepartmentUUID === uuid ? 'filled' : 'light'}
          >
            {name}
          </Button>
        ))}
      </Group>
    </>
  )
} // End of Department
