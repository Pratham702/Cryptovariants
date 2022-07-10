import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import axios from 'axios';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
	const [exchangesList, setExchangesList] = useState(null)
	const [exhangesListArr, setExhangesListArr] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const options = {
		method: 'GET',
		url: 'https://exchangerate-api.p.rapidapi.com/rapid/latest/USD',
		headers: {
			'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com',
			'X-RapidAPI-Key': process.env.KEY
		}
	};
	const getObj = (a, b) => {
		console.log(exhangesListArr);
		return [
			...exhangesListArr,
			{
				country: a,
				rate: b
			}
		]
	}
	useEffect(() => {
		const getData = async () => {
			const result = await axios.request(options).then(function (response) {
				return response.data.rates
			}).catch(function (error) {
				console.error(error);
			});
			console.log(result);
			setExchangesList(result)
			setIsLoading(false)
			for (let i in result) {
				// setExhangesListArr([
				// 	...exhangesListArr,
				// 	{
				// 		country: i,
				// 		rate: result[i]
				// 	}
				// ])
				setExhangesListArr((prev) => {
					return ([
						...prev, {
							country: i,
							rate: result[i]
						}
					])
				})
			}
		}
		getData()
	}, [])
	return (
		<>
			<Row>
				<Col span={12}>Currency Code</Col>
				<Col span={12}>Exchange Rates</Col>
			</Row>
			<Row>
				{/*exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))*/}
				{
					!isLoading && exhangesListArr.map(ele => (
						<Col span={24}>
								<Panel
									showArrow={false}
									header={(
										<Row>
											<Col span={12}>
												{ele.country}
											</Col>
											<Col span={12}>
												{ele.rate}
											</Col>
										</Row>
									)}
								>
								</Panel>
						</Col>
					))
				}
			</Row>
		</>
	);
};

export default Exchanges;