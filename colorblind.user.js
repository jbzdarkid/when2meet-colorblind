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
      Red = Math.round(((255)*(MaxAvailable-i+1)/(MaxAvailable-MinAvailable+1))+0);
      Green = Math.round(((255)*(MaxAvailable-i+1)/(MaxAvailable-MinAvailable+1))+0);
      Blue = Math.round(((0)*(MaxAvailable-i+1)/(MaxAvailable-MinAvailable+1))+255);
    }

    TableContent += "<td bgcolor=#" + (Red*256*256+Green*256+Blue).toString(16) + ">&nbsp;</td>";
  }

  document.getElementById("GroupKey").innerHTML = TableStart+TableContent+TableEnd;

  for (var i=0;i<AvailableAtSlot.length;i++) {
    Red = Green = Blue = Math.round(255/2);
    if (MinAvailable!=MaxAvailable) {
      Red = Math.round(((255)*(MaxAvailable-AvailableAtSlot[i].length+1)/(MaxAvailable-MinAvailable+1))+0);
      Green = Math.round(((255)*(MaxAvailable-AvailableAtSlot[i].length+1)/(MaxAvailable-MinAvailable+1))+0);
      Blue = Math.round(((0)*(MaxAvailable-AvailableAtSlot[i].length+1)/(MaxAvailable-MinAvailable+1))+255);
    }
    document.getElementById("GroupTime"+TimeOfSlot[i]).style.background="#"+(Red*256*256+Green*256+Blue).toString(16);
  }
}
var script = document.createElement('script');
script.appendChild(document.createTextNode(ReColorGroup + " ReColorGroup();"));
(document.body || document.head || document.documentElement).appendChild(script);
