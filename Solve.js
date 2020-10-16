function palindrome() {
  str = document.getElementById("userNum6").value;
  let spanE = document.getElementById("palinAnswer");

  if (myTrim(str) == "") {
    spanE.innerHTML = "Please put in letters!";
    return false;
  }

  j = str.length - 1;

  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i).toLowerCase() != str.charAt(j).toLowerCase()) {
      spanE.innerHTML = "It's not a palindrome.";
      return false;
    }
    j--;
  }
  spanE.innerHTML = "It's a palindrome!";
  return true;
}

function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm, "");
}

var width = 400;
var height = 200;

var nodes = [
  { name: "R" },
  { name: "A" },
  { name: "C" },
  { name: "E" },
  { name: "C" },
  { name: "A" },
  { name: "R" }
];

var links = [
  { source: 0, target: 1 },
  { source: 1, target: 2 },
  { source: 2, target: 3 },
  { source: 3, target: 4 },
  { source: 4, target: 5 },
  { source: 5, target: 6 }
];

function updateLinks() {
  var u = d3
    .select(".links")
    .selectAll("line")
    .data(links);

  u.enter()
    .append("line")
    .merge(u)
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  u.exit().remove();
}

function updateNodes() {
  u = d3
    .select(".nodes")
    .selectAll("text")
    .data(nodes);

  u.enter()
    .append("text")
    .text(function(d) {
      return d.name;
    })
    .merge(u)
    .attr("x", function(d) {
      return d.x;
    })
    .attr("y", function(d) {
      return d.y;
    })
    .attr("dy", function(d) {
      return 5;
    });

  u.exit().remove();
}

function ticked() {
  updateLinks();
  updateNodes();
}

document.getElementById("palinBtn").addEventListener("click", palindrome());

document.getElementById("expand").addEventListener("click", function() {
  const element = document.getElementById("expand1");
  element.style.visibility = "visible";
  element.classList.add("animate__animated", "animate__fadeInDown");
  var simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("link", d3.forceLink().links(links))
    .on("tick", ticked);
});
