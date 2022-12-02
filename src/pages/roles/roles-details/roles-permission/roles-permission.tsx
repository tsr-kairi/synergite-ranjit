import { useState } from 'react'
import {
  TransferList,
  TransferListData,
  createStyles,
  Group,
  Text,
  ActionIcon,
  Button,
} from '@mantine/core'
import { IconLockSquare } from '@tabler/icons'
import { TPermission, TPermissionCreate } from '@/types/permission-type'
import useSavePermission from './hooks/useSavePermission'
import { useParams } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '5px',
  },
  align: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '5px',
  },
  transferList: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    borderRadius: '5px',
  },
}))

interface IRolesPermissionProps {
  data: TPermission
}

export default function RolesPermission({ data }: IRolesPermissionProps) {
  // console.log('permissionDataNew', data)

  const { rolesId } = useParams()
  const { mutate: addPermission } = useSavePermission()

  // console.log('PermissionData', data)
  const { classes } = useStyles()

  // availablePermission map function
  const availablePermission = data?.available_permissions.map(
    (availPermission) => {
      return {
        value: availPermission?.uuid || '',
        label: availPermission?.description || '',
      }
    }
  )

  // rolesPermission map function
  const rolesPermission = data?.role_permission.map((rolesPermission) => {
    return {
      value: rolesPermission?.uuid || '',
      label: rolesPermission?.description || '',
    }
  })

  // permission initial data by TransferListData
  const initialValues: TransferListData = [availablePermission, rolesPermission]

  const [transferData, TransferSetData] =
    useState<TransferListData>(initialValues)

  // save initial object
  const permissionCreateData: TPermissionCreate = {
    newAvailablePermissions: transferData[0].map((ap) => ap.value),
    newRolePermissions: transferData[1].map((np) => np.value),
    roleUuid: String(rolesId),
  }

  //  save handler
  const permissionUpdateHandler = () => {
    addPermission(permissionCreateData, {
      onSuccess: () => {
        showNotification({
          message: 'Permission updated successfully',
          color: 'green',
        })
      },
    })
  }

  //  returning area
  return (
    <div className={classes.main}>
      <Group position="apart" mb="xs" className={classes.align}>
        <Text size="md" color={'blue'}>
          <b>Permission Manager</b>
        </Text>
        <ActionIcon variant="light" radius="xl" color={'blue'}>
          <IconLockSquare />
        </ActionIcon>
      </Group>
      <div className={classes.transferList}>
        <TransferList
          value={transferData}
          onChange={TransferSetData}
          searchPlaceholder="Search by any field..."
          nothingFound="No records found"
          titles={['Available permission', 'Assigned permission']}
          breakpoint="sm"
          listHeight={300}
        />
      </div>
      <Button mt={'md'} onClick={permissionUpdateHandler}>
        Update
      </Button>
    </div>
  )
}
