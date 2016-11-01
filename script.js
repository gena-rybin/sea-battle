
window.onload  = function () {


    var body = document.body;
    var	h1 = document.createElement('h1');
    var	h2 = document.createElement('h2');
    var div = document.createElement('div');

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


    // actions - makes game field
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


    // actions - makes ships to pose
    function makeGameControl() {
        for (var i=1; i<=4; i++) {
            divShips = divShips.cloneNode(false);
            divHarbor.appendChild(divShips);
            for (var j=1; j<=i; j++) {
                divShip = divShip.cloneNode(false);
                //divShip.classList.add('vertical');
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


    // gets the position of clicked cell
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
        if (horiz==true  && checkFreeCell()) {
            for (var i=0; i<shipLength; i++) {
                    divGameRows.childNodes[y].childNodes[x+i].classList.add("hover");
            }
        }
        if (horiz==false  && checkFreeCell()) {
            for (var i = 0; i < shipLength; i++) {
                    divGameRows.childNodes[y + i].childNodes[x].classList.add("hover");
            }
        }

        function checkFreeCell() {
            if (cell.classList.contains('free')) {
                if (shipLength==4) {
                    if (horiz==true
                        && divGameRows.childNodes[y].childNodes[x+shipLength-1]
                        && divGameRows.childNodes[y].childNodes[x+shipLength-1].classList.contains('free')
                        && divGameRows.childNodes[y].childNodes[x+shipLength-2].classList.contains('free')
                        && divGameRows.childNodes[y].childNodes[x+shipLength-3].classList.contains('free')) {
                            return true;
                    }
                    if (horiz==false
                        && divGameRows.childNodes[y + shipLength -1]
                        && divGameRows.childNodes[y + shipLength -1].childNodes[x].classList.contains('free')
                        && divGameRows.childNodes[y + shipLength -2].childNodes[x].classList.contains('free')
                        && divGameRows.childNodes[y + shipLength -3].childNodes[x].classList.contains('free')) {
                            return true;
                    }
                }
                if (shipLength==3) {
                    if (horiz==true
                        && divGameRows.childNodes[y].childNodes[x+shipLength-1]
                        && divGameRows.childNodes[y].childNodes[x+shipLength-1].classList.contains('free')
                        && divGameRows.childNodes[y].childNodes[x+shipLength-2].classList.contains('free')) {
                        return true;
                    }
                    if (horiz==false
                        && divGameRows.childNodes[y + shipLength -1]
                        && divGameRows.childNodes[y + shipLength -1].childNodes[x].classList.contains('free')
                        && divGameRows.childNodes[y + shipLength -2].childNodes[x].classList.contains('free')) {
                            return true;
                    }

                }
                if (shipLength==2) {
                    if (horiz==true
                        && divGameRows.childNodes[y].childNodes[x+shipLength-1]
                        && divGameRows.childNodes[y].childNodes[x+shipLength-1].classList.contains('free')
                        && divGameRows.childNodes[y].childNodes[x+shipLength-2].classList.contains('free')) {
                        return true;
                    }
                    if (horiz==false
                        && divGameRows.childNodes[y + shipLength -1]
                        && divGameRows.childNodes[y + shipLength -1].childNodes[x].classList.contains('free')
                        && divGameRows.childNodes[y + shipLength -2].childNodes[x].classList.contains('free')) {
                        return true;
                    }

                }
                if (shipLength==1) {
                    if (cell.classList.contains('free')) return true;
                }
                return false;
            }
            return false;
        }
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
        removeClassFromAllCells('checked');
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
            };
        }
    }

    function removeClassFromAllCells (name) {
        for (var i = 0; i<divHarbor.childNodes.length; i++) {
            for (var j = 0; j<divHarbor.childNodes[i].childNodes.length; j++) {
                if (divHarbor.childNodes[i].childNodes[j].classList.contains(name)) {
                    divHarbor.childNodes[i].childNodes[j].classList.remove(name);
                }
            }
        }
    }


    // set ship on the game's field
    divCover.addEventListener("click", putShip);
    function putShip(event) {
        var cell = event.target;
        if ((cell.classList.contains('hover')) && horiz==true) {
            for (var i=0; i<shipLength; i++) {
                if (divGameRows.childNodes[y].childNodes[x+shipLength-1]) {
                    divGameRows.childNodes[y].childNodes[x+i].classList.add("ship-ready");
                    divGameRows.childNodes[y].childNodes[x+i].classList.remove("free");
                    //markNeighborCellsAsBusy();
                }
            }
        }
        if ((cell.classList.contains('hover')) && horiz==false) {
            for (var i = 0; i < shipLength; i++) {
                if (divGameRows.childNodes[y + shipLength -1]) {
                    divGameRows.childNodes[y + i].childNodes[x].classList.add("ship-ready");
                    divGameRows.childNodes[y + i].childNodes[x].classList.remove("free");
                    //markNeighborCellsAsBusy();
                }
            }
        }
    }

    function markNeighborCellsAsBusy() {
        var top_left = divGameRows.childNodes[y-1].childNodes[x-1];
        var top_middle = divGameRows.childNodes[y-1].childNodes[x];

        if(divGameRows.childNodes[y-1]  && divGameRows.childNodes[y-1].childNodes[x-1].contains('free')) {
                divGameRows.childNodes[y-1].childNodes[x-1].classList.add('busy');
                divGameRows.childNodes[y-1].childNodes[x-1].classList.remove('free');
        }
        if(divGameRows.childNodes[y-1]  && top_middle.contains('free')) {
                top_middle.classList.add('busy');
                top_middle.remove('free');
        }
        if(divGameRows.childNodes[y-1]
            && divGameRows.childNodes[y-1].childNodes[x+1].contains('free')) {
                divGameRows.childNodes[y-1].childNodes[x+1].classList.add('busy');
                divGameRows.childNodes[y-1].childNodes[x+1].remove('free');
        }
        if(divGameRows.childNodes[y]
            && divGameRows.childNodes[y].childNodes[x-1].contains('free')) {
                divGameRows.childNodes[y].childNodes[x-1].classList.add('busy');
                divGameRows.childNodes[y].childNodes[x-1].remove('free');
        }
        if(divGameRows.childNodes[y]
            && divGameRows.childNodes[y].childNodes[x+1].contains('free')) {
                divGameRows.childNodes[y].childNodes[x+1].classList.add('busy');
                divGameRows.childNodes[y].childNodes[x+1].remove('free');
        }
        if(divGameRows.childNodes[y+1]
            && divGameRows.childNodes[y+1].childNodes[x-1].contains('free')) {
                divGameRows.childNodes[y+1].childNodes[x-1].classList.add('busy');
                divGameRows.childNodes[y+1].childNodes[x-1].remove('free');
        }
        if(divGameRows.childNodes[y+1]
            && divGameRows.childNodes[y+1].childNodes[x].contains('free')) {
                divGameRows.childNodes[y+1].childNodes[x].classList.add('busy');
                divGameRows.childNodes[y+1].childNodes[x].remove('free');
        }
        if(divGameRows.childNodes[y+1]
            && divGameRows.childNodes[y+1].childNodes[x+1].contains('free')) {
                divGameRows.childNodes[y+1].childNodes[x+1].classList.add('busy');
                divGameRows.childNodes[y+1].childNodes[x+1].remove('free');
        }

    }


    }