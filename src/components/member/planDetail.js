import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardTitle, Progress } from 'reactstrap';
import axios from '../../utils/axios';
import moment from 'moment';
import { UilBackspace } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import Loading from '../../loading';
import { Tooltip } from 'primereact/tooltip';
const PlanDetail = () => {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const[type,setType]=useState(null)
    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true)
                const res = await axios.get("/planDetail", {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                setLoading(false)
                setDetail(res.data.result);
                console.log(res.data)
                setType(res.data.plan[0]);
            } catch (err) {
                console.log(err);
                setLoading(false)
            }

        };
        fetch();
    }, []);

    const calculateProgress = (start, end) => {
        const startDate = moment(start);
        const endDate = moment(end);
        if (!startDate.isValid() || !endDate.isValid()) return 0;
        const today = moment();
        const totalDuration = endDate.diff(startDate, 'days');
        const passedDuration = today.diff(startDate, 'days');
        return (passedDuration / totalDuration) * 100;
    };

    if (loading) {
        return (<Loading />);
    }

    const newdate = new Date(detail?.start);
    const startDate = moment(newdate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
    const endDate = moment(detail?.end, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
    const progressValue = startDate.isValid() && endDate.isValid() ? calculateProgress(startDate, endDate) : 0;

    return (
        <div className='container-fluid plan'>
            <Link to="/memberDashBoard" className='col-1 m-3 btn'>
                <UilBackspace size="40" color="#F6F1EE" />
            </Link>
            <Row className='justify-content-center'>
                <Col sm="6">
                    <Card body style={{ backgroundColor: "#021526", color: "white" }}>
                       
                      
                                <CardTitle>
                                    <h1 className='d-flex justify-content-between'>
                                       {detail?.duration} {detail?.duration?(<span><Badge value="active" severity="success"></Badge></span>):(<span><Badge value="inactive" severity="danger"></Badge></span>)}
                                        
                                    </h1>
                                    <p>MONTHS</p>
                                    <Badge value={type?.subscriptionType} severity="success"></Badge>
                                    <h2>{detail?.subscriptionType}</h2>
                                    <h3>{detail?.gymId?.gymName}</h3>
                                    <p>
                                        Start Date: {startDate.isValid() ? startDate.format('MMMM Do YYYY') : 'N/A'}
                                    </p>
                                    <p>
                                        End Date: {endDate.isValid() ? endDate.format('MMMM Do YYYY') : 'N/A'}
                                    </p>
                                </CardTitle>
                                <Progress color="success" value={progressValue}>
                                    {progressValue.toFixed(0)}%
                                </Progress>
               
            <Tooltip target=".custom-target-icon" />
{console.log(type)}
<i className="custom-target-icon pi pi-info-circle p-text-secondary p-overlay-badge m-2"
    data-pr-tooltip={type?.benefits ? `BENEFITS:\n${type?.benefits.join('\n')}` : 'No benefits available'}
    data-pr-position="right"
    data-pr-at="right+5 top"
    data-pr-my="left center-2"
    style={{ fontSize: '1rem', cursor: 'pointer',color: 'yellow' }}>
    
</i>
           
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PlanDetail;
