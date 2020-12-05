import solve1 from './solutions/1';
import solve2 from './solutions/2';

const solvers = [solve1, solve2];
const list = document.querySelector('ol');

for (let i = 0; i < solvers.length; i++) {
  const solution = solvers[i]();
  const listItem = document.createElement('li');
  listItem.innerHTML = solution;
  list.appendChild(listItem);
}
