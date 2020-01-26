var blankElePos = 0,
    eleWidth = 0,
    eleHeight = 0,
    n = 0,
    cWidth = 0,
    totalLen = 0,
    totalMoves = 0,
    timeVar;

function tileCreation(r, c) {
    var totalSec = 0;
    for (let i = 0; i < document.getElementsByClassName('btn-click').length; i++) {
        document.getElementsByClassName('btn-click')[i].classList.remove('active');
    }
    event.target.classList.add('active');
    totalMoves = 0;
    clearInterval(timeVar);
    document.getElementsByClassName('moves')[0].innerHTML = totalMoves;
    document.getElementsByClassName('lyt-label-value')[0].classList.add('active');
    document.getElementsByClassName('title')[0].classList.remove('active');
    document.getElementsByClassName('list')[0].classList.add('active');
    document.getElementsByClassName('acknowledge')[0].classList.remove('active');
    document.getElementsByClassName('list')[0].classList.remove('complete');
    n = r;
    var targetEle = document.getElementsByClassName('list');
    if (document.getElementsByClassName('tile-item').length !== 0) {
        targetEle[0].querySelectorAll('*').forEach(n => n.remove());
    }
    totalLen = r * c;
    var arr = [];
    while (arr.length < totalLen) {
        var num = Math.floor(Math.random() * 100);
        if (arr.indexOf(num) === -1) {
            arr.push(num);
        }
    }
    eleWidth = 100 / r;
    blankElePos = Math.floor(Math.random() * totalLen);
    if (isSolvable(arr, blankElePos) === true) {
        for (let i = 0; i < totalLen; i++) {
            if (i === blankElePos) {
                var tileEle = document.createElement('li');
                tileEle.setAttribute('class', 'tile-item');
                targetEle[0].appendChild(tileEle);
                tileEle.style.width = eleWidth + '%';
                tileEle.style.left = 0;
                tileEle.style.top = 0;
            } else {
                var tileEle = document.createElement('li');
                tileEle.setAttribute('class', 'tile-item');
                tileEle.setAttribute('data-index', i);
                tileEle.innerHTML = "<div class='tile'></div>";
                targetEle[0].appendChild(tileEle);
                tileEle.style.width = eleWidth + '%';
                tileEle.style.left = 0;
                tileEle.style.top = 0;
                tileEle.lastChild.innerHTML = arr[i];
                tileEle.addEventListener('click', moveTile);
                eleHeight = tileEle.clientHeight;
            }
        }
        cWidth = document.getElementsByClassName('tile-item')[0].clientWidth;
        timeVar = setInterval(timerCount, 1000);

        function timerCount() {
            ++totalSec;
            var hour = Math.floor(totalSec / 3600);
            var min = Math.floor((totalSec - hour * 3600) / 60);
            var sec = totalSec - (hour * 3600 + min * 60);
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            document.getElementsByClassName('hours')[0].innerHTML = hour;
            document.getElementsByClassName('min')[0].innerHTML = min;
            document.getElementsByClassName('sec')[0].innerHTML = sec;
        }
    } else {
        tileCreation(r, c);
    }
}

function isSolvable(arr, blankElePos) {
    var totIversion = 0;
    var boxCount = Math.sqrt(totalLen);
    for (let i = 0; i < totalLen - 1; i++) {
        if (i === blankElePos) {
            continue;
        }
        for (let j = i + 1; j < totalLen; j++) {
            if (j === blankElePos) {
                continue;
            }
            if (arr[i] > arr[j]) {
                totIversion++;
            }
        }
    }
    if (totalLen % 2 !== 0 && totIversion % 2 === 0) {
        return true;
    } else if (totalLen % 2 === 0) {
        var temp = (boxCount - 1) - Math.floor(blankElePos / boxCount);
        if (temp % 2 === 0 && totIversion % 2 === 0) {
            return true
        } else if (temp % 2 !== 0 && totIversion % 2 !== 0) {
            return true;
        } else {
            return false
        }
    } else {
        return false
    }
}

function moveTile(e) {
    var temp = 0;
    var index = Number(e.currentTarget.getAttribute('data-index'));
    if (index == blankElePos - n) {
        totalMoves++;
        e.currentTarget.style.top = parseInt(e.currentTarget.style.top) + eleHeight;
        e.currentTarget.style.zIndex = "1";
        temp = index;
        index = blankElePos;
        blankElePos = temp;
        e.currentTarget.setAttribute('data-index', index);
    } else if (index == blankElePos + n) {
        totalMoves++;
        e.currentTarget.style.top = parseInt(e.currentTarget.style.top) - eleHeight;
        e.currentTarget.style.zIndex = "1";
        temp = index;
        index = blankElePos;
        blankElePos = temp;
        e.currentTarget.setAttribute('data-index', index);
    } else if (index == blankElePos + 1 && index % n !== 0) {
        totalMoves++;
        e.currentTarget.style.left = parseInt(e.currentTarget.style.left) - cWidth;
        e.currentTarget.style.zIndex = "1";
        temp = index;
        index = blankElePos;
        blankElePos = temp;
        e.currentTarget.setAttribute('data-index', index);
    } else if (index == blankElePos - 1 && index % n !== n - 1) {
        totalMoves++;
        e.currentTarget.style.left = parseInt(e.currentTarget.style.left) + cWidth;
        e.currentTarget.style.zIndex = "1";
        temp = index;
        index = blankElePos;
        blankElePos = temp;
        e.currentTarget.setAttribute('data-index', index);
    }
    document.getElementsByClassName('moves')[0].innerHTML = totalMoves;
    resultCheck();
}

function resultCheck() {
    var flag = false;
    for (let i = 0; i < totalLen - 1; i++) {
        if (document.querySelectorAll("[data-index='" + i + "']").length == 0) {
            return 0;
        } else if (i < totalLen - 2) {
            if (document.querySelectorAll("[data-index='" + (i + 1) + "']")[0] === undefined) {
                return 0;
            }
            if (parseInt(document.querySelectorAll("[data-index='" + i + "']")[0].innerText) < parseInt(document.querySelectorAll("[data-index='" + (i + 1) + "']")[0].innerText)) {
                flag = true;
            } else {
                flag = false;
                return 0;
            }
        }
    }
    if (flag === true) {
        totalMoves = 0;
        clearInterval(timeVar);
        document.getElementsByClassName('acknowledge')[0].classList.add('active');
        document.getElementsByClassName('list')[0].classList.add('complete');
    }
}

window.addEventListener('load', function() {
    document.getElementsByClassName('title')[0].classList.add('active');
})