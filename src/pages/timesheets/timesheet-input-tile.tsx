import {
  ActionIcon,
  Button,
  Checkbox,
  createStyles,
  Select,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { Th } from '../employee/employee-list'
import React, { useState } from 'react'
import { IconPlus, IconSubmarine, IconTrash } from '@tabler/icons'
import { randomId } from '@mantine/hooks'

interface WeeklyData {
  key: string
  project: string
  billable: boolean
  total_hours: number
  project_update: string
}

const initialData = {
  key: '',
  project: '',
  billable: true,
  total_hours: 1,
  project_update: '',
}

interface TimesheetInputTileProps {
  week: string
  isFirstItem?: boolean
  isLastItem?: boolean
}

const TimesheetInputTile: React.FC<TimesheetInputTileProps> = (props) => {
  const { week } = props

  const [fields, setFields] = useState<WeeklyData[]>([
    { ...initialData, key: randomId() },
  ])

  const { classes } = useStyles()

  const addNewData = () => {
    initialData.key = randomId()
    setFields((prevState) => [...prevState, initialData])
  } // End of addNewData

  const updateData = (data: WeeklyData) => {
    const updatedData = fields.map((doc) => {
      if (doc.key === data.key) {
        return data
      }
      return doc
    })
    setFields(updatedData)
  } // End of updateData

  const deleteData = (key: string) => {
    const updatedData = fields.filter((doc) => doc.key !== key)
    setFields(updatedData)
  } // End of deleteData

  return (
    <>
      {fields.map((field, index) => {
        const isLastItem = fields.length - 1 === index
        return (
          <tr className={isLastItem ? classes.tr : ''} key={field.key}>
            <td className={classes.td}>{week}</td>
            <td className={classes.td}>
              <TextInput
                value={field.project}
                placeholder="Project"
                withAsterisk
                onChange={({ target }) =>
                  updateData({
                    ...field,
                    project: target.value,
                  })
                }
              />
            </td>
            <td className={classes.td}>
              <Checkbox
                checked={field.billable}
                label={field.billable ? 'Billable' : 'Non-billable'}
                onChange={() =>
                  updateData({
                    ...field,
                    billable: !field.billable,
                  })
                }
              />
            </td>
            <td className={classes.td}>
              <TextInput
                value={field.total_hours}
                type={'number'}
                placeholder="Total HRS"
                withAsterisk
                onChange={({ target }) =>
                  updateData({
                    ...field,
                    total_hours: +(target.value || 0),
                  })
                }
              />
            </td>
            <td className={classes.td}>
              <Textarea
                value={field.project_update}
                onChange={({ target }) =>
                  updateData({
                    ...field,
                    project_update: target.value,
                  })
                }
              />
            </td>
            <td className={classes.td}>
              {isLastItem && (
                <IconPlus
                  size={24}
                  color={'green'}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                  onClick={addNewData}
                />
              )}

              {fields.length > 1 && (
                <IconTrash
                  size={24}
                  color={'red'}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                  onClick={() => deleteData(field.key)}
                />
              )}
            </td>
          </tr>
        )
      })}
    </>
  )
} // End of TimesheetInputTile

export default TimesheetInputTile

const useStyles = createStyles((theme) => ({
  tr: {
    // background: 'red !important',
    borderBottom: '1px solid gray !important',
  },
  td: {
    border: 'none !important',
  },
  buttonContainer: {
    position: 'absolute',
    top: '180px',
    right: '180px',
  },
  iconContainer: {
    position: 'absolute',
    top: '180px',
    right: '150px',
  },
}))
