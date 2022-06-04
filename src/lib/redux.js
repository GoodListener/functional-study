// 리듀서
let initialState = { counter: 0 }

function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    state = Object.assign({}, state, { counter: state.counter + 1 })
  }
  return state
}

// 구현부
document.getElementById('button').addEventListener('click', function () {
  incrementCounter();
})

function incrementCounter() {
  store.dispatch({
    type: 'INCREMENT'
  })
}

/// 스토어
function createStore(reducer, preloadedState) {
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];
  let nextListeners = currentListeners

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action);

    const listeners = currentListeners = nextListeners;
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
    return action;
  }

  function subscribe(listener) {
    nextListeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

// render
function render(state) {
  document.getElementById('counter').textContent = state.counter;
}

// 애플리케이션 부트스트랩
let store = createStore(reducer, initialState);

// subscribe를 통한 listener 구독
store.subscribe(function () {
  render(store.getState())
})

function loadRedux() {
  render(store.getState())
}

loadRedux()