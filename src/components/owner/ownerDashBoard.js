import React, { useState, useEffect } from 'react';
import Navbar1 from './navbar1';
import useFetch from './useFetch';
import { useOwner } from './useOwner';
import { Chart } from 'primereact/chart';
import axios from '../../utils/axios';

export default function OwnerDashBoard() {
    const { data } = useFetch();
    const { detail } = useOwner();
   
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [total, setTotal] = useState(0);

    // Set total number of members when gym detail is available
    useEffect(() => {
        if (detail?.gym?.members?.length) {
            setTotal(detail.gym.members.length);
        }
    }, [detail]);

    // Fetch gender data when members data is available
    useEffect(() => {
        const fetchGenderData = async () => {
            try {
                const response = await axios.get(`/gender`, {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                });
                
                const totalMale = response.data.totalMale;
                const totalFemale = response.data.totalFemale;

                // Calculate percentages
                const malePercentage = (totalMale / total) * 100;
                const femalePercentage = (totalFemale / total) * 100;

                const data = {
                    labels: ['Total Members', 'Male', 'Female'],
                    datasets: [
                        {
                            label: 'Count / Percentage',
                            data: [total, malePercentage.toFixed(2), femalePercentage.toFixed(2)],
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.2)', // Total members color
                                'rgba(54, 162, 235, 0.2)', // Male members color
                                'rgba(255, 99, 132, 0.2)' // Female members color
                            ],
                            borderColor: [
                                'rgb(255, 159, 64)', // Total members border color
                                'rgb(54, 162, 235)', // Male members border color
                                'rgb(255, 99, 132)' // Female members border color
                            ],
                            borderWidth: 1
                        }
                    ]
                };

                const options = {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: Math.max(total, 100) // Set max to the greater of total or 100 for percentages
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    if (context.label === 'Total Members') {
                                        return context.raw + ' members';
                                    }
                                    return context.raw + '%';
                                }
                            }
                        }
                    }
                };
        
                setChartData(data);
                setChartOptions(options);
               
            } catch (error) {
                console.error('Error fetching gender data:', error);
            }
        };

       
            fetchGenderData();
      
    }, [total]);

    return (
        <div className="fitclub">
            <Navbar1 />
            <div className="container-fluid p-0 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="card" style={{ width: '80%', maxWidth: '600px' }}>
                    <Chart type="bar" data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}
