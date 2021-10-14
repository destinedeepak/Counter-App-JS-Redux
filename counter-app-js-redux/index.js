let h2 = document.querySelector('h2');
let increment = document.querySelector('.increment');
let decrement = document.querySelector('.decrement');
let reset = document.querySelector('.reset');

let store = createStore(reducer);
counter =
  store.getState() && store.getState().value ? store.getState().value : 0;

h2.innerText = counter;

increment.addEventListener('click', () => {
  store.dispatch('increment');
});

decrement.addEventListener('click', () => {
  store.dispatch('decrement');
});

reset.addEventListener('click', () => {
  store.dispatch('reset');
});

function handleSteps(event) {
  let step = event.target.innerText;
  let buttons = document.querySelectorAll('.step-button')
  buttons.forEach(ele=>ele.classList.remove('active'))
  event.target.classList.add('active')
//   document.querySelector('#')
  switch (step) {
    case '5':
      store.dispatch('incrementByFive');
      break;
    case '10':
      store.dispatch('incrementByTen');
      break;
    case '15':
      store.dispatch('incrementByFifteen');
      break;
  }
}

store.subscribe(() => {
  counter = store.getState().value;
  h2.innerText = counter;
});

function stepsUI() {
  let div = document.createElement('div');
  div.style.marginTop = '1rem';
  [5, 10, 15].forEach((num) => {
    let button = document.createElement('button');
    button.style.marginRight = '6px';
    button.classList.add('step-button')
    button.innerHTML = num;
    button.addEventListener('click', handleSteps);
    div.append(button);
  });
  document.querySelector('.hero').append(div);
}

function createStore(reducer) {
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter((l) => l !== listeners);
    };
  };
  dispatch({});
  return { getState, dispatch, subscribe };
}

function reducer(state = { value: 0, step: 5 }, action) {
  switch (action) {
    case 'increment':
      return { ...state, value: state.value + state.step };

    case 'decrement':
      return { ...state, value: state.value - state.step };

    case 'reset':
      return { ...state, value: 0 };

    case 'incrementByFive':
      return { ...state, step: 5 };

    case 'incrementByTen':
      return { ...state, step: 10 };

    case 'incrementByFifteen':
      return { ...state, step: 15 };
  }
}
stepsUI();
