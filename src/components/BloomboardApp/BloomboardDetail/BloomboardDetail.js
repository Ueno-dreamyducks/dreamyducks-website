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
            const categoryAndPoints = { category: category.Category, points: category.Points, maxPoints: category.MaxPoints }

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
    }, [])

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
        const newAssignment = { Due: "", Assigned: "", Assignment: "Predict*", Category: e.category, Score: e.point, TotalScore: e.maxPoint, AvgScore: "---" }

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
    return (
        <div className="BBDetail-container">
            <dialog id="calc_dialog"><BBCalcDialog closeDialog={handleCloseDialog} categories={categories} onAddPredict={(e) => handleAddPredict(e)} /></dialog>
            <div className="BBDetail-top">
                <div style={{ display: "flex", width: "100%" }}>
                    <ArrowBack sx={{ fontSize: "48px", padding: "0 12px", width: "5%", cursor: "pointer" }} />
                    <h1 className="text-bold text-align-center" style={{ width: "95%" }}>{data.className}</h1>
                </div>
                <div className="BBDetail-score-board">
                    <div className="BBDetail-score-spot category">
                        <h3>Performance</h3>
                        <h2>
                            {categoriesPoints && categoriesPoints.length > 0
                                ? (categoriesPoints[0]?.points / categoriesPoints[0]?.maxPoints * 100).toFixed(2)
                                : 'No data'}
                        </h2>
                    </div>
                    <div className="BBDetail-score-spot total">
                        <h3>Summary</h3>
                        <h2>{classScore}</h2>
                    </div>
                    <div className="BBDetail-score-spot category">
                        <h3>Summative</h3>
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
                    <h3 className="text-bold" style={{ width: "40%" }}>Assignment</h3>
                    <h3 className="text-bold" style={{ width: "20%" }}>Due Date</h3>
                    <h3 className="text-bold" style={{ width: "20%" }}>Category</h3>
                    <h3 className="text-bold" style={{ width: "20%", display: "flex", justifyContent: "right" }}>Score</h3>
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
    const avgPercentScore = Number(row.AvgScore.slice(0, -1));
    const maxPoint = Number(row.TotalScore);
    const avgPointScore = (maxPoint * (avgPercentScore / 100)).toFixed(2);

    return (
        <div className="BB-row">
            <div className="BB-row-content">
                <p style={{ width: "40%" }} >{row.Assignment.slice(0, -1)}</p>
                <p style={{ width: "20%" }} >{row.Due}</p>
                <p style={{ width: "20%" }} >{row.Category}</p>
                <div style={{ width: "20%" }} className="BBDetail-row-score">
                    <p className="flex-justify-right">{row.Score ? row.Score : "---"}</p>
                    <p className="flex-justify-right margin-0" style={{ color: "var(--md-sys-color-tertiary)", fontSize: "medium" }}>Avg. {row.AvgScore}</p>
                </div>
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
                    <h2><Calculate sx={{fontSize: "2rem"}} />Predict Calculator</h2>
                    <button onClick={closeDialog}><Close sx={{fontSize:"3vw"}} /></button>
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
                    <button onClick={closeDialog}>Cancel</button>
                    <button type="submit">Add Predict</button>
                </footer>
            </form>
        </div>
    )
}