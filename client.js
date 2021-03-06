var ParseArray, a, aa, ab, ac, act, activity, activityTypes, addActivity, ae, af, ag, ah, animateEl, athenaData, attachmentify, c, cc, checkCommit, closeError, closeNew, closeNews, closeOpened, color, custom, d, dateString, deleteCookie, display, displayError, dmp, dologin, done, dragTarget, dt, e, el, element, enabled, extra, fetch, findId, fn, fn1, formatUpdate, fromDateNum, fullMonths, getCookie, getResizeAssignments, gp, hammertime, headroom, i, input, intervalRefresh, j, k, l, labrgb, lastUpdate, lc, len, len1, len10, len11, len2, len3, len4, len5, len6, len7, len8, len9, list, listDateOffset, listName, localStorageRead, loginHeaders, loginURL, menuOut, mimeTypes, modified, months, navToggle, o, onNewTask, p, palette, parse, parseAthenaData, parseDateHash, pe, q, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, resize, resizeCaller, ripple, schedules, scroll, send, separate, setCookie, smoothScroll, snackbar, sp, switchToList, tab, ticking, timeoutId, tip, tipComplete, tipNames, type, tzoff, u, up, upc, updateAvatar, updateColors, updateListNav, updateNewTips, updateSelectNum, updateTip, urlify, version, viewData, weekdays, z,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  slice = [].slice;

