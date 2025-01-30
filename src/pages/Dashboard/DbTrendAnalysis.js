import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const InstagramAnalysis = () => {
    const [profile, setProfile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const analysisRef = useRef(null); // Store last stable data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await axios.get("http://127.0.0.1:5000/profile");
                const mediaRes = await axios.get("http://127.0.0.1:5000/media");
                const analysisRes = await axios.post("http://127.0.0.1:5000/analyze", mediaRes.data);

                setProfile(profileRes.data);
                setAnalysis(analysisRes.data);
                analysisRef.current = analysisRes.data; // Store stable data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Run only once on mount

    // Use last available data to prevent flashing
    const stableAnalysis = analysis || analysisRef.current;

    if (!profile || !stableAnalysis) return <div>Loading...</div>;

    // Bar Chart Data for Engagement
    const barChartData = {
        labels: ["Average Likes", "Average Comments"],
        datasets: [
            {
                label: "Engagement",
                data: [stableAnalysis.avg_likes, stableAnalysis.avg_comments],
                backgroundColor: ["#4CAF50", "#FF9800"],
            },
        ],
    };

    // Pie Chart Data for Word Frequency
    const pieChartData = {
        labels: Object.keys(stableAnalysis.word_freq),
        datasets: [
            {
                label: "Word Frequency",
                data: Object.values(stableAnalysis.word_freq),
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800",
                    "#9C27B0", "#00BCD4", "#8BC34A", "#E91E63", "#795548"
                ],
            },
        ],
    };

    // Line Chart Data for Sentiment Analysis
    const lineChartData = {
        labels: Array.from({ length: stableAnalysis.avg_sentiment.length }, (_, i) => `Post ${i + 1}`),
        datasets: [
            {
                label: "Sentiment Polarity",
                data: stableAnalysis.avg_sentiment,
                borderColor: "#36A2EB",
                fill: false,
            },
        ],
    };

    // Pie Chart Data for Content Types
    const contentTypesData = {
        labels: Object.keys(stableAnalysis.content_types),
        datasets: [
            {
                label: "Content Types",
                data: Object.values(stableAnalysis.content_types),
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"
                ],
            },
        ],
    };

    // Pie Chart Data for Sentiment Categories
    const sentimentCategoriesData = {
        labels: Object.keys(stableAnalysis.sentiment_categories),
        datasets: [
            {
                label: "Sentiment Categories",
                data: Object.values(stableAnalysis.sentiment_categories),
                backgroundColor: [
                    "#66b3ff", "#99ff99", "#ff9999"
                ],
            },
        ],
    };

    // Pie Chart Data for Top Hashtags
    const topHashtagsData = {
        labels: Object.keys(stableAnalysis.top_hashtags),
        datasets: [
            {
                label: "Top Hashtags",
                data: Object.values(stableAnalysis.top_hashtags),
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"
                ],
            },
        ],
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ color: "#333" }}>{profile.username}</h1>
            <p style={{ color: "#666" }}>Media Count: {profile.media_count}</p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", marginTop: "20px" }}>
                {/* Bar Chart */}
                <div style={{ width: "45%", marginBottom: "20px", height: "300px" }}>
                    <h2 style={{ color: "#333" }}>Engagement Analysis</h2>
                    <Bar
                        data={barChartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: true },
                                title: { display: false },
                            },
                        }}
                    />
                </div>

                {/* Pie Chart */}
                <div style={{ width: "45%", marginBottom: "20px", height: "300px" }}>
                    <h2 style={{ color: "#333" }}>Most Common Words</h2>
                    <Pie
                        data={pieChartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: true },
                                title: { display: false },
                            },
                        }}
                    />
                </div>

                {/* Line Chart */}
                <div style={{ width: "90%", marginBottom: "20px", height: "300px" }}>
                    <h2 style={{ color: "#333" }}>Sentiment Analysis</h2>
                    <Line
                        data={lineChartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: true },
                                title: { display: false },
                            },
                        }}
                    />
                </div>

                {/* Pie Chart for Content Types */}
                <div style={{ width: "45%", marginBottom: "20px", height: "300px" }}>
                    <h2 style={{ color: "#333" }}>Content Type Distribution</h2>
                    <Pie
                        data={contentTypesData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: true },
                                title: { display: false },
                            },
                        }}
                    />
                </div>

                {/* Pie Chart for Sentiment Categories */}
                <div style={{ width: "45%", marginBottom: "20px", height: "300px" }}>
                    <h2 style={{ color: "#333" }}>Sentiment Category Distribution</h2>
                    <Pie
                        data={sentimentCategoriesData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: true },
                                title: { display: false },
                            },
                        }}
                    />
                </div>

                {/* Pie Chart for Top Hashtags */}
                <div style={{ width: "45%", marginBottom: "20px", height: "300px" }}>
                    <h2 style={{ color: "#333" }}>Top Hashtags Distribution</h2>
                    <Pie
                        data={topHashtagsData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: true },
                                title: { display: false },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Most Liked Post */}
            <div style={{ marginTop: "20px" }}>
                <h3 style={{ color: "#333" }}>Most Liked Post</h3>
                <p style={{ color: "#666", fontStyle: "italic" }}>{stableAnalysis.most_liked_post.caption || "No caption"}</p>
            </div>
        </div>
    );
};

export default InstagramAnalysis;