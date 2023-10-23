import axios from 'axios';

const refs = {
  notFoundText: document.querySelector('.favorites-not-found-text'),
  removeBtn: document.querySelector('.exercise-card-remove-btn'),
  startBtn: document.querySelector('.exercise-card-start-btn'),
  exercisesWrapper: document.querySelector('.favorites-exercise-card-wrapper'),
};

const arr = [
  '64f389465ae26083f39b17a2',
  '64f389465ae26083f39b17df',
  '64f389465ae26083f39b17a5',
  '64f389465ae26083f39b17b7',
  '64f389465ae26083f39b17ba',
  '64f389465ae26083f39b180e',
  '64f389465ae26083f39b189e',
  '64f389465ae26083f39b18ae',
  '64f389465ae26083f39b18d7',
  '64f389465ae26083f39b190d',
];

renderMarkup();
addListener();
function addListener() {
  refs.removeBtn.addEventListener('click', () => {
    removeValueFromArray(arr, '64f389465ae26083f39b17b7');
    refs.exercisesWrapper.innerHTML = '';
    renderMarkup();
  });
}

function renderMarkup() {
  getFavoriteExerciseData(arr).then(response => {
    response.map(({ data }) => {
      const { bodyPart, name, target, burnedCalories } = data;
      refs.exercisesWrapper.insertAdjacentHTML(
        'afterbegin',
        createMarkup(
          firstLetterUpperCase(bodyPart),
          firstLetterUpperCase(name),
          firstLetterUpperCase(target),
          burnedCalories
        )
      );
    });
  });
}

async function getFavoriteExerciseData(ids) {
  const arrayOfPromises = ids.map(async id => {
    const response = await axios.get(
      `https://your-energy.b.goit.study/api/exercises/${id}`
    );
    return response;
  });

  const exercises = await Promise.all(arrayOfPromises);
  return exercises;
}

function firstLetterUpperCase(word) {
  const splitted = word.split('');
  const first = splitted[0].toUpperCase();
  const rest = [...splitted];
  rest.splice(0, 1);
  const result = [first, ...rest].join('');
  return result;
}

function createMarkup(part, title, target, calories) {
  return `<div class="favorites-exercise-card">
                  <div class="exercise-card-top">
                    <p class="exercise-card-top-text">WORKOUT</p>
                    <button class="exercise-card-remove-btn">
                      <svg
                        class="exercise-card-remove-icon"
                        width="16"
                        height="16">
                        <use
                          href="img/symbol-defs.svg#icon-exercises-content-garbage"
                        ></use>
                      </svg>
                    </button>
                    <button class="exercise-card-start-btn">
                      Start
                      <svg
                        class="exercise-card-start-icon"
                        width="16"
                        height="16">
                        <use
                          href="img/symbol-defs.svg#icon-scroll-arrow"
                        ></use>
                      </svg>
                    </button>
                  </div>
                  <div class="exercise-card-mid">
                    <div class="man-icon-wrapper">
                      <svg
                        class="exercise-card-man-icon"
                        width="20"
                        height="20">
                        <use href="img/symbol-defs.svg#icon-aside-men"></use>
                      </svg>
                    </div>
                    <h3 class="exercise-card-title">${title}</h3>
                  </div>
                  <div class="exercise-card-bottom">
                    <p class="exercice-card-indexes">Burned calories: <span class="exercice-card-indexes-values">${calories}/3 min</span>Body part: <span class="exercice-card-indexes-values">${part}</span>Target: <span class="exercice-card-indexes-values">${target}</span></p>
                  </div>
                </div>`;
}

function removeValueFromArray(array, value) {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
}
console.log(arr);

removeValueFromArray(arr, '64f389465ae26083f39b17b7');

console.log(arr);