if (window.location.protocol === "http:" && location.hostname !== "localhost") {
  window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

if (localStorage["noWelcome"] == null) {
  localStorage["noWelcome"] = "true";
  window.location = "welcome.html";
}

loginURL = "https://webappsca.pcrsoft.com/Clue/Student-Portal-Login-LDAP/8464?returnUrl=https%3a%2f%2fwebappsca.pcrsoft.com%2fClue%2fSC-Assignments-End-Date-Range%2f7536";

loginHeaders = {};

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

tzoff = (new Date()).getTimezoneOffset() * 1000 * 60;

mimeTypes = {
  "application/msword": ["Word Doc", "document"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["Word Doc", "document"],
  "application/vnd.ms-powerpoint": ["PPT Presentation", "slides"],
  "application/pdf": ["PDF File", "pdf"],
  "text/plain": ["Text Doc", "plain"]
};

scroll = 0;

viewData = {};

activity = [];

dmp = new diff_match_patch();

lastUpdate = 0;

listDateOffset = 0;

version = "2.23.0";

send = function(url, respType, headers, data, progress) {
  if (progress == null) {
    progress = false;
  }
  return new Promise(function(resolve, reject) {
    var header, headername, load, progressElement, progressInner, req;
    req = new XMLHttpRequest();
    req.open((data != null ? "POST" : "GET"), url, true);
    progressElement = document.getElementById("progress");
    progressInner = progressElement.querySelector("div");
    if (progress) {
      progressElement.offsetWidth;
      progressElement.classList.add("active");
      if (progressInner.classList.contains("determinate")) {
        progressInner.classList.remove("determinate");
        progressInner.classList.add("indeterminate");
      }
    }
    load = localStorage["load"] || 170000;
    req.onload = function(evt) {
      localStorage["load"] = evt.loaded;
      if (progress) {
        progressElement.classList.remove("active");
      }
      if (req.status === 200) {
        resolve(req);
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      if (progress) {
        progressElement.classList.remove("active");
      }
      reject(Error("Network Error"));
    };
    if (progress) {
      req.onprogress = function(evt) {
        if (progressInner.classList.contains("indeterminate")) {
          progressInner.classList.remove("indeterminate");
          progressInner.classList.add("determinate");
        }
        return progressInner.style.width = 100 * evt.loaded / (evt.lengthComputable ? evt.total : load) + "%";
      };
    }
    if (respType != null) {
      req.responseType = respType;
    }
    if (headers != null) {
      for (headername in headers) {
        header = headers[headername];
        req.setRequestHeader(headername, header);
      }
    }
    if (data != null) {
      req.send(data);
    } else {
      req.send();
    }
  });
};

getCookie = function(cname) {
  var c, ca, i, name;
  name = cname + "=";
  ca = document.cookie.split(";");
  i = 0;
  while (i < ca.length) {
    c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) !== -1) {
      return c.substring(name.length, c.length);
    }
    i++;
  }
  return "";
};

setCookie = function(cname, cvalue, exdays) {
  var d, expires;
  d = new Date;
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};

deleteCookie = function(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

snackbar = function(message, action, f) {
  var actionE, add, existing, snack, snackInner;
  snack = element("div", "snackbar");
  snackInner = element("div", "snackInner", message);
  snack.appendChild(snackInner);
  if ((action != null) && (f != null)) {
    actionE = element("a", [], action);
    actionE.addEventListener("click", function() {
      snack.classList.remove("active");
      return f();
    });
    snackInner.appendChild(actionE);
  }
  add = function() {
    document.body.appendChild(snack);
    snack.offsetHeight;
    snack.classList.add("active");
    return setTimeout(function() {
      snack.classList.remove("active");
      return setTimeout(function() {
        return snack.remove();
      }, 900);
    }, 5000);
  };
  existing = document.querySelector(".snackbar");
  if (existing != null) {
    existing.classList.remove("active");
    setTimeout(add, 300);
  } else {
    add();
  }
};

displayError = function(e) {
  var errorHTML;
  errorHTML = "Messsage: " + e.message + "\nStack: " + (e.stack || e.lineNumber) + "\nBrowser: " + navigator.userAgent + "\nVersion: " + version;
  document.getElementById("errorContent").innerHTML = errorHTML.replace("\n", "<br>");
  document.getElementById("errorGoogle").href = "https://docs.google.com/a/students.harker.org/forms/d/1sa2gUtYFPdKT5YENXIEYauyRPucqsQCVaQAPeF3bZ4Q/viewform?entry.120036223=" + (encodeURIComponent(errorHTML));
  document.getElementById("errorGitHub").href = "https://github.com/19RyanA/CheckPCR/issues/new?body=" + (encodeURIComponent("I've encountered an bug.\n\n```\n" + errorHTML + "\n```"));
  document.getElementById("errorBackground").style.display = "block";
  return document.getElementById("error").classList.add("active");
};

fromDateNum = function(days) {
  var d;
  d = new Date(days * 1000 * 3600 * 24 + tzoff);
  if (d.getHours() === 1) {
    d.setHours(0);
  }
  if (d.getHours() === 22 || d.getHours() === 23) {
    d.setHours(24);
    d.setMinutes(0);
    d.setSeconds(0);
  }
  return d.getTime();
};

if (window.requestIdleCallback == null) {
  window.requestIdleCallback = function(cb) {
    var start;
    start = Date.now();
    return setTimeout(function() {
      return cb({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  };
}

localStorageRead = function(name) {
  var e, error1;
  try {
    return JSON.parse(localStorage[name]);
  } catch (error1) {
    e = error1;
    return void 0;
  }
};

formatUpdate = function(date) {
  var ampm, daysPast, hr, min, now, update;
  now = new Date();
  update = new Date(+date);
  if (now.getDate() === update.getDate()) {
    ampm = "AM";
    hr = update.getHours();
    if (hr > 12) {
      ampm = "PM";
      hr -= 12;
    }
    min = update.getMinutes();
    return "Today at " + hr + ":" + (min < 10 ? "0" + min : min) + " " + ampm;
  } else {
    daysPast = Math.ceil((now.getTime() - update.getTime()) / 1000 / 3600 / 24);
    if (daysPast === 1) {
      return "Yesterday";
    } else {
      return daysPast + " days ago";
    }
  }
};

fetch = function(override, data) {
  var headers;
  if (override == null) {
    override = false;
  }
  if (!override && Date.now() - lastUpdate < 60000) {
    return;
  }
  lastUpdate = Date.now();
  headers = data != null ? {
    "Content-type": "application/x-www-form-urlencoded"
  } : null;
  if (location.protocol === "chrome-extension:") {
    console.time("Fetching assignments");
    send("https://webappsca.pcrsoft.com/Clue/SC-Assignments-End-Date-Range/7536", "document", headers, data, true).then(function(resp) {
      var e, error1, j, len, ref1, t, up;
      console.timeEnd("Fetching assignments");
      if (resp.responseURL.indexOf("Login") !== -1) {
        ref1 = resp.response.getElementsByTagName("input");
        for (j = 0, len = ref1.length; j < len; j++) {
          e = ref1[j];
          loginHeaders[e.name] = e.value || "";
        }
        console.log("Need to log in");
        up = getCookie("userPass");
        if (up === "") {
          document.getElementById("loginBackground").style.display = "block";
          document.getElementById("login").classList.add("active");
        } else {
          dologin(window.atob(up).split(":"));
        }
      } else {
        console.log("Fetching assignments successful");
        t = Date.now();
        localStorage["lastUpdate"] = t;
        document.getElementById("lastUpdate").innerHTML = formatUpdate(t);
        try {
          parse(resp.response);
        } catch (error1) {
          e = error1;
          console.log(e);
          displayError(e);
        }
      }
    }, function(error) {
      console.log("Could not fetch assignments; You are probably offline. Here's the error:", error);
      snackbar("Could not fetch your assignments", "Retry", function() {
        return fetch(true);
      });
    });
  } else {
    send("/api/start", "json", headers, data, true).then(function(resp) {
      var t;
      console.debug("Fetching assignments:", resp.response.time);
      if (resp.response.login) {
        loginHeaders = resp.response.loginHeaders;
        document.getElementById("loginBackground").style.display = "block";
        document.getElementById("login").classList.add("active");
      } else {
        console.log("Fetching assignments successful");
        t = Date.now();
        localStorage["lastUpdate"] = t;
        document.getElementById("lastUpdate").innerHTML = formatUpdate(t);
        window.data = resp.response.data;
        viewData = resp.response.viewData;
        display();
        localStorage["data"] = JSON.stringify(data);
      }
    }, function(error) {
      console.log("Could not fetch assignments; You are probably offline. Here's the error:", error);
      return snackbar("Could not fetch your assignments", "Retry", function() {
        return fetch(true);
      });
    });
  }
};

dologin = function(val, submitEvt) {
  var h, postArray;
  if (submitEvt == null) {
    submitEvt = false;
  }
  document.getElementById("login").classList.remove("active");
  setTimeout(function() {
    return document.getElementById("loginBackground").style.display = "none";
  }, 350);
  postArray = [];
  localStorage["username"] = (val != null) && !submitEvt ? val[0] : document.getElementById("username").value;
  updateAvatar();
  for (h in loginHeaders) {
    if (h.toLowerCase().indexOf("user") !== -1) {
      loginHeaders[h] = (val != null) && !submitEvt ? val[0] : document.getElementById("username").value;
    }
    if (h.toLowerCase().indexOf("pass") !== -1) {
      loginHeaders[h] = (val != null) && !submitEvt ? val[1] : document.getElementById("password").value;
    }
    postArray.push(encodeURIComponent(h) + "=" + encodeURIComponent(loginHeaders[h]));
  }
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  if (location.protocol === "chrome-extension:") {
    console.time("Logging in");
    send(loginURL, "document", {
      "Content-type": "application/x-www-form-urlencoded"
    }, postArray.join("&"), true).then(function(resp) {
      var e, error1, t;
      console.timeEnd("Logging in");
      if (resp.responseURL.indexOf("Login") !== -1) {
        document.getElementById("loginIncorrect").style.display = "block";
        document.getElementById("password").value = "";
        document.getElementById("login").classList.add("active");
        return document.getElementById("loginBackground").style.display = "block";
      } else {
        if (document.getElementById("remember").checked) {
          setCookie("userPass", window.btoa(document.getElementById("username").value + ":" + document.getElementById("password").value), 14);
        }
        t = Date.now();
        localStorage["lastUpdate"] = t;
        document.getElementById("lastUpdate").innerHTML = formatUpdate(t);
        try {
          parse(resp.response);
        } catch (error1) {
          e = error1;
          console.log(e);
          displayError(e);
        }
      }
    }, function(error) {
      return console.log("Could not log in to PCR. Either your network connection was lost during your visit or PCR is just not working. Here's the error:", error);
    });
  } else {
    send("/api/login?remember=" + (document.getElementById("remember").checked), "json", {
      "Content-type": "application/x-www-form-urlencoded"
    }, postArray.join("&"), true).then(function(resp) {
      var t;
      console.debug("Logging in:", resp.response.time);
      if (resp.response.login) {
        document.getElementById("loginIncorrect").style.display = "block";
        document.getElementById("password").value = "";
        document.getElementById("login").classList.add("active");
        document.getElementById("loginBackground").style.display = "block";
      } else {
        t = Date.now();
        localStorage["lastUpdate"] = t;
        document.getElementById("lastUpdate").innerHTML = formatUpdate(t);
        window.data = resp.response.data;
        display();
        localStorage["data"] = JSON.stringify(data);
      }
    }, function(error) {
      return console.log("Could not log in to PCR. Either your network connection was lost during your visit or PCR is just not working. Here's the error:", error);
    });
  }
};

document.getElementById("login").addEventListener("submit", function(evt) {
  evt.preventDefault();
  return dologin(null, true);
});

parseDateHash = function(element) {
  var dateSplit;
  dateSplit = element.hash.substring(1).split("-");
  return (new Date(+dateSplit[0], +dateSplit[1] - 1, +dateSplit[2])).getTime();
};

attachmentify = function(element) {
  var a, as, attachments;
  attachments = [];
  as = element.getElementsByTagName('a');
  a = 0;
  while (a < as.length) {
    if (as[a].id.indexOf('Attachment') !== -1) {
      attachments.push([as[a].innerHTML, as[a].search + as[a].hash]);
      as[a].remove();
      a--;
    }
    a++;
  }
  return attachments;
};

urlify = function(text) {
  return text.replace(/(https?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig, function(str, str2, offset) {
    if (/href\s*=\s*./.test(text.substring(offset - 10, offset)) || /originalpath\s*=\s*./.test(text.substring(offset - 20, offset))) {
      return str;
    } else {
      return '<a href="' + str + '">' + str + '</a>';
    }
  });
};

findId = function(element, tag, id) {
  var e, j, len, ref1;
  ref1 = element.getElementsByTagName(tag);
  for (j = 0, len = ref1.length; j < len; j++) {
    e = ref1[j];
    if (e.id.indexOf(id) !== -1) {
      return e;
    }
  }
};

parse = function(doc) {
  var ap, assignment, assignments, b, c, ca, classes, d, divs, e, handledDataShort, j, k, l, len, len1, len2, len3, o, pos, q, range, ref1, ref2, t, title;
  console.time("Handling data");
  handledDataShort = [];
  window.data = {
    classes: [],
    assignments: [],
    monthView: doc.querySelector(".rsHeaderMonth").parentNode.classList.contains("rsSelected")
  };
  ref1 = doc.querySelectorAll("input:not([type=\"submit\"])");
  for (j = 0, len = ref1.length; j < len; j++) {
    e = ref1[j];
    viewData[e.name] = e.value || "";
  }
  classes = findId(doc, "table", "cbClasses").getElementsByTagName("label");
  for (k = 0, len1 = classes.length; k < len1; k++) {
    c = classes[k];
    window.data.classes.push(c.innerHTML);
  }
  assignments = doc.getElementsByClassName("rsApt rsAptSimple");
  for (l = 0, len2 = assignments.length; l < len2; l++) {
    ca = assignments[l];
    assignment = {};
    range = findId(ca, "span", "StartingOn").innerHTML.split(" - ");
    assignment.start = Math.floor((Date.parse(range[0])) / 1000 / 3600 / 24);
    assignment.end = range[1] != null ? Math.floor((Date.parse(range[1])) / 1000 / 3600 / 24) : assignment.start;
    t = findId(ca, "span", "lblTitle");
    title = t.innerHTML;
    b = t.parentNode.parentNode;
    divs = b.getElementsByTagName("div");
    for (d = o = 0; o < 2; d = ++o) {
      divs[0].remove();
    }
    ap = attachmentify(b);
    assignment.attachments = ap;
    assignment.body = urlify(b.innerHTML).replace(/^(?:\s*<br\s*\/?>)*/, "").replace(/(?:\s*<br\s*\/?>)*\s*$/, "").trim();
    assignment.type = title.match(/\(([^)]*\)*)\)$/)[1].toLowerCase().replace("& quizzes", "").replace("tests", "test");
    assignment.baseType = (ca.title.substring(0, ca.title.indexOf("\n"))).toLowerCase().replace("& quizzes", "").replace(/\s/g, "");
    ref2 = window.data.classes;
    for (pos = q = 0, len3 = ref2.length; q < len3; pos = ++q) {
      c = ref2[pos];
      if (title.indexOf(c) !== -1) {
        assignment["class"] = pos;
        title = title.replace(c, "");
        break;
      }
    }
    assignment.title = title.substring(title.indexOf(": ") + 2).replace(/\([^\(\)]*\)$/, "").trim();
    assignment.id = assignment.title.replace(/[^\w]*/g, "") + (assignment.start + assignment.end);
    if (handledDataShort.indexOf(assignment.id) === -1) {
      handledDataShort.push(assignment.id);
      window.data.assignments.push(assignment);
    }
  }
  console.timeEnd("Handling data");
  document.body.classList.add("loaded");
  display();
  localStorage["data"] = JSON.stringify(data);
};

document.getElementById("switchViews").addEventListener("click", function() {
  var h, postArray, v;
  if (Object.keys(viewData).length > 0) {
    document.getElementById("sideBackground").click();
    viewData["__EVENTTARGET"] = "ctl00$ctl00$baseContent$baseContent$flashTop$ctl00$RadScheduler1";
    viewData["__EVENTARGUMENT"] = JSON.stringify({
      Command: "SwitchTo" + (document.body.getAttribute("data-pcrview") === "month" ? "Week" : "Month") + "View"
    });
    viewData["ctl00_ctl00_baseContent_baseContent_flashTop_ctl00_RadScheduler1_ClientState"] = JSON.stringify({
      scrollTop: 0,
      scrollLeft: 0,
      isDirty: false
    });
    viewData["ctl00_ctl00_RadScriptManager1_TSM"] = ";;System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35:en-US:d28568d3-e53e-4706-928f-3765912b66ca:ea597d4b:b25378d2";
    postArray = [];
    for (h in viewData) {
      v = viewData[h];
      postArray.push(encodeURIComponent(h) + "=" + encodeURIComponent(v));
    }
    return fetch(true, postArray.join("&"));
  }
});

document.getElementById("logout").addEventListener("click", function() {
  var h, postArray, v;
  if (Object.keys(viewData).length > 0) {
    deleteCookie("userPass");
    document.getElementById("sideBackground").click();
    viewData["__EVENTTARGET"] = "ctl00$ctl00$baseContent$LogoutControl1$LoginStatus1$ctl00";
    viewData["__EVENTARGUMENT"] = "";
    viewData["ctl00_ctl00_baseContent_baseContent_flashTop_ctl00_RadScheduler1_ClientState"] = JSON.stringify({
      scrollTop: 0,
      scrollLeft: 0,
      isDirty: false
    });
    postArray = [];
    for (h in viewData) {
      v = viewData[h];
      postArray.push(encodeURIComponent(h) + "=" + encodeURIComponent(v));
    }
    return fetch(true, postArray.join("&"));
  }
});

element = function(tag, cls, html, id) {
  var c, e, j, len;
  e = document.createElement(tag);
  if (typeof cls === "string") {
    e.classList.add(cls);
  } else {
    for (j = 0, len = cls.length; j < len; j++) {
      c = cls[j];
      e.classList.add(c);
    }
  }
  if (html != null) {
    e.innerHTML = html;
  }
  if (id != null) {
    e.setAttribute("id", id);
  }
  return e;
};

dateString = function(date, addThis) {
  var j, len, r, ref1, relative, today;
  if (addThis == null) {
    addThis = false;
  }
  if (date === "Forever") {
    return date;
  }
  relative = ["Tomorrow", "Today", "Yesterday", "2 days ago"];
  today = new Date();
  today.setDate(today.getDate() + 1);
  for (j = 0, len = relative.length; j < len; j++) {
    r = relative[j];
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return r;
    }
    today.setDate(today.getDate() - 1);
  }
  today = new Date();
  if ((0 < (ref1 = (date.getTime() - today.getTime()) / 1000 / 3600 / 24) && ref1 <= 6)) {
    return (addThis ? "This " : "") + weekdays[date.getDay()];
  }
  return weekdays[date.getDay()] + ", " + fullMonths[date.getMonth()] + " " + (date.getDate());
};

separate = function(cl) {
  return cl.match(/((?:\d*\s+)?(?:(?:hon\w*|(?:adv\w*\s*)?core)\s+)?)(.*)/i);
};

smoothScroll = function(to) {
  return new Promise(function(resolve, reject) {
    var amount, from, start, step;
    start = null;
    from = document.body.scrollTop;
    amount = to - from;
    step = function(timestamp) {
      var progress;
      if (start == null) {
        start = timestamp;
      }
      progress = timestamp - start;
      window.scrollTo(0, from + amount * (progress / 350));
      if (progress < 350) {
        return requestAnimationFrame(step);
      } else {
        setTimeout(function() {
          return document.querySelector("nav").classList.remove("headroom--unpinned");
        }, 1);
        return setTimeout(function() {
          return resolve();
        }, amount);
      }
    };
    return requestAnimationFrame(step);
  });
};

addActivity = function(type, assignment, newActivity, className) {
  var date, id, insertTo, ref1, te;
  if (className == null) {
    className = window.data.classes[assignment["class"]];
  }
  if (className == null) {
    className = "Unknown class";
  }
  insertTo = document.getElementById("infoActivity");
  date = newActivity === true ? Date.now() : newActivity;
  if (newActivity === true) {
    activity.push([type, assignment, Date.now(), className]);
  }
  te = element("div", ["activity", "assignmentItem", assignment.baseType, type], "<i class='material-icons'>" + type + "</i><span class='title'>" + assignment.title + "</span><small>" + (separate(className)[2]) + "</small><div class='range'>" + (dateString(new Date(date))) + "</div>", "activity" + assignment.id);
  te.setAttribute("data-class", className);
  id = assignment.id;
  if (type !== "delete") {
    (function(id) {
      return te.addEventListener("click", function() {
        var doScrolling;
        doScrolling = function() {
          var el;
          el = document.querySelector(".assignment[id*=\"" + id + "\"]");
          return smoothScroll(el.getBoundingClientRect().top + document.body.scrollTop - 116).then(function() {
            el.click();
          });
        };
        if (document.body.getAttribute("data-view") === "0") {
          return doScrolling();
        } else {
          document.querySelector("#navTabs>li:first-child").click();
          return setTimeout(doScrolling, 500);
        }
      });
    })(id);
  }
  if (ref1 = assignment.id, indexOf.call(done.array, ref1) >= 0) {
    te.classList.add("done");
  }
  return insertTo.insertBefore(te, insertTo.querySelector(".activity"));
};

display = function(doScroll) {
  var a, aa, ab, added, ae, af, ag, already, assignment, attachment, attachments, body, c, close, cls, complete, custom, d, date, day, dayTable, deleteA, deleted, diff, e, edit, edits, end, fn, fn1, fn2, fn3, fn4, found, h, id, j, k, l, lastData, lastSun, len, len1, len10, len2, len3, len4, len5, len6, len7, len8, len9, link, m, main, midDate, mods, month, n, name, nextSat, ns, num, o, oldAssignment, pos, previousAssignments, q, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, reference, restore, s, separateTaskClass, separated, smallTag, span, spanRelative, split, st, start, startSun, sw, taken, tdst, te, timeafter, times, today, todaySE, todayWk, todayWkId, tr, u, val, weekHeights, weekId, wk, wkId, year, z;
  if (doScroll == null) {
    doScroll = true;
  }
  console.time("Displaying data");
  document.body.setAttribute("data-pcrview", window.data.monthView ? "month" : "other");
  main = document.querySelector("main");
  taken = {};
  timeafter = {
    day: 24 * 3600 * 1000,
    ms: [24, 15 + 35 / 60, 15 + 35 / 60, 15 + 15 / 60, 15 + 15 / 60, 15 + 15 / 60, 24][(new Date()).getDay()],
    us: 15 * 3600 * 1000
  }[localStorage["hideassignments"]] || 24 * 3600 * 1000;
  today = Math.floor((Date.now() - tzoff) / 1000 / 3600 / 24);
  if (window.data.monthView) {
    start = Math.min.apply(Math, (function() {
      var j, len, ref1, results;
      ref1 = window.data.assignments;
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        assignment = ref1[j];
        results.push(assignment.start);
      }
      return results;
    })());
    end = Math.max.apply(Math, (function() {
      var j, len, ref1, results;
      ref1 = window.data.assignments;
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        assignment = ref1[j];
        results.push(assignment.end);
      }
      return results;
    })());
    year = (new Date()).getFullYear();
    month = (new Date()).getMonth();
    start = new Date(Math.max(fromDateNum(start), (new Date(year, month)).getTime()));
    end = new Date(Math.min(fromDateNum(end), (new Date(year, month + 1, 0)).getTime()));
  } else {
    todaySE = new Date();
    start = new Date(todaySE.getFullYear(), todaySE.getMonth(), todaySE.getDate());
    end = new Date(todaySE.getFullYear(), todaySE.getMonth(), todaySE.getDate());
  }
  start.setDate(start.getDate() - start.getDay());
  end.setDate(end.getDate() + (6 - end.getDay()));
  d = new Date(start);
  wk = null;
  lastData = localStorageRead("data");
  while (d <= end) {
    if (d.getDay() === 0) {
      id = "wk" + (d.getMonth()) + "-" + (d.getDate());
      if ((document.getElementById(id)) == null) {
        wk = element("section", "week", null, "wk" + (d.getMonth()) + "-" + (d.getDate()));
        dayTable = element("table", "dayTable");
        tr = dayTable.insertRow();
        for (day = j = 0; j < 7; day = ++j) {
          tr.insertCell();
        }
        wk.appendChild(dayTable);
        main.appendChild(wk);
      } else {
        wk = document.getElementById(id);
      }
    }
    if (wk.getElementsByClassName("day").length <= d.getDay()) {
      day = element("div", "day", null, "day");
      day.setAttribute("data-date", d.getTime());
      if (Math.floor((d.getTime() - d.getTimezoneOffset()) / 1000 / 3600 / 24) === today) {
        day.classList.add("today");
      }
      month = element("span", "month", months[d.getMonth()]);
      day.appendChild(month);
      date = element("span", "date", d.getDate());
      day.appendChild(date);
      wk.appendChild(day);
    }
    taken[d] = [];
    d.setDate(d.getDate() + 1);
  }
  split = [];
  ref1 = window.data.assignments;
  for (num = k = 0, len = ref1.length; k < len; num = ++k) {
    assignment = ref1[num];
    s = Math.max(start.getTime(), fromDateNum(assignment.start));
    e = Math.min(end.getTime(), fromDateNum(assignment.end));
    span = (e - s) / 1000 / 3600 / 24 + 1;
    spanRelative = 6 - (new Date(s)).getDay();
    ns = new Date(s);
    ns.setDate(ns.getDate() + spanRelative);
    n = -6;
    while (n < span - spanRelative) {
      lastSun = new Date(ns);
      lastSun.setDate(lastSun.getDate() + n);
      nextSat = new Date(lastSun);
      nextSat.setDate(nextSat.getDate() + 6);
      split.push({
        assignment: num,
        start: new Date(Math.max(s, lastSun.getTime())),
        end: new Date(Math.min(e, nextSat.getTime()))
      });
      n += 7;
    }
    if (lastData != null) {
      found = false;
      ref2 = lastData.assignments;
      for (num = l = 0, len1 = ref2.length; l < len1; num = ++l) {
        oldAssignment = ref2[num];
        if (oldAssignment.id === assignment.id) {
          found = true;
          if (oldAssignment.body !== assignment.body) {
            addActivity("edit", oldAssignment, true, lastData.classes[oldAssignment["class"]]);
            delete modified[assignment.id];
          }
          lastData.assignments.splice(num, 1);
          break;
        }
      }
      if (!found) {
        addActivity("add", assignment, true);
      }
    }
  }
  if (lastData != null) {
    ref3 = lastData.assignments;
    for (o = 0, len2 = ref3.length; o < len2; o++) {
      assignment = ref3[o];
      addActivity("delete", assignment, true, lastData.classes[assignment["class"]]);
      if (done.indexOf(assignment.id) >= 0) {
        done.splice(done.indexOf(assignment.id), 1);
      }
      delete modified[assignment.id];
    }
    localStorage["activity"] = JSON.stringify(activity.slice(activity.length - 128, activity.length));
    done.save();
    localStorage["modified"] = JSON.stringify(modified);
  }
  for (q = 0, len3 = extra.length; q < len3; q++) {
    custom = extra[q];
    cls = null;
    if (custom["class"] != null) {
      ref4 = data.classes;
      for (n = u = 0, len4 = ref4.length; u < len4; n = ++u) {
        c = ref4[n];
        if (c.toLowerCase().indexOf(custom["class"]) !== -1) {
          cls = n;
          break;
        }
      }
    }
    s = Math.max(start.getTime(), fromDateNum(custom.start));
    e = Math.min(end.getTime(), fromDateNum(custom.end != null ? custom.end : custom.start));
    span = (e - s) / 1000 / 3600 / 24 + 1;
    spanRelative = 6 - (new Date(s)).getDay();
    ns = new Date(s);
    ns.setDate(ns.getDate() + spanRelative);
    n = -6;
    while (n < span - spanRelative) {
      lastSun = new Date(ns);
      lastSun.setDate(lastSun.getDate() + n);
      nextSat = new Date(lastSun);
      nextSat.setDate(nextSat.getDate() + 6);
      split.push({
        start: new Date(Math.max(s, lastSun.getTime())),
        end: new Date(Math.min(e, nextSat.getTime())),
        custom: true,
        assignment: {
          title: "Task",
          baseType: "task",
          attachments: [],
          start: custom.start,
          end: custom.end || "Forever",
          body: custom.body,
          id: "task" + (custom.body.replace(/[^\w]*/g, "")) + custom.start + custom.end + custom["class"],
          "class": cls
        },
        reference: custom
      });
      n += 7;
    }
  }
  tdst = new Date();
  tdst.setDate(tdst.getDate() - tdst.getDay());
  todayWkId = "wk" + (tdst.getMonth()) + "-" + (tdst.getDate());
  weekHeights = {};
  previousAssignments = {};
  ref5 = document.getElementsByClassName("assignment");
  for (z = 0, len5 = ref5.length; z < len5; z++) {
    assignment = ref5[z];
    previousAssignments[assignment.getAttribute("id")] = assignment;
  }
  separateTaskClass = JSON.parse(localStorage["sepTaskClass"]);
  fn = function(id, reference) {
    return complete.addEventListener("mouseup", function(evt) {
      var ab, added, el, elem, len7, ref6;
      if (evt.which === 1) {
        el = this.parentNode;
        added = true;
        if (reference != null) {
          if (el.classList.contains("done")) {
            reference.done = false;
          } else {
            added = false;
            reference.done = true;
          }
          localStorage["extra"] = JSON.stringify(extra);
        } else {
          if (el.classList.contains("done")) {
            done.splice(done.indexOf(id), 1);
          } else {
            added = false;
            done.push(id);
          }
          done.save();
        }
        if (document.body.getAttribute("data-view") === "1") {
          setTimeout(function() {
            var ab, elem, len7, ref6;
            ref6 = document.querySelectorAll(".assignment[id^=\"" + id + "\"], #test" + id + ", #activity" + id + ", #ia" + id);
            for (ab = 0, len7 = ref6.length; ab < len7; ab++) {
              elem = ref6[ab];
              elem.classList.toggle("done");
            }
            if (added) {
              if (document.querySelectorAll(".assignment.listDisp:not(.done)").length !== 0) {
                document.body.classList.remove("noList");
              }
            } else {
              if (document.querySelectorAll(".assignment.listDisp:not(.done)").length === 0) {
                document.body.classList.add("noList");
              }
            }
            return resize();
          }, 100);
        } else {
          ref6 = document.querySelectorAll(".assignment[id^=\"" + id + "\"], #test" + id + ", #activity" + id + ", #ia" + id);
          for (ab = 0, len7 = ref6.length; ab < len7; ab++) {
            elem = ref6[ab];
            elem.classList.toggle("done");
          }
          if (added) {
            if (document.querySelectorAll(".assignment.listDisp:not(.done)").length !== 0) {
              document.body.classList.remove("noList");
            }
          } else {
            if (document.querySelectorAll(".assignment.listDisp:not(.done)").length === 0) {
              document.body.classList.add("noList");
            }
          }
        }
      }
    });
  };
  fn1 = function(id) {
    return edit.addEventListener("mouseup", function(evt) {
      var dn, el, remove;
      if (evt.which === 1) {
        el = evt.target;
        while (!el.classList.contains("editAssignment")) {
          el = el.parentNode;
        }
        remove = el.classList.contains("active");
        el.classList.toggle("active");
        el.parentNode.querySelector(".body").setAttribute("contentEditable", remove ? "false" : "true");
        if (!remove) {
          el.parentNode.querySelector(".body").focus();
        }
        dn = el.parentNode.querySelector(".complete");
        dn.style.display = remove ? "block" : "none";
      }
    });
  };
  fn2 = function(b, ad, di, ed, id, ref) {
    return body.addEventListener("input", function(evt) {
      var ab, additions, deletions, diff, len7;
      if (ref != null) {
        ref.body = evt.target.innerHTML;
        localStorage["extra"] = JSON.stringify(extra);
      } else {
        modified[id] = evt.target.innerHTML;
        localStorage["modified"] = JSON.stringify(modified);
        d = dmp.diff_main(b, evt.target.innerHTML);
        dmp.diff_cleanupSemantic(d);
        additions = 0;
        deletions = 0;
        for (ab = 0, len7 = d.length; ab < len7; ab++) {
          diff = d[ab];
          if (diff[0] === 1) {
            additions++;
          }
          if (diff[0] === -1) {
            deletions++;
          }
        }
        ad.innerHTML = additions !== 0 ? "+" + additions : "";
        di.innerHTML = deletions !== 0 ? "-" + deletions : "";
        if (additions !== 0 || deletions !== 0) {
          ed.classList.add("notEmpty");
        } else {
          ed.classList.remove("notEmpty");
        }
      }
      if (document.body.getAttribute("data-view") === "1") {
        return resize();
      }
    });
  };
  fn3 = function(b, bd, ed, id) {
    return restore.addEventListener("click", function() {
      delete modified[id];
      localStorage["modified"] = JSON.stringify(modified);
      bd.innerHTML = b;
      ed.classList.remove("notEmpty");
      if (document.body.getAttribute("data-view") === "1") {
        return resize();
      }
    });
  };
  for (aa = 0, len6 = split.length; aa < len6; aa++) {
    s = split[aa];
    assignment = s.custom ? s.assignment : window.data.assignments[s.assignment];
    reference = s.reference;
    separated = separate(assignment["class"] != null ? window.data.classes[assignment["class"]] : "Task");
    startSun = new Date(s.start.getTime());
    startSun.setDate(startSun.getDate() - startSun.getDay());
    weekId = "wk" + (startSun.getMonth()) + "-" + (startSun.getDate());
    smallTag = "small";
    link = null;
    if ((typeof athenaData !== "undefined" && athenaData !== null) && (athenaData[window.data.classes[assignment["class"]]] != null)) {
      link = athenaData[window.data.classes[assignment["class"]]].link;
      smallTag = "a";
    }
    e = element("div", ["assignment", assignment.baseType, "anim"], "<" + smallTag + (link != null ? " href='" + link + "' class='linked' target='_blank'" : "") + "><span class='extra'>" + separated[1] + "</span>" + separated[2] + "</" + smallTag + "><span class='title'>" + assignment.title + "</span><input type='hidden' class='due' value='" + (isNaN(assignment.end) ? 0 : assignment.end) + "' />", assignment.id + weekId);
    if (((reference != null) && reference.done) || (ref6 = assignment.id, indexOf.call(done.array, ref6) >= 0)) {
      e.classList.add("done");
    }
    e.setAttribute("data-class", s.custom && separateTaskClass ? "Task" : window.data.classes[assignment["class"]]);
    close = element("a", ["close", "material-icons"], "close");
    close.addEventListener("click", closeOpened);
    e.appendChild(close);
    if (link != null) {
      e.querySelector("a").addEventListener("click", function(evt) {
        var el;
        el = evt.target;
        while (!el.classList.contains("assignment")) {
          el = el.parentNode;
        }
        if (!(document.body.getAttribute("data-view") !== "0" || el.classList.contains("full"))) {
          return evt.preventDefault();
        }
      });
    }
    complete = element("a", ["complete", "material-icons", "waves"], "done");
    ripple(complete);
    id = assignment.id;
    fn(id, reference);
    e.appendChild(complete);
    if (s.custom) {
      deleteA = element("a", ["material-icons", "deleteAssignment", "waves"], "delete");
      (function(reference, e) {
        ripple(deleteA);
        return deleteA.addEventListener("mouseup", function(evt) {
          var back;
          if (evt.which === 1) {
            extra.splice(extra.indexOf(reference), 1);
            localStorage["extra"] = JSON.stringify(extra);
            if (document.querySelector(".full") != null) {
              document.body.style.overflow = "auto";
              back = document.getElementById("background");
              back.classList.remove("active");
              setTimeout(function() {
                return back.style.display = "none";
              }, 350);
            }
            e.remove();
            return display(false);
          }
        });
      })(reference, e);
      e.appendChild(deleteA);
    }
    edit = element("a", ["editAssignment", "material-icons", "waves"], "edit");
    fn1(id);
    ripple(edit);
    e.appendChild(edit);
    start = new Date(fromDateNum(assignment.start));
    end = isNaN(assignment.end) ? assignment.end : new Date(fromDateNum(assignment.end));
    times = element("div", "range", assignment.start === assignment.end ? dateString(start) : (dateString(start)) + " &ndash; " + (dateString(end)));
    e.appendChild(times);
    if (assignment.attachments.length > 0) {
      attachments = element("div", "attachments");
      ref7 = assignment.attachments;
      fn4 = function(attachment) {
        var a, req;
        a = element("a", [], attachment[0]);
        a.href = location.protocol === "chrome-extension:" ? "https://webappsca.pcrsoft.com/Clue/Common/AttachmentRender.aspx" + attachment[1] : "/api/attachment" + attachment[1];
        req = new XMLHttpRequest();
        req.open("HEAD", a.href);
        req.onload = function() {
          var type;
          if (req.status === 200) {
            type = req.getResponseHeader("Content-Type");
            if (mimeTypes[type] != null) {
              a.classList.add(mimeTypes[type][1]);
              span = element("span", [], mimeTypes[type][0]);
            } else {
              span = element("span", [], "Unknown file type");
            }
            a.appendChild(span);
          }
        };
        req.send();
        attachments.appendChild(a);
      };
      for (ab = 0, len7 = ref7.length; ab < len7; ab++) {
        attachment = ref7[ab];
        fn4(attachment);
      }
      e.appendChild(attachments);
    }
    body = element("div", "body", assignment.body.replace(/font-family:[^;]*?(?:Times New Roman|serif)[^;]*/g, ""));
    edits = element("div", "edits", "<span class='additions'></span><span class='deletions'></span>");
    if ((m = modified[assignment.id]) != null) {
      d = dmp.diff_main(assignment.body, m);
      dmp.diff_cleanupSemantic(d);
      if (d.length !== 0) {
        added = 0;
        deleted = 0;
        for (ae = 0, len8 = d.length; ae < len8; ae++) {
          diff = d[ae];
          if (diff[0] === 1) {
            added++;
          }
          if (diff[0] === -1) {
            deleted++;
          }
        }
        edits.querySelector(".additions").innerHTML = added !== 0 ? "+" + added : "";
        edits.querySelector(".deletions").innerHTML = deleted !== 0 ? "-" + deleted : "";
        edits.classList.add("notEmpty");
        body.innerHTML = m;
      }
    }
    fn2(assignment.body, edits.querySelector(".additions"), edits.querySelector(".deletions"), edits, assignment.id, reference);
    e.appendChild(body);
    restore = element("a", ["material-icons", "restore"], "settings_backup_restore");
    fn3(assignment.body, body, edits, assignment.id);
    edits.appendChild(restore);
    e.appendChild(edits);
    mods = element("div", ["mods"]);
    ref8 = activity.slice(activity.length - 32, activity.length);
    for (af = 0, len9 = ref8.length; af < len9; af++) {
      a = ref8[af];
      if (a[0] === "edit" && a[1].id === assignment.id) {
        d = dmp.diff_main(a[1].body, assignment.body);
        dmp.diff_cleanupSemantic(d);
        added = 0;
        deleted = 0;
        for (ag = 0, len10 = d.length; ag < len10; ag++) {
          diff = d[ag];
          if (diff[0] === 1) {
            added++;
          }
          if (diff[0] === -1) {
            deleted++;
          }
        }
        te = element("div", ["innerActivity", "assignmentItem", assignment.baseType], "<i class='material-icons'>edit</i><span class='title'>" + (dateString(new Date(a[2]))) + "</span><span class='additions'>" + (added !== 0 ? "+" + added : "") + "</span><span class='deletions'>" + (deleted !== 0 ? "-" + deleted : "") + "</span>", "ia" + assignment.id);
        te.setAttribute("data-class", window.data.classes[assignment["class"]]);
        te.appendChild(element("div", "iaDiff", dmp.diff_prettyHtml(d)));
        te.addEventListener("click", function() {
          this.classList.toggle("active");
          if (document.body.getAttribute("data-view") === "1") {
            return resize();
          }
        });
        mods.appendChild(te);
      }
    }
    e.appendChild(mods);
    if (start < s.start) {
      e.classList.add("fromWeekend");
    }
    if (end > s.end) {
      e.classList.add("overWeekend");
    }
    e.classList.add("s" + (s.start.getDay()));
    e.classList.add(isNaN(s.end) ? "e" + (6 - s.start.getDay()) : "e" + (6 - s.end.getDay()));
    st = Math.floor(s.start / 1000 / 3600 / 24);
    if (s.assignment.end === "Forever") {
      if (st <= today + listDateOffset) {
        e.classList.add("listDisp");
      }
    } else {
      midDate = new Date();
      midDate.setDate(midDate.getDate() + listDateOffset);
      if (((st - (assignment.baseType === "test" && assignment.start === st ? JSON.parse(localStorage["earlyTest"]) : 0)) * 1000 * 3600 * 24 + tzoff <= (ref9 = midDate.getTime()) && ref9 <= s.end.getTime() + (listDateOffset === 0 ? timeafter : 24 * 3600 * 1000))) {
        e.classList.add("listDisp");
      }
    }
    if (!s.custom || !JSON.parse(localStorage["sepTasks"])) {
      pos = 0;
      while (true) {
        found = true;
        d = new Date(s.start);
        while (d <= s.end) {
          if (taken[d].indexOf(pos) !== -1) {
            found = false;
          }
          d.setDate(d.getDate() + 1);
        }
        if (found) {
          break;
        }
        pos++;
      }
      d = new Date(s.start);
      while (d <= s.end) {
        taken[d].push(pos);
        d.setDate(d.getDate() + 1);
      }
      e.style.marginTop = pos * 30 + "px";
    }
    if (!s.custom || !JSON.parse(localStorage["sepTasks"])) {
      e.addEventListener("click", function(evt) {
        var back, el;
        el = evt.target;
        while (!el.classList.contains("assignment")) {
          el = el.parentNode;
        }
        if (document.getElementsByClassName("full").length === 0 && document.body.getAttribute("data-view") === "0") {
          el.classList.remove("anim");
          el.classList.add("modify");
          el.style.top = el.getBoundingClientRect().top - document.body.scrollTop - parseInt(el.style.marginTop) + 44 + "px";
          el.setAttribute("data-top", el.style.top);
          document.body.style.overflow = "hidden";
          back = document.getElementById("background");
          back.classList.add("active");
          back.style.display = "block";
          el.classList.add("anim");
          setTimeout(function() {
            el.classList.add("full");
            el.style.top = 75 - parseInt(el.style.marginTop) + "px";
            return setTimeout(function() {
              return el.classList.remove("anim");
            }, 350);
          }, 0);
        }
      });
    }
    wk = document.getElementById(weekId);
    if (wk == null) {
      continue;
    }
    if ((assignment.baseType === "test" || (localStorageRead("projectsInTestPane") && assignment.baseType === "longterm")) && assignment.end >= today) {
      te = element("div", ["upcomingTest", "assignmentItem", assignment.baseType], "<i class='material-icons'>" + (assignment.baseType === "longterm" ? "assignment" : "assessment") + "</i><span class='title'>" + assignment.title + "</span><small>" + separated[2] + "</small><div class='range'>" + (dateString(end, true)) + "</div>", "test" + assignment.id);
      te.setAttribute("data-class", window.data.classes[assignment["class"]]);
      id = assignment.id;
      (function(id) {
        return te.addEventListener("click", function() {
          var doScrolling;
          doScrolling = function() {
            var el;
            el = document.querySelector(".assignment[id*=\"" + id + "\"]");
            return smoothScroll(el.getBoundingClientRect().top + document.body.scrollTop - 116).then(function() {
              el.click();
            });
          };
          if (document.body.getAttribute("data-view") === "0") {
            return doScrolling();
          } else {
            document.querySelector("#navTabs>li:first-child").click();
            return setTimeout(doScrolling, 500);
          }
        });
      })(id);
      if (ref10 = assignment.id, indexOf.call(done.array, ref10) >= 0) {
        te.classList.add("done");
      }
      if (document.getElementById("test" + assignment.id) != null) {
        document.getElementById("test" + assignment.id).innerHTML = te.innerHTML;
      } else {
        document.getElementById("infoTests").appendChild(te);
      }
    }
    if ((weekHeights[weekId] == null) || pos > weekHeights[weekId]) {
      weekHeights[weekId] = pos;
      wk.style.height = 47 + (pos + 1) * 30 + "px";
    }
    already = document.getElementById(assignment.id + weekId);
    if (already != null) {
      already.style.marginTop = e.style.marginTop;
      already.setAttribute("data-class", s.custom && separateTaskClass ? "Task" : window.data.classes[assignment["class"]]);
      if (modified[assignment.id] == null) {
        already.getElementsByClassName("body")[0].innerHTML = e.getElementsByClassName("body")[0].innerHTML;
      }
      already.querySelector(".edits").className = e.querySelector(".edits").className;
      if (already.classList.toggle != null) {
        already.classList.toggle("listDisp", e.classList.contains("listDisp"));
      }
    } else {
      if (s.custom && JSON.parse(localStorage["sepTasks"])) {
        if (assignment.start === st && assignment.end >= today) {
          e.classList.remove("assignment");
          e.classList.add("taskPaneItem");
          e.style.order = assignment.end;
          if ((link = e.querySelector(".linked")) != null) {
            e.insertBefore(element("small", [], link.innerHTML), link);
            link.remove();
          }
          document.getElementById("infoTasksInner").appendChild(e);
        }
      } else {
        wk.appendChild(e);
      }
    }
    delete previousAssignments[assignment.id + weekId];
  }
  for (name in previousAssignments) {
    assignment = previousAssignments[name];
    if (assignment.classList.contains("full")) {
      document.getElementById("background").classList.remove("active");
    }
    assignment.remove();
  }
  if (weekHeights[todayWkId] != null) {
    h = 0;
    sw = function(wkid) {
      var ah, len11, ref11, results, x;
      ref11 = wkid.substring(2).split("-");
      results = [];
      for (ah = 0, len11 = ref11.length; ah < len11; ah++) {
        x = ref11[ah];
        results.push(parseInt(x));
      }
      return results;
    };
    todayWk = sw(todayWkId);
    for (wkId in weekHeights) {
      val = weekHeights[wkId];
      wk = sw(wkId);
      if (wk[0] < todayWk[0] || (wk[0] === todayWk[0] && wk[1] < todayWk[1])) {
        h += val;
      }
    }
    scroll = h * 30 + 112 + 14;
    if (scroll < 50) {
      scroll = 0;
    }
    if (doScroll && document.body.getAttribute("data-view") === "0" && !document.body.querySelector(".full")) {
      window.scrollTo(0, scroll);
    }
  }
  document.body.classList.toggle("noList", document.querySelectorAll(".assignment.listDisp:not(.done)").length === 0);
  if (document.body.getAttribute("data-view") === "1") {
    resize();
  }
  return console.timeEnd("Displaying data");
};

closeOpened = function(evt) {
  var back, el;
  evt.stopPropagation();
  el = document.querySelector(".full");
  if (el == null) {
    return;
  }
  el.style.top = el.getAttribute("data-top");
  el.classList.add("anim");
  el.classList.remove("full");
  el.scrollTop = 0;
  document.body.style.overflow = "auto";
  back = document.getElementById("background");
  back.classList.remove("active");
  return setTimeout(function() {
    back.style.display = "none";
    el.classList.remove("anim");
    el.classList.remove("modify");
    el.style.top = "auto";
    el.offsetHeight;
    return el.classList.add("anim");
  }, 1000);
};

document.getElementById("background").addEventListener("click", closeOpened);

ripple = function(el) {
  el.addEventListener("mousedown", function(evt) {
    var e, rect, size, target, wave, x, y;
    if (evt.which === 1) {
      target = evt.target.classList.contains("wave") ? evt.target.parentNode : evt.target;
      wave = element("span", "wave");
      size = Math.max(parseInt(target.offsetWidth), parseInt(target.offsetHeight));
      wave.style.width = wave.style.height = size + "px";
      e = evt.target;
      x = evt.clientX;
      y = evt.clientY;
      rect = e.getBoundingClientRect();
      x -= rect.left;
      y -= rect.top;
      wave.style.top = y - size / 2 + "px";
      wave.style.left = x - size / 2 + "px";
      target.appendChild(wave);
      wave.setAttribute("data-hold", Date.now());
      wave.offsetWidth;
      wave.style.transform = "scale(2.5)";
    }
  });
  el.addEventListener("mouseup", function(evt) {
    var fn, j, len, target, wave, waves;
    if (evt.which === 1) {
      target = evt.target.classList.contains("wave") ? evt.target.parentNode : evt.target;
      waves = target.getElementsByClassName("wave");
      fn = function(wave) {
        var delay, diff;
        diff = Date.now() - Number(wave.getAttribute("data-hold"));
        delay = Math.max(350 - diff, 0);
        return setTimeout(function() {
          wave.style.opacity = "0";
          return setTimeout(function() {
            return wave.remove();
          }, 550);
        }, delay);
      };
      for (j = 0, len = waves.length; j < len; j++) {
        wave = waves[j];
        fn(wave);
      }
    }
  });
};

ref1 = document.querySelectorAll("#navTabs>li");
for (j = 0, len = ref1.length; j < len; j++) {
  tab = ref1[j];
  tab.addEventListener("click", function(evt) {
    var assignment, assignments, columnHeights, columns, index, k, l, len1, len2, ref2, start, step, trans, w, widths;
    if (typeof ga !== "undefined" && ga !== null) {
      ga('send', 'event', 'navigation', evt.target.textContent, {
        page: '/new.html',
        title: "Version " + version
      });
    }
    trans = JSON.parse(localStorage["viewTrans"]);
    if (!trans) {
      document.body.classList.add("noTrans");
      document.body.offsetHeight;
    }
    document.body.setAttribute("data-view", localStorage["view"] = (Array.prototype.slice.call(document.querySelectorAll("#navTabs>li"))).indexOf(evt.target));
    if (document.body.getAttribute("data-view") === "1") {
      window.addEventListener("resize", resizeCaller);
      if (trans) {
        start = null;
        widths = document.body.classList.contains("showInfo") ? [650, 1100, 1800, 2700, 3800, 5100] : [350, 800, 1500, 2400, 3500, 4800];
        columns = null;
        for (index = k = 0, len1 = widths.length; k < len1; index = ++k) {
          w = widths[index];
          if (window.innerWidth > w) {
            columns = index + 1;
          }
        }
        assignments = getResizeAssignments();
        columnHeights = (function() {
          var l, ref2, results;
          results = [];
          for (l = 0, ref2 = columns; 0 <= ref2 ? l < ref2 : l > ref2; 0 <= ref2 ? l++ : l--) {
            results.push(0);
          }
          return results;
        })();
        step = function(timestamp) {
          var assignment, col, l, len2, n;
          if (start == null) {
            start = timestamp;
          }
          for (n = l = 0, len2 = assignments.length; l < len2; n = ++l) {
            assignment = assignments[n];
            col = n % columns;
            if (n < columns) {
              columnHeights[col] = 0;
            }
            assignment.style.top = columnHeights[col] + "px";
            assignment.style.left = 100 / columns * col + "%";
            assignment.style.right = 100 / columns * (columns - col - 1) + "%";
            columnHeights[col] += assignment.offsetHeight + 24;
          }
          if (timestamp - start < 350) {
            return window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        setTimeout(function() {
          var assignment, col, l, len2, n;
          for (n = l = 0, len2 = assignments.length; l < len2; n = ++l) {
            assignment = assignments[n];
            col = n % columns;
            if (n < columns) {
              columnHeights[col] = 0;
            }
            assignment.style.top = columnHeights[col] + "px";
            columnHeights[col] += assignment.offsetHeight + 24;
          }
        }, 350);
      } else {
        resize();
      }
    } else {
      window.scrollTo(0, scroll);
      document.querySelector("nav").classList.add("headroom--locked");
      setTimeout(function() {
        document.querySelector("nav").classList.remove("headroom--unpinned");
        document.querySelector("nav").classList.remove("headroom--locked");
        document.querySelector("nav").classList.add("headroom--pinned");
        return requestIdleCallback(function() {
          listDateOffset = 0;
          updateListNav();
          return display();
        }, {
          timeout: 2000
        });
      }, 350);
      window.removeEventListener("resize", resizeCaller);
      ref2 = document.getElementsByClassName("assignment");
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        assignment = ref2[l];
        assignment.style.top = "auto";
      }
    }
    if (!trans) {
      document.body.offsetHeight;
      setTimeout(function() {
        return document.body.classList.remove("noTrans");
      }, 350);
    }
  });
}

ref2 = document.querySelectorAll("#infoTabs>li");
for (k = 0, len1 = ref2.length; k < len1; k++) {
  tab = ref2[k];
  tab.addEventListener("click", function(evt) {
    return document.getElementById("info").setAttribute("data-view", (Array.prototype.slice.call(document.querySelectorAll("#infoTabs>li"))).indexOf(evt.target));
  });
}

ticking = false;

timeoutId = null;

getResizeAssignments = function() {
  var assignments;
  assignments = Array.prototype.slice.call(document.querySelectorAll(document.body.classList.contains("showDone") ? ".assignment.listDisp" : ".assignment.listDisp:not(.done)"));
  assignments.sort(function(a, b) {
    var ad, bd;
    ad = a.classList.contains("done");
    bd = b.classList.contains("done");
    if (ad && !bd) {
      return 1;
    }
    if (bd && !ad) {
      return -1;
    }
    return a.getElementsByClassName("due")[0].value - b.getElementsByClassName("due")[0].value;
  });
  return assignments;
};

resizeCaller = function() {
  if (!ticking) {
    requestAnimationFrame(resize);
    return ticking = true;
  }
};

resize = function() {
  var assignment, assignments, cch, col, columnHeights, columns, index, l, len2, len3, len4, n, o, q, w, widths;
  ticking = true;
  widths = document.body.classList.contains("showInfo") ? [650, 1100, 1800, 2700, 3800, 5100] : [350, 800, 1500, 2400, 3500, 4800];
  columns = 1;
  for (index = l = 0, len2 = widths.length; l < len2; index = ++l) {
    w = widths[index];
    if (window.innerWidth > w) {
      columns = index + 1;
    }
  }
  columnHeights = (function() {
    var o, ref3, results;
    results = [];
    for (o = 0, ref3 = columns; 0 <= ref3 ? o < ref3 : o > ref3; 0 <= ref3 ? o++ : o--) {
      results.push(0);
    }
    return results;
  })();
  cch = [];
  assignments = getResizeAssignments();
  for (n = o = 0, len3 = assignments.length; o < len3; n = ++o) {
    assignment = assignments[n];
    col = n % columns;
    cch.push(columnHeights[col]);
    columnHeights[col] += assignment.offsetHeight + 24;
  }
  for (n = q = 0, len4 = assignments.length; q < len4; n = ++q) {
    assignment = assignments[n];
    col = n % columns;
    assignment.style.top = cch[n] + "px";
    assignment.style.left = 100 / columns * col + "%";
    assignment.style.right = 100 / columns * (columns - col - 1) + "%";
  }
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function() {
    var len5, len6, u, z;
    cch.length = 0;
    for (n = u = 0, len5 = assignments.length; u < len5; n = ++u) {
      assignment = assignments[n];
      col = n % columns;
      if (n < columns) {
        columnHeights[col] = 0;
      }
      cch.push(columnHeights[col]);
      columnHeights[col] += assignment.offsetHeight + 24;
    }
    for (n = z = 0, len6 = assignments.length; z < len6; n = ++z) {
      assignment = assignments[n];
      assignment.style.top = cch[n] + "px";
    }
  }, 500);
  ticking = false;
};

if (localStorage["view"] != null) {
  document.body.setAttribute("data-view", localStorage["view"]);
  if (localStorage["view"] === "1") {
    window.addEventListener("resize", resizeCaller);
  }
}

ref3 = document.querySelectorAll("input[type=text]:not(#newText):not([readonly]), input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number]:not(.control), input[type=search]");
for (l = 0, len2 = ref3.length; l < len2; l++) {
  input = ref3[l];
  input.addEventListener("change", function(evt) {
    return evt.target.parentNode.querySelector("label").classList.add("active");
  });
  input.addEventListener("focus", function(evt) {
    return evt.target.parentNode.querySelector("label").classList.add("active");
  });
  input.addEventListener("blur", function(evt) {
    if (evt.target.value.length === 0) {
      return evt.target.parentNode.querySelector("label").classList.remove("active");
    }
  });
}

window.addEventListener("keydown", function(evt) {
  if (evt.which === 27) {
    if (document.getElementsByClassName("full").length !== 0) {
      return closeOpened(new Event("Generated Event"));
    }
  }
});

(function() {
  var today;
  today = new Date();
  if ((new Date(today.getFullYear(), 10, 27) <= today && today <= new Date(today.getFullYear(), 11, 32))) {
    return document.body.classList.add("winter");
  }
})();

navToggle = function(element, ls, f) {
  ripple(document.getElementById(element));
  document.getElementById(element).addEventListener("mouseup", function() {
    document.body.classList.toggle(ls);
    resize();
    localStorage[ls] = JSON.stringify(document.body.classList.contains(ls));
    if (f != null) {
      return f();
    }
  });
  if ((localStorage[ls] != null) && JSON.parse(localStorage[ls])) {
    return document.body.classList.add(ls);
  }
};

navToggle("cvButton", "showDone", function() {
  return setTimeout(resize, 1000);
});

if (localStorage["showInfo"] == null) {
  localStorage["showInfo"] = JSON.stringify(true);
}

navToggle("infoButton", "showInfo");

navToggle("lightButton", "dark");

animateEl = function() {
  var args, el;
  el = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  return new Promise(function(resolve, reject) {
    var player;
    player = el.animate.apply(el, args);
    return player.onfinish = function(e) {
      return resolve(e);
    };
  });
};

document.getElementById("listnext").addEventListener("click", function() {
  var nd, pd, td;
  pd = document.getElementById("listprevdate");
  td = document.getElementById("listnowdate");
  nd = document.getElementById("listnextdate");
  listDateOffset += 1;
  display();
  nd.style.display = "inline-block";
  return Promise.race([
    animateEl(td, [
      {
        transform: 'translateX(0%)',
        opacity: 1
      }, {
        opacity: 0
      }, {
        transform: 'translateX(-100%)',
        opacity: 0
      }
    ], {
      duration: 300,
      easing: "ease-out"
    }), animateEl(nd, [
      {
        transform: 'translateX(0%)',
        opacity: 0
      }, {
        opacity: 0
      }, {
        transform: 'translateX(-100%)',
        opacity: 1
      }
    ], {
      duration: 300,
      easing: "ease-out"
    })
  ]).then(function() {
    var listDate2;
    pd.innerHTML = td.innerHTML;
    td.innerHTML = nd.innerHTML;
    listDate2 = new Date();
    listDate2.setDate(listDate2.getDate() + 1 + listDateOffset);
    nd.innerHTML = dateString(listDate2).replace("Today", "Now");
    return nd.style.display = "none";
  });
});

document.getElementById("listbefore").addEventListener("click", function() {
  var nd, pd, td;
  pd = document.getElementById("listprevdate");
  td = document.getElementById("listnowdate");
  nd = document.getElementById("listnextdate");
  listDateOffset -= 1;
  display();
  pd.style.display = "inline-block";
  return Promise.race([
    animateEl(td, [
      {
        transform: 'translateX(-100%)',
        opacity: 1
      }, {
        opacity: 0
      }, {
        transform: 'translateX(0%)',
        opacity: 0
      }
    ], {
      duration: 300,
      easing: "ease-out"
    }), animateEl(pd, [
      {
        transform: 'translateX(-100%)',
        opacity: 0
      }, {
        opacity: 0
      }, {
        transform: 'translateX(0%)',
        opacity: 1
      }
    ], {
      duration: 300,
      easing: "ease-out"
    })
  ]).then(function() {
    var listDate2;
    nd.innerHTML = td.innerHTML;
    td.innerHTML = pd.innerHTML;
    listDate2 = new Date();
    listDate2.setDate(listDate2.getDate() + listDateOffset - 1);
    pd.innerHTML = dateString(listDate2).replace("Today", "Now");
    return pd.style.display = "none";
  });
});

updateListNav = function() {
  var d, up;
  d = new Date();
  d.setDate(d.getDate() + listDateOffset - 1);
  up = function(id) {
    document.getElementById(id).innerHTML = dateString(d).replace("Today", "Now");
    return d.setDate(d.getDate() + 1);
  };
  up("listprevdate");
  up("listnowdate");
  return up("listnextdate");
};

switchToList = function(evt) {
  var today;
  if (evt.target.classList.contains("month") || evt.target.classList.contains("date")) {
    today = Math.floor((Date.now() - tzoff) / 1000 / 3600 / 24);
    listDateOffset = (evt.target.parentNode.getAttribute("data-date") - tzoff) / 1000 / 3600 / 24 - today;
    updateListNav();
    document.body.setAttribute("data-view", "1");
    return display();
  }
};

document.body.addEventListener("dblclick", switchToList);

document.body.addEventListener("webkitmouseforceup", switchToList);

(function() {
  var taptimer;
  taptimer = null;
  document.body.addEventListener("touchstart", function(evt) {
    return taptimer = setTimeout((function() {
      return switchToList(evt);
    }), 1000);
  });
  return document.body.addEventListener("touchend", function(evt) {
    return taptimer = clearTimeout(taptimer);
  });
})();

headroom = new Headroom(document.querySelector("nav"), {
  tolerance: 10,
  offset: 66
});

headroom.init();

document.getElementById("collapseButton").addEventListener("click", function() {
  document.body.style.overflow = "hidden";
  document.getElementById("sideNav").classList.add("active");
  return document.getElementById("sideBackground").style.display = "block";
});

document.getElementById("sideBackground").addEventListener("click", function() {
  document.getElementById("sideBackground").style.opacity = 0;
  document.getElementById("sideNav").classList.remove("active");
  document.getElementById("dragTarget").style.width = "";
  return setTimeout(function() {
    document.body.style.overflow = "auto";
    return document.getElementById("sideBackground").style.display = "none";
  }, 350);
});

labrgb = function(_L, _a, _b) {
  var _B, _G, _R, _X, _Y, _Z, dot_product, f_inv, from_linear, lab_e, lab_k, m, n, ref_X, ref_Y, ref_Z, tuple, var_x, var_y, var_z;
  ref_X = 0.95047;
  ref_Y = 1.00000;
  ref_Z = 1.08883;
  lab_e = 0.008856;
  lab_k = 903.3;
  f_inv = function(t) {
    if (Math.pow(t, 3) > lab_e) {
      return Math.pow(t, 3);
    } else {
      return (116 * t - 16) / lab_k;
    }
  };
  dot_product = function(a, b) {
    var i, o, ref4, ret;
    ret = 0;
    for (i = o = 0, ref4 = a.length - 1; 0 <= ref4 ? o <= ref4 : o >= ref4; i = 0 <= ref4 ? ++o : --o) {
      ret += a[i] * b[i];
    }
    return ret;
  };
  var_y = (_L + 16) / 116;
  var_z = var_y - _b / 200;
  var_x = _a / 500 + var_y;
  _X = ref_X * f_inv(var_x);
  _Y = ref_Y * f_inv(var_y);
  _Z = ref_Z * f_inv(var_z);
  tuple = [_X, _Y, _Z];
  m = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];
  from_linear = function(c) {
    var a;
    a = 0.055;
    if (c <= 0.0031308) {
      return 12.92 * c;
    } else {
      return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    }
  };
  _R = from_linear(dot_product(m[0], tuple));
  _G = from_linear(dot_product(m[1], tuple));
  _B = from_linear(dot_product(m[2], tuple));
  n = function(v) {
    return Math.round(Math.max(Math.min(v * 256, 255), 0));
  };
  return "rgb(" + (n(_R)) + ", " + (n(_G)) + ", " + (n(_B)) + ")";
};

updateAvatar = function() {
  var bg, initials;
  if (localStorage["username"] != null) {
    document.getElementById("user").innerHTML = localStorage["username"];
    initials = localStorage["username"].match(/\d*(.).*?(.$)/);
    if (initials != null) {
      bg = labrgb(50, (initials[1].charCodeAt(0) - 65) / 26 * 256 - 128, (initials[2].charCodeAt(0) - 65) / 26 * 256 - 128);
      document.getElementById("initials").style.backgroundColor = bg;
      return document.getElementById("initials").innerHTML = initials[1] + initials[2];
    }
  }
};

updateAvatar();

athenaData = localStorage["athenaData"] != null ? JSON.parse(localStorage["athenaData"]) : null;

parseAthenaData = function(dat) {
  var allCourseDetails, athenaData2, course, courseDetails, d, e, error1, len3, o, q, ref4, ref5, section;
  if (dat === "") {
    athenaData = null;
    localStorage.removeItem("athenaData");
  } else {
    try {
      d = JSON.parse(dat);
      athenaData2 = {};
      allCourseDetails = {};
      ref4 = d.body.courses.sections;
      for (o = 0, len3 = ref4.length; o < len3; o++) {
        section = ref4[o];
        allCourseDetails[section.course_nid] = section;
      }
      ref5 = d.body.courses.courses;
      for (q = ref5.length - 1; q >= 0; q += -1) {
        course = ref5[q];
        courseDetails = allCourseDetails[course.nid];
        athenaData2[course.course_title] = {
          link: "https://athena.harker.org" + courseDetails.link,
          logo: courseDetails.logo.substr(0, courseDetails.logo.indexOf("\" alt=\"")).replace("<div class=\"profile-picture\"><img src=\"", "").replace("tiny", "reg"),
          period: courseDetails.section_title
        };
      }
      athenaData = athenaData2;
      localStorage["athenaData"] = JSON.stringify(athenaData);
      document.getElementById("athenaDataError").style.display = "none";
      document.getElementById("athenaDataRefresh").style.display = "block";
    } catch (error1) {
      e = error1;
      document.getElementById("athenaDataError").style.display = "block";
      document.getElementById("athenaDataRefresh").style.display = "none";
      document.getElementById("athenaDataError").innerHTML = e.message;
    }
  }
};

document.getElementById("version").innerHTML = version;

document.getElementById("settingsB").addEventListener("click", function() {
  document.getElementById("sideBackground").click();
  document.body.classList.add("settingsShown");
  document.getElementById("brand").innerHTML = "Settings";
  return setTimeout(function() {
    return document.querySelector("main").style.display = "none";
  });
});

document.getElementById("backButton").addEventListener("click", function() {
  document.querySelector("main").style.display = "block";
  document.body.classList.remove("settingsShown");
  return document.getElementById("brand").innerHTML = "Check PCR";
});

if (localStorage["viewTrans"] == null) {
  localStorage["viewTrans"] = JSON.stringify(true);
}

if (localStorage["earlyTest"] == null) {
  localStorage["earlyTest"] = JSON.stringify(1);
}

if (localStorage["googleA"] == null) {
  localStorage["googleA"] = JSON.stringify(true);
}

if (localStorage["sepTasks"] == null) {
  localStorage["sepTasks"] = JSON.stringify(false);
}

if (localStorage["sepTaskClass"] == null) {
  localStorage["sepTaskClass"] = JSON.stringify(true);
}

if (localStorage["projectsInTestPane"] == null) {
  localStorage["projectsInTestPane"] = JSON.stringify(false);
}

if (localStorage["hideassignments"] == null) {
  localStorage["hideassignments"] = JSON.stringify("day");
}

if (JSON.parse(localStorage["sepTasks"])) {
  document.getElementById("info").classList.add("isTasks");
  document.getElementById("new").style.display = "none";
}

if (localStorage["holidayThemes"] == null) {
  localStorage["holidayThemes"] = JSON.stringify(false);
}

if (JSON.parse(localStorage["holidayThemes"])) {
  document.body.classList.add("holidayThemes");
}

if (JSON.parse(localStorage["sepTaskClass"])) {
  document.body.classList.add("sepTaskClass");
}

if (localStorage["colorType"] == null) {
  localStorage["colorType"] = "assignment";
}

if (localStorage["assignmentColors"] == null) {
  localStorage["assignmentColors"] = JSON.stringify({
    homework: "#2196f3",
    classwork: "#689f38",
    test: "#f44336",
    longterm: "#f57c00"
  });
}

if ((localStorageRead("data") != null) && (localStorage["classColors"] == null)) {
  a = {};
  ref4 = localStorageRead("data").classes;
  for (o = 0, len3 = ref4.length; o < len3; o++) {
    c = ref4[o];
    a[c] = "#616161";
  }
  localStorage["classColors"] = JSON.stringify(a);
}

document.getElementById(localStorage["colorType"] + "Colors").style.display = "block";

if (localStorage["refreshOnFocus"] == null) {
  localStorage["refreshOnFocus"] = JSON.stringify(true);
}

window.addEventListener("focus", function() {
  if (JSON.parse(localStorage["refreshOnFocus"])) {
    return fetch();
  }
});

if (localStorage["refreshRate"] == null) {
  localStorage["refreshRate"] = JSON.stringify(-1);
}

intervalRefresh = function() {
  var r;
  r = JSON.parse(localStorage["refreshRate"]);
  if (r > 0) {
    return setTimeout(function() {
      console.debug("Refreshing because of timer");
      fetch();
      return intervalRefresh();
    }, r * 60 * 1000);
  }
};

intervalRefresh();

ac = JSON.parse(localStorage["assignmentColors"]);

cc = localStorage["classColors"] != null ? JSON.parse(localStorage["classColors"]) : {};

palette = {
  "#f44336": "#B71C1C",
  "#e91e63": "#880E4F",
  "#9c27b0": "#4A148C",
  "#673ab7": "#311B92",
  "#3f51b5": "#1A237E",
  "#2196f3": "#0D47A1",
  "#03a9f4": "#01579B",
  "#00bcd4": "#006064",
  "#009688": "#004D40",
  "#4caf50": "#1B5E20",
  "#689f38": "#33691E",
  "#afb42b": "#827717",
  "#fbc02d": "#F57F17",
  "#ffa000": "#FF6F00",
  "#f57c00": "#E65100",
  "#ff5722": "#BF360C",
  "#795548": "#3E2723",
  "#616161": "#212121"
};

if (localStorageRead("data") != null) {
  ref5 = localStorageRead("data").classes;
  for (q = 0, len4 = ref5.length; q < len4; q++) {
    c = ref5[q];
    d = element("div", [], c);
    d.setAttribute("data-control", c);
    d.appendChild(element("span", []));
    document.getElementById("classColors").appendChild(d);
  }
}

ref6 = document.getElementsByClassName("colors");
for (u = 0, len5 = ref6.length; u < len5; u++) {
  e = ref6[u];
  ref7 = e.getElementsByTagName("div");
  fn = function(sp, color, list, listName) {
    sp.addEventListener("click", function(evt) {
      var bg;
      if (sp.classList.contains("choose")) {
        bg = tinycolor(evt.target.style.backgroundColor).toHexString();
        list[color.getAttribute("data-control")] = bg;
        sp.style.backgroundColor = bg;
        if (sp.querySelector(".selected") != null) {
          sp.querySelector(".selected").classList.remove("selected");
        }
        evt.target.classList.add("selected");
        localStorage[listName] = JSON.stringify(list);
        updateColors();
      }
      return sp.classList.toggle("choose");
    });
    return custom.querySelector(".customOk").addEventListener("click", function(evt) {
      this.parentNode.parentNode.classList.remove("onCustom");
      this.parentNode.parentNode.classList.toggle("choose");
      if (sp.querySelector(".selected") != null) {
        sp.querySelector(".selected").classList.remove("selected");
      }
      sp.style.backgroundColor = list[color.getAttribute("data-control")] = this.parentNode.querySelector("input").value;
      localStorage[listName] = JSON.stringify(list);
      updateColors();
      return evt.stopPropagation();
    });
  };
  for (z = 0, len6 = ref7.length; z < len6; z++) {
    color = ref7[z];
    sp = color.querySelector("span");
    listName = e.getAttribute("id") === "classColors" ? "classColors" : "assignmentColors";
    list = e.getAttribute("id") === "classColors" ? cc : ac;
    sp.style.backgroundColor = list[color.getAttribute("data-control")];
    for (p in palette) {
      pe = element("span", []);
      pe.style.backgroundColor = p;
      if (p === list[color.getAttribute("data-control")]) {
        pe.classList.add("selected");
      }
      sp.appendChild(pe);
    }
    custom = element("span", ["customColor"], "<a>Custom</a> <input type='text' placeholder='Was " + list[color.getAttribute("data-control")] + "' /> <span class='customInfo'>Use any CSS valid color name, such as <code>#F44336</code> or <code>rgb(64, 43, 2)</code> or <code>cyan</code></span> <a class='customOk'>Set</a>");
    custom.addEventListener("click", function(evt) {
      return evt.stopPropagation();
    });
    custom.querySelector("a").addEventListener("click", function(evt) {
      this.parentNode.parentNode.classList.toggle("onCustom");
      return evt.stopPropagation();
    });
    sp.appendChild(custom);
    fn(sp, color, list, listName);
  }
}

updateColors = function() {
  var addColorRule, createPalette, name, ref8, ref9, sheet, style;
  style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);
  sheet = style.sheet;
  addColorRule = function(selector, light, dark, extra) {
    if (extra == null) {
      extra = "";
    }
    sheet.insertRule(extra + ".assignment" + selector + " { background-color: " + light + "; }", 0);
    sheet.insertRule(extra + ".assignment" + selector + ".done { background-color: " + dark + "; }", 0);
    sheet.insertRule(extra + ".assignment" + selector + "::before { background-color: " + (tinycolor.mix(light, "#1B5E20", 70).toHexString()) + "; }", 0);
    sheet.insertRule(extra + ".assignmentItem" + selector + ">i { background-color: " + light + "; }", 0);
    return sheet.insertRule(extra + ".assignmentItem" + selector + ".done>i { background-color: " + dark + "; }", 0);
  };
  createPalette = function(color) {
    return tinycolor(color).darken(24).toHexString();
  };
  if (localStorage["colorType"] === "assignment") {
    ref8 = JSON.parse(localStorage["assignmentColors"]);
    for (name in ref8) {
      color = ref8[name];
      addColorRule("." + name, color, palette[color] || createPalette(color));
    }
  } else {
    ref9 = JSON.parse(localStorage["classColors"]);
    for (name in ref9) {
      color = ref9[name];
      addColorRule("[data-class=\"" + name + "\"]", color, palette[color] || createPalette(color));
    }
  }
  addColorRule(".task", "#F5F5F5", "#E0E0E0");
  addColorRule(".task", "#424242", "#212121", ".dark ");
};

