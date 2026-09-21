const courses = [
  {id:1, month:'OCT', day:'08', category:'입문', title:'SFG 신규입문교육', target:'신규 입사자', place:'SFG 고삼연수원', time:'09:00–17:00', status:'신청예정', desc:'SFG의 철학과 조직을 이해하고 현장 적응을 돕는 입문 과정입니다.'},
  {id:2, month:'OCT', day:'15', category:'리더십', title:'점장 역량 강화 과정', target:'점장', place:'SFG 고삼연수원', time:'10:00–17:00', status:'신청예정', desc:'사람관리와 현장 운영 역량을 높이는 점장 리더십 과정입니다.'},
  {id:3, month:'OCT', day:'22', category:'리더십', title:'SFG 사관학교', target:'핵심인재 · 관리자', place:'SFG 고삼연수원', time:'09:00–18:00', status:'준비중', desc:'SFG의 핵심인재를 육성하기 위한 리더십·철학·현장 중심 프로그램입니다.'},
  {id:4, month:'OCT', day:'01–31', category:'필수', title:'2026 법정의무교육', target:'전 임직원', place:'온라인 LMS', time:'기간 내 자율수강', status:'수강', desc:'필수 법정교육을 온라인으로 이수하고 이력을 체계적으로 관리합니다.'},
  {id:5, month:'OCT', day:'29', category:'직무', title:'서비스 CS Master', target:'점장 · 스탭', place:'SFG 교육장', time:'13:00–17:00', status:'예정', desc:'고객 경험을 높이는 서비스 커뮤니케이션 실습 과정입니다.'},
];

const paths = {
  '점장': {
    desc:'현장 운영과 사람관리를 책임지는 리더를 위한 성장 경로입니다.',
    steps:[
      ['STEP 01','신임점장 기본','점장의 역할·운영 기본'],
      ['STEP 02','사람관리','코칭·피드백·노무'],
      ['STEP 03','매출·손익','성과와 원가관리'],
      ['STEP 04','서비스 리더십','고객경험 관리'],
      ['STEP 05','리더십 아카데미','리더 역량 고도화'],
      ['STEP 06','SFG 사관학교','핵심리더 육성']
    ]
  },
  '스탭': {
    desc:'SFG의 기본과 서비스 역량을 갖춘 현장 전문가로 성장합니다.',
    steps:[
      ['STEP 01','신규입문','SFG 이해·기본교육'],
      ['STEP 02','서비스 기본','고객응대·기본동작'],
      ['STEP 03','직무 숙련','업무별 실무역량'],
      ['STEP 04','CS Master','서비스 심화'],
      ['STEP 05','차세대 리더','리더 후보 육성']
    ]
  },
  '조리장': {
    desc:'맛·위생·원가·조직을 함께 책임지는 조리 리더를 위한 과정입니다.',
    steps:[
      ['STEP 01','조리 리더 기본','역할·기준·운영'],
      ['STEP 02','위생·안전','식품안전·법규'],
      ['STEP 03','원가관리','식재·로스 관리'],
      ['STEP 04','조직관리','인력·커뮤니케이션'],
      ['STEP 05','리더십 아카데미','리더 역량 고도화']
    ]
  },
  '본사': {
    desc:'직무 전문성과 협업, 리더십을 강화하는 본사 구성원 성장 경로입니다.',
    steps:[
      ['STEP 01','온보딩','SFG 이해·업무 적응'],
      ['STEP 02','직무교육','직무별 전문성'],
      ['STEP 03','협업·소통','조직 커뮤니케이션'],
      ['STEP 04','리더십','관리자 역량'],
      ['STEP 05','핵심인재','차세대 리더 육성']
    ]
  }
};

let currentFilter='all';

function renderCourses(){
  const wrap=document.getElementById('courseList');
  const filtered=currentFilter==='all'?courses:courses.filter(c=>c.category===currentFilter);
  wrap.innerHTML=filtered.map(c=>`
    <article class="course" onclick="openCourse(${c.id})">
      <div class="course-date"><strong>${c.day}</strong><span>${c.month}</span></div>
      <div class="course-main"><span class="category">${c.category}</span><h3>${c.title}</h3><p>${c.target}</p></div>
      <div class="course-meta">${c.place}<br>${c.time}</div>
      <span class="course-status ${c.status==='수강'?'open':''}">${c.status}</span>
      <button class="course-open" aria-label="상세보기">→</button>
    </article>`).join('');
  document.getElementById('courseCount').textContent=filtered.length;
}
document.querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); currentFilter=b.dataset.filter; renderCourses();
}));

function renderPath(name){
  const p=paths[name];
  document.getElementById('pathTitle').textContent=name;
  document.getElementById('pathDesc').textContent=p.desc;
  document.getElementById('pathSteps').innerHTML=p.steps.map(s=>`
    <div class="step"><span>${s[0]}</span><strong>${s[1]}</strong><p>${s[2]}</p></div>`).join('');
}
document.querySelectorAll('.path-tab').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.path-tab').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); renderPath(b.dataset.path);
}));

function openCourse(id){
  const c=courses.find(x=>x.id===id);
  document.getElementById('modalCategory').textContent=c.category;
  document.getElementById('modalTitle').textContent=c.title;
  document.getElementById('modalDesc').textContent=c.desc;
  document.getElementById('modalInfo').innerHTML=`
    <div><small>대상</small><strong>${c.target}</strong></div>
    <div><small>일정</small><strong>${c.month} ${c.day}</strong></div>
    <div><small>시간</small><strong>${c.time}</strong></div>
    <div><small>장소</small><strong>${c.place}</strong></div>`;
  document.getElementById('courseModal').classList.add('show');
  document.getElementById('courseModal').setAttribute('aria-hidden','false');
}
function closeModal(){
  document.getElementById('courseModal').classList.remove('show');
  document.getElementById('courseModal').setAttribute('aria-hidden','true');
}
document.getElementById('courseModal').addEventListener('click',e=>{
  if(e.target.id==='courseModal') closeModal();
});
function scrollToId(id){ document.getElementById(id).scrollIntoView({behavior:'smooth'}); }
function showToast(msg){
  const t=document.getElementById('toast'); t.textContent=msg;t.classList.add('show');
  clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2600);
}
function openAdminInfo(){
  showToast('기존 SFG Academy 운영관리 페이지 URL을 연결하는 자리입니다.');
}
function filterResources(){
  const q=document.getElementById('resourceSearch').value.trim().toLowerCase();
  document.querySelectorAll('#resourceGrid article').forEach(el=>{
    const text=(el.dataset.keywords+' '+el.innerText).toLowerCase();
    el.style.display=text.includes(q)?'block':'none';
  });
}
renderCourses();
renderPath('점장');
