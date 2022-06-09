import { useState, forwardRef, useCallback } from 'react'

import { Tooltip, Space, InputNumber, InputNumberProps } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

let timeoutId: ReturnType<typeof setTimeout> | undefined

/**
 * Numeric Input
 * - Check balance based on the max
 * - Only accept numeric characters
 * @remarks The props of input follows the same as https://ant.design/components/input-number/#API. Extra & Overrided props
 * @param ceiling - Maximum
 */
const NumericInput = forwardRef<
  InputNumberProps<string> & {
    ceiling?: string | number
  },
  any
>(({ ceiling, onChange = () => {}, ...props }, ref) => {
  const [error, setError] = useState('')

  // Handle amount
  const onAmount = useCallback(
    (val: number | string | null) => {
      if (val === null) return onChange('')
      const onError = (er: string) => {
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = undefined
        }
        setError(er)
        timeoutId = setTimeout(() => setError(''), 500)
      }
      if (ceiling && Number(val) > Number(ceiling))
        return onError('Not enough balance')
      return onChange(val.toString())
    },
    [ceiling, onChange],
  )

  return (
    <Tooltip
      title={
        <Space>
          <IonIcon name="warning" />
          {error}
        </Space>
      }
      visible={!!error}
    >
      <InputNumber
        {...props}
        stringMode
        type="number"
        controls={false}
        onChange={onAmount}
        ref={ref}
      />
    </Tooltip>
  )
})

export default NumericInput
