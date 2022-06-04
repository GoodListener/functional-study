## 반응형 라이브러리 빌드

#### 왜 함수형 하다가 갑자기 반응형 라이브러리
함수형 공부하던거의 응용   
컴포지션, 필터, 맵, 리듀스, 비동기 대기 파이프 등등   
함수보다 라이브러리 구성에 중점   

---
#### 불변성 immutable
```js
let x = { foo: 'hello' }
let y = x

Object.freeze(x)

y.foo = 'test' // error 발생
```
x, y 는 모두 readonly로 변함

---
#### redux
리덕스는 Flux, CQRS, Event Sourcing 단일 어플리케이션 아키텍쳐에서 영감을 얻은 라이브러리   

리덕스의 디자인 원칙
- 진실의 근원은 하나
  - 애플리케이션은 중심 상태를 가진다.
- 상태는 읽기 전용
  - 액션과 같은 특정 이벤트는 상태 변경을 의미한다.
- 변화는 순수함수로 작성 reducer 
  - 한 번에 하나의 변경만 일어남.

상태 컨테이너의 Redux 구현

뷰 컴포넌트 -> 액션 ->(디스패치) 리듀서 -> 상태 컨테이너 ->(새로운 상태) 리듀서
상태 컨테이너 -> 뷰 컴포넌트

```js
// 리듀서
let initialState ={ counter: 0 }

function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    state = Object.assign({}, state, { counter: state.counter + 1 })
  }
  return state
}

//// 구현부

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
  document.getElementById('counter').textContent = state.count;
}

// subscribe를 통한 listener 구독
store.subscribe(function () {
  render(store.getState())
})

// 애플리케이션 부트스트랩
let store = createStore(reducer, initialState);
function loadRedux() {
  render(store.getState())
}
```