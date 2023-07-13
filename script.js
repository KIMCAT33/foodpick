let calibrationPoints = [
    {x: 0.25, y: 0.25},
    {x: 0.75, y: 0.25},
    {x: 0.5, y: 0.5},
    {x: 0.25, y: 0.75},
    {x: 0.75, y: 0.75}
];
let currentPoint = 0;

let foodPairs = [
    ['images/food1.jpeg', 'images/food2.jpeg'],
    //... add more pairs
];
let currentPair = 0;
let counts = {};

function startCalibration() {
    calibration = true;
    document.getElementById('calibration').style.display = 'none';
    showCalibrationPoint();
}

function showCalibrationPoint() {
    if (currentPoint >= calibrationPoints.length) {
        // finished calibration
        calibration = false;
        document.getElementById('game').style.display = 'flex';
        document.getElementById('next').style.display = 'block';
        nextPair();
    } else {
        let point = calibrationPoints[currentPoint];
        let x = point.x * window.innerWidth;
        let y = point.y * window.innerHeight;

        // show a visual marker at (x, y)

        webgazer.setGazeListener(function(data, elapsedTime) {
            if (data == null || !calibration) {
                return;
            }
        
            let xprediction = data.x;
            let yprediction = data.y;
        
            let elementUnderGaze = document.elementFromPoint(xprediction, yprediction);
        
            if (elementUnderGaze.classList.contains('food')) {
                // increment the counter for the food element
                let counter = elementUnderGaze.querySelector('.counter');
                let currentCount = parseInt(counter.innerText);
                counter.innerText = (currentCount + 1).toString();
            }
        
            // calculate distance between prediction and actual point
        
            if (/* distance is small enough */) {
                currentPoint++;
                showCalibrationPoint();
            }
        }).begin();
        
    }
}

function nextPair() {
    if (currentPair >= foodPairs.length) {
        document.getElementById('game').style.display = 'none';
        document.getElementById('next').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        showResults();
    } else {
        let pair = foodPairs[currentPair];
        document.getElementById('food1').querySelector('img').src = pair[0];
        document.getElementById('food2').querySelector('img').src = pair[1];
        document.getElementById('food1').querySelector('.counter').innerText = '0';
        document.getElementById('food2').querySelector('.counter').innerText = '0';
        currentPair++;
    }
}

function showResults() {
    // display results on a chart using a library like Chart.js
}
