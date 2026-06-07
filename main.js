document.addEventListener('DOMContentLoaded', function () {
  // 💡 [기능 3] 네비게이션 바 "현재 위치 표시 (Active 상태)"
  // 현재 URL에서 파일명만 추출하여 메뉴와 일치하면 하이라이트 효과를 줍니다.
  const currentPath = window.location.pathname.split('/').pop() || 'index.html'
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link')
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href')
    if (linkPath === currentPath) {
      // 부트스트랩의 active 클래스와 텍스트 강조 속성 추가
      link.classList.add('active', 'fw-bold', 'text-white')
    }
  })

  // 1. 객체 데이터 처리: 스텝별 기본 템플릿 코드 저장 (에디터 창 통일성을 위해 // 주석 사용)
  const codeTemplates = {
    step1: `<h3>회원 가입 폼</h3>

// form: 사용자가 입력한 정보를 서버로 보내는 컨테이너입니다.
// onsubmit 속성: 버튼 클릭 시 페이지 새로고침을 막기 위해 event.preventDefault()를 사용합니다.
<form onsubmit="event.preventDefault(); alert('전송되었습니다!');">
  
  // label: 입력창의 제목을 표시합니다.
  // input type="text": 사용자가 한 줄 글자를 입력하는 박스입니다.
  <label>이름: <input type="text" placeholder="이름을 입력하세요"></label><br><br>
  
  // select: 여러 옵션 중 하나를 고르는 드롭다운 메뉴입니다.
  <label>직업:
    <select>
      <option>학생</option>
      <option>개발자</option>
      <option>디자이너</option>
    </select>
  </label><br><br>
  
  // button type="submit": 폼 내부의 데이터를 제출하는 버튼입니다.
  <button type="submit">가입하기</button>
</form>

<hr>

<h3>데이터 테이블 & 미디어</h3>
// table: 표(Table)를 만드는 부모 태그입니다.
// tr: 표의 한 행(Row)을 만듭니다.
<table border="1" cellpadding="8">
  // th: 표의 제목 셀(Header)로, 글자가 굵게 표시됩니다.
  <tr>
    <th>분류</th>
    <th>기술 이름</th>
  </tr>
  // td: 실제 데이터가 들어가는 일반 셀입니다.
  <tr>
    <td>마크업 언어</td>
    <td>HTML5</td>
  </tr>
</table>

<br>
// img: 웹페이지에 이미지를 띄우는 태그입니다.
// src: 이미지 파일의 URL을 넣고, alt: 이미지가 안 뜰 때 대신 보여줄 설명을 적습니다.
<img src="https://images.unsplash.com/photo-1593642532400-2682810df593" width="150" alt="기술 스택 이미지">`,

    step2: `<style>
  /* Flexbox: 요소들을 가로/세로로 정렬할 때 사용하는 강력한 레이아웃 도구 */
  .container {
    display: flex;       /* 자식 요소들을 가로로 나란히 배치합니다. */
    gap: 15px;           /* 요소들 사이의 간격을 조절합니다. */
    padding: 20px;       /* 컨테이너 안쪽의 여백을 줍니다. */
    background: #f8f9fa; /* 배경색을 아주 밝은 회색으로 설정합니다. */
  }

  /* .card: 개별 요소 디자인 */
  .card {
    background: #0d6efd; /* 카드 배경색(파란색) */
    color: white;        /* 글자색(흰색) */
    padding: 20px;       /* 내용과 테두리 사이의 여백 */
    border-radius: 10px; /* 모서리를 둥글게 처리 */
    flex: 1;             /* 공간을 동일한 비율로 나누어 차지합니다. */
    text-align: center;  /* 내부 텍스트 가운데 정렬 */
    transition: 0.3s;    /* hover 시 변화를 0.3초 동안 부드럽게 실행 */
  }

  /* 마우스를 올렸을 때의 변화 */
  .card:hover {
    transform: translateY(-10px); /* 위로 살짝 떠오르는 효과 */
    background: #0b5ed7;          /* hover 시 조금 더 진한 파란색으로 변경 */
  }
</style>

<div class="container">
  <div class="card">Box 1</div>
  <div class="card">Box 2</div>
  <div class="card">Box 3</div>
</div>`,

    step3: `<h2 id="title">JS 기술 스택 렌더링</h2>
<button id="renderBtn" style="padding: 10px; cursor: pointer;">기술 스택 불러오기</button>
<ul id="techList"></ul>

<script>
  // 배열 내에 객체를 담아 데이터 관리
  const techData = [
    { name: "React", type: "Library" },
    { name: "Vue", type: "Framework" },
    { name: "Next.js", type: "Framework (SSR)" }
  ];

  document.getElementById('renderBtn').addEventListener('click', () => {
    const listElement = document.getElementById('techList');
    listElement.innerHTML = ''; 
    
    // 반복문을 통해 데이터를 HTML 요소로 변환하여 삽입
    techData.forEach(tech => {
      const li = document.createElement('li');
      li.innerHTML = '<strong>' + tech.name + '</strong> : ' + tech.type;
      listElement.appendChild(li);
    });
    
    document.getElementById('title').style.color = '#198754';
  });
<\/script>`,
  }

  // DOM 객체 할당
  const editor = document.getElementById('codeEditor')
  const outputFrame = document.getElementById('outputFrame')
  const runBtn = document.getElementById('runBtn')
  const resetBtn = document.getElementById('resetBtn')

  // 에디터가 없는 페이지(home, about 등) 에러 방어 코드
  if (!editor || !outputFrame || !runBtn) return

  const currentStep = editor.getAttribute('data-step')

  // 💡 [기능 2] 로컬 스토리지에서 코드 불러오기 (자동 저장된 내용이 있으면 우선 적용)
  const savedCode = localStorage.getItem('savedCode_' + currentStep)
  if (savedCode) {
    editor.value = savedCode
  } else if (codeTemplates[currentStep]) {
    editor.value = codeTemplates[currentStep]
  }

  // 💡 실행 로직 (DOM 제어 및 정규식을 이용한 HTML 주석 필터링)
  function runCode() {
    const doc = outputFrame.contentWindow.document
    doc.open()

    let finalCode = editor.value

    // 현재 스텝이 step1(HTML)일 경우, 렌더링 직전에 // 로 시작하는 줄을 몰래 삭제합니다.
    if (currentStep === 'step1') {
      finalCode = finalCode.replace(/^\s*\/\/.*$/gm, '')
    }

    doc.write(finalCode)
    doc.close()
  }

  // 💡 [기능 2] 사용자가 타이핑할 때마다 로컬 스토리지에 실시간 저장
  editor.addEventListener('input', function () {
    localStorage.setItem('savedCode_' + currentStep, this.value)
  })

  // 💡 [기능 1] Reset 버튼 동작 로직
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (
        confirm(
          '초기 기본 코드로 되돌리시겠습니까? 작성하신 내용이 초기화됩니다.',
        )
      ) {
        localStorage.removeItem('savedCode_' + currentStep) // 저장소 비우기
        editor.value = codeTemplates[currentStep] // 템플릿 복구
        runCode() // 화면 갱신
      }
    })
  }

  // 💡 탭(Tab) 키 지원 로직 (VS Code 스타일 들여쓰기)
  editor.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = this.selectionStart
      const end = this.selectionEnd
      const tabSpace = '  ' // 스페이스 2칸
      this.value =
        this.value.substring(0, start) + tabSpace + this.value.substring(end)
      this.selectionStart = this.selectionEnd = start + tabSpace.length

      // 탭을 눌렀을 때도 변경 사항을 로컬 스토리지에 즉시 저장
      localStorage.setItem('savedCode_' + currentStep, this.value)
    }
  })

  // 이벤트 리스너 등록 및 초기 화면 렌더링 실행
  runBtn.addEventListener('click', runCode)
  runCode()
})