updateColors();

ref8 = document.getElementsByClassName("settingsControl");
for (aa = 0, len7 = ref8.length; aa < len7; aa++) {
  e = ref8[aa];
  if (localStorage[e.name] != null) {
    if (e.type === "checkbox") {
      e.checked = JSON.parse(localStorage[e.name]);
    } else {
      e.value = JSON.parse(localStorage[e.name]);
    }
  }
  e.addEventListener("change", function(evt) {
    if (evt.target.type === "checkbox") {
      localStorage[evt.target.name] = JSON.stringify(evt.target.checked);
    } else {
      localStorage[evt.target.name] = JSON.stringify(evt.target.value);
    }
    switch (evt.target.name) {
      case "refreshRate":
        return intervalRefresh();
      case "earlyTest":
        return display();
      case "projectsInTestPane":
        return display();
      case "hideassignments":
        return display();
      case "holidayThemes":
        return document.body.classList.toggle("holidayThemes", evt.target.checked);
      case "sepTaskClass":
        document.body.classList.toggle("sepTaskClass", evt.target.checked);
        return display();
      case "sepTasks":
        return document.getElementById("sepTasksRefresh").style.display = "block";
    }
  });
}

document.querySelector("input[name=\"colorType\"][value=\"" + localStorage["colorType"] + "\"]").checked = true;

