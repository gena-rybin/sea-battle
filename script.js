
window.onload  = function () {


    var body = document.body;
    var	h1 = document.createElement('h1');
    var	h2 = document.createElement('h2');
    var div = document.createElement('div');
    var buttonRun = document.createElement('button');

    var wrapper = document.getElementsByClassName('wrapper');
    var cover = document.getElementsByClassName('cover')[0];
    var gameRows = document.getElementsByClassName('gameRows');
    var gameRow = document.getElementsByClassName('gameRow');
    var gameCell = document.getElementsByClassName('gameCell');
    var height = 10;
    var width = 10;
    var data = [];
    var x=0;
    var y=0;
    var shipLength = 0;
    var horiz;


    //style settings
    htmlA = "<style>";
    htmlB = ".wrapper {display: inline-block;}";
    htmlC = "</style>";




    // element constructor
    h1.innerHTML = '#06 task';
    h2.innerHTML = 'Морской бой';

    var divWrapper = div.cloneNode(false)
    divWrapper.className = 'wrapper';

    var divCover = div.cloneNode(false);
    divCover.className = 'cover';

    var divGameRows = div.cloneNode(false);
    divGameRows.className = 'gameRows';

    var divGameRow = div.cloneNode(false);
    divGameRow.className = 'gameRow';

    var divGameCell = div.cloneNode(false);
    divGameCell.className = 'gameCell';
    divGameCell.classList.add("free");



    var divControl = div.cloneNode(false);
    divControl.className = 'control';

    var divHarbor = div.cloneNode(false);
    divHarbor.className = 'harbor';

    var divShips = div.cloneNode(false);
    divShips.className = 'ships';

    var divShip = div.cloneNode(false);
    divShip.className = 'ship';

    var divShipCell = div.cloneNode(false);
    divShipCell.classList.add("shipCell");


    buttonRun.innerText = 'Начать игру';
    buttonRun.classList.add('disabled');



// page loading
    body.insertAdjacentHTML("afterBegin", htmlA+htmlB+htmlC); //add my js-<styles> to index.html
    body.appendChild(h1);
    body.appendChild(h2);
    body.appendChild(divWrapper);
    divWrapper.appendChild(divCover);
    makeGameData(height,width);
    makeGameField(height,width);
    body.appendChild(divWrapper.cloneNode(false));
    document.getElementsByClassName('wrapper')[1].appendChild(divControl);
    makeGameControl();
    divControl.appendChild(buttonRun);


    // making Data-array
    function makeGameData(height,width) {
        // create empty array
        data = [];
        for(var i=0; i<height; i++){
            data[i] = [];
            for(var j=0; j<width; j++){
                data[i][j] = 0;// -
            }
        }
        console.table( data );
    }


    // makes game field
    function makeGameField(height, width) {
        for (var i=1; i<=height; i++) {
            divGameRow = divGameRow.cloneNode(false);
            divGameRows.appendChild(divGameRow);
            for (var j=1; j<=width; j++) {
                divGameCell = divGameCell.cloneNode(false);
                divGameRow.appendChild(divGameCell);
            }
        }
        divCover.appendChild(divGameRows);
    }


    // makes ships for posing at the game'field
    function makeGameControl() {
        for (var i=1; i<=4; i++) {
            divShips = divShips.cloneNode(false);
            divHarbor.appendChild(divShips);
            for (var j=1; j<=i; j++) {
                divShip = divShip.cloneNode(false);
                    for (var cell=5-i; cell>=1; cell--) {
                        divShipCell = divShipCell.cloneNode(false);
                        divShip.appendChild(divShipCell);
                    }
                divShips.appendChild(divShip);
            }
            divHarbor.appendChild(divShips);
        }
        divControl.appendChild(divHarbor);
    }


    // gets the position of the clicked cell
    function getPosition() {
        event.target.parentNode.childNodes.forEach(function(item, i) {
            if (item === event.target) {
                x = i;
            }
        });
        event.target.parentNode.parentNode.childNodes.forEach(function(item, index) {
            if (item === event.target.parentNode) {
                y = index;
            }
        });
        //console.log('hovered: строка='+y+', ячейка='+x);
    }


    divCover.onmouseover = function(event) {
        getPosition();
        var cell = event.target;
        if (horiz==true  && checkFreeCell() && checkNeighborShips()) {
            for (var i=0; i<shipLength; i++) {
                    divGameRows.childNodes[y].childNodes[x+i].classList.add("hover");
            }
        }
        if (horiz==false  && checkFreeCell() && checkNeighborShips()) {
            for (var i = 0; i < shipLength; i++) {
                    divGameRows.childNodes[y + i].childNodes[x].classList.add("hover");
            }
        }
    }


    function checkFreeCell() {
        if (data[y][x] == 0) {
            if (shipLength==4) {
                if (horiz==true
                    && data[y][x+shipLength-1]==0
                    && data[y][x+shipLength-2]==0
                    && data[y][x+shipLength-3]==0) {
                    return true;
                }
                if (horiz==false
                    && data[y + shipLength -1]
                    && data[y + shipLength -1][x]==0
                    && data[y + shipLength -2][x]==0
                    && data[y + shipLength -3][x]==0) {
                    return true;
                }
            }
            if (shipLength==3) {
                if (horiz==true
                    && data[y][x+shipLength-1]==0
                    && data[y][x+shipLength-2]==0) {
                    return true;
                }
                if (horiz==false
                    && data[y + shipLength -1]
                    && data[y + shipLength -1][x]==0
                    && data[y + shipLength -2][x]==0) {
                    return true;
                }
            }
            if (shipLength==2) {
                if (horiz==true
                    && data[y][x+shipLength-1]==0
                    && data[y][x+shipLength-2]==0) {
                    return true;
                }
                if (horiz==false
                    && data[y + shipLength -1]
                    && data[y + shipLength -1][x]==0
                    && data[y + shipLength -2][x]==0) {
                    return true;
                }
            }
            if (shipLength==1)     return true;
            return false;
        }
        return false;
    }


    divCover.onmouseout = function(event) {
        var cell = event.target;
        cell.classList.remove("hover");
        if (horiz==true) {
            for (var i=1; i<shipLength; i++) {
                if (divGameRows.childNodes[y].childNodes[x+i]) {
                    divGameRows.childNodes[y].childNodes[x+i].classList.remove("hover");
                }
            }
        }
        if (horiz==false) {
            for (var i=1; i<shipLength; i++) {
                if (divGameRows.childNodes[y+i]) {
                    divGameRows.childNodes[y+i].childNodes[x].classList.remove("hover");
                }
            }
        }
    }

    // choose ship to set on the game's field
    divControl.addEventListener("click", arrangeShips);
    function arrangeShips(event) {
        removeClassFromAllCells(divHarbor, 'checked');
        var shipActive = event.target.parentNode;
        if (shipActive.classList.contains('ship')) {    // ship checking
            shipLength = shipActive.childNodes.length;
            shipActive.classList.add('checked');
            if (shipActive.classList.contains('horizontal')) {
                shipActive.classList.remove('horizontal');
                shipActive.classList.add('vertical');
                horiz=false;
            } else {
                shipActive.classList.add('horizontal');
                shipActive.classList.remove('vertical');
                horiz=true;
            }
        }
    }

    function removeClassFromAllCells(parentDiv, name) {
        for (var i = 0; i<parentDiv.childNodes.length; i++) {
            for (var j = 0; j<parentDiv.childNodes[i].childNodes.length; j++) {
                if (parentDiv.childNodes[i].childNodes[j].classList.contains(name)) {
                    parentDiv.childNodes[i].childNodes[j].classList.remove(name);
                }
            }
        }
    }


    // set ship on the game's field
    divCover.addEventListener("click", putShip);
    function putShip(event) {
        var cell = event.target;
        if ( horiz==true
            && checkFreeCell()
            && checkNeighborShips()
            && checkAvailableShip(shipLength)) {
                for (var i=0; i<shipLength; i++) {
                    data[y][x+i] = shipLength;
                    showShipsOnTheField();
                }
        }
        if ( horiz==false
            && checkFreeCell()
            && checkNeighborShips()
            && checkAvailableShip(shipLength)) {
                for (var i = 0; i < shipLength; i++) {
                    data[y + i][x] = shipLength;
                    showShipsOnTheField();
                }
        }
        console.table(data);
        if (!checkAvailableShip(shipLength)) {  // no free ships of selected type
            divHarbor.childNodes[4-shipLength].classList.add('disabled');
            divCover.classList.remove('hover');
            showShipsOnTheField();
        }
        if (!checkAvailableShip(1)              // no free ships
            && !checkAvailableShip(2)
            && !checkAvailableShip(3)
            && !checkAvailableShip(4)) {
                divHarbor.classList.add("disabled");
                buttonRun.classList.remove('disabled');
        }


    }

    
    function showShipsOnTheField() {
        for(var i=0; i<height; i++){
            for(var j=0; j<width; j++){
                if (data[i][j] != 0) {
                    divGameRows.childNodes[i].childNodes[j].classList.add("ship-ready");
                    divGameRows.childNodes[i].childNodes[j].classList.remove("free");
                }
            }
        }
    }


    function checkNeighborShips() {
        if (checkCell(y, x)) {
            if (shipLength == 4) {
                if (horiz == true
                    && checkCell(y, x + 1)
                    && checkCell(y, x + 2)
                    && checkCell(y, x + 3))  {
                    return true;
                }
                if (horiz == false
                    && data[y + 3]
                    && checkCell(y + 1, x)
                    && checkCell(y + 2, x)
                    && checkCell(y + 3, x)) {
                    return true;
                }
            }
            if (shipLength == 3) {
                if (horiz == true
                    && checkCell(y, x + 1)
                    && checkCell(y, x + 2)) {
                    return true;
                }
                if (horiz == false
                    && data[y + 2]
                    && checkCell(y + 1, x)
                    && checkCell(y + 2, x)) {
                    return true;
                }
            }
            if (shipLength == 2) {
                if (horiz == true
                    && checkCell(y, x + 1)) {
                    return true;
                }
                if (horiz == false
                    && data[y + 1]
                    && checkCell(y + 1, x)) {
                    return true;
                }
            }
            if (shipLength == 1)    return true;

            return false;
        }
        return false;

        function checkCell(row, column) {
            if(data[row-1] && data[row-1][column-1]>0) {
                return false;
            }
            if(data[row-1] && data[row-1][column]>0) {
                return false;
            }
            if(data[row-1] && data[row-1][column+1]>0) {
                return false;
            }
            if(data[row] && data[row][column-1]>0) {
                return false;
            }
            if(data[row] && data[row][column+1]>0) {
                return false;
            }
            if(data[row+1] && data[row+1][column-1]>0) {
                return false;
            }
            if(data[row+1] && data[row+1][column]>0) {
                return false;
            }
            if(data[row+1] && data[row+1][column+1]>0) {
                return false;
            }
            return true;
        }

    }


    function checkAvailableShip(cells) {
        if (cells==1) {  // 1-палубный
            if (shipQuantity(cells)<4)  return true;
        }
        if (cells==2) {  // 2-палубный
            if (shipQuantity(cells)<5)  return true;
        }
        if (cells==3) {  // 3-палубный
            if (shipQuantity(cells)<4)  return true;
        }
        if (cells==4) {  // 4-палубный
            if (shipQuantity(cells)<1)  return true;
        }
        return false;
    }

    function shipQuantity(length) {
        var count = 0;
        for(var i=0; i<height; i++){
            for(var j=0; j<width; j++){
                if (data[i][j] === length) {
                    count++;
                    // divGameRows.childNodes[i].childNodes[j].classList.add("ship-ready");
                    // divGameRows.childNodes[i].childNodes[j].classList.remove("free");
                }
            }
        }
        return count;
    }


    buttonRun.addEventListener("click", startShootings);
    function startShootings(event) {
        while (divGameRows.hasChildNodes()) {		// empty game field
            divGameRows.removeChild(divGameRows.lastChild);
        }
        makeGameField(height,width);
        buttonRun.classList.add('disabled');
        divCover.removeEventListener("click", putShip);
        divCover.onmouseover = function() {};
        divCover.onmouseout = function() {};
        console.table(data);
    }


}