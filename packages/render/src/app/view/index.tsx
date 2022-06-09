import { Col, Divider, Row, Typography } from 'antd'

import './index.less'

const View = () => {
  return (
    <Row gutter={[24, 24]} id="senhub">
      <Col span={24}>
        <Divider style={{ margin: 0, width: '100%' }} />
      </Col>
      <Col span={24}>
        <Typography.Text>App</Typography.Text>
      </Col>
      <Col span={24}>
        <Typography.Text className="app-isolated-text">
          App: Test Style Module
        </Typography.Text>
      </Col>
    </Row>
  )
}

export default View