ref9 = document.getElementsByName("colorType");
for (ab = 0, len8 = ref9.length; ab < len8; ab++) {
  c = ref9[ab];
  c.addEventListener("change", function(evt) {
    var v;
    v = document.querySelector('input[name="colorType"]:checked').value;
    localStorage["colorType"] = v;
    if (v === "class") {
      document.getElementById("assignmentColors").style.display = "none";
      document.getElementById("classColors").style.display = "block";
    } else {
      document.getElementById("assignmentColors").style.display = "block";
      document.getElementById("classColors").style.display = "none";
    }
    return updateColors();
  });
}

ref10 = document.getElementsByTagName("textarea");
for (ae = 0, len9 = ref10.length; ae < len9; ae++) {
  e = ref10[ae];
  if (e.name !== "athenaDataRaw" && (localStorage[e.name] != null)) {
    e.value = localStorage[e.name];
  }
  e.addEventListener("input", function(evt) {
    localStorage[evt.target.name] = evt.target.value;
    if (evt.target.name === "athenaDataRaw") {
      return parseAthenaData(evt.target.value);
    }
  });
}

console.log("%cCheck PCR", "color: #004000; font-size: 3em");

console.log("%cVersion " + version + " (Check below for current version)", "font-size: 1.1em");

console.log.apply(console, ["Welcome to the developer console for your browser! Besides looking at the source code, you can also play around with Check PCR by executing the lines below:\n%c\tfetch(true)               %c// Reloads all of your assignments (the true is for forcing a reload if one has already been triggered in the last minute)\n%c\tdata                      %c// Displays the object that contains the data parsed from PCR's interface\n%c\tactivity                  %c// The data for the assignments that show up in the activity pane\n%c\textra                     %c// All of the tasks you've created by clicking the + button\n%c\tathenaData                %c// The data fetched from Athena (if you've pasted the raw data into settings)\n%c\tsnackbar(\"Hello World!\")  %c// Creates a snackbar showing the message \"Hello World!\"\n%c\tdisplayError(new Error()) %c// Displays the stack trace for a random error (Just don't submit it!)\n%c\tcloseError()              %c// Closes that dialog"].concat(slice.call((ref11 = []).concat.apply(ref11, (function() {
  var af, results;
  results = [];
  for (i = af = 0; af < 8; i = ++af) {
    results.push(["color: initial", "color: grey"]);
  }
  return results;
})()))));

