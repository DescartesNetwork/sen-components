import { Col, Divider, Row, Typography } from 'antd'

const View = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Divider style={{ margin: 0, width: '100%' }} />
      </Col>
      <Col span={24}>
        <Typography.Text>Appx</Typography.Text>
      </Col>
    </Row>
  )
}

export default View
