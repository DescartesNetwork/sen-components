import { Suspense, useState } from 'react'
import { RemoteComponent } from '@sentre/react-dynamic-remote-component'

import { Button, Col, Layout, Row, Space, Typography } from 'antd'
import IconSax from '@sentre/antd-iconsax'
import IonIcon from '@sentre/antd-ionicon'
import NumericInput from '@sentre/antd-numeric-input'
import ThemeSwitch from 'os/components/themeSwitch'
import RemoteLogo from 'os/components/remoteLogo'

import 'os/static/styles/dark.os.less'
import 'os/static/styles/light.os.less'
import './index.os.less'

const View = () => {
  const [value, setValue] = useState('')

  return (
    <Layout style={{ padding: 12, minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Space>
            <Button type="text" icon={<IonIcon name="flask-outline" />} />
            <Button
              type="text"
              icon={
                <IconSax
                  name="Activity"
                  variant="Bulk"
                  style={{ color: '#FF8A65' }}
                />
              }
            />
            <ThemeSwitch />
          </Space>
        </Col>
        <Col span={24}>
          <Suspense fallback="Loading...">
            <RemoteComponent
              url="http://localhost:3000/index.js"
              scope="senhub"
              module="./bootstrap"
            />
          </Suspense>
        </Col>
        <Col span={24}>
          <RemoteLogo />
        </Col>
        <Col span={24}>
          <Typography.Text className="isolated-text">
            Test Style Module
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Space>
            <NumericInput
              value={value}
              onChange={setValue}
              style={{ width: 256 }}
            />
            <Typography.Text>{value}</Typography.Text>
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}

export default View