console.log("");


/*
sendToParse = (name, func, value, update=true) ->
   * onerror will be called if there is an error sending the info to Parse or there is no connection to it
  onerror = ->
    console.debug "Adding failed request to localStorage for later reattempts"
    parseFailed = if (pf = localStorage["parseFailed"])? then JSON.parse(pf) else []
    parseFailed.push [name, func, value]
    localStorage["parseFailed"] = JSON.stringify parseFailed
  if window.userData # Check if parse has been initialized yet
    console.log "executing #{func} with argument #{value} into #{name}"
    Parse.CoreManager.getInstallationController().currentInstallationId().then (iid) ->
      send("https://api.parse.com/1/classes/UserData/#{window.userData.id}", "json",
        null, # No special headers to send
        JSON.stringify
          _ApplicationId: Parse.CoreManager.get "APPLICATION_ID"
          _ClientVersion: Parse.CoreManager.get "VERSION"
          _InstallationId: iid
          _JavaScriptKey: Parse.CoreManager.get "JAVASCRIPT_KEY"
          _SessionToken: Parse.User.current().getSessionToken()
          _method: "PUT"
          "#{name}":
            __op: func
            objects: [sjcl.encrypt localStorage["cryptoPhrase"], value]
      ).then (resp) ->
        console.log "Successfully synced change to Parse", resp.response
        if update
          window[name][{Remove: "onremove", AddUnique: "onadd"}[func]](value)
      , onerror
  else
    onerror() # Parse not initialized yet
 */

