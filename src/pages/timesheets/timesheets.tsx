import { ListViewLayout } from '@/components/layout/list-view.layout'
import {
  Avatar,
  Button,
  Checkbox,
  Group,
  Select,
  Table,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { Th } from '../employee/employee-list'
import React, { useState } from 'react'
import { IconPlus, IconSubmarine } from '@tabler/icons'
import { SheetData } from './data'
import CreateTimeSheet from './createTimeSheet'
import { Badge } from '@mantine/core'
const Timesheet = () => {
  const [createSheet, setCreateSheet] = useState<boolean>(false)
  const [selectedTimesheet, setSelectedTimesheet] = useState('')

  return (
    <>
      {createSheet && (
        <CreateTimeSheet
          week={selectedTimesheet}
          onBackClick={() => setCreateSheet(false)}
        />
      )}
      {!createSheet && (
        <>
          <ListViewLayout title="Timesheets" hideActionButton hideColumnButton>
            <Table horizontalSpacing="md" verticalSpacing="xs">
              <thead>
                <tr>
                  <Th onSort={() => null}>Name</Th>
                  <Th onSort={() => null}>Week</Th>
                  <Th onSort={() => null}>Billable </Th>
                  <Th onSort={() => null}>Non-Billable</Th>
                  <Th onSort={() => null}>Total Hours</Th>
                  <Th onSort={() => null}>Status</Th>
                </tr>
              </thead>
              <tbody>
                {SheetData.map((sheetValue) => {
                  return (
                    <tr key={sheetValue.Name}>
                      <td>{sheetValue.Name}</td>
                      <td>
                        <Tooltip
                          label="Click to view"
                          color="blue"
                          withArrow
                          transition="pop-top-right"
                          transitionDuration={300}
                        >
                          <Group spacing="sm">
                            <Text size="sm" weight={500}>
                              <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setCreateSheet(!createSheet)
                                  setSelectedTimesheet(sheetValue.Week)
                                }}
                              >
                                {sheetValue.Week}
                              </div>
                            </Text>
                          </Group>
                        </Tooltip>
                      </td>
                      <td>{'40' || sheetValue.Billable}</td>
                      <td>{'40' || sheetValue.Billable}</td>
                      <td>{sheetValue.TotalHrs}</td>
                      <td>
                        <Badge style={{ minWidth: '120px' }}>
                          <td>{sheetValue.Status}</td>
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </ListViewLayout>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}
          ></div>
        </>
      )}
    </>
  )
}

export default Timesheet
