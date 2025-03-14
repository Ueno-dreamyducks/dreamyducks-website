import { useParams } from "react-router-dom";
import './Bloomboard.css';
import { ArrowBack, Calculate, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";

function BloomboardDetail() {
    const { key } = useParams();
    const data = JSON.parse(sessionStorage.getItem(key));

    const [assignments, setAssignments] = useState(data.assignments);

    const [classScore, setScore] = useState(0);

    const [categoriesPoints, setCategoriesPoints] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        let initCategoriesPoints = [];

        for (const category of data.categories) {
            const categoryAndPoints = { category: category.Category, points: Number(category.Points), maxPoints: Number(category.MaxPoints) }

            initCategoriesPoints.push(categoryAndPoints);
        }

        setCategoriesPoints(initCategoriesPoints);
        setCategories(initCategoriesPoints.map(category => category.category))
    }, []);

    useEffect(() => {
        let newClassScore = 0;
        let categoryWeightTotal = 0;
        for (const category of data.categories) {
            categoryWeightTotal += Number(category.CategoryWeight);
        }
        console.log("categoryweight total", categoryWeightTotal)

        for (const category of data.categories) {
            const points = Number(category.Points)
            const max = Number(category.MaxPoints)
            const weight = Number(category.CategoryWeight)

            const categoryScoreOf100 = points / max;

            const categoryScore = (categoryScoreOf100 * weight) / categoryWeightTotal * 100;

            newClassScore += categoryScore

            console.log(`points ${points} max ${max}, weight: ${weight}, categoryScore: ${categoryScore}`)
        }

        setScore(Number(newClassScore).toFixed(2));
    }, []);

    const handlePredictClick = () => {
        try {
            const calcDialog = document.getElementById('calc_dialog');

            calcDialog.showModal();
        } catch (err) {

        }
    }
    const handleCloseDialog = () => {
        try {
            const calcDialog = document.getElementById('calc_dialog');
            calcDialog.close();
        } catch (err) {

        }
    }

    const handleAddPredict = (e) => {
        const newAssignment = { Due: "", Assigned: "", Assignment: "Predict*", Category: e.category, Score: e.point, TotalScore: e.maxPoint, AvgScore: "---", isPrediction: true }

        console.log(e);

        const lookupCategory = categories
            .filter((category) => category === e.category)

        if (lookupCategory.length > 0) {
            console.log(lookupCategory)
            var nextCategories = categoriesPoints.map((categoryPoint, index) => {
                if (categoryPoint.category === e.category) {
                    console.log(`adding to this ${categoryPoint.category}`)
                    const newPoints = Number(categoryPoint.points) + Number(e.point);
                    const newMaxPoints = Number(categoryPoint.maxPoints) + Number(e.maxPoint);
                    return { category: e.category, points: newPoints, maxPoints: newMaxPoints }
                } else {
                    return categoryPoint;
                }
            });
            setCategoriesPoints(nextCategories);
            console.log(nextCategories);

            const newList = [
                newAssignment,
                ...assignments
            ];

            setAssignments(newList);

            let newClassScore = 0;
            let categoryWeightTotal = 0;

            let categoryWeightList = [];
            for (const category of data.categories) {
                categoryWeightTotal += Number(category.CategoryWeight);
                categoryWeightList.push(Number(category.CategoryWeight));
            }
            console.log("categoryweight total", categoryWeightTotal)

            for (/* const category of categoriesPoints */ var i = 0; i < nextCategories.length; i++) {
                const category = nextCategories[i]
                const points = Number(category.points)
                const max = Number(category.maxPoints)
                const weight = categoryWeightList[i];

                const categoryScoreOf100 = points / max;

                const categoryScore = (categoryScoreOf100 * weight) / categoryWeightTotal * 100;

                newClassScore += categoryScore

                console.log(`points ${points} max ${max}, weight: ${weight}, categoryScore: ${categoryScore}`)
            }

            setScore(Number(newClassScore).toFixed(2));
        } else {
            console.log(false)
        }
    }

    useEffect(() => {
        const cat1Grade = categoriesPoints && categoriesPoints.length > 0
            ? (categoriesPoints[0]?.points / categoriesPoints[0]?.maxPoints * 2.25).toFixed(2)
            : 0;

        const cat2Grade = categoriesPoints && categoriesPoints.length > 0
            ? (categoriesPoints[1]?.points / categoriesPoints[1]?.maxPoints * 2.25).toFixed(2)
            : 0;

        const cat1Canvas = document.getElementById("category-1-canvas");
        const cat1Ctx = cat1Canvas.getContext("2d");

        cat1Ctx.clearRect(0, 0, cat1Canvas.width, cat1Canvas.height);

        cat1Ctx.beginPath();
        cat1Ctx.lineWidth = 15;
        cat1Ctx.lineCap = 'round';
        cat1Ctx.strokeStyle = '#BDBDBD';
        cat1Ctx.arc(150, 75, 50, 40, 2.25 * Math.PI);
        cat1Ctx.stroke();

        cat1Ctx.beginPath();
        cat1Ctx.lineWidth = 15;
        cat1Ctx.lineCap = 'round';
        cat1Ctx.strokeStyle = '#1B6CB0';
        cat1Ctx.arc(150, 75, 50, 40, cat1Grade * Math.PI);
        cat1Ctx.stroke();

        cat1Ctx.closePath();

        const summaryCanvas = document.getElementById("summaryCanvas");
        const summaryCtx = summaryCanvas.getContext("2d");

        summaryCtx.clearRect(0, 0, summaryCanvas.width, summaryCanvas.height);

        summaryCtx.beginPath();
        summaryCtx.lineWidth = 20;
        summaryCtx.lineCap = 'round';
        summaryCtx.strokeStyle = '#BDBDBD';
        summaryCtx.arc(150, 75, 60, 40, 2.25 * Math.PI);
        summaryCtx.stroke();

        summaryCtx.beginPath();
        summaryCtx.lineWidth = 20;
        summaryCtx.lineCap = 'round';
        summaryCtx.strokeStyle = '#1B6CB0';
        summaryCtx.arc(150, 75, 60, 40, ((classScore * 2.25) / 100) * Math.PI);
        summaryCtx.stroke();

        summaryCtx.closePath();

        const cat2Canvas = document.getElementById("category-2-canvas");
        const cat2Ctx = cat2Canvas.getContext("2d");

        cat2Ctx.clearRect(0, 0, cat2Canvas.width, cat2Canvas.height);

        cat2Ctx.beginPath();
        cat2Ctx.lineWidth = 15;
        cat2Ctx.lineCap = 'round';
        cat2Ctx.strokeStyle = '#BDBDBD';
        cat2Ctx.arc(150, 75, 50, 40, 2.25 * Math.PI);
        cat2Ctx.stroke();

        cat2Ctx.beginPath();
        cat2Ctx.lineWidth = 15;
        cat2Ctx.lineCap = 'round';
        cat2Ctx.strokeStyle = '#1B6CB0';
        cat2Ctx.arc(150, 75, 50, 40, cat2Grade * Math.PI);
        cat2Ctx.stroke();

        cat2Ctx.closePath();
    }, [classScore]);

    return (
        <div className="BBDetail-container">
            <dialog id="calc_dialog"><BBCalcDialog closeDialog={handleCloseDialog} categories={categories} onAddPredict={(e) => handleAddPredict(e)} /></dialog>
            <div className="BBDetail-top">
                <div style={{ display: "flex", width: "100%" }}>
                    <ArrowBack onClick={() => { window.location.href = '/Bloomboard/classlist' }} sx={{ fontSize: "48px", padding: "0 12px", width: "5%", cursor: "pointer" }} />
                    <h1 className="text-bold text-align-center" style={{ width: "95%" }}>{data.className}</h1>
                </div>
                <div className="BBDetail-grade-summary">
                    <div>
                        <h3>Performance</h3>
                        <canvas id='category-1-canvas' />
                        <h2>
                            {categoriesPoints && categoriesPoints.length > 0
                                ? (categoriesPoints[0]?.points / categoriesPoints[0]?.maxPoints * 100).toFixed(2)
                                : 'No data'}
                        </h2>
                    </div>
                    <div>
                        <canvas id='summaryCanvas' />
                        <h1 className="text-bold">{classScore}</h1>
                    </div>
                    <div>
                        <h3>Summative</h3>
                        <canvas id='category-2-canvas' />
                        <h2>
                            {categoriesPoints && categoriesPoints.length > 0
                                ? (categoriesPoints[1]?.points / categoriesPoints[1]?.maxPoints * 100).toFixed(2)
                                : 'No data'}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="BBDetail-body">
                <div className="BBDetail-body-header">
                    <h3 className="text-bold padding-horizontal-16" >Assignment</h3>
                    <h3 className="text-bold" >Due Date</h3>
                    <h3 className="text-bold" >Category</h3>
                    <h3 className="text-bold padding-horizontal-16" style={{marginLeft:"auto"}} >Score</h3>
                </div>
                <div className="BBDetail-body-calc cursor-pointer" onClick={handlePredictClick}>
                    <Calculate sx={{ fontSize: "36px" }} />
                    <h3 className="text-bold">Predict Your Grade</h3>
                </div>
                {assignments.map((assignment, index) => (
                    <BBDetail key={index} row={assignment} />
                ))}
            </div>
        </div>
    )
}