ParseArray = (function() {
  ParseArray.onadd = function() {};

  ParseArray.onremove = function() {};

  function ParseArray(name1, windowname) {
    var local;
    this.name = name1;
    this.windowname = windowname;
    local = localStorage[this.name];
    this.array = local != null ? JSON.parse(local) : [];
  }

  ParseArray.prototype.push = function(item) {
    return this.array.push(item);
  };

  ParseArray.prototype.indexOf = function(item) {
    return this.array.indexOf(item);
  };

  ParseArray.prototype.splice = function(index, number) {
    return this.array.splice(index, number);
  };

  ParseArray.prototype.save = function() {
    return localStorage[this.name] = JSON.stringify(this.array);
  };

  ParseArray.prototype.update = function(updatedData) {
    var af, item, len10, n, newitem, results, updated;
    updated = updatedData.slice(0);
    n = 0;
    while (n < this.array.length) {
      item = this.array[n];
      if (updated.indexOf(item) === -1) {
        this.onremove(item);
        this.array.splice(n, 1);
      } else {
        n++;
      }
      updated.splice(0, 1);
    }
    results = [];
    for (af = 0, len10 = updated.length; af < len10; af++) {
      newitem = updated[af];
      this.onadd(newitem);
      results.push(this.array.push(newitem));
    }
    return results;
  };

  return ParseArray;

})();

