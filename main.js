import solve1 from './solutions/1';
import solve2 from './solutions/2';
import solve3 from './solutions/3';
import solve4 from './solutions/4';
import solve5 from './solutions/5';
import solve6 from './solutions/6';
import solve7 from './solutions/7';
import solve8 from './solutions/8';
import solve9 from './solutions/9';
import solve10 from './solutions/10';
import solve11 from './solutions/11';
import solve12 from './solutions/12';
import solve13 from './solutions/13';
import solve14 from './solutions/14';
import solve15 from './solutions/15';

const solvers = [
  // solve1,
  // solve2,
  // solve3,
  // solve4,
  // solve5,
  // solve6,
  // solve7,
  // solve8,
  // solve9,
  // solve10,
  // solve11,
  // solve12,
  // solve13,
  // solve14,
  solve15
];
const list = document.querySelector('ol');

for (let i = 0; i < solvers.length; i++) {
  const solution = solvers[i]();
  const listItem = document.createElement('li');
  listItem.innerHTML = solution;
  list.appendChild(listItem);
}
