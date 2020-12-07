import solve1 from './solutions/1';
import solve2 from './solutions/2';
import solve3 from './solutions/3';
import solve4 from './solutions/4';
import solve5 from './solutions/5';
import solve6 from './solutions/6';

const solvers = [solve1, solve2, solve3, solve4, solve5, solve6];
const list = document.querySelector('ol');

for (let i = 0; i < solvers.length; i++) {
  const solution = solvers[i]();
  const listItem = document.createElement('li');
  listItem.innerHTML = solution;
  list.appendChild(listItem);
}