done = new ParseArray("done");

done.onadd = function(id) {
  var af, elem, len10, ref12;
  ref12 = document.querySelectorAll(".assignment[id^=\"" + id + "\"], #test" + id + ", #activity" + id + ", #ia" + id);
  for (af = 0, len10 = ref12.length; af < len10; af++) {
    elem = ref12[af];
    elem.classList.add("done");
  }
  if (document.querySelectorAll(".assignment.listDisp:not(.done)").length !== 0) {
    document.body.classList.remove("noList");
  }
  if (document.body.getAttribute("data-view") === "1") {
    return resize();
  }
};

done.onremove = function(id) {
  var af, elem, len10, ref12;
  ref12 = document.querySelectorAll(".assignment[id^=\"" + id + "\"], #test" + id + ", #activity" + id + ", #ia" + id);
  for (af = 0, len10 = ref12.length; af < len10; af++) {
    elem = ref12[af];
    elem.classList.remove("done");
  }
  if (document.querySelectorAll(".assignment.listDisp:not(.done)").length === 0) {
    document.body.classList.add("noList");
  }
  if (document.body.getAttribute("data-view") === "1") {
    return resize();
  }
};

modified = {};

if (localStorage["modified"] != null) {
  modified = JSON.parse(localStorage["modified"]);
}

extra = [];

if (localStorage["extra"] != null) {
  extra = JSON.parse(localStorage["extra"]);
}

schedules = (function() {
  var s;
  if ((s = localStorage["schedules"])) {
    return JSON.parse(s);
  } else {
    return null;
  }
})();

document.getElementById("lastUpdate").innerHTML = localStorage["lastUpdate"] != null ? formatUpdate(localStorage["lastUpdate"]) : "Never";

if (localStorageRead("data") != null) {
  window.data = localStorageRead("data");
  if (localStorage["activity"] != null) {
    activity = JSON.parse(localStorage["activity"]);
    ref12 = activity.slice(activity.length - 32, activity.length);
    for (af = 0, len10 = ref12.length; af < len10; af++) {
      act = ref12[af];
      addActivity.apply(null, act);
    }
  }
  display();
}

fetch();

if (location.protocol !== "chrome-extension:") {
  lc = document.querySelector("#login .content");
  document.getElementById("login").classList.add("large");
  lc.appendChild(element("div", [], "While this feature is very useful, it will store your credentials on the server's database. If you are uncomfortable with this, then unckeck the box to only have the servery proxy your credentials to PCR.", "storeAbout"));
  lc.appendChild(element("span", [], "The online version of Check PCR will send your login credentials through the server hosting this website so that it can fetch your assignments from PCR.\nIf you do not trust me to avoid stealing your credentials, you can use\n<a href='https://github.com/19RyanA/CheckPCR'>the Check PCR unofficial chrome extension</a>, which will communicate directly with PCR and thus not send any data through this server.", "loginExtra"));
  up = document.getElementById("update");
  upc = up.getElementsByClassName("content")[0];
  up.querySelector("h1").innerHTML = "A new update has been applied.";
  ref13 = upc.childNodes;
  for (ag = ref13.length - 1; ag >= 0; ag += -1) {
    el = ref13[ag];
    if (el.nodeType === 3 || el.tagName === "BR" || el.tagName === "CODE" || el.tagName === "A") {
      el.remove();
    }
  }
  upc.insertBefore(document.createTextNode("Because you are using the online version, the update has already been download. Click GOT IT to reload the page and apply the changes."), upc.querySelector("h2"));
  document.getElementById("updateDelay").style.display = "none";
  document.getElementById("updateIgnore").innerHTML = "GOT IT";
  document.getElementById("updateIgnore").style.right = "8px";
}

gp = {
  page: '/new.html',
  title: location.protocol === "chrome-extension:" ? "Version " + version : "Online"
};

if (!JSON.parse(localStorage["googleA"])) {
  window['ga-disable-UA-66932824-1'] = true;
} else {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');;
  ga('create', 'UA-66932824-1', 'auto');
  ga('set', 'checkProtocolTask', (function() {}));
  ga('require', 'displayfeatures');
  ga('send', 'pageview', gp);
}

if (localStorage["askGoogleAnalytics"] == null) {
  snackbar("This page uses Google Analytics. You can opt out vai Settings.", "Settings", function() {
    return document.getElementById("settingsB").click();
  });
  localStorage["askGoogleAnalytics"] = "false";
}

delete Hammer.defaults.cssProps.userSelect;

hammertime = new Hammer.Manager(document.body, {
  recognizers: [
    [
      Hammer.Pan, {
        direction: Hammer.DIRECTION_HORIZONTAL
      }
    ]
  ]
});

menuOut = false;

dragTarget = new Hammer(document.getElementById("dragTarget"));

dragTarget.on("pan", function(e) {
  var direction, overlayPerc, sbkg, x, y;
  if (e.pointerType === "touch") {
    e.preventDefault();
    direction = e.direction;
    x = e.center.x;
    y = e.center.y;
    sbkg = document.getElementById("sideBackground");
    sbkg.style.display = "block";
    sbkg.style.opacity = 0;
    document.getElementById("sideNav").classList.add("manual");
    if (x > 240) {
      x = 240;
    } else if (x < 0) {
      x = 0;
      if (x < 120) {
        menuOut = false;
      } else if (x >= 120) {
        menuOut = true;
      }
    }
    document.getElementById("sideNav").style.transform = "translateX(" + (x - 240) + "px)";
    overlayPerc = Math.min(x / 480, 0.5);
    return sbkg.style.opacity = overlayPerc;
  }
});

dragTarget.on("panend", function(e) {
  var sideNav, velocityX;
  if (e.pointerType === "touch") {
    velocityX = e.velocityX;
    if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
      sideNav = document.getElementById("sideNav");
      sideNav.classList.remove("manual");
      sideNav.classList.add("active");
      sideNav.style.transform = "";
      return document.getElementById("dragTarget").style.width = "100%";
    } else if (!menuOut || velocityX > 0.3) {
      document.body.style.overflow = "auto";
      sideNav = document.getElementById("sideNav");
      sideNav.classList.remove("manual");
      sideNav.classList.remove("active");
      sideNav.style.transform = "";
      document.getElementById("sideBackground").style.opacity = "";
      document.getElementById("dragTarget").style.width = "10px";
      return setTimeout(function() {
        return document.getElementById("sideBackground").style.display = "none";
      }, 350);
    }
  }
});

dragTarget.on("tap", function(e) {
  document.getElementById("sideBackground").click();
  return e.preventDefault();
});

dt = document.getElementById("dragTarget");


/*hammertime.on "pan", (e) ->
  if e.pointerType is "touch" and e.deltaX < -100 or e.deltaX > 100 and e.target isnt dt and (-25 < e.deltaY < 25)
    if e.velocityX > 0.5
      el = document.querySelector("#navTabs>li:nth-child(#{document.body.getAttribute("data-view")+2})")
    else if e.velocityX < -0.5
      el = document.querySelector("#navTabs>li:nth-child(#{document.body.getAttribute("data-view")})")
    if el?
      el.click()
  return
 */

ripple(document.getElementById("filterActivity"));

document.getElementById("filterActivity").addEventListener("click", function() {
  return document.getElementById("infoActivity").classList.toggle("filter");
});

activityTypes = localStorage["shownActivity"] ? JSON.parse(localStorage["shownActivity"]) : {
  add: true,
  edit: true,
  "delete": true
};

updateSelectNum = function() {
  c = function(bool) {
    if (bool) {
      return 1;
    } else {
      return 0;
    }
  };
  return document.getElementById("selectNum").innerHTML = c(activityTypes.add) + c(activityTypes.edit) + c(activityTypes["delete"]);
};

updateSelectNum();

fn1 = function(type) {
  return document.getElementById(type + "Select").addEventListener("change", function(evt) {
    activityTypes[type] = evt.target.checked;
    document.getElementById("infoActivity").setAttribute("data-filtered", updateSelectNum());
    document.getElementById("infoActivity").classList.toggle(type);
    return localStorage["shownActivity"] = JSON.stringify(activityTypes);
  });
};
for (type in activityTypes) {
  enabled = activityTypes[type];
  document.getElementById(type + "Select").checked = enabled;
  if (enabled) {
    document.getElementById("infoActivity").classList.add(type);
  }
  fn1(type);
}

if (localStorage["showDoneTasks"] && JSON.parse(localStorage["showDoneTasks"])) {
  document.getElementById("showDoneTasks").checked = true;
  document.getElementById("infoTasksInner").classList.add("showDoneTasks");
}

document.getElementById("showDoneTasks").addEventListener("change", function() {
  localStorage["showDoneTasks"] = JSON.stringify(this.checked);
  return document.getElementById("infoTasksInner").classList.toggle("showDoneTasks", this.checked);
});

checkCommit = function() {
  return send("https://raw.githubusercontent.com/19RyanA/CheckPCR/master/version.txt", "text").then(function(resp) {
    c = resp.responseText.trim();
    console.log("Current version: " + c + " " + (version === c ? "(no update available)" : "(update available)"));
    document.getElementById("newversion").innerHTML = c;
    if (version !== c) {
      document.getElementById("updateIgnore").addEventListener("click", function() {
        if (location.protocol === "chrome-extension:") {
          document.getElementById("update").classList.remove("active");
          return setTimeout(function() {
            return document.getElementById("updateBackground").style.display = "none";
          }, 350);
        } else {
          return window.location.reload();
        }
      });
      return send((location.protocol === "chrome-extension:" ? "https://api.github.com/repos/19RyanA/CheckPCR/git/refs/heads/master" : "/api/commit"), "json").then(function(resp) {
        var sha;
        sha = resp.response.object.sha;
        return send((location.protocol === "chrome-extension:" ? resp.response.object.url : "/api/commit/" + sha), "json").then(function(resp) {
          document.getElementById("pastUpdateVersion").innerHTML = version;
          document.getElementById("newUpdateVersion").innerHTML = c;
          document.getElementById("updateFeatures").innerHTML = resp.response.message.substr(resp.response.message.indexOf("\n\n") + 2).replace(/\* (.*?)(?=$|\n)/g, function(a, b) {
            return "<li>" + b + "</li>";
          }).replace(/>\n</g, "><").replace(/\n/g, "<br>");
          document.getElementById("updateBackground").style.display = "block";
          return document.getElementById("update").classList.add("active");
        });
      });
    }
  }, function(err) {
    return console.log("Could not access Github. Here's the error:", err);
  });
};

