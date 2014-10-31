// ==UserScript==
// @match http://*.when2meet.com/*
// ==/UserScript==
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
var script = document.createElement('script');
script.appendChild(document.createTextNode(ReColorGroup + " ReColorGroup();"));
(document.body || document.head || document.documentElement).appendChild(script);
