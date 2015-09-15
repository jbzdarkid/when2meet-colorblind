// ==UserScript==
// @match http://*.when2meet.com/*
// @version 1.1
// ==/UserScript==
function ReColorIndividual() {
  for (var i=0;i<TimeOfSlot.length;i++) {
    if (FromCol<ToCol) { ColA=FromCol; ColB=ToCol; } else { ColA=ToCol; ColB=FromCol; }
    if (FromRow<ToRow) { RowA=FromRow; RowB=ToRow; } else { RowA=ToRow; RowB=FromRow; }

    var WithinX = ((ColA<=Col[i])&&(Col[i]<=ColB));
    var WithinY = ((RowA<=Row[i])&&(Row[i]<=RowB));

    if (ChangeToAvailable) NewColor="blue"; else NewColor="white";
    if (WithinX && WithinY && IsMouseDown) {
      document.getElementById("YouTime"+TimeOfSlot[i]).style.background=NewColor;
      document.getElementById("YouTime"+TimeOfSlot[i]).style.borderColor=NewColor;
      if (ColA==Col[i]) document.getElementById("YouTime"+TimeOfSlot[i]).style.borderLeftColor="black";
      if (ColB==Col[i]) document.getElementById("YouTime"+TimeOfSlot[i]).style.borderRightColor="black";
      if (RowA==Row[i]) document.getElementById("YouTime"+TimeOfSlot[i]).style.borderTopColor="black";
      if (RowB==Row[i]) document.getElementById("YouTime"+TimeOfSlot[i]).style.borderBottomColor="black";
    } else {
      if (-1 != AvailableAtSlot[i].indexOf(UserID) ) {
        document.getElementById("YouTime"+TimeOfSlot[i]).style.background="blue";
        document.getElementById("YouTime"+TimeOfSlot[i]).style.borderColor="black";
      } else {
        document.getElementById("YouTime"+TimeOfSlot[i]).style.background="white";
        document.getElementById("YouTime"+TimeOfSlot[i]).style.borderColor="black";
      }
    }
  }
}
function ReColorGroup() {
  var MinAvailable = 10000; var MaxAvailable=0;
  var SelfIsAvailable = false;
  for (var i=0;i<AvailableAtSlot.length;i++) {
    if (AvailableAtSlot[i].length<MinAvailable) MinAvailable = AvailableAtSlot[i].length;
    if (AvailableAtSlot[i].length>MaxAvailable) MaxAvailable = AvailableAtSlot[i].length;
    if (AvailableAtSlot[i].indexOf(UserID)!=-1) SelfIsAvailable = true;
  }
  var numSegments = MaxAvailable-MinAvailable
  if ((AvailableIDs.indexOf(UserID)!=-1)&&(!SelfIsAvailable)) {
    SplitSpot = AvailableIDs.indexOf(UserID);
    AvailableIDs.splice(SplitSpot,1);
  } else if ((AvailableIDs.indexOf(UserID)==-1)&&SelfIsAvailable)
    AvailableIDs.push(UserID);

  document.getElementById("MinAvailable").innerHTML = MinAvailable+"/"+AvailableIDs.length;
  document.getElementById("MaxAvailable").innerHTML = MaxAvailable+"/"+AvailableIDs.length;

  TableStart = "<table width=100 height=10 cellpadding=0 cellspacing=0 style='border: solid 1px black'><tr>";
  TableEnd = "</tr></table>";
  TableContent = "";
  for (var i=MinAvailable; i<=MaxAvailable; i++) {
    Red = Green = Blue = Math.round(255/2);
    if (MinAvailable!=MaxAvailable) {
      Red = Math.round((255*(MaxAvailable-i)/numSegments)+0);
      Green = Math.round((255*(MaxAvailable-i)/numSegments)+0);
      Blue = Math.round((0*(MaxAvailable-i)/numSegments)+255);
    }
    var colorString = '';
    if (Red < 16) {
      colorString += '0';
    }
    colorString += Red.toString(16);
    if (Green < 16) {
      colorString += '0';
    }
    colorString += Green.toString(16);
    if (Blue < 16) {
      colorString += '0';
    }
    colorString += Blue.toString(16);
    TableContent += "<td bgcolor=#" + colorString + ">&nbsp;</td>";
  }

  document.getElementById("GroupKey").innerHTML = TableStart+TableContent+TableEnd;

  for (var i=0;i<AvailableAtSlot.length;i++) {
    Red = Green = Blue = Math.round(255/2);
    if (MinAvailable!=MaxAvailable) {
      Red = Math.round((255*(MaxAvailable-AvailableAtSlot[i].length)/numSegments)+0);
      Green = Math.round((255*(MaxAvailable-AvailableAtSlot[i].length)/numSegments)+0);
      Blue = Math.round((0*(MaxAvailable-AvailableAtSlot[i].length)/numSegments)+255);
    }
    var colorString = '';
    if (Red < 16) {
      colorString += '0';
    }
    colorString += Red.toString(16);
    if (Green < 16) {
      colorString += '0';
    }
    colorString += Green.toString(16);
    if (Blue < 16) {
      colorString += '0';
    }
    colorString += Blue.toString(16);
    document.getElementById("GroupTime"+TimeOfSlot[i]).style.background="#"+colorString;
  }
}
function ReColor() {
  for (Row=1;Row<=6;Row++) {
    for (Column=1;Column<=7;Column++) {
      if ((WriteMode!="") && ((AnchorRow-Row)*(Row-HoverRow)>=0) && ((AnchorColumn-Column)*(Column-HoverColumn)>=0)) {

        if (WriteMode == "write") {
          document.getElementById("Day-"+Row+"-"+Column).style.backgroundColor='blue';
          document.getElementById("Day-"+Row+"-"+Column).style.color='white';
        } else {
          document.getElementById("Day-"+Row+"-"+Column).style.backgroundColor='white';
          document.getElementById("Day-"+Row+"-"+Column).style.color='black';
        }
        document.getElementById("Day-"+Row+"-"+Column).style.border='0px solid black';
        document.getElementById("Day-"+Row+"-"+Column).style.padding='4px';
        document.getElementById("Day-"+Row+"-"+Column).style.margin='0px';
      } else {
        document.getElementById("Day-"+Row+"-"+Column).style.border='1px solid black';
        document.getElementById("Day-"+Row+"-"+Column).style.padding='2px';
        document.getElementById("Day-"+Row+"-"+Column).style.margin='1px';

        if (ArraySearch(Dates,document.getElementById("DateOf-"+Row+"-"+Column).value)) {
          document.getElementById("Day-"+Row+"-"+Column).style.backgroundColor='blue';
          document.getElementById("Day-"+Row+"-"+Column).style.color='white';
        } else {
          document.getElementById("Day-"+Row+"-"+Column).style.backgroundColor='white';
          document.getElementById("Day-"+Row+"-"+Column).style.color='black';
        }

      }
    }
  }
}
var script = document.createElement('script');
script.appendChild(document.createTextNode(ReColorIndividual + " ReColorIndividual();"));
script.appendChild(document.createTextNode(ReColorGroup + " ReColorGroup();"));
script.appendChild(document.createTextNode(ReColor + " ReColor();"));
(document.body || document.head || document.documentElement).appendChild(script);

var label = document.getElementById('YouGrid');
var targets = label.getElementsByTagName('td');
targets[0].setAttribute('bgcolor', 'white');
targets[1].setAttribute('bgcolor', 'blue');
