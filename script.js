
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


    var yy=0;
    console.log(gameCell);

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


    // making Data-array with mines
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

    var horiz = false;
    var vert = true;

    divCover.onmouseover = function(event) {
        getPosition();
        var cell = event.target;
        //event.target.classList.add("hover");
        if (horiz==true) {
            for (var i=0; i<shipLength; i++) {
                if (divGameRows.childNodes[y].childNodes[x+shipLength-1]) {
                    divGameRows.childNodes[y].childNodes[x+i].classList.add("hover");
                }
            }  //if(data[y-1] && data[y-1][x-1] === 1)
        }
        if (vert==true) {
            for (var i = 0; i < shipLength; i++) {
                if (divGameRows.childNodes[y + shipLength -1]) {
                    divGameRows.childNodes[y + i].childNodes[x].classList.add("hover");
                }
            }
        }
        //gameCell[15].classList.add("hover");
        //console.log('hovered: строка='+y+', ячейка='+x);
    }
    divCover.onmouseout = function(event) {
        var cell = event.target;
        cell.classList.remove("hover");
        if (horiz==true) {
            for (var i=1; i<shipLength; i++) {
                divGameRows.childNodes[y].childNodes[x+i].classList.remove("hover");
            }
        }
        if (vert==true) {
            for (var i=1; i<shipLength; i++) {
                //gameCell[10*y+x+10*i].classList.remove("hover");
                divGameRows.childNodes[y+i].childNodes[x].classList.remove("hover");
            }
        }
    }

    // choose ship to set on the game's field
    divControl.addEventListener("click", arrangeShips);
    function arrangeShips(event) {
        removeClassFromNeighbors('checked');
        var shipActive = event.target.parentNode;
        if (shipActive.className == 'ship') {    // ship checking
            shipLength = shipActive.childNodes.length;
            shipActive.classList.add('checked');
            // if (shipActive.classList.contains('vertical')) {
            //     shipActive.classList.remove('vertical');
            // }
            // shipActive.classList.add('vertical');
                //.vertical
        }

    }

    function removeClassFromNeighbors (name) {
        for (var i = 0; i<divHarbor.childNodes.length; i++) {
            for (var j = 0; j<divHarbor.childNodes[i].childNodes.length; j++) {
                if (divHarbor.childNodes[i].childNodes[j].classList.contains(name)) {
                    divHarbor.childNodes[i].childNodes[j].classList.remove(name);
                }
            }
        }
    }


}