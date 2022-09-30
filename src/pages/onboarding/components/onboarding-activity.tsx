import { useState } from 'react'

import { getActivitiesByOnboardingId } from '@/services/onboarding.services'
import { Button, Group } from '@mantine/core'
import { useQuery } from 'react-query'

type TDepartment = 'Accounts' | 'Contracts' | 'HR' | 'Immigration'

interface OnboardingActivity {
  onboardingId: string
  onPressed: (activityId: string) => void
}

const OnboardingActivity: React.FC<OnboardingActivity> = ({
  onboardingId,
  onPressed,
}) => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<TDepartment>('Accounts')

  const { data, isLoading } = useQuery(selectedDepartment, () =>
    getActivitiesByOnboardingId(onboardingId, selectedDepartment)
  )

  return (
    <div>
      {/* Departments  */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {/* Account */}
        <Button onClick={() => setSelectedDepartment('Accounts')}>
          Account
        </Button>
        <Button onClick={() => setSelectedDepartment('Contracts')}>
          Contracts
        </Button>
        <Button onClick={() => setSelectedDepartment('HR')}>HR</Button>
        <Button onClick={() => setSelectedDepartment('Immigration')}>
          Immigration
        </Button>
      </div>

      {isLoading && <h3>Loading...</h3>}
      {data?.length === 0 && !isLoading && <h3>Data Not Found</h3>}

      <div>
        {data?.map((activity) => {
          return (
            <Group key={activity.id}>
              <p onClick={() => onPressed(activity.id)}>
                Assigned To: {activity.assigned_to}
              </p>
              <p>Assigned By: {activity.assigned_by}</p>
              <p>Status: {activity.activity_status}</p>
            </Group>
          )
        })}
      </div>
    </div>
  )
} // End of OnboardingActivity

export default OnboardingActivity
