import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Chart } from 'primereact/chart';

export default function Nutrition() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const fetchNutritionData = async () => {
        if (!query) {
            setError("Please enter a search term.");
            return;
        }

        const url = `https://api.edamam.com/api/nutrition-data?app_id=adb5c32e&app_key=4bef341bb9456d0b0e0c35c6eea5042e&nutrition-type=logging&ingr=${encodeURIComponent(query)}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            if (!data.calories && !data.totalNutrients) {
                setError("No nutrition data found for the entered food item.");
                return;
            }

            const documentStyle = getComputedStyle(document.documentElement);
            const chartData = {
                labels: ["Protein", "Carbs", "Fat"],
                datasets: [
                    {
                        data: [
                            data.totalNutrients.PROCNT ? data.totalNutrients.PROCNT.quantity : 0,
                            data.totalNutrients.CHOCDF ? data.totalNutrients.CHOCDF.quantity : 0,
                            data.totalNutrients.FAT ? data.totalNutrients.FAT.quantity : 0
                        ],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--blue-500'),
                            documentStyle.getPropertyValue('--yellow-500'),
                            documentStyle.getPropertyValue('--green-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--blue-400'),
                            documentStyle.getPropertyValue('--yellow-400'),
                            documentStyle.getPropertyValue('--green-400')
                        ]
                    }
                ]
            };
            const chartOptions = {
                cutout: '60%'
            };

            setChartData(chartData);
            setChartOptions(chartOptions);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch nutrition data.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchNutritionData();
    };

    return (
        <div className="container-fluid nut overflow-y-auto" style={{ height: "100vh" }}>
            <Link to={"/memberDashBoard"}><button className="btn btn-dark m-2">Back</button></Link>
            <div className="d-flex flex-column align-items-center">
                <h2 className="col-4 text-center m-4 text-light" style={{ backgroundColor: "#141E46" }}>Food Diet Search</h2>
                <form className="col-md-6 d-flex" role="search" onSubmit={handleSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-pill" type="submit">Search</button>
                </form>
                {error && <div className="alert alert-danger col-8">{error}</div>}
            </div>
            {chartData.datasets && chartData.datasets.length > 0 && (
                <div className="container mt-4 h-auto">
                    <div className="card flex justify-content-center">
                        <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                    </div>
                </div>
            )}
        </div>
    );
}