export default BloomboardDetail;

function BBDetail({ row }) {
    return (
        <div className="BB-row">
            <div className={`BB-row-content ${row.isPrediction ? 'Prediction-cell' : ""}`}>
                <p>{row.Assignment.slice(0, -1)}</p>
                <p>{row.Due}</p>
                <p>{row.Category}</p>
                <div className="BBDetail-row-score">
                    <p className="flex-justify-right">{row.Score ? row.Score : "---"}</p>
                    <p className="flex-justify-right margin-0" style={{ color: "var(--md-sys-color-tertiary)", fontSize: "medium" }}>Avg. {row.AvgScore}</p>
                </div>
                <Close sx={{ placeSelf: "center", visibility: 'hidden' }} />
            </div>
        </div>
    )
}

function BBCalcDialog({ closeDialog, categories, onAddPredict }) {
    const [element, setElement] = useState({ category: categories && categories.length > 0 ? categories[0] : "N/A" });
    let categoriesOptions = ["Select category"];

    if (Array.isArray(categories)) {
        categoriesOptions = ["Select category", ...categories];
    }

    const handleCategoryChange = (e) => {
        console.log(`selected new category: ${e.target.value}`)
        setElement({
            ...element,
            category: e.target.value
        });
    }
    const handlePointChange = (e) => {
        setElement({
            ...element,
            point: e.target.value
        });
    }
    const handleMaxPointChange = (e) => {
        setElement({
            ...element,
            maxPoint: e.target.value
        });
    }

    const handleSubmit = () => {
        onAddPredict(element);
        closeDialog();
    }
    return (
        <div className="BBCalcDialog">
            <form action={handleSubmit} autoComplete="off">
                <header>
                    <h2><Calculate sx={{ fontSize: "2rem" }} />Predict Calc (slang for calculator)</h2>
                    <button onClick={closeDialog}><Close sx={{ fontSize: "3vw" }} /></button>
                </header>
                <div>
                    <div>
                        <h4>Category</h4>
                        <select name='category' className="" onChange={handleCategoryChange} value={element.category}>
                            {categoriesOptions?.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h4>Exceptation point</h4>
                        <input className="" placeholder="Predict point" name="point" required onChange={handlePointChange} value={element.point} />
                    </div>
                    <div>
                        <h4>Max possible point</h4>
                        <input className="" autoComplete="off" placeholder="Max possible point" name="maxPoint" required onChange={handleMaxPointChange} value={element.maxPoint} />
                    </div>
                </div>
                <footer>
                    <button type="button" onClick={closeDialog}>Cancel</button>
                    <button type="submit">Add Predict</button>
                </footer>
            </form>
        </div>
    )
}