import { ListViewLayout } from '@/components/layout/list-view.layout'
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
  billable: false,
  total_hours: 1,
  project_update: '',
}

const CreateTimeSheet: React.FC<{ week: string }> = ({ week }) => {
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

  const calculateTotalBillableHours = () => {
    let totalBillableHours = 0
    for (const field of fields) {
      if (field.billable) {
        totalBillableHours += field.total_hours
      }
    }
    return totalBillableHours
  } // End of calculateTotalBillableHours

  return (
    <>
      <Table horizontalSpacing="md" verticalSpacing="xs">
        <thead>
          <tr className={classes.tr}>
            <th className={classes.th}>Date</th>
            <th className={classes.th}>Project</th>
            <th className={classes.th}>Billable/Not</th>
            <th className={classes.th}>Total Hrs</th>
            <th className={classes.th}>Project Updates</th>
            <th className={classes.th}>
              <IconPlus
                size={24}
                color={'green'}
                style={{ marginRight: '8px' }}
                onClick={addNewData}
              />
            </th>
          </tr>
        </thead>

        <tbody>
          {fields.map((field) => {
            return (
              <tr key={field.key} className={classes.tr}>
                <td>
                  <td>{week}</td>
                </td>
                <td>
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
                <td>
                  <Checkbox
                    checked={field.billable}
                    label="Billable or non-billable"
                    onChange={() =>
                      updateData({
                        ...field,
                        billable: !field.billable,
                      })
                    }
                  />
                </td>
                <td>
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
                <td>
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
                <td>
                  <IconTrash
                    size={24}
                    color={'red'}
                    style={{ marginRight: '8px', cursor: 'pointer' }}
                    onClick={() => deleteData(field.key)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <TimesheetTile week={week} />
      <TimesheetTile week={week} />
      <TimesheetTile week={week} />
      <TimesheetTile week={week} />
      <TimesheetTile week={week} />
      <TimesheetTile week={week} />
      <TimesheetTile week={week} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>
          Total Billable Time:{' '}
          {calculateTotalBillableHours().toString() + '.00'}
        </p>
        <Button ml={80}>Submit</Button>
      </div>
    </>
  )
}

const TimesheetTile: React.FC<{ week: string }> = ({ week }) => {
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
    <Table horizontalSpacing="md" verticalSpacing="xs">
      <thead>
        <tr className={classes.tr}>
          <th className={classes.th}>Date</th>
          <th className={classes.th}>Project</th>
          <th className={classes.th}>Billable/Not</th>
          <th className={classes.th}>Total Hrs</th>
          <th className={classes.th}>Project Updates</th>
          <th className={classes.th}>
            <IconPlus
              size={24}
              color={'green'}
              style={{ marginRight: '8px' }}
              onClick={addNewData}
            />
          </th>
        </tr>
      </thead>

      <tbody>
        {fields.map((field) => {
          return (
            <tr key={field.key} className={classes.tr}>
              <td>
                <td>{week}</td>
              </td>
              <td>
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
              <td>
                <Checkbox
                  checked={field.billable}
                  label="Billable or non-billable"
                  onChange={() =>
                    updateData({
                      ...field,
                      billable: !field.billable,
                    })
                  }
                />
              </td>
              <td>
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
              <td>
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
              <td>
                <IconTrash
                  size={24}
                  color={'red'}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                  onClick={() => deleteData(field.key)}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
} // End of TimesheetTile

export default CreateTimeSheet

const useStyles = createStyles((theme) => ({
  thead: {
    paddingLeft: '20px !important',
  },
  th: {
    border: 'none !important',
  },
  td: {
    padding: '20px !important',
  },
  tr: {
    border: 'none !important',
    // display: 'flex',
    // flexDirection: 'row',
    // gap: '130px',
    // marginLeft: '72px',
  },
  tbody: {
    // gap: '120px',
    // flexDirection: 'row',
    // marginLeft: '60px',
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
