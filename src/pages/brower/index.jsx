import React, { Component } from 'react';
import { Layout, Input, Col, Row, Card } from 'antd'
import { AudioOutlined, RightOutlined } from '@ant-design/icons';
import LineEcharts from '../../components/Echarts/LineEcharts';
import request from '@/utils/request';
import { RequestMethod } from '@/store/common';
import Axis from 'axios';
import './index.less';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

export default class brower extends Component {
    state = {
        data: {
            x: ['2019-11-21', '2019-11-22', '2019-11-23', '2019-11-24', '2019-11-25', '2019-11-26'],
            y: [20, 50, 80, 70, 45, 85]
        },
        result: "",
        dataParams: "",
    }

    componentDidMount() {
        this.getContacrtFunction();
        this.getLineChartFunction();
    }

    getContacrtFunction() {
        request(`/api/n9e/xuperchain/contract/count?chain_name=xuper`, {
            method: "GET",
        }).then((res) => {
            console.log(res);
            this.setState({
                dataParams: res.dat
            })
        });
    }

    getLineChartFunction() {
        request(`/api/n9e/xuperchain/tx/line/chart`, {
            method: "GET",
        }).then((res) => {
            console.log(res)
            let data = {
                x: res.dat.data,
                y: res.dat.counts,
            }
            this.setState({
                data: data
            })
        });
    }

    onSearchShow(e) {
        this.onSearch(e);
    }

    onSearch(e) {
        let data = {
            "chain_name": "xuper",
            "input": e
        }
        request(`/api/n9e/xuperchain/tx/query?chain_name=${data.chain_name}&input=${data.input}`, {
            method: "GET",
        }).then((res) => {
            console.log(res);
            this.setState({
                result: res.dat
            })
        });
    }


    render() {
        const { data, result, dataParams } = this.state;
        return (
            <Layout>
                <Header className='header'>
                    <Search placeholder="区块高度、区块哈希、交易" size='large' onSearch={(e) => { this.onSearch(e) }} style={{ width: 600, height: "100px", marginTop: "60px" }} />
                </Header>
                <Content className='Content'>
                    <Row>
                        <Col span={12} className='rowleft'>
                            <Row className='rowleftRow'>
                                <Col span={24} className='rowleftTop'>
                                    <div>
                                        <p>区块高度</p>
                                        <p className="textNum">{dataParams.height}</p>
                                    </div>
                                    <div>
                                        <p>交易总数</p>
                                        <p className="textNum">{dataParams.tx_counts}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='rowleftCenterRow'>
                                <Col span={12}>
                                    <p>合约数</p>
                                    <p className="textNum">{dataParams.count}个</p>
                                </Col>
                                <Col span={12}>
                                    <p>节点数</p>
                                    <p className="textNum">{dataParams.node_sum}个</p>
                                </Col>
                            </Row>
                            <Row className='rowleftRightRow'>
                                <Col span={12}>
                                    <p>平均出块时间</p>
                                    <p className="textNum">3秒</p>
                                </Col>
                                <Col span={12}>
                                    <p>历史并发峰值</p>
                                    <p className="textNum">356笔/秒</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} className='rowright'>
                            <LineEcharts data={data} yname="交易数" />
                        </Col>
                    </Row>
                </Content>
                {
                    result ? <div className="line"></div> : ""
                }
                {/* 交易 */}
                <>
                    {
                        result.transaction ?
                            <>
                                <Footer className='Footer'>
                                    <h3>交易详情</h3>
                                    <div>摘要</div>
                                    <Row gutter={16} className='CardgutterRow'>
                                        <Col span={12}>
                                            <Card bordered={false} className='Cardgutter'>
                                                <p className="block"><span>交易类型</span><span>{result.transaction.coinbase ? "普通" : "合约"}</span></p>
                                                <p className="block"><span>交易哈希</span><span className='urlclick' onClick={() => { this.onSearchShow(result.transaction.tx_id) }}>{result.transaction.tx_id}</span></p>
                                                <p className="block"><span>区块高度</span>{result.transaction.block_height}</p>
                                                <p className="block"><span>出块时间</span>{result.transaction.block_timestamp}</p>
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card bordered={false} className='Cardgutter'>
                                                <p className="block"><span>交易发起时间</span>{result.transaction.date}</p>
                                                <p className="block"><span>交易发起金额</span>{result.transaction.from_total}</p>
                                                <p className="block"><span>交易接收金额</span>{result.transaction.to_total}</p>
                                                <p className="block"><span>手续费</span>{result.transaction.fee}</p>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Footer>
                                <Footer className='Footer'>
                                    <div>交易</div>
                                    {
                                        result.transaction.to_addresses ?
                                            result.transaction.to_addresses.map((items) => {
                                                return (
                                                    <Row gutter={16} className='CardgutterRow'>
                                                        <Col span={12}>
                                                            <Card bordered={false} className='Cardgutter'>
                                                                <p className="block"><span>发起方</span>{result.transaction.from_address ? result.transaction.from_address : ""}</p>
                                                            </Card>
                                                        </Col>
                                                        <RightOutlined className='RightOutlined' />
                                                        <Col span={12}>
                                                            <Card bordered={false} className='Cardgutter'>
                                                                <p className="block toblock"><span>接收方</span>{items}</p>
                                                            </Card>
                                                        </Col>
                                                    </Row>

                                                )
                                            })

                                            : ""
                                    }
                                </Footer>
                            </> : ""
                    }
                </>

                {/* 块 */}
                <>
                    {
                        result.block ?
                            <>
                                <Footer className='Footer'>
                                    <h3>区块详情</h3>
                                    <div>摘要</div>
                                    <Row gutter={16} className='CardgutterRow'>
                                        <Col span={12}>
                                            <Card bordered={false} className='Cardgutter'>
                                                <p className="block"><span>区块高度</span>{result.block.block_height}</p>
                                                <p className="block"><span>普通交易数量</span>{result.block.tx_number}</p>
                                                <p className="block"><span>播报方</span>{result.block.miner}</p>
                                                <p className="block"><span>时间</span>{result.block.timestamp}</p>
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card bordered={false} className='Cardgutter'>
                                                <p className="block"><span>区块哈希</span>{result.block.block_id}</p>
                                                <p className="block"><span>前一个区块哈希</span><span className='urlclick' onClick={() => { this.onSearchShow(result.block.pre_hash) }}>{result.block.pre_hash}</span></p>
                                                <p className="block"><span>后一个区块哈希</span><span className='urlclick' onClick={() => { this.onSearchShow(result.block.next_hash) }}>{result.block.next_hash}</span></p>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Footer>
                                <Footer className='Footer'>
                                    <div>交易</div>
                                    <Row gutter={16} className='CardgutterRow'>
                                        <Col span={12}>
                                            <Card bordered={false} className='Cardgutter'>
                                                {
                                                    result.block.txs ?
                                                        result.block.txs.map((items) => {
                                                            return (
                                                                <p className="block"><span>交易编号：</span> <span className='urlclick' onClick={() => { this.onSearchShow(items) }}>{items}</span></p>
                                                            )
                                                        })

                                                        : ''
                                                }
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card bordered={false} className='Cardgutter'>
                                                {/* <p className="block"><span>手续费</span>0</p>
                                                <p className="block"><span>接收方</span>ZJRX8iqEraWuKAZC4Kf7y28uF1saEAgxf</p>
                                                <p className="block"><span>总金额</span>0</p> */}
                                            </Card>
                                        </Col>
                                    </Row>
                                </Footer>
                            </> : ""
                    }
                </>

            </Layout>
        )
    }
}