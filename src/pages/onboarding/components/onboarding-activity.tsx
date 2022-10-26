import { useEffect, useState } from 'react'

import { getActivitiesByOnboardingId } from '@/services/onboarding.services'
import { Badge, Button, Group, Loader, Paper } from '@mantine/core'
import { useQuery } from 'react-query'
import useGetAllDepartment from '@/pages/department/hooks/useGetAllDepartment'

type TDepartment = 'Accounts' | 'Contracts' | 'HR' | 'Immigration'

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
  const [selectedDepartmentUUID, setSelectedDepartUUID] = useState<string>('')

  const { data, isLoading, error } = useQuery(
    ['activity-by-department', selectedDepartmentUUID],
    () =>
      selectedDepartmentUUID
        ? getActivitiesByOnboardingId(onboardingId, selectedDepartmentUUID)
        : null
  )

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
              <Group align={'center'}>
                <p
                  onClick={() => onPressed(activity.uuid)}
                  style={{ cursor: 'pointer' }}
                >
                  Assigned To:{' '}
                  {`${activity?.assignedToUser.first_name} ${activity.assignedToUser.last_name}`}
                </p>
                <p>
                  Assigned By:
                  {`${activity?.assignedByUser.first_name} ${activity.assignedByUser.last_name}`}
                </p>
                {/* {activity.activity_status} */}
                <Group align={'center'}>
                  <p>Status:</p>
                  <p>
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
                  </p>
                </Group>
              </Group>
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
  }, [departments?.data])

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
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
      </div>
    </>
  )
} // End of Department
