// Create the 3D graph using Three.js

// Variables
var scene, camera, renderer;
var controls;
var graph;

// Graph data
var nodes = [
  { id: 'a', color: 0x0000ff }, // Blue
  { id: 'b', color: 0x00ff00 }, // Green
  { id: 'c', color: 0x0000ff }, // Blue
  { id: 'd', color: 0xffff00 }, // Yellow
  { id: 'e', color: 0xffff00 }  // Yellow
];
var edges = [
  { source: 'a', target: 'b' },
  { source: 'a', target: 'c' },
  { source: 'b', target: 'd' },
  { source: 'c', target: 'e' }
];

// Initialize the 3D scene
function init() {
  // Create the scene
  scene = new THREE.Scene();

  // Create the camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 300;

  // Create the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('graph').appendChild(renderer.domElement);

  // Create the graph
  graph = new THREE.Object3D();

  // Create nodes
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    // Create node geometry
    var geometry = new THREE.SphereGeometry(10, 16, 16);

    // Create node material
    var material = new THREE.MeshBasicMaterial({ color: node.color });

    // Create node mesh
    var mesh = new THREE.Mesh(geometry, material);
    mesh.name = node.id;

    // Position nodes in a circle
    var angle = (i / nodes.length) * Math.PI * 2;
    var radius = 100;
    mesh.position.x = Math.cos(angle) * radius;
    mesh.position.y = Math.sin(angle) * radius;

    // Add nodes to the graph
    graph.add(mesh);
  }

  // Create edges
  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];

    // Find source and target nodes
    var sourceNode = graph.getObjectByName(edge.source);
    var targetNode = graph.getObjectByName(edge.target);

    // Create edge geometry
    var geometry = new THREE.Geometry();
    geometry.vertices.push(sourceNode.position, targetNode.position);

    // Create edge material
    var material = new THREE.LineBasicMaterial({ color: 0xffffff });

    // Create edge mesh
    var mesh = new THREE.Line(geometry, material);

    // Add edges to the graph
    graph.add(mesh);
  }

  // Add the graph to the scene
  scene.add(graph);

  // Create orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Render the scene
  render();
}

// Render the scene
function render() {
  renderer.render(scene, camera);
}

// Handle button click events
document.getElementById('default-button').addEventListener('click', function() {
  resetColors();
});

document.getElementById('blue-button').addEventListener('click', function() {
  filterByColor(0x0000ff);
});

document.getElementById('green-button').addEventListener('click', function() {
  filterByColor(0x00ff00);
});

document.getElementById('yellow-button').addEventListener('click', function() {
  filterByColor(0xffff00);
});

// Reset all node colors
function resetColors() {
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var mesh = graph.getObjectByName(node.id);
    mesh.material.color.setHex(node.color);
  }
}

// Filter nodes by color
function filterByColor(color) {
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var mesh = graph.getObjectByName(node.id);

    if (node.color === color) {
      mesh.material.color.setHex(color);
    } else {
      mesh.material.color.setHex(0x808080); // Faded color
    }
  }
}

// Initialize the scene and start rendering
init();
