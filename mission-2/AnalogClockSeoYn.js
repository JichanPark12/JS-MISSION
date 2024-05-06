const AnalogClock = ($container) => {
  // do something!
  // HTML div 요소 추가. 재사용을 하려면 container 안에 HTML 요소를 추가해야 한다.
  $container.innerHTML = `
      <div class="hand hour"></div>
      <div class="hand minute"></div>
      <div class="hand second"></div>
      <div class="time time1">|</div>
      <div class="time time2">|</div>
      <div class="time time3">|</div>
      <div class="time time4">|</div>
      <div class="time time5">|</div>
      <div class="time time6">|</div>
      <div class="time time7">|</div>
      <div class="time time8">|</div>
      <div class="time time9">|</div>
      <div class="time time10">|</div>
      <div class="time time11">|</div>
      <div class="time time12">|</div>
    `; // innerHTML로 이미 요소를 추가했는데 appendChild로 또 추가하려다 보니 오류 발생
  // 계속 바뀌는 것을 function에 넣기. 함수에 넣어야 다같이 불러오기 편하다.
  function setClock(hand) {
    // 시침, 분침, 초침 변수 선언
    const [$hourHand, $minuteHand, $secondHand] = hand; // 구조분해할당: 배열과 같은 객체를 1개 이상 변수에 할당할 때 사용
    // 시간 불러오기. new Date()로 현재 시간 먼저 변수로 선언하고, 시간, 분, 초를 가져온다.
    const current = new Date();
    const hour = current.getHours();
    const minute = current.getMinutes();
    const second = current.getSeconds();

    // CSS 변수 값을 변경해 시침/분침/초침 각도를 변경한다.
    // 각각 시간이 얼마마다 몇 도 회전하는지 계산하고, 작은 단위 시간에 영향받는 것도 계산한다.
    $hourHand.style.setProperty(
      '--deg',
      hour * (360 / 12) +
        minute * (360 / 12 / 60) +
        second * (360 / 12 / 60 / 60)
    );
    $minuteHand.style.setProperty(
      '--deg',
      minute * (360 / 60) + second * (360 / 60 / 60)
    );
    $secondHand.style.setProperty('--deg', second * (360 / 60));
  }
  // 1초 있다가 실행. 세 번째 인수는 1초마다 호출될 때 주겠다.
  setInterval(setClock, 1000, [...$container.querySelectorAll('.hand')]); // 스프레드 문법: 집합을 펼쳐서 개별 값 목록으로 만든다.
};

export default AnalogClock;
