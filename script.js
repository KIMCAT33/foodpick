let calibration = false;
let calibrationCounter = 0;
let foodPairs = [
    ['images/food1.jpg', 'images/food2.jpg'],
    //... add more pairs
];
let currentPair = 0;
let counts = {};

function startCalibration() {
    calibration = true;
    document.getElementById('calibration').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
    document.getElementById('next').style.display = 'block';

    webgazer.setGazeListener(function(data, elapsedTime) {
        if (data == null) {
            return;
        }
        let xprediction = data.x; //these x coordinates are relative to the viewport 
        let yprediction = data.y; //these y coordinates are relative to the viewport
        console.log(xprediction, yprediction); // check the console to see where you're looking!

        // ... actual calibration process
    }).begin();
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
