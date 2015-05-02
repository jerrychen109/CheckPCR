var doneBodies = JSON.parse(localStorage.getItem("done") || "[]");
var loadingBar = document.getElementById("loadingBar");
var login = document.getElementById("login");
var loginErr = document.getElementById("loginErr");
var at = document.getElementById("assignments");
var views = document.getElementsByClassName("view");
var ew = document.getElementById("eWrapper");
var list = document.getElementById("list");
var logout = document.getElementById("logout");
var offline = document.getElementById("offline");
var remember = document.getElementById("remember");
var oc;
function auto(onComplete) {
	startHandling();
	data = JSON.parse(localStorage.getItem("data"));
	if(data) {
		onComplete();
	}
	start(onComplete);
}
function start(onComplete){
	oc = onComplete;
	var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			loadingBar.style.display = "none";
			if(xmlhttp.responseText == "Login") {
				console.log("Need to log in");
				login.className="visible";
				up = getCookie("userPass");
				if(up != "") {
					dologin(up);
				}
			} else if (xmlhttp.responseText == "Load") {
				console.log("Offline");
				if(offline) offline.style.display="block";
			} else {
				console.log("Fetching assignments successful");
				handleData(xmlhttp.responseText);
			}
		}
	}
	xmlhttp.onerror = function() {
		console.log("Connection to python server failed.");
	}
		
	xmlhttp.open("GET","start",true);
	xmlhttp.send();
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function dologin(val) {
	login.className="";
	loadingBar.style.display = "block";
	if(remember.checked) {
		setCookie("userPass", window.btoa(document.getElementById("user").value+":"+document.getElementById("pass").value), 14);
	}
	var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			if(xmlhttp.responseText == "Login") {
				login.className="visible";
				loginErr.innerHTML = "The username and/or password you entered is incorrect";
			} else {
				loadingBar.style.display = "none";
				handleData(xmlhttp.responseText);
			}
		}
	}
	xmlhttp.open("GET","login",true);
	if(val && val.length>0) {
		up = window.atob(val).split(":")
		xmlhttp.setRequestHeader("User",up[0]);
		xmlhttp.setRequestHeader("Pass",up[1]);
	} else {
		xmlhttp.setRequestHeader("User",document.getElementById("user").value);
		xmlhttp.setRequestHeader("Pass",document.getElementById("pass").value);
	}
	xmlhttp.send();
	return false;
}
var data = [];
var classList = [];
var handledDataShort = [];
function startHandling() {
	if(logout) logout.className="visible";
	document.body.className="finished";
}
function handleData(tp) {
	data = [];
	startHandling()
	var el = document.createElement('div'); //Dummy element to use to parse html
	el.innerHTML = tp;
	var noprints = el.getElementsByClassName("noprint")
	var classes = noprints[noprints.length-3].getElementsByTagName("label");
	for(var c=0; c<classes.length; c++) {
		classList.push(classes[c].innerHTML);
	}
	console.log(classList);
	var tds = el.getElementsByClassName("rsContentTable")[0].getElementsByTagName("td");
	for(var td=0; td<tds.length; td++) {
		var ctd = tds[td];
		var ta = {};
		ta["weekend"] = hasClass(ctd, "rsSatCol") || hasClass(ctd, "rsSunCol");
		ta["otherMonth"] = hasClass(ctd, "rsOtherMonth");
		ta["day"] = ctd.getElementsByClassName("rsDateHeader")[0].title;
		ta["assignments"] = new Array();
		var assignments = ctd.getElementsByClassName("rsApt rsAptSimple");
		for(var a=0; a<assignments.length; a++) {
			var ta2 = {};
			var ca = assignments[a];
			ta2["range"] = ca.getElementsByTagName("span")[0].innerHTML;
			var t = ca.getElementsByTagName("span")[1]
			ta2["title1"] = t.childNodes[0].innerHTML;
			ed = ta2["range"].split(" - ")[1];
			ta2["endDate"] = ed ? ed.substring(0, ed.indexOf(" ")) : null;
			ta2["startDate"] = ta2["range"].substring(0, ta2["range"].indexOf(" "));
			var b = t.parentNode.parentNode.innerHTML;
			ta2["title2"] = ca.title;
			var bUnparsed = b.substring(b.indexOf("\n", b.indexOf("</div", b.indexOf("</div")+4)));
			var matches = /<br\s*\/?>\s*<br\s*\/?>/.exec(bUnparsed.substring(0,100));
			if(matches == null) {
				ta2["body"] = urlify(bUnparsed.substring(bUnparsed.indexOf("\n", bUnparsed.indexOf("<br")+3)).replace(/\.\.\/Common\/AttachmentRender.aspx\?id=/g,"https://webappsca.pcrsoft.com/Clue/Common/AttachmentRender.aspx?id="));
			} else {
				ta2["body"] = urlify(bUnparsed.replace(/<br\s*\/?>\s*<br\s*\/?>/,""));
			}
			ta2["type"] = ca.title.substring(0, ca.title.indexOf("\n")).toLowerCase().replace("& quizzes", "");
			var st = ca.title.substring(ca.title.indexOf("\n")+1);
			for(var c=0; c<classList.length; c++) {
				if (st.indexOf(classList[c]) > -1) {
					ta2["class"] = classList[c];
				}
			}
			ta2["shortTitle"] = st.substring(st.indexOf("\n")+1);
			var append = true;
			var short = ta2["range"]+ta2["title1"];
			if(handledDataShort.indexOf(short) == -1) {
				handledDataShort.push(short);
				ta["assignments"].push(ta2);
			}
		}
		data.push(ta);
	}
	localStorage.setItem("data", JSON.stringify(data));
	oc();
}
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function updateMonth() {
	var overWeekends = [];
	var today;
	ew.className = "chart";
	for(var v=0; v<views.length; v++) {
		if(hasClass(views[v], "selected")) {
			views[v].className = views[v].className.replace(" selected", "");
		}
		if(views[v].innerHTML == "Month") {
			views[v].className += " selected";
		}
	}
	at.innerHTML="";
	var lastTr;
	var extras = [];
	for(var y=0; y<data.length; y++) {
		extras[y] = [];
	}
	for(var p=0; p<data.length; p++) {
		if(p%7 == 0) {
			lastTr = document.createElement("tr");
			at.appendChild(lastTr);
		}
		var td = document.createElement("td");
		var sd = data[p].day.split("/");
		td.innerHTML = "<span class='month'>"+months[+sd[0] - 1]+"</span><span class='compAll' onclick='completeAll(this)'>&#x2713;&#x2713;</span><span class='day'>"+sd[1]+"</span>";
		if (data[p].weekend) td.className += " weekend";
		if (data[p].otherMonth) td.className += " otherMonth";
		if (dayMatch(data[p].day, new Date())) {
			td.className += " today";
			today = td;
		}
		var cp = 0;
		var margins = 0;
		var o2=overWeekends.slice(0); //clone it to preserve it before we start adding to it
		for(var a=0; a<data[p].assignments.length+(p%7==0 ? o2.length : 0); a++) {
			if(p%7==0 && a<o2.length) {
				var a2= o2[a];
				overWeekends.splice(0,1); //always first index since we are removing (index decreases by 1 every time)
			} else {
				var a2= data[p].assignments[a];
			}
			var a3 = document.createElement("div");
			a3.className = "assignment "+a2.type;
			var span = daysBetween(data[p].day, a2.endDate)+1;
			var e = cp;
			while(true) {
				if(extras[p].indexOf(e) == -1) break;
				e++;
			}
			cp=e;
			var span2 = 1;
			if(span > 1) {
				if(span <= 7-p%7) {
					span2=span;
				} else {
					span2 = 7-p%7;
					a3.className += " overWeekend";
					overWeekends.push(a2);
				}
			}
			//a3.style.width = "calc("+span2+"00% + "+(11*(span2-1))+"px)";
			a3.className += " span"+span2
			for(var x = p+1; x < p+span2; x++) {
				//console.log("\t"+p+" - adding "+e);
				extras[x].push(cp);
			}

			if(a2.startDate != data[p].day) a3.className += " fromWeekend";
			a3.style.marginTop = 3+(cp-(a+margins))*(38+3)+"px";
			margins += cp-(a+margins)
			a3.innerHTML += "<div><div><small>"+a2.class+"</small> "+a2.shortTitle+"</div></div>";
			var ab = document.createElement("article");
			ab.style.width = 100/span2+"%";
			ab.innerHTML = "<div><div class='close' onclick='closeThis(this)'>&times;</div><div class='pin' onclick='pinThis(this)'>p</div><div class='done' onclick='complete(this)'>&#x2713;</div><span class='range'>"+a2.range+"</span><section><h2>"+a2.title1+"</h2>"+a2.body+"</div></section></div>";
			a3.appendChild(ab);
			td.appendChild(a3);
			if(doneBodies.indexOf(describeA(a2)) > -1) complete(a3, false);
			cp++;
		}
		lastTr.appendChild(td);
	}
	if(today) window.scrollTo(0,today.getBoundingClientRect().top+window.scrollY-50); //account for header
}
function updateList() {
	window.scrollTo(0,0);
	try {
		ew.className = "list";
		for(var v=0; v<views.length; v++) {
			if(hasClass(views[v], "selected")) {
				views[v].className = views[v].className.replace(" selected", "");
			}
			if(views[v].innerHTML == "List") {
				views[v].className += " selected";
			}
		}
	} catch(e) {
		//Docked version
	}
	list.innerHTML = "";
	for(var p=0; p<data.length; p++) {
		for(var a=0; a<data[p].assignments.length; a++) {
			var a2 = data[p].assignments[a];
			if(doneBodies.indexOf(describeA(a2)) == -1 && intersects(data[p].day, new Date(), a2.endDate)) {
				var a3 = document.createElement("div");
				a3.className = "assignment";
				a3.innerHTML = "<span onclick='complete(this)'></span><div><center class='range'>"+a2.range+"</center><h2>"+a2.title1+"</h2>"+a2.body+"</div>";
				list.appendChild(a3);
			}
		}
	}
}
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
function parents(el, c) {
	var p = el;
	while(true) {
		if(hasClass(p, c) || !p) {
			break
		}
		p = p.parentNode;
	}
	return p;
}
function closeThis(el) {
	var p = parents(el, "assignment");
	p.className += " noHover";
	setTimeout(function(){p.className = p.className.replace(" noHover", "");});
}
document.onkeydown = function(evt) {
	evt = evt || window.event;
	if (evt.keyCode == 27) {
		try{evt.preventDefault();}//Non-IE
        catch(x){evt.returnValue=false;}//IE
		var assignments = document.getElementsByClassName("assignment");
		for(var a=0; a<assignments.length; a++) { closeThis(assignments[a]); }
	}
}
function daysBetween( d1, d2 ) {
  var oneDay=1000*60*60*24;
  
  var d1MS = (new Date(d1)).getTime();
  var d2MS = (new Date(d2)).getTime();
  
  var dif = d2MS - d1MS;
  return Math.max(Math.floor(dif/oneDay), 0); 
}
function intersects(d1, d2, d3) {
	var d1D = new Date(d1);
	var d1T = d1D.setHours(0,0,0);
	
	var d3D = new Date(d3);
	var d3T = d3D.setHours(23,59,59);
	
	var d2T = (new Date(d2)).getTime();
	return d1T <= d2T && d2T <= d3T;
}
function describe(el) {
	return el.getElementsByClassName("range")[0].innerHTML+el.getElementsByTagName("h2")[0].innerHTML;
}
function describeA(a) {
	return a.range+a.title1;
}
function complete(el,update) {
	update = typeof update === "undefined" ? true : update;
	console.log(update);
	var p = parents(el, "assignment");
	var ta = describe(el.parentNode);
	var as = document.getElementsByClassName("assignment");
	if(p.className.indexOf("completed") == -1) {
		if (update) {
			if(ew.className == "list") {
				console.log(p.clientHeight);
				p.style.maxHeight=p.clientHeight+2+"px"; //2px borders
				p.className += " completed";
				setTimeout(function(){p.style.maxHeight=0;},1);
				setTimeout(function(){p.remove()},200);
			} else {
				for(var a=0;a<as.length;a++) {
					if(describe(as[a]) == ta) {
						as[a].className += " completed";
					}
				}
			}
			doneBodies.push(ta);
		} else {
			p.className += " completed";
		}
	} else {
		if(update) {
			for(var a=0;a<as.length;a++) {
				if(describe(as[a]) == ta) {
					as[a].className = as[a].className.replace(" completed", "");
				}
			}
			var i = doneBodies.indexOf(ta);
			console.log(i);
			if(i > -1) doneBodies.splice(i, 1);
		} else {
			p.className = p.className.replace(" completed", "");
		}
	}
	if(update) {
		localStorage.setItem("done", JSON.stringify(doneBodies));
	}
	closeThis(el);
}
function completeAll(el) {
	var a = el.parentNode.getElementsByClassName("assignment");
	var completed = 0;
	for(var x=0; x<a.length; x++) {
		if(a[x].className.indexOf("completed") > -1) completed++;
	}
	var markComplete = completed/a.length < 1;
	for(var x=0; x<a.length; x++) {
		var ic = a[x].className.indexOf("completed") > -1;
		var c = a[x].getElementsByClassName("done")[0];
		if(markComplete) {
			if(!ic) complete(c);
		} else {
			if(ic) complete(c);
		}
	}
}
function pinThis(el) {
	var p = parents(el, "assignment");
	if(p.className.indexOf("pinned") == -1) {
		p.className += " pinned";
	} else {
		p.className = p.className.replace(" pinned", "");
	}
}
function dayMatch(d1, d2) {
	var a = new Date(d1);
	var b = new Date(d2);
	if(a.getDate() != b.getDate()) return false;
	if(a.getMonth() != b.getMonth()) return false
	if(a.getFullYear() != b.getFullYear()) return false;
	return true;
}
function byebye() {
	var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			window.close();
		}
	}
	xmlhttp.open("GET","quit",true);
	xmlhttp.send();
}
function urlify(text) {
	return text.replace(/(https?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig, function(str, str2, offset){return /href\s*=\s*./.test(text.substring(offset-10,offset)) ? str : '<a href="'+str+'">'+str+'</a>';})
}