if (location.protocol === "chrome-extension:") {
  checkCommit();
}

document.getElementById("updateDelay").addEventListener("click", function() {
  document.getElementById("update").classList.remove("active");
  return setTimeout(function() {
    return document.getElementById("updateBackground").style.display = "none";
  }, 350);
});

send("https://api.github.com/gists/21bf11a429da257539a68520f513a38b", "json").then(function(resp) {
  var last, nc;
  last = localStorage["newsCommit"];
  nc = resp.response.history[0].version;
  if (last == null) {
    localStorage["newsCommit"] = nc;
  }
  window.getNews = function(onfail) {
    return send(resp.response.files["updates.htm"].raw_url).then(function(resp) {
      var ah, len11, news, ref14;
      localStorage["newsCommit"] = nc;
      ref14 = resp.responseText.split("<hr>");
      for (ah = 0, len11 = ref14.length; ah < len11; ah++) {
        news = ref14[ah];
        document.getElementById("newsContent").appendChild(element("div", "newsItem", news));
      }
      document.getElementById("newsBackground").style.display = "block";
      return document.getElementById("news").classList.add("active");
    }, function(err) {
      if (onfail != null) {
        return onfail();
      }
    });
  };
  if (last !== nc) {
    return window.getNews();
  }
}, function(err) {
  return console.log("Could not access Github. Here's the error:", err);
});

closeNews = function() {
  document.getElementById("news").classList.remove("active");
  return setTimeout(function() {
    return document.getElementById("newsBackground").style.display = "none";
  }, 350);
};

document.getElementById("newsOk").addEventListener("click", closeNews);

document.getElementById("newsBackground").addEventListener("click", closeNews);

document.getElementById("newsB").addEventListener("click", function() {
  var dispNews;
  document.getElementById("sideBackground").click();
  dispNews = function() {
    document.getElementById("newsBackground").style.display = "block";
    return document.getElementById("news").classList.add("active");
  };
  if (document.getElementById("newsContent").childNodes.length === 0) {
    if (typeof getNews !== "undefined" && getNews !== null) {
      return getNews(dispNews);
    } else {
      return dispNews();
    }
  } else {
    return dispNews();
  }
});

closeError = function() {
  document.getElementById("error").classList.remove("active");
  return setTimeout(function() {
    return document.getElementById("errorBackground").style.display = "none";
  }, 350);
};

document.getElementById("errorNo").addEventListener("click", closeError);

document.getElementById("errorBackground").addEventListener("click", closeError);

ripple(document.getElementById("new"));

ripple(document.getElementById("newTask"));

onNewTask = function() {
  updateNewTips(document.getElementById("newText").value = "");
  document.body.style.overflow = "hidden";
  document.getElementById("newBackground").style.display = "block";
  document.getElementById("newDialog").classList.add("active");
  return document.getElementById("newText").focus();
};

document.getElementById("new").addEventListener("mouseup", onNewTask);

document.getElementById("newTask").addEventListener("mouseup", onNewTask);

closeNew = function() {
  document.body.style.overflow = "auto";
  document.getElementById("newDialog").classList.remove("active");
  return setTimeout(function() {
    return document.getElementById("newBackground").style.display = "none";
  }, 350);
};

document.getElementById("newText").addEventListener("keydown", function(evt) {
  if (evt.which === 27) {
    return closeNew();
  }
});

document.getElementById("newCancel").addEventListener("click", closeNew);

document.getElementById("newDialog").addEventListener("submit", function(evt) {
  var cls, due, end, parsed, st, start, text;
  evt.preventDefault();
  text = document.getElementById("newText").value;
  while (true) {
    parsed = text.match(/(.*) (for|by|due|assigned|starting|ending|beginning) (.*)/);
    if (parsed != null) {
      switch (parsed[2]) {
        case "for":
          cls = parsed[3];
          break;
        case "by":
        case "due":
        case "ending":
          due = parsed[3];
          break;
        case "assigned":
        case "starting":
        case "beginning":
          st = parsed[3];
      }
      text = parsed[1];
    } else {
      break;
    }
  }
  start = st != null ? Math.floor((chrono.parseDate(st).getTime() - tzoff) / 1000 / 3600 / 24) : Math.floor((Date.now() - tzoff) / 1000 / 3600 / 24);
  if (due != null) {
    end = Math.floor((chrono.parseDate(due).getTime() - tzoff) / 1000 / 3600 / 24);
    if (end < start) {
      end += Math.ceil((start - end) / 7) * 7;
    }
  }
  extra.push({
    body: text.charAt(0).toUpperCase() + text.substr(1),
    done: false,
    start: start,
    "class": cls != null ? cls.toLowerCase().trim() : null,
    end: end
  });
  localStorage["extra"] = JSON.stringify(extra);
  closeNew();
  return display(false);
});

tipNames = {
  "for": ["for"],
  by: ["by", "due", "ending"],
  starting: ["starting", "beginning", "assigned"]
};

updateTip = function(name, typed, uppercase) {
  var ah, len11, n, newNames, ref14;
  el = document.getElementById("tip" + name);
  el.classList.add("active");
  el.querySelector(".typed").innerHTML = (uppercase ? typed.charAt(0).toUpperCase() + typed.substr(1) : typed) + "...";
  newNames = [];
  ref14 = tipNames[name];
  for (ah = 0, len11 = ref14.length; ah < len11; ah++) {
    n = ref14[ah];
    if (n !== typed) {
      newNames.push("<b>" + n + "</b>");
    }
  }
  return el.querySelector(".others").innerHTML = newNames.length > 0 ? "You can also use " + newNames.join(" or ") : "";
};

tipComplete = function(evt) {
  var lastSpace, lastWord, val;
  val = document.getElementById("newText").value;
  lastSpace = val.lastIndexOf(" ");
  lastWord = lastSpace === -1 ? 0 : lastSpace + 1;
  updateNewTips(document.getElementById("newText").value = val.substring(0, lastWord) + this.querySelector(".typed").innerHTML.replace("...", "") + " ");
  return document.getElementById("newText").focus();
};

updateNewTips = function(val, scroll) {
  var ah, ai, aj, before, beforeSpace, cls, container, found, id, lastSpace, lastWord, len11, len12, len13, name, possible, ref14, ref15, uppercase;
  if (scroll == null) {
    scroll = true;
  }
  if (scroll) {
    document.getElementById("newTips").scrollTop = 0;
  }
  if ((i = val.lastIndexOf(" ")) !== -1) {
    beforeSpace = val.lastIndexOf(" ", i - 1);
    before = val.substring((beforeSpace === -1 ? 0 : beforeSpace + 1), i);
    for (name in tipNames) {
      possible = tipNames[name];
      if (possible.indexOf(before) !== -1) {
        if (name === "for") {
          for (name in tipNames) {
            document.getElementById("tip" + name).classList.remove("active");
          }
          ref14 = data.classes;
          for (ah = 0, len11 = ref14.length; ah < len11; ah++) {
            cls = ref14[ah];
            id = "tipclass" + cls.replace(/\W/, "");
            if (i === val.length - 1) {
              if ((e = document.getElementById(id)) != null) {
                e.classList.add("active");
              } else {
                container = element("div", ["classTip", "active", "tip"], "<i class='material-icons'>class</i><span class='typed'>" + cls + "</span>", id);
                container.addEventListener("click", tipComplete);
                document.getElementById("newTips").appendChild(container);
              }
            } else {
              document.getElementById(id).classList.toggle("active", cls.toLowerCase().indexOf(val.toLowerCase().substr(i + 1)) !== -1);
            }
          }
          return;
        }
      }
    }
  }
  ref15 = document.getElementsByClassName("classTip");
  for (ai = 0, len12 = ref15.length; ai < len12; ai++) {
    el = ref15[ai];
    el.classList.remove("active");
  }
  if (val === "" || val.charAt(val.length - 1) === " ") {
    updateTip("for", "for", false);
    updateTip("by", "by", false);
    updateTip("starting", "starting", false);
  } else {
    lastSpace = val.lastIndexOf(" ");
    lastWord = lastSpace === -1 ? val : val.substr(lastSpace + 1);
    uppercase = lastWord.charAt(0) === lastWord.charAt(0).toUpperCase();
    lastWord = lastWord.toLowerCase();
    for (name in tipNames) {
      possible = tipNames[name];
      found = false;
      for (aj = 0, len13 = possible.length; aj < len13; aj++) {
        p = possible[aj];
        if (p.slice(0, lastWord.length) === lastWord) {
          found = p;
        }
      }
      if (found) {
        updateTip(name, found, uppercase);
      } else {
        document.getElementById("tip" + name).classList.remove("active");
      }
    }
  }
};

updateNewTips("", false);

document.getElementById("newText").addEventListener("input", function() {
  return updateNewTips(this.value);
});

ref14 = document.getElementsByClassName("tip");
for (ah = 0, len11 = ref14.length; ah < len11; ah++) {
  tip = ref14[ah];
  tip.addEventListener("click", tipComplete);
}


/*
newParseData = ->
  userData = new UserData()
  passphrase = localStorage["cryptoPhrase"]
  userData.set "done", (sjcl.encrypt(passphrase, x) for x in done.array)
  userData.set "user", Parse.User.current()
  userData.setACL new Parse.ACL Parse.User.current() # Only
  userData.save().then (userData) ->
    window.userData = userData
    console.debug "Successfully saved userData", userData
  , (err) ->
    alert "Unable to save your current data to Parse because of this error: #{err.code} #{err.message}"
 */


/*
onParseOnline = ->
  if (pf = localStorage["parseFailed"])?
    delete localStorage["parseFailed"] # CLear the failed requests
    for failed in JSON.parse pf
      sendToParse.apply sendToParse, failed
 */


/*
getParseData = ->
  query = new Parse.Query UserData
  query.equalTo("user", Parse.User.current())
  query.first()
    .then (result) ->
      console.log result
      window.userData = result
      passphrase = localStorage["cryptoPhrase"]
      try
        done.update (sjcl.decrypt(passphrase, x) for x in result.get "done")
         * Attempt to sync when internet connection is reestablished
        onParseOnline()
      catch e
        console.log e
        if confirm "Your data on Parse couldn't be decrypted (probably because the passphrase used to encode it and the passphrase on this device don't match). Do you want to overwrite the data on Parse with encrypted data using your passphrase?"
          console.log "Replacing data"
          result.destroy()
          newParseData()
    , (err) ->
      console.log "Could not get data from Parse because of error", err.code, err.message
 */


/*
requestIdleCallback ->
   * Try to get the current user logged in
  currentUser = Parse.User.current()
  if currentUser
    console.log "Logged into parse with", currentUser
     * Logged in
    document.getElementById("parseenc").value = localStorage["cryptoPhrase"]
    document.getElementById("parsemanage").style.display = "block"
    getParseData()
      .then ->
         * Make it so that all data in the cloud can be replaced
        document.getElementById("parseover").addEventListener "click", ->
          window.userData.destroy().then newParseData

  else
    getParseUP = ->
      [document.getElementById("parseusername").value,
      document.getElementById("parsepassword").value,
      document.getElementById("parsekey").value]
     * Not logged in
    document.getElementById("parsenew").addEventListener "click", ->
      [username, pass, key] = getParseUP()
      document.getElementById("parseenc").value = localStorage["cryptoPhrase"] = key
      user = new Parse.User()
      user.set "username", username
      user.set "password", pass
      user.signUp().then ->
        user.setACL new Parse.ACL Parse.User.current() # User's information only visiible to the user
        newParseData()
        document.getElementById("parsebuttons").style.display = "none"
        document.getElementById("parsemanage").style.display = "block"
      , (err) ->
        alert "Error creating a new account: #{err.code} #{err.message}"

    document.getElementById("parselogin").addEventListener "click", ->
      [username, pass, key] = getParseUP()
      document.getElementById("parseenc").value = localStorage["cryptoPhrase"] = key
      Parse.User.logIn username, pass
        .then ->
          document.getElementById("parsebuttons").style.display = "none"
          document.getElementById("parsemanage").style.display = "block"
        , (err) ->
          alert "Error logging in: #{err.code} #{err.message}"

    document.getElementById("parsebuttons").style.display = "block"
, { timeout: 2000 }
 */


/* To be implemented later when the pilot ends
requestIdleCallback ->
  send "https://raw.githubusercontent.com/harkerdev/schedules/master/index.html", "text"
    .then (resp) ->
      requestIdleCallback ->
        schedules = {index: [], schedules: []}
        days = resp.response.replace(/<.?div.*?>/g, "").split("\n\n")
        for line in days.shift().split("\n") # Loop through the days
          [day, label] = line.split("\t")
          console.log line, day, label
          spday = day.split("|")
          if spday.length is 1
            schedules.index.push [Date.parse(spday[0]), label]
          else
            day = new Date spday[0]
            while day < new Date(spday[1])
              schedules.index.push [day.getTime(), label]
              day.setDate day.getDate()+1
      , {timeout: 2000}
, {timeout: 2000}
 */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(function(registration) {
    return console.log("ServiceWorker registration successful with scope", registration.scope);
  })["catch"](function(err) {
    return console.log("ServiceWorker registration failed: ", err);
  });
}

navigator.serviceWorker.addEventListener('message', function(event) {
  console.log("Getting commit because of serviceworker");
  if (event.data.getCommit) {
    return checkCommit();
  }
});
