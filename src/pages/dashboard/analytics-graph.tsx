import { Line } from '@ant-design/plots'
import { Group, Text, TextInput } from '@mantine/core'

export default function AnalyticsBoard() {
  const data = [
    {
      month: 'Jan',
      value: 3,
    },
    {
      month: 'Feb',
      value: 5.5,
    },
    {
      month: 'Mar',
      value: 3.5,
    },
    {
      month: 'Apr',
      value: 5,
    },
    {
      month: 'May',
      value: 8.5,
    },
    {
      month: 'Jun',
      value: 13.9,
    },
    {
      month: 'Jul',
      value: 5,
    },
    {
      month: 'Aug',
      value: 3,
    },
    {
      month: 'Sep',
      value: 7,
    },
    {
      month: 'Oct',
      value: 8.5,
    },
    {
      month: 'Nov',
      value: 3.5,
    },
    {
      month: 'Dec',
      value: 3,
    },
  ]
  const config = {
    data,
    height: 240,
    xField: 'month',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      // shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 1,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 8,
          stroke: '#ebbd07',
          fill: '#ebbd07',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  }
  return (
    <div>
      <Group position="apart" noWrap spacing="xl" align={'center'} mb={'lg'}>
        <Text size={'lg'} weight="lighter">
          Analytics Report
        </Text>
        <TextInput type={'month'} placeholder="Monthly" />
      </Group>
      <Line {...config} />
    </div>
  )
}
