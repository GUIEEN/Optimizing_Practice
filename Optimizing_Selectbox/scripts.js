/**
 * 
 * Fuck JQuery
 * Love Vanila JS ___ Seung Kwak
 * 
 */ 

document.addEventListener("DOMContentLoaded", function () {
  let counter = document.querySelector('#counter'),
    title = document.querySelector('#title'),
    popup = document.querySelector('#popup'),
    list = document.querySelector('#list')
  timeCount(counter)
  let data = []
  for ( let i  = 0 ; i < 10000 ; i++) {
    data.push(`Item🎁🎁__::${i}`)
  }
  title.addEventListener('click', e => {
    popup.style.display === 'block' 
      ? popup.style.display = 'none' 
      : popup.style.display = 'block'
    }
  )

  // console.time()
  // for ( let i = 0 ; i < data.length ; i++) {
  //   const elem = createItem(data[i])
  //   list.appendChild(elem)
  // }
  // console.timeEnd()

  // console.time()
  // for ( let i = 0 ; i < data.length ; i++) {
  //   changeQueue.enqueue({
  //     execute: () => {
  //       const elem = createItem(data[i])
  //       list.appendChild(elem)
  //     }
  //   })
  // }
  // setInterval( () => {
  //   for (let i = 0 ; i < 30 && !changeQueue.isEmpty(); i ++) {
  //     let c = changeQueue.dequeue()

  //     if (c) c.execute()
  //     if (changeQueue.isEmpty()) console.timeEnd()
  //   }
  // })

  console.time()
  for (let i = 0; i < data.length; i++) {
    changeQueue.enqueue({
      // execute: function () {
      //   const elem = createItem(data[i]);
      //   list.appendChild(elem)
      // }
      execute: function ( fragment ) {
        const elem = createItem(data[i]);
        // 입력받은 fragment 추가.
        fragment.appendChild(elem)
      }
    });
  }

  requestIdleCallback(processChanges);
});

// function processChanges(deadline) {
//   console.log(deadline.timeRemaining())
//   while (deadline.timeRemaining() > 0 && !changeQueue.isEmpty()) {
//     var c = changeQueue.dequeue();

//     if (c)
//       // c.execute();
//       requestAnimationFrame(c.execute);
//   }

//   if (!changeQueue.isEmpty())
//     requestIdleCallback(processChanges);
//   else
//     console.timeEnd();
// }

function processChanges(deadline) {
  console.log(deadline.timeRemaining())
  var fragment = document.createDocumentFragment()
  while (deadline.timeRemaining() > 0 && !changeQueue.isEmpty()) {
    var c = changeQueue.dequeue();
    if (c)  c.execute(fragment);
  }

   // 개별 <li>태그 대신 fragment를 추가
  requestAnimationFrame(() => {
    document.getElementById('list').appendChild(fragment)
  });
    
  if (!changeQueue.isEmpty())
    requestIdleCallback(processChanges);
  else
    console.timeEnd();
}



const timeCount = (counter) => {
  let timer = 0;
  setInterval(() => {
    timer++
    counter.innerHTML = timer
  }, 1000)
}

const createItem = txt => {
  let element = document.createElement('li')
  element.innerText = txt
  element.className = 'item'

  element.addEventListener('click', () => {
    title.innerHTML = txt
    popup.style.display = 'none'
  })
  return element
}

var changeQueue = (function () {
  let list = [];
  let index = 0;

  return {
    enqueue: function (c) {
      list.push(c);
    },

    dequeue: function () {
      // return list.shift(); // shift 사용시, 0번째 항목 제거 + 배열의 모든 항목 재인덱싱 과정 == high cost
      var o = list[index]
      index++
      return o
    },

    isEmpty: function () {
      // return list.length === 0;
      return list.length - index === 0;
    }
  }
})();

