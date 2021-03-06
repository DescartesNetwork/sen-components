import { Suspense } from 'react'
import { RemoteComponent } from '@sentre/react-dynamic-remote-component'

import { Button, Col, Layout, Row, Space, Typography } from 'antd'
import IconSax from '@sentre/antd-iconsax'
import IonIcon from '@sentre/antd-ionicon'
import ThemeSwitch from 'os/components/themeSwitch'
import RemoteLogo from 'os/components/remoteLogo'

import 'os/static/styles/dark.os.less'
import 'os/static/styles/light.os.less'
import './index.os.less'

const View = () => {
  return (
    <Layout style={{ padding: 12, minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Space>
            <Button type="text" icon={<IonIcon name="flask-outline" />} />
            <Button type="text" icon={<IonIcon name="logo-telegram" />} />
            <Button type="text" icon={<IonIcon name="logo-sentre" />} />
            <Button type="text" icon={<IonIcon name="logo-solana" />} />
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
          <Space>
            <RemoteLogo />
            <Typography.Text className="isolated-text">
              Test Style Module
            </Typography.Text>
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
      </Row>
    </Layout>
  )
}

export default View
